<?php

namespace App\Services;

use Google\Client;
use Google\Service\YouTube;
use Google\Service\YouTube\Video;
use Google\Service\YouTube\VideoSnippet;
use Google\Service\YouTube\VideoStatus;
use Illuminate\Http\UploadedFile;
use RuntimeException;

class YouTubeService
{
    private Client $client;

    public function __construct()
    {
        $clientId = (string) config('services.youtube.client_id');
        $clientSecret = (string) config('services.youtube.client_secret');
        $refreshToken = (string) config('services.youtube.refresh_token');

        if ($clientId === '' || $clientSecret === '' || $refreshToken === '') {
            throw new RuntimeException('YouTube OAuth belum lengkap. Isi YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, dan YOUTUBE_REFRESH_TOKEN.');
        }

        $this->client = new Client();
        $this->client->setClientId($clientId);
        $this->client->setClientSecret($clientSecret);
        $this->client->setAccessType('offline');
        $this->client->setScopes([YouTube::YOUTUBE_UPLOAD]);

        $token = $this->client->fetchAccessTokenWithRefreshToken($refreshToken);

        if (isset($token['error'])) {
            throw new RuntimeException('Gagal refresh access token YouTube: '.$token['error']);
        }

        $this->client->setAccessToken($token);
    }

    /**
     * @return array<string, string>
     */
    public function upload(UploadedFile $file, string $title, ?string $description, string $privacyStatus = 'unlisted'): array
    {
        $youtube = new YouTube($this->client);

        $snippet = new VideoSnippet();
        $snippet->setTitle($title);
        $snippet->setDescription($description ?? '');

        $status = new VideoStatus();
        $status->setPrivacyStatus($privacyStatus);

        $video = new Video();
        $video->setSnippet($snippet);
        $video->setStatus($status);

        $response = $youtube->videos->insert(
            'snippet,status',
            $video,
            [
                'data' => file_get_contents($file->getRealPath()),
                'mimeType' => $file->getMimeType() ?: 'video/mp4',
                'uploadType' => 'multipart',
            ]
        );

        $videoId = (string) $response->getId();

        $thumbnail = '';
        $thumbs = $response->getSnippet()?->getThumbnails();
        if ($thumbs !== null && $thumbs->getHigh() !== null) {
            $thumbnail = (string) $thumbs->getHigh()->getUrl();
        } elseif ($thumbs !== null && $thumbs->getDefault() !== null) {
            $thumbnail = (string) $thumbs->getDefault()->getUrl();
        }

        return [
            'video_id' => $videoId,
            'youtube_url' => 'https://www.youtube.com/watch?v='.$videoId,
            'thumbnail_url' => $thumbnail,
        ];
    }
}
