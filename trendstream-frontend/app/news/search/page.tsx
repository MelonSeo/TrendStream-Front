'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { searchNews } from '@/app/api';
import NewsList from '@/components/NewsList';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';

function SearchContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const page = Number(searchParams.get('page')) || 0;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['search', keyword, page],
    queryFn: () => searchNews(keyword, page, 9),
    enabled: !!keyword,
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              뉴스 검색
            </h1>
          </div>
        </div>
        <p className="text-slate-500 ml-[52px]">
          원하는 키워드로 뉴스를 검색하세요
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* No Keyword State */}
      {!keyword && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium mb-1">검색어를 입력해주세요</p>
          <p className="text-slate-400 text-sm">AI, 클라우드, 보안 등 관심있는 키워드로 검색해보세요</p>
        </div>
      )}

      {/* Loading State */}
      {keyword && isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-500">"{keyword}" 검색 중...</p>
        </div>
      )}

      {/* Error State */}
      {keyword && isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium">{error?.message || '검색에 실패했습니다'}</p>
        </div>
      )}

      {/* Results */}
      {keyword && !isLoading && !isError && data && (
        <>
          {/* Search Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-blue-700">
                <span className="font-semibold">"{keyword}"</span> 검색 결과
              </span>
            </div>
            <span className="text-blue-600 font-medium">
              {data.totalElements}건
            </span>
          </div>

          {data.content.length > 0 ? (
            <>
              <NewsList newsList={data.content} />
              <Pagination totalPages={data.totalPages} />
            </>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium mb-1">검색 결과가 없습니다</p>
              <p className="text-slate-400 text-sm">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
