import { Guide } from "@/types"

export const guides: Guide[] = [
  {
    slug: "disciplina-diaria",
    title: "Disciplina Diaria",
    description: "Construye una rutina inquebrantable que te lleve a terminar lo que empiezas. Hábitos, sistemas y accountability.",
    category: "Mentalidad",
    difficulty: "principiante",
    duration: "7 días",
    sections: 7,
    order: 1,
  },
  {
    slug: "enfoque-profundo",
    title: "Enfoque Profundo",
    description: "Domina el arte de la concentración total. Elimina distracciones y multiplica tu productividad en menos tiempo.",
    category: "Productividad",
    difficulty: "intermedio",
    duration: "5 días",
    sections: 5,
    order: 2,
  },
  {
    slug: "finanzas-personales",
    title: "Finanzas Personales 101",
    description: "Toma control de tu dinero. Presupuesto, ahorro, inversión básica y libertad financiera paso a paso.",
    category: "Finanzas",
    difficulty: "principiante",
    duration: "10 días",
    sections: 10,
    order: 3,
  },
  {
    slug: "mentalidad-de-acero",
    title: "Mentalidad de Acero",
    description: "Fortalece tu mente para tiempos difíciles. Resiliencia, estoicismo práctico y fortaleza mental aplicada.",
    category: "Mentalidad",
    difficulty: "avanzado",
    duration: "14 días",
    sections: 14,
    order: 4,
  },
  {
    slug: "habla-en-publico",
    title: "Habla en Público Sin Miedo",
    description: "Vence el miedo escénico y comunica tus ideas con claridad, confianza y presencia.",
    category: "Habilidades",
    difficulty: "intermedio",
    duration: "6 días",
    sections: 6,
    order: 5,
  },
]

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
