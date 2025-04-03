import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", 'images.unsplash.com', "avon-demo.myshopify.com"],
  },

  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;