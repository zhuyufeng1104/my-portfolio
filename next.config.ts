import type { NextConfig } from "next";

const basePath = process.env.PORTFOLIO_BASE_PATH ?? "";
const config: NextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  ...(process.env.PORTFOLIO_STATIC_EXPORT === "1"
    ? { output: "export" as const, trailingSlash: true }
    : {}),
};
export default config;
