import React from 'react';

const StudentsTable = () => {
  return (
    <div className="w-full bg-surface border border-outline-variant/60 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-outline-variant/60 bg-surface-container-low flex justify-between items-center">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Active Students</h3>
        <span className="text-xs text-outline">Showing active enrollments</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest text-on-surface-variant font-label-sm border-b border-outline-variant/40">
              <th className="p-4 uppercase tracking-wider font-semibold">Roll No</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Name</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Course</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Phone</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Status</th>
              <th className="p-4 uppercase tracking-wider font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
            <tr>
              <td className="p-4 font-semibold">LCS-101</td>
              <td className="p-4 text-on-surface font-normal">Priya Sharma</td>
              <td className="p-4">Web Development</td>
              <td className="p-4">+91 98765 43210</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">Active</span>
              </td>
              <td className="p-4 text-right flex justify-end gap-2">
                <button className="text-primary hover:text-surface-tint p-1" title="Edit">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button className="text-error hover:text-red-700 p-1" title="Delete">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
