<?php

use App\Http\Controllers\VideoController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\AdminDisplaySettingController;
use App\Http\Controllers\AdminYouTubeController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminLandingController;
use App\Http\Controllers\ProfileController;
use App\Services\YouTubeTokenStore;
use App\Models\Article;
use App\Models\DisplaySetting;
use App\Models\LandingSection;
use App\Models\Video;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

$buildHomeProps = function (string $locale): array {
    app()->setLocale($locale);

    $displayLimits = DisplaySetting::DEFAULTS;

    if (Schema::hasTable('display_settings')) {
        $storedDisplayLimits = DisplaySetting::query()
            ->whereIn('key', array_keys(DisplaySetting::DEFAULTS))
            ->pluck('value', 'key')
            ->all();

        $displayLimits = [
            ...$displayLimits,
            ...$storedDisplayLimits,
        ];
    }

    $articleLimit = max(1, (int) ($displayLimits['articles_user_limit'] ?? DisplaySetting::DEFAULTS['articles_user_limit']));
    $videoLimit = max(1, (int) ($displayLimits['videos_user_limit'] ?? DisplaySetting::DEFAULTS['videos_user_limit']));
    $historyLimit = max(1, (int) ($displayLimits['history_user_limit'] ?? DisplaySetting::DEFAULTS['history_user_limit']));
    $philosophyLimit = max(1, (int) ($displayLimits['philosophy_user_limit'] ?? DisplaySetting::DEFAULTS['philosophy_user_limit']));
    $educationLimit = max(1, (int) ($displayLimits['education_user_limit'] ?? DisplaySetting::DEFAULTS['education_user_limit']));

    $featureSections = collect();
    $historySections = collect();
    $philosophySections = collect();
    $educationSections = collect();

    if (Schema::hasTable('landing_sections')) {
        $featureSections = LandingSection::query()
            ->where('locale', $locale)
            ->where('is_active', true)
            ->where('section_key', 'like', 'feature_%')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $historySections = LandingSection::query()
            ->where('locale', $locale)
            ->where('is_active', true)
            ->where('section_key', 'like', 'history_%')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->limit($historyLimit)
            ->get(['id', 'title', 'content', 'image_path']);

        $philosophySections = LandingSection::query()
            ->where('locale', $locale)
            ->where('is_active', true)
            ->where('section_key', 'like', 'philosophy_%')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->limit($philosophyLimit)
            ->get(['id', 'title', 'content', 'image_path']);

        $educationSections = LandingSection::query()
            ->where('locale', $locale)
            ->where('is_active', true)
            ->where('section_key', 'like', 'education_%')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->limit($educationLimit)
            ->get(['id', 'title', 'content', 'image_path']);
    }

    $latestArticles = collect();
    if (Schema::hasTable('articles')) {
        $latestArticles = Article::query()
            ->with('author:id,name')
            ->latest('id')
            ->limit($articleLimit)
            ->get(['id', 'user_id', 'title', 'content', 'image_path', 'created_at']);
    }

    $latestVideos = collect();
    if (Schema::hasTable('videos')) {
        $latestVideos = Video::query()
            ->with('uploader:id,name')
            ->where('status', 'published')
            ->latest('published_at')
            ->latest('id')
            ->limit($videoLimit)
            ->get(['id', 'uploader_id', 'title', 'description', 'youtube_url', 'thumbnail_url', 'published_at']);
    }

    return [
        'landingSections' => $featureSections,
        'historySections' => $historySections,
        'philosophySections' => $philosophySections,
        'educationSections' => $educationSections,
        'latestArticles' => $latestArticles,
        'latestVideos' => $latestVideos,
    ];
};

Route::get('/', function () use ($buildHomeProps) {
    return Inertia::render('Public/Home', $buildHomeProps('id'));
})->name('home');

Route::get('/id', function () use ($buildHomeProps) {
    return Inertia::render('Public/Home', $buildHomeProps('id'));
})->name('home.id');

Route::get('/en', function () use ($buildHomeProps) {
    return Inertia::render('Public/Home', $buildHomeProps('en'));
})->name('home.en');

