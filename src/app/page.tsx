import Link from "next/link"
import { guides } from "@/lib/guides"
import { BookOpen, Target, TrendingUp, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <>
      <section className="border-b border-mf-gray-200 dark:border-[#222]">
        <div className="mx-auto max-w-5xl px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-mf-gray-400 dark:text-[#525252] uppercase tracking-widest mb-4">
              Mission Finish
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-mf-black dark:text-white leading-tight">
              Termina lo que
              <br />
              <span className="text-mf-gray-400 dark:text-[#525252]">empiezas.</span>
            </h1>
            <p className="mt-6 text-lg text-mf-gray-500 dark:text-[#a3a3a3] leading-relaxed max-w-lg">
              Guías prácticas de IA, trading, automatizaciones y más. Paso a paso. Sin excusas. Sin rodeos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/guides"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-mf-black dark:bg-white px-6 py-3 text-sm font-medium text-mf-white dark:text-black transition-colors hover:bg-mf-gray-800 dark:hover:bg-[#e5e5e5] h-11"
              >
                Ver guías <ArrowRight size={16} />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-mf-gray-300 dark:border-[#333] px-6 py-3 text-sm font-medium text-mf-black dark:text-white transition-colors hover:bg-mf-gray-100 dark:hover:bg-[#1a1a1a] h-11"
              >
                Empieza gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-mf-gray-200 dark:border-[#222]">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: guides.length, label: "Guías disponibles" },
              { value: "+100", label: "Secciones prácticas" },
              { value: "0€", label: "Acceso gratuito" },
              { value: "B&W", label: "Sin distracciones" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-mf-black dark:text-white">{value}</p>
                <p className="text-sm text-mf-gray-400 dark:text-[#525252] mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-mf-gray-200 dark:border-[#222]">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <h2 className="text-2xl font-bold text-mf-black dark:text-white text-center mb-12">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Elige tu guía",
                desc: "IA, trading, automatizaciones, productividad. Guías paso a paso con código real.",
              },
              {
                icon: Target,
                title: "Sigue el plan",
                desc: "Cada guía está dividida en secciones accionables. Sin paja. Solo lo que funciona.",
              },
              {
                icon: TrendingUp,
                title: "Trackea tu progreso",
                desc: "Marca secciones completadas, ve tu avance y mantén la racha. Tu misión, tu ritmo.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mf-black dark:bg-white text-mf-white dark:text-black mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-mf-black dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-mf-gray-500 dark:text-[#a3a3a3] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-mf-black dark:text-white mb-4">
            La misión no se pausa.
          </h2>
          <p className="text-mf-gray-500 dark:text-[#a3a3a3] mb-8 max-w-md mx-auto">
            Únete gratis, elige tu primera guía y empieza a terminar lo que empiezas hoy.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-mf-black dark:bg-white px-8 py-3 text-sm font-medium text-mf-white dark:text-black transition-colors hover:bg-mf-gray-800 dark:hover:bg-[#e5e5e5] h-11"
          >
            Empieza tu primera misión
          </Link>
        </div>
      </section>
    </>
  )
}
