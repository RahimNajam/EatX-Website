/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Let phones/tablets on the local network load the dev server (e.g. http://192.168.1.11:3000).
  // Without this, Next blocks the dev JS for LAN IPs, the page never hydrates and the preloader never exits.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    // AVIF first (smallest), WebP fallback; the browser's Accept header picks
    formats: ["image/avif", "image/webp"],
    // Optimized variants are immutable per source, cache them for 30 days
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
