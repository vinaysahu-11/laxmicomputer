import React from 'react';

const ExamTimer = ({ seconds = 2700 }) => {
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 bg-error-container/20 border border-error-container/45 text-error px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider">
      <span className="material-symbols-outlined text-base animate-pulse">timer</span>
      <span>Remaining Time: {formatTime(seconds)}</span>
    </div>
  );
};

export default ExamTimer;
