<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationAdminController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Registration::with('themeCategory')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('team_name', 'like', "%{$search}%")
                  ->orWhere('leader_name', 'like', "%{$search}%")
                  ->orWhere('institution', 'like', "%{$search}%")
                  ->orWhere('solution_title', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Admin/Registrations', [
            'registrations' => $query->paginate(15)->withQueryString(),
            'filters'       => $request->only(['status', 'search']),
        ]);
    }

    public function update(Request $request, Registration $registration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,approved,rejected'],
            'notes'  => ['nullable', 'string'],
        ]);

        $registration->update($validated);
        return back()->with('success', 'Registration updated.');
    }

    public function destroy(Registration $registration): RedirectResponse
    {
        $registration->delete();
        return back()->with('success', 'Registration deleted.');
    }

    public function export(): HttpResponse
    {
        $registrations = Registration::with('themeCategory')->latest()->get();

        $csv = "ID,Nama Tim,Institusi,Ketua,No. Telp Ketua,Email,Kategori Tema,Judul Solusi,Problem Statement,Deskripsi Solusi,Anggota Tim,Status,Tanggal Daftar\n";
        foreach ($registrations as $r) {
            $membersStr = '';
            if (is_array($r->members)) {
                $mList = [];
                foreach ($r->members as $m) {
                    $name = $m['name'] ?? '';
                    $ktm = $m['ktm_number'] ?? '';
                    $idNum = $m['id_number'] ?? '';
                    if ($name || $ktm || $idNum) {
                        $mList[] = "{$name} (KTM: {$ktm}, KTP/SIM: {$idNum})";
                    }
                }
                $membersStr = implode(' | ', $mList);
            }

            $csv .= implode(',', [
                $r->id,
                '"' . str_replace('"', '""', $r->team_name ?? '') . '"',
                '"' . str_replace('"', '""', $r->institution ?? '') . '"',
                '"' . str_replace('"', '""', $r->leader_name ?? $r->name) . '"',
                '"' . str_replace('"', '""', $r->leader_phone ?? $r->phone ?? '') . '"',
                '"' . str_replace('"', '""', $r->email) . '"',
                '"' . str_replace('"', '""', $r->themeCategory?->name ?? '—') . '"',
                '"' . str_replace('"', '""', $r->solution_title ?? '') . '"',
                '"' . str_replace('"', '""', $r->problem_statement ?? '') . '"',
                '"' . str_replace('"', '""', $r->solution_description ?? '') . '"',
                '"' . str_replace('"', '""', $membersStr) . '"',
                $r->status,
                $r->created_at->format('Y-m-d H:i:s'),
            ]) . "\n";
        }

        return response($csv, 200, [
            'Content-Type'        => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="registrations-' . now()->format('Ymd') . '.csv"',
        ]);
    }
}
