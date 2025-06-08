import Parser from "rss-parser";

const parser = new Parser();

const FEEDS = {
  bbc: "http://feeds.bbci.co.uk/news/rss.xml",
  nypost: "https://nypost.com/feed/",
  dailywire: "https://www.dailywire.com/feeds/rss.xml",
  breitbart: "https://feeds.feedburner.com/breitbart",
  outkick: "https://www.outkick.com/feed/",
  techcrunch: "http://feeds.feedburner.com/TechCrunch/",
  marketwatch: "https://feeds.marketwatch.com/marketwatch/topstories/",
  lifesitenews: "https://www.lifesitenews.com/rss/news",
  yahoosports: "https://sports.yahoo.com/rss/"
};

export default async function handler(req, res) {
  const { source } = req.query;

  if (!FEEDS[source]) {
    return res.status(400).json({ error: "Invalid source" });
  }

  try {
    const feed = await parser.parseURL(FEEDS[source]);

    const articles = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: feed.title,
      image: item.enclosure?.url || extractImage(item.content) || null
    }));

    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ error: "Failed to fetch feed" });
  }
}

function extractImage(content) {
  if (!content) return null;
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}
