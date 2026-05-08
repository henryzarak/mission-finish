"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors bg-mf-gray-200 dark:bg-[#333] text-mf-gray-700 dark:text-[#d4d4d4] hover:bg-mf-gray-300 dark:hover:bg-[#444]"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copiado" : "Copiar"}
    </button>
  )
}
