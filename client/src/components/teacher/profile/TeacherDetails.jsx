import React from 'react';

const TeacherDetails = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm border border-outline-variant/30 text-left text-xs">
      <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/10 pb-2">
        <span className="material-symbols-outlined text-primary text-lg">person</span>
        <h4 className="font-headline-sm text-sm font-bold">Personal Information</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md font-light text-on-surface-variant leading-relaxed">
        <div>
          <p className="font-semibold text-on-surface">Full Name</p>
          <p className="mt-0.5">Dr. Sarah Jenkins</p>
        </div>
        <div>
          <p className="font-semibold text-on-surface">Office Desk</p>
          <p className="mt-0.5">Building 2, Room 405</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
