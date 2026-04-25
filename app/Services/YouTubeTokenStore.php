<?php

namespace App\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use Throwable;

class YouTubeTokenStore
{
    private const TOKEN_PATH = 'private/youtube_refresh_token.enc';

    public function getRefreshToken(): ?string
    {
        if (!Storage::disk('local')->exists(self::TOKEN_PATH)) {
            return null;
        }

        try {
            $encrypted = Storage::disk('local')->get(self::TOKEN_PATH);

            return Crypt::decryptString($encrypted);
        } catch (Throwable $e) {
            throw new RuntimeException('Refresh token YouTube tersimpan tetapi gagal dibaca. Hubungkan ulang akun YouTube.');
        }
    }

    public function saveRefreshToken(string $refreshToken): void
    {
        $refreshToken = trim($refreshToken);

        if ($refreshToken === '') {
            throw new RuntimeException('Refresh token YouTube kosong.');
        }

        $encrypted = Crypt::encryptString($refreshToken);
        Storage::disk('local')->put(self::TOKEN_PATH, $encrypted);
    }

    public function hasStoredToken(): bool
    {
        return Storage::disk('local')->exists(self::TOKEN_PATH);
    }

    public function clearRefreshToken(): void
    {
        Storage::disk('local')->delete(self::TOKEN_PATH);
    }
}