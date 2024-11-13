import createNextIntlPlugin from 'next-intl/plugin';
import createNextBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = createNextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    experimental: {
        // optimizePackageImports: ["@tabler/icons-react"],
    },
    transpilePackages: ['@aio/db'],
};

export default withBundleAnalyzer(withNextIntl(nextConfig));