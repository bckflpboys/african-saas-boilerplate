/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    CLOUDINARY_CLOUD_NAME: 'dplophecq',
    CLOUDINARY_API_KEY: '888892243267663',
    CLOUDINARY_API_SECRET: '6ogzb-mFNqSplBIF7mXA89xXZKQ',
  },
}

module.exports = nextConfig
