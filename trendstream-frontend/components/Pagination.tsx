'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 0;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      {currentPage > 0 && (
        <Link href={createPageURL(currentPage - 1)} className="px-4 py-2 border rounded-md hover:bg-gray-200">
          &laquo;
        </Link>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`px-4 py-2 border rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
        >
          {page + 1}
        </Link>
      ))}

      {/* Next Button */}
      {currentPage < totalPages - 1 && (
        <Link href={createPageURL(currentPage + 1)} className="px-4 py-2 border rounded-md hover:bg-gray-200">
          &raquo;
        </Link>
      )}
    </div>
  );
}
