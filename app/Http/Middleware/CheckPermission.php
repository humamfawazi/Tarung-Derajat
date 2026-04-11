<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * Usage in routes:
     * Route::delete('/users/{id}', [...])
     *     ->middleware('permission:users.delete');
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        if (!auth()->check()) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            return redirect()->route('login');
        }

        if (!auth()->user()->hasPermission($permission)) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Permission denied'], 403);
            }

            return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki permission untuk aksi ini.');
        }

        return $next($request);
    }
}
