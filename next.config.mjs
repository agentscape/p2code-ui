/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/maestro/:path*",        // The local path your frontend will call
        destination: "https://maestro.euprojects.net/tmf-api/:path*", // The actual API endpoint
      },
      {
        source: "/openslice/:path*",
        destination: "https://openslice-1.euprojects.net/tmf-api/:path*"
      }
    ];
  },
};

export default nextConfig;
