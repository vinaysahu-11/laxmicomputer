import React from 'react';

const ExamInstructions = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 text-xs">
      <h4 className="font-bold text-on-surface mb-2">Instructions &amp; Regulations</h4>
      <ul className="list-disc list-inside space-y-1.5 text-on-surface-variant font-light">
        <li>Maintain valid identity cards.</li>
        <li>Ensure webcams remain active during online testing.</li>
        <li>Submitting zip archives is mandatory for all code projects.</li>
      </ul>
    </div>
  );
};

export default ExamInstructions;
