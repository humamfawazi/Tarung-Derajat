export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="64" rx="18" fill="currentColor" fillOpacity="0.08" />
            <path
                d="M18 21h7l7 12 12-12h7L35 38v10h-6V38L18 21Z"
                fill="currentColor"
            />
            <path
                d="M18 45h28"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}
