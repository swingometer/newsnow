import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";

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

  useEffect(() => {
    async function fetchAllNews() {
      let allStories = [];
      for (const source of Object.keys(SOURCES)) {
        const res = await fetch(`/api/news?source=${source}`);
        const data = await res.json();
        const sourceStories = (data.articles || []).slice(0, 3).map(a => ({
          ...a,
          sourceName: SOURCES[source]
        }));
        allStories = allStories.concat(sourceStories);
      }
      setArticles(allStories);
    }
    fetchAllNews();
  }, []);

  return (
    <main className="max-w-screen-xl mx-auto px-4 my-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles.map((article, index) => (
          <ArticleCard article={article} key={index} />
        ))}
      </div>
    </main>
  );
}