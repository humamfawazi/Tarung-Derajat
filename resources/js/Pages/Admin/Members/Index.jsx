import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function MembersIndex({ members = [] }) {
    const { flash } = usePage().props;
    const [filterType, setFilterType] = useState('all');

    const filteredMembers =
        filterType === 'all'
            ? members
            : members.filter((m) => m.member_type === filterType);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Kelola Pengurus & Atlet</h2>
                    </div>
                    <Link href={route('admin.members.create')} className="tarung-button-primary w-fit">
                        + Tambah Anggota
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Pengurus & Atlet" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-6 flex gap-3">
                    <button
                        onClick={() => setFilterType('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            filterType === 'all'
                                ? 'bg-[#1d4ed8] text-white'
                                : 'tarung-shell text-gray-700 hover:bg-opacity-80'
                        }`}
                    >
                        Semua ({members.length})
                    </button>
                    <button
                        onClick={() => setFilterType('board')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            filterType === 'board'
                                ? 'bg-[#1d4ed8] text-white'
                                : 'tarung-shell text-gray-700 hover:bg-opacity-80'
                        }`}
                    >
                        Pengurus ({members.filter((m) => m.member_type === 'board').length})
                    </button>
                    <button
                        onClick={() => setFilterType('athlete')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            filterType === 'athlete'
                                ? 'bg-[#1d4ed8] text-white'
                                : 'tarung-shell text-gray-700 hover:bg-opacity-80'
                        }`}
                    >
                        Atlet ({members.filter((m) => m.member_type === 'athlete').length})
                    </button>
                </div>

                <div className="tarung-shell overflow-x-auto rounded-[28px] p-4 sm:p-6">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#111827]/10">
                                <th className="px-3 py-3 font-semibold">Nama</th>
                                <th className="px-3 py-3 font-semibold">Tipe</th>
                                <th className="px-3 py-3 font-semibold">Posisi / Spesialisasi</th>
                                <th className="px-3 py-3 font-semibold">Status</th>
                                <th className="px-3 py-3 font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.length > 0 ? (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className="border-b border-[#111827]/5 hover:bg-[#111827]/2">
                                        <td className="px-3 py-4 text-sm text-[#111827]">
                                            {member.name}
                                        </td>
                                        <td className="px-3 py-4 text-sm">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                member.member_type === 'board'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {member.member_type === 'board' ? 'Pengurus' : 'Atlet'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 text-sm text-[#111827]/70">
                                            {member.position || member.specialty || '-'}
                                        </td>
                                        <td className="px-3 py-4 text-sm">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                member.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {member.is_active ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 text-sm space-x-2">
                                            <Link
                                                href={route('admin.members.edit', member.id)}
                                                className="inline-block rounded bg-yellow-600 px-3 py-1 text-white hover:bg-yellow-700"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('admin.members.destroy', member.id)}
                                                method="delete"
                                                as="button"
                                                className="inline-block rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                                onClick={(e) => {
                                                    if (!confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-3 py-4 text-center text-[#111827]/60">
                                        Tidak ada anggota untuk ditampilkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
