<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations - Consolidate roles into users table
     */
    public function up(): void
    {
        // 1. Add role JSON column to users table
        Schema::table('users', function (Blueprint $table) {
            $table->json('role')->nullable()->after('password');
        });

        // 2. Migrate data from roles + model_has_roles to users.role
        $users = DB::table('users')->get();
        
        foreach ($users as $user) {
            // Get role for this user
            $userRole = DB::table('model_has_roles')
                ->where('model_type', 'App\Models\User')
                ->where('model_id', $user->id)
                ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->select('roles.name', 'roles.permissions')
                ->first();
            
            if ($userRole) {
                $roleData = [
                    'name' => $userRole->name,
                    'permissions' => json_decode($userRole->permissions, true) ?? []
                ];
                
                DB::table('users')
                    ->where('id', $user->id)
                    ->update(['role' => json_encode($roleData)]);
            }
        }

        // 3. Drop the redundant tables
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('model_has_roles');
        Schema::dropIfExists('model_has_permissions');
        Schema::dropIfExists('role_has_permissions');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('permissions');
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreate roles table
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('guard_name');
            $table->json('permissions')->nullable();
            $table->timestamps();
            $table->unique(['name', 'guard_name']);
        });

        // Recreate model_has_roles
        Schema::create('model_has_roles', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id');
            $table->string('model_type');
            $table->unsignedBigInteger('model_id');

            $table->foreign('role_id')
                ->references('id')
                ->on('roles')
                ->cascadeOnDelete();

            $table->primary(['role_id', 'model_id', 'model_type']);
        });

        // Remove role column from users
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
