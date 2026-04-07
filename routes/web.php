<?php

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
