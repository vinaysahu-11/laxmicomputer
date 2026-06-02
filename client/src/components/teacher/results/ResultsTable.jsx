import React from 'react';

const ResultsTable = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30">
      <div className="flex items-center justify-between mb-4 border-b border-outline-variant/10 pb-2">
        <h4 className="font-headline-sm text-sm font-bold text-on-surface">Declared Student Grades</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant font-bold">
              <th className="py-2.5">Roll No.</th>
              <th className="py-2.5">Student</th>
              <th className="py-2.5">Cloud Infra</th>
              <th className="py-2.5">Full Stack</th>
              <th className="py-2.5">Syllabus Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
            <tr>
              <td className="py-3 font-semibold text-on-surface">CS-2026-004</td>
              <td className="py-3 font-semibold text-on-surface">Alex Smith</td>
              <td className="py-3 text-primary font-bold">92% (A)</td>
              <td className="py-3 text-primary font-bold">88% (A-)</td>
              <td className="py-3">3.82 CGPA</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-on-surface">CS-2026-012</td>
              <td className="py-3 font-semibold text-on-surface">Emily Davis</td>
              <td className="py-3 text-primary font-bold">86% (B+)</td>
              <td className="py-3 text-primary font-bold">94% (A)</td>
              <td className="py-3">3.74 CGPA</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