Route::get('/content', [ContentController::class, 'index'])->name('content.index');
Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::get('/videos/{video}', [VideoController::class, 'show'])->name('videos.show');
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/content/create', [ContentController::class, 'create'])->name('content.create');
    Route::post('/content', [ContentController::class, 'store'])->name('content.store');

    Route::get('/dashboard', function () {
        $currentUser = auth()->user();
        $isAdmin = $currentUser?->hasRole('admin') ?? false;
        $youtubeConnected = false;

        if ($isAdmin) {
            $tokenStore = app(YouTubeTokenStore::class);
            $youtubeConnected = $tokenStore->hasStoredToken();
        }

        $latestArticles = Article::query()
            ->with('author:id,name')
            ->latest('id')
            ->limit(5)
            ->get();

        $adminInfos = collect();

        if (Schema::hasTable('landing_sections')) {
            $currentLocale = app()->getLocale() === 'en' ? 'en' : 'id';
            $adminInfos = LandingSection::query()
                ->where('locale', $currentLocale)
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->limit(4)
                ->get(['id', 'title', 'content', 'image_path']);
        }

        $adminCrud = null;
        if ($isAdmin) {
            $adminCrud = [
                'articles' => Article::query()
                    ->with('author:id,name')
                    ->latest('id')
                    ->limit(5)
                    ->get(['id', 'user_id', 'title', 'is_featured', 'created_at']),
                'users' => User::query()
                    ->latest('id')
                    ->limit(5)
                    ->get(['id', 'name', 'email', 'email_verified_at', 'role']),
                'videos' => Video::query()
                    ->with('uploader:id,name')
                    ->latest('id')
                    ->limit(5)
                    ->get(['id', 'uploader_id', 'title', 'status', 'visibility']),
                'landing' => Schema::hasTable('landing_sections')
                    ? LandingSection::query()->orderBy('locale')->orderBy('sort_order')->limit(5)->get(['id', 'locale', 'section_key', 'title', 'is_active'])
                    : collect(),
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'articles_count' => Article::query()->count(),
                'featured_articles_count' => Article::query()->where('is_featured', true)->count(),
                'videos_count' => Video::query()->where('status', 'published')->count(),
                'users_count' => User::query()->count(),
            ],
            'latestArticles' => $latestArticles,
            'adminInfos' => $adminInfos,
            'adminCrud' => $adminCrud,
            'youtubeConnected' => $youtubeConnected,
        ]);
    })->name('dashboard');

    Route::get('/dashboard/videos/upload', [VideoController::class, 'create'])
        ->middleware('permission:videos.create')
        ->name('videos.upload');
    Route::post('/dashboard/videos', [VideoController::class, 'store'])
        ->middleware('permission:videos.create')
        ->name('videos.store');

    Route::get('/dashboard/articles/upload', [ArticleController::class, 'create'])
        ->middleware('role:admin,pelatih,coach')
        ->name('articles.upload');
    Route::post('/dashboard/articles', [ArticleController::class, 'store'])
        ->middleware('role:admin,pelatih,coach')
        ->name('articles.store');

    Route::middleware(['role:admin'])->prefix('dashboard/manage')->name('admin.')->group(function () {
        Route::get('/youtube/connect', [AdminYouTubeController::class, 'redirect'])->name('youtube.connect');
        Route::get('/youtube/reconnect', [AdminYouTubeController::class, 'reconnect'])->name('youtube.reconnect');
        Route::get('/youtube/callback', [AdminYouTubeController::class, 'callback'])->name('youtube.callback');
        Route::get('/youtube/disconnect', [AdminYouTubeController::class, 'disconnect'])->name('youtube.disconnect');

        Route::get('/articles/create', [ArticleController::class, 'adminCreate'])->name('articles.create');
        Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');

        Route::get('/users/create', [AdminUserController::class, 'create'])->name('users.create');
        Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');

        Route::get('/landing/create', [AdminLandingController::class, 'create'])->name('landing.create');
        Route::post('/landing', [AdminLandingController::class, 'store'])->name('landing.store');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['role:admin'])->prefix('dashboard/manage')->name('admin.')->group(function () {
        Route::get('/content', function () {
            $displayLimits = DisplaySetting::DEFAULTS;

            if (Schema::hasTable('display_settings')) {
                $storedDisplayLimits = DisplaySetting::query()
                    ->whereIn('key', array_keys(DisplaySetting::DEFAULTS))
                    ->pluck('value', 'key')
                    ->all();

                $displayLimits = [
                    ...$displayLimits,
                    ...$storedDisplayLimits,
                ];
            }

            $sections = Schema::hasTable('landing_sections')
                ? LandingSection::query()
                    ->orderBy('locale')
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->get(['id', 'locale', 'section_key', 'title', 'is_active', 'sort_order'])
                : collect();

            $articles = Schema::hasTable('articles')
                ? Article::query()
                    ->with('author:id,name')
                    ->latest('id')
                    ->get(['id', 'user_id', 'title', 'is_featured', 'created_at'])
                : collect();

            $videos = Schema::hasTable('videos')
                ? Video::query()
                    ->with('uploader:id,name')
                    ->latest('id')
                    ->get(['id', 'uploader_id', 'title', 'status', 'visibility', 'published_at'])
                : collect();

            return Inertia::render('Admin/Content/Index', [
                'sections' => $sections,
                'articles' => $articles,
                'videos' => $videos,
                'displayLimits' => [
                    'history_user_limit' => max(1, (int) ($displayLimits['history_user_limit'] ?? DisplaySetting::DEFAULTS['history_user_limit'])),
                    'philosophy_user_limit' => max(1, (int) ($displayLimits['philosophy_user_limit'] ?? DisplaySetting::DEFAULTS['philosophy_user_limit'])),
                    'education_user_limit' => max(1, (int) ($displayLimits['education_user_limit'] ?? DisplaySetting::DEFAULTS['education_user_limit'])),
                ],
            ]);
        })->name('content.index');

        Route::get('/videos', [VideoController::class, 'manageIndex'])->name('videos.index');
        Route::get('/videos/{video}/edit', [VideoController::class, 'edit'])->name('videos.edit');
        Route::patch('/videos/{video}', [VideoController::class, 'update'])->name('videos.update');
        Route::delete('/videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');

        Route::get('/articles', [ArticleController::class, 'manageIndex'])->name('articles.index');
        Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
        Route::patch('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
        Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');

        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
        Route::patch('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');

        Route::get('/landing', [AdminLandingController::class, 'index'])->name('landing.index');
        Route::get('/landing/{landingSection}/edit', [AdminLandingController::class, 'edit'])->name('landing.edit');
        Route::patch('/landing/{landingSection}', [AdminLandingController::class, 'update'])->name('landing.update');
        Route::delete('/landing/{landingSection}', [AdminLandingController::class, 'destroy'])->name('landing.destroy');

        Route::get('/display-settings', [AdminDisplaySettingController::class, 'edit'])->name('display-settings.edit');
        Route::patch('/display-settings', [AdminDisplaySettingController::class, 'update'])->name('display-settings.update');
    });
});

require __DIR__.'/auth.php';
