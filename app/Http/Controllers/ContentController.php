<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\LandingSection;
use App\Models\DisplaySetting;
use App\Models\Video;
use App\Services\YouTubeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ContentController extends Controller
{
    private function canCreateLanding(): bool
    {
        return Auth::user()?->hasRole('admin') ?? false;
    }

    private function canCreateArticle(): bool
    {
        return Auth::user()?->hasAnyRole(['admin', 'pelatih', 'coach']) ?? false;
    }

    private function canCreateVideo(): bool
    {
        return Auth::user()?->hasPermission('videos.create') ?? false;
    }

    private function normalizeContentType(?string $contentType): string
    {
        $allowedTypes = array_values(array_filter([
            $this->canCreateLanding() ? 'landing' : null,
            $this->canCreateArticle() ? 'article' : null,
            $this->canCreateVideo() ? 'video' : null,
        ]));

        if ($allowedTypes === []) {
            return 'article';
        }

        return in_array($contentType, $allowedTypes, true)
            ? $contentType
            : ($allowedTypes[0] ?? 'article');
    }

    private function normalizeSectionType(string $sectionType): string
    {
        return in_array($sectionType, ['feature', 'history', 'philosophy', 'education'], true)
            ? $sectionType
            : 'feature';
    }

    private function nextLandingSortOrder(string $sectionType, string $locale): int
    {
        if (!Schema::hasTable('landing_sections')) {
            return 0;
        }

        $maxSortOrder = LandingSection::query()
            ->where('locale', $locale)
            ->where('section_key', 'like', $sectionType.'_%')
            ->max('sort_order');

        return $maxSortOrder === null ? 0 : ((int) $maxSortOrder) + 1;
    }

    private function generateLandingSectionKey(string $sectionType, string $title, string $locale): string
    {
        $baseKey = $sectionType.'_'.Str::slug($title, '_');

        if ($baseKey === $sectionType.'_') {
            $baseKey = $sectionType.'_section';
        }

        $candidate = $baseKey;
        $suffix = 2;

        while (LandingSection::query()
            ->where('locale', $locale)
            ->where('section_key', $candidate)
            ->exists()) {
            $candidate = $baseKey.'_'.$suffix;
            $suffix++;
        }

        return $candidate;
    }

    public function index(): Response
    {
        $defaultArticleLimit = DisplaySetting::DEFAULTS['articles_user_limit'];
        $defaultVideoLimit = DisplaySetting::DEFAULTS['videos_user_limit'];

        $articleLimit = $defaultArticleLimit;
        $videoLimit = $defaultVideoLimit;

        if (Schema::hasTable('display_settings')) {
            $settings = DisplaySetting::query()
                ->whereIn('key', ['articles_user_limit', 'videos_user_limit'])
                ->pluck('value', 'key');

            $articleLimit = max(1, (int) ($settings['articles_user_limit'] ?? $defaultArticleLimit));
            $videoLimit = max(1, (int) ($settings['videos_user_limit'] ?? $defaultVideoLimit));
        }

        $articles = collect();
        if (Schema::hasTable('articles')) {
            $articles = Article::query()
                ->with('author:id,name')
                ->latest('id')
                ->limit($articleLimit)
                ->get();
        }

        $videos = collect();
        if (Schema::hasTable('videos')) {
            $videos = Video::query()
                ->with('uploader:id,name')
                ->where('status', 'published')
                ->latest('published_at')
                ->latest('id')
                ->limit($videoLimit)
                ->get();
        }

        return Inertia::render('Content/Index', [
            'articles' => $articles,
            'videos' => $videos,
            'displayLimits' => [
                'articles' => $articleLimit,
                'videos' => $videoLimit,
            ],
        ]);
    }

    public function create(Request $request): Response
    {
        $contentType = $this->normalizeContentType($request->query('type'));

        if ($contentType === 'landing' && !$this->canCreateLanding()) {
            $contentType = $this->normalizeContentType(null);
        }

        if ($contentType === 'article' && !$this->canCreateArticle()) {
            $contentType = $this->normalizeContentType(null);
        }

        if ($contentType === 'video' && !$this->canCreateVideo()) {
            $contentType = $this->normalizeContentType(null);
        }

        return Inertia::render('Content/Create', [
            'initialType' => $contentType,
            'canCreateLanding' => $this->canCreateLanding(),
            'canCreateArticle' => $this->canCreateArticle(),
            'canCreateVideo' => $this->canCreateVideo(),
        ]);
    }

    public function store(Request $request, YouTubeService $youTubeService): RedirectResponse
    {
        $contentType = $this->normalizeContentType($request->string('content_type')->toString());
        $user = Auth::user();

        if ($contentType === 'landing') {
            if (!$this->canCreateLanding()) {
                return back()->with('error', 'Anda tidak memiliki izin untuk membuat konten landing.');
            }

            $validated = $request->validate([
                'section_type' => ['required', 'in:feature,history,philosophy,education'],
                'locale' => ['required', 'in:id,en'],
                'title' => ['required', 'string', 'max:255'],
                'content' => ['required', 'string'],
                'image' => ['nullable', 'image', 'max:4096'],
                'is_active' => ['required', 'boolean'],
            ]);

            $sectionType = $this->normalizeSectionType($validated['section_type']);
            $sectionKey = $this->generateLandingSectionKey($sectionType, $validated['title'], $validated['locale']);
            $imagePath = $request->file('image')?->store('landing-sections', 'public');

            LandingSection::query()->create([
                'locale' => $validated['locale'],
                'section_key' => $sectionKey,
                'title' => $validated['title'],
                'content' => $validated['content'],
                'image_path' => $imagePath,
                'is_active' => $validated['is_active'],
                'sort_order' => $this->nextLandingSortOrder($sectionType, $validated['locale']),
            ]);

            return redirect()
                ->route('admin.content.index')
                ->with('success', 'Konten landing berhasil ditambahkan.');
        }

        if ($contentType === 'article') {
            if (!$this->canCreateArticle()) {
                return back()->with('error', 'Anda tidak memiliki izin untuk mengupload artikel.');
            }

            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'content' => ['required', 'string'],
                'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
                'is_featured' => ['nullable', 'boolean'],
            ]);

            $imagePath = $request->file('image')?->store('articles', 'public');

            Article::query()->create([
                'user_id' => $user?->id,
                'title' => $validated['title'],
                'content' => $validated['content'],
                'image_path' => $imagePath,
                'is_featured' => ($validated['is_featured'] ?? false) && ($user?->hasRole('admin') ?? false),
            ]);

            return redirect()
                ->route('content.create', ['type' => 'article'])
                ->with('success', 'Artikel berhasil ditambahkan.');
        }

        if (!$this->canCreateVideo()) {
            return back()->with('error', 'Anda tidak memiliki izin untuk mengupload video.');
        }

        $validated = $request->validate([
            'video_source' => ['required', 'in:upload,link'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'visibility' => ['required', 'in:public,private,unlisted'],
            'youtube_url' => ['nullable', 'url', 'max:500', 'required_if:video_source,link'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm', 'max:512000', 'required_if:video_source,upload'],
        ]);

        if ($validated['video_source'] === 'link') {
            $youtubeUrl = trim((string) ($validated['youtube_url'] ?? ''));
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
                'uploader_id' => $user?->id,
                'title' => $validated['title'],
                'description' => $validated['description'] ?? '',
                'youtube_video_id' => $videoId,
                'youtube_url' => $this->normalizeYouTubeUrl($videoId),
                'thumbnail_url' => $this->buildYouTubeThumbnailUrl($videoId),
                'visibility' => $validated['visibility'],
                'status' => 'published',
                'published_at' => now(),
            ]);

            return redirect()
                ->route('content.create', ['type' => 'video'])
                ->with('success', 'Video dari link YouTube berhasil ditambahkan.');
        }

        try {
            $payload = $youTubeService->upload(
                $request->file('video'),
                $validated['title'],
                $validated['description'] ?? '',
                $validated['visibility'],
            );

            Video::query()->create([
                'uploader_id' => $user?->id,
                'title' => $validated['title'],
                'description' => $validated['description'] ?? '',
                'youtube_video_id' => $payload['video_id'],
                'youtube_url' => $payload['youtube_url'],
                'thumbnail_url' => $payload['thumbnail_url'],
                'visibility' => $validated['visibility'],
                'status' => 'published',
                'published_at' => now(),
            ]);

            return redirect()
                ->route('content.create', ['type' => 'video'])
                ->with('success', 'Video berhasil diupload ke YouTube.');
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
