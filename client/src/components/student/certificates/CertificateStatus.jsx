import React from 'react';

const CertificateStatus = ({ status }) => {
  const normalized = (status || '').toLowerCase().trim();

  let styles = 'bg-surface-container text-on-surface-variant border-outline-variant/35';
  if (normalized === 'released' || normalized === 'issued') {
    styles = 'bg-green-500/10 text-green-700 border-green-500/20';
  } else if (normalized === 'pending' || normalized === 'verifying') {
    styles = 'bg-secondary-container text-on-secondary-container border-secondary-container';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider border ${styles}`}>
      {status}
    </span>
  );
};

export default CertificateStatus;
