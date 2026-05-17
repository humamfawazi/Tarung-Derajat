import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function GalleriesEdit({ gallery }) {
    const { data, setData, patch, errors, processing } = useForm({
        title: gallery.title,
        description: gallery.description || '',
        image: null,
        is_active: gallery.is_active,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image);
        }
        formData.append('is_active', data.is_active ? 1 : 0);

        patch(route('admin.galleries.update', gallery.id), {
            data: formData,
        });
    };

    const getImageUrl = (imagePath) => {
        return `/storage/${imagePath}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Edit Foto Galeri</h2>
                </div>
            }
        >
            <Head title="Edit Foto Galeri" />

            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="tarung-shell rounded-[28px] p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Judul Foto <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`w-full rounded-lg border px-4 py-2 ${
                                    errors.title ? 'border-red-500' : 'border-[#1d4ed8]/20'
                                }`}
                                placeholder="Masukkan judul foto"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Deskripsi Foto
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="4"
                                className="w-full rounded-lg border border-[#1d4ed8]/20 px-4 py-2"
                                placeholder="Masukkan deskripsi foto (opsional)"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Foto Saat Ini
                            </label>
                            <div className="mb-4 rounded-lg overflow-hidden bg-gray-200 aspect-square max-w-xs">
                                <img
                                    src={getImageUrl(gallery.image_path)}
                                    alt={gallery.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <label className="block text-sm font-medium text-[#111827] mb-2">
                                Ganti Foto (Opsional)
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-input"
                                />
                                <label
                                    htmlFor="image-input"
                                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#1d4ed8]/20 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                                >
                                    {preview ? (
                                        <div className="w-full h-full">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">📷</div>
                                            <p className="text-sm text-gray-600">
                                                Klik untuk memilih foto baru
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                JPG, PNG, GIF (Max 2MB)
                                            </p>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
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
                                Foto aktif/terlihat di galeri
                            </label>
                        </div>

                        <div className="flex gap-3 pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="tarung-button-primary flex-1"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                            <Link href={route('admin.galleries.index')} className="tarung-button-secondary flex-1 text-center">
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
