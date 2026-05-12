<?php

namespace App\Http\Controllers;

use App\Models\LandingSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminLandingController extends Controller
{
    private function generateUniqueSectionKey(string $baseKey, string $locale, ?int $ignoreId = null): string
    {
        $normalizedBase = Str::of($baseKey)
            ->lower()
            ->replace(' ', '_')
            ->replaceMatches('/[^a-z0-9_]/', '')
            ->trim('_')
            ->value();

        if ($normalizedBase === '') {
            $normalizedBase = 'section_'.$locale;
        }

        $candidate = $normalizedBase;
        $suffix = 2;

        while (true) {
            $query = LandingSection::query()
                ->where('locale', $locale)
                ->where('section_key', $candidate);

            if ($ignoreId !== null) {
                $query->where('id', '!=', $ignoreId);
            }

            if (!$query->exists()) {
                return $candidate;
            }

            $candidate = $normalizedBase.'_'.$suffix;
            $suffix++;
        }
    }

    public function create(): RedirectResponse
    {
        return redirect()->route('content.create', ['type' => 'landing']);
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
            'sectionTypes' => [
                ['value' => 'feature', 'label' => 'Feature / Highlight'],
                ['value' => 'history', 'label' => 'History'],
                ['value' => 'philosophy', 'label' => 'Philosophy'],
                ['value' => 'education', 'label' => 'Kompetisi & Event'],
            ],
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
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        $validated['section_key'] = $this->generateUniqueSectionKey(
            $validated['section_key'],
            $validated['locale'],
            $landingSection->id,
        );

        unset($validated['image']);

        if ($request->hasFile('image')) {
            $newImagePath = $request->file('image')->store('landing-sections', 'public');

            if (!empty($landingSection->image_path)) {
                Storage::disk('public')->delete($landingSection->image_path);
            }

            $validated['image_path'] = $newImagePath;
        }

        $landingSection->update($validated);

        return redirect()->route('admin.landing.index')->with('success', 'Konten user berhasil diperbarui.');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'locale' => ['required', 'in:id,en'],
            'section_key' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);

        $validated['section_key'] = $this->generateUniqueSectionKey(
            $validated['section_key'],
            $validated['locale'],
        );

        unset($validated['image']);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('landing-sections', 'public');
        }

        LandingSection::query()->create($validated);

        return redirect()->route('admin.landing.index')->with('success', 'Konten user berhasil ditambahkan.');
    }

    public function destroy(LandingSection $landingSection): RedirectResponse
    {
        $landingSection->delete();

        return redirect()->route('admin.landing.index')->with('success', 'Konten user berhasil dihapus.');
    }
}
