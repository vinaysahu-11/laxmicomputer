import React from 'react';

const AssignmentCard = ({ title, subject, dueDate, submissionsCount, status, onView }) => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm border border-outline-variant/30 text-left flex flex-col gap-3 text-xs">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-primary">{subject}</span>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase select-none ${
          status === 'active' ? 'bg-primary-container text-on-primary-container border border-primary/20' :
          'bg-surface-container text-on-surface-variant'
        }`}>
          {status}
        </span>
      </div>
      <div>
        <h4 className="font-bold text-sm text-on-surface truncate">{title}</h4>
        <p className="text-on-surface-variant font-light mt-1 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-xs text-primary">schedule</span>
          Due: {dueDate}
        </p>
        <p className="text-on-surface-variant font-light mt-1 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-xs text-primary">group</span>
          Submissions: {submissionsCount}
        </p>
      </div>
      <div className="flex justify-end pt-2 border-t border-outline-variant/10 mt-auto">
        <button 
          onClick={onView}
          className="bg-primary text-on-primary px-3 py-1.5 rounded-lg font-label-md hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none outline-none font-bold text-[10px]"
        >
          View Submissions
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
