import React from 'react';
import JoinClassButton from './JoinClassButton';

const OnlineClassCard = ({ lecture }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between h-44">
      <div>
        <span className="text-[9px] text-primary font-bold uppercase tracking-wider bg-primary-container/20 border border-primary-container/25 px-2 py-0.5 rounded">
          Online Class
        </span>
        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight mt-2.5">{lecture.title}</h4>
        <p className="text-[11px] text-on-surface-variant mt-1.5 font-light">Instructor: <strong className="text-on-surface font-semibold">{lecture.instructor}</strong></p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
        <span>Time: {lecture.time}</span>
        <JoinClassButton to={lecture.joinLink} />
      </div>
    </div>
  );
};

export default OnlineClassCard;
