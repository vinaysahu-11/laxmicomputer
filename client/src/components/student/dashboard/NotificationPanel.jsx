import React from 'react';

const NotificationPanel = () => {
  const notifications = [
    {
      id: 'notif-1',
      title: 'Dussehra Holiday Notice',
      description: 'The academy will remain closed from October 22 to October 24 for Dussehra celebrations. Regular lectures resume October 25.',
      time: '1 hour ago',
      category: 'Holiday',
      important: true
    },
    {
      id: 'notif-2',
      title: 'Biometric Attendance Verification Required',
      description: 'All new cohort students must complete biometric registry scans by June 08. Check in with the Administrative registrar Desk.',
      time: '1 day ago',
      category: 'Admin',
      important: false
    },
    {
      id: 'notif-3',
      title: 'Python Semester Exam Dates',
      description: 'The final practical laboratory exams for Python Web Programming are scheduled for June 12-14. Download the syllabus guide sheets.',
      time: '3 days ago',
      category: 'Exam',
      important: true
    }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">notifications</span>
        <span>Recent Academy Announcements</span>
      </h3>

      <div className="space-y-3.5 max-h-[330px] overflow-y-auto pr-1.5 custom-scrollbar">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`p-3 rounded-lg border transition-all flex flex-col gap-1.5 ${
              notif.important
                ? 'bg-primary-container/15 border-primary/25'
                : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/50'
            }`}
          >
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                notif.important
                  ? 'bg-primary-container text-on-primary-container border-primary-container'
                  : 'bg-surface-container text-on-surface-variant border-outline-variant/40'
              }`}>
                {notif.category}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">{notif.time}</span>
            </div>

            <div>
              <h4 className="font-label-sm text-label-sm font-bold text-on-surface leading-snug">{notif.title}</h4>
              <p className="text-[11px] text-on-surface-variant mt-1.5 font-light leading-relaxed">
                {notif.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
