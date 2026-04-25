<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Models\Video;
use App\Services\YouTubeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class VideoController extends Controller
{
    public function index(): RedirectResponse
    {
        return redirect()->route('content.index');
    }

    public function show(Video $video): Response
    {
        $user = Auth::user();

        if ($video->status !== 'published' && ($user === null || !$user->hasPermission('videos.edit'))) {
            abort(404);
        }

        $video->load('uploader:id,name');

        return Inertia::render('Videos/Detail', [
            'video' => $video,
        ]);
    }

    public function create(): RedirectResponse
    {
        return redirect()->route('content.create', ['type' => 'video']);
    }

    public function manageIndex(): Response
    {
        $videos = Video::query()
            ->with('uploader:id,name')
            ->latest('id')
            ->get();

        return Inertia::render('Admin/Videos/Index', [
            'videos' => $videos,
        ]);
    }

    public function edit(Video $video): Response
    {
        return Inertia::render('Admin/Videos/Edit', [
            'video' => $video,
        ]);
    }

    public function update(Request $request, Video $video): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'visibility' => ['required', 'in:public,private,unlisted'],
            'status' => ['required', 'in:published,draft,archived'],
        ]);

        $video->update($validated);

        return redirect()->route('admin.videos.index')->with('success', 'Video berhasil diperbarui.');
    }

    public function destroy(Video $video): RedirectResponse
    {
        $video->delete();

        return redirect()->route('admin.videos.index')->with('success', 'Video berhasil dihapus.');
    }

    public function store(StoreVideoRequest $request, YouTubeService $youTubeService): RedirectResponse
    {
        $user = Auth::user();

        if ($user === null || !$user->hasPermission('videos.create')) {
            return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki izin upload video.');
        }

        $videoSource = $request->string('video_source')->toString();

        if ($videoSource === 'link') {
            $youtubeUrl = trim($request->string('youtube_url')->toString());
            $videoId = $this->extractYouTubeVideoId($youtubeUrl);

            if ($videoId === null) {
                return back()->withErrors([
                    'youtube_url' => 'Link YouTube tidak valid. Gunakan link youtube.com atau youtu.be.',
                ])->withInput();
            }

            if (Video::query()->where('youtube_video_id', $videoId)->exists()) {
                return back()->withErrors([
                    'youtube_url' => 'Video YouTube ini sudah ada di sistem.',
                ])->withInput();
            }

            Video::query()->create([
                'uploader_id' => $user->id,
                'title' => $request->string('title')->toString(),
                'description' => $request->string('description')->toString(),
                'youtube_video_id' => $videoId,
                'youtube_url' => $this->normalizeYouTubeUrl($videoId),
                'thumbnail_url' => $this->buildYouTubeThumbnailUrl($videoId),
                'visibility' => $request->string('visibility')->toString(),
                'status' => 'published',
                'published_at' => now(),
            ]);

            return redirect()->route('videos.index')->with('success', 'Video dari link YouTube berhasil ditambahkan.');
        }

        try {
            $payload = $youTubeService->upload(
                $request->file('video'),
                $request->string('title')->toString(),
                $request->string('description')->toString(),
                $request->string('visibility')->toString(),
            );

            Video::query()->create([
                'uploader_id' => $user->id,
                'title' => $request->string('title')->toString(),
                'description' => $request->string('description')->toString(),
                'youtube_video_id' => $payload['video_id'],
                'youtube_url' => $payload['youtube_url'],
                'thumbnail_url' => $payload['thumbnail_url'],
                'visibility' => $request->string('visibility')->toString(),
                'status' => 'published',
                'published_at' => now(),
            ]);

            return redirect()->route('videos.index')->with('success', 'Video berhasil diupload ke YouTube.');
        } catch (Throwable $e) {
            return back()->withErrors([
                'video' => 'Upload gagal: '.$e->getMessage(),
            ]);
        }
    }

    private function extractYouTubeVideoId(string $url): ?string
    {
        $url = trim($url);

        if ($url === '') {
            return null;
        }

        $parsedUrl = parse_url($url);

        if (!is_array($parsedUrl)) {
            return null;
        }

        $host = strtolower((string) ($parsedUrl['host'] ?? ''));
        $path = (string) ($parsedUrl['path'] ?? '');
        $query = (string) ($parsedUrl['query'] ?? '');

        if (str_starts_with($host, 'www.')) {
            $host = substr($host, 4);
        }

        $candidate = null;

        if ($host === 'youtu.be') {
            $candidate = trim($path, '/');
        } elseif (str_contains($host, 'youtube.com')) {
            parse_str($query, $queryParams);

            if (isset($queryParams['v']) && is_string($queryParams['v'])) {
                $candidate = $queryParams['v'];
            } else {
                $segments = array_values(array_filter(explode('/', trim($path, '/'))));

                if (count($segments) >= 2 && in_array($segments[0], ['embed', 'shorts', 'live'], true)) {
                    $candidate = $segments[1];
                }
            }
        }

        if (!is_string($candidate) || $candidate === '') {
            return null;
        }

        $candidate = preg_replace('/[^A-Za-z0-9_-]/', '', $candidate) ?? '';

        return strlen($candidate) === 11 ? $candidate : null;
    }

    private function normalizeYouTubeUrl(string $videoId): string
    {
        return 'https://www.youtube.com/watch?v='.$videoId;
    }

    private function buildYouTubeThumbnailUrl(string $videoId): string
    {
        return 'https://i.ytimg.com/vi/'.$videoId.'/hqdefault.jpg';
    }
}
