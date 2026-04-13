import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function AdminArticlesIndex({ articles }) {
    const { flash } = usePage().props;
    const { delete: destroy, processing } = useForm({});

    const handleDelete = (articleId) => {
        if (!confirm('Hapus artikel ini?')) {
            return;
        }

        destroy(route('admin.articles.destroy', articleId));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Manajemen Artikel</h2>
                    </div>
                    <Link href={route('admin.articles.create')} className="tarung-button-primary w-fit">
                        Tambah Artikel
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Artikel" />

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
                            <tr className="border-b border-[#111827]/10">
                                <th className="px-3 py-3 font-semibold">Judul</th>
                                <th className="px-3 py-3 font-semibold">Author</th>
                                <th className="px-3 py-3 font-semibold">Featured</th>
                                <th className="px-3 py-3 font-semibold">Tanggal</th>
                                <th className="px-3 py-3 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-3 py-6 text-center text-[#111827]/60">
                                        Belum ada artikel.
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article) => (
                                    <tr key={article.id} className="border-b border-[#111827]/5">
                                        <td className="px-3 py-3 font-medium">{article.title}</td>
                                        <td className="px-3 py-3">{article.author?.name ?? '-'}</td>
                                        <td className="px-3 py-3">{article.is_featured ? 'Ya' : 'Tidak'}</td>
                                        <td className="px-3 py-3">{new Date(article.created_at).toLocaleDateString()}</td>
                                        <td className="px-3 py-3 text-right">
                                            <div className="inline-flex gap-2">
                                                <Link href={route('admin.articles.edit', article.id)} className="tarung-button-secondary px-4 py-2">
                                                    Update
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(article.id)}
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
