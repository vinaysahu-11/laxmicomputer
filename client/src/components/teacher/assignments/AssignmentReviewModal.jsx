import React, { useState } from 'react';

const AssignmentReviewModal = ({ studentName, onClose, onSubmitGrade }) => {
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitGrade) {
      onSubmitGrade(score, feedback);
    } else {
      alert(`Submissions graded successfully for student: ${studentName}!`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/20">
        
        <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">grading</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Review Assignment</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <p className="font-body-md text-on-surface-variant font-light">
            Grading submissions for student: <strong>{studentName}</strong>. Attach review metrics and score.
          </p>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5 uppercase font-semibold">Score / Grade (Max: 100)</label>
            <input 
              type="number" 
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="e.g. 92"
              className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5 uppercase font-semibold">Teacher Remarks</label>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive notes for students..."
              rows="4"
              className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none resize-none font-light"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="submit"
              className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md border-none cursor-pointer hover:bg-primary-container transition-all hover:scale-[1.02] font-bold"
            >
              Publish Grade
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-md border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors font-bold"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AssignmentReviewModal;
