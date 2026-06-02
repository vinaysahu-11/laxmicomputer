import React from 'react';

const EmptyState = ({ title, message, icon = 'folder_open' }) => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm border border-outline-variant/30 text-center flex flex-col items-center justify-center gap-2 max-w-md mx-auto my-6 text-xs">
      <span className="material-symbols-outlined text-primary-fixed-dim text-3xl select-none">{icon}</span>
      <h4 className="font-bold text-on-surface text-sm mt-1">{title}</h4>
      <p className="text-on-surface-variant font-light leading-relaxed">{message}</p>
    </div>
  );
};

export default EmptyState;
