module.exports = {
  siteUrl: "https://www.volleyscore.co.uk",
  generateRobotsTxt: true, // (optional)
  // /setup is noindexed while the official match flow is unfinished, so it
  // should not be submitted either. Not disallowed in robots.txt, or the
  // noindex on the page would never be crawled.
  exclude: ["/setup"],
  // Additional options
};
