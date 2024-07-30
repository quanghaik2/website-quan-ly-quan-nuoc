// src/next.config.js
module.exports = {
    experimental: {
        appDir: true, // Enable app directory feature if using it
    },
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/',
                permanent: false,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/login',
                destination: '/',
            },
        ];
    },
};
