export interface Guide {
  slug: string
  title: string
  description: string
  category: string
  difficulty: "principiante" | "intermedio" | "avanzado"
  duration: string
  sections: number
  order: number
}

export interface GuideProgress {
  guideSlug: string
  userId: string
  completedSections: number
  totalSections: number
  completed: boolean
  startedAt: string
  completedAt: string | null
}

export interface UserProfile {
  id: string
  email: string
  name: string
  avatarUrl: string | null
}
