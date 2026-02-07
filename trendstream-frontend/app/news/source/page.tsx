'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getNewsBySource, getSources } from '@/app/api';
import NewsList from '@/components/NewsList';
import Pagination from '@/components/Pagination';

// 소스별 아이콘과 색상 정의
const sourceConfig: Record<string, { icon: string; color: string; bgColor: string }> = {
  'Hacker News': {
    icon: 'Y',
    color: 'text-orange-600',
    bgColor: 'bg-orange-500',
  },
  'GeekNews': {
    icon: 'G',
    color: 'text-green-600',
    bgColor: 'bg-green-500',
  },
  'Naver API': {
    icon: 'N',
    color: 'text-green-600',
    bgColor: 'bg-green-600',
  },
  'Naver Open API': {
    icon: 'N',
    color: 'text-green-600',
    bgColor: 'bg-green-600',
  },
};

function SourceContent() {
  const searchParams = useSearchParams();
  const sourceName = searchParams.get('name') || '';
  const page = Number(searchParams.get('page')) || 0;

  const { data: sources } = useQuery({
    queryKey: ['sources'],
    queryFn: () => getSources(),
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['source', sourceName, page],
    queryFn: () => getNewsBySource(sourceName, page, 9),
    enabled: !!sourceName,
  });

  const getSourceStyle = (source: string) => {
    return sourceConfig[source] || { icon: source.charAt(0), color: 'text-slate-600', bgColor: 'bg-slate-500' };
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              소스별 뉴스
            </h1>
          </div>
        </div>
        <p className="text-slate-500 ml-[52px]">
          뉴스 출처별로 모아보세요
        </p>
      </div>

      {/* Source Chips */}
      {sources && sources.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {sources.map((source) => {
            const style = getSourceStyle(source);
            return (
              <Link
                key={source}
                href={`/news/source?name=${encodeURIComponent(source)}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  sourceName === source
                    ? `${style.bgColor} text-white shadow-lg`
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                  sourceName === source ? 'bg-white/20 text-white' : `${style.bgColor} text-white`
                }`}>
                  {style.icon}
                </span>
                {source}
              </Link>
            );
          })}
        </div>
      )}

      {/* No Source State */}
      {!sourceName && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium mb-1">소스를 선택해주세요</p>
          <p className="text-slate-400 text-sm">위의 소스 버튼을 클릭하면 해당 뉴스를 볼 수 있습니다</p>
        </div>
      )}

      {/* Loading State */}
      {sourceName && isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-500">"{sourceName}" 로딩 중...</p>
        </div>
      )}

      {/* Error State */}
      {sourceName && isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium">{error?.message || '데이터를 불러오는데 실패했습니다'}</p>
        </div>
      )}

      {/* Results */}
      {sourceName && !isLoading && !isError && data && (
        <>
          {/* Source Info */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${getSourceStyle(sourceName).bgColor} text-white`}>
                {getSourceStyle(sourceName).icon}
              </span>
              <span className="text-orange-700">
                <span className="font-semibold">{sourceName}</span>
              </span>
            </div>
            <span className="text-orange-600 font-medium">
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
              <p className="text-slate-600 font-medium mb-1">뉴스가 없습니다</p>
              <p className="text-slate-400 text-sm">다른 소스를 선택해보세요</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SourcePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    }>
      <SourceContent />
    </Suspense>
  );
}
