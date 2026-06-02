import React, { useState } from 'react';

const PrivacySettings = () => {
  const [publicProfile, setPublicProfile] = useState(true);

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm border border-outline-variant/30 text-left text-xs">
      <div className="flex items-center gap-3 mb-stack-md border-b border-outline-variant/15 pb-2">
        <span className="material-symbols-outlined text-primary">visibility</span>
        <h3 className="font-headline-sm text-sm font-bold text-on-surface">Privacy Settings</h3>
      </div>
      <div className="space-y-4 mt-4 font-semibold text-on-surface-variant">
        <div className="flex items-center justify-between">
          <span>Show Profile to Students</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={publicProfile} 
              onChange={() => setPublicProfile(!publicProfile)}
              className="sr-only peer cursor-pointer"
            />
            <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
