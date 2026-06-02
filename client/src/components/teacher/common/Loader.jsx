import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-stack-lg gap-3">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-xs text-on-surface-variant font-light animate-pulse select-none">Loading platform logs...</p>
    </div>
  );
};

export default Loader;
