import React from 'react';

const StudentAttendance = ({ studentId }) => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30">
      <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/10 pb-2">
        <span className="material-symbols-outlined text-primary text-lg">co_present</span>
        <h4 className="font-headline-sm text-sm font-bold">Attendance Record</h4>
      </div>
      <div className="flex items-center justify-between gap-4 text-xs">
        <div className="flex flex-col gap-1">
          <p className="text-on-surface-variant font-light">Present Sessions</p>
          <p className="text-xl font-bold text-primary">28 / 30</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-on-surface-variant font-light">Percentage</p>
          <p className="text-xl font-bold text-primary">93.3%</p>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
