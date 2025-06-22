const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nypost.com",
      },
      {
        protocol: "https",
        hostname: "pagesix.com",
      },
      {
        protocol: "https",
        hostname: "dw-wp-production.imgix.net",
      },
      {
        protocol: "https",
        hostname: "blogger.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media.zenfs.com",
      },
      // Add more as needed!
    ],
  },
};

module.exports = nextConfig;