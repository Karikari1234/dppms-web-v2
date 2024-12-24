/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
  },
  env: {
    TEST_API_URL: process.env.TEST_API_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "127.0.0.1:3000",
        "info.bpdbservices.net",
        "prepaid.bpdbservices.net",
        "127.0.0.1:3001",
        "0.0.0.0",
      ],
    },
  },
};

module.exports = nextConfig;
