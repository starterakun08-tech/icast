<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Mentor;
use App\Models\Registration;
use App\Models\ThemeCategory;
use App\Models\Timeline;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'registrations'    => Registration::count(),
                'approved'         => Registration::approved()->count(),
                'pending'          => Registration::pending()->count(),
                'mentors'          => Mentor::count(),
                'timelines'        => Timeline::count(),
                'faqs'             => Faq::count(),
                'theme_categories' => ThemeCategory::count(),
            ],
            'recent_registrations' => Registration::with('themeCategory')
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
