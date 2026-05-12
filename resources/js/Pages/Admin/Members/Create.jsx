import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function MembersCreate() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        member_type: 'athlete',
        position: '',
        specialty: '',
        description: '',
        photo_path: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.members.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Tambah Anggota Baru</h2>
                </div>
            }
        >
            <Head title="Tambah Anggota" />

            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="tarung-shell rounded-[28px] p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Nama <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-2 ${
                                    errors.name ? 'border-red-500' : 'border-[#1d4ed8]/20'
                                }`}
                                placeholder="Masukkan nama lengkap"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Tipe Anggota <span className="text-red-600">*</span>
                            </label>
                            <select
                                value={data.member_type}
                                onChange={(e) => setData('member_type', e.target.value)}
                                className="w-full rounded-lg border border-[#1d4ed8]/20 px-4 py-2"
                            >
                                <option value="athlete">Atlet</option>
                                <option value="board">Pengurus</option>
                            </select>
                            {errors.member_type && <p className="mt-1 text-sm text-red-600">{errors.member_type}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                {data.member_type === 'board' ? 'Posisi' : 'Spesialisasi'}
                            </label>
                            <input
                                type="text"
                                value={data.member_type === 'board' ? data.position : data.specialty}
                                onChange={(e) => {
                                    if (data.member_type === 'board') {
                                        setData('position', e.target.value);
                                    } else {
                                        setData('specialty', e.target.value);
                                    }
                                }}
                                className="w-full rounded-lg border border-[#1d4ed8]/20 px-4 py-2"
                                placeholder={data.member_type === 'board' ? 'Misal: Ketua' : 'Misal: Kelas Berat'}
                            />
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
                                placeholder="Masukkan deskripsi singkat"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Path Foto
                            </label>
                            <input
                                type="text"
                                value={data.photo_path}
                                onChange={(e) => setData('photo_path', e.target.value)}
                                className="w-full rounded-lg border border-[#1d4ed8]/20 px-4 py-2"
                                placeholder="Misal: members/photo.jpg"
                            />
                            <p className="mt-1 text-sm text-[#111827]/60">
                                Upload foto melalui file manager terlebih dahulu
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="tarung-button-primary disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Anggota'}
                            </button>
                            <Link
                                href={route('admin.members.index')}
                                className="tarung-button-secondary"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
