import React, { useState } from 'react';

const UploadResultsForm = ({ onComplete }) => {
  const [semester, setSemester] = useState('spring');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Final semester results declared successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 max-w-xl">
      <h3 className="font-headline-sm text-headline-sm mb-4">Declare Final Semester Results</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter text-xs">
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Select Target Semester</label>
          <select 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)}
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="spring">Spring Semester 2026</option>
            <option value="fall">Fall Semester 2025</option>
          </select>
        </div>

        <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/20">
          <p className="font-semibold text-on-surface">Publishing Rules</p>
          <p className="text-on-surface-variant font-light mt-1 leading-relaxed">
            By publishing, all student GPAs for selected semesters will be updated dynamically. Notifications will be triggered across portal panels.
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button 
            type="button" 
            onClick={onComplete}
            className="bg-surface-container text-on-surface px-6 py-3 rounded-lg font-label-md hover:bg-surface-container-high transition-all cursor-pointer border border-outline-variant"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all hover:scale-[1.02] cursor-pointer border-none font-bold"
          >
            Publish Results
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadResultsForm;
