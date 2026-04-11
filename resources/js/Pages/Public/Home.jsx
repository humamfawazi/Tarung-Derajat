import YouTubeEmbed from '@/Components/YouTubeEmbed';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const copy = {
    id: {
        title: 'Tarung Web',
        headline: 'Sistem terpadu untuk membawa Tarung Derajat go international.',
        description:
            'Portal promosi global, standar edukasi terpusat, dan fondasi administrasi modern dalam satu platform yang konsisten.',
        primaryCta: 'Masuk ke sistem',
        secondaryCta: 'Lihat sejarah',
        features: [
            {
                title: 'Portal Promosi Global',
                text: 'Memperkenalkan sejarah, nilai, dan identitas Tarung Derajat ke audiens internasional.',
            },
            {
                title: 'Platform Edukasi Terpusat',
                text: 'Materi teknik, kurikulum, dan video YouTube yang seragam untuk semua praktisi.',
            },
            {
                title: 'Dasbor Administrasi',
                text: 'Data anggota, pelatih, wilayah, dan prestasi yang siap dipantau secara real-time.',
            },
        ],
        historyTitle: 'Akar yang kuat, arah yang global.',
        historyText:
            'Tarung Derajat dibangun dari disiplin, keberanian, dan karakter. Tarung Web menata itu semua ke dalam sistem digital yang mudah dipahami oleh jaringan nasional dan internasional.',
        philosophyTitle: 'Filosofi inti',
        philosophyText:
            'Kekuatan fisik, kejernihan mental, dan etika menjadi satu kesatuan. Identitas ini diterjemahkan ke antarmuka yang tegas, bersih, dan mudah dipakai.',
        videoTitle: 'Materi teknik dari YouTube',
        videoText:
            'Video pelatih akan otomatis masuk ke YouTube lalu disebarkan sebagai referensi belajar yang ringan di database dan mudah diakses via link.',
        adminTitle: 'Shell admin awal',
        adminText:
            'Admin Pusat, Pelatih, dan Anggota sudah dipersiapkan sejak fondasi pertama agar ekspansi ke modul operasional tidak memerlukan rombak arsitektur.',
    },
    en: {
        title: 'Tarung Web',
        headline: 'A unified system to take Tarung Derajat global.',
        description:
            'One platform for global promotion, centralized education standards, and a modern administration foundation.',
        primaryCta: 'Enter the system',
        secondaryCta: 'Read the history',
        features: [
            {
                title: 'Global Promotion Portal',
                text: 'Present Tarung Derajat history, values, and identity to international audiences.',
            },
            {
                title: 'Centralized Education Platform',
                text: 'Standard technique material, curricula, and YouTube video references for all practitioners.',
            },
            {
                title: 'Administration Dashboard',
                text: 'Track members, coaches, regions, and performance in a real-time ready system.',
            },
        ],
        historyTitle: 'Strong roots, global direction.',
        historyText:
            'Tarung Derajat was built on discipline, courage, and character. Tarung Web translates that identity into a digital system that can be understood across national and international networks.',
        philosophyTitle: 'Core philosophy',
        philosophyText:
            'Physical strength, mental clarity, and ethics move together. The interface reflects that identity with a direct, clean, and professional language.',
        videoTitle: 'Technique material from YouTube',
        videoText:
            'Coach uploads will be pushed to YouTube automatically and shared as lightweight, link-based learning references.',
        adminTitle: 'Initial admin shell',
        adminText:
            'Central admin, coaches, and members are planned from day one so future operational modules do not require an architecture rewrite.',
    },
};

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

    return (
        <PublicLayout>
            <Head title={content.title} />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div>
                        <div className="tarung-section-label">Tarung Derajat Worldwide</div>
                        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            {content.headline}
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#050B0A]/72">
                            {content.description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href={route('login')} className="tarung-button-primary">
                                {content.primaryCta}
                            </Link>
                            <a href="#history" className="tarung-button-secondary">
                                {content.secondaryCta}
                            </a>
                        </div>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {[
                                ['01', 'Global'],
                                ['02', 'Education'],
                                ['03', 'Admin'],
                            ].map(([number, label]) => (
                                <div key={label} className="tarung-shell rounded-[24px] p-5">
                                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#050B0A]/50">
                                        {number}
                                    </div>
                                    <div className="mt-4 text-lg font-semibold">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="tarung-shell rounded-[32px] p-6 lg:p-8">
                        <div className="rounded-[26px] bg-[#050B0A] p-6 text-white">
                            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">
                                Live rollout
                            </div>
                            <div className="mt-4 text-2xl font-bold leading-tight">
                                Unified portal + future-ready admin shell.
                            </div>
                            <p className="mt-4 text-sm leading-6 text-white/72">
                                Role-based access, bilingual content, and YouTube-based media are already
                                planned into the first architecture.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[24px] border border-[#050B0A]/10 bg-white p-5">
                                <div className="tarung-section-label">Roles</div>
                                <div className="mt-3 text-lg font-semibold">Admin, Coach, Member</div>
                            </div>
                            <div className="rounded-[24px] border border-[#050B0A]/10 bg-white p-5">
                                <div className="tarung-section-label">Media</div>
                                <div className="mt-3 text-lg font-semibold">YouTube first</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="grid gap-4 lg:grid-cols-3">
                    {features.map((feature) => (
                        <article key={feature.title} className="tarung-shell rounded-[28px] p-6">
                            <h2 className="text-xl font-bold">{feature.title}</h2>
                            <p className="mt-3 text-sm leading-6 text-[#050B0A]/70">{feature.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="history" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                        <div className="tarung-section-label">History</div>
                        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{content.historyTitle}</h2>
                        <p className="mt-5 text-base leading-8 text-[#050B0A]/70">{content.historyText}</p>
                    </div>

                    <div id="philosophy" className="tarung-shell rounded-[30px] p-8">
                        <div className="tarung-section-label">Philosophy</div>
                        <h3 className="mt-4 text-2xl font-bold">{content.philosophyTitle}</h3>
                        <p className="mt-4 text-sm leading-7 text-[#050B0A]/70">{content.philosophyText}</p>
                        <div className="mt-6 grid gap-3 text-sm">
                            <div className="rounded-2xl border border-[#050B0A]/10 px-4 py-3">Discipline as structure</div>
                            <div className="rounded-2xl border border-[#050B0A]/10 px-4 py-3">Precision as identity</div>
                            <div className="rounded-2xl border border-[#050B0A]/10 px-4 py-3">Respect as culture</div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="video" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div>
                        <div className="tarung-section-label">Education</div>
                        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{content.videoTitle}</h2>
                        <p className="mt-5 text-base leading-8 text-[#050B0A]/70">{content.videoText}</p>

                        <div className="mt-8 tarung-shell rounded-[28px] p-6">
                            <h3 className="text-lg font-bold">{content.adminTitle}</h3>
                            <p className="mt-3 text-sm leading-7 text-[#050B0A]/70">{content.adminText}</p>
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