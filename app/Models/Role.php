<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\AsCollection;

class Role extends Model
{
    protected $table = 'roles';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'guard_name',
        'permissions',
    ];

    /**
     * Cast permissions JSON to array
     */
    protected function casts(): array
    {
        return [
            'permissions' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Get the permissions for this role
     */
    public function getPermissions(): array
    {
        return $this->permissions ?? [];
    }

    /**
     * Add a permission to the role
     */
    public function addPermission(string $permission): static
    {
        $permissions = $this->getPermissions();
        
        if (!in_array($permission, $permissions)) {
            $permissions[] = $permission;
            $this->update(['permissions' => $permissions]);
        }
        
        return $this;
    }

    /**
     * Add multiple permissions to the role
     */
    public function addPermissions(array $permissions): static
    {
        foreach ($permissions as $permission) {
            $this->addPermission($permission);
        }
        
        return $this;
    }

    /**
     * Remove a permission from the role
     */
    public function removePermission(string $permission): static
    {
        $permissions = $this->getPermissions();
        $permissions = array_filter($permissions, fn($p) => $p !== $permission);
        $this->update(['permissions' => array_values($permissions)]);
        
        return $this;
    }

    /**
     * Sync permissions for the role (replace all)
     */
    public function syncPermissions(array $permissions): static
    {
        $this->update(['permissions' => $permissions]);
        return $this;
    }

    /**
     * Check if role has a permission
     */
    public function hasPermission(string $permission): bool
    {
        return in_array($permission, $this->getPermissions());
    }

    /**
     * Relationship: Role has many users
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'model_has_roles', 'role_id', 'model_id')
            ->where('model_type', User::class);
    }
}
