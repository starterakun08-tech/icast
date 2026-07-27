<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Faqs', [
            'faqs' => Faq::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'question' => ['required', 'string', 'max:500'],
            'answer'   => ['required', 'string'],
            'order'    => ['required', 'integer', 'min:0'],
        ]);

        Faq::create($validated);
        return back()->with('success', 'FAQ created successfully.');
    }

    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $validated = $request->validate([
            'question'  => ['required', 'string', 'max:500'],
            'answer'    => ['required', 'string'],
            'order'     => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        $faq->update($validated);
        return back()->with('success', 'FAQ updated successfully.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();
        return back()->with('success', 'FAQ deleted successfully.');
    }
}
