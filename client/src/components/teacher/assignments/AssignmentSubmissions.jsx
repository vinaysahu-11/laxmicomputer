import React, { useState } from 'react';
import AssignmentReviewModal from './AssignmentReviewModal';

const AssignmentSubmissions = ({ assignmentId, onBack }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const submissions = [
    { id: 1, name: 'Alex Smith', email: 'alex.smith@itacademy.edu', date: 'June 01, 2026', file: 'React_Hooks_Alex.zip', status: 'pending' },
    { id: 2, name: 'Emily Davis', email: 'emily.davis@itacademy.edu', date: 'June 02, 2026', file: 'React_Hooks_Emily.zip', status: 'pending' },
  ];

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 text-xs flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
        <div>
          <h4 className="font-bold text-on-surface">Assignment Submissions</h4>
          <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Reviews for Assignment: {assignmentId}</p>
        </div>
        <button 
          onClick={onBack}
          className="text-primary font-bold hover:underline cursor-pointer border-none bg-transparent outline-none"
        >
          Back to List
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant font-bold">
              <th className="py-2.5">Student</th>
              <th className="py-2.5">Date Submitted</th>
              <th className="py-2.5">Uploaded File</th>
              <th className="py-2.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
            {submissions.map((sub) => (
              <tr key={sub.id}>
                <td className="py-3 font-semibold text-on-surface">{sub.name}</td>
                <td className="py-3">{sub.date}</td>
                <td className="py-3 text-primary font-bold select-all hover:underline cursor-pointer">{sub.file}</td>
                <td className="py-3">
                  <button 
                    onClick={() => setSelectedStudent(sub.name)}
                    className="bg-primary text-on-primary px-3 py-1 rounded text-[10px] font-bold border-none cursor-pointer outline-none"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <AssignmentReviewModal 
          studentName={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
};

export default AssignmentSubmissions;
