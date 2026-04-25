import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

const contentTypeMeta = {
    landing: {
        title: 'Konten Landing',
        description: 'Untuk Feature, History, Philosophy, dan Education. Urutan diatur otomatis.',
        button: 'Simpan Landing',
    },
    article: {
        title: 'Artikel',
        description: 'Untuk upload artikel tanpa pindah fitur.',
        button: 'Simpan Artikel',
    },
    video: {
        title: 'Video',
        description: 'Bisa upload file ke YouTube atau cukup tempel link YouTube.',
        button: 'Upload Video',
    },
};

const landingSections = [
    { value: 'feature', label: 'Feature' },
    { value: 'history', label: 'History' },
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'education', label: 'Education' },
];

const articleVisibilityHelp = 'Artikel tetap sederhana: judul, isi, gambar, dan opsi tampil di dashboard user.';

export default function ContentCreate({
    initialType = 'article',
    canCreateLanding = false,
    canCreateArticle = false,
    canCreateVideo = false,
}) {
    const { flash, auth } = usePage().props;

    const availableTypes = useMemo(() => {
        const types = [];

        if (canCreateLanding) {
            types.push('landing');
        }

        if (canCreateArticle) {
            types.push('article');
        }

        if (canCreateVideo) {
            types.push('video');
        }

        return types;
    }, [canCreateLanding, canCreateArticle, canCreateVideo]);

    const defaultType = availableTypes.includes(initialType)
        ? initialType
        : (availableTypes[0] ?? 'article');

    const [activeType, setActiveType] = useState(defaultType);

    const { data, setData, post, processing, errors, reset } = useForm({
        content_type: defaultType,
        section_type: 'feature',
        locale: 'id',
        title: '',
        content: '',
        image: null,
        is_active: true,
        is_featured: Boolean(auth?.user?.role?.name === 'admin'),
        description: '',
        visibility: 'unlisted',
        video_source: 'upload',
        youtube_url: '',
        video: null,
    });

    useEffect(() => {
        setData('content_type', activeType);
    }, [activeType]);

    const submit = (e) => {
        e.preventDefault();

        post(route('content.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset('title', 'content', 'image', 'description', 'video', 'youtube_url');
            },
        });
    };

    const renderTabButton = (type) => {
        const meta = contentTypeMeta[type];
        const isActive = activeType === type;

        return (
            <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={isActive
                    ? 'rounded-full bg-[#1d4ed8] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(29,78,216,0.24)]'
                    : 'rounded-full border border-[#111827]/10 bg-white px-5 py-3 text-sm font-semibold text-[#111827]/70 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]'}
            >
                {meta.title}
            </button>
        );
    };

    const renderLandingForm = () => (
        <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-semibold text-[#111827]">Jenis Section</label>
                    <select
                        value={data.section_type}
                        onChange={(e) => setData('section_type', e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                    >
                        {landingSections.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    {errors.section_type && <p className="mt-2 text-sm text-red-600">{errors.section_type}</p>}
                </div>

                <div>
                    <label className="text-sm font-semibold text-[#111827]">Bahasa</label>
                    <select
                        value={data.locale}
                        onChange={(e) => setData('locale', e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                    >
                        <option value="id">ID</option>
                        <option value="en">EN</option>
                    </select>
                    {errors.locale && <p className="mt-2 text-sm text-red-600">{errors.locale}</p>}
                </div>
            </div>

            <div>
                <label className="text-sm font-semibold text-[#111827]">Judul Konten</label>
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
                <label className="text-sm font-semibold text-[#111827]">Isi Konten</label>
                <textarea
                    rows={8}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                    required
                />
                {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-[#111827]">Foto (Opsional)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                    className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#eff6ff] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#1d4ed8] focus:border-[#1d4ed8] focus:outline-none"
                />
                {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-[#111827]">
                <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
                />
                Tampilkan ke user
            </label>

            <div className="rounded-2xl border border-[#111827]/10 bg-white px-4 py-3 text-sm text-[#111827]/72">
                Urutan tampil akan diisi otomatis agar admin tidak perlu mengatur sort order secara manual.
            </div>
        </div>
    );

    const renderArticleForm = () => (
        <div className="space-y-5">
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
                <label className="text-sm font-semibold text-[#111827]">Gambar (Opsional)</label>
                <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                    className="mt-2 block w-full text-sm text-[#111827] file:mr-4 file:rounded-full file:border-0 file:bg-[#1d4ed8] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:opacity-90"
                />
                {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-[#111827]">
                <input
                    type="checkbox"
                    checked={data.is_featured}
                    onChange={(e) => setData('is_featured', e.target.checked)}
                />
                Tampilkan di dashboard user
            </label>

            <div className="rounded-2xl border border-[#111827]/10 bg-white px-4 py-3 text-sm text-[#111827]/72">
                {articleVisibilityHelp}
            </div>
        </div>
    );

    const renderVideoForm = () => (
        <div className="space-y-5">
            <div>
                <label className="text-sm font-semibold text-[#111827]">Judul Video</label>
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
                <label className="text-sm font-semibold text-[#111827]">Deskripsi</label>
                <textarea
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                    placeholder="Jelaskan isi video secara singkat."
                />
                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-[#111827]">Sumber Video</label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={() => {
                            setData('video_source', 'upload');
                            setData('youtube_url', '');
                        }}
                        className={data.video_source === 'upload'
                            ? 'rounded-2xl border border-[#1d4ed8] bg-[#eff6ff] px-4 py-3 text-left text-sm font-semibold text-[#1d4ed8]'
                            : 'rounded-2xl border border-[#111827]/15 bg-white px-4 py-3 text-left text-sm text-[#111827]/75'}
                    >
                        Upload file ke YouTube
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setData('video_source', 'link');
                            setData('video', null);
                        }}
                        className={data.video_source === 'link'
                            ? 'rounded-2xl border border-[#1d4ed8] bg-[#eff6ff] px-4 py-3 text-left text-sm font-semibold text-[#1d4ed8]'
                            : 'rounded-2xl border border-[#111827]/15 bg-white px-4 py-3 text-left text-sm text-[#111827]/75'}
                    >
                        Input link YouTube
                    </button>
                </div>
                {errors.video_source && <p className="mt-2 text-sm text-red-600">{errors.video_source}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-[#111827]">Visibilitas YouTube</label>
                <select
                    value={data.visibility}
                    onChange={(e) => setData('visibility', e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                >
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>
                {errors.visibility && <p className="mt-2 text-sm text-red-600">{errors.visibility}</p>}
            </div>

            {data.video_source === 'upload' ? (
                <div>
                    <label className="text-sm font-semibold text-[#111827]">File Video</label>
                    <input
                        type="file"
                        accept="video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm"
                        onChange={(e) => setData('video', e.target.files?.[0] ?? null)}
                        className="mt-2 block w-full text-sm text-[#111827] file:mr-4 file:rounded-full file:border-0 file:bg-[#1d4ed8] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:opacity-90"
                        required
                    />
                    <p className="mt-2 text-xs text-[#111827]/60">Maksimal 500MB. Format: mp4, mov, avi, mkv, webm.</p>
                    {errors.video && <p className="mt-2 text-sm text-red-600">{errors.video}</p>}
                </div>
            ) : (
                <div>
                    <label className="text-sm font-semibold text-[#111827]">Link YouTube</label>
                    <input
                        type="url"
                        value={data.youtube_url}
                        onChange={(e) => setData('youtube_url', e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                        placeholder="https://www.youtube.com/watch?v=..."
                        required
                    />
                    <p className="mt-2 text-xs text-[#111827]/60">Format yang didukung: youtube.com dan youtu.be.</p>
                    {errors.youtube_url && <p className="mt-2 text-sm text-red-600">{errors.youtube_url}</p>}
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Content Studio</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Tambah Konten</h2>
                        <p className="mt-2 max-w-2xl text-sm text-[#111827]/65">
                            Satu halaman untuk landing, artikel, dan video. Admin tidak perlu pindah ke banyak menu.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('admin.content.index')} className="tarung-button-secondary w-fit">
                            Kembali ke Pusat Konten
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Tambah Konten" />

            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {flash.error}
                    </div>
                )}

                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8" encType="multipart/form-data">
                    <div className="flex flex-wrap gap-3">
                        {availableTypes.map(renderTabButton)}
                    </div>

                    <div className="rounded-2xl border border-[#1d4ed8]/10 bg-[#eff6ff] px-4 py-3 text-sm text-[#111827]/72">
                        <div className="font-semibold text-[#111827]">{contentTypeMeta[activeType]?.title}</div>
                        <p className="mt-1">{contentTypeMeta[activeType]?.description}</p>
                    </div>

                    <input type="hidden" value={data.content_type} readOnly />

                    {activeType === 'landing' ? renderLandingForm() : null}
                    {activeType === 'article' ? renderArticleForm() : null}
                    {activeType === 'video' ? renderVideoForm() : null}

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                            {processing ? 'Saving...' : (contentTypeMeta[activeType]?.button ?? 'Simpan')}
                        </button>
                        <Link href={route('admin.content.index')} className="tarung-button-secondary">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}