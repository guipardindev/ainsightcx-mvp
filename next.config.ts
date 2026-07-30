import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Há outros lockfiles acima desta pasta; fixa a raiz do workspace neste projeto.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
