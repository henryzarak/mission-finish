import { cn } from "@/lib/cn"
import { type VariantProps } from "class-variance-authority"

type ButtonVariant = "primary" | "outline" | "ghost"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: "default" | "sm" | "lg"
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-mf-black text-mf-white hover:bg-mf-gray-800 active:bg-black",
  outline:
    "border border-mf-black text-mf-black hover:bg-mf-gray-100 active:bg-mf-gray-200",
  ghost:
    "text-mf-black hover:bg-mf-gray-100 active:bg-mf-gray-200",
}

const sizes = {
  default: "h-10 px-5 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-12 px-8 text-base",
}

export function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium tracking-tight transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mf-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
