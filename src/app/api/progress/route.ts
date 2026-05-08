import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET /api/progress?guide_slug=disciplina-diaria
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const guideSlug = searchParams.get("guide_slug")

  if (!guideSlug) {
    // Return all progress for the user
    const { data, error } = await supabase
      .from("guide_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("started_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  }

  const { data, error } = await supabase
    .from("guide_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("guide_slug", guideSlug)
    .single()

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || { completed_sections: 0, total_sections: 0, completed: false })
}

// POST /api/progress - update progress
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { guide_slug, completed_sections, total_sections } = body

  if (!guide_slug || completed_sections === undefined || !total_sections) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("guide_progress")
    .upsert(
      {
        user_id: user.id,
        guide_slug,
        completed_sections,
        total_sections,
        completed: completed_sections >= total_sections,
        started_at: new Date().toISOString(),
        completed_at:
          completed_sections >= total_sections
            ? new Date().toISOString()
            : null,
      },
      { onConflict: "user_id,guide_slug" }
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
