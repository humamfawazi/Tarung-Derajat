<?php

use App\Http\Controllers\VideoController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminLandingController;
use App\Http\Controllers\ProfileController;
use App\Models\Article;
use App\Models\LandingSection;
use App\Models\Video;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::get('/', function () {
    app()->setLocale('id');

    $landingSections = [];

    if (Schema::hasTable('landing_sections')) {
        $landingSections = LandingSection::query()
            ->where('locale', 'id')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    return Inertia::render('Public/Home', [
        'landingSections' => $landingSections,
    ]);
})->name('home');

Route::get('/id', function () {
    app()->setLocale('id');

    $landingSections = [];

    if (Schema::hasTable('landing_sections')) {
        $landingSections = LandingSection::query()
            ->where('locale', 'id')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    return Inertia::render('Public/Home', [
        'landingSections' => $landingSections,
    ]);
})->name('home.id');

Route::get('/en', function () {
    app()->setLocale('en');

    $landingSections = [];

    if (Schema::hasTable('landing_sections')) {
        $landingSections = LandingSection::query()
            ->where('locale', 'en')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    return Inertia::render('Public/Home', [
        'landingSections' => $landingSections,
    ]);
})->name('home.en');

Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::get('/videos/{video}', [VideoController::class, 'show'])->name('videos.show');
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $currentUser = auth()->user();
        $isAdmin = $currentUser?->hasRole('admin') ?? false;

        $featuredArticlesQuery = Article::query()
            ->with('author:id,name')
            ->where('is_featured', true)
            ->latest('id');

        $latestArticles = $featuredArticlesQuery->limit(5)->get();

        if ($latestArticles->isEmpty()) {
            $latestArticles = Article::query()
                ->with('author:id,name')
                ->latest('id')
                ->limit(5)
                ->get();
        }

        $adminInfos = collect();

        if (Schema::hasTable('landing_sections')) {
            $currentLocale = app()->getLocale() === 'en' ? 'en' : 'id';
            $adminInfos = LandingSection::query()
                ->where('locale', $currentLocale)
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->limit(4)
                ->get(['id', 'title', 'content']);
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
                    ? LandingSection::query()->orderBy('locale')->orderBy('sort_order')->limit(5)->get(['id', 'locale', 'title', 'is_active'])
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
    });
});

require __DIR__.'/auth.php';
