import PublicLayout from '@/Layouts/PublicLayout';
import YouTubeEmbed from '@/Components/YouTubeEmbed';
import { Head, Link } from '@inertiajs/react';

const copy = {
    id: {
        title: 'Informasi',
        heading: 'Pusat Informasi',
        description: 'Update terkini dan pengumuman Tarung Derajat.',
        articlesLabel: 'Artikel & Berita',
        videosLabel: 'Video Kompetisi & Event (YouTube)',
        moreArticles: 'Lihat semua artikel',
        moreVideos: 'Lihat semua video',
    },
    en: {
        title: 'Information',
        heading: 'Information Center',
        description: 'Latest updates and announcements of Tarung Derajat.',
        articlesLabel: 'Articles & News',
        videosLabel: 'Competition & Event Videos (YouTube)',
        moreArticles: 'View all articles',
        moreVideos: 'View all videos',
    },
};

export default function Informasi({ articles = [], videos = [], locale = 'id' }) {
    const t = copy[locale] || copy.id;

    return (
        <PublicLayout>
            <Head title={t.title} />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">{t.heading}</h1>
                    <p className="text-lg text-[#111827]/70">{t.description}</p>
                </div>

                {/* Section Artikel */}
                <section className="mb-20">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#111827]">{t.articlesLabel}</h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {articles && articles.length > 0 ? (
                            articles.map((article) => (
                                <div
                                    key={article.id}
                                    className="flex flex-col rounded-2xl border border-[#1d4ed8]/10 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                                >
                                    {article.image_path ? (
                                        <img
                                            src={article.image_path.startsWith('http') ? article.image_path : `/storage/${article.image_path}`}
                                            alt={article.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-48 w-full bg-[#f5f7ff] flex items-center justify-center">
                                            <span className="text-[#1d4ed8]/20 text-4xl font-bold">TD</span>
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-[#111827] mb-2 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-[#111827]/70 line-clamp-3 mb-6 flex-1 text-sm">
                                            {article.content}
                                        </p>
                                        <div className="mb-6">
                                            <Link
                                                href={route('public.informasi.article', article.id)}
                                                className="text-sm font-bold text-[#1d4ed8] hover:underline"
                                            >
                                                Baca Lengkap →
                                            </Link>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-[#111827]/50 mt-auto pt-4 border-t border-[#111827]/5">
                                            <span>{article.author?.name}</span>
                                            <span>{new Date(article.created_at).toLocaleDateString(locale)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 rounded-2xl border border-dashed border-[#1d4ed8]/20 bg-[#f5f7ff]/50">
                                <p className="text-[#111827]/70 text-sm italic">Belum ada artikel yang dipublikasikan.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Section Video */}
                <section>
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#111827]">{t.videosLabel}</h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {videos && videos.length > 0 ? (
                            videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="rounded-2xl border border-[#1d4ed8]/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                    <div className="aspect-video bg-gray-900">
                                        {video.youtube_url && (
                                            <YouTubeEmbed url={video.youtube_url} />
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-[#111827] line-clamp-2 text-md">
                                            {video.title}
                                        </h3>
                                        <p className="text-xs text-[#111827]/70 line-clamp-2 mt-2">
                                            {video.description}
                                        </p>
                                        <div className="mt-4">
                                            <a
                                                href={video.youtube_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-[#1d4ed8] hover:underline"
                                            >
                                                Lihat Video →
                                            </a>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#1d4ed8]">
                                            <span className="h-2 w-2 rounded-full bg-[#1d4ed8]"></span>
                                            {video.uploader?.name || 'ADMIN'}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 rounded-2xl border border-dashed border-[#1d4ed8]/20 bg-[#f5f7ff]/50">
                                <p className="text-[#111827]/70 text-sm italic">Belum ada video tutorial tersedia.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
