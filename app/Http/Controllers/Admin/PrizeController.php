<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Prize;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PrizeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Prizes', [
            'prizes' => Prize::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'amount'      => ['nullable', 'string', 'max:100'],
            'icon'        => ['nullable', 'string', 'max:100'],
            'order'       => ['required', 'integer', 'min:0'],
        ]);

        Prize::create($validated);
        return back()->with('success', 'Prize created successfully.');
    }

    public function update(Request $request, Prize $prize): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'amount'      => ['nullable', 'string', 'max:100'],
            'icon'        => ['nullable', 'string', 'max:100'],
            'order'       => ['required', 'integer', 'min:0'],
            'is_active'   => ['boolean'],
        ]);

        $prize->update($validated);
        return back()->with('success', 'Prize updated successfully.');
    }

    public function destroy(Prize $prize): RedirectResponse
    {
        $prize->delete();
        return back()->with('success', 'Prize deleted successfully.');
    }
}
