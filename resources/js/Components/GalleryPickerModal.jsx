import React from 'react';

export default function GalleryPickerModal({ isOpen, onClose, galleries, onSelect }) {
    if (!isOpen) return null;

    const getImageUrl = (imagePath) => {
        return imagePath?.startsWith('http') ? imagePath : `/storage/${imagePath}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-4xl rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h3 className="text-xl font-bold text-[#111827]">Pilih Gambar dari Galeri</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                    {galleries && galleries.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {galleries.map((gallery) => (
                                <div 
                                    key={gallery.id}
                                    onClick={() => onSelect(gallery.image_path)}
                                    className="cursor-pointer group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-[#1d4ed8] transition-all"
                                >
                                    <img 
                                        src={getImageUrl(gallery.image_path)} 
                                        alt={gallery.title} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <span className="text-white font-medium text-sm">Pilih</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            Belum ada gambar di galeri.
                        </div>
                    )}
                </div>
                
                <div className="border-t px-6 py-4 flex justify-end">
                    <button onClick={onClose} className="tarung-button-secondary">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
