import React from 'react';

const AdmitCard = ({ exam }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md space-y-4">
      <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
        <h4 className="font-bold text-xs uppercase tracking-wider text-on-surface">Institutional Admit Card</h4>
        <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded text-[9px] font-bold uppercase">Verified</span>
      </div>

      <div className="space-y-2 text-xs leading-snug">
        <p><strong className="font-semibold text-on-surface-variant uppercase text-[10px] block mb-0.5">Candidate Name:</strong> Sarah Jenkins</p>
        <p><strong className="font-semibold text-on-surface-variant uppercase text-[10px] block mb-0.5">Primary Exam Target:</strong> {exam?.title || 'Semester Finals'}</p>
        <p><strong className="font-semibold text-on-surface-variant uppercase text-[10px] block mb-0.5">Seat Allocation:</strong> Seat Room {exam?.room || '402'}</p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex justify-end">
        <button className="bg-primary-container text-on-primary-container hover:bg-primary-container/85 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">download</span>
          <span>Download PDF Card</span>
        </button>
      </div>
    </div>
  );
};

export default AdmitCard;
