import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    experimental: {
        optimizePackageImports: ["@tabler/icons-react"],
    }
};

export default withNextIntl(nextConfig);