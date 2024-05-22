import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = () => {
    const pages = [];
    const totalDisplayPages = 4;

    if (totalPages <= totalDisplayPages) {
      // If total pages are less than or equal to the display limit, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      // Calculate start and end pages for the range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if near the start or end
      if (currentPage <= 2) {
        endPage = startPage + totalDisplayPages - 2;
      }
      if (currentPage >= totalPages - 1) {
        startPage = endPage - totalDisplayPages + 2;
      }

      // Add pages in the calculated range
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Always show the last page
      if (totalPages > totalDisplayPages) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pages.map((page, index) =>
          page === '...' ? (
            <li key={index}>
              <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</span>
            </li>
          ) : (
            <li key={index}>
              <button
                className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === page ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          )
        )}
        <li>
          <button
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
