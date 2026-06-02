import React from 'react';

const AttendanceOverview = () => {
  const attendanceRate = 92.5; // percentage
  const totalLectures = 120;
  const attendedLectures = 111;
  const absentLectures = 9;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">calendar_month</span>
        <span>Attendance Overview</span>
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-6 py-2">
        {/* Circular Dial SVG */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Path */}
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="var(--md-sys-color-surface-container-high, #e2e8f0)"
              strokeWidth="8"
              fill="transparent"
              className="stroke-surface-container-high dark:stroke-surface-container-highest"
            />
            {/* Active Path */}
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="var(--md-sys-color-primary, #0061a4)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 48}
              strokeDashoffset={2 * Math.PI * 48 * (1 - attendanceRate / 100)}
              className="stroke-primary"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface leading-none">{attendanceRate}%</span>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1">Health</span>
          </div>
        </div>

        {/* Metrics Splitting */}
        <div className="flex-1 w-full space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/25">
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">Lectures Present</span>
              <span className="font-bold text-on-surface mt-1.5 block text-lg">{attendedLectures}</span>
            </div>
            <div className="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/25">
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">Lectures Absent</span>
              <span className="font-bold text-error mt-1.5 block text-lg">{absentLectures}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[11px] font-medium text-on-surface-variant bg-primary-container/10 border border-primary-container/20 p-2.5 rounded-lg leading-snug">
            <span>Total Logged Semester Lectures: <strong>{totalLectures}</strong></span>
            <span className="text-primary font-bold">Good Standing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
