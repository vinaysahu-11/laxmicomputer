import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="border-b border-outline-variant/20 pb-4 mb-6 text-left">
      <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold leading-tight">{title}</h2>
      {subtitle && (
        <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
