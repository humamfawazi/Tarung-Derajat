import Dropdown from '@/Components/Dropdown';
import AdminSidebar from '@/Components/Sidebars/AdminSidebar';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#f5f7ff] text-[#111827]">
            {/* Sidebar */}
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex flex-1 flex-col min-w-0 transition-all duration-300">
                {/* Topbar */}
                <header className="sticky top-0 z-30 border-b border-white/70 bg-white/72 backdrop-blur-xl">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            {/* Mobile menu button */}
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#111827]/10 bg-white text-[#111827]/60 hover:bg-[#eff6ff] hover:text-[#1d4ed8] lg:hidden mr-4"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Optional: Add a breadcrumb or title here if you want */}
                            <div className="hidden lg:block text-sm font-semibold uppercase tracking-[0.2em] text-[#111827]/50">
                                Administrator Area
                            </div>
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-full border border-[#1d4ed8]/10 bg-white px-1 py-1 shadow-sm transition hover:bg-[#eff6ff] cursor-pointer">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold leading-4 text-[#111827] focus:outline-none"
                                            >
                                                <div className="h-6 w-6 rounded-full bg-[#1d4ed8]/10 text-[#1d4ed8] flex items-center justify-center font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <span className="hidden sm:block">{user.name}</span>
                                                <svg className="-me-0.5 ms-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <div className="px-4 py-2 border-b border-[#111827]/5 mb-1">
                                            <div className="text-sm font-medium text-[#111827]">{user.name}</div>
                                            <div className="text-xs text-[#111827]/60 truncate">{user.email}</div>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                    {/* Page Header slot (passed from inertia pages) */}
                    {header && (
                        <div className="border-t border-[#111827]/5 bg-white/80 py-4 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    )}
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
