import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function AdminVideosIndex({ videos }) {
    const { flash } = usePage().props;
    const { delete: destroy, processing } = useForm({});

    const handleDelete = (videoId) => {
        if (!confirm('Hapus video ini?')) {
            return;
        }

        destroy(route('admin.videos.destroy', videoId));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">Manajemen Video</h2>
                    </div>
                    <Link href={route('videos.upload')} className="tarung-button-primary w-fit">
                        Upload Video
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Video" />

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
                                <th className="px-3 py-3 font-semibold">Judul</th>
                                <th className="px-3 py-3 font-semibold">Uploader</th>
                                <th className="px-3 py-3 font-semibold">Visibility</th>
                                <th className="px-3 py-3 font-semibold">Status</th>
                                <th className="px-3 py-3 font-semibold">Published</th>
                                <th className="px-3 py-3 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-3 py-6 text-center text-[#050B0A]/60">
                                        Belum ada video.
                                    </td>
                                </tr>
                            ) : (
                                videos.map((video) => (
                                    <tr key={video.id} className="border-b border-[#050B0A]/5">
                                        <td className="px-3 py-3 font-medium">{video.title}</td>
                                        <td className="px-3 py-3">{video.uploader?.name ?? '-'}</td>
                                        <td className="px-3 py-3 capitalize">{video.visibility}</td>
                                        <td className="px-3 py-3 capitalize">{video.status}</td>
                                        <td className="px-3 py-3">
                                            {video.published_at ? new Date(video.published_at).toLocaleString() : '-'}
                                        </td>
                                        <td className="px-3 py-3 text-right">
                                            <div className="inline-flex gap-2">
                                                <Link href={route('admin.videos.edit', video.id)} className="tarung-button-secondary px-4 py-2">
                                                    Update
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(video.id)}
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
