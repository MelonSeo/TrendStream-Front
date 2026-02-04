'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getPopularNews } from '@/app/api';
import NewsList from '@/components/NewsList';
import Pagination from '@/components/Pagination';

function PopularContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['popular', page],
    queryFn: () => getPopularNews(page, 9),
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              인기 뉴스
            </h1>
          </div>
        </div>
        <p className="text-slate-500 ml-[52px]">
          AI 중요도 점수가 높은 뉴스를 확인하세요
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-500">인기 뉴스를 불러오는 중...</p>
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
          <p className="text-red-600 font-medium">{error?.message || '인기 뉴스를 불러오는데 실패했습니다'}</p>
        </div>
      )}

      {/* Content */}
      {!isLoading && !isError && data && (
        <>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-slate-500">
              총 <span className="font-semibold text-slate-700">{data.totalElements}</span>개의 인기 뉴스
            </span>
          </div>

          <NewsList newsList={data.content} />
          <Pagination totalPages={data.totalPages} />
        </>
      )}
    </div>
  );
}

export default function PopularPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    }>
      <PopularContent />
    </Suspense>
  );
}
