import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import GalleryPickerModal from '@/Components/GalleryPickerModal';

export default function AdminArticlesEdit({ article, galleries }) {
    const [showGalleryPicker, setShowGalleryPicker] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        _method: 'patch',
        title: article.title ?? '',
        content: article.content ?? '',
        is_featured: Boolean(article.is_featured),
        image_path: article.image_path ?? '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.articles.update', article.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Update Artikel</h2>
                </div>
            }
        >
            <Head title="Update Artikel" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8">
                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Judul Artikel</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            required
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Isi Artikel</label>
                        <textarea
                            rows={10}   
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            required
                        />
                        {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Foto Artikel (Opsional)</label>
                        <div className="mt-2 flex items-center gap-4">
                            {data.image_path && (
                                <img 
                                    src={data.image_path.startsWith('http') ? data.image_path : `/storage/${data.image_path}`} 
                                    alt="Preview" 
                                    className="h-20 w-32 object-cover rounded-lg border"
                                />
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0])}
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
                        {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                        <GalleryPickerModal 
                            isOpen={showGalleryPicker} 
                            onClose={() => setShowGalleryPicker(false)} 
                            galleries={galleries}
                            onSelect={(path) => {
                                setData('image_path', path);
                                setShowGalleryPicker(false);
                            }}
                        />
                    </div>

                    <label className="inline-flex items-center gap-2 text-sm text-[#111827]">
                        <input
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                        />
                        Tampilkan di dashboard user
                    </label>

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                            {processing ? 'Saving...' : 'Simpan Perubahan'}
                        </button>
                        <Link href={route('admin.articles.index')} className="tarung-button-secondary">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
