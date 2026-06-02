import React from 'react';

const AttendanceChart = () => {
  return (
    <div className="bg-surface border border-outline-variant/60 rounded-2xl p-6 shadow-sm flex flex-col h-80 text-left">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Average Attendance</h3>
          <p className="text-xs text-on-surface-variant font-light">Student present ratio</p>
        </div>
        <span className="text-xs text-outline font-semibold">Today</span>
      </div>

      {/* Simulated visual circular ratio progress chart */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="w-32 h-32 rounded-full border-8 border-primary-fixed flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent border-r-transparent animate-spin-slow"></div>
          <span className="font-headline-md text-headline-md font-bold text-primary">87.5%</span>
        </div>
        <p className="text-xs text-on-surface-variant font-light mt-4">875 of 1000 students present today</p>
      </div>
    </div>
  );
};

export default AttendanceChart;
