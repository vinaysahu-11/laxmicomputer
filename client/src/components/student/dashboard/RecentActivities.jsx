import React from 'react';

const RecentActivities = () => {
  const activities = [
    {
      id: 'act-1',
      title: 'Submitted Assignment 4 - React Routing',
      category: 'Assignment',
      time: '2 hours ago',
      icon: 'drive_file_upload',
      color: 'text-primary bg-primary-container/20 border-primary/20'
    },
    {
      id: 'act-2',
      title: 'Fee Installment Paid - $250',
      category: 'Payment',
      time: 'Yesterday',
      icon: 'payments',
      color: 'text-green-600 bg-green-500/10 border-green-500/20'
    },
    {
      id: 'act-3',
      title: 'Downloaded Certificate - HTML Basics',
      category: 'Certificate',
      time: '3 days ago',
      icon: 'verified',
      color: 'text-tertiary bg-tertiary-container/20 border-tertiary/20'
    },
    {
      id: 'act-4',
      title: 'Completed Test 3 - JavaScript ES6',
      category: 'Exam',
      time: '4 days ago',
      icon: 'grade',
      color: 'text-purple-600 bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">history</span>
        <span>Recent Portal Activities</span>
      </h3>

      <div className="space-y-3.5 max-h-[330px] overflow-y-auto pr-1.5 custom-scrollbar">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-3.5 items-start">
            <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 border ${act.color}`}>
              <span className="material-symbols-outlined text-base">{act.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label-sm text-label-sm font-bold text-on-surface leading-tight">{act.title}</p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                <span>{act.category}</span>
                <span className="font-light text-outline">•</span>
                <span>{act.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
