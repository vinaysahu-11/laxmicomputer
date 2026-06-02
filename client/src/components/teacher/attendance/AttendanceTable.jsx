import React from 'react';

const AttendanceTable = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30">
      <div className="flex items-center justify-between mb-4 border-b border-outline-variant/10 pb-2">
        <h4 className="font-headline-sm text-sm font-bold text-on-surface">Attendance Log History</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant font-bold">
              <th className="py-2.5">Date</th>
              <th className="py-2.5">Subject</th>
              <th className="py-2.5">Present Count</th>
              <th className="py-2.5">Absent Count</th>
              <th className="py-2.5">Ratios</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
            <tr>
              <td className="py-3 font-semibold text-on-surface">June 02, 2026</td>
              <td className="py-3">CS-401 Cloud Infrastructure</td>
              <td className="py-3 text-primary font-bold">39 Students</td>
              <td className="py-3 text-error font-bold">3 Students</td>
              <td className="py-3">92.8%</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-on-surface">June 01, 2026</td>
              <td className="py-3">CS-402 Full Stack Systems</td>
              <td className="py-3 text-primary font-bold">34 Students</td>
              <td className="py-3 text-error font-bold">4 Students</td>
              <td className="py-3">89.4%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
