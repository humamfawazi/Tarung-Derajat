import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function VideosUpload() {
    const user = usePage().props.auth.user;
    const cancelHref = user?.role?.name === 'admin' ? route('admin.videos.index') : route('dashboard');

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        visibility: 'unlisted',
        video: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('videos.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset('title', 'description', 'visibility', 'video');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Coach Studio</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Upload Video to YouTube</h2>
                </div>
            }
        >
            <Head title="Upload Video" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8" encType="multipart/form-data">
                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Judul Video</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            placeholder="Contoh: Teknik Dasar Kuda-Kuda Tarung Derajat"
                            required
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Deskripsi</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                            placeholder="Jelaskan materi teknik, target latihan, dan catatan penting."
                        />
                        {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">Visibilitas YouTube</label>
                        <select
                            value={data.visibility}
                            onChange={(e) => setData('visibility', e.target.value)}
                            className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
                        >
                            <option value="unlisted">Unlisted</option>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                        {errors.visibility && <p className="mt-2 text-sm text-red-600">{errors.visibility}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#111827]">File Video</label>
                        <input
                            type="file"
                            accept="video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm"
                            onChange={(e) => setData('video', e.target.files[0] ?? null)}
                            className="mt-2 block w-full text-sm text-[#111827] file:mr-4 file:rounded-full file:border-0 file:bg-[#1d4ed8] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:opacity-90"
                            required
                        />
                        <p className="mt-2 text-xs text-[#111827]/60">Maksimal 500MB. Format: mp4, mov, avi, mkv, webm.</p>
                        {errors.video && <p className="mt-2 text-sm text-red-600">{errors.video}</p>}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing} className="tarung-button-primary disabled:opacity-60">
                            {processing ? 'Uploading...' : 'Upload ke YouTube'}
                        </button>
                        <Link href={cancelHref} className="tarung-button-secondary">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
