# Quick Reference - Simplified Permission System

## 📋 Status Consolidation

✅ **SELESAI!**

### Database Changes
- ✅ Migration `2026_04_08_000000_consolidate_roles_permissions` berhasil dijalankan
- ✅ Tabel `roles` sekarang memiliki kolom `permissions` (JSON)
- ✅ Tabel `role_has_permissions` sudah dihapus
- ✅ Tabel `model_has_permissions` sudah dihapus
- ✅ Tabel `model_has_roles` tetap sebagai junction untuk user-role linking

### Code Changes
- ✅ `App\Models\Role` - Model baru dengan method permission management
- ✅ `App\Traits\HasSimplePermissions` - Trait yang menggantikan Spatie HasRoles
- ✅ `App\Http\Middleware\CheckPermission` - Middleware sederhana untuk route protection
- ✅ `bootstrap\app.php` - Updated middleware aliases
- ✅ `Database\Seeders\DatabaseSeeder` - Updated dengan roles + permissions

---

## 👥 Test Accounts (Password: 12345678)

| Email | Role | Permissions |
|-------|------|------------|
| admin@gmail.com | admin | Semua permission (users, roles, members, events, videos, reports, settings) |
| pelatih@gmail.com | coach | members, events, videos, reports management |
| user@gmail.com | member | View events & videos saja |

---

## 🛠️ API USAGE

### 1. Check Permission User
```php
// Di controller atau middleware
if (auth()->user()->hasPermission('users.delete')) {
    // User punya permission
}
```

### 2. Check Role User
```php
if (auth()->user()->hasRole('admin')) {
    // User adalah admin
}
```

### 3. Get All User Permissions
```php
$permissions = auth()->user()->getAllPermissions();
// Returns: ['users.view', 'users.create', 'users.edit', ...]
```

---

## 🔐 Route Protection

### Dalam Route Definition
```php
Route::delete('/users/{id}', [UserController::class, 'destroy'])
    ->middleware('auth', 'permission:users.delete');
```

### Dalam Controller
```php
public function destroy(User $user)
{
    $this->authorize('delete', 'users.delete'); // Custom gate
    $user->delete();
}
```

### Dalam Template Blade
```blade
@if(auth()->user()->hasPermission('users.create'))
    <button>Tambah User</button>
@endif
```

---

## 📊 Current Permissions Defined

### Admin Role
```
users: view, create, edit, delete
roles: view, create, edit, delete
members: view, create, edit, delete
events: view, create, edit, delete
videos: view, create, edit, delete
reports: view
settings: edit
```

### Coach Role
```
members: view, edit
events: view, create, edit
videos: view, create, edit
reports: view
```

### Member Role
```
events: view
videos: view
```

---

## 🔄 Managing Roles & Permissions

### Create Role dengan Permissions
```php
use App\Models\Role;

$role = Role::create([
    'name' => 'editor',
    'guard_name' => 'web',
    'permissions' => [
        'posts.view',
        'posts.create',
        'posts.edit',
        'comments.delete',
    ]
]);
```

### Add Permission ke Role
```php
$role->addPermission('posts.publish');
```

### Remove Permission
```php
$role->removePermission('posts.delete');
```

### Replace All Permissions
```php
$role->syncPermissions([
    'posts.view',
    'comments.view',
    'comments.edit',
]);
```

### Assign Role ke User
```php
use Illuminate\Support\Facades\DB;
use App\Models\User;

$user = User::find(1);
$role = Role::where('name', 'editor')->first();

DB::table('model_has_roles')->insert([
    'model_type' => User::class,
    'model_id' => $user->id,
    'role_id' => $role->id,
]);
```

---

## 📁 File Structure

```
app/
├── Models/
│   ├── User.php (updated - uses HasSimplePermissions)
│   └── Role.php (new - simplified role model)
├── Traits/
│   └── HasSimplePermissions.php (new - permission checking methods)
├── Http/
│   └── Middleware/
│       └── CheckPermission.php (new - route protection)
├── Providers/
│   └── ... (no changes)
database/
├── migrations/
│   └── 2026_04_08_000000_consolidate_roles_permissions.php (new)
└── seeders/
    └── DatabaseSeeder.php (updated - roles + permissions)
docs/
├── CONSOLIDATION_SUMMARY.md (detailed changes)
└── PERMISSION_SYSTEM.md (usage guide)
```

---

## ✨ Keuntungan vs Sebelumnya

| Aspek | Sistem Lama | Sistem Baru |
|-------|-----------|-----------|
| Tabel Junction | 2 extra tables | 1 (model_has_roles) |
| Query Complexity | HIGH (3+ joins) | LOW (direct lookup) |
| Permission Storage | Separate table | JSON in roles |
| Code Example | Spatie library | Custom trait |
| Learning Curve | Steep | Gentle |
| Maintenance | Multiple sync points | Single source |
| Scalability | Good for 100K+ | Good for 10K+ |

---

## 🚀 Next Steps

1. **Test Permission Checking**
   - Login dengan admin@gmail.com, pelatih@gmail.com, user@gmail.com
   - Verify bahwa permissions berfungsi sesuai role

2. **Implement Route Guards**
   - Tambahkan `->middleware('permission:xxx')` ke sensitive routes
   - Update controllers untuk check permissions

3. **Add More Roles** (jika diperlukan)
   ```php
   // Create referee role
   Role::create([
       'name' => 'referee',
       'guard_name' => 'web',
       'permissions' => ['events.view', 'reports.create']
   ]);
   ```

4. **Update Admin Panel**
   - Buat role management UI
   - Buat permission assignment UI

---

## 🐛 Troubleshooting

### Problem: User doesn't have permission despite having role
```php
// Debug:
$user = User::with('roles')->find($userId);
dd($user->roles); // Check if role is assigned
dd($user->roles->first()->permissions); // Check role's permissions
```

### Problem: Permission middleware returns 403
```php
// Check:
dd(auth()->user()->hasPermission('desired.permission'));
// Verify exact permission string matches
```

### Problem: Role wasn't seeded
```bash
php artisan db:seed --class=DatabaseSeeder
```

---

## 📞 Need Help?

Refer to these files:
- **CONSOLIDATION_SUMMARY.md** - Full technical details
- **PERMISSION_SYSTEM.md** - Comprehensive usage examples
- **app/Traits/HasSimplePermissions.php** - Available methods
- **app/Models/Role.php** - Role management methods
