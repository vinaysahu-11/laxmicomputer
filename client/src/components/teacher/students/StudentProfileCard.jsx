import React from 'react';

const StudentProfileCard = ({ studentId }) => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 flex flex-col gap-4">
      <div className="flex flex-col items-center text-center border-b border-outline-variant/10 pb-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-2 border border-primary/20">
          AS
        </div>
        <h4 className="font-bold text-sm text-on-surface">Alex Smith</h4>
        <p className="text-[10px] text-on-surface-variant font-light mt-0.5">alex.smith@itacademy.edu</p>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <p className="text-on-surface-variant font-light">Academic Program</p>
          <p className="font-bold text-on-surface mt-0.5">Computer Science &amp; Engineering</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-on-surface-variant font-light">Current CGPA</p>
            <p className="font-bold text-primary mt-0.5 text-sm">3.82 / 4.0</p>
          </div>
          <div>
            <p className="text-on-surface-variant font-light">Rank Code</p>
            <p className="font-bold text-primary mt-0.5 text-sm">CS-14</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
