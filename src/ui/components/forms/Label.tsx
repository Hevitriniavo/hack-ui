import { ComponentProps } from "react"

type LabelProps = ComponentProps<"label">;


export function Label({  children, ...props }: LabelProps) {
    return <>
        <label
            {...props} >
            {children}
        </label>
    </>
};

export default Label