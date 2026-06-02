import React from 'react';

const EmptyState = ({ message = 'No data available in this index.' }) => {
  return (
    <div className="py-12 px-6 border border-dashed border-outline-variant/60 rounded-xl bg-surface-container-low/10 text-center italic text-on-surface-variant font-light text-xs leading-relaxed">
      <span className="material-symbols-outlined text-2xl text-on-surface-variant mb-2 block">folder_open</span>
      <span>{message}</span>
    </div>
  );
};

export default EmptyState;
