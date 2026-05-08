import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { guides } from "@/lib/guides"
import { BookOpen, CheckCircle2, Clock, TrendingUp } from "lucide-react"

export const metadata = {
  title: "Dashboard",
  description: "Tu panel de progreso en Mission Finish.",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: progressData, error } = await supabase
    .from("guide_progress")
    .select("*")
    .eq("user_id", user.id)
    .order("started_at", { ascending: false })

  const progressMap = new Map(
    (progressData || []).map((p) => [p.guide_slug, p])
  )

  const inProgress = (progressData || []).filter((p) => !p.completed)
  const completed = (progressData || []).filter((p) => p.completed)
  const totalProgress =
    guides.length > 0
      ? Math.round(
          ((progressData || []).reduce(
            (sum, p) => sum + (p.completed_sections / p.total_sections) * 100,
            0
          ) /
            guides.length)
        ) + "%"
      : "0%"

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold text-mf-black mb-2">Dashboard</h1>
      <p className="text-mf-gray-500 mb-10">
        Bienvenido, {user.user_metadata?.name || user.email}. Así va tu misión.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          {
            icon: BookOpen,
            label: "En progreso",
            value: inProgress.length,
          },
          {
            icon: CheckCircle2,
            label: "Completadas",
            value: completed.length,
          },
          {
            icon: Clock,
            label: "Pendientes",
            value: guides.length - (progressData || []).length,
          },
          {
            icon: TrendingUp,
            label: "Progreso total",
            value: totalProgress,
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-mf-gray-200 bg-mf-white p-5"
          >
            <div className="flex items-center gap-2 text-mf-gray-400 mb-2">
              <Icon size={16} />
              <span className="text-xs uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-2xl font-bold text-mf-black">{value}</p>
          </div>
        ))}
      </div>

      {/* Active missions */}
      {inProgress.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-mf-black mb-4">
            Misiones activas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {inProgress.map((p) => {
              const guide = guides.find((g) => g.slug === p.guide_slug)
              if (!guide) return null
              const pct = Math.round(
                (p.completed_sections / p.total_sections) * 100
              )
              return (
                <Link
                  key={p.guide_slug}
                  href={`/guides/${p.guide_slug}`}
                  className="block rounded-xl border border-mf-gray-200 bg-mf-white p-5 transition-all hover:border-mf-black"
                >
                  <span className="text-xs text-mf-gray-400 uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <h3 className="font-semibold text-mf-black mt-1">
                    {guide.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-mf-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-mf-gray-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-mf-black tabular-nums">
                      {pct}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-mf-gray-400">
                    {p.completed_sections}/{p.total_sections} secciones
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Completed missions */}
      {completed.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-mf-black mb-4">
            Misiones cumplidas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {completed.map((p) => {
              const guide = guides.find((g) => g.slug === p.guide_slug)
              if (!guide) return null
              return (
                <Link
                  key={p.guide_slug}
                  href={`/guides/${p.guide_slug}`}
                  className="flex items-center gap-3 rounded-xl border border-mf-gray-200 bg-mf-gray-50 p-4 transition-all hover:border-mf-black"
                >
                  <CheckCircle2 size={20} className="text-mf-black shrink-0" />
                  <div>
                    <span className="text-xs text-mf-gray-400">
                      {guide.category}
                    </span>
                    <h3 className="font-medium text-mf-black text-sm">
                      {guide.title}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* All guides link */}
      {inProgress.length === 0 && completed.length === 0 && (
        <div className="text-center py-12 rounded-xl border border-mf-gray-200 bg-mf-gray-50">
          <p className="text-mf-gray-500 mb-4">
            Aún no has empezado ninguna misión.
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center justify-center rounded-lg bg-mf-black px-6 py-3 text-sm font-medium text-mf-white transition-colors hover:bg-mf-gray-800"
          >
            Ver guías disponibles
          </Link>
        </div>
      )}
    </div>
  )
}
