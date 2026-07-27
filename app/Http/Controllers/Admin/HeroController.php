<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HeroController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Hero', [
            'hero' => HeroSetting::instance(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_line1'        => ['required', 'string', 'max:255'],
            'title_line2'        => ['required', 'string', 'max:255'],
            'subtitle'           => ['nullable', 'string'],
            'btn_primary_text'   => ['required', 'string', 'max:100'],
            'btn_primary_url'    => ['required', 'string', 'max:255'],
            'btn_secondary_text' => ['required', 'string', 'max:100'],
            'btn_secondary_url'  => ['required', 'string', 'max:255'],
        ]);

        HeroSetting::instance()->update($validated);

        return back()->with('success', 'Hero section updated successfully.');
    }
}
