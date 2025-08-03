/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      loader: 'akamai',
      path: '',
  },
  assetPrefix: './',
  experimental: {
      outputFileTracing: true,
  },
};

export default nextConfig;
