/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  allowedDevOrigins: ['100.97.139.98'],
};

export default nextConfig;
