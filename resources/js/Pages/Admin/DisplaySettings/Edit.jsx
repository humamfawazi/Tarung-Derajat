import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function AdminDisplaySettingsEdit({ settings, databaseReady }) {
    const { flash } = usePage().props;

    const { data, setData, patch, processing, errors } = useForm({
        articles_user_limit: settings.articles_user_limit ?? 4,
        videos_user_limit: settings.videos_user_limit ?? 4,
        history_user_limit: settings.history_user_limit ?? 1,
        philosophy_user_limit: settings.philosophy_user_limit ?? 1,
        education_user_limit: settings.education_user_limit ?? 1,
    });

    const submit = (e) => {
        e.preventDefault();

        if (!databaseReady) {
            return;
        }

        patch(route('admin.display-settings.update'));
    };

    const numericField = (key, label, help) => (
        <div>
            <label className="text-sm font-semibold text-[#111827]">{label}</label>
            <p className="mt-1 text-xs text-[#111827]/60">{help}</p>
            <input
                type="number"
                min="1"
                max="50"
                value={data[key]}
                onChange={(e) => setData(key, Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-[#1d4ed8]/15 px-4 py-3 text-sm focus:border-[#1d4ed8] focus:outline-none"
            />
            {errors[key] ? <p className="mt-2 text-sm text-red-600">{errors[key]}</p> : null}
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="tarung-section-label">Admin Management</div>
                    <h2 className="mt-2 text-2xl font-bold text-[#111827]">Atur Jumlah Tampil Konten User</h2>
                    <p className="mt-2 max-w-2xl text-sm text-[#111827]/65">
                        Halaman ini mengatur berapa banyak konten yang ditampilkan untuk user. Cocokkan dengan data di
                        menu Konten User agar tampilan Home dan Dashboard user tetap rapi.
                    </p>
                </div>
            }
        >
            <Head title="Atur Jumlah Tampil Konten User" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                {!databaseReady ? (
                    <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        Tabel display_settings belum tersedia. Jalankan: php artisan migrate
                    </div>
                ) : null}

                {flash?.success ? (
                    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {flash.success}
                    </div>
                ) : null}

                {flash?.error ? (
                    <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {flash.error}
                    </div>
                ) : null}

                <form onSubmit={submit} className="tarung-shell space-y-6 rounded-[28px] p-6 sm:p-8">
                    {numericField('articles_user_limit', 'Limit Artikel', 'Jumlah artikel yang tampil untuk user.')}
                    {numericField('videos_user_limit', 'Limit Video', 'Jumlah video yang tampil untuk user.')}
                    {numericField('history_user_limit', 'Limit History', 'Jumlah item history yang tampil di landing dan dashboard user.')}
                    {numericField('philosophy_user_limit', 'Limit Philosophy', 'Jumlah item philosophy yang tampil di landing dan dashboard user.')}
                    {numericField('education_user_limit', 'Limit Education', 'Jumlah item education yang tampil di landing dan dashboard user.')}

                    <div className="rounded-2xl border border-[#111827]/10 bg-white px-4 py-3 text-sm text-[#111827]/72">
                        Section type feature tidak memakai limit ini dan tetap dikendalikan langsung dari status aktif kontennya.
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button type="submit" disabled={processing || !databaseReady} className="tarung-button-primary disabled:opacity-60">
                            {!databaseReady
                                ? 'Migration Diperlukan'
                                : processing
                                    ? 'Saving...'
                                    : 'Simpan Pengaturan'}
                        </button>
                        <Link href={route('admin.landing.index')} className="tarung-button-secondary">
                            Kembali ke Konten User
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
