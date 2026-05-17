import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function GalleriesIndex({ galleries = [] }) {
    const { flash } = usePage().props;

    const getImageUrl = (imagePath) => {
        return `/storage/${imagePath}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Kelola Galeri</h2>
                    </div>
                    <Link href={route('admin.galleries.create')} className="tarung-button-primary w-fit">
                        + Tambah Foto
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Galeri" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}

                {galleries.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
                        <p className="text-gray-500">Belum ada foto galeri. Mulai dengan menambah foto baru.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {galleries.map((gallery) => (
                            <div
                                key={gallery.id}
                                className="tarung-shell rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="aspect-square overflow-hidden bg-gray-200">
                                    <img
                                        src={getImageUrl(gallery.image_path)}
                                        alt={gallery.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="font-semibold text-[#111827] flex-1">
                                            {gallery.title}
                                        </h3>
                                        {!gallery.is_active && (
                                            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                Nonaktif
                                            </span>
                                        )}
                                    </div>

                                    {gallery.description && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {gallery.description}
                                        </p>
                                    )}

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.galleries.edit', gallery.id)}
                                            className="tarung-button-secondary px-3 py-2 text-sm flex-1 text-center"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('admin.galleries.destroy', gallery.id)}
                                            method="delete"
                                            as="button"
                                            className="tarung-button-secondary px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                            onClick={(e) => {
                                                if (!window.confirm('Yakin ingin menghapus foto ini?')) {
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
