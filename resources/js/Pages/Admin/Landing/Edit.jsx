import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminLandingEdit({ section }) {
    const { data, setData, patch, processing, errors } = useForm({
        locale: section.locale ?? 'id',
        section_key: section.section_key ?? '',
        title: section.title ?? '',
        content: section.content ?? '',
        is_active: section.is_active ?? true,
        sort_order: section.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.landing.update', section.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">Update Landing Section</h2>
                </div>
            }
        >
            <Head title="Update Landing Section" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-semibold text-[#050B0A]">Locale</label>
                            <select
                                value={data.locale}
                                onChange={(e) => setData('locale', e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            >
                                <option value="id">ID</option>
                                <option value="en">EN</option>
                            </select>
                            {errors.locale && <p className="mt-2 text-sm text-red-600">{errors.locale}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-[#050B0A]">Sort Order</label>
                            <input
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', Number(e.target.value))}
                                className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            />
                            {errors.sort_order && <p className="mt-2 text-sm text-red-600">{errors.sort_order}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Section Key</label>
                        <input
                            type="text"
                            value={data.section_key}
                            onChange={(e) => setData('section_key', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            required
                        />
                        {errors.section_key && <p className="mt-2 text-sm text-red-600">{errors.section_key}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            required
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Content</label>
                        <textarea
                            rows={8}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            required
                        />
                        {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    <label className="inline-flex items-center gap-2 text-sm text-[#050B0A]">
                        <input
                            type="checkbox"
                            checked={Boolean(data.is_active)}
                            onChange={(e) => setData('is_active', e.target.checked)}
                        />
                        Aktifkan section
                    </label>

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                            {processing ? 'Saving...' : 'Simpan Perubahan'}
                        </button>
                        <Link href={route('admin.landing.index')} className="tarung-button-secondary">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
