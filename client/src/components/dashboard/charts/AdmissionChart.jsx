import React from 'react';

const AdmissionChart = () => {
  return (
    <div className="bg-surface border border-outline-variant/60 rounded-2xl p-6 shadow-sm flex flex-col h-80 text-left">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Admissions Intake</h3>
          <p className="text-xs text-on-surface-variant font-light">New admissions statistics</p>
        </div>
        <span className="text-xs text-outline font-semibold">Weekly</span>
      </div>

      {/* Simulated visual grid chart */}
      <div className="flex-1 flex items-end gap-3 pt-4 border-b border-l border-outline-variant/40 pl-4 pb-2">
        <div className="flex-1 bg-tertiary-container/30 rounded-t-lg h-28 relative group hover:bg-tertiary transition-all"></div>
        <div className="flex-1 bg-tertiary-container/30 rounded-t-lg h-44 relative group hover:bg-tertiary transition-all"></div>
        <div className="flex-1 bg-tertiary-container/30 rounded-t-lg h-16 relative group hover:bg-tertiary transition-all"></div>
        <div className="flex-1 bg-tertiary-container/30 rounded-t-lg h-32 relative group hover:bg-tertiary transition-all"></div>
        <div className="flex-1 bg-tertiary-container/30 rounded-t-lg h-52 relative group hover:bg-tertiary transition-all"></div>
      </div>
      <div className="flex justify-between items-center text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mt-2 px-4">
        <span>Wk 1</span>
        <span>Wk 2</span>
        <span>Wk 3</span>
        <span>Wk 4</span>
        <span>Wk 5</span>
      </div>
    </div>
  );
};

export default AdmissionChart;
