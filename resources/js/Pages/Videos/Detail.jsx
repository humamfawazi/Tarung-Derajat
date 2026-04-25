import PublicLayout from '@/Layouts/PublicLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import YouTubeEmbed from '@/Components/YouTubeEmbed';
import { Head, Link, usePage } from '@inertiajs/react';

export default function VideosDetail({ video }) {
    const auth = usePage().props.auth;
    const isAuthenticated = Boolean(auth?.user);

    const pageContent = (
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link href={`${route('home')}#information`} className="text-sm font-semibold text-[#111827]/70 hover:text-[#1d4ed8]">
                    ← Back to information section
                </Link>
            </div>

            <div className="tarung-shell rounded-[32px] p-4 sm:p-6">
                <YouTubeEmbed url={video.youtube_url} title={video.title} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="tarung-shell rounded-[32px] p-6 sm:p-8">
                    <div className="tarung-section-label">Technique Video</div>
                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                        {video.title}
                    </h1>
                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#111827]/75">
                        {video.description || 'Tidak ada deskripsi.'}
                    </p>
                </div>

                <aside className="tarung-shell rounded-[32px] p-6 sm:p-8">
                    <div className="tarung-section-label">Video Info</div>
                    <dl className="mt-4 space-y-4 text-sm text-[#111827]/75">
                        <div>
                            <dt className="font-semibold text-[#111827]">Uploader</dt>
                            <dd>{video.uploader?.name ?? 'Coach'}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-[#111827]">Visibility</dt>
                            <dd className="capitalize">{video.visibility}</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-[#111827]">Published</dt>
                            <dd>{video.published_at ? new Date(video.published_at).toLocaleString() : 'Unknown'}</dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </section>
    );

    return (
        isAuthenticated ? (
            <AuthenticatedLayout
                header={
                    <div>
                        <div className="tarung-section-label">Education</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Video Detail</h2>
                    </div>
                }
            >
                <Head title={video.title} />
                {pageContent}
            </AuthenticatedLayout>
        ) : (
            <PublicLayout>
                <Head title={video.title} />
                {pageContent}
            </PublicLayout>
        )
    );
}