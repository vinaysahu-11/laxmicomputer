import React from 'react';

const OnlineExamUI = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 text-xs">
      <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2 mb-3">
        <h4 className="font-bold text-on-surface">Proctored Online Exam Monitor</h4>
        <span className="text-error font-semibold animate-pulse flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
          Active Proctoring
        </span>
      </div>
      <p className="text-on-surface-variant font-light leading-relaxed mb-3">
        Monitoring proctor stream states. System will flag camera violations or keyboard lock events automatically.
      </p>
      <div className="p-3 bg-surface rounded-lg border border-outline-variant/20">
        <p className="font-semibold text-on-surface">Proctor Stats</p>
        <div className="grid grid-cols-2 gap-2 mt-2 font-light">
          <p>Connected Students: 38</p>
          <p>Flagged Violations: 0</p>
        </div>
      </div>
    </div>
  );
};

export default OnlineExamUI;
