<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('display_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->unsignedInteger('value')->default(1);
            $table->timestamps();
        });

        DB::table('display_settings')->insert([
            ['key' => 'articles_user_limit', 'value' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'videos_user_limit', 'value' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'history_user_limit', 'value' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'philosophy_user_limit', 'value' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'education_user_limit', 'value' => 1, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('display_settings');
    }
};
