<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Timeline;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TimelineController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Timeline', [
            'timelines' => Timeline::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'date'        => ['required', 'string', 'max:100'],
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon'        => ['nullable', 'string', 'max:100'],
            'order'       => ['required', 'integer', 'min:0'],
        ]);

        Timeline::create($validated);

        return back()->with('success', 'Timeline event created successfully.');
    }

    public function update(Request $request, Timeline $timeline): RedirectResponse
    {
        $validated = $request->validate([
            'date'        => ['required', 'string', 'max:100'],
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon'        => ['nullable', 'string', 'max:100'],
            'order'       => ['required', 'integer', 'min:0'],
            'is_active'   => ['boolean'],
        ]);

        $timeline->update($validated);

        return back()->with('success', 'Timeline event updated successfully.');
    }

    public function destroy(Timeline $timeline): RedirectResponse
    {
        $timeline->delete();
        return back()->with('success', 'Timeline event deleted successfully.');
    }
}
