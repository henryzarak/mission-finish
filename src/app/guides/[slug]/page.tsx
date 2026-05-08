import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getGuide } from "@/lib/guides"
import { ProgressTrackerWrapper } from "./ProgressTrackerWrapper"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: `${guide.title} | Mission Finish`,
      description: guide.description,
    },
  }
}

export async function generateStaticParams() {
  const { guides } = await import("@/lib/guides")
  return guides.map((g) => ({ slug: g.slug }))
}

export const dynamicParams = false

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuide(slug)

  if (!guide) notFound()

  let Content: React.ComponentType | null = null
  try {
    const mod = await import(`@/content/guides/${slug}.mdx`)
    Content = mod.default
  } catch {
    Content = null
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-mf-gray-400 uppercase tracking-wider">
            {guide.category}
          </span>
          <span className="text-xs text-mf-gray-300">·</span>
          <span className="text-xs text-mf-gray-500">{guide.duration}</span>
          <span className="text-xs text-mf-gray-300">·</span>
          <span className="text-xs text-mf-gray-500">{guide.sections} secciones</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-mf-black mb-3">
          {guide.title}
        </h1>
        <p className="text-mf-gray-500 max-w-2xl text-lg">
          {guide.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {Content ? (
            <article className="prose-custom max-w-none">
              <Content />
            </article>
          ) : (
            <div className="rounded-xl border border-mf-gray-200 bg-mf-gray-50 p-8 text-center text-mf-gray-400">
              <p className="text-lg font-medium text-mf-black mb-2">Contenido en camino</p>
              <p className="text-sm">Esta guía está siendo preparada. Vuelve pronto.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-20">
            <ProgressTrackerWrapper
              guideSlug={guide.slug}
              totalSections={guide.sections}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
