import React from 'react';
import CertificateDownload from './CertificateDownload';
import CertificateStatus from './CertificateStatus';

const CertificateCard = ({ certificate }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between h-44">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded border border-outline-variant/20">
            {certificate.category}
          </span>
          <CertificateStatus status={certificate.status} />
        </div>
        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight mt-3">{certificate.title}</h4>
        <p className="text-[10px] text-on-surface-variant mt-1.5 font-light leading-none">Issued: <strong className="text-on-surface font-semibold">{certificate.date}</strong></p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex justify-end">
        {certificate.status === 'Released' && (
          <CertificateDownload certificate={certificate} />
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
