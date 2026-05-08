"use client"

import { cn } from "@/lib/cn"
import { Check } from "lucide-react"

interface ProgressTrackerProps {
  totalSections: number
  completedSections: number
  onToggle: (sectionIndex: number) => Promise<void>
  disabled?: boolean
}

export function ProgressTracker({
  totalSections,
  completedSections,
  onToggle,
  disabled = false,
}: ProgressTrackerProps) {
  const percentage =
    totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

  const isCompleted = completedSections >= totalSections && totalSections > 0

  return (
    <div className="rounded-xl border border-mf-gray-200 dark:border-[#222] bg-mf-white dark:bg-[#111] p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-mf-black dark:text-white">Tu progreso</h3>
        <span className="text-2xl font-bold text-mf-black dark:text-white tabular-nums">
          {percentage}%
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-mf-gray-100 dark:bg-[#222] overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isCompleted ? "bg-mf-black dark:bg-white" : "bg-mf-gray-700 dark:bg-[#a3a3a3]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-mf-gray-500 dark:text-[#737373]">
        {completedSections} de {totalSections} secciones completadas
        {isCompleted && " — ¡Misión cumplida!"}
      </p>

      <div className="mt-4 space-y-1.5">
        {Array.from({ length: totalSections }).map((_, i) => {
          const done = i < completedSections
          const current = i === completedSections
          return (
            <button
              key={i}
              onClick={() => onToggle(i)}
              disabled={disabled}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                done
                  ? "text-mf-gray-500 dark:text-[#737373] line-through"
                  : current
                    ? "text-mf-black dark:text-white font-medium bg-mf-gray-50 dark:bg-[#1a1a1a]"
                    : "text-mf-gray-600 dark:text-[#a3a3a3] hover:bg-mf-gray-50 dark:hover:bg-[#1a1a1a]",
                disabled && "cursor-not-allowed opacity-60"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  done
                    ? "border-mf-black dark:border-white bg-mf-black dark:bg-white text-white dark:text-black"
                    : current
                      ? "border-mf-black dark:border-white"
                      : "border-mf-gray-300 dark:border-[#444]"
                )}
              >
                {done ? <Check size={12} strokeWidth={3} /> : <span className="text-[10px]">{i + 1}</span>}
              </span>
              Sección {i + 1}
              {done && <span className="ml-auto text-xs text-mf-gray-400 dark:text-[#525252]">✓</span>}
              {current && !done && (
                <span className="ml-auto text-xs text-mf-black dark:text-white font-medium">En progreso</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
