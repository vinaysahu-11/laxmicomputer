import React from 'react';

const ClassSchedule = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30">
      <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/10 pb-2">
        <span className="material-symbols-outlined text-primary text-lg">calendar_month</span>
        <h4 className="font-headline-sm text-sm font-bold">Weekly Schedule</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant font-bold">
              <th className="py-2.5">Day</th>
              <th className="py-2.5">Time</th>
              <th className="py-2.5">Subject</th>
              <th className="py-2.5">Format</th>
              <th className="py-2.5">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
            <tr>
              <td className="py-3 font-semibold text-on-surface">Monday</td>
              <td className="py-3">10:00 AM - 11:30 AM</td>
              <td className="py-3">CS-401 Cloud Infrastructure</td>
              <td className="py-3">Live</td>
              <td className="py-3">L-Hall A</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-on-surface">Wednesday</td>
              <td className="py-3">02:00 PM - 03:30 PM</td>
              <td className="py-3">CS-402 Full Stack Systems</td>
              <td className="py-3">Online</td>
              <td className="py-3">L-Hall B</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-on-surface">Friday</td>
              <td className="py-3">04:00 PM - 05:30 PM</td>
              <td className="py-3">CS-409 Practical Lab</td>
              <td className="py-3">Offline</td>
              <td className="py-3">Lab 402</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassSchedule;
