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
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[#1d4ed8] text-[#1d4ed8] focus:border-[#1d4ed8]'
                    : 'border-transparent text-[#111827]/65 hover:border-[#1d4ed8]/35 hover:text-[#1d4ed8] focus:border-[#1d4ed8]/35 focus:text-[#1d4ed8]') +
                className
            }
        >
            {children}
        </Link>
    );
}
