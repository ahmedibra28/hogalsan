/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'ui-avatars.com',
      'github.com',
      'qaranjobs.com',
      'goobjoog.com',
      'play-lh.googleusercontent.com',
      'pbs.twimg.com',
    ],
  },
}

module.exports = nextConfig
