import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Calendars({ calendars = [] }) {
    const [selectedType, setSelectedType] = useState('semua');

    const filterEvents = (events) => {
        if (selectedType === 'semua') return events;
        return events.filter((e) => e.event_type === selectedType);
    };

    const filteredCalendars = filterEvents(calendars);

    const getEventTypeColor = (type) => {
        return type === 'kompetisi'
            ? { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800' }
            : { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800' };
    };

    const getEventTypeLabel = (type) => {
        return type === 'kompetisi' ? 'Kompetisi' : 'Event';
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('id-ID', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (date) => {
        const d = new Date(date);
        return d.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isUpcoming = (startDate) => {
        return new Date(startDate) > new Date();
    };

    const upcomingCalendars = filteredCalendars.filter((c) => isUpcoming(c.start_date));
    const pastCalendars = filteredCalendars.filter((c) => !isUpcoming(c.start_date));

    return (
        <PublicLayout>
            <Head title="Jadwal Kompetisi & Event" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#1d4ed8] to-[#1e40af] text-white py-12 px-4">
                    <div className="mx-auto max-w-6xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Jadwal Kompetisi & Event</h1>
                        <p className="text-white/90 text-lg">
                            Lihat jadwal lengkap kompetisi dan acara yang akan datang
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-6xl px-4 py-12">
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        <button
                            onClick={() => setSelectedType('semua')}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${
                                selectedType === 'semua'
                                    ? 'bg-[#1d4ed8] text-white shadow-lg'
                                    : 'bg-white text-[#111827] border-2 border-gray-200 hover:border-[#1d4ed8]'
                            }`}
                        >
                            Semua ({calendars.length})
                        </button>
                        <button
                            onClick={() => setSelectedType('kompetisi')}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${
                                selectedType === 'kompetisi'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-white text-[#111827] border-2 border-gray-200 hover:border-blue-500'
                            }`}
                        >
                            Kompetisi (
                            {calendars.filter((c) => c.event_type === 'kompetisi').length})
                        </button>
                        <button
                            onClick={() => setSelectedType('event')}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${
                                selectedType === 'event'
                                    ? 'bg-purple-500 text-white shadow-lg'
                                    : 'bg-white text-[#111827] border-2 border-gray-200 hover:border-purple-500'
                            }`}
                        >
                            Event ({calendars.filter((c) => c.event_type === 'event').length})
                        </button>
                    </div>

                    {/* Upcoming Events */}
                    {upcomingCalendars.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#111827] mb-6">Akan Datang</h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                {upcomingCalendars.map((calendar) => {
                                    const colors = getEventTypeColor(calendar.event_type);
                                    return (
                                        <div
                                            key={calendar.id}
                                            className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-6 hover:shadow-lg transition-shadow`}
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <h3 className="text-xl font-semibold text-[#111827] flex-1">
                                                    {calendar.title}
                                                </h3>
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                                                    {getEventTypeLabel(calendar.event_type)}
                                                </span>
                                            </div>

                                            {calendar.description && (
                                                <p className="text-gray-700 text-sm mb-4">
                                                    {calendar.description}
                                                </p>
                                            )}

                                            <div className="space-y-2 text-sm text-gray-700">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">📅</span>
                                                    <span>
                                                        {formatDate(calendar.start_date)}
                                                        {new Date(calendar.end_date) >
                                                            new Date(calendar.start_date) &&
                                                            ` - ${formatDate(calendar.end_date)}`}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">🕐</span>
                                                    <span>
                                                        {formatTime(calendar.start_date)}
                                                        {new Date(calendar.end_date) >
                                                            new Date(calendar.start_date) &&
                                                            ` - ${formatTime(calendar.end_date)}`}
                                                    </span>
                                                </div>
                                                {calendar.location && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">📍</span>
                                                        <span>{calendar.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Past Events */}
                    {pastCalendars.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#111827] mb-6">Acara Sebelumnya</h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                {pastCalendars.map((calendar) => {
                                    const colors = getEventTypeColor(calendar.event_type);
                                    return (
                                        <div
                                            key={calendar.id}
                                            className={`${colors.bg} border-l-4 border-gray-300 rounded-lg p-6 opacity-75 hover:shadow-lg transition-shadow`}
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <h3 className="text-xl font-semibold text-[#111827] flex-1">
                                                    {calendar.title}
                                                </h3>
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-700">
                                                    Selesai
                                                </span>
                                            </div>

                                            {calendar.description && (
                                                <p className="text-gray-700 text-sm mb-4">
                                                    {calendar.description}
                                                </p>
                                            )}

                                            <div className="space-y-2 text-sm text-gray-700">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">📅</span>
                                                    <span>
                                                        {formatDate(calendar.start_date)}
                                                        {new Date(calendar.end_date) >
                                                            new Date(calendar.start_date) &&
                                                            ` - ${formatDate(calendar.end_date)}`}
                                                    </span>
                                                </div>
                                                {calendar.location && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">📍</span>
                                                        <span>{calendar.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredCalendars.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">📭</div>
                            <p className="text-gray-600 text-lg">
                                Tidak ada jadwal untuk kategori yang dipilih
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
