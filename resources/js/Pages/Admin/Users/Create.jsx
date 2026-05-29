import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminUsersCreate({ roleOptions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role_name: 'admin',
        is_verified: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Tambah Admin</h2>
                </div>
            }
        >
            <Head title="Tambah Admin" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8">
                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Nama</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            required
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            required
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            required
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Role</label>
                        <select
                            value={data.role_name}
                            onChange={(e) => setData('role_name', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm capitalize focus:border-[#1d4ed8] focus:outline-none"
                        >
                            {roleOptions.map((role) => (
                                <option key={role} value={role} className="capitalize">
                                    {role}
                                </option>
                            ))}
                        </select>
                        {errors.role_name && <p className="mt-2 text-sm text-red-600">{errors.role_name}</p>}
                    </div>

                    <label className="inline-flex items-center gap-2 text-sm text-[#111827]">
                        <input
                            type="checkbox"
                            checked={data.is_verified}
                            onChange={(e) => setData('is_verified', e.target.checked)}
                        />
                        User terverifikasi
                    </label>

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                            {processing ? 'Saving...' : 'Simpan Admin'}
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
