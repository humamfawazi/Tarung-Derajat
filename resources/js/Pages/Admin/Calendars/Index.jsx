import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function CalendarsIndex({ calendars = [] }) {
    const { flash } = usePage().props;

    const getEventTypeBadge = (type) => {
        return type === 'kompetisi'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800';
    };

    const getEventTypeLabel = (type) => {
        return type === 'kompetisi' ? 'Kompetisi' : 'Event';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Kelola Jadwal</h2>
                    </div>
                    <Link href={route('admin.calendars.create')} className="tarung-button-primary w-fit">
                        + Tambah Jadwal
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Jadwal" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}

                {calendars.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
                        <p className="text-gray-500">Belum ada jadwal. Mulai dengan menambah jadwal baru.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                        {calendars.map((calendar) => (
                            <div
                                key={calendar.id}
                                className="tarung-shell rounded-2xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-[#111827]">
                                                {calendar.title}
                                            </h3>
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEventTypeBadge(
                                                    calendar.event_type
                                                )}`}
                                            >
                                                {getEventTypeLabel(calendar.event_type)}
                                            </span>
                                            {!calendar.is_active && (
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Nonaktif
                                                </span>
                                            )}
                                        </div>

                                        {calendar.description && (
                                            <p className="text-gray-600 text-sm mb-3">{calendar.description}</p>
                                        )}

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>
                                                <span className="font-medium">Waktu:</span>{' '}
                                                {formatDate(calendar.start_date)}
                                                {new Date(calendar.end_date) > new Date(calendar.start_date) &&
                                                    ` - ${formatDate(calendar.end_date)}`}
                                            </p>
                                            {calendar.location && (
                                                <p>
                                                    <span className="font-medium">Lokasi:</span> {calendar.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.calendars.edit', calendar.id)}
                                            className="tarung-button-secondary px-4 py-2 text-sm"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('admin.calendars.destroy', calendar.id)}
                                            method="delete"
                                            as="button"
                                            className="tarung-button-secondary px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            onClick={(e) => {
                                                if (!window.confirm('Yakin ingin menghapus jadwal ini?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Hapus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
