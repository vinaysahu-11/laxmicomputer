import React from 'react';

const PendingAssignments = () => {
  const assignments = [
    { id: 'as-1', title: 'Redux State Slices', dueDate: 'June 08, 2026', points: '100 pts' },
    { id: 'as-2', title: 'ER Database Modeling', dueDate: 'June 15, 2026', points: '50 pts' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm text-left">
      <h4 className="font-label-sm text-label-sm font-bold text-on-surface mb-3 flex items-center gap-1.5 uppercase tracking-wider border-b border-outline-variant/20 pb-1.5">
        <span className="material-symbols-outlined text-primary text-base">description</span>
        <span>Pending Assignments</span>
      </h4>
      <div className="space-y-3">
        {assignments.map((asg) => (
          <div key={asg.id} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg flex justify-between items-center gap-2 flex-wrap">
            <div>
              <h5 className="font-bold text-xs leading-tight text-on-surface">{asg.title}</h5>
              <span className="text-[9px] text-on-surface-variant font-medium mt-1 block">Due: {asg.dueDate}</span>
            </div>
            <span className="text-[10px] text-primary font-bold bg-primary-container/25 px-2 py-0.5 rounded-full border border-primary-container/20">
              {asg.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingAssignments;
