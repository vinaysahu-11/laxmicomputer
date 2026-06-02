import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Update password click');
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">lock</span>
        <span>Change Password</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Current Password</label>
          <div className="relative">
            <input 
              type={isPasswordVisible ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface pr-10" 
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer border-none bg-transparent flex items-center justify-center p-1 hover:text-primary outline-none"
            >
              {isPasswordVisible ? 'visibility_off' : 'visibility'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">New Password</label>
          <input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Confirm New Password</label>
          <input 
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
          />
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            className="bg-primary hover:bg-surface-tint text-on-primary font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-sm transition-all"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
