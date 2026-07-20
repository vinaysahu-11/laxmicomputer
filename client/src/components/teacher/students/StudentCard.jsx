import React from 'react';

const StudentCard = ({ name, email, roll, avatar }) => {
  return (
    <div className="glass-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left flex items-center gap-3 border border-outline-variant/30">
      <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs select-none">
        {(name || 'Student').split(' ').map(n => n[0]).join('')}
      </div>
      <div className="overflow-hidden min-w-0">
        <h4 className="font-bold text-xs truncate text-on-surface">{name || 'Student'}</h4>
        <p className="text-[10px] text-on-surface-variant truncate font-light mt-0.5">{email}</p>
        <p className="text-[9px] text-primary truncate font-semibold mt-0.5">Roll: {roll}</p>
      </div>
    </div>
  );
};

export default StudentCard;
