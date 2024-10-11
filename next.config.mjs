/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_HOST: process.env.APP_HOST,
    NEXT_PUBLIC_WEBSOCKET_HOST: process.env.WEBSOCKET_HOST,
  },
};

export default nextConfig;
