import React, { useEffect, useState } from "react";

const SOURCES = {
  bbc: "BBC News",
  nypost: "New York Post",
  dailywire: "Daily Wire",
  breitbart: "Breitbart",
  outkick: "Outkick",
  techcrunch: "TechCrunch",
  marketwatch: "MarketWatch",
  yahoosports: "Yahoo Sports"
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [source, setSource] = useState("bbc");
  const [lastUpdated, setLastUpdated] = useState("");

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
      <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1">NewsNow</h1>
          <p className="text-sm text-gray-600">Last updated: {lastUpdated}</p>
        </div>
        <nav className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          {Object.entries(SOURCES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSource(key)}
              className={`px-4 py-2 rounded border text-sm ${
                source === key
                  ? "bg-gray-200 text-gray-900 border-gray-400"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 p-4 flex flex-col"
          >
            <img
              src={article.image || "/fallback.svg"}
              alt={article.title || "NewsNow Article"}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="font-semibold text-lg mb-1">{article.title}</h2>
            <p className="text-sm text-gray-500">
              {article.source} • {new Date(article.pubDate).toLocaleString()}
            </p>
          </a>
        ))}
      </main>

      <aside className="mt-10 flex flex-col gap-4 sm:w-64">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <p className="text-sm text-gray-600">Tweets by BBCBreaking</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Advertisement</h3>
          <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Ad Space
          </div>
        </div>
      </aside>
    </div>
  );
}