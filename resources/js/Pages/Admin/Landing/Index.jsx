import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function AdminLandingIndex({ sections, databaseReady }) {
    const { flash } = usePage().props;
    const { delete: destroy, processing } = useForm({});
    const { data: filters, setData: setFilters } = useForm({
        type: 'all',
        locale: 'all',
        status: 'all',
    });

    const sectionTypes = [
        { value: 'feature', label: 'Feature' },
        { value: 'history', label: 'History' },
        { value: 'philosophy', label: 'Philosophy' },
        { value: 'education', label: 'Education' },
    ];

    const handleDelete = (id) => {
        if (!confirm('Hapus konten user ini?')) {
            return;
        }

        destroy(route('admin.landing.destroy', id));
    };

    const getTypeFromKey = (key = '') => key.split('_')[0] || '-';

    const getImpactText = (type) => {
        if (type === 'feature') {
            return 'Landing User';
        }

        return 'Landing + Dashboard User';
    };

    const filteredSections = sections.filter((section) => {
        const type = getTypeFromKey(section.section_key);
        const matchesType = filters.type === 'all' || type === filters.type;
        const matchesLocale = filters.locale === 'all' || section.locale === filters.locale;
        const matchesStatus =
            filters.status === 'all' ||
            (filters.status === 'active' && section.is_active) ||
            (filters.status === 'inactive' && !section.is_active);

        return matchesType && matchesLocale && matchesStatus;
    });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Pusat Konten User</h2>
                        <p className="mt-2 max-w-2xl text-sm text-[#111827]/65">
                            Kelola semua konten landing untuk user dari satu tempat. Perubahan di sini akan memengaruhi
                            tampilan Home user dan sebagian section informasi di dashboard user.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={route('admin.content.index')} className="tarung-button-secondary w-fit">
                            Pusat Konten User
                        </Link>
                        <Link href={route('admin.display-settings.edit')} className="tarung-button-secondary w-fit">
                            Atur Jumlah Tampil
                        </Link>
                        <Link href={route('home')} className="tarung-button-secondary w-fit">
                            Lihat Halaman User
                        </Link>
                        <Link href={route('admin.landing.create')} className="tarung-button-primary w-fit">
                            Tambah Konten User
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Pusat Konten User" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {!databaseReady && (
                    <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        Tabel landing_sections belum tersedia. Jalankan: php artisan migrate
                    </div>
                )}
                {flash?.success && (
                    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                    <div className="tarung-shell rounded-[24px] p-4 sm:p-5">
                        <div className="text-sm font-semibold text-[#111827]">Filter Konten</div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-3">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111827]/65">Jenis</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => setFilters('type', e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-[#1d4ed8]/15 px-3 py-2 text-sm focus:border-[#1d4ed8] focus:outline-none"
                                >
                                    <option value="all">Semua</option>
                                    {sectionTypes.map((item) => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111827]/65">Bahasa</label>
                                <select
                                    value={filters.locale}
                                    onChange={(e) => setFilters('locale', e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-[#1d4ed8]/15 px-3 py-2 text-sm focus:border-[#1d4ed8] focus:outline-none"
                                >
                                    <option value="all">Semua</option>
                                    <option value="id">ID</option>
                                    <option value="en">EN</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111827]/65">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters('status', e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-[#1d4ed8]/15 px-3 py-2 text-sm focus:border-[#1d4ed8] focus:outline-none"
                                >
                                    <option value="all">Semua</option>
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="tarung-shell rounded-[24px] p-4 sm:p-5">
                        <div className="text-sm font-semibold text-[#111827]">Aturan Tampil</div>
                        <ul className="mt-3 space-y-2 text-sm text-[#111827]/72">
                            <li>Feature: tampil di landing user.</li>
                            <li>History, Philosophy, Education: tampil di landing dan dashboard user.</li>
                            <li>Jumlah tampil diatur dari menu Atur Jumlah Tampil.</li>
                        </ul>
                    </div>
                </div>

                <div className="tarung-shell overflow-x-auto rounded-[28px] p-4 sm:p-6">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#111827]/10">
                                <th className="px-3 py-3 font-semibold">Locale</th>
                                <th className="px-3 py-3 font-semibold">Jenis</th>
                                <th className="px-3 py-3 font-semibold">Key</th>
                                <th className="px-3 py-3 font-semibold">Title</th>
                                <th className="px-3 py-3 font-semibold">Status</th>
                                <th className="px-3 py-3 font-semibold">Dampak</th>
                                <th className="px-3 py-3 font-semibold">Sort</th>
                                <th className="px-3 py-3 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSections.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-3 py-6 text-center text-[#111827]/60">
                                        Tidak ada konten yang sesuai filter.
                                    </td>
                                </tr>
                            ) : (
                                filteredSections.map((section) => {
                                    const type = getTypeFromKey(section.section_key);

                                    return (
                                        <tr key={section.id} className="border-b border-[#111827]/5">
                                            <td className="px-3 py-3 uppercase">{section.locale}</td>
                                            <td className="px-3 py-3 capitalize">{type}</td>
                                            <td className="px-3 py-3">{section.section_key}</td>
                                            <td className="px-3 py-3 font-medium">{section.title}</td>
                                            <td className="px-3 py-3">{section.is_active ? 'Aktif' : 'Nonaktif'}</td>
                                            <td className="px-3 py-3 text-xs text-[#111827]/70">{getImpactText(type)}</td>
                                            <td className="px-3 py-3">{section.sort_order}</td>
                                            <td className="px-3 py-3 text-right">
                                                <div className="inline-flex gap-2">
                                                    <Link href={route('admin.landing.edit', section.id)} className="tarung-button-secondary px-4 py-2">
                                                        Update
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(section.id)}
                                                        disabled={processing}
                                                        className="rounded-full border border-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
