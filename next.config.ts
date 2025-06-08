/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  images: {
    domains: ["maps.googleapis.com", "maps.gstatic.com"],
  },
  // Importante para o Google Maps
  transpilePackages: ["@react-google-maps/api"],
};

module.exports = nextConfig;
