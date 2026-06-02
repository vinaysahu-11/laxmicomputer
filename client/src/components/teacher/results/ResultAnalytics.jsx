import React from 'react';

const ResultAnalytics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack-md text-left select-none mb-gutter">
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Class Pass Avg</p>
        <p className="text-xl font-bold text-primary mt-1">82.4% Score</p>
      </div>
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Declared Marksheets</p>
        <p className="text-xl font-bold text-primary mt-1">2 Semesters</p>
      </div>
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Class Failures Ratio</p>
        <p className="text-xl font-bold text-primary mt-1">1.2% Ratio</p>
      </div>
    </div>
  );
};

export default ResultAnalytics;
