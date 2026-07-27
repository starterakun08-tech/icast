<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Media', [
            'media' => Media::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:png,jpg,jpeg,webp,svg', 'max:5120'],
        ]);

        $file = $request->file('file');
        $path = $file->store('media', 'public');
        $url  = asset('storage/' . $path);

        Media::create([
            'filename'      => basename($path),
            'original_name' => $file->getClientOriginalName(),
            'path'          => $path,
            'url'           => $url,
            'mime_type'     => $file->getMimeType(),
            'size'          => $file->getSize(),
        ]);

        return back()->with('success', 'File uploaded successfully.');
    }

    public function destroy(Media $medium): RedirectResponse
    {
        \Storage::disk('public')->delete($medium->path);
        $medium->delete();
        return back()->with('success', 'File deleted.');
    }
}
