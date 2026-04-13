export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[#1d4ed8]/30 text-[#1d4ed8] shadow-sm focus:ring-[#1d4ed8] ' +
                className
            }
        />
    );
}
