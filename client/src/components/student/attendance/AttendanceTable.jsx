import React from 'react';

const AttendanceTable = ({ logs }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        Daily Biometric Logs
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-outline-variant/30 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider bg-surface-container-low/30">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Clock In</th>
              <th className="py-3 px-4">Class Session</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="font-body-sm font-light text-on-surface">
            {logs.map((log, i) => (
              <tr key={i} className="border-b border-outline-variant/15 hover:bg-surface-container-low/40 transition-colors">
                <td className="py-3.5 px-4 font-bold">{log.date}</td>
                <td className="py-3.5 px-4 font-medium text-xs">{log.time}</td>
                <td className="py-3.5 px-4 text-xs font-semibold text-on-surface-variant">{log.session}</td>
                <td className="py-3.5 px-4 text-right">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                    log.status === 'Present'
                      ? 'bg-green-500/10 text-green-700 border-green-500/20'
                      : 'bg-error-container text-on-error-container border-error-container/30'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
