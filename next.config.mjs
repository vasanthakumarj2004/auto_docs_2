/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build',
  trailingSlash: true,
  experimental: {
    cpus: 1,
  },
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
  allowedDevOrigins: ['100.97.139.98', '192.168.206.1', '192.168.0.100/'],
};

// Next.js warns when "headers" or "redirects" are defined alongside "output: 'export'".
// In static export mode, headers and redirects are handled via public/_redirects, public/.htaccess, and public/_headers.
// Only attach them if running in server mode (e.g. during standard dev or dynamic hosting).
if (nextConfig.output !== 'export') {
  nextConfig.headers = async function headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
              "media-src 'self' data: blob:",
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://*.supabase.co https://api.emailjs.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  };

  nextConfig.redirects = async function redirects() {
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
        source: '/RFQ-to-booking',
        destination: '/logistics-desk/RFQ-to-booking/',
        permanent: true,
      },
      {
        source: '/email-to-booking',
        destination: '/logistics-desk/RFQ-to-booking/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs/',
        permanent: true,
      },
      {
        source: '/blog/:slug+',
        destination: '/blogs/:slug+/',
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
      {
        source: '/invoice-processing',
        destination: '/finance-desk/invoice-processing/',
        permanent: true,
      },
      {
        source: '/invoice-automation',
        destination: '/finance-desk/invoice-processing/',
        permanent: true,
      },
    ];
  };
}

export default nextConfig;
