import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

const copy = {
    id: {
        title: 'Sejarah',
        heading: 'Sejarah Tarung Derajat',
        description: 'Pelajari perjalanan dan perkembangan Tarung Derajat dari masa ke masa.',
    },
    en: {
        title: 'History',
        heading: 'History of Tarung Derajat',
        description: 'Learn about the journey and development of Tarung Derajat over time.',
    },
};

export default function Sejarah({ historySections, locale = 'id' }) {
    const t = copy[locale] || copy.id;

    return (
        <PublicLayout>
            <Head title={t.title} />

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">{t.heading}</h1>
                    <p className="text-lg text-[#111827]/70">{t.description}</p>
                </div>

                <div className="space-y-12">
                    {historySections && historySections.length > 0 ? (
                        historySections.map((section, index) => (
                            <div key={section.id} className="border-l-4 border-[#1d4ed8] pl-8">
                                <div className="absolute w-4 h-4 bg-[#1d4ed8] rounded-full -ml-[26px] mt-1"></div>
                                <h3 className="text-2xl font-semibold text-[#111827] mb-3">
                                    {section.title}
                                </h3>
                                {section.image_path && (
                                    <img
                                        src={section.image_path.startsWith('http') ? section.image_path : `/storage/${section.image_path}`}
                                        alt={section.title}
                                        className="mb-4 h-64 w-full object-cover rounded shadow-sm border border-[#111827]/5"
                                    />
                                )}
                                <p className="text-[#111827]/70 leading-relaxed text-lg">
                                    {section.content}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[#111827]/70">Tidak ada konten sejarah tersedia saat ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
