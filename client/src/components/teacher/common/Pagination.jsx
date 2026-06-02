import React from 'react';

const Pagination = ({ currentPage = 1, totalPages = 5, onPageChange }) => {
  return (
    <div className="flex items-center justify-between gap-3 text-xs select-none mt-4 pt-3 border-t border-outline-variant/10">
      <span className="text-on-surface-variant font-light">Page {currentPage} of {totalPages}</span>
      <div className="flex items-center gap-1.5 font-bold">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 bg-surface border border-outline-variant rounded-lg hover:bg-surface-container transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 outline-none active:scale-95"
        >
          Previous
        </button>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 outline-none active:scale-95 border-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
