import React from 'react';

const StudentOverview = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 text-left select-none">
      {/* Total Students Card */}
      <div className="glass-card p-6 rounded-xl flex flex-col justify-center border-l-4 border-l-primary hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold text-xs">Total Students</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="font-headline-md text-headline-md font-extrabold text-2xl">1,248</span>
          <span className="text-green-600 font-label-sm text-label-sm text-xs flex items-center mb-1 font-bold">
            <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
            12%
          </span>
        </div>
      </div>

      {/* Classes Today Card */}
      <div className="glass-card p-6 rounded-xl flex flex-col justify-center border-l-4 border-l-tertiary hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold text-xs">Classes Today</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="font-headline-md text-headline-md font-extrabold text-2xl">06</span>
          <span className="text-on-surface-variant font-label-sm text-label-sm text-xs mb-1 font-medium">Lectures</span>
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
