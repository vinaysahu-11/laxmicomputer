import React from 'react';

const ResultAnalytics = () => {
  const statistics = [
    { label: 'Highest Score achieved', value: '98%' },
    { label: 'Cumulative CGPA Index', value: '3.91' },
    { label: 'Subject Competency Rate', value: 'Excels' },
    { label: 'Verified Passed Credits', value: '45 Credits' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-3 flex items-center gap-1.5 uppercase tracking-wider border-b border-outline-variant/20 pb-1.5">
        <span className="material-symbols-outlined text-primary text-base">analytics</span>
        <span>Academic Analytics Overview</span>
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {statistics.map((stat, i) => (
          <div key={i} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-left">
            <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block">{stat.label}</span>
            <span className="font-bold text-on-surface block text-sm mt-1">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultAnalytics;
