<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(): RedirectResponse
    {
        return redirect()->route('content.index');
    }

    public function manageIndex(): Response
    {
        $articles = Article::query()
            ->with('author:id,name')
            ->latest('id')
            ->get();

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function create(): RedirectResponse
    {
        return redirect()->route('content.create', ['type' => 'article']);
    }

    public function adminCreate(): RedirectResponse
    {
        return redirect()->route('content.create', ['type' => 'article']);
    }

    public function edit(Article $article): Response
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article,
        ]);
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'is_featured' => ['required', 'boolean'],
        ]);

        $article->update($validated);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus.');
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
            'is_featured' => $request->boolean('is_featured') && $user->hasRole('admin'),
        ]);

        return redirect()->route('articles.upload')->with('success', 'Artikel berhasil diupload.');
    }
}
