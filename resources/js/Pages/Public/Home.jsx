import YouTubeEmbed from '@/Components/YouTubeEmbed';
import Modal from '@/Components/Modal';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const copy = {
    id: {
        title: 'Tarung Web',
        eyebrow: 'Platform Tarung Derajat Indonesia',
        headline: 'Tarung Derajat untuk Penguatan Organisasi Nasional.',
        description:
            'Platform ini dirancang untuk mendukung pengembangan manajemen olahraga di Indonesia sekaligus menjadi sarana praktis pengelolaan data, informasi, dan promosi Tarung Derajat.',
        primaryCta: 'Masuk ke sistem',
        secondaryCta: 'Jelajahi konten',
        trustLabel: 'implementasi digital untuk seni beladiri Indonesia',
        searchTitle: 'Akses data dan informasi organisasi',
        searchHeroTitle: 'Integrasi Data, Literasi, dan Promosi',
        searchHeroText: 'Satu pintu digital untuk kebutuhan pengurus, pembinaan, dan publikasi identitas Tarung Derajat di tingkat nasional.',
        searchButton: 'Cari',
        searchFields: [
            { label: 'Data Organisasi', value: 'Anggota, pelatih, cabang' },
            { label: 'Informasi', value: 'Agenda, kebijakan, publikasi' },
            { label: 'Promosi', value: 'Artikel, video, profil prestasi' },
            { label: 'Standar', value: 'Nasional dan terukur' },
        ],
        stats: [
            { value: '01', label: 'Teoretis' },
            { value: '02', label: 'Praktis' },
            { value: '03', label: 'Nasional' },
        ],
        featuresTitle: 'Highlight',
        featuresHeading: 'Artikel Terbaru, Video, dan Kompetisi & Event',
        features: [
            {
                title: 'Manfaat Teoretis',
                text: 'Memberikan kontribusi pada pengembangan ilmu manajemen olahraga di Indonesia, khususnya literatur transformasi digital dan penguatan seni beladiri nasional.',
            },
            {
                title: 'Manfaat Praktis',
                text: 'Menjadi sarana digital bagi pengurus Tarung Derajat dalam mengelola data dan informasi secara efisien, akurat, dan berkelanjutan.',
            },
            {
                title: 'Arah Organisasi Nasional',
                text: 'Memperkuat promosi dan tata kelola organisasi untuk mendukung posisi Tarung Derajat sebagai bela diri nasional yang tertata dan terukur.',
            },
        ],
        historyTitle: 'Dari seni beladiri lokal menuju ekosistem digital nasional.',
        historyText:
            'Tarung Derajat memiliki akar nilai yang kuat. Melalui website ini, nilai tersebut diterjemahkan ke dalam sistem informasi yang terstruktur untuk mendukung pengembangan organisasi di Indonesia secara lebih rapi dan konsisten.',
        philosophyTitle: 'Manfaat Teoretis',
        philosophyText:
            'Website ini menjadi kontribusi akademik pada ranah manajemen olahraga: menghubungkan konsep transformasi digital, tata kelola organisasi, dan penguatan seni beladiri nasional dalam satu model implementasi nyata.',
        educationTitle: 'Manfaat Praktis untuk Pengurus',
        educationText:
            'Secara operasional, platform ini memudahkan pengurus dalam pengelolaan data, distribusi informasi, dan promosi program secara cepat dan efisien, sehingga proses manajemen organisasi lebih terukur dan profesional.',
        adminTitle: 'Target: organisasi nasional yang tertata',
        adminText:
            'Sistem admin pusat, pelatih, dan anggota disiapkan sebagai fondasi tata kelola modern untuk mendukung standarisasi, transparansi, dan citra Tarung Derajat di Indonesia.',
        pillars: [
            'Transformasi digital berbasis literatur manajemen olahraga Indonesia',
            'Efisiensi pengelolaan data dan informasi organisasi',
            'Promosi strategis menuju standar organisasi nasional',
        ],
    },
};

