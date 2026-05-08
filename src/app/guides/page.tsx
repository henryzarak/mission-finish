import type { Metadata } from "next"
import { guides, getGuidesByCategory } from "@/lib/guides"
import { GuideCard } from "@/components/GuideCard"

export const metadata: Metadata = {
  title: "Guías",
  description:
    "Todas las guías de Mission Finish. Mentalidad, productividad, finanzas y más. Elige tu misión y termina lo que empiezas.",
}

export default function GuidesPage() {
  const byCategory = getGuidesByCategory()

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-mf-black">Guías</h1>
        <p className="mt-2 text-mf-gray-500 max-w-lg">
          Elige tu misión. Cada guía está diseñada para ejecutarse, no solo para leerse.
        </p>
      </div>

      {Array.from(byCategory.entries()).map(([category, items]) => (
        <section key={category} className="mb-12">
          <h2 className="text-sm font-semibold text-mf-gray-400 uppercase tracking-wider mb-4">
            {category}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
