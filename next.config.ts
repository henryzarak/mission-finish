import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "meta" }],
    ],
    rehypePlugins: [
      ["rehype-pretty-code", {
        theme: { light: "github-light", dark: "github-dark" },
        defaultLang: "plaintext",
        keepBackground: false,
      }],
    ],
  },
})

export default withMDX(nextConfig)
