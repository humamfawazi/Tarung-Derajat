import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

const copy = {
    id: {
        title: 'Filosofi',
        heading: 'Filosofi Tarung Derajat',
        description: 'Pahami nilai-nilai dan prinsip-prinsip fundamental Tarung Derajat.',
    },
    en: {
        title: 'Philosophy',
        heading: 'Philosophy of Tarung Derajat',
        description: 'Understand the core values and principles of Tarung Derajat.',
    },
};

export default function Filosofi({ philosophySections, locale = 'id' }) {
    const t = copy[locale] || copy.id;

    return (
        <PublicLayout>
            <Head title={t.title} />

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">{t.heading}</h1>
                    <p className="text-lg text-[#111827]/70">{t.description}</p>
                </div>

                <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-2">
                    {philosophySections && philosophySections.length > 0 ? (
                        philosophySections.map((section) => (
                            <div
                                key={section.id}
                                className="rounded-lg border border-[#1d4ed8]/10 p-8 bg-gradient-to-br from-blue-50/50 to-transparent"
                            >
                                {section.image_path && (
                                    <img
                                        src={section.image_path}
                                        alt={section.title}
                                        className="mb-6 h-48 w-full object-cover rounded"
                                    />
                                )}
                                <h3 className="text-2xl font-semibold text-[#111827] mb-3">
                                    {section.title}
                                </h3>
                                <p className="text-[#111827]/70 leading-relaxed text-base">
                                    {section.content}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-[#111827]/70">Tidak ada konten filosofi tersedia saat ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
