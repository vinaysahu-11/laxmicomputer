import React from 'react';

const EmptyState = ({ title, description, icon, actionLabel, onActionClick }) => {
  return (
    <div className="bg-surface border border-outline-variant/60 rounded-3xl p-10 md:p-16 text-center max-w-lg mx-auto space-y-5 my-8">
      <span className="material-symbols-outlined text-outline text-6xl bg-surface-container-low p-5 rounded-full">
        {icon || 'inbox'}
      </span>
      <div className="space-y-2">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{title || 'No Records Found'}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant font-light">
          {description || 'There are no active records registered in the database directory yet.'}
        </p>
      </div>

      {actionLabel && (
        <button
          onClick={onActionClick}
          className="bg-primary text-on-primary font-label-md px-6 py-3 rounded-xl hover:bg-surface-tint shadow transition-all active:scale-95 text-sm inline-flex items-center gap-2"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
