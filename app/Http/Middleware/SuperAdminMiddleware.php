<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check() || !auth()->user()->isSuperAdmin()) {
            if ($request->inertia()) {
                return redirect()->route('admin.dashboard')->with('error', 'Access denied. SuperAdmin only.');
            }
            abort(403, 'SuperAdmin access required.');
        }

        return $next($request);
    }
}
