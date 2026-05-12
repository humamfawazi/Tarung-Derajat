import ApplicationLogo from '@/Components/ApplicationLogo';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicLayout({ children }) {
    const { auth, locale } = usePage().props;

    const locales = locale?.supported ?? [];
    const currentLocale = locale?.current ?? 'id';
    const homeUrl = currentLocale === 'en' ? route('home.en') : route('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [staffMenuOpen, setStaffMenuOpen] = useState(false);

    const toggleStaffMenu = () => {
        setStaffMenuOpen((value) => {
            const nextValue = !value;
            if (nextValue) {
                setMobileMenuOpen(false);
            }

            return nextValue;
        });
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen((value) => {
            const nextValue = !value;
            if (nextValue) {
                setStaffMenuOpen(false);
            }

            return nextValue;
        });
    };

    return (
        <div className="min-h-screen bg-[#f5f7ff] text-[#111827]">
            <header className="sticky top-0 z-40 border-b border-white/40 bg-white/72 backdrop-blur-xl">
                <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between rounded-full border border-white/80 bg-white/85 px-4 py-3 shadow-[0_14px_50px_rgba(59,130,246,0.08)]">
                        <Link href={route('home')} className="flex items-center gap-3">
                            <ApplicationLogo className="h-11 w-11 fill-current text-[#1d4ed8]" />
                            <div className="leading-tight">
                                <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#111827]/55">
                                    Tarung Web
                                </div>
                                <div className="text-sm font-semibold text-[#111827]">
                                    Modern Martial Arts Portal
                                </div>
                            </div>
                        </Link>

                        <div className="hidden items-center gap-8 lg:flex">
                            <Link
                                href={route('home')}
                                className="text-sm font-medium text-[#111827]/70 transition hover:text-[#1d4ed8]"
                            >
                                Home
                            </Link>
                            <Link
                                href={route('public.informasi')}
                                className="text-sm font-medium text-[#111827]/70 transition hover:text-[#1d4ed8]"
                            >
                                Informasi
                            </Link>
                            <Link
                                href={route('public.kompetisi-event')}
                                className="text-sm font-medium text-[#111827]/70 transition hover:text-[#1d4ed8]"
                            >
                                Kompetisi & Event
                            </Link>

                            <div className="relative group">
                                <button
                                    className="inline-flex items-center gap-1 text-sm font-medium text-[#111827]/70 transition hover:text-[#1d4ed8]"
                                >
                                    Tentang Kami
                                    <svg className="h-4 w-4 transition-transform group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className="absolute left-0 mt-0 w-48 rounded-xl border border-[#1d4ed8]/10 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-1">
                                        <Link href={route('public.tentang-kami.sejarah')} className="block px-4 py-2 text-sm text-[#111827]/70 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                            Sejarah
                                        </Link>
                                        <Link href={route('public.tentang-kami.filosofi')} className="block px-4 py-2 text-sm text-[#111827]/70 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                            Filosofi
                                        </Link>
                                        <Link href={route('public.tentang-kami.daftar-pengurus')} className="block px-4 py-2 text-sm text-[#111827]/70 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                            Daftar Pengurus & Atlet
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111827]/15 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#111827]/68 transition hover:border-[#1d4ed8]/30 hover:text-[#1d4ed8]"
                                onClick={toggleStaffMenu}
                                aria-expanded={staffMenuOpen}
                                aria-controls="staff-access-menu"
                            >
                                <span className="text-sm leading-none">◍</span>
                                Akses Admin
                            </button>

                            <div className="hidden sm:block">
                                <LanguageSwitcher locales={locales} currentLocale={currentLocale} />
                            </div>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-sm font-semibold text-[#111827] lg:hidden"
                                onClick={toggleMobileMenu}
                                aria-expanded={mobileMenuOpen}
                                aria-controls="public-mobile-menu"
                            >
                                <span className="text-base leading-none">≡</span>
                                Menu
                            </button>
                        </div>
                    </div>

                    {staffMenuOpen ? (
                        <div id="staff-access-menu" className="absolute right-4 top-[calc(100%-0.1rem)] z-50 mt-3 w-[min(92vw,24rem)] sm:right-6 lg:right-8">
                            <div className="w-full max-w-sm rounded-[24px] border border-[#111827]/10 bg-white/95 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#111827]/50">
                                    Area Internal
                                </div>
                                <p className="mt-2 text-sm leading-6 text-[#111827]/68">
                                    Akses ini khusus admin dan trainer untuk pengelolaan konten sistem.
                                </p>
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="tarung-button-primary mt-4 w-full bg-[#1d4ed8] text-center shadow-[0_18px_40px_rgba(29,78,216,0.28)] hover:bg-[#1e40af]">
                                        Masuk Dashboard Staff
                                    </Link>
                                ) : (
                                    <Link href={route('login')} className="tarung-button-primary mt-4 w-full bg-[#1d4ed8] text-center shadow-[0_18px_40px_rgba(29,78,216,0.28)] hover:bg-[#1e40af]">
                                        Login Admin/Trainer
                                    </Link>
                                )}
                            </div>
                        </div>
                    ) : null}

                    {mobileMenuOpen ? (
                        <div id="public-mobile-menu" className="absolute left-4 right-4 top-[calc(100%-0.1rem)] z-50 mt-3 rounded-[28px] border border-white/80 bg-white/95 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)] lg:hidden">
                            <div className="flex flex-col gap-2">
                                <a href={`${homeUrl}#history`} className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111827]/75 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                    History
                                </a>
                                <a href={`${homeUrl}#philosophy`} className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111827]/75 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                    Philosophy
                                </a>
                                <Link href={route('public.kompetisi-event')} className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111827]/75 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                    Kompetisi & Event
                                </Link>
                                <Link href={route('public.informasi')} className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111827]/75 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                    Informasi
                                </Link>
                                <div className="pt-2 sm:hidden">
                                    <LanguageSwitcher locales={locales} currentLocale={currentLocale} />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </header>

            <main>{children}</main>

            <footer className="border-t border-white/70 bg-[#0f172a] text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
                            Tarung Derajat
                        </div>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">
                            Platform yang lebih rapi untuk promosi global, standarisasi edukasi,
                            dan administrasi yang siap tumbuh.
                        </p>
                    </div>

                    <div className="text-sm text-white/65">
                        <p>Responsive layout for desktop and mobile.</p>
                        <p className="mt-2">Theme: soft blue, white, and deep navy.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}