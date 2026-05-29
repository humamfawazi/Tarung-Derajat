import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function AdminSidebar({ isOpen, setIsOpen }) {
    const navLinks = [
        { name: 'Overview', route: 'dashboard', activeRoute: 'dashboard', icon: '📊' },
        { name: 'Manajemen Admin', route: 'admin.users.index', activeRoute: 'admin.users.*', icon: '👥' },
        { name: 'Artikel', route: 'admin.articles.index', activeRoute: 'admin.articles.*', icon: '📝' },
        { name: 'Video', route: 'admin.videos.index', activeRoute: 'admin.videos.*', icon: '🎥' },
        { name: 'Anggota', route: 'admin.members.index', activeRoute: 'admin.members.*', icon: '🥋' },
        { name: 'Jadwal', route: 'admin.calendars.index', activeRoute: 'admin.calendars.*', icon: '📅' },
        { name: 'Galeri', route: 'admin.galleries.index', activeRoute: 'admin.galleries.*', icon: '🖼️' },
        { name: 'Program', route: 'admin.programs.index', activeRoute: 'admin.programs.*', icon: '🏆' },
        { name: 'Halaman Statis', route: 'admin.landing.index', activeRoute: 'admin.landing.*', icon: '📄' },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-[#111827]/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-[#1d4ed8]/10 bg-white shadow-xl transition-transform duration-300 lg:static lg:block lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex h-full flex-col">
                    {/* Header Sidebar */}
                    <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-[#111827]/10">
                        <Link href={route('home')} className="flex items-center gap-3">
                            <ApplicationLogo className="block h-8 w-8 fill-current text-[#1d4ed8]" />
                            <div>
                                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#111827]">
                                    Tarung Derajat
                                </div>
                                <div className="text-[10px] font-medium text-[#111827]/60">
                                    Panel Admin
                                </div>
                            </div>
                        </Link>
                        
                        <button 
                            className="lg:hidden p-2 text-[#111827]/60 hover:text-[#1d4ed8]"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                        {navLinks.map((link) => {
                            const isActive = route().current(link.activeRoute);
                            return (
                                <Link
                                    key={link.name}
                                    href={route(link.route)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                                        isActive 
                                        ? 'bg-[#1d4ed8] text-white shadow-md shadow-[#1d4ed8]/20' 
                                        : 'text-[#111827]/70 hover:bg-[#eff6ff] hover:text-[#1d4ed8]'
                                    }`}
                                >
                                    <span className="text-lg leading-none">{link.icon}</span>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Sidebar (Optional links) */}
                    <div className="border-t border-[#111827]/10 p-4">
                        <Link
                            href={route('home')}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#111827]/70 hover:bg-[#eff6ff] hover:text-[#1d4ed8] transition-colors duration-200"
                        >
                            <span className="text-lg leading-none">🏠</span>
                            Ke Halaman Utama
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
