<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mentor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MentorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Mentors', [
            'mentors' => Mentor::orderBy('order')->get()->map(fn ($m) => array_merge($m->toArray(), [
                'photo_url' => $m->photo_url,
            ])),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'position'     => ['required', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'bio'          => ['nullable', 'string'],
            'order'        => ['required', 'integer', 'min:0'],
            'photo'        => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('mentors', 'public');
        }

        Mentor::create($validated);

        return back()->with('success', 'Mentor created successfully.');
    }

    public function update(Request $request, Mentor $mentor): RedirectResponse
    {
        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'position'     => ['required', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'bio'          => ['nullable', 'string'],
            'order'        => ['required', 'integer', 'min:0'],
            'is_active'    => ['boolean'],
            'photo'        => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('mentors', 'public');
        } else {
            unset($validated['photo']);
        }

        $mentor->update($validated);

        return back()->with('success', 'Mentor updated successfully.');
    }

    public function destroy(Mentor $mentor): RedirectResponse
    {
        $mentor->delete();
        return back()->with('success', 'Mentor deleted successfully.');
    }
}
