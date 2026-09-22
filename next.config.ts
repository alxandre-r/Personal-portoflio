import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Required because the root layout lives under the [lang] dynamic
    // segment (for i18n) — Next.js can't compose a normal not-found.js
    // chain in that case, so a dedicated global-not-found.tsx is used
    // instead. See docs/app/api-reference/file-conventions/not-found.md.
    globalNotFound: true,
  },
};

export default nextConfig;
