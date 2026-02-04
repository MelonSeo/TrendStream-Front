'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

interface PaginationProps {
  totalPages: number;
}

function PaginationContent({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 0;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  // Show max 5 pages at a time
  const maxVisiblePages = 5;
  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages);

  if (endPage - startPage < maxVisiblePages) {
    startPage = Math.max(0, endPage - maxVisiblePages);
  }

  const pages = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* First Page */}
      {currentPage > 1 && (
        <Link
          href={createPageURL(0)}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          title="첫 페이지"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </Link>
      )}

      {/* Previous Button */}
      {currentPage > 0 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {startPage > 0 && (
          <span className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>
        )}
        {pages.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {page + 1}
          </Link>
        ))}
        {endPage < totalPages && (
          <span className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>
        )}
      </div>

      {/* Next Button */}
      {currentPage < totalPages - 1 && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

      {/* Last Page */}
      {currentPage < totalPages - 2 && (
        <Link
          href={createPageURL(totalPages - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          title="마지막 페이지"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default function Pagination({ totalPages }: PaginationProps) {
  return (
    <Suspense fallback={<div className="h-10" />}>
      <PaginationContent totalPages={totalPages} />
    </Suspense>
  );
}
