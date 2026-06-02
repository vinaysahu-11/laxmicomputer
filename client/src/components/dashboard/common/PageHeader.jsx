import React from 'react';

const PageHeader = ({ title, subtitle, actionLabel, onActionClick, actionIcon }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-outline-variant/40 mb-6 text-left">
      <div className="space-y-1">
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">{title}</h1>
        {subtitle && <p className="font-body-sm text-body-sm text-on-surface-variant font-light">{subtitle}</p>}
      </div>

      {actionLabel && (
        <button
          onClick={onActionClick}
          className="bg-primary text-on-primary font-label-md px-5 py-3 rounded-xl hover:bg-surface-tint shadow hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 self-start sm:self-auto text-sm"
        >
          {actionIcon && <span className="material-symbols-outlined text-lg">{actionIcon}</span>}
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default PageHeader;
