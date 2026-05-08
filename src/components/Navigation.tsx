"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { User } from "@supabase/supabase-js"
import { Menu, X, BookOpen, LayoutDashboard, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

export function Navigation() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 border-b border-mf-gray-200 dark:border-[#222] bg-mf-white dark:bg-[#0a0a0a]">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-mf-black dark:text-white">MISSION</span>
          <span className="text-mf-gray-400 dark:text-[#525252] font-normal">FINISH</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/guides"
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname.startsWith("/guides")
                ? "bg-mf-black text-mf-white dark:bg-white dark:text-black"
                : "text-mf-gray-600 dark:text-[#a3a3a3] hover:text-mf-black dark:hover:text-white hover:bg-mf-gray-100 dark:hover:bg-[#1a1a1a]"
            }`}
          >
            <BookOpen size={16} />
            Guías
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "bg-mf-black text-mf-white dark:bg-white dark:text-black"
                    : "text-mf-gray-600 dark:text-[#a3a3a3] hover:text-mf-black dark:hover:text-white hover:bg-mf-gray-100 dark:hover:bg-[#1a1a1a]"
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <div className="ml-2 flex items-center gap-2 border-l border-mf-gray-200 dark:border-[#333] pl-2">
                <span className="text-xs text-mf-gray-500 dark:text-[#737373] max-w-[120px] truncate">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}
                  className="dark:text-[#a3a3a3] dark:hover:text-white dark:hover:bg-[#1a1a1a]">
                  Salir
                </Button>
              </div>
            </>
          ) : (
            <div className="ml-2 flex items-center gap-2 border-l border-mf-gray-200 dark:border-[#333] pl-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="dark:text-[#a3a3a3] dark:hover:text-white dark:hover:bg-[#1a1a1a]">
                  Entrar
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Empieza gratis
                </Button>
              </Link>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-lg text-mf-gray-500 hover:bg-mf-gray-100 dark:text-[#737373] dark:hover:bg-[#1a1a1a] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-mf-gray-500 hover:bg-mf-gray-100 dark:text-[#737373] dark:hover:bg-[#1a1a1a] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="p-2 text-mf-black dark:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-mf-gray-200 dark:border-[#222] bg-mf-white dark:bg-[#0a0a0a] px-4 pb-4 pt-2 space-y-1">
          <Link
            href="/guides"
            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg text-mf-gray-600 dark:text-[#a3a3a3] hover:text-mf-black dark:hover:text-white hover:bg-mf-gray-100 dark:hover:bg-[#1a1a1a]"
            onClick={() => setOpen(false)}
          >
            <BookOpen size={16} />
            Guías
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg text-mf-gray-600 dark:text-[#a3a3a3] hover:text-mf-black dark:hover:text-white hover:bg-mf-gray-100 dark:hover:bg-[#1a1a1a]"
                onClick={() => setOpen(false)}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={() => { handleLogout(); setOpen(false) }}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg text-mf-gray-600 dark:text-[#a3a3a3] hover:text-mf-black dark:hover:text-white hover:bg-mf-gray-100 dark:hover:bg-[#1a1a1a]"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-3 py-2.5 text-sm text-mf-gray-600 dark:text-[#a3a3a3] hover:text-mf-black dark:hover:text-white"
                onClick={() => setOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2.5 text-sm font-medium bg-mf-black text-mf-white dark:bg-white dark:text-black rounded-lg text-center mt-2"
                onClick={() => setOpen(false)}
              >
                Empieza gratis
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
