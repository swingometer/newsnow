import React, { useEffect, useState } from "react";

const SOURCES = {
  bbc: "BBC News",
  nypost: "New York Post",
  dailywire: "Daily Wire",
  breitbart: "Breitbart",
  outkick: "Outkick",
  techcrunch: "TechCrunch",
  marketwatch: "MarketWatch",
  lifesitenews: "LifeSite News",
  yahoosports: "Yahoo Sports"
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [source, setSource] = useState("bbc");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news?source=${source}`);
        const data = await res.json();
        setArticles(data.articles || []);
        setLastUpdated(new Date().toLocaleString());
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    }

    fetchNews();
  }, [source]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 border-b pb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NewsNow</h1>
          <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>
        <nav className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {Object.entries(SOURCES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSource(key)}
              className={`px-3 py-1 rounded border ${
                source === key
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row gap-4">
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded p-4 hover:shadow transition"
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover mb-2 rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback.svg";
                  }}
                />
              ) : (
                <img
                  src="/fallback.jpg"
                  alt="fallback"
                  className="w-full h-48 object-cover mb-2 rounded"
                />
              )}
              <h2 className="font-bold text-lg mb-1">{article.title}</h2>
              <p className="text-sm text-gray-600">
                {article.source} • {article.pubDate}
              </p>
            </a>
          ))}
        </main>

        <aside className="w-full lg:w-64 flex flex-col gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <p>Tweets by BBCBreaking</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Advertisement</h3>
            <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500">
              Ad Space
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
