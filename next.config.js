/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: "/home/client",
                destination: "/home",
                permanent: true,
            },
            {
                source: "/home/clientpolicy",
                destination: "/home",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
