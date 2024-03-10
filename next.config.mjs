/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/auth/(login|sign-up)',
        destination: '/',
        has: [
          { type: 'cookie', key: 'authenticated', value: 'true' },
        ],
        permanent: true
      },
      {
        source: '/[slug]/edit',
        destination: '/login',
        missing: [
          { type: 'cookie', key: 'authenticated', value: 'true' },
        ],
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frontend-test-api.yoldi.agency',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
