<?php

use App\Models\Video;
use Illuminate\Support\Facades\Route;

Route::get('/videos', function () {
    return Video::query()
        ->with('uploader:id,name')
        ->where('status', 'published')
        ->latest('published_at')
        ->latest('id')
        ->get(['id', 'uploader_id', 'title', 'description', 'youtube_video_id', 'youtube_url', 'thumbnail_url', 'visibility', 'status', 'published_at', 'created_at']);
});