<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminProgramController extends Controller
{
    public function index(): Response
    {
        $programs = Program::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/Programs/Index', [
            'programs' => $programs,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Programs/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'      => ['required', 'string', 'max:255'],
            'description'=> ['nullable', 'string', 'max:500'],
            'content'    => ['nullable', 'string'],
            'image'      => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:3072'],
            'level'      => ['required', 'in:pemula,menengah,mahir'],
            'duration'   => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active'  => ['required', 'boolean'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('programs', 'public');
        }

        Program::create([
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'content'     => $validated['content'] ?? null,
            'image_path'  => $imagePath,
            'level'       => $validated['level'],
            'duration'    => $validated['duration'] ?? null,
            'sort_order'  => $validated['sort_order'] ?? 0,
            'is_active'   => $validated['is_active'],
        ]);

        return redirect()->route('admin.programs.index')->with('success', 'Program latihan berhasil ditambahkan.');
    }

    public function edit(Program $program): Response
    {
        return Inertia::render('Admin/Programs/Edit', [
            'program' => $program,
        ]);
    }

    public function update(Request $request, Program $program): RedirectResponse
    {
        $validated = $request->validate([
            'title'      => ['required', 'string', 'max:255'],
            'description'=> ['nullable', 'string', 'max:500'],
            'content'    => ['nullable', 'string'],
            'image'      => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:3072'],
            'level'      => ['required', 'in:pemula,menengah,mahir'],
            'duration'   => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active'  => ['required', 'boolean'],
        ]);

        if ($request->hasFile('image')) {
            // hapus gambar lama jika ada
            if ($program->image_path) {
                Storage::disk('public')->delete($program->image_path);
            }
            $program->image_path = $request->file('image')->store('programs', 'public');
        }

        $program->update([
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'content'     => $validated['content'] ?? null,
            'level'       => $validated['level'],
            'duration'    => $validated['duration'] ?? null,
            'sort_order'  => $validated['sort_order'] ?? 0,
            'is_active'   => $validated['is_active'],
        ]);

        return redirect()->route('admin.programs.index')->with('success', 'Program latihan berhasil diperbarui.');
    }

    public function destroy(Program $program): RedirectResponse
    {
        if ($program->image_path) {
            Storage::disk('public')->delete($program->image_path);
        }

        $program->delete();

        return redirect()->route('admin.programs.index')->with('success', 'Program latihan berhasil dihapus.');
    }
}
