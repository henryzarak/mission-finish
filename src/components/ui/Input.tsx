import { cn } from "@/lib/cn"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-mf-black dark:text-white mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "flex h-10 w-full rounded-lg border border-mf-gray-300 dark:border-[#333] bg-mf-white dark:bg-[#0a0a0a] px-3 py-2 text-sm text-mf-black dark:text-white placeholder:text-mf-gray-400 dark:placeholder:text-[#525252] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mf-black dark:focus-visible:ring-white focus-visible:ring-offset-1 dark:focus-visible:ring-offset-[#0a0a0a] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
