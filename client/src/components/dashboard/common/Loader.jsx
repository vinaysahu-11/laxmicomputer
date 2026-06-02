import React from 'react';

const Loader = ({ label }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <span className="material-symbols-outlined text-primary text-5xl animate-spin">
        sync
      </span>
      <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold animate-pulse">
        {label || 'Loading Data Content...'}
      </p>
    </div>
  );
};

export default Loader;
