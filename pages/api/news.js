import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['media:content', 'enclosure']
  }
});

const FEED_SOURCES = {
  bbc: 'http://feeds.bbci.co.uk/news/rss.xml',
  reuters: 'http://feeds.reuters.com/reuters/topNews',
  guardian: 'https://www.theguardian.com/uk/rss',
  techcrunch: 'http://feeds.feedburner.com/TechCrunch/'
};

export default async function handler(req, res) {
  const { source = 'bbc' } = req.query;
  const feedUrl = FEED_SOURCES[source];

  if (!feedUrl) {
    return res.status(400).json({ error: 'Invalid or unsupported news source.' });
  }

  try {
    const feed = await parser.parseURL(feedUrl);

    const articles = feed.items.map(item => {
      let image = null;
      if (item['media:content'] && item['media:content']['$']?.url) {
        image = item['media:content']['$'].url;
      } else if (item.enclosure?.url) {
        image = item.enclosure.url;
      }

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: feed.title,
        image
      };
    });

    res.status(200).json({ articles });
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
}
