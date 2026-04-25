<?php

namespace App\Http\Controllers;

use App\Models\DisplaySetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class AdminDisplaySettingController extends Controller
{
    public function edit(): Response
    {
        $settings = DisplaySetting::DEFAULTS;

        if (Schema::hasTable('display_settings')) {
            $stored = DisplaySetting::query()->pluck('value', 'key')->all();
            $settings = [
                ...$settings,
                ...$stored,
            ];
        }

        return Inertia::render('Admin/DisplaySettings/Edit', [
            'settings' => [
                'articles_user_limit' => max(1, (int) ($settings['articles_user_limit'] ?? DisplaySetting::DEFAULTS['articles_user_limit'])),
                'videos_user_limit' => max(1, (int) ($settings['videos_user_limit'] ?? DisplaySetting::DEFAULTS['videos_user_limit'])),
                'history_user_limit' => max(1, (int) ($settings['history_user_limit'] ?? DisplaySetting::DEFAULTS['history_user_limit'])),
                'philosophy_user_limit' => max(1, (int) ($settings['philosophy_user_limit'] ?? DisplaySetting::DEFAULTS['philosophy_user_limit'])),
                'education_user_limit' => max(1, (int) ($settings['education_user_limit'] ?? DisplaySetting::DEFAULTS['education_user_limit'])),
            ],
            'databaseReady' => Schema::hasTable('display_settings'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        if (!Schema::hasTable('display_settings')) {
            return redirect()
                ->route('admin.display-settings.edit')
                ->with('error', 'Tabel display_settings belum tersedia. Jalankan migration terlebih dahulu.');
        }

        $validated = $request->validate([
            'articles_user_limit' => ['required', 'integer', 'min:1', 'max:50'],
            'videos_user_limit' => ['required', 'integer', 'min:1', 'max:50'],
            'history_user_limit' => ['required', 'integer', 'min:1', 'max:50'],
            'philosophy_user_limit' => ['required', 'integer', 'min:1', 'max:50'],
            'education_user_limit' => ['required', 'integer', 'min:1', 'max:50'],
        ]);

        foreach ($validated as $key => $value) {
            DisplaySetting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => (int) $value],
            );
        }

        return redirect()->route('admin.display-settings.edit')->with('success', 'Pengaturan jumlah tampil berhasil diperbarui.');
    }
}
