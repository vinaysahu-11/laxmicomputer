import React from 'react';

const StudentPerformance = ({ studentId }) => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30">
      <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/10 pb-2">
        <span className="material-symbols-outlined text-primary text-lg">military_tech</span>
        <h4 className="font-headline-sm text-sm font-bold">Academic Performance</h4>
      </div>
      <div className="space-y-3 text-xs">
        <div>
          <div className="flex justify-between mb-1">
            <span>CS-401 Cloud Infrastructure</span>
            <span className="font-semibold">Grade: A</span>
          </div>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>CS-402 Full Stack Systems</span>
            <span className="font-semibold">Grade: B+</span>
          </div>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '84%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;
