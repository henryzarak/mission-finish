"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import type { Guide } from "@/types"
import { Search } from "lucide-react"
import { GuideCard } from "@/components/GuideCard"

interface Props {
  guides: Guide[]
}

export function GuideSearch({ guides }: Props) {
  const [query, setQuery] = useState("")

  const fuse = useMemo(
    () =>
      new Fuse(guides, {
        keys: ["title", "description", "category"],
        threshold: 0.3,
        includeScore: true,
      }),
    [guides]
  )

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : guides

  const byCategory = useMemo(() => {
    const map = new Map<string, Guide[]>()
    for (const guide of results) {
      const existing = map.get(guide.category) || []
      existing.push(guide)
      map.set(guide.category, existing)
    }
    return map
  }, [results])

  return (
    <>
      <div className="relative mb-8">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mf-gray-400 dark:text-[#525252]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar guías..."
          className="w-full h-10 pl-9 pr-4 rounded-lg border border-mf-gray-300 dark:border-[#333] bg-mf-white dark:bg-[#0a0a0a] text-sm text-mf-black dark:text-white placeholder:text-mf-gray-400 dark:placeholder:text-[#525252] focus:outline-none focus:ring-2 focus:ring-mf-black dark:focus:ring-white focus:ring-offset-1 transition-colors"
        />
      </div>

      {query && results.length === 0 && (
        <p className="text-center py-12 text-mf-gray-500 dark:text-[#737373]">
          No se encontraron guías para "{query}".
        </p>
      )}

      {Array.from(byCategory.entries()).map(([category, items]) => (
        <section key={category} className="mb-12">
          <h2 className="text-sm font-semibold text-mf-gray-400 dark:text-[#525252] uppercase tracking-wider mb-4">
            {category}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
