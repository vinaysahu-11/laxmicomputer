import React from 'react';

const CertificatesOverview = () => {
  const certificates = [
    { id: 'crt-1', title: 'Basic HTML5 & Visual styling Certificate', course: 'Full Stack Web Development', date: 'April 2026' },
    { id: 'crt-2', title: 'Computer Applications Diploma Core', course: 'Diploma in Computer Applications', date: 'December 2025' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">verified</span>
        <span>Download Academic Certificates</span>
      </h3>

      <div className="space-y-3.5">
        {certificates.map((cert) => (
          <div key={cert.id} className="p-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-left flex justify-between items-center gap-4 flex-wrap">
            <div className="min-w-0 flex-1">
              <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight truncate" title={cert.title}>{cert.title}</h4>
              <p className="text-[10px] text-on-surface-variant font-medium mt-1">
                Course: {cert.course} • <span className="font-semibold">{cert.date}</span>
              </p>
            </div>

            <button 
              type="button" 
              className="bg-primary-container hover:bg-primary-container/80 text-on-primary-container px-3.5 py-1.5 rounded font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0"
            >
              <span className="material-symbols-outlined text-xs font-bold">download</span>
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesOverview;
