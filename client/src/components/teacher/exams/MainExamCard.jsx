import React from 'react';

const MainExamCard = ({ title, code, date, duration, status }) => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm border border-outline-variant/30 text-left flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-extrabold rounded-full border border-primary/20">{code}</span>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase select-none ${
          status === 'ongoing' ? 'bg-error-container text-on-error-container animate-pulse border border-error/20' :
          'bg-surface-container text-on-surface-variant'
        }`}>
          {status}
        </span>
      </div>
      <div>
        <h4 className="font-bold text-sm text-on-surface truncate">{title}</h4>
        <p className="text-xs text-on-surface-variant font-light mt-1 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-xs text-primary">schedule</span>
          {date} ({duration})
        </p>
      </div>
    </div>
  );
};

export default MainExamCard;
