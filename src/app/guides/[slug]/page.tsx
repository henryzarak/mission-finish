import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getGuide, guides } from "@/lib/guides"
import { ProgressTrackerWrapper } from "./ProgressTrackerWrapper"
import { GuideCard } from "@/components/GuideCard"
import Link from "next/link"

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
  return guides.map((g) => ({ slug: g.slug }))
}

export const dynamicParams = false

function getRelatedGuides(slug: string, category: string) {
  return guides
    .filter((g) => g.slug !== slug && g.category === category)
    .slice(0, 2)
}

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

  const related = getRelatedGuides(slug, guide.category)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/guides"
            className="text-xs font-medium text-mf-gray-400 dark:text-[#525252] hover:text-mf-black dark:hover:text-white transition-colors"
          >
            ← Guías
          </Link>
          <span className="text-xs text-mf-gray-300 dark:text-[#333]">/</span>
          <span className="text-xs font-medium text-mf-gray-400 dark:text-[#525252] uppercase tracking-wider">
            {guide.category}
          </span>
          <span className="text-xs text-mf-gray-300 dark:text-[#333]">·</span>
          <span className="text-xs text-mf-gray-500 dark:text-[#737373]">{guide.duration}</span>
          <span className="text-xs text-mf-gray-300 dark:text-[#333]">·</span>
          <span className="text-xs text-mf-gray-500 dark:text-[#737373]">{guide.sections} secciones</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-mf-black dark:text-white mb-3">
          {guide.title}
        </h1>
        <p className="text-mf-gray-500 dark:text-[#a3a3a3] max-w-2xl text-lg">
          {guide.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 min-w-0">
          {Content ? (
            <article className="max-w-none">
              <Content />
            </article>
          ) : (
            <div className="rounded-xl border border-mf-gray-200 dark:border-[#222] bg-mf-gray-50 dark:bg-[#111] p-8 text-center text-mf-gray-400 dark:text-[#525252]">
              <p className="text-lg font-medium text-mf-black dark:text-white mb-2">Contenido en camino</p>
              <p className="text-sm">Esta guía está siendo preparada. Vuelve pronto.</p>
            </div>
          )}

          {/* Related guides */}
          {related.length > 0 && (
            <section className="mt-16 pt-12 border-t border-mf-gray-200 dark:border-[#222]">
              <h2 className="text-lg font-semibold text-mf-black dark:text-white mb-4">
                Guías relacionadas
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {related.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            </section>
          )}
        </div>

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
