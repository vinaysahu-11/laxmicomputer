import React from 'react';

const ExamCard = ({ title, code, date, duration, status }) => {
  return (
    <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-left text-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-primary">{code}</span>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase select-none ${
          status === 'ongoing' ? 'bg-error-container text-on-error-container border border-error/20 animate-pulse' :
          'bg-surface-container text-on-surface-variant'
        }`}>
          {status}
        </span>
      </div>
      <h5 className="font-bold text-on-surface mb-1 truncate">{title}</h5>
      <p className="text-on-surface-variant font-light">Date: {date}</p>
      <p className="text-on-surface-variant font-light mt-0.5">Duration: {duration}</p>
    </div>
  );
};

export default ExamCard;
