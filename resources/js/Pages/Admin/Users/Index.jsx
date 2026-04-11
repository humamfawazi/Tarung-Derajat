import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function AdminUsersIndex({ users }) {
    const { flash, auth } = usePage().props;
    const { delete: destroy, processing } = useForm({});

    const handleDelete = (userId) => {
        if (!confirm('Hapus user ini?')) {
            return;
        }

        destroy(route('admin.users.destroy', userId));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">Manajemen User</h2>
                    </div>
                    <Link href={route('admin.users.create')} className="tarung-button-primary w-fit">
                        Tambah User
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen User" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {flash.error}
                    </div>
                )}

                <div className="tarung-shell overflow-x-auto rounded-[28px] p-4 sm:p-6">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#050B0A]/10">
                                <th className="px-3 py-3 font-semibold">Nama</th>
                                <th className="px-3 py-3 font-semibold">Email</th>
                                <th className="px-3 py-3 font-semibold">Role</th>
                                <th className="px-3 py-3 font-semibold">Verifikasi</th>
                                <th className="px-3 py-3 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-3 py-6 text-center text-[#050B0A]/60">
                                        Belum ada user.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="border-b border-[#050B0A]/5">
                                        <td className="px-3 py-3 font-medium">{user.name}</td>
                                        <td className="px-3 py-3">{user.email}</td>
                                        <td className="px-3 py-3 capitalize">{user.role_name}</td>
                                        <td className="px-3 py-3">{user.email_verified_at ? 'Verified' : 'Not verified'}</td>
                                        <td className="px-3 py-3 text-right">
                                            <div className="inline-flex gap-2">
                                                <Link href={route('admin.users.edit', user.id)} className="tarung-button-secondary px-4 py-2">
                                                    Update
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(user.id)}
                                                    disabled={processing || auth?.user?.id === user.id}
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
