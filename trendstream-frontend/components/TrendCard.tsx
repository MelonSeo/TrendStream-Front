'use client';

import { useState } from 'react';
import { TrendResponseDto } from '@/app/types';
import Link from 'next/link';

interface TrendCardProps {
  trend: TrendResponseDto;
  rank: number;
  maxCount: number;
}

export default function TrendCard({ trend, rank, maxCount }: TrendCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const barWidth = maxCount > 0 ? (trend.count / maxCount) * 100 : 0;

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-500/30';
    if (rank === 2) return 'bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-lg shadow-slate-400/30';
    if (rank === 3) return 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-500/30';
    return 'bg-slate-100 text-slate-600';
  };

  const getBarColor = (rank: number) => {
    if (rank === 1) return 'from-purple-500 to-blue-500';
    if (rank === 2) return 'from-blue-400 to-cyan-400';
    if (rank === 3) return 'from-cyan-400 to-teal-400';
    return 'from-slate-300 to-slate-400';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center gap-4 text-left hover:bg-slate-50/50 transition-colors"
      >
        {/* Rank Badge */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${getRankStyle(rank)}`}>
          {rank}
        </div>

        {/* Keyword & Bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-800 text-base truncate">
              {trend.keyword}
            </span>
            <span className="text-sm font-medium text-slate-500 shrink-0 ml-3">
              {trend.count}회
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getBarColor(rank)} transition-all duration-500`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>

        {/* Toggle Icon */}
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Related News Accordion */}
      {isOpen && trend.relatedNews.length > 0 && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 animate-fade-in">
          <div className="border-t border-slate-100 pt-3">
            <p className="text-xs text-slate-400 font-medium mb-2.5 uppercase tracking-wider">관련 뉴스</p>
            <ul className="space-y-2">
              {trend.relatedNews.map((news) => (
                <li key={news.id}>
                  <Link
                    href={`/news/${news.id}`}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 mt-0.5 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {news.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isOpen && trend.relatedNews.length === 0 && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 animate-fade-in">
          <div className="border-t border-slate-100 pt-3">
            <p className="text-sm text-slate-400 text-center py-2">관련 뉴스가 없습니다</p>
          </div>
        </div>
      )}
    </div>
  );
}
