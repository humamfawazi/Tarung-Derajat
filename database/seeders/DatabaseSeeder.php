<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user with all permissions
        User::query()->updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin Pusat',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
                'role' => [
                    'name' => 'admin',
                    'permissions' => [
                        'users.view', 'users.create', 'users.edit', 'users.delete',
                        'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
                        'members.view', 'members.create', 'members.edit', 'members.delete',
                        'events.view', 'events.create', 'events.edit', 'events.delete',
                        'videos.view', 'videos.create', 'videos.edit', 'videos.delete',
                        'reports.view',
                        'settings.edit',
                    ],
                ],
            ]
        );

        // Coach user
        User::query()->updateOrCreate(
            ['email' => 'pelatih@gmail.com'],
            [
                'name' => 'Pelatih Utama',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
                'role' => [
                    'name' => 'coach',
                    'permissions' => [
                        'members.view', 'members.edit',
                        'events.view', 'events.create', 'events.edit',
                        'videos.view', 'videos.create', 'videos.edit',
                        'reports.view',
                    ],
                ],
            ]
        );

        // Member user (limited permissions)
        User::query()->updateOrCreate(
            ['email' => 'user@gmail.com'],
            [
                'name' => 'Anggota Contoh',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
                'role' => [
                    'name' => 'member',
                    'permissions' => [
                        'events.view',
                        'videos.view',
                    ],
                ],
            ]
        );

        $this->call([
            ContentSeeder::class,
            MemberSeeder::class,
        ]);
    }
}
