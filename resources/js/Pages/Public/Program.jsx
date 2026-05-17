import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const LEVEL_CONFIG = {
    pemula: {
        label: 'Pemula',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500',
        pillClass: 'bg-emerald-500 text-white',
    },
    menengah: {
        label: 'Menengah',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
        dotClass: 'bg-amber-500',
        pillClass: 'bg-amber-500 text-white',
    },
    mahir: {
        label: 'Mahir',
        badgeClass: 'bg-red-50 text-red-700 border-red-200',
        dotClass: 'bg-red-500',
        pillClass: 'bg-red-500 text-white',
    },
};

const TABS = [
    { key: 'semua', label: 'Semua' },
    { key: 'pemula', label: 'Pemula' },
    { key: 'menengah', label: 'Menengah' },
    { key: 'mahir', label: 'Mahir' },
];

export default function Program({ programs = [] }) {
    const [activeLevel, setActiveLevel] = useState('semua');
    const [selectedProgram, setSelectedProgram] = useState(null);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `/storage/${imagePath}`;
    };

    const filtered = activeLevel === 'semua'
        ? programs
        : programs.filter((p) => p.level === activeLevel);

    return (
        <PublicLayout>
            <Head title="Program Latihan" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                {/* Page Header — sama persis dengan Informasi & Galeri */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">Program Latihan</h1>
                    <p className="text-lg text-[#111827]/70 max-w-2xl mx-auto">
                        Kurikulum latihan Tarung Derajat yang terstruktur, dari tingkat pemula hingga mahir.
                    </p>
                </div>

                {/* Level Filter Tabs */}
                <div className="mb-10 flex flex-wrap gap-2 justify-center">
                    {TABS.map((tab) => {
                        const isActive = activeLevel === tab.key;
                        const cfg = LEVEL_CONFIG[tab.key];
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveLevel(tab.key)}
                                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition ${
                                    isActive
                                        ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white shadow-sm'
                                        : 'border-[#1d4ed8]/20 bg-white text-[#111827]/70 hover:border-[#1d4ed8]/50 hover:text-[#1d4ed8]'
                                }`}
                            >
                                {cfg && (
                                    <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white/70' : cfg.dotClass}`} />
                                )}
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Program Grid */}
                {filtered.length === 0 ? (
                    <div className="col-span-full text-center py-12 rounded-2xl border border-dashed border-[#1d4ed8]/20 bg-[#f5f7ff]/50">
                        <p className="text-[#111827]/70 text-sm italic">
                            {activeLevel === 'semua'
                                ? 'Belum ada program latihan yang tersedia.'
                                : `Belum ada program untuk level ${activeLevel}.`}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((program) => {
                            const cfg = LEVEL_CONFIG[program.level] ?? LEVEL_CONFIG.pemula;
                            const imageUrl = getImageUrl(program.image_path);

                            return (
                                <div
                                    key={program.id}
                                    className="group flex flex-col rounded-2xl border border-[#1d4ed8]/10 bg-white shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedProgram(program)}
                                >
                                    {/* Image area */}
                                    {imageUrl ? (
                                        <div className="relative h-52 overflow-hidden">
                                            <img
                                                src={imageUrl}
                                                alt={program.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/50 to-transparent" />
                                            {/* Level badge on image */}
                                            <span className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-bold ${cfg.pillClass}`}>
                                                {cfg.label}
                                            </span>
                                            {program.duration && (
                                                <span className="absolute bottom-4 right-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-xs font-semibold text-white">
                                                    ⏱ {program.duration}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="h-52 bg-[#f5f7ff] flex items-center justify-center">
                                            <span className="text-[#1d4ed8]/20 text-5xl font-black select-none">TD</span>
                                        </div>
                                    )}

                                    {/* Card body */}
                                    <div className="flex flex-col flex-1 p-6">
                                        {/* Level & duration row when no image */}
                                        {!imageUrl && (
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.badgeClass}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClass}`} />
                                                    {cfg.label}
                                                </span>
                                                {program.duration && (
                                                    <span className="text-xs text-[#111827]/50">⏱ {program.duration}</span>
                                                )}
                                            </div>
                                        )}

                                        <h3 className="text-xl font-bold text-[#111827] mb-2 line-clamp-2">
                                            {program.title}
                                        </h3>

                                        {program.description && (
                                            <p className="text-[#111827]/70 line-clamp-3 mb-6 flex-1 text-sm">
                                                {program.description}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#111827]/5">
                                            {imageUrl && (
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.badgeClass}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClass}`} />
                                                    {cfg.label}
                                                </span>
                                            )}
                                            <span className="text-sm font-bold text-[#1d4ed8] hover:underline ml-auto">
                                                Lihat Detail →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Detail Modal — mengikuti style KompetisiEvent */}
            {selectedProgram && (() => {
                const cfg = LEVEL_CONFIG[selectedProgram.level] ?? LEVEL_CONFIG.pemula;
                const imageUrl = getImageUrl(selectedProgram.image_path);
                return (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/50 px-4"
                        onClick={() => setSelectedProgram(null)}
                    >
                        <div
                            className="w-full max-w-2xl rounded-2xl bg-white shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal header bar */}
                            <div className="flex items-start justify-between gap-4 p-6 border-b border-[#111827]/8 shrink-0">
                                <div>
                                    <h3 className="text-xl font-bold text-[#111827]">
                                        {selectedProgram.title}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.badgeClass}`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClass}`} />
                                            {cfg.label}
                                        </span>
                                        {selectedProgram.duration && (
                                            <span className="text-xs text-[#111827]/60 font-medium">
                                                ⏱ {selectedProgram.duration}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedProgram(null)}
                                    className="shrink-0 rounded-full border border-[#1d4ed8]/20 px-3 py-2 text-sm font-semibold text-[#1d4ed8] transition hover:bg-[#1d4ed8] hover:text-white"
                                >
                                    Tutup
                                </button>
                            </div>

                            {/* Scrollable body */}
                            <div className="overflow-y-auto flex-1">
                                {/* Image */}
                                {imageUrl && (
                                    <div className="h-56 overflow-hidden shrink-0">
                                        <img
                                            src={imageUrl}
                                            alt={selectedProgram.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-6 space-y-4">
                                    {/* Description */}
                                    {selectedProgram.description && (
                                        <div className="rounded-xl border border-[#1d4ed8]/10 bg-[#f8fafc] p-4">
                                            <p className="text-sm font-semibold text-[#111827]/60 uppercase tracking-wider mb-1">Deskripsi</p>
                                            <p className="text-[#111827]/80 text-sm leading-relaxed">
                                                {selectedProgram.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Content */}
                                    {selectedProgram.content ? (
                                        <div className="rounded-xl border border-[#1d4ed8]/10 bg-[#f8fafc] p-4">
                                            <p className="text-sm font-semibold text-[#111827]/60 uppercase tracking-wider mb-3">Detail Program</p>
                                            <div className="prose prose-sm max-w-none text-[#111827]/70 leading-relaxed whitespace-pre-wrap">
                                                {selectedProgram.content}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-[#111827]/40 text-sm italic">Konten detail belum tersedia.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </PublicLayout>
    );
}
