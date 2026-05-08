import Link from "next/link"
import { guides } from "@/lib/guides"
import { BookOpen, Target, TrendingUp, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-mf-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-mf-gray-400 uppercase tracking-widest mb-4">
              Mission Finish
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-mf-black leading-tight">
              Termina lo que
              <br />
              <span className="text-mf-gray-400">empiezas.</span>
            </h1>
            <p className="mt-6 text-lg text-mf-gray-500 leading-relaxed max-w-lg">
              Guías prácticas, tutoriales paso a paso y cursos diseñados para
              que cumplas cada misión. Sin excusas. Sin rodeos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/guides"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-mf-black px-6 py-3 text-sm font-medium text-mf-white transition-colors hover:bg-mf-gray-800 h-11"
              >
                Ver guías <ArrowRight size={16} />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-mf-gray-300 px-6 py-3 text-sm font-medium text-mf-black transition-colors hover:bg-mf-gray-100 h-11"
              >
                Empieza gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-mf-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: guides.length, label: "Guías disponibles" },
              { value: "+100", label: "Secciones prácticas" },
              { value: "0€", label: "Acceso gratuito" },
              { value: "B&W", label: "Sin distracciones" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-mf-black">{value}</p>
                <p className="text-sm text-mf-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-mf-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <h2 className="text-2xl font-bold text-mf-black text-center mb-12">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Elige tu guía",
                desc: "Selecciona entre guías de mentalidad, productividad, finanzas y más habilidades.",
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
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mf-black text-mf-white mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-mf-black mb-2">{title}</h3>
                <p className="text-sm text-mf-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-mf-black mb-4">
            La misión no se pausa.
          </h2>
          <p className="text-mf-gray-500 mb-8 max-w-md mx-auto">
            Únete gratis, elige tu primera guía y empieza a terminar lo que empiezas hoy.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-mf-black px-8 py-3 text-sm font-medium text-mf-white transition-colors hover:bg-mf-gray-800 h-11"
          >
            Empieza tu primera misión
          </Link>
        </div>
      </section>
    </>
  )
}
