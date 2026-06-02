import React, { useState } from 'react';

const QuestionPaperUpload = ({ onComplete }) => {
  const [test, setTest] = useState('midterm');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName) {
      alert('Please upload a PDF document!');
      return;
    }
    alert('Question paper linked to exam schedule successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 max-w-xl">
      <h3 className="font-headline-sm text-headline-sm mb-4">Upload Exam Question Papers</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter text-xs">
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Select Target Exam</label>
          <select 
            value={test} 
            onChange={(e) => setTest(e.target.value)}
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-semibold text-xs"
          >
            <option value="midterm">CS-401 Cloud Infrastructure Mid-Term Theory</option>
            <option value="lab">CS-402 Full-Stack Lab Practical</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Upload PDF File</label>
          <div className="border-2 border-dashed border-outline-variant/40 rounded-xl p-6 text-center cursor-pointer hover:bg-surface-container transition-all flex flex-col items-center justify-center relative gap-1">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <span className="material-symbols-outlined text-primary text-2xl mb-1">upload_file</span>
            <p className="font-semibold text-on-surface">Click or Drag &amp; Drop Question Paper PDF</p>
            <p className="text-on-surface-variant font-light text-[10px] mt-0.5">Only PDF documents are allowed (Max size: 8MB)</p>
            {fileName && (
              <p className="text-primary font-bold mt-2 text-[10px]">Selected: {fileName}</p>
            )}
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
            Save File
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionPaperUpload;
