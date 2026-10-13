import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Project page bodies are MDX files imported from content/projects/.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    // Required because the root layout lives under the [lang] dynamic
    // segment (for i18n) — Next.js can't compose a normal not-found.js
    // chain in that case, so a dedicated global-not-found.tsx is used
    // instead. See docs/app/api-reference/file-conventions/not-found.md.
    globalNotFound: true,
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings so the config stays serializable for Turbopack.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
