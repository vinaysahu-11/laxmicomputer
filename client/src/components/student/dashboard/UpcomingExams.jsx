import React from 'react';

const UpcomingExams = () => {
  const exams = [
    { id: 'ex-1', title: 'React Hooks & State API', date: 'June 05, 2026', time: '10:00 AM' },
    { id: 'ex-2', title: 'DBMS Norms & Query Logic', date: 'June 18, 2026', time: '02:00 PM' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm text-left">
      <h4 className="font-label-sm text-label-sm font-bold text-on-surface mb-3 flex items-center gap-1.5 uppercase tracking-wider border-b border-outline-variant/20 pb-1.5">
        <span className="material-symbols-outlined text-primary text-base">crisis_alert</span>
        <span>Exams Alert</span>
      </h4>
      <div className="space-y-3">
        {exams.map((ex) => (
          <div key={ex.id} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg flex flex-col gap-1.5">
            <h5 className="font-bold text-xs leading-tight text-on-surface">{ex.title}</h5>
            <p className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">schedule</span>
              <span>{ex.date} at {ex.time}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingExams;
