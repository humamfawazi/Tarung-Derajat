import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function ArticleDetail({ article, locale = 'id' }) {
    if (!article) return null;

    return (
        <PublicLayout>
            <Head title={article.title} />

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <Link href={route('public.informasi')} className="inline-flex items-center text-sm font-medium text-[#1d4ed8] hover:underline mb-8">
                    ← Kembali ke Informasi
                </Link>

                <article className="rounded-[28px] bg-white p-8 sm:p-12 shadow-sm border border-[#1d4ed8]/5">
                    {article.image_path && (
                        <div className="mb-8 overflow-hidden rounded-[20px]">
                            <img
                                src={article.image_path.startsWith('http') ? article.image_path : `/storage/${article.image_path}`}
                                alt={article.title}
                                className="w-full object-cover max-h-[500px]"
                            />
                        </div>
                    )}
                    
                    <div className="mb-8 flex items-center justify-between border-b border-[#111827]/5 pb-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">{article.title}</h1>
                            <div className="mt-4 flex items-center gap-4 text-sm text-[#111827]/60">
                                <span className="font-semibold">{article.author?.name || 'Admin'}</span>
                                <span>•</span>
                                <span>{new Date(article.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-[#111827]/80 prose-headings:text-[#111827] prose-a:text-[#1d4ed8]">
                        {article.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
                        ))}
                    </div>
                </article>
            </div>
        </PublicLayout>
    );
}