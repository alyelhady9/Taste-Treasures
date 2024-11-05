/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'akamai',
        path: '',
        unoptimized: true,
    },
    assetPrefix: '/',
};
module.exports = {
  images: {
    domains: ['your-domain.com'], // Add your image domains here
  },
};
export default nextConfig;
