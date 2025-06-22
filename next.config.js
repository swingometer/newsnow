/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "nypost.com",
            "pagesix.com",
      // Add more domains as you add more news sources:
      "bbc.co.uk",
      "ichef.bbci.co.uk",
      "media.breitbart.com",
      "outkick.com",
      "techcrunch.com",
      "marketwatch.com",
      "dailysignal.com",
      "s.yimg.com", // Yahoo Sports images
      // ...etc.
    ],
  },
  // other Next.js config options can go here
};

module.exports = nextConfig;