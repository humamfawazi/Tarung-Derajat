import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold leading-5 transition-all duration-200 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-[#1d4ed8] text-white shadow-[0_2px_12px_rgba(29,78,216,0.35)] '
                    : 'text-[#111827]/65 hover:bg-[#eff6ff] hover:text-[#1d4ed8] ') +
                className
            }
        >
            {children}
        </Link>
    );
}
