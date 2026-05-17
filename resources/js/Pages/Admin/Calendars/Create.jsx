import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CalendarsCreate({ eventTypes = [] }) {
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        description: '',
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        location: '',
        event_type: 'kompetisi',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.calendars.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Tambah Jadwal Baru</h2>
                </div>
            }
        >
            <Head title="Tambah Jadwal" />

            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="tarung-shell rounded-[28px] p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Judul <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-2 ${
                                    errors.title ? 'border-red-500' : 'border-[#1d4ed8]/20'
                                }`}
                                placeholder="Masukkan judul jadwal"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Tipe Acara <span className="text-red-600">*</span>
                            </label>
                            <select
                                value={data.event_type}
                                onChange={(e) => setData('event_type', e.target.value)}
                                className="w-full rounded-lg border border-[#1d4ed8]/20 px-4 py-2"
                            >
                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type === 'kompetisi' ? 'Kompetisi' : 'Event'}
                                    </option>
                                ))}
                            </select>
                            {errors.event_type && <p className="mt-1 text-sm text-red-600">{errors.event_type}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="4"
                                className="w-full rounded-lg border border-[#1d4ed8]/20 px-4 py-2"
                                placeholder="Masukkan deskripsi jadwal"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#111827] mb-2">
                                    Tanggal Mulai <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-2 ${
                                        errors.start_date ? 'border-red-500' : 'border-[#1d4ed8]/20'
                                    }`}
                                />
                                {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#111827] mb-2">
                                    Jam Mulai <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="time"
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-2 ${
                                        errors.start_time ? 'border-red-500' : 'border-[#1d4ed8]/20'
                                    }`}
                                />
                                {errors.start_time && <p className="mt-1 text-sm text-red-600">{errors.start_time}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#111827] mb-2">
                                    Tanggal Berakhir <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-2 ${
                                        errors.end_date ? 'border-red-500' : 'border-[#1d4ed8]/20'
                                    }`}
                                />
                                {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#111827] mb-2">
                                    Jam Berakhir <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="time"
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-2 ${
                                        errors.end_time ? 'border-red-500' : 'border-[#1d4ed8]/20'
                                    }`}
                                />
                                {errors.end_time && <p className="mt-1 text-sm text-red-600">{errors.end_time}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Lokasi
                            </label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="w-full rounded-lg border border-[#1d4ed8]/20 px-4 py-2"
                                placeholder="Masukkan lokasi jadwal"
                            />
                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded border-[#1d4ed8]/20"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-[#111827]">
                                Jadwal aktif/terlihat
                            </label>
                        </div>

                            <div className="flex gap-3 pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="tarung-button-primary flex-1"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Jadwal'}
                            </button>
                            <Link href={route('admin.calendars.index')} className="tarung-button-secondary flex-1 text-center">
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
