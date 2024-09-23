/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // For handling PDF files
    config.module.rules.push({
      test: /\.(mp3|wav)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    });
    // Handle any other webpack configurations you need to merge
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
