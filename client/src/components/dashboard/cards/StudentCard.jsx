import React from 'react';

const StudentCard = ({ student }) => {
  return (
    <div className="bg-surface border border-outline-variant/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full border border-primary/10 flex items-center justify-center font-bold text-primary">
          {student?.name?.charAt(0) || 'S'}
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface">{student?.name || 'Student Name'}</h4>
          <p className="text-xs text-on-surface-variant font-light">{student?.course || 'Active Course'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant">
        <div>
          <span className="font-semibold block text-[10px] uppercase tracking-wider text-outline">Roll No</span>
          <span>{student?.rollNo || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold block text-[10px] uppercase tracking-wider text-outline">Status</span>
          <span className="text-green-600 font-semibold">{student?.status || 'Active'}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
