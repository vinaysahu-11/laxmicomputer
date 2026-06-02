import React from 'react';

const ResultsTable = ({ scores }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        Verified Grades Registry
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-outline-variant/30 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider bg-surface-container-low/30">
              <th className="py-3 px-4">Exam Name</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4 text-right">Grade Letter</th>
            </tr>
          </thead>
          <tbody className="font-body-sm font-light text-on-surface">
            {scores.map((item, i) => (
              <tr key={i} className="border-b border-outline-variant/15 hover:bg-surface-container-low/40 transition-colors">
                <td className="py-3.5 px-4 font-bold">{item.exam}</td>
                <td className="py-3.5 px-4 text-xs font-semibold text-on-surface-variant">{item.subject}</td>
                <td className="py-3.5 px-4 text-xs font-bold">{item.score}</td>
                <td className="py-3.5 px-4 text-right text-xs font-extrabold text-primary">{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
