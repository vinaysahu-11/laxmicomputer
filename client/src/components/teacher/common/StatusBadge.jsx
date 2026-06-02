import React from 'react';

const StatusBadge = ({ type, label }) => {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase select-none border ${
      type === 'success' ? 'bg-tertiary-container/20 text-on-tertiary-fixed-variant border-tertiary/20' :
      type === 'error' ? 'bg-error-container/20 text-on-error-container border-error/20' :
      type === 'warning' ? 'bg-warning-container/20 text-on-warning-container border-warning/20' :
      'bg-surface-container text-on-surface-variant border-outline-variant/35'
    }`}>
      {label}
    </span>
  );
};

export default StatusBadge;
