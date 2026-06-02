import React from 'react';

const ExamTimer = () => {
  return (
    <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs text-left">
      <p className="text-on-surface-variant font-light">Remaining Exam Duration</p>
      <p className="text-xl font-mono font-bold text-error mt-1">01:42:30</p>
    </div>
  );
};

export default ExamTimer;
