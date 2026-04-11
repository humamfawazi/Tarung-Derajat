import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const permissions = user?.role?.permissions ?? [];
    const canUploadVideos = permissions.includes('videos.create');

    const cards = [
        { label: 'Registered members', value: '1,240', note: 'Across 12 regions' },
        { label: 'Active coaches', value: '86', note: 'Using role-based access' },
        { label: 'Technique videos', value: '214', note: 'YouTube-linked content' },
        { label: 'Reports exported', value: '38', note: 'Excel/CSV ready' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Internal admin</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">
                            Operational overview
                        </h2>
                    </div>
                    <Link href={route('home')} className="tarung-button-secondary w-fit">
                        View public portal
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {cards.map((card) => (
                        <div key={card.label} className="tarung-shell rounded-[28px] p-6">
                            <div className="text-sm font-medium text-[#050B0A]/60">
                                {card.label}
                            </div>
                            <div className="mt-3 text-3xl font-extrabold tracking-tight">
                                {card.value}
                            </div>
                            <div className="mt-2 text-sm text-[#050B0A]/70">{card.note}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="tarung-shell rounded-[32px] p-6 lg:p-8">
                        <div className="tarung-section-label">Workflow</div>
                        <h3 className="mt-4 text-2xl font-bold">What is already in place</h3>
                        <ul className="mt-5 space-y-4 text-sm leading-7 text-[#050B0A]/75">
                            <li>Role and permission middleware are wired for future module access control.</li>
                            <li>Locale-aware routing is ready for Indonesian and English content.</li>
                            <li>YouTube-based video storage keeps database usage lean for the education module.</li>
                            <li>Excel reporting can be added without changing the dashboard shell.</li>
                        </ul>
                        {canUploadVideos && (
                            <div className="mt-6">
                                <Link href={route('videos.upload')} className="tarung-button-secondary">
                                    Open video upload
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="tarung-shell rounded-[32px] p-6 lg:p-8">
                        <div className="tarung-section-label">Next modules</div>
                        <div className="mt-4 space-y-4">
                            {[
                                'Member registry and belt progression',
                                'Coach-managed technique library',
                                'Regional spread and performance monitoring',
                                'Export and import workflows',
                            ].map((item) => (
                                <div key={item} className="rounded-2xl border border-[#050B0A]/10 px-4 py-3 text-sm font-medium">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
