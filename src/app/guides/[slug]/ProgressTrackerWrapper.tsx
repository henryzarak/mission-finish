"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProgressTracker } from "@/components/ProgressTracker"
import { createClient } from "@/lib/supabase/client"

interface Props {
  guideSlug: string
  totalSections: number
}

export function ProgressTrackerWrapper({ guideSlug, totalSections }: Props) {
  const router = useRouter()
  const [completed, setCompleted] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null)
      if (data.user) fetchProgress(data.user.id)
      else setLoading(false)
    })
  }, [guideSlug])

  async function fetchProgress(uid: string) {
    const supabase = createClient()
    const { data } = await supabase
      .from("guide_progress")
      .select("completed_sections")
      .eq("guide_slug", guideSlug)
      .eq("user_id", uid)
      .single()

    setCompleted(data?.completed_sections || 0)
    setLoading(false)
  }

  async function handleToggle(sectionIndex: number) {
    if (!userId) {
      router.push("/login")
      return
    }

    const target = sectionIndex + 1
    if (target <= completed) {
      // Uncomplete (go back)
      setCompleted(target - 1)
    } else if (target === completed + 1) {
      // Complete next section
      setCompleted(target)
    } else {
      return // Can't skip ahead
    }

    const supabase = createClient()
    await supabase.from("guide_progress").upsert(
      {
        user_id: userId,
        guide_slug: guideSlug,
        completed_sections: target <= completed ? target - 1 : target,
        total_sections: totalSections,
        completed: target <= completed ? false : target >= totalSections,
        started_at: new Date().toISOString(),
        completed_at: target >= totalSections ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,guide_slug" }
    )

    router.refresh()
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-mf-gray-200 bg-mf-white p-5 animate-pulse">
        <div className="h-4 w-24 bg-mf-gray-100 rounded mb-2" />
        <div className="h-2 w-full bg-mf-gray-100 rounded mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-full bg-mf-gray-50 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <ProgressTracker
      totalSections={totalSections}
      completedSections={completed}
      onToggle={handleToggle}
      disabled={!userId}
    />
  )
}
