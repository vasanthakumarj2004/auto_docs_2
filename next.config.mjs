/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  allowedDevOrigins: ['100.97.139.98'],
  async redirects() {
    return [
      {
        source: '/business-owners',
        destination: '/finance-desk/business-owners/',
        permanent: true,
      },
      {
        source: '/finance-teams',
        destination: '/finance-desk/finance-teams/',
        permanent: true,
      },
      {
        source: '/accounts-teams',
        destination: '/finance-desk/accounts-teams/',
        permanent: true,
      },
      {
        source: '/ca-firms',
        destination: '/finance-desk/ca-firms/',
        permanent: true,
      },
      {
        source: '/demo',
        destination: '/finance-desk/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
