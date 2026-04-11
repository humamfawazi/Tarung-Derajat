import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminUsersEdit({ user, roleOptions }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        role_name: user.role_name ?? 'user',
        is_verified: Boolean(user.is_verified),
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">Update User</h2>
                </div>
            }
        >
            <Head title="Update User" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8">
                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Nama</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            required
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            required
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Role</label>
                        <select
                            value={data.role_name}
                            onChange={(e) => setData('role_name', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm capitalize focus:border-[#050B0A] focus:outline-none"
                        >
                            {roleOptions.map((role) => (
                                <option key={role} value={role} className="capitalize">
                                    {role}
                                </option>
                            ))}
                        </select>
                        {errors.role_name && <p className="mt-2 text-sm text-red-600">{errors.role_name}</p>}
                    </div>

                    <label className="inline-flex items-center gap-2 text-sm text-[#050B0A]">
                        <input
                            type="checkbox"
                            checked={data.is_verified}
                            onChange={(e) => setData('is_verified', e.target.checked)}
                        />
                        User terverifikasi
                    </label>

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                            {processing ? 'Saving...' : 'Simpan Perubahan'}
                        </button>
                        <Link href={route('admin.users.index')} className="tarung-button-secondary">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
