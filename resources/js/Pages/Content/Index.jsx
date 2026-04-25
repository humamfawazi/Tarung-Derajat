import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';
import Modal from '@/Components/Modal';
import VideoCard from '@/Components/VideoCard';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const formatDate = (value) => {
    if (!value) {
        return '-';
    }

    return new Date(value).toLocaleDateString();
};

export default function ContentIndex({ articles = [], videos = [], displayLimits = {} }) {
    const [activePreview, setActivePreview] = useState(null);
    const auth = usePage().props.auth;
    const user = auth?.user;
    const permissions = user?.role?.permissions ?? [];
    const canUploadVideo = permissions.includes('videos.create');
    const canUploadArticle = ['admin', 'pelatih', 'coach'].includes(user?.role?.name ?? '');
    const isAuthenticated = Boolean(user);

    const openPreview = ({ title, contentText, meta = '', ctaUrl = null, ctaLabel = null }) => {
        setActivePreview({ title, contentText, meta, ctaUrl, ctaLabel });
    };

    const closePreview = () => setActivePreview(null);

    const pageContent = (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="tarung-section-label">Knowledge Center</div>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827]">Informasi Tarung Derajat</h1>
                    <p className="mt-3 max-w-3xl text-sm text-[#111827]/70">
                        Artikel dan video kini ditampilkan dalam satu halaman agar lebih mudah diakses user.
                    </p>
                </div>

                {isAuthenticated && (canUploadVideo || canUploadArticle) ? (
                    <div className="flex flex-wrap gap-2">
                        {canUploadArticle ? (
                            <Link href={route('articles.upload')} className="tarung-button-secondary w-fit">
                                Upload Artikel
                            </Link>
                        ) : null}
                        {canUploadVideo ? (
                            <Link href={route('videos.upload')} className="tarung-button-primary w-fit">
                                Upload Video
                            </Link>
                        ) : null}
                    </div>
                ) : null}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">
                <div className="tarung-shell rounded-[28px] p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-[#111827]">Artikel Terbaru</h2>
                        <span className="text-xs uppercase tracking-[0.2em] text-[#111827]/55">Limit {displayLimits.articles ?? articles.length}</span>
                    </div>
                    <div className="grid gap-4">
                        {articles.length === 0 ? (
                            <div className="rounded-2xl border border-[#111827]/10 px-4 py-4 text-sm text-[#111827]/70">
                                Belum ada artikel tersedia.
                            </div>
                        ) : (
                            articles.map((article) => (
                                <article key={article.id} className="overflow-hidden rounded-2xl border border-[#111827]/10 bg-white shadow-sm transition hover:border-[#1d4ed8]/25">
                                    <div className="grid gap-0 sm:grid-cols-[132px_1fr]">
                                        <div className="h-36 w-full bg-[#e5e7eb] sm:h-full">
                                            {article.image_path ? (
                                                <img
                                                    src={`/storage/${article.image_path}`}
                                                    alt={article.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#e0ecff,#f8fbff)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#111827]/45">
                                                    Preview
                                                </div>
                                            )}
                                        </div>

                                        <div className="px-4 py-4">
                                            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#111827]/55">
                                                <span className="rounded-full bg-[#eff6ff] px-2 py-1 text-[#1d4ed8]">{article.author?.name ?? 'Admin'}</span>
                                                <span>{formatDate(article.created_at)}</span>
                                            </div>
                                            <h3 className="mt-2 text-base font-semibold text-[#111827]">{article.title}</h3>
                                            <p className="mt-2 line-clamp-2 break-words [overflow-wrap:anywhere] text-sm leading-7 text-[#111827]/75">{article.content}</p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openPreview({
                                                        title: article.title,
                                                        contentText: article.content,
                                                        meta: `Artikel • ${article.author?.name ?? 'Admin'}`,
                                                    })
                                                }
                                                className="mt-4 inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                            >
                                                Baca
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>

                <div className="tarung-shell rounded-[28px] p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-[#111827]">Video Terbaru</h2>
                        <span className="text-xs uppercase tracking-[0.2em] text-[#111827]/55">Limit {displayLimits.videos ?? videos.length}</span>
                    </div>
                    <div className="grid gap-4">
                        {videos.length === 0 ? (
                            <div className="rounded-2xl border border-[#111827]/10 px-4 py-4 text-sm text-[#111827]/70">
                                Belum ada video publik.
                            </div>
                        ) : (
                            videos.map((video) => (
                                <div key={video.id}>
                                    <VideoCard video={video} />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview({
                                                title: video.title,
                                                contentText: video.description || 'Tanpa deskripsi.',
                                                meta: `Video • ${video.uploader?.name ?? 'Coach'}`,
                                                ctaUrl: route('videos.show', video.id),
                                                ctaLabel: 'Buka Detail Video',
                                            })
                                        }
                                        className="mt-3 inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                    >
                                        Baca
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <Modal show={Boolean(activePreview)} onClose={closePreview} maxWidth="2xl">
                {activePreview ? (
                    <div className="p-6 sm:p-7">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/55">
                            {activePreview.meta || 'Detail Konten'}
                        </div>
                        <h3 className="mt-2 text-2xl font-bold text-[#111827]">{activePreview.title}</h3>
                        <div className="mt-4 max-h-[65vh] overflow-y-auto overflow-x-hidden rounded-2xl border border-[#111827]/10 bg-[#f8fbff] px-4 py-4 text-base leading-8 text-[#111827]/82">
                            <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                                {String(activePreview.contentText ?? '')}
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap justify-end gap-2">
                            {activePreview.ctaUrl ? (
                                <Link href={activePreview.ctaUrl} className="tarung-button-primary">
                                    {activePreview.ctaLabel || 'Lihat'}
                                </Link>
                            ) : null}
                            <button type="button" onClick={closePreview} className="tarung-button-secondary">
                                Tutup
                            </button>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </section>
    );

    return isAuthenticated ? (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Member Area</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Informasi</h2>
                </div>
            }
        >
            <Head title="Informasi" />
            {pageContent}
        </AuthenticatedLayout>
    ) : (
        <PublicLayout>
            <Head title="Informasi" />
            {pageContent}
        </PublicLayout>
    );
}
