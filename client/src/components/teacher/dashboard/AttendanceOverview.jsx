import React from 'react';

const AttendanceOverview = () => {
  return (
    <div className="glass-card p-6 rounded-xl flex items-center justify-between text-left border border-outline-variant/30 hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
      <div className="space-y-4">
        <div>
          <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-1">Attendance</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant font-light text-[11px] leading-relaxed max-w-[180px]">
            Overall student presence for current month.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 font-semibold text-xs select-none">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            <span className="text-on-surface-variant">92% Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-surface-container-highest dark:bg-outline-variant"></div>
            <span className="text-on-surface-variant">8% Absent</span>
          </div>
        </div>
      </div>

      <div className="relative w-28 h-28 shrink-0 select-none">
        <svg className="w-full h-full transform -rotate-90">
          <circle 
            className="text-surface-container-highest dark:text-outline-variant/30" 
            cx="56" 
            cy="56" 
            fill="transparent" 
            r="46" 
            stroke="currentColor" 
            strokeWidth="10"
          ></circle>
          <circle 
            className="text-primary transition-all duration-1000" 
            cx="56" 
            cy="56" 
            fill="transparent" 
            r="46" 
            stroke="currentColor" 
            strokeDasharray="289.02" 
            strokeDashoffset="23.12" 
            strokeWidth="10"
            strokeLinecap="round"
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-headline-md text-base font-bold text-on-surface">
          92%
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
