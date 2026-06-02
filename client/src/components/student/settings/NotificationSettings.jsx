import React, { useState } from 'react';

const NotificationSettings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [examReminders, setExamReminders] = useState(true);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">notifications</span>
        <span>Notification Settings</span>
      </h3>

      <div className="space-y-3.5">
        {/* Email Alerts toggle */}
        <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface font-bold leading-none">Email Notifications</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 font-light">Receive reports and schedules via email</span>
          </div>
          <button 
            type="button"
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`w-12 h-6 rounded-full relative transition-all duration-200 cursor-pointer outline-none border-none ${
              emailAlerts ? 'bg-primary' : 'bg-outline-variant'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
              emailAlerts ? 'right-1' : 'left-1'
            }`}></div>
          </button>
        </div>

        {/* SMS Alerts toggle */}
        <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface font-bold leading-none">SMS Text Alerts</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 font-light">Receive class links and alert codes directly</span>
          </div>
          <button 
            type="button"
            onClick={() => setSmsAlerts(!smsAlerts)}
            className={`w-12 h-6 rounded-full relative transition-all duration-200 cursor-pointer outline-none border-none ${
              smsAlerts ? 'bg-primary' : 'bg-outline-variant'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
              smsAlerts ? 'right-1' : 'left-1'
            }`}></div>
          </button>
        </div>

        {/* Exams Alerts toggle */}
        <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface font-bold leading-none">Exam Reminders</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 font-light">Receive alerts 24 hours prior to exams</span>
          </div>
          <button 
            type="button"
            onClick={() => setExamReminders(!examReminders)}
            className={`w-12 h-6 rounded-full relative transition-all duration-200 cursor-pointer outline-none border-none ${
              examReminders ? 'bg-primary' : 'bg-outline-variant'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
              examReminders ? 'right-1' : 'left-1'
            }`}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
