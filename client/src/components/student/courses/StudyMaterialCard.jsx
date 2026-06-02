import React from 'react';

const StudyMaterialCard = ({ material }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm text-left flex justify-between items-center gap-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 bg-primary/10 text-primary border border-primary/20 rounded flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-base">folder_open</span>
        </div>
        <div className="min-w-0">
          <h4 className="font-label-sm text-label-sm font-bold text-on-surface leading-tight truncate">{material.title}</h4>
          <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block mt-1.5">{material.type} • {material.size}</span>
        </div>
      </div>
      <button className="text-primary hover:underline text-xs font-bold shrink-0">Download</button>
    </div>
  );
};

export default StudyMaterialCard;
