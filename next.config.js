/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Allow inline SVGs and graceful media fallback.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;