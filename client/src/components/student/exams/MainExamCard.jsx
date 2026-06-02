import React from 'react';

const MainExamCard = ({ exam }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between h-44">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-error/5 rounded-full blur-xl pointer-events-none"></div>

      <div>
        <span className="text-[9px] text-error font-bold uppercase tracking-wider bg-error-container/20 border border-error-container/30 px-2 py-0.5 rounded">
          Semester Final
        </span>
        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight mt-2.5">{exam.title}</h4>
        <p className="text-[11px] text-on-surface-variant mt-1.5 font-light">Subject: <strong className="text-on-surface font-semibold">{exam.subject}</strong></p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
        <span>Exam Date: {exam.date}</span>
        <span className="text-error font-extrabold text-xs">Room {exam.room}</span>
      </div>
    </div>
  );
};

export default MainExamCard;
