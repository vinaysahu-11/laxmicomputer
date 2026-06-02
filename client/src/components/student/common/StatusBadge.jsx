import React from 'react';

const StatusBadge = ({ status }) => {
  const normalized = (status || '').toLowerCase().trim();

  let styles = 'bg-surface-container text-on-surface-variant border-outline-variant/35';
  if (normalized === 'active' || normalized === 'delivered' || normalized === 'paid' || normalized === 'approved') {
    styles = 'bg-green-500/10 text-green-700 border-green-500/20';
  } else if (normalized === 'pending' || normalized === 'warning' || normalized === 'scheduled') {
    styles = 'bg-secondary-container text-on-secondary-container border-secondary-container';
  } else if (normalized === 'critical' || normalized === 'overdue' || normalized === 'absent' || normalized === 'rejected') {
    styles = 'bg-error-container text-on-error-container border-error-container/30';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border whitespace-nowrap ${styles}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
