import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is1-ssl.mzstatic.com",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    const linkHeader = [
      `</.well-known/api-catalog>; rel="api-catalog"`,
      `</.well-known/agent-skills/index.json>; rel="describedby"`,
      `</llms.txt>; rel="alternate"; type="text/plain"`,
      `</.well-known/openapi/chat.json>; rel="service-desc"; type="application/openapi+json"`,
      `</docs/api/chat>; rel="service-doc"`,
    ].join(", ");

    return [
      {
        source: "/",
        headers: [{ key: "Link", value: linkHeader }],
      },
    ];
  },
};

export default nextConfig;
