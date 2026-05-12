import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PelatihNavbar() {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showAboutDropdown, setShowAboutDropdown] = useState(false);

    return (
        <nav className="sticky top-0 z-40 border-b border-white/70 bg-white/72 text-[#111827] backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex min-h-[4.75rem] items-center justify-between rounded-full border border-white/80 bg-white/88 px-4 py-3 shadow-[0_18px_60px_rgba(59,130,246,0.08)] sm:px-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link href={route('home')} className="flex items-center gap-3">
                            <ApplicationLogo className="block h-9 w-9 fill-current text-[#1d4ed8]" />
                            <div>
                                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#111827]/55">
                                    Tarung Derajat
                                </div>
                                <div className="hidden text-sm font-medium text-[#111827] sm:block">
                                    Platform Digital
                                </div>
                            </div>
                        </Link>

                        <div className="hidden items-center gap-7 lg:flex">
                            <NavLink
                                href={route('public.informasi')}
                                active={route().current('public.informasi')}
                            >
                                Informasi
                            </NavLink>
                            <NavLink
                                href={route('public.edukasi')}
                                active={route().current('public.edukasi')}
                            >
                                Edukasi
                            </NavLink>
                            <div className="relative">
                                <button
                                    onClick={() => setShowAboutDropdown(!showAboutDropdown)}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-[#111827]/65 transition hover:text-[#1d4ed8]"
                                >
                                    Tentang Kami
                                    <svg className={`h-4 w-4 transition-transform ${showAboutDropdown ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {showAboutDropdown && (
                                    <div className="absolute left-0 mt-2 w-48 rounded-lg border border-[#1d4ed8]/10 bg-white shadow-lg z-50">
                                        <Link href={route('public.tentang-kami.sejarah')} className="block px-4 py-2 text-sm text-[#111827]/70 hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded-t-lg">
                                            Sejarah
                                        </Link>
                                        <Link href={route('public.tentang-kami.filosofi')} className="block px-4 py-2 text-sm text-[#111827]/70 hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                                            Filosofi
                                        </Link>
                                        <Link href={route('public.tentang-kami.daftar-pengurus')} className="block px-4 py-2 text-sm text-[#111827]/70 hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded-b-lg">
                                            Daftar Pengurus & Atlet
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden items-center gap-4 lg:flex">
                        <Link
                            href={route('dashboard')}
                            className="text-sm font-medium text-[#111827]/65 transition hover:text-[#1d4ed8]"
                        >
                            Dashboard
                        </Link>

                        <div className="relative ms-3 z-[60]">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-full border border-[#1d4ed8]/10 bg-white px-1 shadow-sm">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold leading-4 text-[#111827] transition duration-150 ease-in-out hover:bg-[#eff6ff] focus:outline-none"
                                        >
                                            {user.name}

                                            <svg
                                                className="-me-0.5 ms-1 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-1 flex items-center lg:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center rounded-full border border-[#1d4ed8]/10 bg-white p-2 text-[#111827]/70 transition duration-150 ease-in-out hover:bg-[#eff6ff] hover:text-[#1d4ed8] focus:bg-[#eff6ff] focus:text-[#1d4ed8] focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' lg:hidden'
                }
            >
                <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
                    <div className="overflow-hidden rounded-[28px] border border-[#1d4ed8]/10 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink
                                href={route('public.informasi')}
                                active={route().current('public.informasi')}
                            >
                                Informasi
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('public.edukasi')}
                                active={route().current('public.edukasi')}
                            >
                                Edukasi
                            </ResponsiveNavLink>
                            <div className="px-4 py-2">
                                <button
                                    onClick={() => setShowAboutDropdown(!showAboutDropdown)}
                                    className="text-left text-sm font-medium text-[#111827]/65 w-full"
                                >
                                    Tentang Kami
                                </button>
                                {showAboutDropdown && (
                                    <div className="mt-2 space-y-1 pl-4">
                                        <ResponsiveNavLink href={route('public.tentang-kami.sejarah')}>
                                            Sejarah
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('public.tentang-kami.filosofi')}>
                                            Filosofi
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('public.tentang-kami.daftar-pengurus')}>
                                            Daftar Pengurus & Atlet
                                        </ResponsiveNavLink>
                                    </div>
                                )}
                            </div>
                            <ResponsiveNavLink
                                href={route('dashboard')}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-[#1d4ed8]/10 pb-1 pt-4">
                            <div className="px-4">
                                <div className="text-base font-medium text-[#111827]">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-[#111827]/55">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
