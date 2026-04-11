import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function ArticlesUpload() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('articles.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset('title', 'content', 'image');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Content Studio</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#050B0A]">Upload Artikel</h2>
                </div>
            }
        >
            <Head title="Upload Artikel" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8" encType="multipart/form-data">
                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Judul Artikel</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            placeholder="Contoh: Manfaat Latihan Dasar Tarung Derajat"
                            required
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Isi Artikel</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={8}
                            className="mt-2 w-full rounded-2xl border border-[#050B0A]/15 px-4 py-3 text-sm focus:border-[#050B0A] focus:outline-none"
                            placeholder="Tulis isi artikel di sini..."
                            required
                        />
                        {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#050B0A]">Gambar (Opsional)</label>
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => setData('image', e.target.files[0] ?? null)}
                            className="mt-2 block w-full text-sm text-[#050B0A] file:mr-4 file:rounded-full file:border-0 file:bg-[#050B0A] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:opacity-90"
                        />
                        <p className="mt-2 text-xs text-[#050B0A]/60">Maksimal 2MB. Format: jpg, jpeg, png, webp.</p>
                        {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                    </div>

                    <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                        {processing ? 'Uploading...' : 'Upload Artikel'}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
