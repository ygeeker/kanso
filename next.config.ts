import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src https://giscus.app;",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Locale migration redirects
      {
        source: "/zh-CN",
        destination: "/zh",
        permanent: true,
      },
      {
        source: "/zh-CN/:path*",
        destination: "/zh/:path*",
        permanent: true,
      },
      {
        source: "/en-US",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en-US/:path*",
        destination: "/en/:path*",
        permanent: true,
      },
      // Social links
      {
        source: "/s/twitter",
        destination: "https://twitter.com/rea1DonandTrump",
        permanent: true,
      },
      {
        source: "/s/pixiv",
        destination: "https://www.pixiv.net/en/users/35572742",
        permanent: true,
      },
      {
        source: "/rss",
        destination: "https://rene.wang/rss/feed.xml",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
