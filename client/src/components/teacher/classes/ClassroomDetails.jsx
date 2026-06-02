import React from 'react';

const ClassroomDetails = ({ classId }) => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 flex flex-col gap-4">
      <div className="border-b border-outline-variant/10 pb-2">
        <h4 className="font-headline-sm text-sm font-bold text-on-surface">Classroom Profiles</h4>
        <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Active Class ID: {classId}</p>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <p className="text-on-surface-variant font-light">Subject Reference</p>
          <p className="font-bold text-on-surface mt-0.5">CS-401 Cloud Infrastructure</p>
        </div>
        <div>
          <p className="text-on-surface-variant font-light">Syllabus Milestones Completed</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '74%' }}></div>
            </div>
            <span className="font-bold text-primary">74%</span>
          </div>
        </div>
        <div>
          <p className="text-on-surface-variant font-light">Associated Faculty</p>
          <p className="font-semibold text-on-surface mt-0.5">Dr. Sarah Jenkins</p>
        </div>
      </div>
    </div>
  );
};

export default ClassroomDetails;
