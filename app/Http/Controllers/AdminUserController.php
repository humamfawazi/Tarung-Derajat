<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create', [
            'roleOptions' => ['admin', 'pelatih', 'coach', 'user'],
        ]);
    }

    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'name', 'email', 'role', 'email_verified_at', 'created_at'])
            ->latest('id')
            ->get()
            ->map(function (User $user): array {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role_name' => $user->getRoleName() ?? 'user',
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                ];
            });

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_name' => $user->getRoleName() ?? 'user',
                'is_verified' => $user->email_verified_at !== null,
            ],
            'roleOptions' => ['admin', 'pelatih', 'coach', 'user'],
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'role_name' => ['required', 'string', Rule::in(['admin', 'pelatih', 'coach', 'user'])],
            'is_verified' => ['required', 'boolean'],
        ]);

        $rolePermissions = [
            'admin' => ['videos.view', 'videos.create', 'videos.edit', 'videos.delete'],
            'pelatih' => ['videos.view', 'videos.create', 'videos.edit'],
            'coach' => ['videos.view', 'videos.create', 'videos.edit'],
            'user' => ['videos.view'],
        ];

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'email_verified_at' => $validated['is_verified'] ? ($user->email_verified_at ?? now()) : null,
            'role' => [
                'name' => $validated['role_name'],
                'permissions' => $rolePermissions[$validated['role_name']] ?? [],
            ],
        ]);

        return redirect()->route('admin.users.index')->with('success', 'Data user berhasil diperbarui.');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'min:8'],
            'role_name' => ['required', 'string', Rule::in(['admin', 'pelatih', 'coach', 'user'])],
            'is_verified' => ['required', 'boolean'],
        ]);

        $rolePermissions = [
            'admin' => ['users.view', 'users.create', 'users.edit', 'users.delete', 'videos.view', 'videos.create', 'videos.edit', 'videos.delete'],
            'pelatih' => ['videos.view', 'videos.create', 'videos.edit'],
            'coach' => ['videos.view', 'videos.create', 'videos.edit'],
            'user' => ['videos.view'],
        ];

        User::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'email_verified_at' => $validated['is_verified'] ? now() : null,
            'role' => [
                'name' => $validated['role_name'],
                'permissions' => $rolePermissions[$validated['role_name']] ?? [],
            ],
        ]);

        return redirect()->route('admin.users.index')->with('success', 'User baru berhasil dibuat.');
    }

    public function destroy(User $user): RedirectResponse
    {
        if (Auth::id() === $user->id) {
            return back()->with('error', 'Admin tidak dapat menghapus akun sendiri.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User berhasil dihapus.');
    }
}
