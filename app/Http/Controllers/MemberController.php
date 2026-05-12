<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::where('is_active', true)
            ->orderBy('member_type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Members/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'member_type' => 'required|in:board,athlete',
            'position' => 'nullable|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'photo_path' => 'nullable|string',
        ]);

        Member::create($validated);

        return redirect()->route('admin.members.index')
            ->with('success', 'Anggota berhasil ditambahkan.');
    }

    public function edit(Member $member)
    {
        return Inertia::render('Admin/Members/Edit', [
            'member' => $member,
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'member_type' => 'required|in:board,athlete',
            'position' => 'nullable|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'photo_path' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $member->update($validated);

        return redirect()->route('admin.members.index')
            ->with('success', 'Anggota berhasil diperbarui.');
    }

    public function destroy(Member $member)
    {
        $member->delete();

        return redirect()->route('admin.members.index')
            ->with('success', 'Anggota berhasil dihapus.');
    }
}
