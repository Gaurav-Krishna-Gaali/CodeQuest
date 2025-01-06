/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.tenor.com',
            },
            {
                protocol: 'https',
                hostname: 'g.tenor.com',
            },
        ]
        // domains: ['g.tenor.com', 'media.tenor.com']
    },
};

export default nextConfig;
