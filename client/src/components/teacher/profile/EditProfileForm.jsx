import React, { useState } from 'react';

const EditProfileForm = ({ onComplete }) => {
  const [bio, setBio] = useState('Passionate about full-stack engineering practices...');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Biography logs updated successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 text-xs">
      <h3 className="font-headline-sm text-headline-sm mb-4">Edit Profile Biography</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter">
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Short Biography</label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)}
            rows="4" 
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none font-light"
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
