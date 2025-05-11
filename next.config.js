/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true, // Aktifkan Strict Mode React
    
    eslint: {
      // Biar error dari ESLint tidak diabaikan saat build
      ignoreDuringBuilds: false,
    },
    typescript: {
      // Gagal build kalau ada error TypeScript
      ignoreBuildErrors: false,
    },
     images: {
    remotePatterns: [
     {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
    ],
  },
};


export default withFlowbiteReact(config);