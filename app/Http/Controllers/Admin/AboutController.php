<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/About', [
            'about' => AboutSetting::instance(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'section_label' => ['required', 'string', 'max:100'],
            'heading'       => ['required', 'string', 'max:255'],
            'body'          => ['required', 'string'],
            'cta_text'      => ['required', 'string', 'max:100'],
            'cta_url'       => ['required', 'string', 'max:255'],
        ]);

        AboutSetting::instance()->update($validated);

        return back()->with('success', 'About section updated successfully.');
    }
}
