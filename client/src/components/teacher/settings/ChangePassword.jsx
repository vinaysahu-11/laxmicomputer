import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('🔑 Security password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow text-left border border-outline-variant/30 text-xs">
      <div className="flex items-center gap-3 mb-stack-md">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Security &amp; Password</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase">Current Password</label>
            <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase">New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button 
            type="submit"
            className="bg-primary text-on-primary px-stack-lg py-3 rounded-lg font-label-md hover:bg-primary-container hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-none font-bold"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
