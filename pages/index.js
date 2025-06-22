import React, { useEffect, useState } from "react";

const SOURCES = {
  bbc: "BBC News",
  nypost: "New York Post",
  dailywire: "Daily Wire",
  breitbart: "Breitbart",
  outkick: "Outkick",
  techcrunch: "TechCrunch",
  marketwatch: "MarketWatch",
  dailysignal: "Daily Signal",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="max-w-screen-xl mx-auto px-4 py-6 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">NewsNow</h1>
            <p className="text-sm text-gray-600">Your Daily Source for News, Sports & More</p>
            <p className="text-xs text-gray-400 mt-1">Last updated: {lastUpdated}</p>
          </div>
          <nav className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            {Object.entries(SOURCES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSource(key)}
                className={`px-4 py-2 rounded border text-sm transition ${
                  source === key
                    ? "bg-gray-200 text-gray-900 border-gray-400"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-screen-xl mx-auto px-4 my-8">

        {/* 🔵 Tailwind test box */}
        <div className="bg-blue-500 text-white p-4 rounded mb-6">
          Tailwind is working 🎉
        </div>

        {/* Article Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <img
                src={article.image || "/fallback.svg"}
                alt={article.title || "NewsNow Article"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1 flex items-center">
                  {article.title}
                  {article.pubDate &&
                    new Date() - new Date(article.pubDate) < 3600000 && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded">
                        NEW
                      </span>
                    )}
                </h2>
                <p className="text-sm text-gray-500">
                  {article.source} • {new Date(article.pubDate).toLocaleString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-screen-xl mx-auto px-4 py-6 border-t text-center text-sm text-gray-500 space-x-4">
        <a href="#" className="hover:text-gray-700">About</a>
        <a href="#" className="hover:text-gray-700">Privacy Policy</a>
        <span>© {new Date().getFullYear()} NewsNow</span>
      </footer>
    </div>
  );
}
