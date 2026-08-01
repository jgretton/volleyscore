/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /basic-match was the original route name and was indexed before the
      // rename to /match — keep old links and search results working.
      {
        source: "/basic-match",
        destination: "/match",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
