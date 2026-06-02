import React from 'react';

const PageHeader = ({ title, description, children }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-gutter border-b border-outline-variant/20 pb-4 text-left">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-1">{title}</h2>
        {description && <p className="font-body-md text-on-surface-variant text-sm font-light">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-3 shrink-0">{children}</div>}
    </div>
  );
};

export default PageHeader;
