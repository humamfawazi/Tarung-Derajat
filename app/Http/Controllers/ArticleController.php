<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Articles/Upload');
    }

    public function store(StoreArticleRequest $request): RedirectResponse
    {
        $user = Auth::user();

        if ($user === null || !$user->hasAnyRole(['admin', 'pelatih', 'coach'])) {
            return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki izin upload artikel.');
        }

        $imagePath = $request->file('image')?->store('articles', 'public');

        Article::query()->create([
            'user_id' => $user->id,
            'title' => $request->string('title')->toString(),
            'content' => $request->string('content')->toString(),
            'image_path' => $imagePath,
        ]);

        return redirect()->route('articles.upload')->with('success', 'Artikel berhasil diupload.');
    }
}
