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
            className={`flex w-full items-start border-l-4 py-2.5 pe-4 ps-3 ${
                active
                    ? 'border-[#1d4ed8] bg-[#1d4ed8]/10 text-[#1d4ed8] font-semibold'
                    : 'border-transparent text-[#111827]/70 hover:border-[#1d4ed8]/40 hover:bg-[#eff6ff] hover:text-[#1d4ed8] font-medium'
            } text-base transition-all duration-200 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
