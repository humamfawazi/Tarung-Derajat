<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!auth()->check()) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            return redirect()->route('login');
        }

        $user = auth()->user();
        $userRoleName = $user->getRoleName();

        if ($userRoleName === null || !in_array($userRoleName, $roles, true)) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Role not allowed'], 403);
            }

            return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki role untuk aksi ini.');
        }

        return $next($request);
    }
}
