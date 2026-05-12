import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const buildSectionKey = (locale, type) => `${type}_${locale}`;
const buildSortHintKey = (locale, type) => `${type}_${locale}`;

const sectionTypeDescriptions = {
    feature: 'Highlight utama yang tampil di landing user.',
    history: 'Cerita latar belakang yang tampil di landing dan dashboard user.',
    philosophy: 'Nilai atau filosofi yang tampil di landing dan dashboard user.',
    education: 'Konten kompetisi dan event yang tampil di landing dan dashboard user.',
};

export default function AdminLandingCreate({ sectionTypes = [], sortOrderHints = {} }) {
    const getSortHint = (locale, type) => {
        const key = buildSortHintKey(locale, type);

        return sortOrderHints[key] ?? { next: 0, used: [] };
    };

    const defaultLocale = 'id';
    const defaultSectionType = 'feature';
    const defaultSortOrder = getSortHint(defaultLocale, defaultSectionType).next;

    const { data, setData, post, processing, errors } = useForm({
        locale: defaultLocale,
        section_key: buildSectionKey(defaultLocale, defaultSectionType),
        title: '',
        content: '',
        image: null,
        is_active: true,
        sort_order: defaultSortOrder,
    });

    const sectionTypeOptions = sectionTypes.length > 0
        ? sectionTypes
        : [
              { value: 'feature', label: 'Feature / Highlight' },
              { value: 'history', label: 'History' },
              { value: 'philosophy', label: 'Philosophy' },
              { value: 'education', label: 'Kompetisi & Event' },
          ];

    const currentSectionType = data.section_key.split('_')[0] || 'feature';
    const currentSortHint = getSortHint(data.locale, currentSectionType);
    const usedSortOrdersText = currentSortHint.used.length > 0
        ? currentSortHint.used.join(', ')
        : 'Belum ada urutan yang dipakai.';
    const impactText =
        currentSectionType === 'feature'
            ? 'Muncul di landing user.'
            : 'Muncul di landing user dan dashboard user (bagian informasi).';

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.landing.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Tambah Konten User</h2>
                    <p className="mt-2 max-w-2xl text-sm text-[#111827]/65">
                        Gunakan form ini untuk membuat konten landing yang dipakai user. Jika key sudah dipakai,
                        sistem akan menambahkan nomor otomatis agar tidak bentrok.
                    </p>
                </div>
            }
        >
            <Head title="Tambah Konten User" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8">
                    <div className="rounded-2xl border border-[#1d4ed8]/10 bg-[#eff6ff] px-4 py-3 text-sm text-[#111827]/72">
                        <div className="font-semibold text-[#111827]">Langkah 1: Pilih jenis section</div>
                        <div className="mt-1">{sectionTypeDescriptions[currentSectionType]}</div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Jenis Section</label>
                        <select
                            value={currentSectionType}
                            onChange={(e) => {
                                const nextType = e.target.value;
                                const nextHint = getSortHint(data.locale, nextType);

                                setData('section_key', buildSectionKey(data.locale, nextType));
                                setData('sort_order', nextHint.next);
                            }}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                        >
                            {sectionTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.section_key && <p className="mt-2 text-sm text-red-600">{errors.section_key}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-semibold text-[#111827]">Langkah 2: Bahasa</label>
                            <select
                                value={data.locale}
                                onChange={(e) => {
                                    const nextLocale = e.target.value;
                                    const nextHint = getSortHint(nextLocale, currentSectionType);

                                    setData('locale', nextLocale);
                                    setData('section_key', buildSectionKey(nextLocale, currentSectionType));
                                    setData('sort_order', nextHint.next);
                                }}
                                className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            >
                                <option value="id">ID</option>
                                <option value="en">EN</option>
                            </select>
                            {errors.locale && <p className="mt-2 text-sm text-red-600">{errors.locale}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-[#111827]">Sort Order</label>
                            <input
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', Number(e.target.value))}
                                className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            />
                            <p className="mt-2 text-xs text-[#111827]/65">
                                Saran otomatis: <span className="font-semibold text-[#111827]">{currentSortHint.next}</span>
                                {' '}({currentSectionType.toUpperCase()}-{data.locale.toUpperCase()})
                            </p>
                            <p className="mt-1 text-xs text-[#111827]/60">
                                Sudah terpakai: {usedSortOrdersText}
                            </p>
                            {errors.sort_order && <p className="mt-2 text-sm text-red-600">{errors.sort_order}</p>}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#1d4ed8]/10 bg-[#eff6ff] px-4 py-3 text-sm text-[#111827]/70">
                        Kode sistem otomatis: <span className="font-semibold text-[#111827]">{data.section_key}</span>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Langkah 3: Judul</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            required
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Langkah 4: Konten</label>
                        <textarea
                            rows={8}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            required
                        />
                        {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Langkah 5: Foto (Opsional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#eff6ff] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#1d4ed8] focus:border-[#1d4ed8] focus:outline-none"
                        />
                        <p className="mt-2 text-xs text-[#111827]/60">Format gambar: JPG, PNG, WEBP. Maksimum 4MB.</p>
                        {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                    </div>

                    <label className="inline-flex items-center gap-2 text-sm text-[#111827]">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                        />
                        Tampilkan ke user
                    </label>

                    <div className="rounded-2xl border border-[#111827]/10 bg-white px-4 py-3 text-sm text-[#111827]/72">
                        <div className="font-semibold text-[#111827]">Dampak Tampilan</div>
                        <p className="mt-1">{impactText}</p>
                        <p className="mt-1">Untuk type history/philosophy/kompetisi & event, jumlah tampil mengikuti Pengaturan Jumlah Tampil.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                            {processing ? 'Saving...' : 'Simpan Konten'}
                        </button>
                        <Link href={route('admin.landing.index')} className="tarung-button-secondary">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
