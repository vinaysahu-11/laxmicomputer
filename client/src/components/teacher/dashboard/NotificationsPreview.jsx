import React from 'react';

const NotificationsPreview = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left">
      <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/10 pb-2">
        <span className="material-symbols-outlined text-primary text-lg">notifications</span>
        <h4 className="font-headline-sm text-sm font-bold">Academic Notices</h4>
      </div>
      <div className="space-y-3 text-xs">
        <div className="border-b border-outline-variant/10 pb-2 last:border-0 last:pb-0">
          <p className="font-bold text-on-surface">Spring Mid-Term Exams Schedule</p>
          <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Today at 10:30 AM | Exam Cell</p>
        </div>
        <div className="border-b border-outline-variant/10 pb-2 last:border-0 last:pb-0">
          <p className="font-bold text-on-surface">Maintenance: Lab Servers Offline</p>
          <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Yesterday at 04:00 PM | IT Dept</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPreview;
