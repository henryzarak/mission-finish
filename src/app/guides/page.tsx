import type { Metadata } from "next"
import { guides } from "@/lib/guides"
import { GuideSearch } from "@/components/GuideSearch"

export const metadata: Metadata = {
  title: "Guías",
  description:
    "Todas las guías de Mission Finish. IA, trading, automatizaciones, mentalidad, productividad y más. Elige tu misión.",
}

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-mf-black dark:text-white">Guías</h1>
        <p className="mt-2 text-mf-gray-500 dark:text-[#a3a3a3] max-w-lg">
          Elige tu misión. Cada guía está diseñada para ejecutarse, no solo para leerse.
        </p>
      </div>

      <GuideSearch guides={guides} />
    </div>
  )
}
