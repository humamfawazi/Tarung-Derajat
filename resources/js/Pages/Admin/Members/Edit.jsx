import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import GalleryPickerModal from '@/Components/GalleryPickerModal';

export default function MembersEdit({ member, galleries }) {
    const [showGalleryPicker, setShowGalleryPicker] = useState(false);
    const { data, setData, post, errors, processing } = useForm({
        _method: 'patch',
        name: member.name,
        member_type: member.member_type,
        position: member.position || '',
        specialty: member.specialty || '',
        description: member.description || '',
        photo_path: member.photo_path || '',
        is_active: member.is_active,
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.members.update', member.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Edit Anggota: {member.name}</h2>
                </div>
            }
        >
            <Head title={`Edit ${member.name}`} />

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
                            <input
                                type="text"
                                value={data.member_type}
                                onChange={(e) => setData('member_type', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-2 ${
                                    errors.member_type ? 'border-red-500' : 'border-[#1d4ed8]/20'
                                }`}
                                placeholder="Misal: Pengurus, Dewan Penasihat, Atlet"
                                list="member_types"
                            />
                            <datalist id="member_types">
                                <option value="Pengurus" />
                                <option value="Dewan Penasihat" />
                                <option value="Perguruan Daerah" />
                                <option value="Bidang Pembinaan Prestasi" />
                                <option value="Bidang Organisasi dan Umum" />
                                <option value="Atlet" />
                            </datalist>
                            {errors.member_type && <p className="mt-1 text-sm text-red-600">{errors.member_type}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Posisi / Spesialisasi
                            </label>
                            <input
                                type="text"
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                                className="w-full rounded-lg border border-[#1d4ed8]/20 px-4 py-2"
                                placeholder="Misal: Ketua Umum, Kelas Berat, dll"
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
                                Foto Anggota
                            </label>
                            <div className="flex items-center gap-4">
                                {data.photo_path && (
                                    <img 
                                        src={data.photo_path.startsWith('http') ? data.photo_path : `/storage/${data.photo_path}`} 
                                        alt="Preview" 
                                        className="h-16 w-16 object-cover rounded-lg border"
                                    />
                                )}
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('photo', e.target.files[0])}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1d4ed8]/10 file:text-[#1d4ed8] hover:file:bg-[#1d4ed8]/20 transition-colors cursor-pointer"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Upload file baru atau pilih dari galeri.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowGalleryPicker(true)}
                                    className="tarung-button-secondary py-2 whitespace-nowrap"
                                >
                                    Pilih dari Galeri
                                </button>
                            </div>
                            {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                            <GalleryPickerModal 
                                isOpen={showGalleryPicker} 
                                onClose={() => setShowGalleryPicker(false)} 
                                galleries={galleries}
                                onSelect={(path) => {
                                    setData('photo_path', path);
                                    setShowGalleryPicker(false);
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Status
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="rounded"
                                />
                                <span className="text-[#111827]">Aktif</span>
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="tarung-button-primary disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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
