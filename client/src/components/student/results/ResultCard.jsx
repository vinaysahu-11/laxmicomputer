import React from 'react';

const ResultCard = ({ cgpa = '3.91' }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between h-44">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <div>
        <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded border border-outline-variant/20">
          Cumulative Grade Standing
        </span>
        <h4 className="font-headline-lg text-headline-lg font-bold text-primary leading-none mt-4">{cgpa} / 4.00</h4>
        <p className="text-[11px] text-on-surface-variant mt-2 font-light">Calculated across 3 verified courses semesters</p>
      </div>

      <div className="pt-2 border-t border-outline-variant/20 text-[10px] text-on-surface-variant font-bold uppercase tracking-wider flex items-center gap-1.5">
        <span className="material-symbols-outlined text-green-600 text-base">verified</span>
        <span className="text-green-700 font-bold">Verification Cleared</span>
      </div>
    </div>
  );
};

export default ResultCard;
