import Image from "next/image";

export default function ArticleCard({ article }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 overflow-hidden"
    >
      <Image
        src={article.image || "/fallback.svg"}
        alt={article.title || "NewsNow Article"}
        width={400}
        height={192}
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
  );
}