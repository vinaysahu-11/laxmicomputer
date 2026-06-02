import React from 'react';

const OnlineClassCard = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30">
      <div className="flex justify-between items-center mb-2">
        <span className="px-2 py-0.5 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full uppercase border border-primary/20">Online</span>
        <span className="text-[10px] text-on-surface-variant">2.4k Views</span>
      </div>
      <h4 className="font-bold text-sm text-on-surface">REST API Design Standard</h4>
      <p className="text-xs text-on-surface-variant font-light mt-1">CS-402 | Pre-recorded stream lectures</p>
    </div>
  );
};

export default OnlineClassCard;
