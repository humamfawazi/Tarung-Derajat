import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';

export default function ArticlesIndex({ articles }) {
    const auth = usePage().props.auth;
    const isAuthenticated = Boolean(auth?.user);

    const pageContent = (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div>
                <div className="tarung-section-label">Knowledge Center</div>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#050B0A]">Artikel Tarung Derajat</h1>
                <p className="mt-3 max-w-3xl text-sm text-[#050B0A]/70">
                    Kumpulan artikel teknik, filosofi latihan, dan informasi pembinaan untuk anggota.
                </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
                {articles.length === 0 ? (
                    <div className="tarung-shell col-span-full rounded-[28px] p-6 text-sm text-[#050B0A]/70">
                        Belum ada artikel tersedia.
                    </div>
                ) : (
                    articles.map((article) => (
                        <article key={article.id} className="tarung-shell rounded-[28px] p-6">
                            <div className="text-xs uppercase tracking-[0.2em] text-[#050B0A]/55">
                                {article.author?.name ?? 'Admin'}
                            </div>
                            <h2 className="mt-3 text-xl font-bold text-[#050B0A]">{article.title}</h2>
                            <p className="mt-3 line-clamp-4 text-sm leading-7 text-[#050B0A]/75">
                                {article.content}
                            </p>
                            <div className="mt-4 text-xs text-[#050B0A]/55">
                                {new Date(article.created_at).toLocaleDateString()}
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );

    return isAuthenticated ? (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Member Area</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">Artikel</h2>
                </div>
            }
        >
            <Head title="Artikel" />
            {pageContent}
        </AuthenticatedLayout>
    ) : (
        <PublicLayout>
            <Head title="Artikel" />
            {pageContent}
        </PublicLayout>
    );
}
