import React from 'react';

const CertificateDownload = ({ certificate }) => {
  return (
    <button 
      type="button"
      className="bg-primary-container text-on-primary-container hover:bg-primary-container/85 px-3.5 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm transition-all"
    >
      <span className="material-symbols-outlined text-xs font-bold">download</span>
      <span>Download PDF</span>
    </button>
  );
};

export default CertificateDownload;
