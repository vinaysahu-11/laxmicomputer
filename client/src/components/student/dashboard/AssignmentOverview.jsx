import React from 'react';

const AssignmentOverview = () => {
  const assignments = [
    {
      id: 'asg-1',
      title: 'Redux State Slices & Thunk Handlers',
      course: 'Full Stack Web Development',
      dueDate: 'June 08, 2026',
      status: 'Pending',
      points: '100 pts',
      description: 'Implement a React Todo application state management using Redux Toolkit slices and async thunk middleware.'
    },
    {
      id: 'asg-2',
      title: 'ER Database Modeling Schema',
      course: 'Database Management Systems',
      dueDate: 'June 15, 2026',
      status: 'Pending',
      points: '50 pts',
      description: 'Draft the Entity-Relationship models and SQL schema files for an online library booking system.'
    }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">description</span>
        <span>Pending Assignments</span>
      </h3>

      <div className="space-y-3.5">
        {assignments.map((asg) => (
          <div key={asg.id} className="p-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-left flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container px-2.5 py-0.5 rounded border border-outline-variant/15">
                {asg.course}
              </span>
              <span className="text-xs font-bold text-primary bg-primary-container/20 border border-primary-container/25 px-2 py-0.5 rounded-full">
                {asg.points}
              </span>
            </div>

            <div>
              <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight">{asg.title}</h4>
              <p className="text-[11px] text-on-surface-variant mt-1.5 font-light leading-relaxed">
                {asg.description}
              </p>
            </div>

            <div className="pt-2 border-t border-outline-variant/15 flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">schedule</span>
                <span>Due Date: {asg.dueDate}</span>
              </span>
              <button 
                type="button" 
                className="text-primary hover:underline"
              >
                Upload Work
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentOverview;
