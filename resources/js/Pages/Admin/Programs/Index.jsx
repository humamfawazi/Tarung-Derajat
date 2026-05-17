import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

const LEVEL_CONFIG = {
    pemula:   { label: 'Pemula',   color: 'bg-emerald-100 text-emerald-700' },
    menengah: { label: 'Menengah', color: 'bg-amber-100 text-amber-700' },
    mahir:    { label: 'Mahir',    color: 'bg-red-100 text-red-700' },
};

export default function ProgramsIndex({ programs = [] }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Kelola Program Latihan</h2>
                        <p className="mt-1 text-sm text-[#111827]/60">{programs.length} program terdaftar</p>
                    </div>
                    <Link href={route('admin.programs.create')} className="tarung-button-primary w-fit">
                        + Tambah Program
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Program Latihan" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm text-emerald-700">
                        ✓ {flash.success}
                    </div>
                )}
                {programs.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-[#1d4ed8]/20 p-16 text-center">
                        <div className="text-5xl mb-4">🥋</div>
                        <p className="text-[#111827]/60 mb-4">Belum ada program latihan.</p>
                        <Link href={route('admin.programs.create')} className="tarung-button-primary">
                            + Tambah Program Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {programs.map((program) => {
                            const cfg = LEVEL_CONFIG[program.level] ?? LEVEL_CONFIG.pemula;
                            return (
                                <div key={program.id} className="tarung-shell flex flex-col rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f7ff]">
                                        {program.image_path ? (
                                            <img src={`/storage/${program.image_path}`} alt={program.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-[#1d4ed8]/15 text-6xl font-black">TD</span>
                                            </div>
                                        )}
                                        {!program.is_active && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <span className="rounded-full bg-black/70 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest">Nonaktif</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 p-5">
                                        <h3 className="font-bold text-[#111827] line-clamp-2 mb-2">{program.title}</h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                                            {program.duration && <span className="text-xs text-[#111827]/50">⏱ {program.duration}</span>}
                                        </div>
                                        {program.description && (
                                            <p className="text-[#111827]/60 text-sm mb-4 line-clamp-2 flex-1">{program.description}</p>
                                        )}
                                        <div className="flex gap-2 mt-auto pt-4 border-t border-[#111827]/5">
                                            <Link href={route('admin.programs.edit', program.id)} className="tarung-button-secondary flex-1 text-center text-sm py-2">Edit</Link>
                                            <Link
                                                href={route('admin.programs.destroy', program.id)}
                                                method="delete" as="button"
                                                className="tarung-button-secondary px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                onClick={(e) => { if (!window.confirm('Yakin ingin menghapus program ini?')) e.preventDefault(); }}
                                            >Hapus</Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
