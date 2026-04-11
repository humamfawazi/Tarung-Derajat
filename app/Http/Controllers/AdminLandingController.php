<?php

namespace App\Http\Controllers;

use App\Models\LandingSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class AdminLandingController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Admin/Landing/Create');
    }

    public function index(): Response
    {
        $sections = collect();

        if (Schema::hasTable('landing_sections')) {
            $sections = LandingSection::query()
                ->orderBy('locale')
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get();
        }

        return Inertia::render('Admin/Landing/Index', [
            'sections' => $sections,
            'databaseReady' => Schema::hasTable('landing_sections'),
        ]);
    }

    public function edit(LandingSection $landingSection): Response
    {
        return Inertia::render('Admin/Landing/Edit', [
            'section' => $landingSection,
        ]);
    }

    public function update(Request $request, LandingSection $landingSection): RedirectResponse
    {
        $validated = $request->validate([
            'locale' => ['required', 'in:id,en'],
            'section_key' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $landingSection->update($validated);

        return redirect()->route('admin.landing.index')->with('success', 'Konten landing page berhasil diperbarui.');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'locale' => ['required', 'in:id,en'],
            'section_key' => ['required', 'string', 'max:100', 'unique:landing_sections,section_key'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        LandingSection::query()->create($validated);

        return redirect()->route('admin.landing.index')->with('success', 'Konten landing page berhasil ditambahkan.');
    }

    public function destroy(LandingSection $landingSection): RedirectResponse
    {
        $landingSection->delete();

        return redirect()->route('admin.landing.index')->with('success', 'Konten landing page berhasil dihapus.');
    }
}
