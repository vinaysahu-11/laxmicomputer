import React from 'react';

const ProfessionalDetails = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm border border-outline-variant/30 text-left text-xs">
      <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/10 pb-2">
        <span className="material-symbols-outlined text-primary text-lg">school</span>
        <h4 className="font-headline-sm text-sm font-bold">Academic &amp; Professional Credentials</h4>
      </div>
      <div className="space-y-3 font-light text-on-surface-variant leading-relaxed">
        <div>
          <p className="font-semibold text-on-surface">Highest Qualification</p>
          <p className="mt-0.5">Ph.D. in Computer Science &amp; Distributed Systems</p>
        </div>
        <div>
          <p className="font-semibold text-on-surface">Experience</p>
          <p className="mt-0.5">12+ Years in academic instruction and software architecture consultancies</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
