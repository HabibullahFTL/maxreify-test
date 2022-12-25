/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "x8ki-letl-twmt.n7.xano.io",
        port: '',
        pathname: '/vault/EWYWdDtr/y9HfmJSWXAG55UltLrw3pRwOVkE/zWyaXw../',
      }
    ],
  }
}

module.exports = nextConfig
