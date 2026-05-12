import PublicLayout from '@/Layouts/PublicLayout';
import YouTubeEmbed from '@/Components/YouTubeEmbed';
import { Head } from '@inertiajs/react';

const copy = {
    id: {
        title: 'Edukasi',
        heading: 'Konten Edukasi',
        description: 'Pelajari teknik, strategi, dan pengetahuan tentang Tarung Derajat melalui video edukatif kami.',
    },
    en: {
        title: 'Education',
        heading: 'Educational Content',
        description: 'Learn techniques, strategies, and knowledge about Tarung Derajat through our educational videos.',
    },
};

export default function Edukasi({ videos, educationSections, locale = 'id' }) {
    const t = copy[locale] || copy.id;

    return (
        <PublicLayout>
            <Head title={t.title} />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">{t.heading}</h1>
                    <p className="text-lg text-[#111827]/70">{t.description}</p>
                </div>

                {educationSections && educationSections.length > 0 && (
                    <div className="mb-16">
                        <div className="grid gap-8 md:grid-cols-2">
                            {educationSections.map((section) => (
                                <div key={section.id} className="rounded-lg overflow-hidden border border-[#1d4ed8]/10 shadow-sm">
                                    {section.image_path && (
                                        <img
                                            src={section.image_path}
                                            alt={section.title}
                                            className="h-64 w-full object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-semibold text-[#111827] mb-2">
                                            {section.title}
                                        </h3>
                                        <p className="text-[#111827]/70">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-2xl font-bold text-[#111827] mb-8">Video Tutorial</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {videos && videos.length > 0 ? (
                            videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="rounded-lg border border-[#1d4ed8]/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                    <div className="aspect-video bg-gray-900">
                                        {video.youtube_url && (
                                            <YouTubeEmbed url={video.youtube_url} />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-[#111827] line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-[#111827]/70 line-clamp-2 mt-1">
                                            {video.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-[#111827]/70">Belum ada video edukatif tersedia.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
