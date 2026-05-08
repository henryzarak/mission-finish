import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-mf-black">Empieza tu misión</h1>
        <p className="text-sm text-mf-gray-500 mt-2">
          Crea tu cuenta gratis y accede a todas las guías.
        </p>
      </div>

      <form
        action="/auth/signup"
        method="POST"
        className="space-y-4"
      >
        <Input
          id="name"
          name="name"
          type="text"
          label="Nombre"
          placeholder="Tu nombre"
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="tu@email.com"
          required
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          required
        />
        <Button type="submit" className="w-full">
          Crear cuenta gratis
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-mf-gray-500">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-mf-black underline underline-offset-4 hover:opacity-70">
          Entrar
        </Link>
      </p>
    </div>
  )
}
