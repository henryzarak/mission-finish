import { cn } from "@/lib/cn"

type ButtonVariant = "primary" | "outline" | "ghost"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: "default" | "sm" | "lg"
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-mf-black text-mf-white hover:bg-mf-gray-800 active:bg-black dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5] dark:active:bg-[#d4d4d4]",
  outline:
    "border border-mf-black text-mf-black hover:bg-mf-gray-100 active:bg-mf-gray-200 dark:border-white dark:text-white dark:hover:bg-[#1a1a1a] dark:active:bg-[#222]",
  ghost:
    "text-mf-black hover:bg-mf-gray-100 active:bg-mf-gray-200 dark:text-white dark:hover:bg-[#1a1a1a] dark:active:bg-[#222]",
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
        "inline-flex items-center justify-center rounded-lg font-medium tracking-tight transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mf-black dark:focus-visible:ring-white focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
