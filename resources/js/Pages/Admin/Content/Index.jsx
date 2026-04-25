import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const getTypeFromSectionKey = (sectionKey = '') => sectionKey.split('_')[0] || '-';

const formatDate = (value) => {
    if (!value) {
        return '-';
    }

    return new Date(value).toLocaleDateString();
};

export default function AdminContentIndex({ sections, articles, videos, displayLimits }) {
    const { flash } = usePage().props;
    const { delete: destroy, processing } = useForm({});

    const [activeTab, setActiveTab] = useState('all');
    const [keyword, setKeyword] = useState('');

    const normalizedKeyword = keyword.trim().toLowerCase();

    const filtered = useMemo(() => {
        const matches = (value) => String(value ?? '').toLowerCase().includes(normalizedKeyword);

        return {
            sections: sections.filter((item) =>
                normalizedKeyword === '' ||
                matches(item.title) ||
                matches(item.section_key) ||
                matches(item.locale),
            ),
            articles: articles.filter((item) =>
                normalizedKeyword === '' ||
                matches(item.title) ||
                matches(item.author?.name),
            ),
            videos: videos.filter((item) =>
                normalizedKeyword === '' ||
                matches(item.title) ||
                matches(item.uploader?.name),
            ),
        };
    }, [sections, articles, videos, normalizedKeyword]);

    const handleDelete = (routeName, id, message) => {
        if (!confirm(message)) {
            return;
        }

        destroy(route(routeName, id));
    };

    const showSections = activeTab === 'all' || activeTab === 'sections';
    const showArticles = activeTab === 'all' || activeTab === 'articles';
    const showVideos = activeTab === 'all' || activeTab === 'videos';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Pusat Konten User</h2>
                        <p className="mt-2 max-w-2xl text-sm text-[#111827]/65">
                            Kelola konten landing, artikel, dan video dari satu halaman. Gunakan tombol tambah untuk membuat konten baru.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('dashboard')} className="tarung-button-secondary w-fit">
                            Dashboard Admin
                        </Link>
                        <Link href={route('admin.display-settings.edit')} className="tarung-button-secondary w-fit">
                            Atur Jumlah Tampil
                        </Link>
                        <Link href={route('content.create')} className="tarung-button-primary w-fit">
                            Tambah Konten
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Pusat Konten User" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {flash.error}
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="tarung-shell rounded-[24px] p-5">
                        <div className="text-sm font-medium text-[#111827]/60">Section Landing</div>
                        <div className="mt-2 text-3xl font-extrabold tracking-tight">{sections.length}</div>
                    </div>
                    <div className="tarung-shell rounded-[24px] p-5">
                        <div className="text-sm font-medium text-[#111827]/60">Artikel</div>
                        <div className="mt-2 text-3xl font-extrabold tracking-tight">{articles.length}</div>
                    </div>
                    <div className="tarung-shell rounded-[24px] p-5">
                        <div className="text-sm font-medium text-[#111827]/60">Video</div>
                        <div className="mt-2 text-3xl font-extrabold tracking-tight">{videos.length}</div>
                    </div>
                    <div className="tarung-shell rounded-[24px] p-5 text-sm text-[#111827]/70">
                        <div className="font-semibold text-[#111827]">Aturan Tampil</div>
                        <div className="mt-2">History: {displayLimits.history_user_limit}</div>
                        <div>Philosophy: {displayLimits.philosophy_user_limit}</div>
                        <div>Education: {displayLimits.education_user_limit}</div>
                    </div>
                </div>

                <div className="mt-4 tarung-shell rounded-[24px] p-4 sm:p-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => setActiveTab('all')} className={activeTab === 'all' ? 'tarung-button-primary' : 'tarung-button-secondary'}>
                                Semua
                            </button>
                            <button type="button" onClick={() => setActiveTab('sections')} className={activeTab === 'sections' ? 'tarung-button-primary' : 'tarung-button-secondary'}>
                                Section
                            </button>
                            <button type="button" onClick={() => setActiveTab('articles')} className={activeTab === 'articles' ? 'tarung-button-primary' : 'tarung-button-secondary'}>
                                Artikel
                            </button>
                            <button type="button" onClick={() => setActiveTab('videos')} className={activeTab === 'videos' ? 'tarung-button-primary' : 'tarung-button-secondary'}>
                                Video
                            </button>
                        </div>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Cari judul, key, author, uploader..."
                            className="w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-2 text-sm focus:border-[#1d4ed8] focus:outline-none lg:max-w-sm"
                        />
                    </div>
                </div>

                <div className="mt-6 space-y-6">
                    {showSections && (
                        <div className="tarung-shell overflow-x-auto rounded-[28px] p-4 sm:p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-[#111827]">Section Landing User</h3>
                                <Link href={route('admin.landing.index')} className="tarung-button-secondary">Kelola Semua Section</Link>
                            </div>
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#111827]/10">
                                        <th className="px-3 py-3 font-semibold">Jenis</th>
                                        <th className="px-3 py-3 font-semibold">Judul</th>
                                        <th className="px-3 py-3 font-semibold">Bahasa</th>
                                        <th className="px-3 py-3 font-semibold">Status</th>
                                        <th className="px-3 py-3 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.sections.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-3 py-6 text-center text-[#111827]/60">Tidak ada section.</td>
                                        </tr>
                                    ) : (
                                        filtered.sections.map((item) => (
                                            <tr key={item.id} className="border-b border-[#111827]/5">
                                                <td className="px-3 py-3 capitalize">{getTypeFromSectionKey(item.section_key)}</td>
                                                <td className="px-3 py-3 font-medium">{item.title}</td>
                                                <td className="px-3 py-3 uppercase">{item.locale}</td>
                                                <td className="px-3 py-3">{item.is_active ? 'Aktif' : 'Nonaktif'}</td>
                                                <td className="px-3 py-3 text-right">
                                                    <div className="inline-flex gap-2">
                                                        <Link href={route('admin.landing.edit', item.id)} className="tarung-button-secondary px-4 py-2">Update</Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete('admin.landing.destroy', item.id, 'Hapus section ini?')}
                                                            disabled={processing}
                                                            className="rounded-full border border-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {showArticles && (
                        <div className="tarung-shell overflow-x-auto rounded-[28px] p-4 sm:p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-[#111827]">Artikel User</h3>
                                <Link href={route('admin.articles.index')} className="tarung-button-secondary">Kelola Semua Artikel</Link>
                            </div>
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#111827]/10">
                                        <th className="px-3 py-3 font-semibold">Judul</th>
                                        <th className="px-3 py-3 font-semibold">Author</th>
                                        <th className="px-3 py-3 font-semibold">Featured</th>
                                        <th className="px-3 py-3 font-semibold">Tanggal</th>
                                        <th className="px-3 py-3 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.articles.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-3 py-6 text-center text-[#111827]/60">Tidak ada artikel.</td>
                                        </tr>
                                    ) : (
                                        filtered.articles.map((item) => (
                                            <tr key={item.id} className="border-b border-[#111827]/5">
                                                <td className="px-3 py-3 font-medium">{item.title}</td>
                                                <td className="px-3 py-3">{item.author?.name ?? '-'}</td>
                                                <td className="px-3 py-3">{item.is_featured ? 'Ya' : 'Tidak'}</td>
                                                <td className="px-3 py-3">{formatDate(item.created_at)}</td>
                                                <td className="px-3 py-3 text-right">
                                                    <div className="inline-flex gap-2">
                                                        <Link href={route('admin.articles.edit', item.id)} className="tarung-button-secondary px-4 py-2">Update</Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete('admin.articles.destroy', item.id, 'Hapus artikel ini?')}
                                                            disabled={processing}
                                                            className="rounded-full border border-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {showVideos && (
                        <div className="tarung-shell overflow-x-auto rounded-[28px] p-4 sm:p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-[#111827]">Video User</h3>
                                <Link href={route('admin.videos.index')} className="tarung-button-secondary">Kelola Semua Video</Link>
                            </div>
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#111827]/10">
                                        <th className="px-3 py-3 font-semibold">Judul</th>
                                        <th className="px-3 py-3 font-semibold">Uploader</th>
                                        <th className="px-3 py-3 font-semibold">Status</th>
                                        <th className="px-3 py-3 font-semibold">Visibility</th>
                                        <th className="px-3 py-3 font-semibold">Published</th>
                                        <th className="px-3 py-3 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.videos.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-3 py-6 text-center text-[#111827]/60">Tidak ada video.</td>
                                        </tr>
                                    ) : (
                                        filtered.videos.map((item) => (
                                            <tr key={item.id} className="border-b border-[#111827]/5">
                                                <td className="px-3 py-3 font-medium">{item.title}</td>
                                                <td className="px-3 py-3">{item.uploader?.name ?? '-'}</td>
                                                <td className="px-3 py-3 capitalize">{item.status}</td>
                                                <td className="px-3 py-3 capitalize">{item.visibility}</td>
                                                <td className="px-3 py-3">{formatDate(item.published_at)}</td>
                                                <td className="px-3 py-3 text-right">
                                                    <div className="inline-flex gap-2">
                                                        <Link href={route('admin.videos.edit', item.id)} className="tarung-button-secondary px-4 py-2">Update</Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete('admin.videos.destroy', item.id, 'Hapus video ini?')}
                                                            disabled={processing}
                                                            className="rounded-full border border-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
