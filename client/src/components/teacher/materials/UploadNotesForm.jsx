import React, { useState } from 'react';

const UploadNotesForm = ({ onComplete }) => {
  const [title, setTitle] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Academic slides published successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 max-w-xl">
      <h3 className="font-headline-sm text-headline-sm mb-4">Upload Study Notes / Slide Packs</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter text-xs">
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Document Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Introduction to Kubernetes" 
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Attach Document File</label>
          <div className="border-2 border-dashed border-outline-variant/40 rounded-xl p-6 text-center cursor-pointer hover:bg-surface-container transition-all flex flex-col items-center justify-center relative gap-1">
            <input 
              type="file" 
              accept=".pdf,.ppt,.pptx" 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <span className="material-symbols-outlined text-primary text-2xl mb-1">upload_file</span>
            <p className="font-semibold text-on-surface">Click or Drag &amp; Drop slides or notes PDF/PPT</p>
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
            Publish Slides
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadNotesForm;
