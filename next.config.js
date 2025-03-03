/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '192.168.79.104:3000'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    CLOUDINARY_CLOUD_NAME: 'dplophecq',
    CLOUDINARY_API_KEY: '888892243267663',
    CLOUDINARY_API_SECRET: '6ogzb-mFNqSplBIF7mXA89xXZKQ',
  },
}

module.exports = nextConfig
