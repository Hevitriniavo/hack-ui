import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export function Button({  children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      >
      {children}
    </button>
  );
}
