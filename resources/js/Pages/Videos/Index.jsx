import PublicLayout from '@/Layouts/PublicLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VideoCard from '@/Components/VideoCard';
import { Head, Link, usePage } from '@inertiajs/react';

export default function VideosIndex({ videos }) {
    const auth = usePage().props.auth;
    const user = auth?.user;
    const permissions = auth?.user?.role?.permissions ?? [];
    const canUpload = permissions.includes('videos.create');
    const isAuthenticated = Boolean(user);

    const pageContent = (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="tarung-section-label">Kompetisi & Event</div>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827]">
                        Video Library
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-[#111827]/70">
                        Materi teknik dari pelatih akan otomatis dipublikasikan ke YouTube lalu ditampilkan di sini.
                    </p>
                </div>

                {canUpload && (
                    <Link href={route('videos.upload')} className="tarung-button-primary w-fit">
                        Upload Video
                    </Link>
                )}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {videos.length === 0 ? (
                    <div className="tarung-shell col-span-full rounded-[28px] p-6 text-sm text-[#111827]/70">
                        Belum ada video yang dipublikasikan.
                    </div>
                ) : (
                    videos.map((video) => <VideoCard key={video.id} video={video} />)
                )}
            </div>
        </section>
    );

    return (
        isAuthenticated ? (
            <AuthenticatedLayout
                header={
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="tarung-section-label">Kompetisi & Event</div>
                            <h2 className="mt-2 text-2xl font-bold text-[#111827]">Video Library</h2>
                        </div>
                        {canUpload && (
                            <Link href={route('videos.upload')} className="tarung-button-primary w-fit">
                                Upload Video
                            </Link>
                        )}
                    </div>
                }
            >
                <Head title="Videos" />
                {pageContent}
            </AuthenticatedLayout>
        ) : (
            <PublicLayout>
                <Head title="Videos" />
                {pageContent}
            </PublicLayout>
        )
    );
}
