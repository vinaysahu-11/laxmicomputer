import React, { useState } from 'react';

const Profile = () => {
  // 1. Personal Identity info
  const [fullName, setFullName] = useState('Dr. Julian Vance');
  const [professionalTitle, setProfessionalTitle] = useState('System Administrator');
  const [email, setEmail] = useState('julian.vance@eduacademy.org');

  // 2. Security passwords
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 3. Linked Accounts states
  const [linkedGoogle, setLinkedGoogle] = useState(true);
  const [linkedGitHub, setLinkedGitHub] = useState(true);

  // Interaction feedback states
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Form submission handlers
  const handleSavePersonal = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      triggerToast('Full Name and Email Address are required.', 'error');
      return;
    }
    triggerToast('Personal changes saved successfully!', 'success');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      triggerToast('Please provide your current password.', 'error');
      return;
    }
    if (!newPassword || !confirmPassword) {
      triggerToast('New password and confirm password inputs are required.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerToast('New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      triggerToast('New password must be at least 6 characters long.', 'error');
      return;
    }

    triggerToast('Administrative credentials updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleUploadPhoto = () => {
    triggerToast('Opening local file system directory... Upload new profile avatar.', 'info');
  };

  const handleToggleGoogleLink = () => {
    if (linkedGoogle) {
      if (window.confirm('Disconnect Google Workspace credentials? This will restrict email synchronizations.')) {
        setLinkedGoogle(false);
        triggerToast('Google Workspace disconnected.', 'info');
      }
    } else {
      setLinkedGoogle(true);
      triggerToast('Google Workspace successfully linked.', 'success');
    }
  };

  const handleToggleGitHubLink = () => {
    if (linkedGitHub) {
      if (window.confirm('Disconnect GitHub developer workspace integrations?')) {
        setLinkedGitHub(false);
        triggerToast('GitHub integrations offline.', 'info');
      }
    } else {
      setLinkedGitHub(true);
      triggerToast('GitHub integrations successfully linked.', 'success');
    }
  };

  const handleRequestRoles = () => {
    triggerToast('Administrative upgrade ticket submitted to the Academy Superintendent Board.', 'success');
  };

  return (
    <div className="space-y-stack-lg text-left relative">
      
      {/* Page Header */}
      <div className="mb-stack-lg text-left">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Account Management</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          View and update your personal information and security configurations.
        </p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-12 gap-gutter items-start">
        
        {/* Left Column: Personal info & Security (Span 8) */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          
          {/* Profile Details Card */}
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/60 shadow-sm transition-all duration-200 hover:shadow-md text-left">
            <form onSubmit={handleSavePersonal}>
              <div className="flex flex-col md:flex-row gap-stack-lg items-start">
                
                {/* Profile Picture section */}
                <div className="relative group shrink-0">
                  <img 
                    alt="Admin User Avatar" 
                    className="w-32 h-32 rounded-xl object-cover border-4 border-surface-container shadow-sm" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGyV-A6T6AOowE6t897dT1583pf_Xr3n-nMiP-5iJ8lYHW6UtsqFccsh3wN54lAsU5yw-XjzyWhWfMyZ0XtX81vRWBAsnsUHu9U7hEq6GJVZPSOU4hrpZaq9N9Z6hjGhMQ_Tes2gqArM1QH7npKzr1b4vqpntPx24d4bmiA-q_OsVvvrD4XRYmih0arsHx_ruwP-delNASIfTL-fHrt1lAWR5lvxCVsmJzZZQPi6L4gZIMZxpUgDee2RjDcytl1oopnyTQJ_D22fr5"
                  />
                  <button 
                    type="button"
                    onClick={handleUploadPhoto}
                    className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
                    title="Change Profile Photo"
                  >
                    <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                  </button>
                </div>

                {/* Info Fields section */}
                <div className="flex-1 w-full space-y-stack-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Professional Title</label>
                      <input 
                        type="text" 
                        value={professionalTitle}
                        onChange={(e) => setProfessionalTitle(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
                    />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                    >
                      Save Personal Changes
                    </button>
                  </div>
                </div>

              </div>
            </form>
          </div>

          {/* Security & Password reset card */}
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/60 shadow-sm text-left">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-primary text-2xl font-bold">security</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Security &amp; Password Reset</h3>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-stack-md max-w-md">
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
                    onClick={handleTogglePasswordVisibility}
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
                  className="bg-secondary-container hover:bg-primary hover:text-on-primary text-primary transition-all px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: Sidebar statistics/permissions (Span 4) */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter text-left">
          
          {/* Active online tracker status */}
          <div className="bg-primary p-stack-lg rounded-xl text-on-primary shadow-lg relative overflow-hidden text-left">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6 gap-2">
                <div className="p-2.5 bg-white/20 rounded-lg">
                  <span className="material-symbols-outlined text-[32px]">verified_user</span>
                </div>
                <span className="bg-white/20 border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
                  System Admin
                </span>
              </div>
              <p className="text-white/80 font-label-sm text-label-sm mb-1 uppercase font-bold tracking-wider">Account Active Since</p>
              <p className="font-headline-sm text-headline-sm font-bold mb-6">September 2022</p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0"></span>
                <span>Currently Online</span>
              </div>
            </div>
            {/* Background decoration blur */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          {/* ACCESS Permissions checklists */}
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/60 shadow-sm text-left">
            <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
              Access Permissions
            </h3>
            <div className="space-y-3 font-body-sm font-light text-on-surface-variant">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600 text-[20px] shrink-0">check_circle</span>
                <span>Manage Student Records</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600 text-[20px] shrink-0">check_circle</span>
                <span>Course Content Editor</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600 text-[20px] shrink-0">check_circle</span>
                <span>Financial Oversight</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600 text-[20px] shrink-0">check_circle</span>
                <span>Global System Settings</span>
              </div>
            </div>
            <button 
              type="button"
              onClick={handleRequestRoles}
              className="w-full mt-6 py-2.5 border border-outline text-on-surface-variant rounded-lg font-bold text-xs hover:bg-surface-container transition-colors uppercase tracking-wider"
            >
              Request More Roles
            </button>
          </div>

          {/* Connected Integrations Card */}
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/60 shadow-sm text-left">
            <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
              Linked Accounts
            </h3>
            <div className="space-y-4 font-body-sm text-on-surface">
              {/* Google Workspace link */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 flex items-center justify-center bg-surface-container rounded border border-outline-variant/15 shrink-0">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-label-sm font-bold">Google Workspace</p>
                    <p className={`text-[10px] font-bold ${
                      linkedGoogle ? 'text-green-600' : 'text-on-surface-variant font-light'
                    }`}>
                      {linkedGoogle ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleGoogleLink}
                  className={`material-symbols-outlined cursor-pointer border-none bg-transparent hover:text-error transition-colors flex items-center justify-center p-1 ${
                    linkedGoogle ? 'text-on-surface-variant' : 'text-primary'
                  }`}
                  title={linkedGoogle ? 'Disconnect Workspace' : 'Link Workspace'}
                >
                  {linkedGoogle ? 'link_off' : 'link'}
                </button>
              </div>

              {/* GitHub integrations link */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 flex items-center justify-center bg-surface-container rounded border border-outline-variant/15 shrink-0">
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm text-label-sm font-bold">GitHub (Dev Tools)</p>
                    <p className={`text-[10px] font-bold ${
                      linkedGitHub ? 'text-green-600' : 'text-on-surface-variant font-light'
                    }`}>
                      {linkedGitHub ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleGitHubLink}
                  className={`material-symbols-outlined cursor-pointer border-none bg-transparent hover:text-error transition-colors flex items-center justify-center p-1 ${
                    linkedGitHub ? 'text-on-surface-variant' : 'text-primary'
                  }`}
                  title={linkedGitHub ? 'Disconnect Dev Tools' : 'Link Dev Tools'}
                >
                  {linkedGitHub ? 'link_off' : 'link'}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Success Toaster Alert */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

    </div>
  );
};

export default Profile;
