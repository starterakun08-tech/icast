<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WhyJoinCard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WhyJoinController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/WhyJoin', [
            'cards' => WhyJoinCard::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon'        => ['nullable', 'string', 'max:100'],
            'order'       => ['required', 'integer', 'min:0'],
        ]);

        WhyJoinCard::create($validated);

        return back()->with('success', 'Card created successfully.');
    }

    public function update(Request $request, WhyJoinCard $whyJoin): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon'        => ['nullable', 'string', 'max:100'],
            'order'       => ['required', 'integer', 'min:0'],
            'is_active'   => ['boolean'],
        ]);

        $whyJoin->update($validated);

        return back()->with('success', 'Card updated successfully.');
    }

    public function destroy(WhyJoinCard $whyJoin): RedirectResponse
    {
        $whyJoin->delete();
        return back()->with('success', 'Card deleted successfully.');
    }
}
