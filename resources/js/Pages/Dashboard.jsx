import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Dashboard({ stats, latestArticles, adminInfos, adminCrud }) {
    const user = usePage().props.auth.user;
    const roleName = user?.role?.name ?? null;
    const isAdmin = roleName === 'admin';
    const permissions = user?.role?.permissions ?? [];
    const canUploadVideos = permissions.includes('videos.create');
    const canUploadArticles = ['admin', 'pelatih', 'coach'].includes(user?.role?.name ?? '');

    const cards = [
        { label: 'Total Artikel', value: String(stats?.articles_count ?? 0), note: 'Konten pembinaan aktif' },
        { label: 'Total Video', value: String(stats?.videos_count ?? 0), note: 'Video teknik dipublikasikan' },
    ];

    if (isAdmin) {
        return (
            <AuthenticatedLayout
                header={
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="tarung-section-label">Admin dashboard</div>
                            <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">Kontrol CRUD Konten</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link href={route('admin.articles.create')} className="tarung-button-primary">Tambah Artikel</Link>
                            <Link href={route('admin.users.create')} className="tarung-button-primary">Tambah User</Link>
                            <Link href={route('videos.upload')} className="tarung-button-primary">Tambah Video</Link>
                            <Link href={route('admin.landing.create')} className="tarung-button-primary">Tambah Teks</Link>
                        </div>
                    </div>
                }
            >
                <Head title="Dashboard Admin" />

                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <div className="tarung-shell rounded-[28px] p-6">
                            <div className="text-sm font-medium text-[#050B0A]/60">Total Artikel</div>
                            <div className="mt-3 text-3xl font-extrabold tracking-tight">{stats?.articles_count ?? 0}</div>
                            <div className="mt-2 text-sm text-[#050B0A]/70">Featured: {stats?.featured_articles_count ?? 0}</div>
                        </div>
                        <div className="tarung-shell rounded-[28px] p-6">
                            <div className="text-sm font-medium text-[#050B0A]/60">Total Video</div>
                            <div className="mt-3 text-3xl font-extrabold tracking-tight">{stats?.videos_count ?? 0}</div>
                            <div className="mt-2 text-sm text-[#050B0A]/70">Status published</div>
                        </div>
                        <div className="tarung-shell rounded-[28px] p-6">
                            <div className="text-sm font-medium text-[#050B0A]/60">Total User</div>
                            <div className="mt-3 text-3xl font-extrabold tracking-tight">{stats?.users_count ?? 0}</div>
                            <div className="mt-2 text-sm text-[#050B0A]/70">User aktif sistem</div>
                        </div>
                        <div className="tarung-shell rounded-[28px] p-6">
                            <div className="text-sm font-medium text-[#050B0A]/60">Informasi Admin</div>
                            <div className="mt-3 text-3xl font-extrabold tracking-tight">{adminCrud?.landing?.length ?? 0}</div>
                            <div className="mt-2 text-sm text-[#050B0A]/70">Section ditampilkan</div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <div className="tarung-shell overflow-x-auto rounded-[28px] p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold">Artikel</h3>
                                <Link href={route('admin.articles.index')} className="tarung-button-secondary">Kelola</Link>
                            </div>
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#050B0A]/10">
                                        <th className="px-2 py-2">Judul</th>
                                        <th className="px-2 py-2">Featured</th>
                                        <th className="px-2 py-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(adminCrud?.articles ?? []).map((item) => (
                                        <tr key={item.id} className="border-b border-[#050B0A]/5">
                                            <td className="px-2 py-2">{item.title}</td>
                                            <td className="px-2 py-2">{item.is_featured ? 'Ya' : 'Tidak'}</td>
                                            <td className="px-2 py-2 text-right">
                                                <div className="inline-flex gap-2">
                                                    <Link href={route('admin.articles.edit', item.id)} className="tarung-button-secondary px-3 py-2">Update</Link>
                                                    <Link href={route('admin.articles.destroy', item.id)} method="delete" as="button" className="rounded-full border border-red-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Delete</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="tarung-shell overflow-x-auto rounded-[28px] p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold">User</h3>
                                <Link href={route('admin.users.index')} className="tarung-button-secondary">Kelola</Link>
                            </div>
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#050B0A]/10">
                                        <th className="px-2 py-2">Nama</th>
                                        <th className="px-2 py-2">Verified</th>
                                        <th className="px-2 py-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(adminCrud?.users ?? []).map((item) => (
                                        <tr key={item.id} className="border-b border-[#050B0A]/5">
                                            <td className="px-2 py-2">{item.name}</td>
                                            <td className="px-2 py-2">{item.email_verified_at ? 'Ya' : 'Tidak'}</td>
                                            <td className="px-2 py-2 text-right">
                                                <div className="inline-flex gap-2">
                                                    <Link href={route('admin.users.edit', item.id)} className="tarung-button-secondary px-3 py-2">Update</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="tarung-shell overflow-x-auto rounded-[28px] p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold">Video</h3>
                                <Link href={route('admin.videos.index')} className="tarung-button-secondary">Kelola</Link>
                            </div>
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#050B0A]/10">
                                        <th className="px-2 py-2">Judul</th>
                                        <th className="px-2 py-2">Status</th>
                                        <th className="px-2 py-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(adminCrud?.videos ?? []).map((item) => (
                                        <tr key={item.id} className="border-b border-[#050B0A]/5">
                                            <td className="px-2 py-2">{item.title}</td>
                                            <td className="px-2 py-2 capitalize">{item.status}</td>
                                            <td className="px-2 py-2 text-right">
                                                <div className="inline-flex gap-2">
                                                    <Link href={route('admin.videos.edit', item.id)} className="tarung-button-secondary px-3 py-2">Update</Link>
                                                    <Link href={route('admin.videos.destroy', item.id)} method="delete" as="button" className="rounded-full border border-red-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Delete</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="tarung-shell overflow-x-auto rounded-[28px] p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold">Informasi Dashboard</h3>
                                <Link href={route('admin.landing.index')} className="tarung-button-secondary">Kelola</Link>
                            </div>
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#050B0A]/10">
                                        <th className="px-2 py-2">Judul</th>
                                        <th className="px-2 py-2">Aktif</th>
                                        <th className="px-2 py-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(adminCrud?.landing ?? []).map((item) => (
                                        <tr key={item.id} className="border-b border-[#050B0A]/5">
                                            <td className="px-2 py-2">{item.title}</td>
                                            <td className="px-2 py-2">{item.is_active ? 'Ya' : 'Tidak'}</td>
                                            <td className="px-2 py-2 text-right">
                                                <div className="inline-flex gap-2">
                                                    <Link href={route('admin.landing.edit', item.id)} className="tarung-button-secondary px-3 py-2">Update</Link>
                                                    <Link href={route('admin.landing.destroy', item.id)} method="delete" as="button" className="rounded-full border border-red-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Delete</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Member dashboard</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">
                            Ringkasan materi latihan
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('articles.index')} className="tarung-button-secondary w-fit">
                            Lihat artikel
                        </Link>
                        <Link href={route('videos.index')} className="tarung-button-secondary w-fit">
                            Lihat video
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-4 md:grid-cols-2">
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
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="tarung-section-label">Artikel terbaru</div>
                                <h3 className="mt-3 text-2xl font-bold">Update materi terkini</h3>
                            </div>
                            <Link href={route('articles.index')} className="tarung-button-secondary">
                                Semua artikel
                            </Link>
                        </div>

                        <div className="mt-5 space-y-4">
                            {latestArticles?.length ? (
                                latestArticles.map((article) => (
                                    <div key={article.id} className="rounded-2xl border border-[#050B0A]/10 px-4 py-4">
                                        <div className="text-xs uppercase tracking-[0.18em] text-[#050B0A]/55">
                                            {article.author?.name ?? 'Admin'}
                                        </div>
                                        <div className="mt-2 text-base font-semibold text-[#050B0A]">{article.title}</div>
                                        <div className="mt-2 line-clamp-2 text-sm text-[#050B0A]/72">
                                            {article.content}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-[#050B0A]/10 px-4 py-4 text-sm text-[#050B0A]/65">
                                    Belum ada artikel untuk ditampilkan.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="tarung-shell rounded-[32px] p-6 lg:p-8">
                        <div className="tarung-section-label">Informasi dari admin</div>
                        <div className="mt-4 space-y-4">
                            {adminInfos?.length ? (
                                adminInfos.map((info) => (
                                    <div key={info.id} className="rounded-2xl border border-[#050B0A]/10 px-4 py-4">
                                        <div className="text-sm font-semibold text-[#050B0A]">{info.title}</div>
                                        <p className="mt-2 text-sm leading-6 text-[#050B0A]/72">{info.content}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-[#050B0A]/10 px-4 py-4 text-sm text-[#050B0A]/65">
                                    Belum ada informasi admin.
                                </div>
                            )}
                            {(canUploadVideos || canUploadArticles) && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {canUploadVideos && (
                                        <Link href={route('videos.upload')} className="tarung-button-secondary">
                                            Upload video
                                        </Link>
                                    )}
                                    {canUploadArticles && (
                                        <Link href={route('articles.upload')} className="tarung-button-secondary">
                                            Upload artikel
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
