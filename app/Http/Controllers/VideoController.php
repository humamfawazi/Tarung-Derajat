<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Models\Video;
use App\Services\YouTubeService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class VideoController extends Controller
{
    public function index(): Response
    {
        $videos = Video::query()
            ->with('uploader:id,name')
            ->where('status', 'published')
            ->latest('published_at')
            ->latest('id')
            ->get();

        return Inertia::render('Videos/Index', [
            'videos' => $videos,
        ]);
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

    public function create(): Response
    {
        return Inertia::render('Videos/Upload');
    }

    public function store(StoreVideoRequest $request, YouTubeService $youTubeService): RedirectResponse
    {
        $user = Auth::user();

        if ($user === null || !$user->hasPermission('videos.create')) {
            return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki izin upload video.');
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
}
