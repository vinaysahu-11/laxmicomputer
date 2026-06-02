import React from 'react';
import JoinClassButton from './JoinClassButton';

const LiveClassCard = ({ lecture }) => {
  return (
    <div className="bg-primary-container/10 border-2 border-primary/30 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between h-44 animate-scale-in">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-[9px] text-primary font-bold uppercase tracking-wider bg-primary-container/20 border border-primary-container/25 px-2 py-0.5 rounded">
            Live Stream
          </span>
          <span className="flex items-center gap-1 text-[9px] text-error font-extrabold uppercase tracking-wider bg-error-container/20 px-2 py-0.5 rounded-full border border-error-container/30 animate-pulse">
            <span className="w-1 h-1 bg-error rounded-full"></span>
            Active
          </span>
        </div>
        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight mt-2.5">{lecture.title}</h4>
        <p className="text-[11px] text-on-surface-variant mt-1.5 font-light">Instructor: <strong className="text-on-surface font-semibold">{lecture.instructor}</strong></p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
        <span>Room: {lecture.room}</span>
        <JoinClassButton to={lecture.joinLink} />
      </div>
    </div>
  );
};

export default LiveClassCard;
