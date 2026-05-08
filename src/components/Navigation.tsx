"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { User } from "@supabase/supabase-js"
import { Menu, X, BookOpen, LayoutDashboard } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)

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
    <header className="sticky top-0 z-50 border-b border-mf-gray-200 bg-mf-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-mf-black">MISSION</span>
          <span className="text-mf-gray-400 font-normal">FINISH</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/guides"
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname.startsWith("/guides")
                ? "bg-mf-black text-mf-white"
                : "text-mf-gray-600 hover:text-mf-black hover:bg-mf-gray-100"
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
                    ? "bg-mf-black text-mf-white"
                    : "text-mf-gray-600 hover:text-mf-black hover:bg-mf-gray-100"
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <div className="ml-2 flex items-center gap-2 border-l border-mf-gray-200 pl-2">
                <span className="text-xs text-mf-gray-500">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Salir
                </Button>
              </div>
            </>
          ) : (
            <div className="ml-2 flex items-center gap-2 border-l border-mf-gray-200 pl-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
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
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-mf-black"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-mf-gray-200 bg-mf-white px-4 pb-4 pt-2 space-y-1">
          <Link
            href="/guides"
            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg text-mf-gray-600 hover:text-mf-black hover:bg-mf-gray-100"
            onClick={() => setOpen(false)}
          >
            <BookOpen size={16} />
            Guías
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg text-mf-gray-600 hover:text-mf-black hover:bg-mf-gray-100"
                onClick={() => setOpen(false)}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={() => { handleLogout(); setOpen(false) }}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg text-mf-gray-600 hover:text-mf-black hover:bg-mf-gray-100"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-3 py-2.5 text-sm text-mf-gray-600 hover:text-mf-black"
                onClick={() => setOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2.5 text-sm font-medium bg-mf-black text-mf-white rounded-lg text-center mt-2"
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
