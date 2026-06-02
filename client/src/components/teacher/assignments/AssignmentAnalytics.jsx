import React from 'react';

const AssignmentAnalytics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack-md text-left select-none mb-gutter">
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Submissions Evaluated</p>
        <p className="text-xl font-bold text-primary mt-1">48 Submissions</p>
      </div>
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Pending Evaluation Alerts</p>
        <p className="text-xl font-bold text-error mt-1">22 Folders</p>
      </div>
      <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-xs">
        <p className="text-on-surface-variant font-light">Class Submission Rate</p>
        <p className="text-xl font-bold text-primary mt-1">94.8% Average</p>
      </div>
    </div>
  );
};

export default AssignmentAnalytics;
