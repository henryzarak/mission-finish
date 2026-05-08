import Link from "next/link"
import { Guide } from "@/types"
import { ArrowRight, Clock, Layers } from "lucide-react"

const difficultyLabel: Record<string, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group block rounded-xl border border-mf-gray-200 bg-mf-white p-6 transition-all hover:border-mf-black hover:shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-mf-gray-400 uppercase tracking-wider">
          {guide.category}
        </span>
        <span className="text-xs text-mf-gray-500">{difficultyLabel[guide.difficulty]}</span>
      </div>

      <h3 className="text-lg font-semibold text-mf-black mb-2 group-hover:opacity-70 transition-opacity">
        {guide.title}
      </h3>
      <p className="text-sm text-mf-gray-500 leading-relaxed mb-4 line-clamp-2">
        {guide.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-mf-gray-400">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {guide.duration}
        </span>
        <span className="flex items-center gap-1">
          <Layers size={12} />
          {guide.sections} secciones
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-mf-black opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all">
        Ver guía <ArrowRight size={14} />
      </div>
    </Link>
  )
}
