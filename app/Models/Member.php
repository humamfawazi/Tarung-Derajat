<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'name',
        'member_type',
        'position',
        'specialty',
        'description',
        'photo_path',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
