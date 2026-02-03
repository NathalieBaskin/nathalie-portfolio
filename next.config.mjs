/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingExcludes: {
    "app/photo/[category]/page.js": ["./public/fotografi/**"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-ff3078a376e0426785394f30bba2fe21.r2.dev",
      },
    ],
  },
};

export default nextConfig;
