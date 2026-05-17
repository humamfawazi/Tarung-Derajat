import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Galleries({ galleries = [] }) {
    const [selectedGallery, setSelectedGallery] = useState(null);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `/storage/${imagePath}`;
    };

    // Normalize galleries to always work as array
    const photos = galleries?.data ?? (Array.isArray(galleries) ? galleries : []);
    const paginationLinks = galleries?.links ?? null;

    return (
        <PublicLayout>
            <Head title="Galeri Foto" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/15 bg-[#eff6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d4ed8] mb-4">
                        📷 Dokumentasi
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">Galeri Foto</h1>
                    <p className="text-lg text-[#111827]/70 max-w-2xl mx-auto">
                        Koleksi foto dari berbagai acara, kompetisi, dan kegiatan Tarung Derajat.
                    </p>
                </div>

                {/* Gallery Grid */}
                {photos.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl border border-dashed border-[#1d4ed8]/20 bg-[#f5f7ff]/50">
                        <div className="text-5xl mb-4">📷</div>
                        <p className="text-[#111827]/70 text-sm italic">
                            Galeri foto belum tersedia saat ini.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="group cursor-pointer rounded-2xl border border-[#1d4ed8]/10 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                                    onClick={() => setSelectedGallery(photo)}
                                >
                                    <div className="relative aspect-square overflow-hidden bg-[#f5f7ff]">
                                        {photo.image_path ? (
                                            <img
                                                src={getImageUrl(photo.image_path)}
                                                alt={photo.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-[#1d4ed8]/20 text-5xl font-bold">TD</span>
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1d4ed8]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <div>
                                                <h3 className="text-white font-semibold text-base line-clamp-2">
                                                    {photo.title}
                                                </h3>
                                                <p className="text-white/75 text-xs mt-1">Klik untuk lihat detail</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="px-4 py-3">
                                        <h3 className="text-sm font-semibold text-[#111827] line-clamp-1">
                                            {photo.title}
                                        </h3>
                                        {photo.description && (
                                            <p className="text-xs text-[#111827]/60 line-clamp-1 mt-0.5">
                                                {photo.description}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-[#111827]/40 mt-1 font-medium uppercase tracking-wide">
                                            {new Date(photo.created_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {paginationLinks && paginationLinks.length > 3 && (
                            <div className="mt-12 flex justify-center gap-2 flex-wrap">
                                {paginationLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                            link.active
                                                ? 'bg-[#1d4ed8] text-white shadow-md'
                                                : link.url
                                                  ? 'bg-white text-[#111827] border border-[#111827]/10 hover:border-[#1d4ed8]/40 hover:text-[#1d4ed8]'
                                                  : 'bg-[#f5f7ff] text-[#111827]/30 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedGallery && (
                <div
                    className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedGallery(null)}
                >
                    <div
                        className="relative max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedGallery(null)}
                            className="absolute -top-12 right-0 text-white/80 hover:text-white text-3xl transition z-10 leading-none"
                            aria-label="Tutup"
                        >
                            ✕
                        </button>

                        {/* Image */}
                        <div className="rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10">
                            <img
                                src={getImageUrl(selectedGallery.image_path)}
                                alt={selectedGallery.title}
                                className="w-full max-h-[65vh] object-contain"
                            />
                        </div>

                        {/* Photo Details */}
                        <div className="mt-4 bg-white/95 backdrop-blur rounded-2xl px-6 py-5 border border-white/80 shadow-xl">
                            <h2 className="text-xl font-bold text-[#111827] mb-1">
                                {selectedGallery.title}
                            </h2>
                            {selectedGallery.description && (
                                <p className="text-[#111827]/70 text-sm leading-6">
                                    {selectedGallery.description}
                                </p>
                            )}
                            <p className="text-[#111827]/40 text-xs mt-3 font-medium uppercase tracking-wide">
                                Diunggah pada{' '}
                                {new Date(selectedGallery.created_at).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
