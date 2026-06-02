import React, { useState } from 'react';

const CreateAssignmentForm = ({ onComplete }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('cs402');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Assignment folder created successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 max-w-xl">
      <h3 className="font-headline-sm text-headline-sm mb-4">Publish Assignment Folder</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter text-xs">
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Assignment Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. React Redux State Integration" 
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-stack-md">
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Select Course</label>
            <select 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="cs402">CS-402 Full Stack Systems</option>
              <option value="cs401">CS-401 Cloud Infrastructure</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Due Date</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>
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
            Publish Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignmentForm;
