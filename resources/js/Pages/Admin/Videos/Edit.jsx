import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminVideosEdit({ video }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: video.title ?? '',
        description: video.description ?? '',
        visibility: video.visibility ?? 'unlisted',
        status: video.status ?? 'published',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.videos.update', video.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Update Video</h2>
                </div>
            }
        >
            <Head title="Update Video" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8">
                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Judul Video</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            required
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Deskripsi</label>
                        <textarea
                            rows={5}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                        />
                        {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-semibold text-[#111827]">Visibility</label>
                            <select
                                value={data.visibility}
                                onChange={(e) => setData('visibility', e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            >
                                <option value="unlisted">Unlisted</option>
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                            {errors.visibility && <p className="mt-2 text-sm text-red-600">{errors.visibility}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[#111827]">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                            {errors.status && <p className="mt-2 text-sm text-red-600">{errors.status}</p>}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                            {processing ? 'Saving...' : 'Simpan Perubahan'}
                        </button>
                        <Link href={route('admin.videos.index')} className="tarung-button-secondary">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
