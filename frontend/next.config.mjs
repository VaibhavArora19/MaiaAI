/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => {
    return [
      {
        // adjust ":path*" as needed
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@xmtp/wasm-bindings"],
  },
};

export default nextConfig;
