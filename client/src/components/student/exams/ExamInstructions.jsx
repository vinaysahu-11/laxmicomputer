import React from 'react';

const ExamInstructions = () => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-3 flex items-center gap-1.5 uppercase tracking-wider border-b border-outline-variant/20 pb-1.5">
        <span className="material-symbols-outlined text-primary text-base">info</span>
        <span>General Exam Instructions</span>
      </h3>
      <ul className="space-y-3.5 text-xs text-on-surface-variant leading-relaxed font-light">
        <li className="flex gap-2.5 items-start">
          <span className="material-symbols-outlined text-primary text-base shrink-0">check_circle</span>
          <span>Ensure you are in a quiet room with a stable high-speed internet connection for online tests.</span>
        </li>
        <li className="flex gap-2.5 items-start">
          <span className="material-symbols-outlined text-primary text-base shrink-0">check_circle</span>
          <span>Do not minimize the active browser window or trigger page reloads during active exams.</span>
        </li>
        <li className="flex gap-2.5 items-start">
          <span className="material-symbols-outlined text-primary text-base shrink-0">check_circle</span>
          <span>For offline campus exams, verify your seat allocations and carry physical Admit Cards.</span>
        </li>
      </ul>
    </div>
  );
};

export default ExamInstructions;
