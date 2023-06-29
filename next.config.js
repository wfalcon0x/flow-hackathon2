/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    
    config.module.rules.push({
      test: /\.cdc$/,
      loader: "raw-loader",
    })

    return config;
  }
}

module.exports = nextConfig
