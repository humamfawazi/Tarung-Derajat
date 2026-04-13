import { Link } from '@inertiajs/react';

export default function VideoCard({ video }) {
    return (
        <article className="tarung-shell overflow-hidden rounded-[28px]">
            <Link href={route('videos.show', video.id)} className="block">
                <div className="aspect-video bg-[#0f172a]">
                    {video.thumbnail_url ? (
                        <img
                            src={video.thumbnail_url}
                            alt={video.title}
                            className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm font-medium text-white/70">
                            Video preview unavailable
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#111827]/55">
                        {video.uploader?.name ?? 'Coach'}
                    </div>
                    <h2 className="mt-2 text-lg font-bold text-[#111827]">
                        {video.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-[#111827]/70">
                        {video.description || 'Tanpa deskripsi.'}
                    </p>
                </div>
            </Link>
        </article>
    );
}