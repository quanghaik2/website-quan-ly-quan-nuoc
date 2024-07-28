/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'cookie',
              key: 'authToken',
            },
          ],
          destination: '/login',
          permanent: false,
        },
      ];
    },
};

export default nextConfig;
