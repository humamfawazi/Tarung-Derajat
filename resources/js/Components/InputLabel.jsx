export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-semibold text-[#111827]/75 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
