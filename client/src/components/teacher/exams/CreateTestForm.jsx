import React, { useState } from 'react';

const CreateTestForm = ({ onComplete }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('CS-401');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('2 Hours');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Assessment created successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 max-w-xl">
      <h3 className="font-headline-sm text-headline-sm mb-4">Create Assessment / Test</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter text-xs">
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Test Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Mid-Term Examination" 
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-stack-md">
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Course Code</label>
            <select 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="CS-401">CS-401 Cloud Infrastructure</option>
              <option value="CS-402">CS-402 Full Stack Systems</option>
              <option value="CS-409">CS-409 Practical Lab</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Duration</label>
            <input 
              type="text" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Date &amp; Schedule Time</label>
          <input 
            type="datetime-local" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
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
            Publish Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTestForm;
