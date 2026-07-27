<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ThemeCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ThemeCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ThemeCategories', [
            'categories' => ThemeCategory::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'order'       => ['integer', 'min:0'],
            'is_active'   => ['boolean'],
        ]);

        ThemeCategory::create($validated);
        return back()->with('success', 'Kategori tema berhasil ditambahkan.');
    }

    public function update(Request $request, ThemeCategory $themeCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'order'       => ['integer', 'min:0'],
            'is_active'   => ['boolean'],
        ]);

        $themeCategory->update($validated);
        return back()->with('success', 'Kategori tema berhasil diperbarui.');
    }

    public function destroy(ThemeCategory $themeCategory): RedirectResponse
    {
        $themeCategory->delete();
        return back()->with('success', 'Kategori tema berhasil dihapus.');
    }
}
