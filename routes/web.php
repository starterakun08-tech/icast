<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MentorController;
use App\Http\Controllers\Admin\PrizeController;
use App\Http\Controllers\Admin\RegistrationAdminController;
use App\Http\Controllers\Admin\ThemeCategoryController;
use App\Http\Controllers\Admin\TimelineController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WhyJoinController;
use Illuminate\Support\Facades\Route;

// ─── Public Landing Page ───────────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');

// ─── Public Registration ───────────────────────────────────────────────────
Route::get('/register', [RegistrationController::class, 'create'])->name('registration.create');
Route::post('/register', [RegistrationController::class, 'store'])->name('registration.store');
Route::get('/register/success', [RegistrationController::class, 'success'])->name('registration.success');

// ─── Legacy API endpoint (keep for backward compat) ───────────────────────
Route::post('/register-hackathon', [RegistrationController::class, 'store']);

// ─── Post-login redirect (Breeze compatibility) ────────────────────────────
Route::get('/dashboard', fn() => redirect()->route('admin.dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// ─── Breeze Profile Routes ─────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ─── Admin Routes (auth-guarded) ───────────────────────────────────────────
Route::prefix('admin')
    ->middleware(['auth', 'verified'])
    ->name('admin.')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Hero
        Route::get('/hero', [HeroController::class, 'edit'])->name('hero.edit');
        Route::put('/hero', [HeroController::class, 'update'])->name('hero.update');

        // About
        Route::get('/about', [AboutController::class, 'edit'])->name('about.edit');
        Route::put('/about', [AboutController::class, 'update'])->name('about.update');

        // Why Join
        Route::get('/why-join', [WhyJoinController::class, 'index'])->name('why-join.index');
        Route::post('/why-join', [WhyJoinController::class, 'store'])->name('why-join.store');
        Route::put('/why-join/{whyJoin}', [WhyJoinController::class, 'update'])->name('why-join.update');
        Route::delete('/why-join/{whyJoin}', [WhyJoinController::class, 'destroy'])->name('why-join.destroy');

        // Timeline
        Route::get('/timeline', [TimelineController::class, 'index'])->name('timeline.index');
        Route::post('/timeline', [TimelineController::class, 'store'])->name('timeline.store');
        Route::put('/timeline/{timeline}', [TimelineController::class, 'update'])->name('timeline.update');
        Route::delete('/timeline/{timeline}', [TimelineController::class, 'destroy'])->name('timeline.destroy');

        // Mentors
        Route::get('/mentors', [MentorController::class, 'index'])->name('mentors.index');
        Route::post('/mentors', [MentorController::class, 'store'])->name('mentors.store');
        Route::put('/mentors/{mentor}', [MentorController::class, 'update'])->name('mentors.update');
        Route::delete('/mentors/{mentor}', [MentorController::class, 'destroy'])->name('mentors.destroy');

        // Prizes
        Route::get('/prizes', [PrizeController::class, 'index'])->name('prizes.index');
        Route::post('/prizes', [PrizeController::class, 'store'])->name('prizes.store');
        Route::put('/prizes/{prize}', [PrizeController::class, 'update'])->name('prizes.update');
        Route::delete('/prizes/{prize}', [PrizeController::class, 'destroy'])->name('prizes.destroy');

        // FAQs
        Route::get('/faqs', [FaqController::class, 'index'])->name('faqs.index');
        Route::post('/faqs', [FaqController::class, 'store'])->name('faqs.store');
        Route::put('/faqs/{faq}', [FaqController::class, 'update'])->name('faqs.update');
        Route::delete('/faqs/{faq}', [FaqController::class, 'destroy'])->name('faqs.destroy');

        // Registrations
        Route::get('/registrations', [RegistrationAdminController::class, 'index'])->name('registrations.index');
        Route::put('/registrations/{registration}', [RegistrationAdminController::class, 'update'])->name('registrations.update');
        Route::delete('/registrations/{registration}', [RegistrationAdminController::class, 'destroy'])->name('registrations.destroy');
        Route::get('/registrations/export', [RegistrationAdminController::class, 'export'])->name('registrations.export');

        // Theme Categories (all admins)
        Route::get('/theme-categories', [ThemeCategoryController::class, 'index'])->name('theme-categories.index');
        Route::post('/theme-categories', [ThemeCategoryController::class, 'store'])->name('theme-categories.store');
        Route::put('/theme-categories/{themeCategory}', [ThemeCategoryController::class, 'update'])->name('theme-categories.update');
        Route::delete('/theme-categories/{themeCategory}', [ThemeCategoryController::class, 'destroy'])->name('theme-categories.destroy');

        // Media
        Route::get('/media', [MediaController::class, 'index'])->name('media.index');
        Route::post('/media', [MediaController::class, 'store'])->name('media.store');
        Route::delete('/media/{medium}', [MediaController::class, 'destroy'])->name('media.destroy');

        // Users (superadmin only)
        Route::middleware('superadmin')->group(function () {
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::post('/users', [UserController::class, 'store'])->name('users.store');
            Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
            Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        });
    });

require __DIR__ . '/auth.php';
