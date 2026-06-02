import React from 'react';

const RecentResults = () => {
  const scores = [
    { id: 'rs-1', exam: 'Monthly Assessment 3', score: '92%', grade: 'A' },
    { id: 'rs-2', exam: 'Mid-Term Exam', score: '85%', grade: 'B+' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm text-left">
      <h4 className="font-label-sm text-label-sm font-bold text-on-surface mb-3 flex items-center gap-1.5 uppercase tracking-wider border-b border-outline-variant/20 pb-1.5">
        <span className="material-symbols-outlined text-primary text-base">military_tech</span>
        <span>Latest Test Results</span>
      </h4>
      <div className="space-y-3">
        {scores.map((item) => (
          <div key={item.id} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg flex justify-between items-center gap-4">
            <div>
              <h5 className="font-bold text-xs leading-tight text-on-surface">{item.exam}</h5>
              <span className="text-[10px] text-primary font-bold mt-1 block">Score: {item.score}</span>
            </div>
            <span className="font-extrabold text-primary text-base bg-primary/10 border border-primary/20 w-8 h-8 rounded flex items-center justify-center shrink-0">
              {item.grade}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentResults;
