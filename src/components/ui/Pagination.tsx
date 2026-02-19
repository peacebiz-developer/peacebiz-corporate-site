import React from 'react';
import { cn } from '../../utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav className={cn('flex flex-wrap justify-center items-center gap-2', className)} aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
        const active = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'h-10 min-w-10 rounded-full px-3 text-sm font-bold transition-colors border',
              active
                ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                : 'bg-transparent text-gray-500 border-gray-300 dark:border-zinc-700 hover:text-black dark:hover:text-white'
            )}
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
