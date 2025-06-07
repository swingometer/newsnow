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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">NewsNow</h1>
        <nav className="space-x-4">
          {Object.entries(SOURCES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSource(key)}
              className={`text-sm px-3 py-1 rounded ${
                source === key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              {article.image && (
                <img src={article.image} alt="" className="mb-3 rounded-md w-full object-cover h-40" />
              )}
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {article.source} • {new Date(article.pubDate).toLocaleString()}
              </p>
            </a>
          ))}
        </section>

        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-md font-bold mb-2">Follow Us</h3>
            <a className="twitter-timeline" data-height="400" href="https://twitter.com/BBCBreaking?ref_src=twsrc%5Etfw">Tweets by BBCBreaking</a>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-md font-bold mb-2">Advertisement</h3>
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
              Ad Space
            </div>
          </div>
        </aside>
      </main>

      <footer className="bg-white text-center p-4 text-sm text-gray-500 border-t">
        © 2025 NewsNow. All rights reserved.
      </footer>

      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  );
}
