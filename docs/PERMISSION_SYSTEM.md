<?php

/**
 * Permission System Documentation
 * 
 * CONSOLIDATED STRUCTURE:
 * - users table: Contains user accounts
 * - roles table: Contains roles with JSON permissions column
 * - model_has_roles: Links users to roles (polymorphic)
 * 
 * REMOVED TABLES:
 * - role_has_permissions (permissions now stored as JSON in roles)
 * - model_has_permissions (only assign via roles, no direct permissions)
 * - permissions table (optional - can be kept for reference)
 * 
 * ========================================
 * USAGE EXAMPLES
 * ========================================
 */

// ==================
// 1. CHECK USER PERMISSIONS
// ==================

// Check if user has specific permission
if (auth()->user()->hasPermission('users.delete')) {
    // Allow deletion
}

// Check if user has any of multiple permissions
if (auth()->user()->hasAnyPermission(['users.edit', 'users.delete'])) {
    // User can edit OR delete
}

// Check if user has all permissions
if (auth()->user()->hasAllPermissions(['users.view', 'users.edit'])) {
    // User can both view and edit
}

// ==================
// 2. CHECK USER ROLES
// ==================

// Check if user has specific role
if (auth()->user()->hasRole('admin')) {
    // Staff-only operations
}

// Check if user has any of multiple roles
if (auth()->user()->hasAnyRole(['admin', 'coach'])) {
    // Admin or coach operations
}

// ==================
// 3. GET USER INFORMATION
// ==================

// Get all user's roles
$roles = auth()->user()->roles; // Collection of Role models
$roleNames = auth()->user()->roles->pluck('name'); // ['admin']

// Get all user's permissions (from all roles)
$permissions = auth()->user()->getAllPermissions(); // ['users.view', 'users.edit', ...]

// ==================
// 4. CREATE/UPDATE ROLES
// ==================

use App\Models\Role;

// Create new role with permissions
$role = Role::create([
    'name' => 'moderator',
    'guard_name' => 'web',
    'permissions' => [
        'comments.edit',
        'comments.delete',
        'reports.view',
    ]
]);

// Add permission to role
$role->addPermission('posts.edit');

// Add multiple permissions
$role->addPermissions(['posts.delete', 'users.ban']);

// Remove permission
$role->removePermission('posts.edit');

// Sync (replace all) permissions
$role->syncPermissions([
    'posts.view',
    'comments.view',
]);

// ==================
// 5. ASSIGN ROLES TO USERS
// ==================

use App\Models\User;
use Illuminate\Support\Facades\DB;

$user = User::find(1);
$role = Role::where('name', 'admin')->first();

// Assign role (using model_has_roles table)
DB::table('model_has_roles')->insert([
    'model_type' => User::class,
    'model_id' => $user->id,
    'role_id' => $role->id,
]);

// Or through relationship
$user->roles()->attach($role->id);

// Remove role
$user->roles()->detach($role->id);

// ==================
// 6. IN ROUTES (MIDDLEWARE)
// ==================

// Check permission in route middleware
Route::post('/users/{id}/delete', function ($id) {
    $this->authorize('delete-users'); // Uses permission gate
})->middleware('auth');

// Or check role
Route::group(['middleware' => 'auth'], function () {
    Route::get('/admin/dashboard', function () {
        // Admin dashboard
    })->middleware('role:admin');
});

// ==================
// 7. IN BLADE TEMPLATES
// ==================

@if($user->hasPermission('users.edit'))
    <button>Edit User</button>
@endif

@if($user->hasRole('admin'))
    <a href="/admin">Admin Panel</a>
@endif

// ==================
// 8. CURRENT PERMISSIONS (from DatabaseSeeder)
// ==================
/*
ADMIN ROLE:
- users.view, users.create, users.edit, users.delete
- roles.view, roles.create, roles.edit, roles.delete
- members.view, members.create, members.edit, members.delete
- events.view, events.create, events.edit, events.delete
- videos.view, videos.create, videos.edit, videos.delete
- reports.view
- settings.edit

COACH ROLE:
- members.view, members.edit
- events.view, events.create, events.edit
- videos.view, videos.create, videos.edit
- reports.view

MEMBER ROLE:
- events.view
- videos.view
*/

// ==================
// 9. DATABASE QUERIES
// ==================

// Find users by role
$admins = User::whereHas('roles', fn($q) => $q->where('name', 'admin'))->get();

// Find roles by permission (requires checking JSON)
$rolesWithDeletePermission = Role::where('name', 'admin')->orWhere('name', 'coach')->get();
// Then filter those that have the permission:
// $roles = $roles->filter(fn($r) => $r->hasPermission('users.delete'));

// Get role with its permissions
$role = Role::find(1);
$permissions = $role->getPermissions(); // ['users.view', 'users.edit', ...]
