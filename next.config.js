/** @type {import('next').NextConfig} */
FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || 'localhost';
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [FRONTEND_DOMAIN],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    port: process.env.PORT || 3000
  }
};

module.exports = nextConfig;
