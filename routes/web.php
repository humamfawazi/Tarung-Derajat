<?php

use App\Http\Controllers\VideoController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    app()->setLocale('id');

    return Inertia::render('Public/Home');
})->name('home');

Route::get('/id', function () {
    app()->setLocale('id');

    return Inertia::render('Public/Home');
})->name('home.id');

Route::get('/en', function () {
    app()->setLocale('en');

    return Inertia::render('Public/Home');
})->name('home.en');

Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::get('/videos/{video}', [VideoController::class, 'show'])->name('videos.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
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

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
