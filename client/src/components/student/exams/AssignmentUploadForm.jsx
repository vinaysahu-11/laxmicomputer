import React, { useState } from 'react';

const AssignmentUploadForm = ({ assignment, onSubmitSuccess, onClose }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onSubmitSuccess(`Successfully uploaded your submission file: "${file.name}"`);
  };

  return (
    <div className="p-5 space-y-4 text-left">
      <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
        <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Submit Assignment Work</h4>
        <button onClick={onClose} className="material-symbols-outlined text-on-surface-variant hover:text-on-surface text-base">close</button>
      </div>

      <div>
        <p className="font-bold text-xs uppercase text-on-surface-variant">Active Assignment Target:</p>
        <h5 className="font-label-md text-label-md font-bold mt-1 text-on-surface leading-tight">{assignment?.title}</h5>
        <span className="text-[10px] text-on-surface-variant font-medium mt-1.5 block">Points Weight: {assignment?.points}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-outline-variant/60 hover:border-primary/50 transition-all rounded-xl p-6 text-center cursor-pointer bg-surface relative">
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2 block">cloud_upload</span>
          <span className="font-bold text-xs text-on-surface block">
            {file ? file.name : 'Select or drop assignment file here'}
          </span>
          <span className="text-[10px] text-on-surface-variant mt-1.5 block">PDF, ZIP, or DOCX formats accepted (Max 10MB)</span>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2 border border-outline-variant rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={!file}
            className={`px-5 py-2 bg-primary text-on-primary rounded-lg font-bold text-xs shadow-md transition-all uppercase tracking-wider ${
              !file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-tint active:scale-95 duration-100'
            }`}
          >
            Submit Files
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentUploadForm;
