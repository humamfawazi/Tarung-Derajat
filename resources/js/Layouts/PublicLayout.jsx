import ApplicationLogo from '@/Components/ApplicationLogo';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { Link, usePage } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const { auth, locale } = usePage().props;

    const locales = locale?.supported ?? [];
    const currentLocale = locale?.current ?? 'id';

    return (
        <div className="min-h-screen bg-white text-[#050B0A]">
            <header className="sticky top-0 z-40 border-b border-[#050B0A]/10 bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10 fill-current text-[#050B0A]" />
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#050B0A]/55">
                                Tarung Web
                            </div>
                            <div className="text-sm font-semibold">
                                Global Martial Arts Platform
                            </div>
                        </div>
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        <a href="#history" className="text-sm font-medium text-[#050B0A]/70 transition hover:text-[#050B0A]">
                            History
                        </a>
                        <a href="#philosophy" className="text-sm font-medium text-[#050B0A]/70 transition hover:text-[#050B0A]">
                            Philosophy
                        </a>
                        <Link href={route('videos.index')} className="text-sm font-medium text-[#050B0A]/70 transition hover:text-[#050B0A]">
                            Videos
                        </Link>
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="tarung-button-primary">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href={route('login')} className="tarung-button-primary">
                                Login
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher locales={locales} currentLocale={currentLocale} />
                    </div>
                </div>
            </header>

            <main>{children}</main>

            <footer className="border-t border-[#050B0A]/10 bg-[#050B0A] text-white">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
                            Tarung Derajat
                        </div>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                            A unified platform for global promotion, education standardization,
                            and future-ready administration.
                        </p>
                    </div>

                    <div className="text-sm text-white/65">
                        <p>Built for a bilingual international rollout.</p>
                        <p className="mt-2">Palet resmi: #ffffff and #050B0A.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}