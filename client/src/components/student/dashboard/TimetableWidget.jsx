import React from 'react';

const TimetableWidget = () => {
  const timetable = [
    { day: 'Mon', time: '10:00 AM', subject: 'React Basics', room: 'Virtual Room A' },
    { day: 'Tue', time: '02:00 PM', subject: 'SQL Indexing', room: 'Room 402' },
    { day: 'Wed', time: '10:00 AM', subject: 'State Slices', room: 'Virtual Room A' },
    { day: 'Thu', time: '02:00 PM', subject: 'Relational Calculus', room: 'Room 402' },
    { day: 'Fri', time: '10:00 AM', subject: 'Redux Thunk', room: 'Virtual Room A' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">calendar_view_week</span>
        <span>Weekly Timetable Overview</span>
      </h3>

      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full text-left border-collapse min-w-[320px]">
          <thead>
            <tr className="border-b border-outline-variant/30 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="py-2.5 px-2">Day</th>
              <th className="py-2.5 px-2">Time</th>
              <th className="py-2.5 px-2">Subject Topic</th>
              <th className="py-2.5 px-2 text-right">Room</th>
            </tr>
          </thead>
          <tbody className="font-body-sm font-light text-on-surface">
            {timetable.map((item) => (
              <tr key={item.day} className="border-b border-outline-variant/15 hover:bg-surface-container-low/30 transition-colors">
                <td className="py-3 px-2 font-bold text-primary">{item.day}</td>
                <td className="py-3 px-2 text-xs font-medium whitespace-nowrap">{item.time}</td>
                <td className="py-3 px-2 font-bold text-xs truncate max-w-[130px]" title={item.subject}>{item.subject}</td>
                <td className="py-3 px-2 text-right text-xs font-semibold text-on-surface-variant whitespace-nowrap">{item.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimetableWidget;
