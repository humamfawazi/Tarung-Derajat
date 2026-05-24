<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table) {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE members MODIFY member_type VARCHAR(255) NOT NULL");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE members MODIFY member_type ENUM('board', 'athlete') NOT NULL");
        });
    }
};
