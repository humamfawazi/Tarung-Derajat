import ApplicationLogo from '@/Components/ApplicationLogo';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicLayout({ children }) {
    const { auth, locale } = usePage().props;

    const locales = locale?.supported ?? [];
    const currentLocale = locale?.current ?? 'id';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f7ff] text-[#111827]">
            <header className="sticky top-0 z-40 border-b border-white/40 bg-white/72 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
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
                            <a href="#history" className="text-sm font-medium text-[#111827]/70 transition hover:text-[#1d4ed8]">
                                History
                            </a>
                            <a href="#philosophy" className="text-sm font-medium text-[#111827]/70 transition hover:text-[#1d4ed8]">
                                Philosophy
                            </a>
                            <a href="#education" className="text-sm font-medium text-[#111827]/70 transition hover:text-[#1d4ed8]">
                                Education
                            </a>
                            <Link href={route('videos.index')} className="text-sm font-medium text-[#111827]/70 transition hover:text-[#1d4ed8]">
                                Videos
                            </Link>
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="tarung-button-primary bg-[#1d4ed8] shadow-[0_18px_40px_rgba(29,78,216,0.28)] hover:bg-[#1e40af]">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link href={route('login')} className="tarung-button-primary bg-[#1d4ed8] shadow-[0_18px_40px_rgba(29,78,216,0.28)] hover:bg-[#1e40af]">
                                    Login
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block">
                                <LanguageSwitcher locales={locales} currentLocale={currentLocale} />
                            </div>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full border border-[#111827]/10 bg-white px-4 py-2 text-sm font-semibold text-[#111827] lg:hidden"
                                onClick={() => setMobileMenuOpen((value) => !value)}
                                aria-expanded={mobileMenuOpen}
                                aria-controls="public-mobile-menu"
                            >
                                Menu
                            </button>
                        </div>
                    </div>

                    {mobileMenuOpen ? (
                        <div id="public-mobile-menu" className="mt-3 rounded-[28px] border border-white/80 bg-white/95 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)] lg:hidden">
                            <div className="flex flex-col gap-2">
                                <a href="#history" className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111827]/75 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                    History
                                </a>
                                <a href="#philosophy" className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111827]/75 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                    Philosophy
                                </a>
                                <a href="#education" className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111827]/75 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                    Education
                                </a>
                                <Link href={route('videos.index')} className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111827]/75 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                    Videos
                                </Link>
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="tarung-button-primary mt-2 w-full bg-[#1d4ed8] text-center shadow-[0_18px_40px_rgba(29,78,216,0.28)] hover:bg-[#1e40af]">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link href={route('login')} className="tarung-button-primary mt-2 w-full bg-[#1d4ed8] text-center shadow-[0_18px_40px_rgba(29,78,216,0.28)] hover:bg-[#1e40af]">
                                        Login
                                    </Link>
                                )}
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