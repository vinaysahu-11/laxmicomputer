import React from 'react';

const Loader = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-center gap-3">
      <span className="material-symbols-outlined text-3xl text-primary animate-spin">sync</span>
      <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Syncing database...</span>
    </div>
  );
};

export default Loader;
