import { readdirSync, readFileSync } from "fs"
import { resolve } from "path"
import matter from "gray-matter"
import type { Guide } from "@/types"

const CONTENT_DIR = resolve(process.cwd(), "src/content/guides")

function parseGuidesFromFiles(): Guide[] {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))

  const guides: Guide[] = []

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "")
    const raw = readFileSync(resolve(CONTENT_DIR, file), "utf-8")
    const { data } = matter(raw)

    guides.push({
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "General",
      difficulty: data.difficulty || "principiante",
      duration: data.duration || "",
      sections: data.sections || 0,
      order: data.order || 999,
    })
  }

  return guides.sort((a, b) => a.order - b.order)
}

export const guides: Guide[] = parseGuidesFromFiles()

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getGuidesByCategory(): Map<string, Guide[]> {
  const map = new Map<string, Guide[]>()
  for (const guide of guides) {
    const existing = map.get(guide.category) || []
    existing.push(guide)
    map.set(guide.category, existing)
  }
  return map
}
