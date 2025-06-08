import React, { useEffect, useState } from "react";

const SOURCES = {
  bbc: "BBC News",
  reuters: "Reuters",
  guardian: "The Guardian",
  techcrunch: "TechCrunch"
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [source, setSource] = useState("bbc");

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news?source=${source}`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    }

    fetchNews();
  }, [source]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white shadow p-6 mb-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight">NewsNow</h1>
          <nav className="flex space-x-2">
            {Object.entries(SOURCES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSource(key)}
                className={`text-sm px-3 py-2 rounded border ${
                  source === key
                    ? 'bg-gray-200 border-gray-400 font-semibold'
                    : 'bg-white border-gray-300 hover:bg-gray-100'
                } transition`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt=""
                  className="w-full h-48 object-cover mb-3"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold leading-snug mb-2">{article.title}</h2>
                <p className="text-xs text-gray-500">
                  {article.source} • {new Date(article.pubDate).toLocaleString()}
                </p>
              </div>
            </a>
          ))}
        </section>

        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-bold mb-2">Follow Us</h3>
            <a
              className="twitter-timeline"
              data-height="400"
              href="https://twitter.com/BBCBreaking?ref_src=twsrc%5Etfw"
            >
              Tweets by BBCBreaking
            </a>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-bold mb-2">Advertisement</h3>
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
              Ad Space
            </div>
          </div>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto text-center p-6 text-sm text-gray-500 border-t mt-6">
        © 2025 NewsNow. All rights reserved.
      </footer>

      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  );
}
