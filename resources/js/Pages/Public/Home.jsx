import YouTubeEmbed from '@/Components/YouTubeEmbed';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const copy = {
    id: {
        title: 'Tarung Web',
        eyebrow: 'Tarung Derajat Global Platform',
        headline: 'Tarung Derajat untuk kontribusi ilmu kelas dunia.',
        description:
            'Platform ini dirancang untuk mendukung pengembangan manajemen olahraga secara teoretis sekaligus menjadi sarana praktis pengelolaan data, informasi, dan promosi Tarung Derajat.',
        primaryCta: 'Masuk ke sistem',
        secondaryCta: 'Jelajahi konten',
        trustLabel: 'implementasi digital untuk seni beladiri lokal',
        searchTitle: 'Akses data dan informasi organisasi',
        searchHeroTitle: 'Integrasi Data, Literasi, dan Promosi',
        searchHeroText: 'Satu pintu digital untuk kebutuhan pengurus, pembinaan, dan publikasi identitas Tarung Derajat ke level internasional.',
        searchButton: 'Cari',
        searchFields: [
            { label: 'Data Organisasi', value: 'Anggota, pelatih, cabang' },
            { label: 'Informasi', value: 'Agenda, kebijakan, publikasi' },
            { label: 'Promosi', value: 'Artikel, video, profil prestasi' },
            { label: 'Standar', value: 'Kelas dunia dan terukur' },
        ],
        stats: [
            { value: '01', label: 'Teoretis' },
            { value: '02', label: 'Praktis' },
            { value: '03', label: 'Internasional' },
        ],
        featuresTitle: 'Manfaat utama pengembangan website',
        featuresHeading: 'Kontribusi teoretis dan praktis dalam satu platform',
        features: [
            {
                title: 'Manfaat Teoretis',
                text: 'Memberikan kontribusi pada pengembangan ilmu manajemen olahraga, khususnya literatur transformasi digital dan strategi internasionalisasi seni beladiri lokal.',
            },
            {
                title: 'Manfaat Praktis',
                text: 'Menjadi sarana digital bagi pengurus Tarung Derajat dalam mengelola data dan informasi secara efisien, akurat, dan berkelanjutan.',
            },
            {
                title: 'Arah Organisasi Kelas Dunia',
                text: 'Memperkuat promosi dan tata kelola organisasi untuk mendukung positioning Tarung Derajat pada standar organisasi olahraga internasional.',
            },
        ],
        historyTitle: 'Dari seni beladiri lokal menuju ekosistem digital global.',
        historyText:
            'Tarung Derajat memiliki akar nilai yang kuat. Melalui website ini, nilai tersebut diterjemahkan ke dalam sistem informasi yang terstruktur untuk mendukung pengembangan organisasi sekaligus mendorong internasionalisasi berbasis data.',
        philosophyTitle: 'Manfaat Teoretis',
        philosophyText:
            'Website ini menjadi kontribusi akademik pada ranah manajemen olahraga: menghubungkan konsep transformasi digital, tata kelola organisasi, dan strategi internasionalisasi seni beladiri lokal dalam satu model implementasi nyata.',
        educationTitle: 'Manfaat Praktis untuk Pengurus',
        educationText:
            'Secara operasional, platform ini memudahkan pengurus dalam pengelolaan data, distribusi informasi, dan promosi program secara cepat dan efisien, sehingga proses manajemen organisasi lebih terukur dan profesional.',
        adminTitle: 'Target: organisasi kelas dunia',
        adminText:
            'Sistem admin pusat, pelatih, dan anggota disiapkan sebagai fondasi tata kelola modern untuk mendukung standarisasi, transparansi, dan citra global Tarung Derajat.',
        pillars: [
            'Transformasi digital berbasis literatur manajemen olahraga',
            'Efisiensi pengelolaan data dan informasi organisasi',
            'Promosi strategis menuju standar organisasi kelas dunia',
        ],
    },
    en: {
        title: 'Tarung Web',
        eyebrow: 'Tarung Derajat Global Platform',
        headline: 'Digital transformation for Tarung Derajat to advance theory and world-class organizational practice.',
        description:
            'This platform is designed to support sports management scholarship while becoming a practical digital tool for Tarung Derajat governance, information management, and promotion.',
        primaryCta: 'Enter the system',
        secondaryCta: 'Explore content',
        trustLabel: 'A research-to-practice direction for digital transformation and internationalization',
        searchTitle: 'Access organizational data and information',
        searchHeroTitle: 'Integrated Data, Literacy, and Promotion',
        searchHeroText: 'A single digital gateway for administrators, development programs, and global promotion of Tarung Derajat identity.',
        searchButton: 'Search',
        searchFields: [
            { label: 'Organization Data', value: 'Members, coaches, branches' },
            { label: 'Information', value: 'Agenda, policy, publications' },
            { label: 'Promotion', value: 'Articles, videos, achievements' },
            { label: 'Standard', value: 'World-class and measurable' },
        ],
        stats: [
            { value: '01', label: 'Theoretical' },
            { value: '02', label: 'Practical' },
            { value: '03', label: 'International' },
        ],
        featuresTitle: 'Core value of this website development',
        featuresHeading: 'Theoretical and practical contributions in one platform',
        features: [
            {
                title: 'Theoretical Contribution',
                text: 'Contributes to sports management studies, especially digital transformation literature and internationalization strategy for local martial arts.',
            },
            {
                title: 'Practical Contribution',
                text: 'Provides a digital workspace for Tarung Derajat administrators to manage data and information efficiently, consistently, and sustainably.',
            },
            {
                title: 'World-Class Organization Direction',
                text: 'Strengthens promotion and governance quality to support Tarung Derajat positioning at world-class organizational standards.',
            },
        ],
        historyTitle: 'From local martial heritage to a global digital ecosystem.',
        historyText:
            'Tarung Derajat is built on strong values. Through this website, those values are translated into a structured information system to support organizational development and data-driven internationalization.',
        philosophyTitle: 'Theoretical Contribution',
        philosophyText:
            'This website contributes to sports management discourse by linking digital transformation concepts, governance models, and internationalization strategy for local martial arts in a real implementation.',
        educationTitle: 'Practical Benefit for Administrators',
        educationText:
            'Operationally, this platform helps administrators manage data, distribute information, and run promotion more efficiently, making governance more measurable and professional.',
        adminTitle: 'Target: world-class organization',
        adminText:
            'The central admin, coach, and member system is built as a modern governance foundation to support standardization, transparency, and global branding of Tarung Derajat.',
        pillars: [
            'Digital transformation grounded in sports management literature',
            'Efficient management of organizational data and information',
            'Strategic promotion toward world-class organizational standards',
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

export default function Home({ landingSections = [] }) {
    const { locale } = usePage().props;
    const currentLocale = locale?.current === 'en' ? 'en' : 'id';
    const content = copy[currentLocale];
    const features = landingSections.length > 0
        ? landingSections.map((item) => ({
            title: item.title,
            text: item.content,
        }))
        : content.features;

    const fieldValues = Object.fromEntries(
        searchFields.map((field, index) => [field.key, content.searchFields[index]]),
    );

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
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center rounded-full bg-[#1d4ed8] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(29,78,216,0.28)] transition hover:bg-[#1e40af]"
                                >
                                    {content.primaryCta}
                                </Link>
                                <a
                                    href="#features"
                                    className="inline-flex items-center justify-center rounded-full border border-[#111827]/10 bg-white/90 px-6 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition hover:border-[#1d4ed8]/25 hover:text-[#1d4ed8]"
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

            <section id="features" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
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

                <div className="mt-8 grid gap-5 lg:grid-cols-3">
                    {features.map((feature) => (
                        <article key={feature.title} className="rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff6ff] text-lg font-bold text-[#1d4ed8]">
                                •
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-[#111827]">
                                {feature.title}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-[#111827]/68">
                                {feature.text}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="history" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
                    <div className="rounded-[34px] border border-white/80 bg-white/90 p-7 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:p-8">
                        <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                            History
                        </div>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                            {content.historyTitle}
                        </h2>
                        <p className="mt-5 text-base leading-8 text-[#111827]/70">
                            {content.historyText}
                        </p>
                    </div>

                    <div id="philosophy" className="rounded-[34px] border border-[#1d4ed8]/10 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-7 shadow-[0_18px_70px_rgba(29,78,216,0.08)] sm:p-8">
                        <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                            Philosophy
                        </div>
                        <h3 className="mt-4 text-2xl font-bold text-[#111827]">
                            {content.philosophyTitle}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[#111827]/70">
                            {content.philosophyText}
                        </p>
                        <div className="mt-6 grid gap-3 text-sm text-[#111827]/80">
                            {content.pillars.map((item) => (
                                <div key={item} className="rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-sm">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="education" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                    <div className="rounded-[34px] border border-white/80 bg-white/90 p-7 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:p-8">
                        <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#1d4ed8]/70">
                            Education
                        </div>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                            {content.educationTitle}
                        </h2>
                        <p className="mt-5 text-base leading-8 text-[#111827]/70">
                            {content.educationText}
                        </p>

                        <div className="mt-8 rounded-[28px] border border-[#111827]/8 bg-[#f8fbff] p-6">
                            <h3 className="text-lg font-bold text-[#111827]">
                                {content.adminTitle}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-[#111827]/70">
                                {content.adminText}
                            </p>
                        </div>
                    </div>

                    <YouTubeEmbed
                        url="https://www.youtube.com/watch?v=QH2-TGUlwu4"
                        title="Technique demo placeholder - replaced by coach uploads later"
                    />
                </div>
            </section>
        </PublicLayout>
    );
}
