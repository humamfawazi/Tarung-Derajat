import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProgramsCreate() {
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        description: '',
        content: '',
        image: null,
        level: 'pemula',
        duration: '',
        sort_order: 0,
        is_active: true,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.programs.store'), {
            forceFormData: true,
        });
    };

    const inputClass = (field) =>
        `w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/30 transition ${
            errors[field] ? 'border-red-400 bg-red-50' : 'border-[#1d4ed8]/20 bg-white'
        }`;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Tambah Program Latihan</h2>
                </div>
            }
        >
            <Head title="Tambah Program Latihan" />
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="tarung-shell rounded-[28px] p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Judul */}
                        <div>
                            <label className="block text-sm font-semibold text-[#111827] mb-1.5">
                                Judul Program <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={inputClass('title')}
                                placeholder="contoh: Dasar Gerak Tarung Derajat"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                        </div>

                        {/* Level & Durasi */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#111827] mb-1.5">
                                    Level <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.level}
                                    onChange={(e) => setData('level', e.target.value)}
                                    className={inputClass('level')}
                                >
                                    <option value="pemula">Pemula</option>
                                    <option value="menengah">Menengah</option>
                                    <option value="mahir">Mahir</option>
                                </select>
                                {errors.level && <p className="mt-1 text-xs text-red-600">{errors.level}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#111827] mb-1.5">
                                    Estimasi Durasi
                                </label>
                                <input
                                    type="text"
                                    value={data.duration}
                                    onChange={(e) => setData('duration', e.target.value)}
                                    className={inputClass('duration')}
                                    placeholder="contoh: 3 Bulan, 12 Sesi"
                                />
                                {errors.duration && <p className="mt-1 text-xs text-red-600">{errors.duration}</p>}
                            </div>
                        </div>

                        {/* Deskripsi Singkat */}
                        <div>
                            <label className="block text-sm font-semibold text-[#111827] mb-1.5">
                                Deskripsi Singkat
                                <span className="ml-2 font-normal text-[#111827]/50">(tampil di card)</span>
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={2}
                                maxLength={500}
                                className={inputClass('description')}
                                placeholder="Ringkasan singkat program ini..."
                            />
                            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                        </div>

                        {/* Konten Lengkap */}
                        <div>
                            <label className="block text-sm font-semibold text-[#111827] mb-1.5">
                                Konten Detail
                                <span className="ml-2 font-normal text-[#111827]/50">(tampil di modal detail)</span>
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={8}
                                className={inputClass('content')}
                                placeholder="Tuliskan detail program latihan: tujuan, materi, tahapan, dsb..."
                            />
                            {errors.content && <p className="mt-1 text-xs text-red-600">{errors.content}</p>}
                        </div>

                        {/* Upload Gambar */}
                        <div>
                            <label className="block text-sm font-semibold text-[#111827] mb-1.5">
                                Foto Program
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="program-image-input"
                            />
                            <label
                                htmlFor="program-image-input"
                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#1d4ed8]/20 rounded-xl cursor-pointer hover:bg-[#eff6ff]/50 transition overflow-hidden"
                            >
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="text-center px-4">
                                        <div className="text-3xl mb-2">🖼️</div>
                                        <p className="text-sm text-[#111827]/60">Klik untuk memilih foto</p>
                                        <p className="text-xs text-[#111827]/40 mt-1">JPG, PNG, WebP (maks. 3MB)</p>
                                    </div>
                                )}
                            </label>
                            {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image}</p>}
                        </div>

                        {/* Urutan & Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#111827] mb-1.5">Urutan Tampil</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    className={inputClass('sort_order')}
                                />
                            </div>
                            <div className="flex items-end pb-1">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <div
                                        onClick={() => setData('is_active', !data.is_active)}
                                        className={`w-11 h-6 rounded-full transition-colors duration-200 flex items-center px-0.5 cursor-pointer ${data.is_active ? 'bg-[#1d4ed8]' : 'bg-[#111827]/20'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${data.is_active ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                    <span className="text-sm font-semibold text-[#111827]">
                                        {data.is_active ? 'Program aktif' : 'Program nonaktif'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-[#111827]/8">
                            <button type="submit" disabled={processing} className="tarung-button-primary flex-1">
                                {processing ? 'Menyimpan...' : 'Simpan Program'}
                            </button>
                            <Link href={route('admin.programs.index')} className="tarung-button-secondary flex-1 text-center">
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
