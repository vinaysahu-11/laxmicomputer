import React from 'react';

const NotificationsPreview = () => {
  const alerts = [
    { id: 'nt-1', title: 'Dussehra Holiday Notice', time: '1 hour ago', important: true },
    { id: 'nt-2', title: 'Biometric Registry Check', time: '1 day ago', important: false }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm text-left">
      <h4 className="font-label-sm text-label-sm font-bold text-on-surface mb-3 flex items-center gap-1.5 uppercase tracking-wider border-b border-outline-variant/20 pb-1.5">
        <span className="material-symbols-outlined text-primary text-base">notifications</span>
        <span>Notice Board</span>
      </h4>
      <div className="space-y-3">
        {alerts.map((al) => (
          <div key={al.id} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center gap-2">
              <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${
                al.important ? 'bg-primary-container text-on-primary-container border-primary-container' : 'bg-surface-container text-on-surface-variant border-outline-variant/35'
              }`}>
                {al.important ? 'Important' : 'Notice'}
              </span>
              <span className="text-[9px] text-on-surface-variant font-medium">{al.time}</span>
            </div>
            <h5 className="font-bold text-xs leading-snug text-on-surface">{al.title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPreview;
