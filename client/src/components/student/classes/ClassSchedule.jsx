import React from 'react';

const ClassSchedule = ({ schedule }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm text-left">
      <h4 className="font-label-sm text-label-sm font-bold text-on-surface mb-3 flex items-center gap-1.5 uppercase tracking-wider border-b border-outline-variant/20 pb-1.5">
        <span className="material-symbols-outlined text-primary text-base">calendar_view_week</span>
        <span>Schedule Overview</span>
      </h4>
      <div className="overflow-x-auto hide-scrollbar">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-outline-variant/30 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="py-2 px-2 text-left">Time</th>
              <th className="py-2 px-2 text-left">Topic & Subject</th>
              <th className="py-2 px-2 text-right">Instructor</th>
            </tr>
          </thead>
          <tbody className="font-light text-on-surface">
            {schedule.map((item, i) => (
              <tr key={i} className="border-b border-outline-variant/15 hover:bg-surface-container-low/30 transition-all">
                <td className="py-2.5 px-2 font-semibold whitespace-nowrap">{item.time}</td>
                <td className="py-2.5 px-2 font-bold text-xs truncate max-w-[150px]">{item.subject}</td>
                <td className="py-2.5 px-2 text-right font-medium text-on-surface-variant">{item.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassSchedule;
