import React from 'react';

const UpcomingClasses = () => {
  const classes = [
    {
      id: 'c-1',
      title: 'Full Stack Web Development - React Basics',
      type: 'Online',
      status: 'Live',
      time: '10:00 AM - 11:30 AM',
      instructor: 'Prof. Sarah Jenkins',
      joinLink: '#',
      room: 'Virtual Room A'
    },
    {
      id: 'c-2',
      title: 'Database Management Systems - SQL Indexing',
      type: 'Offline',
      status: 'Scheduled',
      time: '02:00 PM - 03:30 PM',
      instructor: 'Dr. Julian Vance',
      room: 'Room 402, Block B'
    }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
      
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
        <span>Today's Classes & Schedule</span>
      </h3>

      <div className="space-y-3.5">
        {classes.map((cls) => (
          <div 
            key={cls.id}
            className={`p-3.5 rounded-lg border transition-all flex flex-col gap-2.5 ${
              cls.status === 'Live'
                ? 'bg-primary-container/20 border-primary/30'
                : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/65'
            }`}
          >
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                cls.type === 'Online'
                  ? 'bg-secondary-container text-on-secondary-container border-secondary-container'
                  : 'bg-surface-container-high text-on-surface-variant border-outline-variant/40'
              }`}>
                {cls.type}
              </span>
              
              {cls.status === 'Live' ? (
                <span className="flex items-center gap-1 text-[10px] text-error font-bold uppercase tracking-wider bg-error-container/20 px-2 py-0.5 rounded-full border border-error-container/40 animate-pulse">
                  <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
                  Live Now
                </span>
              ) : (
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant/20">
                  Scheduled
                </span>
              )}
            </div>

            <div>
              <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight">{cls.title}</h4>
              <p className="text-[11px] text-on-surface-variant mt-1.5 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">schedule</span>
                <span>{cls.time}</span>
                <span className="mx-1">•</span>
                <span className="material-symbols-outlined text-xs">room</span>
                <span>{cls.room}</span>
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-outline-variant/20 flex-wrap gap-2 text-[11px] font-medium text-on-surface-variant">
              <span>Instructor: <strong className="text-on-surface">{cls.instructor}</strong></span>
              {cls.status === 'Live' && cls.joinLink && (
                <a 
                  href={cls.joinLink}
                  className="bg-primary hover:bg-surface-tint text-on-primary px-3.5 py-1 rounded font-bold transition-all text-[10px] uppercase tracking-wider shadow-sm hover:scale-102 active:scale-95 duration-100"
                >
                  Join Lecture
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;
