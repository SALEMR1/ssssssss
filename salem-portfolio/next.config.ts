import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix Turbopack workspace root detection for Next.js 16
  turbopack: {
    root: process.cwd(),
  },

  // Increase memory for workers during static generation
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // Compress responses
  compress: true,

  // Power by header removed for security
  poweredByHeader: false,

  images: {
    // Use modern formats for smaller file sizes
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // HSTS — force HTTPS for 1 year, include subdomains
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + GA/GTM inline init
              // unsafe-eval is needed by React in development mode only — no effect in production
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
              // Styles: self + inline (Tailwind CSS-in-JS)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: self + ImageKit CDN + GA pixel + data URIs
              "img-src 'self' data: https://ik.imagekit.io https://www.google-analytics.com https://www.googletagmanager.com",
              // Fonts: self + Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Frames: Facebook embeds only
              "frame-src 'self' https://*.facebook.com https://*.fbcdn.net https://facebook.com",
              // XHR/fetch: self + Resend API + GA
              "connect-src 'self' https://api.resend.com https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://ik.imagekit.io",
              // Media: self + ImageKit
              "media-src 'self' https://ik.imagekit.io",
              // No plugins
              "object-src 'none'",
              // No base tag hijacking
              "base-uri 'self'",
              // Forms only to self
              "form-action 'self'",
            ].join("; "),
          },
          // Performance
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Service worker must never be cached — always fetch fresh
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
