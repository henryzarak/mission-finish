"use client"

import { cn } from "@/lib/cn"
import { Check, Lock } from "lucide-react"

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
    <div className="rounded-xl border border-mf-gray-200 bg-mf-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-mf-black">Tu progreso</h3>
        <span className="text-2xl font-bold text-mf-black tabular-nums">
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-mf-gray-100 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isCompleted ? "bg-mf-black" : "bg-mf-gray-700"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-mf-gray-500">
        {completedSections} de {totalSections} secciones completadas
        {isCompleted && " — ¡Misión cumplida!"}
      </p>

      {/* Section checkboxes */}
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
                  ? "text-mf-gray-500 line-through"
                  : current
                    ? "text-mf-black font-medium bg-mf-gray-50"
                    : "text-mf-gray-600 hover:bg-mf-gray-50",
                disabled && "cursor-not-allowed opacity-60"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  done
                    ? "border-mf-black bg-mf-black text-white"
                    : current
                      ? "border-mf-black"
                      : "border-mf-gray-300"
                )}
              >
                {done ? <Check size={12} strokeWidth={3} /> : <span className="text-[10px]">{i + 1}</span>}
              </span>
              Sección {i + 1}
              {done && <span className="ml-auto text-xs text-mf-gray-400">✓</span>}
              {current && !done && (
                <span className="ml-auto text-xs text-mf-black font-medium">En progreso</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
