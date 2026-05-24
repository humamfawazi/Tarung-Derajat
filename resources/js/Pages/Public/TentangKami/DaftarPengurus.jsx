import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const copy = {
    id: {
        title: 'Daftar Pengurus & Atlet',
        heading: 'Struktur Organisasi',
        description: 'Kenal lebih dekat dengan pengurus dan atlet yang terdaftar di Tarung Derajat.',
        filterAll: 'Semua',
        filterBoard: 'Pengurus',
        filterAthlete: 'Atlet',
        noResults: 'Tidak ada anggota untuk ditampilkan.',
    },
    en: {
        title: 'Board Members & Athletes',
        heading: 'Organization Structure',
        description: 'Meet the board members and registered athletes of Tarung Derajat.',
        filterAll: 'All',
        filterBoard: 'Board',
        filterAthlete: 'Athletes',
        noResults: 'No members to display.',
    },
};

export default function DaftarPengurus({ members = [], locale = 'id' }) {
    const t = copy[locale] || copy.id;
    const [filter, setFilter] = useState('all');

    const uniqueTypes = [...new Set(members.map(m => m.member_type))].filter(Boolean);

    const filteredMembers =
        filter === 'all'
            ? members
            : members.filter((m) => m.member_type === filter);

    return (
        <PublicLayout>
            <Head title={t.title} />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-[#111827]">{t.heading}</h1>
                    <p className="text-lg text-[#111827]/70">{t.description}</p>
                </div>

                <div className="mb-8 flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-full font-medium transition ${
                            filter === 'all'
                                ? 'bg-[#1d4ed8] text-white'
                                : 'border border-[#1d4ed8] text-[#1d4ed8] hover:bg-[#eff6ff]'
                        }`}
                    >
                        {t.filterAll}
                    </button>
                    {uniqueTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-6 py-2 rounded-full font-medium transition ${
                                filter === type
                                    ? 'bg-[#1d4ed8] text-white'
                                    : 'border border-[#1d4ed8] text-[#1d4ed8] hover:bg-[#eff6ff]'
                            }`}
                        >
                            {type === 'board' ? t.filterBoard : (type === 'athlete' ? t.filterAthlete : type)}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#1d4ed8]/10 bg-white shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#f5f7ff] text-[#111827]">
                            <tr>
                                <th className="px-6 py-4 font-bold uppercase tracking-wider">Foto</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-wider">Posisi / Spesialisasi</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-wider">Tipe</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1d4ed8]/5">
                            {filteredMembers.length > 0 ? (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-[#eff6ff]/30 transition">
                                        <td className="px-6 py-4">
                                            {member.photo_path ? (
                                                <img
                                                    src={member.photo_path.startsWith('http') ? member.photo_path : `/storage/${member.photo_path}`}
                                                    alt={member.name}
                                                    className="h-12 w-12 rounded-full object-cover border border-[#1d4ed8]/20"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-[#f5f7ff] flex items-center justify-center border border-[#1d4ed8]/10 group">
                                                    <span className="text-[#1d4ed8]/30 font-bold text-xs">TD</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-[#111827]">
                                            {member.name}
                                        </td>
                                        <td className="px-6 py-4 text-[#111827]/70 font-medium">
                                            {member.position || member.specialty || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                member.member_type?.toLowerCase() === 'pengurus' || member.member_type === 'board' 
                                                ? 'bg-blue-100 text-blue-700' 
                                                : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                                {member.member_type === 'board' ? t.filterBoard : (member.member_type === 'athlete' ? t.filterAthlete : member.member_type)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-[#111827]/50 italic">
                                        {t.noResults}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </PublicLayout>
    );
}