const searchFields = [
    {
        icon: '⌖',
        key: 'location',
    },
    {
        icon: '≋',
        key: 'category',
    },
    {
        icon: '▣',
        key: 'type',
    },
    {
        icon: '◌',
        key: 'access',
    },
];

function DecorativeCard({ label, className = '', badgeClassName = '' }) {
    return (
        <div className={`absolute hidden rounded-[28px] border border-white/70 bg-white/80 p-3 shadow-[0_18px_60px_rgba(59,130,246,0.12)] backdrop-blur sm:block ${className}`}>
            <div className={`mb-2 inline-flex h-2.5 w-2.5 rounded-full bg-[#111827] ${badgeClassName}`} />
            <div className="rounded-[20px] bg-gradient-to-br from-[#dbeafe] via-white to-[#bfdbfe] p-5">
                <div className="h-20 w-28 rounded-[18px] bg-[radial-gradient(circle_at_top_left,rgba(29,78,216,0.35),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(191,219,254,0.6))]" />
            </div>
            <div className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#111827]/65 shadow-sm">
                {label}
            </div>
        </div>
    );
}

const formatDate = (value) => {
    if (!value) {
        return '-';
    }

    return new Date(value).toLocaleDateString();
};

export default function Home({
    landingSections = [],
    historySections = [],
    philosophySections = [],
    educationSections = [],
    latestArticles = [],
    latestVideos = [],
}) {
    const [activePreview, setActivePreview] = useState(null);
    const content = copy.id;

    const stripHtml = (html) => html?.replace(/<[^>]+>/g, '') ?? '';

    // Combine articles, videos, and education sections into one highlight list
    const highlights = [
        ...latestArticles.map(a => ({
            id: `article-${a.id}`,
            type: 'article',
            title: a.title,
            text: stripHtml(a.content),
            imagePath: a.image_path,
            url: route('public.informasi.article', a.id),
            dateObj: new Date(a.published_at ?? a.created_at),
        })),
        ...latestVideos.map(v => ({
            id: `video-${v.id}`,
            type: 'video',
            title: v.title,
            text: v.description,
            videoId: v.youtube_video_id,
            url: route('videos.show', v.id),
            dateObj: new Date(v.published_at ?? v.created_at),
        })),
        ...educationSections.map(e => ({
            id: `education-${e.id}`,
            type: 'education',
            title: e.title,
            text: e.content,
            imagePath: e.image_path,
            url: route('public.kompetisi-event'),
            dateObj: new Date(e.updated_at ?? e.created_at),
        }))
    ].sort((a, b) => b.dateObj - a.dateObj).map(item => ({
        ...item,
        date: item.dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    }));

    const features = highlights.length > 0
        ? highlights.slice(0, 3)
        : landingSections.length > 0
            ? landingSections.map((item) => ({
                title: item.title,
                text: item.content,
                imagePath: item.image_path ?? null,
            }))
            : content.features;

    const historyItems = historySections.length > 0
        ? historySections
        : [{ id: 'fallback-history', title: content.historyTitle, content: content.historyText }];

    const philosophyItems = philosophySections.length > 0
        ? philosophySections
        : [{ id: 'fallback-philosophy', title: content.philosophyTitle, content: content.philosophyText }];

    const educationItems = educationSections.length > 0
        ? educationSections
        : [{ id: 'fallback-education', title: content.educationTitle, content: content.educationText }];

    const fieldValues = Object.fromEntries(
        searchFields.map((field, index) => [field.key, content.searchFields[index]]),
    );
    const homeInformationUrl = `${route('home')}#information`;

    const openPreview = ({ title, contentText, meta = '', ctaUrl = null, ctaLabel = null }) => {
        setActivePreview({ title, contentText, meta, ctaUrl, ctaLabel });
    };

    const closePreview = () => setActivePreview(null);

    return (
        <PublicLayout>
            <Head title={content.title} />

            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,234,254,0.95),transparent_35%),linear-gradient(180deg,#eff6ff_0%,#f8fbff_42%,#ffffff_100%)]" />
                <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#bfdbfe]/60 blur-3xl" />
                <div className="absolute right-0 top-36 h-80 w-80 rounded-full bg-[#dbeafe]/70 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
                    <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <div className="relative">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/12 bg-white/80 px-4 py-2 text-sm font-medium text-[#111827]/70 shadow-sm backdrop-blur">
                                <span className="h-2 w-2 rounded-full bg-[#1d4ed8]" />
                                {content.eyebrow}
                            </div>

                            <div className="mt-6 max-w-3xl">
                                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                                    {content.trustLabel}
                                </p>
                                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                                    {content.headline}
                                </h1>
                                <p className="mt-6 max-w-2xl text-base leading-8 text-[#111827]/70 sm:text-lg">
                                    {content.description}
                                </p>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                <a
                                    href="#features"
                                    className="inline-flex items-center justify-center rounded-full bg-[#1d4ed8] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(29,78,216,0.28)] transition hover:bg-[#1e40af]"
                                >
                                    {content.secondaryCta}
                                </a>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                {content.stats.map((stat) => (
                                    <div key={stat.label} className="rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur">
                                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#111827]/45">
                                            {stat.value}
                                        </div>
                                        <div className="mt-3 text-lg font-semibold text-[#111827]">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <DecorativeCard label="Apartment" className="left-4 top-0" />
                            <DecorativeCard label="Property" className="right-2 bottom-16" badgeClassName="bg-[#1d4ed8]" />

                            <div className="relative mx-auto max-w-xl rounded-[36px] border border-white/80 bg-white/92 p-5 shadow-[0_24px_90px_rgba(59,130,246,0.14)] backdrop-blur sm:p-6 lg:translate-y-6">
                                <div className="rounded-[28px] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#dbeafe_100%)] p-5 sm:p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#111827]/45">
                                                {content.searchTitle}
                                            </div>
                                            <div className="mt-3 text-2xl font-bold text-[#111827] sm:text-3xl">
                                                {content.searchHeroTitle}
                                            </div>
                                            <p className="mt-3 max-w-md text-sm leading-6 text-[#111827]/60 sm:text-base">
                                                {content.searchHeroText}
                                            </p>
                                        </div>
                                        <div className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#111827]/60 shadow-sm sm:block">
                                            2026
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-[1.3fr_0.7fr]">
                                        <div className="rounded-[26px] border border-white/70 bg-white/90 p-4 shadow-sm">
                                            <div className="flex items-center justify-between text-sm text-[#111827]/55">
                                                <span>{fieldValues.location.label}</span>
                                                <span className="text-[#1d4ed8]">{searchFields[0].icon}</span>
                                            </div>
                                            <div className="mt-2 text-lg font-semibold text-[#111827]">
                                                {fieldValues.location.value}
                                            </div>
                                        </div>

                                        <div className="rounded-[26px] border border-white/70 bg-white/90 p-4 shadow-sm">
                                            <div className="flex items-center justify-between text-sm text-[#111827]/55">
                                                <span>{fieldValues.category.label}</span>
                                                <span className="text-[#1d4ed8]">{searchFields[1].icon}</span>
                                            </div>
                                            <div className="mt-2 text-lg font-semibold text-[#111827]">
                                                {fieldValues.category.value}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_170px]">
                                        <div className="rounded-[26px] border border-white/70 bg-white/90 p-4 shadow-sm">
                                            <div className="flex items-center justify-between text-sm text-[#111827]/55">
                                                <span>{fieldValues.type.label}</span>
                                                <span className="text-[#1d4ed8]">{searchFields[2].icon}</span>
                                            </div>
                                            <div className="mt-2 text-sm font-semibold text-[#111827] sm:text-base">
                                                {fieldValues.type.value}
                                            </div>
                                        </div>

                                        <div className="rounded-[26px] border border-white/70 bg-white/90 p-4 shadow-sm">
                                            <div className="flex items-center justify-between text-sm text-[#111827]/55">
                                                <span>{fieldValues.access.label}</span>
                                                <span className="text-[#1d4ed8]">{searchFields[3].icon}</span>
                                            </div>
                                            <div className="mt-2 text-sm font-semibold text-[#111827] sm:text-base">
                                                {fieldValues.access.value}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-[26px] bg-[#1d4ed8] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(29,78,216,0.28)] transition hover:bg-[#1e40af]"
                                        >
                                            {content.searchButton}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                            {content.featuresTitle}
                        </div>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                            {content.featuresHeading}
                        </h2>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => (
                        <article key={feature.id || feature.title || idx} className="flex flex-col overflow-hidden rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
                            {feature.type === 'video' && feature.videoId ? (
                                <div className="mb-4 overflow-hidden rounded-2xl border border-[#111827]/10 bg-white">
                                    <img
                                        src={`https://img.youtube.com/vi/${feature.videoId}/maxresdefault.jpg`}
                                        alt={feature.title}
                                        className="aspect-video w-full object-cover"
                                        onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${feature.videoId}/hqdefault.jpg`; }}
                                    />
                                </div>
                            ) : feature.imagePath ? (
                                <div className="mb-4 overflow-hidden rounded-2xl border border-[#111827]/10 bg-white">
                                    <img
                                        src={`/storage/${feature.imagePath}`}
                                        alt={feature.title}
                                        className="aspect-video w-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="mb-4 overflow-hidden rounded-2xl border border-[#111827]/10 bg-[#eff6ff] flex aspect-video items-center justify-center">
                                    <span className="text-[#1d4ed8]/30 font-bold text-4xl">TD</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#111827]/50">
                                <span>
                                    {feature.type === 'video' ? 'Video' : feature.type === 'education' ? 'Kompetisi & Event' : 'Artikel'}
                                </span>
                                {feature.date && (
                                    <>
                                        <span>•</span>
                                        <span>{feature.date}</span>
                                    </>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-[#111827] line-clamp-2">
                                {feature.title}
                            </h3>
                            <p className="mt-3 flex-1 line-clamp-3 break-words text-sm leading-6 text-[#111827]/68">
                                {feature.text}
                            </p>

                            <div className="mt-5">
                                {feature.url ? (
                                    <Link
                                        href={feature.url}
                                        className="inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                    >
                                        Baca Selengkapnya
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview({
                                                title: feature.title,
                                                contentText: feature.text,
                                                meta: 'Feature',
                                            })
                                        }
                                        className="inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                    >
                                        Baca
                                    </button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="history" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <div className="space-y-5">
                    <div className="rounded-[34px] border border-white/80 bg-white/90 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:p-7">
                        <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                            Sejarah
                        </div>
                        <div className="mt-4 space-y-4">
                            {historyItems.map((item) => (
                                <article key={item.id} className="rounded-2xl border border-[#111827]/10 bg-white px-5 py-4">
                                    {item.image_path ? (
                                        <div className="mb-4 max-w-sm mx-auto overflow-hidden rounded-xl border border-[#111827]/10 bg-white">
                                            <img
                                                src={`/storage/${item.image_path}`}
                                                alt={item.title}
                                                className="aspect-[4/3] w-full object-cover"
                                            />
                                        </div>
                                    ) : null}
                                    <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                                        {item.title}
                                    </h2>
                                    <p className="mt-3 line-clamp-2 break-words [overflow-wrap:anywhere] text-sm leading-7 text-[#111827]/70">
                                        {item.content}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview({
                                                title: item.title,
                                                contentText: item.content,
                                                meta: 'Sejarah',
                                            })
                                        }
                                        className="mt-4 inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                    >
                                        Baca
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div id="philosophy" className="rounded-[34px] border border-[#1d4ed8]/10 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-6 shadow-[0_18px_70px_rgba(29,78,216,0.08)] sm:p-7">
                        <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                            Filosofi
                        </div>
                        <div className="mt-4 space-y-4">
                            {philosophyItems.map((item) => (
                                <article key={item.id} className="rounded-2xl border border-white/70 bg-white px-5 py-4">
                                    {item.image_path ? (
                                        <div className="mb-4 overflow-hidden rounded-xl border border-[#111827]/10 bg-white">
                                            <img
                                                src={`/storage/${item.image_path}`}
                                                alt={item.title}
                                                className="h-44 w-full object-cover"
                                            />
                                        </div>
                                    ) : null}
                                    <h3 className="text-xl font-bold text-[#111827]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 line-clamp-2 break-words [overflow-wrap:anywhere] text-sm leading-7 text-[#111827]/70">
                                        {item.content}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview({
                                                title: item.title,
                                                contentText: item.content,
                                                meta: 'Filosofi',
                                            })
                                        }
                                        className="mt-4 inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                    >
                                        Baca
                                    </button>
                                </article>
                            ))}
                        </div>
                        <div className="mt-5 grid gap-2 text-sm text-[#111827]/80">
                            {content.pillars.map((item) => (
                                <div key={item} className="rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-sm">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="education" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <div className="space-y-6">
                    <div className="rounded-[34px] border border-white/80 bg-white/90 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:p-7">
                        <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                            Pendidikan
                        </div>
                        <div className="mt-4 space-y-4">
                            {educationItems.map((item) => (
                                <article key={item.id} className="rounded-2xl border border-[#111827]/10 bg-white px-5 py-4">
                                    {item.image_path ? (
                                        <div className="mb-4 overflow-hidden rounded-xl border border-[#111827]/10 bg-white">
                                            <img
                                                src={`/storage/${item.image_path}`}
                                                alt={item.title}
                                                className="aspect-[4/3] w-full object-cover"
                                            />
                                        </div>
                                    ) : null}
                                    <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                                        {item.title}
                                    </h2>
                                    <p className="mt-3 line-clamp-2 break-words [overflow-wrap:anywhere] text-sm leading-7 text-[#111827]/70">
                                        {item.content}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview({
                                                title: item.title,
                                                contentText: item.content,
                                                meta: 'Edukasi',
                                            })
                                        }
                                        className="mt-4 inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                    >
                                        Baca
                                    </button>
                                </article>
                            ))}
                        </div>

                        <div className="mt-6 rounded-[28px] border border-[#111827]/8 bg-[#f8fbff] p-5">
                            <h3 className="text-lg font-bold text-[#111827]">
                                {content.adminTitle}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-[#111827]/70">
                                {content.adminText}
                            </p>
                        </div>
                    </div>


                </div>
            </section>

            <section id="information" className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-14 lg:pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                            Informasi Terbaru
                        </div>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                            Semua informasi kini bisa diakses dari landing page
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#111827]/70">
                            Anda tidak perlu login untuk melihat update artikel dan video terbaru Tarung Derajat.
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid gap-5 xl:grid-cols-2">
                    <div className="rounded-[32px] border border-white/80 bg-white/92 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.06)] lg:p-6">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-xl font-bold text-[#111827]">Artikel Terbaru</h3>
                            <a href={homeInformationUrl} className="hidden rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/70 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8] sm:inline-flex">
                                Semua Informasi
                            </a>
                        </div>

                        <div className="mt-5 grid gap-4">
                            {latestArticles.length > 0 ? (
                                latestArticles.map((article) => (
                                    <article key={article.id} className="flex flex-col overflow-hidden rounded-2xl border border-[#111827]/10 bg-white shadow-sm transition hover:border-[#1d4ed8]/25">
                                        <div className="relative h-40 w-full shrink-0 bg-[#e5e7eb] sm:h-52">
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
                                        <div className="flex flex-1 flex-col px-5 py-5">
                                            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#111827]/55">
                                                <span className="rounded-full bg-[#eff6ff] px-2 py-1 text-[#1d4ed8]">{article.author?.name ?? 'Admin'}</span>
                                                <span>{formatDate(article.created_at)}</span>
                                            </div>
                                            <h4 className="mt-3 text-lg font-bold text-[#111827]">{article.title}</h4>
                                            <p className="mt-2 line-clamp-2 break-words [overflow-wrap:anywhere] text-sm leading-6 text-[#111827]/70">
                                                {article.content}
                                            </p>
                                            <div className="mt-auto pt-5">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openPreview({
                                                            title: article.title,
                                                            contentText: article.content,
                                                            meta: `Artikel • ${article.author?.name ?? 'Admin'}`,
                                                        })
                                                    }
                                                    className="inline-flex rounded-full border border-[#111827]/10 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                                >
                                                    Baca
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-[#111827]/10 px-4 py-4 text-sm text-[#111827]/65">
                                    Belum ada artikel yang dipublikasikan.
                                </div>
                            )}
                        </div>

                        <a href={homeInformationUrl} className="mt-4 inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/70 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8] sm:hidden">
                            Semua Informasi
                        </a>
                    </div>

                    <div className="rounded-[32px] border border-white/80 bg-white/92 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.06)] lg:p-6">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-xl font-bold text-[#111827]">Video Terbaru</h3>
                            <a href={homeInformationUrl} className="hidden rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/70 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8] sm:inline-flex">
                                Semua Informasi
                            </a>
                        </div>

                        <div className="mt-5 grid gap-4">
                            {latestVideos.length > 0 ? (
                                latestVideos.map((video) => (
                                    <article key={video.id} className="overflow-hidden rounded-2xl border border-[#111827]/10 bg-white shadow-sm transition hover:border-[#1d4ed8]/25">
                                        <a href={video.youtube_url} target="_blank" rel="noreferrer" className="block">
                                            <div className="relative h-36 bg-[#0f172a] sm:h-40">
                                                {video.thumbnail_url ? (
                                                    <img
                                                        src={video.thumbnail_url}
                                                        alt={video.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : null}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                                                <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#111827]">
                                                    Tonton
                                                </div>
                                            </div>
                                        </a>
                                        <div className="px-4 py-4">
                                            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#111827]/55">
                                                <span className="rounded-full bg-[#eff6ff] px-2 py-1 text-[#1d4ed8]">{video.uploader?.name ?? 'Pelatih'}</span>
                                                <span>{formatDate(video.published_at)}</span>
                                            </div>
                                            <h4 className="mt-2 text-base font-semibold text-[#111827]">{video.title}</h4>
                                            <p className="mt-2 line-clamp-2 break-words [overflow-wrap:anywhere] text-sm leading-6 text-[#111827]/70">
                                                {video.description || 'Materi teknik terbaru tersedia untuk ditonton publik.'}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openPreview({
                                                        title: video.title,
                                                        contentText: video.description || 'Materi teknik terbaru tersedia untuk ditonton publik.',
                                                        meta: `Video • ${video.uploader?.name ?? 'Pelatih'}`,
                                                        ctaUrl: video.youtube_url,
                                                        ctaLabel: 'Tonton Video',
                                                    })
                                                }
                                                className="mt-4 inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/75 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
                                            >
                                                Tonton
                                            </button>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-[#111827]/10 px-4 py-4 text-sm text-[#111827]/65">
                                    Belum ada video publik.
                                </div>
                            )}
                        </div>

                        <a href={homeInformationUrl} className="mt-4 inline-flex rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]/70 transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8] sm:hidden">
                            Semua Informasi
                        </a>
                    </div>
                </div>
            </section>

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
                                <a
                                    href={activePreview.ctaUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="tarung-button-primary"
                                >
                                    {activePreview.ctaLabel || 'Lihat'}
                                </a>
                            ) : null}
                            <button type="button" onClick={closePreview} className="tarung-button-secondary">
                                Tutup
                            </button>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </PublicLayout>
    );
}
