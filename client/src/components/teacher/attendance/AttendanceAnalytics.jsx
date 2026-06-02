import React from 'react';

const AttendanceAnalytics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack-md text-left select-none">
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Present Sessions Avg</p>
        <p className="text-xl font-bold text-primary mt-1">92.4% Present</p>
      </div>
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Class Peak Attendance</p>
        <p className="text-xl font-bold text-primary mt-1">98.1% Monday</p>
      </div>
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Sessions Evaluated</p>
        <p className="text-xl font-bold text-primary mt-1">42 Sessions</p>
      </div>
    </div>
  );
};

export default AttendanceAnalytics;
