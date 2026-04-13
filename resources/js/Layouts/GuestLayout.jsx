import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f7ff] px-4 py-10 text-[#111827] sm:px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,234,254,0.9),transparent_36%),linear-gradient(180deg,#eff6ff_0%,#ffffff_46%,#ffffff_100%)]" />
            <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#bfdbfe]/60 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#dbeafe]/60 blur-3xl" />

            <div className="relative z-10">
                <Link href="/" className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-[0_18px_60px_rgba(59,130,246,0.1)] backdrop-blur">
                    <ApplicationLogo className="h-10 w-10 fill-current text-[#1d4ed8]" />
                    <div className="leading-tight">
                        <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#111827]/55">Tarung Web</div>
                        <div className="text-sm font-semibold text-[#111827]">Member Access</div>
                    </div>
                </Link>
            </div>

            <div className="relative z-10 mt-6 w-full overflow-hidden rounded-[32px] border border-white/80 bg-white/92 px-6 py-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:max-w-md sm:px-8 sm:py-8">
                {children}
            </div>
        </div>
    );
}
