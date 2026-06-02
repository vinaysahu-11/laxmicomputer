import React from 'react';
import JoinClassButton from './JoinClassButton';

const ClassCard = ({ type, subject, time, room, studentsCount, onSelect }) => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm hover:shadow-md hover:scale-[1.01] transition-all text-left flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase select-none ${
          type === 'live' ? 'bg-error-container text-on-error-container border border-error/20' :
          type === 'online' ? 'bg-primary-container text-on-primary-container border border-primary/20' :
          'bg-secondary-container text-on-secondary-container border border-outline-variant/30'
        }`}>
          {type} Class
        </span>
        <span className="text-[10px] text-on-surface-variant font-semibold select-none flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">group</span>
          {studentsCount} Students
        </span>
      </div>

      <div>
        <h4 className="font-headline-sm text-sm font-bold truncate text-on-surface">{subject}</h4>
        <p className="font-body-md text-xs text-on-surface-variant font-light mt-1 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-xs font-semibold text-primary">schedule</span>
          {time}
        </p>
        {room && (
          <p className="font-body-md text-xs text-on-surface-variant font-light mt-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs font-semibold text-primary">place</span>
            Room: {room}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-2 mt-auto border-t border-outline-variant/10">
        <button 
          onClick={onSelect}
          className="text-primary font-bold text-xs bg-transparent border-none cursor-pointer p-0 hover:underline outline-none"
        >
          View Details
        </button>
        {type === 'live' && <JoinClassButton />}
      </div>
    </div>
  );
};

export default ClassCard;
