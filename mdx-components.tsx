import type { MDXComponents } from "mdx/types"
import { CopyButton } from "@/components/CopyButton"

function PromptTemplate({ children, label }: { children: string; label?: string }) {
  const content = typeof children === "string" ? children.trim() : ""
  return (
    <div className="prompt-block not-prose">
      <div className="prompt-block-header">
        <span>{label || "PROMPT"}</span>
        <CopyButton text={content} />
      </div>
      <div className="prompt-block-content">{content}</div>
    </div>
  )
}

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-12 mb-6 text-4xl font-bold tracking-tight text-mf-black dark:text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-mf-black dark:text-white border-b border-mf-gray-200 dark:border-[#333] pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-mf-black dark:text-white">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-mf-gray-800 dark:text-[#d4d4d4]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-mf-gray-800 dark:text-[#d4d4d4]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-mf-gray-800 dark:text-[#d4d4d4]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-mf-black dark:text-white">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-mf-black dark:text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-mf-black dark:border-white pl-4 italic text-mf-gray-600 dark:text-[#a3a3a3]">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="rounded bg-mf-gray-100 dark:bg-[#1a1a1a] px-1.5 py-0.5 text-sm font-mono text-mf-black dark:text-[#e5e5e5]">
          {children}
        </code>
      )
    }
    return (
      <code className={className}>{children}</code>
    )
  },
  pre: ({ children }) => {
    return (
      <div className="relative my-6 group">
        <pre>{children}</pre>
      </div>
    )
  },
  hr: () => <hr className="my-8 border-mf-gray-200 dark:border-[#333]" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-mf-gray-200 dark:border-[#333] text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-mf-gray-200 dark:border-[#333] bg-mf-gray-100 dark:bg-[#1a1a1a] px-4 py-2 text-left font-semibold text-mf-black dark:text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-mf-gray-200 dark:border-[#333] px-4 py-2 text-mf-gray-800 dark:text-[#d4d4d4]">
      {children}
    </td>
  ),
  PromptTemplate,
}

export function useMDXComponents(): MDXComponents {
  return components
}
