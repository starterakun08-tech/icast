<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Models\ThemeCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    /**
     * Show the public registration form page.
     */
    public function create(): Response
    {
        return Inertia::render('Register', [
            'themeCategories' => ThemeCategory::active()->get(),
        ]);
    }

    /**
     * Handle form submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'                 => ['required', 'string', 'max:255'],
            'email'                => ['required', 'email', 'unique:registrations,email'],
            'phone'                => ['nullable', 'string', 'max:20'],
            'institution'          => ['nullable', 'string', 'max:255'],
            'team_name'            => ['required', 'string', 'max:255'],
            'leader_name'          => ['nullable', 'string', 'max:255'],
            'leader_phone'         => ['nullable', 'string', 'max:20'],
            'theme_category_id'    => ['nullable', 'exists:theme_categories,id'],
            'solution_title'       => ['nullable', 'string', 'max:255'],
            'problem_statement'    => ['nullable', 'string'],
            'solution_description' => ['nullable', 'string'],
            'members'              => ['nullable', 'array', 'max:3'],
            'members.*.name'       => ['nullable', 'string', 'max:255'],
            'members.*.ktm_number' => ['nullable', 'string', 'max:100'],
            'members.*.id_number'  => ['nullable', 'string', 'max:50'],
            'category'             => ['nullable', 'in:individual,team'],
        ]);

        $validated['category'] = 'team';
        $validated['status']   = 'pending';

        $registration = Registration::create($validated);

        // Inertia redirect vs JSON
        if ($request->inertia()) {
            return redirect()->route('registration.success');
        }

        return response()->json([
            'message' => 'Pendaftaran berhasil! Kami akan menghubungi Anda segera.',
            'data'    => $registration,
        ], 201);
    }

    /**
     * Success page after registration.
     */
    public function success(): Response
    {
        return Inertia::render('RegisterSuccess');
    }
}
