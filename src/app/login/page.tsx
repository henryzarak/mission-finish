import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-mf-black">Entrar</h1>
        <p className="text-sm text-mf-gray-500 mt-2">
          Continúa tu misión donde la dejaste.
        </p>
      </div>

      <form
        action="/auth/login"
        method="POST"
        className="space-y-4"
      >
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
          placeholder="••••••••"
          required
        />
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-mf-gray-500">
        ¿No tienes cuenta?{" "}
        <Link href="/signup" className="font-medium text-mf-black underline underline-offset-4 hover:opacity-70">
          Regístrate
        </Link>
      </p>
    </div>
  )
}
