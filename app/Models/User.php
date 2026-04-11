<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'email_verified_at'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => 'array',
        ];
    }

    /**
     * Get user's role name
     */
    public function getRoleName(): ?string
    {
        return $this->role['name'] ?? null;
    }

    /**
     * Get user's permissions array
     */
    public function getPermissions(): array
    {
        return $this->role['permissions'] ?? [];
    }

    /**
     * Check if user has specific permission
     */
    public function hasPermission(string $permission): bool
    {
        return in_array($permission, $this->getPermissions());
    }

    /**
     * Check if user has any of the given permissions
     */
    public function hasAnyPermission(array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if (in_array($permission, $this->getPermissions())) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if user has all the given permissions
     */
    public function hasAllPermissions(array $permissions): bool
    {
        $userPermissions = $this->getPermissions();
        foreach ($permissions as $permission) {
            if (!in_array($permission, $userPermissions)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if user has specific role
     */
    public function hasRole(string $role): bool
    {
        return $this->getRoleName() === $role;
    }

    /**
     * Check if user has any of the given roles
     */
    public function hasAnyRole(array $roles): bool
    {
        return in_array($this->getRoleName(), $roles);
    }

    /**
     * Set user role with permissions
     */
    public function setRole(string $name, array $permissions = []): self
    {
        $this->role = [
            'name' => $name,
            'permissions' => $permissions,
        ];
        return $this;
    }
}

