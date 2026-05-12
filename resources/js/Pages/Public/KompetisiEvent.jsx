import PublicLayout from '@/Layouts/PublicLayout';
import YouTubeEmbed from '@/Components/YouTubeEmbed';
import { Head } from '@inertiajs/react';

const copy = {
    id: {
        title: 'Kompetisi & Event',
        heading: 'Kompetisi & Event',
        description: 'Ikuti keseruan pertandingan dan event terbaru Tarung Derajat di sini.',
        videosLabel: 'Dokumentasi Video',
    },
    en: {
        title: 'Competition & Events',
        heading: 'Competition & Events',
        description: 'Follow the excitement of matches and latest Tarung Derajat events here.',
        videosLabel: 'Video Documentation',
    },
};

export default function KompetisiEvent({ educationSections, locale = 'id' }) {
    const t = copy[locale] || copy.id;

    return (
        <PublicLayout>
            <Head title={t.title} />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">{t.heading}</h1>
                    <p className="text-lg text-[#111827]/70">{t.description}</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {educationSections && educationSections.length > 0 ? (
                        educationSections.map((section) => (
                            <div key={section.id} className="group rounded-2xl overflow-hidden border border-[#1d4ed8]/10 bg-white shadow-sm hover:shadow-md transition">
                                {section.image_path && (
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={section.image_path.startsWith('http') ? section.image_path : `/storage/${section.image_path}`}
                                            alt={section.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent" />
                                        <h3 className="absolute bottom-6 left-6 right-6 text-2xl font-bold text-white">
                                            {section.title}
                                        </h3>
                                    </div>
                                )}
                                <div className="p-8">
                                    {!section.image_path && (
                                        <h3 className="text-2xl font-bold text-[#111827] mb-4">
                                            {section.title}
                                        </h3>
                                    )}
                                    <div className="prose prose-sm max-w-none text-[#111827]/70 leading-relaxed">
                                        {section.content}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 rounded-2xl border border-dashed border-[#1d4ed8]/20 bg-[#f5f7ff]/50">
                            <p className="text-[#111827]/70 text-sm italic">Belum ada informasi kompetisi atau event yang tersedia.</p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
