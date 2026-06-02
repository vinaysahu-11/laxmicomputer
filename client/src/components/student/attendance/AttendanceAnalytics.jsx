import React from 'react';

const AttendanceAnalytics = () => {
  const weeklyTrend = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true },
    { day: 'Fri', active: false }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-3 flex items-center gap-1.5 uppercase tracking-wider border-b border-outline-variant/20 pb-1.5">
        <span className="material-symbols-outlined text-primary text-base">analytics</span>
        <span>Attendance Consistency</span>
      </h3>
      <div className="space-y-4">
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Weekly Biometric Checks</p>
        <div className="flex gap-2">
          {weeklyTrend.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 p-2 bg-surface-container rounded-lg border border-outline-variant/20">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{item.day}</span>
              <span className={`material-symbols-outlined text-base ${
                item.active ? 'text-green-600' : 'text-error'
              }`}>
                {item.active ? 'check_circle' : 'cancel'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceAnalytics;
