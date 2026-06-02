import React from 'react';

const ResultOverview = () => {
  const results = [
    { id: 'res-1', exam: 'Monthly Assessment 3', course: 'React Basics', grade: 'A', score: '92%', date: 'May 20, 2026' },
    { id: 'res-2', exam: 'Mid-Term Examination', course: 'SQL & Database Design', grade: 'B+', score: '85%', date: 'May 04, 2026' },
    { id: 'res-3', exam: 'DCA Practical Final', course: 'Basic Computer Applications', grade: 'A+', score: '98%', date: 'Apr 12, 2026' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">military_tech</span>
        <span>Recent Exam Results</span>
      </h3>

      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full text-left border-collapse min-w-[320px]">
          <thead>
            <tr className="border-b border-outline-variant/30 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="py-2.5 px-2">Exam Description</th>
              <th className="py-2.5 px-2">Course</th>
              <th className="py-2.5 px-2">Score</th>
              <th className="py-2.5 px-2 text-right">Grade</th>
            </tr>
          </thead>
          <tbody className="font-body-sm font-light text-on-surface">
            {results.map((item) => (
              <tr key={item.id} className="border-b border-outline-variant/15 hover:bg-surface-container-low/30 transition-colors">
                <td className="py-3 px-2 leading-tight">
                  <span className="font-bold block text-xs">{item.exam}</span>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">{item.date}</span>
                </td>
                <td className="py-3 px-2 text-xs font-semibold text-on-surface-variant">{item.course}</td>
                <td className="py-3 px-2 text-xs font-bold">{item.score}</td>
                <td className="py-3 px-2 text-right text-xs font-extrabold text-primary">{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultOverview;
