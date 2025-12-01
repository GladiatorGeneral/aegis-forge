/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@phnxforge/mathematics-engine', '@phnxforge/common'],
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig;
