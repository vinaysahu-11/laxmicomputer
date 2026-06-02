import React from 'react';

const RecordedClassCard = ({ lecture }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm text-left flex flex-col justify-between h-40 transition-all duration-200 hover:shadow-md">
      <div>
        <span className="text-[8px] text-primary font-bold uppercase tracking-wider bg-primary-container/20 border border-primary-container/25 px-2 py-0.5 rounded">
          {lecture.duration} Session
        </span>
        <h4 className="font-label-sm text-label-sm font-bold text-on-surface leading-tight mt-2">{lecture.title}</h4>
        <p className="text-[10px] text-on-surface-variant mt-1.5 font-light leading-snug">Recorded by: <strong className="text-on-surface font-semibold">{lecture.instructor}</strong></p>
      </div>

      <div className="pt-2 border-t border-outline-variant/20 flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
        <span>Recorded {lecture.date}</span>
        <button className="text-primary hover:underline font-bold text-xs flex items-center gap-0.5">
          <span className="material-symbols-outlined text-xs">play_circle</span>
          <span>Watch Session</span>
        </button>
      </div>
    </div>
  );
};

export default RecordedClassCard;
