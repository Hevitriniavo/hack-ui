import { ComponentPropsWithoutRef, forwardRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(function ({ ...props }, ref) {
    return (
        <>
            <input
                {...props}
                ref={ref}
            />
        </>
    );
});

export default Input;
