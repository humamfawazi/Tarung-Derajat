import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import axios from 'axios';

export default function MembersIndex({ members = [] }) {
    const { flash, errors: pageErrors } = usePage().props;
    const [filterType, setFilterType] = useState('all');
    
    // Import Modal State
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [isUploading, setIsUploading] = useState(false);
    const [importError, setImportError] = useState('');
    
    // Data states
    const [selectedFile, setSelectedFile] = useState(null);
    const [importData, setImportData] = useState({ filename: '', headers: [], preview_data: [] });
    const [mapping, setMapping] = useState({
        name: '',
        member_type: '',
        position: '',
        is_active: ''
    });
    const [importResult, setImportResult] = useState('');

    const fileInputRef = useRef(null);

    // Filter logic
    const uniqueTypes = [...new Set(members.map(m => m.member_type))].filter(Boolean);
    const filteredMembers = filterType === 'all' ? members : members.filter((m) => m.member_type === filterType);

    // --- IMPORT LOGIC ---
    const resetImportModal = () => {
        setStep(1);
        setSelectedFile(null);
        setImportData({ filename: '', headers: [], preview_data: [] });
        setMapping({ name: '', member_type: '', position: '', is_active: '' });
        setImportError('');
        setImportResult('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleOpenModal = () => {
        resetImportModal();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (step === 4) {
            router.reload(); // Reload to see new data
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            processSelectedFile(e.target.files[0]);
        }
    };

    const processSelectedFile = async (file) => {
        if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
            setImportError('Format file tidak didukung. Harap gunakan .xlsx, .xls, atau .csv');
            return;
        }

        setSelectedFile(file);
        setIsUploading(true);
        setImportError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(route('admin.members.import.preview'), formData);
            
            const headers = response.data.headers;
            const guessedMapping = { name: '', member_type: '', position: '', is_active: '' };
            
            headers.forEach(h => {
                const hl = h?.toLowerCase() || '';
                if (hl.includes('nama')) guessedMapping.name = h;
                else if (hl.includes('tipe') || hl.includes('pengurus')) guessedMapping.member_type = h;
                else if (hl.includes('posisi') || hl.includes('spesialisasi')) guessedMapping.position = h;
                else if (hl.includes('aktif') || hl.includes('status')) guessedMapping.is_active = h;
            });

            setImportData({
                filename: response.data.filename,
                headers: headers,
                preview_data: response.data.preview_data || []
            });
            setMapping(guessedMapping);
            setStep(2); // Move to mapping step
        } catch (error) {
            setImportError(error.response?.data?.error || 'Gagal membaca file. Pastikan format excel benar.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleConfirmMapping = () => {
        if (!mapping.name || !mapping.member_type) {
            setImportError('Kolom Nama dan Tipe Anggota wajib dipetakan!');
            return;
        }
        setImportError('');
        setStep(3); // Move to preview step
    };

    const submitImport = async () => {
        setIsUploading(true);
        setImportError('');
        
        try {
            const response = await axios.post(route('admin.members.import.process'), {
                filename: importData.filename,
                mapping: mapping
            });
            setImportResult(response.data.message || 'Data berhasil diimport.');
            setStep(4); // Move to success step
        } catch (error) {
            setImportError(error.response?.data?.error || 'Gagal memproses import data.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
            router.delete(route('admin.members.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <div className="tarung-section-label">Admin Management</div>
                        <h2 className="mt-2 text-2xl font-bold text-[#111827]">Kelola Pengurus & Atlet</h2>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleOpenModal}
                            className="tarung-button-secondary w-fit"
                        >
                            Import Excel/CSV
                        </button>
                        <Link href={route('admin.members.create')} className="tarung-button-primary w-fit">
                            + Tambah Anggota
                        </Link>
                    </div>
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
                {pageErrors?.file && (
                    <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {pageErrors.file}
                    </div>
                )}

                <div className="mb-6 flex gap-3 flex-wrap">
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
                    {uniqueTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                filterType === type
                                    ? 'bg-[#1d4ed8] text-white'
                                    : 'tarung-shell text-gray-700 hover:bg-opacity-80'
                            }`}
                        >
                            {type} ({members.filter((m) => m.member_type === type).length})
                        </button>
                    ))}
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
                                                member.member_type?.toLowerCase() === 'pengurus' || member.member_type === 'board'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {member.member_type === 'board' ? 'Pengurus' : (member.member_type === 'athlete' ? 'Atlet' : member.member_type)}
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
                                            <button
                                                onClick={() => handleDelete(member.id)}
                                                className="inline-block rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                            >
                                                Hapus
                                            </button>
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

            {/* MULTI-STEP IMPORT MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity">
                    <div className="w-full max-w-4xl rounded-[24px] bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-8 pt-8 pb-4 flex justify-between items-center relative">
                            <div>
                                <h3 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                                    <svg className="w-6 h-6 text-[#1d4ed8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    Import Data Anggota
                                </h3>
                                <p className="text-sm text-[#111827]/60 mt-1">
                                    Upload file Excel atau CSV, cocokkan kolom, lalu import data.
                                </p>
                            </div>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-700 transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Stepper */}
                        <div className="px-8 py-4 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
                                {[
                                    { num: 1, label: 'Upload File' },
                                    { num: 2, label: 'Mapping Kolom' },
                                    { num: 3, label: 'Preview Data' },
                                    { num: 4, label: 'Hasil Import' },
                                ].map((s, index) => (
                                    <React.Fragment key={s.num}>
                                        <div className="flex flex-col items-center gap-2 relative z-10">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                                                step >= s.num ? 'bg-[#1d4ed8] text-white shadow-md' : 'bg-white border-2 border-gray-200 text-gray-400'
                                            }`}>
                                                {step > s.num ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> : s.num}
                                            </div>
                                            <span className={`text-xs font-medium ${step >= s.num ? 'text-[#111827]' : 'text-gray-400'}`}>{s.label}</span>
                                        </div>
                                        {index < 3 && (
                                            <div className={`flex-1 h-0.5 mx-2 -mt-6 transition-colors ${step > index + 1 ? 'bg-[#1d4ed8]' : 'bg-gray-200'}`}></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto flex-1 bg-white">
                            {importError && (
                                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <div>{importError}</div>
                                </div>
                            )}

                            {/* STEP 1: Upload */}
                            {step === 1 && (
                                <div className="flex flex-col items-center">
                                    <div 
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`w-full max-w-2xl border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                                            isUploading ? 'bg-gray-50 border-gray-300 opacity-70 pointer-events-none' : 'border-[#1d4ed8]/30 bg-[#eff6ff]/30 hover:bg-[#eff6ff]/60 hover:border-[#1d4ed8]/50'
                                        }`}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileSelect}
                                            accept=".xlsx, .xls, .csv"
                                            className="hidden"
                                        />
                                        {isUploading ? (
                                            <div className="flex flex-col items-center">
                                                <svg className="animate-spin h-10 w-10 text-[#1d4ed8] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <p className="text-[#111827] font-medium">Memproses file...</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-4 text-[#1d4ed8]">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                </div>
                                                <h4 className="text-lg font-bold text-[#111827] mb-1">Klik atau drag & drop file di sini</h4>
                                                <p className="text-sm text-[#111827]/50">Format yang didukung: .xlsx, .xls, .csv</p>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="w-full max-w-2xl mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                                        <div>
                                            <h5 className="font-semibold text-sm text-[#111827]">Butuh template?</h5>
                                            <p className="text-xs text-[#111827]/60">Download template CSV sebagai panduan format file</p>
                                        </div>
                                        <a href={route('admin.members.import.template')} className="tarung-shell px-4 py-2 text-sm font-medium hover:bg-white transition flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                            Download Template
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Mapping */}
                            {step === 2 && (
                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-[#eff6ff]/30 border border-[#1d4ed8]/20 rounded-xl p-4 mb-6">
                                        <p className="text-sm text-[#1d4ed8] font-medium flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            File {selectedFile?.name} berhasil dibaca. Silakan sesuaikan kolomnya.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { key: 'name', label: 'Nama Lengkap', required: true, desc: 'Nama anggota yang akan ditampilkan' },
                                            { key: 'member_type', label: 'Tipe Anggota', required: true, desc: 'Misal: Pengurus, Dewan Penasihat, Atlet' },
                                            { key: 'position', label: 'Posisi / Spesialisasi', required: false, desc: 'Jabatan atau kelas berat' },
                                            { key: 'is_active', label: 'Status Aktif', required: false, desc: 'Status keanggotaan (Ya/Tidak)' },
                                        ].map((field) => (
                                            <div key={field.key} className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 border border-gray-100 rounded-xl hover:border-[#1d4ed8]/30 transition-colors">
                                                <div className="flex-1">
                                                    <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                                                        {field.label}
                                                        {field.required && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] uppercase tracking-wider">Wajib</span>}
                                                    </label>
                                                    <p className="text-xs text-gray-500 mt-1">{field.desc}</p>
                                                </div>
                                                <div className="w-full sm:w-64 flex-shrink-0">
                                                    <select
                                                        value={mapping[field.key]}
                                                        onChange={(e) => setMapping({ ...mapping, [field.key]: e.target.value })}
                                                        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:ring-[#1d4ed8] focus:border-[#1d4ed8] ${
                                                            field.required && !mapping[field.key] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                                        }`}
                                                    >
                                                        <option value="">-- Pilih Kolom Excel --</option>
                                                        {importData.headers.map((h, i) => (
                                                            <option key={i} value={h}>{h}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-8 flex justify-end gap-3">
                                        <button onClick={() => setStep(1)} className="tarung-button-secondary">Kembali</button>
                                        <button onClick={handleConfirmMapping} className="tarung-button-primary">Lanjutkan ke Preview</button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Preview */}
                            {step === 3 && (
                                <div className="w-full">
                                    <div className="bg-[#eff6ff]/30 border border-[#1d4ed8]/20 rounded-xl p-4 mb-6 flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-[#1d4ed8] font-medium font-bold">Preview Data (5 Baris Pertama)</p>
                                            <p className="text-xs text-[#1d4ed8]/70 mt-1">Pastikan data sudah terbaca dengan benar sesuai kolom yang dipetakan.</p>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                                        <table className="min-w-full text-left text-sm">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-4 py-3 font-semibold text-gray-700">Nama</th>
                                                    <th className="px-4 py-3 font-semibold text-gray-700">Tipe</th>
                                                    <th className="px-4 py-3 font-semibold text-gray-700">Posisi</th>
                                                    <th className="px-4 py-3 font-semibold text-gray-700">Aktif</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {importData.preview_data.map((row, i) => {
                                                    const nameVal = mapping.name ? row[mapping.name] : '-';
                                                    const typeVal = mapping.member_type ? row[mapping.member_type] : '-';
                                                    const posVal = mapping.position ? row[mapping.position] : '-';
                                                    const activeVal = mapping.is_active ? row[mapping.is_active] : 'Ya (Default)';
                                                    
                                                    return (
                                                        <tr key={i} className="hover:bg-gray-50">
                                                            <td className="px-4 py-3 text-gray-800 font-medium">{nameVal || '-'}</td>
                                                            <td className="px-4 py-3 text-gray-600">
                                                                <span className="px-2 py-1 rounded bg-gray-100 text-xs font-medium">{typeVal || '-'}</span>
                                                            </td>
                                                            <td className="px-4 py-3 text-gray-600">{posVal || '-'}</td>
                                                            <td className="px-4 py-3 text-gray-600">{activeVal || '-'}</td>
                                                        </tr>
                                                    );
                                                })}
                                                {importData.preview_data.length === 0 && (
                                                    <tr><td colSpan="4" className="text-center py-6 text-gray-500 italic">Tidak ada data untuk di-preview</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-8 flex justify-end gap-3">
                                        <button onClick={() => setStep(2)} disabled={isUploading} className="tarung-button-secondary disabled:opacity-50">Kembali</button>
                                        <button onClick={submitImport} disabled={isUploading} className="tarung-button-primary disabled:opacity-50 flex items-center gap-2">
                                            {isUploading ? (
                                                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Memproses...</>
                                            ) : 'Mulai Import Data'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: Success */}
                            {step === 4 && (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#111827] mb-2">Import Selesai!</h3>
                                    <p className="text-gray-600 mb-8">{importResult}</p>
                                    <button onClick={handleCloseModal} className="tarung-button-primary">Tutup & Muat Ulang Data</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
