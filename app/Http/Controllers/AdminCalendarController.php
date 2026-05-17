<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCalendarController extends Controller
{
    public function index(): Response
    {
        $calendars = Calendar::query()
            ->latest('start_date')
            ->get();

        return Inertia::render('Admin/Calendars/Index', [
            'calendars' => $calendars,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Calendars/Create', [
            'eventTypes' => ['kompetisi', 'event'],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date_format:Y-m-d'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_date' => ['required', 'date_format:Y-m-d'],
            'end_time' => ['required', 'date_format:H:i'],
            'location' => ['nullable', 'string', 'max:255'],
            'event_type' => ['required', 'in:kompetisi,event'],
            'is_active' => ['required', 'boolean'],
        ]);

        $startDateTime = $request->input('start_date') . ' ' . $request->input('start_time');
        $endDateTime = $request->input('end_date') . ' ' . $request->input('end_time');

        // Validate datetime relationship
        if (strtotime($endDateTime) <= strtotime($startDateTime)) {
            return back()->withErrors(['end_date' => 'Tanggal berakhir harus lebih besar dari tanggal mulai']);
        }

        Calendar::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'start_date' => $startDateTime,
            'end_date' => $endDateTime,
            'location' => $request->input('location'),
            'event_type' => $request->input('event_type'),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.calendars.index')->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function edit(Calendar $calendar): Response
    {
        return Inertia::render('Admin/Calendars/Edit', [
            'calendar' => $calendar,
            'eventTypes' => ['kompetisi', 'event'],
        ]);
    }

    public function update(Request $request, Calendar $calendar): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date_format:Y-m-d'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_date' => ['required', 'date_format:Y-m-d'],
            'end_time' => ['required', 'date_format:H:i'],
            'location' => ['nullable', 'string', 'max:255'],
            'event_type' => ['required', 'in:kompetisi,event'],
            'is_active' => ['required', 'boolean'],
        ]);

        $startDateTime = $request->input('start_date') . ' ' . $request->input('start_time');
        $endDateTime = $request->input('end_date') . ' ' . $request->input('end_time');

        // Validate datetime relationship
        if (strtotime($endDateTime) <= strtotime($startDateTime)) {
            return back()->withErrors(['end_date' => 'Tanggal berakhir harus lebih besar dari tanggal mulai']);
        }

        $calendar->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'start_date' => $startDateTime,
            'end_date' => $endDateTime,
            'location' => $request->input('location'),
            'event_type' => $request->input('event_type'),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.calendars.index')->with('success', 'Jadwal berhasil diperbarui.');
    }

    public function destroy(Calendar $calendar): RedirectResponse
    {
        $calendar->delete();

        return redirect()->route('admin.calendars.index')->with('success', 'Jadwal berhasil dihapus.');
    }
}
