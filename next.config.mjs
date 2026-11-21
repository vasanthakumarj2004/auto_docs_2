/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-5WXXVPGWG6',
    NEXT_PUBLIC_APP_ENV:
      process.env.NEXT_PUBLIC_APP_ENV || 'development',
    NEXT_PUBLIC_GA_DEBUG_MODE:
      process.env.NEXT_PUBLIC_GA_DEBUG_MODE || 'true',
  },
  allowedDevOrigins: ['100.97.139.98','192.168.206.1', '192.168.0.100/'],
  async redirects() {
    return [
      {
        source: '/logistics',
        destination: '/logistics-desk/',
        permanent: true,
      },
      {
        source: '/logistics/:path+',
        destination: '/logistics-desk/:path+/',
        permanent: true,
      },
      {
        source: '/finance',
        destination: '/finance-desk/',
        permanent: true,
      },
      {
        source: '/finance/:path+',
        destination: '/finance-desk/:path+/',
        permanent: true,
      },
      {
        source: '/email-to-booking',
        destination: '/logistics-desk/email-to-booking/',
        permanent: true,
      },
      {
        source: '/shipment-operations',
        destination: '/logistics-desk/shipment-operations/',
        permanent: true,
      },
      {
        source: '/shipment-tracking',
        destination: '/logistics-desk/shipment-tracking/',
        permanent: true,
      },
      {
        source: '/freight-intelligence',
        destination: '/logistics-desk/freight-intelligence/',
        permanent: true,
      },
      {
        source: '/integrations',
        destination: '/logistics-desk/integrations/',
        permanent: true,
      },
      {
        source: '/accounts-payable',
        destination: '/finance-desk/accounts-payable/',
        permanent: true,
      },
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
    ];
  },
};

export default nextConfig;