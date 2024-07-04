import withMDX from '@next/mdx';

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      };
    }

    config.ignoreWarnings = [
      (warning) =>
        warning.message.includes('dynamic require') ||
        warning.message.includes('cannot resolve'),
    ];

    return config;
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default mdxConfig(nextConfig);
