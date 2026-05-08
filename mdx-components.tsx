import type { MDXComponents } from "mdx/types"

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-12 mb-6 text-4xl font-bold tracking-tight text-mf-black">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-mf-black border-b border-mf-gray-200 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-mf-black">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-mf-gray-800">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-mf-gray-800">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-mf-gray-800">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-mf-black">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-mf-black underline underline-offset-4 hover:opacity-70 transition-opacity"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-mf-black pl-4 italic text-mf-gray-600">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-mf-gray-100 px-1.5 py-0.5 text-sm font-mono text-mf-black">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-mf-gray-200 bg-mf-gray-100 p-4 text-sm">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-8 border-mf-gray-200" />,
}

export function useMDXComponents(): MDXComponents {
  return components
}
