/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.scdn.co',
        },
      ],
    },
    matcher: '/site/:path*',
  }

module.exports = nextConfig
