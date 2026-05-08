import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Navigation } from "@/components/Navigation"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Mission Finish — Termina lo que empiezas",
    template: "%s | Mission Finish",
  },
  description:
    "Plataforma de guías, tutoriales y cursos para terminar lo que empiezas. Disciplina, mentalidad, finanzas y más. Tu misión. Tu versión.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://missionfinish.com"),
  keywords: [
    "disciplina",
    "desarrollo personal",
    "mentalidad",
    "productividad",
    "finanzas personales",
    "Mission Finish",
  ],
  openGraph: {
    type: "website",
    siteName: "Mission Finish",
    title: "Mission Finish — Termina lo que empiezas",
    description:
      "Plataforma de guías, tutoriales y cursos para terminar lo que empiezas. Tu misión. Tu versión.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-mf-white text-mf-black dark:bg-[#0a0a0a] dark:text-[#ededed]">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-mf-gray-200 dark:border-[#222] py-8 text-center text-xs text-mf-gray-400 dark:text-[#525252]">
            <div className="max-w-5xl mx-auto px-4">
              MISSION FINISH — La misión no se pausa.<br />
              <span className="text-mf-gray-300 dark:text-[#404040]">© {new Date().getFullYear()} Ondeska Holdings</span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
