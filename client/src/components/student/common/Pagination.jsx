import React from 'react';

const Pagination = () => {
  return (
    <div className="flex justify-between items-center py-4 border-t border-outline-variant/20 mt-6 flex-wrap gap-3">
      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Showing 1 to 5 of 15 entries</span>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-bold rounded cursor-not-allowed opacity-50 transition-colors">Previous</button>
        <button className="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded shadow-sm hover:opacity-95 transition-opacity">1</button>
        <button className="px-3 py-1 bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-bold rounded transition-colors">2</button>
        <button className="px-3 py-1 bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-bold rounded transition-colors">Next</button>
      </div>
    </div>
  );
};

export default Pagination;
