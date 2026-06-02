import React, { useState } from 'react';

const UploadVideoForm = ({ onComplete }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Recorded lecture video linked successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 max-w-xl">
      <h3 className="font-headline-sm text-headline-sm mb-4">Link / Upload Recorded Lectures</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter text-xs">
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Video Lecture Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Session 4: Docker Network Configuration" 
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Streaming / Cloud Drive Video Link</label>
          <input 
            type="url" 
            value={videoUrl} 
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="e.g. https://drive.google.com/..." 
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
            Link Video
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadVideoForm;
