import React from 'react';

const OfflineClassCard = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30">
      <div className="flex justify-between items-center mb-2">
        <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full uppercase border border-outline-variant/20">Offline</span>
        <span className="text-[10px] text-on-surface-variant">Capacity: 40</span>
      </div>
      <h4 className="font-bold text-sm text-on-surface">Lab Practicals CS-409</h4>
      <p className="text-xs text-on-surface-variant font-light mt-1">Innovation Lab 402 | Friday 04:00 PM</p>
    </div>
  );
};

export default OfflineClassCard;
