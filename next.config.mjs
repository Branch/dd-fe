/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
