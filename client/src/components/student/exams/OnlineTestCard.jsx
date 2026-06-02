import React from 'react';

const OnlineTestCard = ({ test, onStartTest }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between h-44">
      <div>
        <span className="text-[9px] text-primary font-bold uppercase tracking-wider bg-primary-container/20 border border-primary-container/25 px-2 py-0.5 rounded">
          Online Exam
        </span>
        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight mt-2.5">{test.title}</h4>
        <p className="text-[11px] text-on-surface-variant mt-1.5 font-light">Duration: <strong className="text-on-surface font-semibold">{test.duration}</strong> • Syllabus: {test.syllabus.slice(0, 32)}...</p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
        <span>Schedules: {test.date}</span>
        <button 
          onClick={() => onStartTest(test)}
          className="bg-primary hover:bg-surface-tint text-on-primary px-3.5 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider shadow-sm transition-all"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default OnlineTestCard;
