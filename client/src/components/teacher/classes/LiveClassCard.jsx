import React from 'react';

const LiveClassCard = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-error/20 bg-error-container/5">
      <div className="flex justify-between items-center mb-2">
        <span className="px-2 py-0.5 bg-error text-on-error text-[10px] font-bold rounded-full uppercase">Live Now</span>
        <span className="text-[10px] text-error font-semibold animate-pulse flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
          Streaming
        </span>
      </div>
      <h4 className="font-bold text-sm text-on-surface">Cloud Deployment Pipeline</h4>
      <p className="text-xs text-on-surface-variant font-light mt-1">CS-401 | Senior lecture rooms</p>
    </div>
  );
};

export default LiveClassCard;
