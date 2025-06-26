/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    deviceSizes: [640, 750, 828],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "get.musti.media",
      },
      {
        protocol: "https",
        hostname: "vetapotek.se",
      },
      {
        protocol: "https",
        hostname: "cdn11.bigcommerce.com",
      },
    ],
    /* loader: "custom",
    loaderFile: "./src/sanity/imageLoader.ts", */
  },
};

export default nextConfig;
