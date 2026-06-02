import React from 'react';

const AssignmentCard = ({ assignment, onUploadClick }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between h-48">
      <div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded border border-outline-variant/20">
            {assignment.course}
          </span>
          <span className="text-xs font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded">
            {assignment.points}
          </span>
        </div>
        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight mt-3">{assignment.title}</h4>
        <p className="text-[11px] text-on-surface-variant mt-2 font-light line-clamp-2 leading-relaxed">{assignment.description}</p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
        <span>Due: {assignment.dueDate}</span>
        <button 
          onClick={() => onUploadClick(assignment)}
          className="text-primary hover:underline font-bold text-xs"
        >
          Submit Work
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
