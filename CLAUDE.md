# Mission Finish — AI Instructions

## How to create a new guide

When the user asks you to create a guide, create a single `.mdx` file in `src/content/guides/`.

### Steps

1. Ask the user: title, category, description, difficulty, how many sections (days), and the content
2. Generate a **slug**: lowercase, no accents, spaces → hyphens. Ej: "Mentalidad de Acero" → `mentalidad-de-acero`
3. Create the file at `src/content/guides/<slug>.mdx` with this exact format:

```yaml
---
title: <title>
description: <1-2 sentence description, SEO-friendly>
category: Mentalidad | Productividad | Finanzas | Habilidades | Salud | Relaciones
difficulty: principiante | intermedio | avanzado
duration: <N días>
sections: <number — must match the actual sections in the content>
order: <next available number>
---

# <Title>

<Intro paragraph>

---

## Sección 1: <Name>

<Content>

## Sección 2: <Name>

<Content>

... (one ## section per "sections" count)

---

<Closing line>
```

### Rules

- **Brand voice**: directo, sin rodeos, motivacional pero crudo. Nada de "todo va a estar bien". Usa "misión", "termina", "sin excusas".
- **`sections` must match** the number of `## Sección` headings in the content (ProgressTracker depends on this)
- **`order`** = last guide's order + 1 (check `src/content/guides/` for latest)
- **`duration`** = human-readable, ej: "7 días", "2 semanas"
- **Always use B&W mentality** — contenido accionable, sin paja, bullet points cuando ayude
- **SEO-friendly titles** — incluye palabras clave que la gente buscaría
- **Each `## Sección`** should be a self-contained actionable step

### After creating the file

1. Run `npm run build` to verify it compiles
2. Git add, commit, push
3. Vercel auto-deploys

### Content checklist

- [ ] Slug is lowercase, hyphenated, no special chars
- [ ] Frontmatter has all 7 fields (title, description, category, difficulty, duration, sections, order)
- [ ] Number of `## Sección X:` headings equals `sections` value
- [ ] Each section has actionable, concrete steps
- [ ] Uses markdown formatting (bold, lists, blockquotes, tables where useful)
- [ ] Closing line is motivational and on-brand
