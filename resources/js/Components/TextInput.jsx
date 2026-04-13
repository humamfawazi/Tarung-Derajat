import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-2xl border-[#1d4ed8]/15 bg-white px-4 py-3 text-[#111827] shadow-sm shadow-[#1d4ed8]/5 placeholder:text-[#111827]/35 focus:border-[#1d4ed8] focus:ring-[#1d4ed8] ' +
                className
            }
            ref={localRef}
        />
    );
});
