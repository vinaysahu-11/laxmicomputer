import React from 'react';

const AcademicDetails = () => {
  const academics = [
    { label: 'Current Cohort', value: 'Web Design B12' },
    { label: 'Primary Mentor', value: 'Prof. Sarah Jenkins' },
    { label: 'Current CGPA', value: '3.91 / 4.0' },
    { label: 'Eligible Credits', value: '45 / 50 Credits' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">school</span>
        <span>Academic Profile Summary</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academics.map((academic) => (
          <div key={academic.label} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-left">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">{academic.label}</span>
            <span className="font-bold text-on-surface block text-sm mt-1">{academic.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicDetails;
