import { PropsWithChildren } from "react"

type RowProps = PropsWithChildren<{
    className?: string
}>

export function Row({ children, className }: RowProps) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}