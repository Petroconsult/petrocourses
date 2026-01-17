'use client';

interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CoursePagination({
  currentPage,
  totalPages,
  onPageChange,
}: CoursePaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
          currentPage === 1
            ? 'border-gray-800 text-gray-600 cursor-not-allowed bg-gray-900/30'
            : 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
        }`}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
              currentPage === page
                ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20'
                : 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
          currentPage === totalPages
            ? 'border-gray-800 text-gray-600 cursor-not-allowed bg-gray-900/30'
            : 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
        }`}
      >
        Next
      </button>
    </div>
  );
}