/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingExcludes: {
    "app/photo/[category]/page.js": ["./public/fotografi/**"],
  },
};

export default nextConfig;
