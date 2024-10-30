/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    /* loader: "custom",
    loaderFile: "./src/sanity/imageLoader.ts", */
  },
};

export default nextConfig;
