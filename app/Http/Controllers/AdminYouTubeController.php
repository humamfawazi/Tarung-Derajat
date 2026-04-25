<?php

namespace App\Http\Controllers;

use App\Services\YouTubeTokenStore;
use Google\Client;
use Google\Service\YouTube;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AdminYouTubeController extends Controller
{
    public function redirect(Request $request): Response
    {
        return $this->startOAuthFlow($request, false);
    }

    public function reconnect(Request $request): Response
    {
        return $this->startOAuthFlow($request, true);
    }

    public function callback(Request $request, YouTubeTokenStore $tokenStore): RedirectResponse
    {
        $expectedState = (string) $request->session()->pull('youtube_oauth_state', '');
        $receivedState = (string) $request->query('state', '');

        if ($expectedState === '' || !hash_equals($expectedState, $receivedState)) {
            return redirect()->route('dashboard')->with('error', 'State OAuth YouTube tidak valid. Coba connect lagi.');
        }

        if ($request->has('error')) {
            $message = (string) $request->query('error');

            return redirect()->route('dashboard')->with('error', 'Koneksi YouTube dibatalkan: '.$message);
        }

        $code = (string) $request->query('code', '');

        if ($code === '') {
            return redirect()->route('dashboard')->with('error', 'Kode OAuth YouTube tidak ditemukan.');
        }

        $client = $this->buildOAuthClient();
        $token = $client->fetchAccessTokenWithAuthCode($code);

        if (isset($token['error'])) {
            $description = isset($token['error_description']) ? ' ('.$token['error_description'].')' : '';

            return redirect()->route('dashboard')->with('error', 'Gagal autentikasi YouTube: '.$token['error'].$description);
        }

        $refreshToken = (string) ($token['refresh_token'] ?? '');

        if ($refreshToken === '') {
            return redirect()->route('dashboard')->with('error', 'Google tidak mengirim refresh token. Putuskan akses aplikasi ini di Google Account lalu connect ulang.');
        }

        $tokenStore->saveRefreshToken($refreshToken);

        return redirect()->route('dashboard')->with('success', 'YouTube berhasil terhubung. Refresh token sudah diperbarui.');
    }

    public function disconnect(YouTubeTokenStore $tokenStore): RedirectResponse
    {
        $tokenStore->clearRefreshToken();

        return redirect()->route('dashboard')->with('success', 'Koneksi YouTube diputus. Status sekarang belum connect.');
    }

    private function buildOAuthClient(): Client
    {
        $clientId = (string) config('services.youtube.client_id');
        $clientSecret = (string) config('services.youtube.client_secret');

        if ($clientId === '' || $clientSecret === '') {
            abort(500, 'YOUTUBE_CLIENT_ID / YOUTUBE_CLIENT_SECRET belum diatur.');
        }

        $client = new Client();
        $client->setClientId($clientId);
        $client->setClientSecret($clientSecret);
        $client->setRedirectUri(route('admin.youtube.callback'));
        $client->setAccessType('offline');
        $client->setIncludeGrantedScopes(true);
        $client->setPrompt('consent');
        $client->setScopes([YouTube::YOUTUBE_UPLOAD]);

        return $client;
    }

    private function startOAuthFlow(Request $request, bool $isReconnect): Response
    {
        $client = $this->buildOAuthClient();
        $state = Str::random(40);

        $request->session()->put('youtube_oauth_state', $state);
        $client->setState($state);

        if ($isReconnect) {
            // Force consent screen so Google returns a fresh refresh token.
            $client->setPrompt('consent select_account');
        }

        return Inertia::location($client->createAuthUrl());
    }
}