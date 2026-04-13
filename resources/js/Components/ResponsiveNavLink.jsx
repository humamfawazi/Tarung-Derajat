import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-[#1d4ed8] bg-[#eff6ff] text-[#1d4ed8] focus:border-[#1d4ed8] focus:bg-[#eff6ff] focus:text-[#1d4ed8]'
                    : 'border-transparent text-[#111827]/70 hover:border-[#1d4ed8]/30 hover:bg-[#eff6ff] hover:text-[#1d4ed8] focus:border-[#1d4ed8]/30 focus:bg-[#eff6ff] focus:text-[#1d4ed8]'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
