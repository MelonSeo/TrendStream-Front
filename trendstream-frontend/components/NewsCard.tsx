import { NewsResponseDto } from "@/app/types";
import Link from "next/link";
import SentimentBadge from "./SentimentBadge";
import ScoreBadge from "./ScoreBadge";

export default function NewsCard({ news }: { news: NewsResponseDto }) {
  const formattedDate = new Date(news.pubDate).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });

  const typeColors: Record<string, string> = {
    NEWS: 'bg-blue-100 text-blue-700',
    BLOG: 'bg-purple-100 text-purple-700',
    COMMUNITY: 'bg-green-100 text-green-700',
  };

  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
      {/* Card Header */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${typeColors[news.type] || 'bg-slate-100 text-slate-700'}`}>
              {news.type}
            </span>
            <span className="text-slate-400 text-xs">{formattedDate}</span>
          </div>
          {news.aiResult ? (
            <ScoreBadge score={news.aiResult.score} />
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              분석 중
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="mb-3">
          <Link
            href={`/news/${news.id}`}
            className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
          >
            {news.title}
          </Link>
        </h2>

        {/* Summary */}
        {news.aiResult ? (
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
            {news.aiResult.summary}
          </p>
        ) : (
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 italic">
            AI가 뉴스를 분석하고 있습니다...
          </p>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5">
        {/* Keywords */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {news.aiResult?.keywords?.slice(0, 3).map((keyword, index) => (
              <Link
                key={index}
                href={`/news/tag?name=${encodeURIComponent(keyword.toLowerCase())}`}
                className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium truncate hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                {keyword}
              </Link>
            ))}
            {!news.aiResult && (
              <>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-400 text-xs">
                  <span className="w-12 h-3 bg-slate-200 rounded animate-pulse"></span>
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-400 text-xs">
                  <span className="w-10 h-3 bg-slate-200 rounded animate-pulse"></span>
                </span>
              </>
            )}
          </div>
          {news.aiResult && <SentimentBadge sentiment={news.aiResult.sentiment} />}
        </div>

        {/* Source & Link */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400 truncate">{news.source}</span>
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            원문 보기
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
