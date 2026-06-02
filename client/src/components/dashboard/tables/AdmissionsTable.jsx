import React from 'react';

const AdmissionsTable = () => {
  return (
    <div className="w-full bg-surface border border-outline-variant/60 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-outline-variant/60 bg-surface-container-low flex justify-between items-center">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">New Inquiries</h3>
        <span className="text-xs text-outline">Manage admissions pipeline</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest text-on-surface-variant font-label-sm border-b border-outline-variant/40">
              <th className="p-4 uppercase tracking-wider font-semibold">Date</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Applicant</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Course Preference</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Phone</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Status</th>
              <th className="p-4 uppercase tracking-wider font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
            <tr>
              <td className="p-4 font-semibold">2026-06-02</td>
              <td className="p-4 text-on-surface font-normal">Karan Adani</td>
              <td className="p-4">Data Science & AI</td>
              <td className="p-4">+91 99988 87776</td>
              <td className="p-4">
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">New Inquiry</span>
              </td>
              <td className="p-4 text-right flex justify-end gap-2">
                <button className="text-primary hover:text-surface-tint p-1" title="Approve">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </button>
                <button className="text-error hover:text-red-700 p-1" title="Reject">
                  <span className="material-symbols-outlined text-lg">cancel</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionsTable;
