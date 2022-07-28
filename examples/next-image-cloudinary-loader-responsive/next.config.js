/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'cloudinary',
    path: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}`,
    deviceSizes: [480, 1024, 1600, 2000],
    imageSizes: [16, 32, 48, 64]
  }
}

module.exports = nextConfig
