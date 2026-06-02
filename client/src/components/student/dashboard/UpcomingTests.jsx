import React from 'react';

const UpcomingTests = () => {
  const tests = [
    {
      id: 't-1',
      title: 'Monthly Assessment - React Hooks & Routing',
      subject: 'Full Stack Web Development',
      date: 'June 05, 2026',
      time: '10:00 AM',
      duration: '45 mins',
      status: 'Critical',
      syllabus: 'React States, Hooks (useState, useEffect), and React Router elements'
    },
    {
      id: 't-2',
      title: 'Mid-Term Exam - SQL Indexes & Architecture',
      subject: 'Database Management Systems',
      date: 'June 18, 2026',
      time: '02:00 PM',
      duration: '2 hours',
      status: 'Alert',
      syllabus: 'Normalizations (1NF, 2NF, 3NF), B-Tree Indexing, and DBMS storage schemas'
    }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-error/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-error text-lg">crisis_alert</span>
        <span>Upcoming Exams & Alerts</span>
      </h3>

      <div className="space-y-3.5">
        {tests.map((test) => (
          <div 
            key={test.id}
            className={`p-3.5 rounded-lg border transition-all flex flex-col gap-2.5 ${
              test.status === 'Critical'
                ? 'bg-error-container/10 border-error-container/30'
                : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/65'
            }`}
          >
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded border border-outline-variant/15">
                {test.subject}
              </span>
              
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                test.status === 'Critical'
                  ? 'bg-error-container text-on-error-container border-error-container'
                  : 'bg-tertiary-container text-on-tertiary-container border-tertiary-container'
              }`}>
                {test.status}
              </span>
            </div>

            <div>
              <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight">{test.title}</h4>
              <p className="text-[11px] text-on-surface-variant mt-1.5 font-medium flex items-center gap-1.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">calendar_month</span>
                  <span>{test.date}</span>
                </span>
                <span className="mx-0.5 font-light text-outline">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  <span>{test.time} ({test.duration})</span>
                </span>
              </p>
            </div>

            <div className="pt-2 border-t border-outline-variant/20 text-[11px] leading-relaxed text-on-surface-variant">
              <span className="block font-semibold text-on-surface text-[10px] uppercase tracking-wider mb-0.5">Syllabus Criteria:</span>
              <p className="italic font-light">"{test.syllabus}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTests;
