import React from 'react';

const AttendanceCard = ({ title, value }) => {
  return (
    <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs text-left">
      <h5 className="font-bold text-on-surface mb-1">{title}</h5>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex-1 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full rounded-full" style={{ width: value }}></div>
        </div>
        <span className="font-bold text-primary">{value}</span>
      </div>
    </div>
  );
};

export default AttendanceCard;
