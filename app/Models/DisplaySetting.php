<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisplaySetting extends Model
{
    use HasFactory;

    public const DEFAULTS = [
        'articles_user_limit' => 4,
        'videos_user_limit' => 4,
        'history_user_limit' => 1,
        'philosophy_user_limit' => 1,
        'education_user_limit' => 1,
    ];

    protected $fillable = [
        'key',
        'value',
    ];

    protected function casts(): array
    {
        return [
            'value' => 'integer',
        ];
    }
}
