import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Galleries({ galleries = [] }) {
    const [selectedGallery, setSelectedGallery] = useState(null);

    const getImageUrl = (imagePath) => {
        return `/storage/${imagePath}`;
    };

    return (
        <PublicLayout>
            <Head title="Galeri Foto" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#1d4ed8] to-[#1e40af] text-white py-12 px-4">
                    <div className="mx-auto max-w-6xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri Foto</h1>
                        <p className="text-white/90 text-lg">
                            Koleksi foto dari berbagai acara dan kompetisi kami
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-6xl px-4 py-12">
                    {galleries.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">📷</div>
                            <p className="text-gray-600 text-lg">
                                Galeri foto belum tersedia
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Gallery Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {galleries.data?.map((photo) => (
                                    <div
                                        key={photo.id}
                                        className="cursor-pointer group"
                                        onClick={() => setSelectedGallery(photo)}
                                    >
                                        <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                            <img
                                                src={getImageUrl(photo.image_path)}
                                                alt={photo.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <div>
                                                    <h3 className="text-white font-semibold text-lg">
                                                        {photo.title}
                                                    </h3>
                                                    {photo.description && (
                                                        <p className="text-white/80 text-sm mt-1 line-clamp-2">
                                                            {photo.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) || galleries.map((photo) => (
                                    <div
                                        key={photo.id}
                                        className="cursor-pointer group"
                                        onClick={() => setSelectedGallery(photo)}
                                    >
                                        <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                            <img
                                                src={getImageUrl(photo.image_path)}
                                                alt={photo.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <div>
                                                    <h3 className="text-white font-semibold text-lg">
                                                        {photo.title}
                                                    </h3>
                                                    {photo.description && (
                                                        <p className="text-white/80 text-sm mt-1 line-clamp-2">
                                                            {photo.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {galleries.links && galleries.links.length > 3 && (
                                <div className="mt-12 flex justify-center gap-2">
                                    {galleries.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                                link.active
                                                    ? 'bg-[#1d4ed8] text-white'
                                                    : link.url
                                                      ? 'bg-white text-[#111827] border-2 border-gray-200 hover:border-[#1d4ed8]'
                                                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedGallery(null)}
                    >
                        <div
                            className="relative max-w-4xl w-full max-h-screen"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedGallery(null)}
                                className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-200 transition z-10"
                            >
                                ✕
                            </button>

                            {/* Image */}
                            <div className="bg-black rounded-lg overflow-hidden">
                                <img
                                    src={getImageUrl(selectedGallery.image_path)}
                                    alt={selectedGallery.title}
                                    className="w-full max-h-screen object-contain"
                                />
                            </div>

                            {/* Photo Details */}
                            <div className="mt-4 bg-white rounded-lg p-6">
                                <h2 className="text-2xl font-bold text-[#111827] mb-2">
                                    {selectedGallery.title}
                                </h2>
                                {selectedGallery.description && (
                                    <p className="text-gray-700 text-lg">
                                        {selectedGallery.description}
                                    </p>
                                )}
                                <p className="text-gray-500 text-sm mt-4">
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
            </div>
        </PublicLayout>
    );
}
