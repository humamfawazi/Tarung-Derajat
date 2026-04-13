import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const secondaryButtonClass =
    'inline-flex items-center justify-center rounded-full border border-[#1d4ed8]/15 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#1d4ed8] transition duration-150 ease-in-out hover:border-[#1d4ed8]/30 hover:bg-[#eff6ff] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] focus:ring-offset-2';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            {(errors.email || errors.password) && (
                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errors.email || errors.password}
                </div>
            )}

            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]/65">
                    Member access
                </p>
                <h1 className="mt-3 text-2xl font-bold text-[#111827]">
                    Masuk ke akun Anda
                </h1>
                <p className="mt-2 text-sm leading-6 text-[#111827]/60">
                    Gunakan email dan password yang sudah terdaftar untuk mengakses dashboard.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-[#111827]/60 underline-offset-4 transition hover:text-[#1d4ed8] hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton type="submit" className="w-full sm:w-auto" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-6 border-t border-[#1d4ed8]/10 pt-5">
                <p className="mb-3 text-sm text-[#111827]/60">
                    Belum punya akun?
                </p>
                <Link href={route('register')} className={`${secondaryButtonClass} w-full`}>
                    Daftar
                </Link>
            </div>
        </GuestLayout>
    );
}
