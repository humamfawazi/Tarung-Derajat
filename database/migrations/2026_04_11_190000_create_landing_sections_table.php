<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('landing_sections', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 5)->default('id');
            $table->string('section_key', 100);
            $table->string('title');
            $table->text('content');
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['locale', 'section_key']);
            $table->index(['locale', 'is_active', 'sort_order']);
        });

        DB::table('landing_sections')->insert([
            [
                'locale' => 'id',
                'section_key' => 'feature_global',
                'title' => 'Portal Promosi Global',
                'content' => 'Memperkenalkan sejarah, nilai, dan identitas Tarung Derajat ke audiens internasional.',
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'locale' => 'id',
                'section_key' => 'feature_education',
                'title' => 'Platform Edukasi Terpusat',
                'content' => 'Materi teknik, kurikulum, dan video YouTube yang seragam untuk semua praktisi.',
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'locale' => 'id',
                'section_key' => 'feature_admin',
                'title' => 'Dasbor Administrasi',
                'content' => 'Data anggota, pelatih, wilayah, dan prestasi yang siap dipantau secara real-time.',
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'locale' => 'en',
                'section_key' => 'feature_global',
                'title' => 'Global Promotion Portal',
                'content' => 'Present Tarung Derajat history, values, and identity to international audiences.',
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'locale' => 'en',
                'section_key' => 'feature_education',
                'title' => 'Centralized Education Platform',
                'content' => 'Standard technique material, curricula, and YouTube video references for all practitioners.',
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'locale' => 'en',
                'section_key' => 'feature_admin',
                'title' => 'Administration Dashboard',
                'content' => 'Track members, coaches, regions, and performance in a real-time ready system.',
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('landing_sections');
    }
};
