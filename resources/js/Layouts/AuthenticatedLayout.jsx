import UserNavbar from '@/Components/Navbars/UserNavbar';
import PelatihNavbar from '@/Components/Navbars/PelatihNavbar';
import AdminLayout from '@/Layouts/AdminLayout';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const roleName = user?.role?.name ?? null;

    if (roleName === 'admin') {
        return <AdminLayout header={header}>{children}</AdminLayout>;
    }

    const renderNavbar = () => {
        switch (roleName) {
            case 'pelatih':
            case 'coach':
                return <PelatihNavbar />;
            default:
                return <UserNavbar />;
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f7ff] text-[#111827]">
            {renderNavbar()}

            {header && (
                <header className="border-b border-white/70 bg-white/80 backdrop-blur-xl">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
