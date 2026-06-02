import React from 'react';

const StudentDetails = () => {
  const details = [
    { label: 'Date of Birth', value: 'August 14, 2004' },
    { label: 'Gender', value: 'Female' },
    { label: 'Blood Group', value: 'B+ Positive' },
    { label: 'Emergency Contact', value: '+1 (555) 091-2384' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">info</span>
        <span>Personal Details</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((det) => (
          <div key={det.label} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-left">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">{det.label}</span>
            <span className="font-bold text-on-surface block text-sm mt-1">{det.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;
