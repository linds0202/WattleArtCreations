/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true
  },
}

module.exports = nextConfig

