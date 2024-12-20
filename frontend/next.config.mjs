const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${BACKEND_URL}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
