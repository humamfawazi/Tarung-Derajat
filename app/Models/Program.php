<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'content',
        'image_path',
        'level',
        'duration',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active'   => 'boolean',
            'sort_order'  => 'integer',
        ];
    }

    public function getLevelLabelAttribute(): string
    {
        return match ($this->level) {
            'pemula'   => 'Pemula',
            'menengah' => 'Menengah',
            'mahir'    => 'Mahir',
            default    => 'Pemula',
        };
    }
}
