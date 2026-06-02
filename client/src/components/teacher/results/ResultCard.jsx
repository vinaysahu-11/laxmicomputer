import React from 'react';

const ResultCard = ({ title, average, passRate }) => {
  return (
    <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs text-left">
      <h5 className="font-bold text-on-surface mb-2 truncate">{title}</h5>
      <div className="space-y-1.5 font-light">
        <p className="flex justify-between"><span>Average Grade:</span> <strong className="text-primary">{average}</strong></p>
        <p className="flex justify-between"><span>Pass Rate:</span> <strong className="text-primary">{passRate}</strong></p>
      </div>
    </div>
  );
};

export default ResultCard;
