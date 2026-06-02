import React from 'react';

const Pagination = ({ currentPage = 1, totalPages = 5, onPageChange }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low border-t border-outline-variant/60 rounded-b-2xl">
      <div className="text-xs text-on-surface-variant font-light">
        Showing page <strong className="font-semibold">{currentPage}</strong> of <strong className="font-semibold">{totalPages}</strong>
      </div>
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="px-3.5 py-2 rounded-xl bg-surface border border-outline-variant/40 hover:bg-secondary-container/20 text-on-surface disabled:opacity-50 disabled:pointer-events-none transition-all"
        >
          <span className="material-symbols-outlined text-sm block">chevron_left</span>
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="px-3.5 py-2 rounded-xl bg-surface border border-outline-variant/40 hover:bg-secondary-container/20 text-on-surface disabled:opacity-50 disabled:pointer-events-none transition-all"
        >
          <span className="material-symbols-outlined text-sm block">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
