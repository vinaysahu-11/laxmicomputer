import React, { useState } from 'react';

const UploadMarksForm = ({ onComplete }) => {
  const [test, setTest] = useState('quiz3');
  const [marks, setMarks] = useState([
    { id: 1, name: 'Alex Smith', score: '18' },
    { id: 2, name: 'Emily Davis', score: '16' },
  ]);

  const handleScoreChange = (id, value) => {
    setMarks(marks.map(m => m.id === id ? { ...m, score: value } : m));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Assessment marks published successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 max-w-xl">
      <h3 className="font-headline-sm text-headline-sm mb-4">Upload Assessment Marks</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter text-xs">
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Select Test</label>
          <select 
            value={test} 
            onChange={(e) => setTest(e.target.value)}
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-semibold text-xs"
          >
            <option value="quiz3">CS-401 Cloud Infrastructure Quiz 3</option>
            <option value="practical">CS-402 Full-Stack Lab Practical</option>
          </select>
        </div>

        <div className="space-y-3">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold text-xs">Score Input</p>
          {marks.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-3 p-3 bg-surface rounded-lg border border-outline-variant/20">
              <span className="font-semibold">{m.name}</span>
              <input 
                type="number" 
                value={m.score} 
                onChange={(e) => handleScoreChange(m.id, e.target.value)}
                placeholder="Marks / 20" 
                className="w-24 p-2 bg-surface-container border border-outline-variant rounded-lg text-center outline-none"
                required
              />
            </div>
          ))}
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
            Save Grades
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadMarksForm;
