import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function AdminLandingIndex({ sections, databaseReady }) {
    const { flash } = usePage().props;
    const { delete: destroy, processing } = useForm({});

    const handleDelete = (id) => {
        if (!confirm('Hapus konten landing ini?')) {
            return;
        }

        destroy(route('admin.landing.destroy', id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">Manajemen Landing Page</h2>
                    </div>
                    <Link href={route('admin.landing.create')} className="tarung-button-primary w-fit">
                        Tambah Section
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Landing Page" />

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

                <div className="tarung-shell overflow-x-auto rounded-[28px] p-4 sm:p-6">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#050B0A]/10">
                                <th className="px-3 py-3 font-semibold">Locale</th>
                                <th className="px-3 py-3 font-semibold">Key</th>
                                <th className="px-3 py-3 font-semibold">Title</th>
                                <th className="px-3 py-3 font-semibold">Status</th>
                                <th className="px-3 py-3 font-semibold">Sort</th>
                                <th className="px-3 py-3 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-3 py-6 text-center text-[#050B0A]/60">
                                        Belum ada data landing.
                                    </td>
                                </tr>
                            ) : (
                                sections.map((section) => (
                                    <tr key={section.id} className="border-b border-[#050B0A]/5">
                                        <td className="px-3 py-3 uppercase">{section.locale}</td>
                                        <td className="px-3 py-3">{section.section_key}</td>
                                        <td className="px-3 py-3 font-medium">{section.title}</td>
                                        <td className="px-3 py-3">{section.is_active ? 'Aktif' : 'Nonaktif'}</td>
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
