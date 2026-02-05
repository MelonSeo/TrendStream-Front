'use client';

import { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '@/app/api';
import TrendCard from '@/components/TrendCard';

const PERIODS = [
  { label: '24시간', value: '24h' },
  { label: '7일', value: '7d' },
  { label: '30일', value: '30d' },
] as const;

function TrendsContent() {
  const [period, setPeriod] = useState<string>('24h');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trends', period],
    queryFn: () => getTrends(period, 10),
  });

  const maxCount = data ? Math.max(...data.map((t) => t.count), 1) : 1;

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              트렌드
            </h1>
          </div>
        </div>
        <p className="text-slate-500 ml-[52px]">
          지금 가장 많이 언급되는 IT 키워드를 확인하세요
        </p>
      </div>

      {/* Period Tabs */}
      <div className="flex items-center gap-2 mb-8">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              period === p.value
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 border border-slate-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-500">트렌드를 분석하는 중...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium">{error?.message || '트렌드를 불러오는데 실패했습니다'}</p>
        </div>
      )}

      {/* Content */}
      {!isLoading && !isError && data && (
        <>
          {data.length > 0 ? (
            <div className="space-y-3">
              {data.map((trend, index) => (
                <TrendCard
                  key={trend.keyword}
                  trend={trend}
                  rank={index + 1}
                  maxCount={maxCount}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">해당 기간에 트렌드 데이터가 없습니다</p>
              <p className="text-slate-400 text-sm mt-1">다른 기간을 선택해 보세요</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TrendsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    }>
      <TrendsContent />
    </Suspense>
  );
}
