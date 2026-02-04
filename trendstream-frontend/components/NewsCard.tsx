import { NewsResponseDto } from "@/app/types";
import Link from "next/link";
import SentimentBadge from "./SentimentBadge";
import ScoreBadge from "./ScoreBadge";

export default function NewsCard({ news }: { news: NewsResponseDto }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-gray-500">{new Date(news.pubDate).toLocaleDateString()}</span>
          {news.aiResult && <ScoreBadge score={news.aiResult.score} />}
        </div>
        <h2 className="text-xl font-bold mb-2 h-16 overflow-hidden">
          <Link href={`/news/${news.id}`} className="text-gray-800 hover:text-blue-600">
            {news.title}
          </Link>
        </h2>
        {news.aiResult && (
          <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">
            {news.aiResult.summary}
          </p>
        )}
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {news.aiResult?.keywords.map((keyword, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded-full">
                {keyword}
              </span>
            ))}
          </div>
          {news.aiResult && <SentimentBadge sentiment={news.aiResult.sentiment} />}
        </div>
        <div className="mt-4">
          <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
            Read original
          </a>
        </div>
      </div>
    </div>
  );
}
