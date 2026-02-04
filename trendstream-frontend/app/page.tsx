'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getNews } from './api';
import NewsList from '@/components/NewsList';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';

function HomeContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['news', page],
    queryFn: () => getNews(page, 9),
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-600 to-purple-600"></div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            최신 IT 뉴스
          </h1>
        </div>
        <p className="text-slate-500 ml-5">
          AI가 분석한 최신 기술 트렌드와 뉴스를 확인하세요
        </p>
      </div>

      {/* Search */}
      <SearchBar />

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-500">뉴스를 불러오는 중...</p>
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
          <p className="text-red-600 font-medium">{error?.message || '뉴스를 불러오는데 실패했습니다'}</p>
          <p className="text-red-500 text-sm mt-1">잠시 후 다시 시도해주세요</p>
        </div>
      )}

      {/* Content */}
      {!isLoading && !isError && data && (
        <>
          {/* Stats */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-slate-500">
              총 <span className="font-semibold text-slate-700">{data.totalElements}</span>개의 뉴스
            </span>
            {data.totalPages > 1 && (
              <span className="text-sm text-slate-400">
                · 페이지 {page + 1} / {data.totalPages}
              </span>
            )}
          </div>

          <NewsList newsList={data.content} />
          <Pagination totalPages={data.totalPages} />
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
