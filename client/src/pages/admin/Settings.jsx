import React, { useState } from 'react';

const Settings = () => {
  // 1. Academy Identity State parameters
  const [academyName, setAcademyName] = useState('EduAcademy Excellence');
  const [academyEmail, setAcademyEmail] = useState('contact@eduacademy.com');
  const [academyAddress, setAcademyAddress] = useState('742 Evergreen Terrace, Tech Valley, CA 90210');
  const [academyPhone, setAcademyPhone] = useState('+1 (555) 123-4567');
  const [academyWebsite, setAcademyWebsite] = useState('www.eduacademy.com');

  // 2. Toggles state for Preferences bento card
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const [autoBackups, setAutoBackups] = useState(true);
  const [publicAccess, setPublicAccess] = useState(true);

  // 3. User Roles Ledger State
  const [rolesList, setRolesList] = useState([
    {
      id: 'role-1',
      name: 'Super Admin',
      usersCount: 2,
      permissions: ['FULL ACCESS', 'FINANCE'],
      icon: 'admin_panel_settings',
      iconStyle: 'bg-primary/10 text-primary'
    },
    {
      id: 'role-2',
      name: 'Teacher',
      usersCount: 24,
      permissions: ['ATTENDANCE', 'GRADES'],
      icon: 'person',
      iconStyle: 'bg-secondary-container/30 text-secondary'
    },
    {
      id: 'role-3',
      name: 'Registrar',
      usersCount: 5,
      permissions: ['ADMISSIONS', 'RECORDS'],
      icon: 'support_agent',
      iconStyle: 'bg-secondary-container/30 text-secondary'
    }
  ]);

  // 4. Role Creator Overlay Modal controllers
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  
  // Interaction Feedbacks
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [isSyncing, setIsSyncing] = useState(false);

  const availablePermissions = ['ATTENDANCE', 'GRADES', 'ADMISSIONS', 'RECORDS', 'FINANCE', 'FULL ACCESS'];

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Preference click handlers
  const handleToggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      triggerToast('System dark theme enabled.', 'info');
    } else {
      document.documentElement.classList.remove('dark');
      triggerToast('System light theme enabled.', 'info');
    }
  };

  const handleIdentitySave = (e) => {
    e.preventDefault();
    triggerToast('Academy Identity settings saved successfully!', 'success');
  };

  // Cloud backup & data export triggers
  const handleCloudSync = () => {
    setIsSyncing(true);
    triggerToast('Synchronizing local database schemas with AWS cloud vaults...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      triggerToast('Database vault sync completed successfully. All systems green.', 'success');
    }, 1500);
  };

  const handleExportData = () => {
    triggerToast('Compiling secure schema spreadsheets... System download initialized.', 'success');
  };

  // Danger zone alerts
  const handlePurgeCache = () => {
    if (window.confirm('Are you sure you want to purge the system cache? This will temporarily reload dashboard parameters.')) {
      triggerToast('System cached parameters flushed. Interface loading speeds refreshed.', 'success');
    }
  };

  const handleFactoryReset = () => {
    if (window.confirm('CAUTION: You are about to initiate a factory reset. All custom permissions, identity overrides, and local parameters will be erased. Proceed?')) {
      // Revert states to template defaults
      setAcademyName('EduAcademy Excellence');
      setAcademyEmail('contact@eduacademy.com');
      setAcademyAddress('742 Evergreen Terrace, Tech Valley, CA 90210');
      setAcademyPhone('+1 (555) 123-4567');
      setAcademyWebsite('www.eduacademy.com');
      setAutoBackups(true);
      setPublicAccess(true);
      triggerToast('Academy profile parameters successfully reset to system default standards.', 'error');
    }
  };

  // User Role Creator operations
  const handleTogglePermission = (permission) => {
    setSelectedPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission) 
        : [...prev, permission]
    );
  };

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) {
      triggerToast('Please provide a unique role name.', 'error');
      return;
    }
    if (selectedPermissions.length === 0) {
      triggerToast('Please select at least one permission badge for this staff role.', 'error');
      return;
    }

    const createdRole = {
      id: `role-${Date.now()}`,
      name: newRoleName.trim(),
      usersCount: 0, // Starts with 0 members
      permissions: selectedPermissions,
      icon: 'person',
      iconStyle: 'bg-secondary-container/30 text-secondary'
    };

    setRolesList(prev => [...prev, createdRole]);
    setIsRoleModalOpen(false);
    document.body.style.overflow = 'auto';

    triggerToast(`Role "${newRoleName}" created successfully! Add users from the Team panel.`, 'success');

    // Reset role creator states
    setNewRoleName('');
    setSelectedPermissions([]);
  };

  const handleDeleteRole = (role) => {
    if (role.name === 'Super Admin') {
      triggerToast('Access Denied: The system root Role "Super Admin" cannot be deleted.', 'error');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the administrative role "${role.name}"?`)) {
      setRolesList(prev => prev.filter(r => r.id !== role.id));
      triggerToast(`Administrative role "${role.name}" deleted.`, 'info');
    }
  };

  return (
    <div className="space-y-stack-lg text-left relative">
      
      {/* Page Header */}
      <div className="mb-stack-lg text-left">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">System Settings</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Configure your academy's core identity, user permissions, and system preferences.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter items-start">
        
        {/* Academy Identity panel (Span 8) */}
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-stack-lg shadow-sm text-left settings-card">
          <form onSubmit={handleIdentitySave}>
            <div className="flex items-center justify-between mb-stack-md gap-2 flex-wrap">
              <div className="flex items-center">
                <span className="material-symbols-outlined text-primary mr-3 p-2 bg-primary-container/20 rounded-lg">business</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Academy Identity</h3>
              </div>
              <button 
                type="submit"
                className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:scale-102 transition-transform shadow-sm font-semibold active:scale-95 duration-100"
              >
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Academy Name</label>
                <input 
                  type="text" 
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Academic Email</label>
                <input 
                  type="email" 
                  value={academyEmail}
                  onChange={(e) => setAcademyEmail(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Official Address</label>
                <input 
                  type="text" 
                  value={academyAddress}
                  onChange={(e) => setAcademyAddress(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Phone Number</label>
                <input 
                  type="text" 
                  value={academyPhone}
                  onChange={(e) => setAcademyPhone(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Website URL</label>
                <input 
                  type="text" 
                  value={academyWebsite}
                  onChange={(e) => setAcademyWebsite(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
            </div>
          </form>
        </section>

        {/* Preferences Panel (Span 4) */}
        <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-stack-lg shadow-sm text-left settings-card">
          <div className="flex items-center mb-stack-md border-b border-outline-variant/20 pb-2">
            <span className="material-symbols-outlined text-tertiary mr-3 p-2 bg-tertiary-container/20 rounded-lg">tune</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Preferences</h3>
          </div>

          <div className="space-y-stack-md">
            {/* Dark Mode toggle switch */}
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-bold leading-none">System Theme</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 font-light">Switch to Dark Mode</span>
              </div>
              <button 
                type="button"
                onClick={handleToggleTheme}
                className={`w-12 h-6 rounded-full relative transition-all duration-200 cursor-pointer outline-none border-none ${
                  darkMode ? 'bg-primary' : 'bg-outline-variant'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                  darkMode ? 'right-1' : 'left-1'
                }`}></div>
              </button>
            </div>

            {/* Backups switch */}
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-bold leading-none">Auto Backups</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 font-light">Daily at 2:00 AM</span>
              </div>
              <button 
                type="button"
                onClick={() => {
                  setAutoBackups(prev => !prev);
                  triggerToast(autoBackups ? 'Automated daily schema back-ups paused.' : 'Automated daily cloud schema backups enabled.', 'info');
                }}
                className={`w-12 h-6 rounded-full relative transition-all duration-200 cursor-pointer outline-none border-none ${
                  autoBackups ? 'bg-primary' : 'bg-outline-variant'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                  autoBackups ? 'right-1' : 'left-1'
                }`}></div>
              </button>
            </div>

            {/* Student portal access */}
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-bold leading-none">Student Portal</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 font-light">Public Access</span>
              </div>
              <button 
                type="button"
                onClick={() => {
                  setPublicAccess(prev => !prev);
                  triggerToast(publicAccess ? 'Student portal closed for public access.' : 'Student portal opened for public enrollment requests.', 'info');
                }}
                className={`w-12 h-6 rounded-full relative transition-all duration-200 cursor-pointer outline-none border-none ${
                  publicAccess ? 'bg-primary' : 'bg-outline-variant'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                  publicAccess ? 'right-1' : 'left-1'
                }`}></div>
              </button>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => triggerToast('Opening system configurations details panel...', 'info')}
            className="w-full mt-stack-md border border-outline text-on-surface-variant py-2.5 rounded-lg font-bold text-xs hover:bg-surface-container transition-colors uppercase tracking-wider"
          >
            Manage All Settings
          </button>
        </section>

        {/* User Role Management (Span 12) */}
        <section className="col-span-12 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-stack-lg shadow-sm text-left settings-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-stack-md border-b border-outline-variant/20 pb-4">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-secondary mr-3 p-2 bg-secondary-container/30 rounded-lg">security</span>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">User Role Management</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Control access levels and credentials for staff and faculty members.</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => {
                setIsRoleModalOpen(true);
                document.body.style.overflow = 'hidden';
              }}
              className="bg-secondary text-white px-6 py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-on-secondary-container transition-colors active:scale-95 duration-100 uppercase tracking-wider shadow-sm self-start md:self-center"
            >
              <span className="material-symbols-outlined text-sm font-bold">add</span>
              <span>Create New Role</span>
            </button>
          </div>

          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-outline-variant/50 text-xs font-bold text-on-surface-variant uppercase tracking-wider bg-surface-container-low/30">
                  <th className="py-4 px-4">Role Name</th>
                  <th className="py-4 px-4">Users Associated</th>
                  <th className="py-4 px-4">Permission Badges</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-sm font-light text-on-surface">
                {rolesList.map((role) => (
                  <tr key={role.id} className="border-b border-outline-variant/30 hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded flex items-center justify-center mr-3 border border-outline-variant/10 ${role.iconStyle}`}>
                          <span className="material-symbols-outlined text-base">{role.icon || 'person'}</span>
                        </div>
                        <span className="font-bold text-on-surface">{role.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-xs whitespace-nowrap">
                      {role.usersCount} {role.usersCount === 1 ? 'User' : 'Users'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {role.permissions.map((perm) => (
                          <span 
                            key={perm}
                            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                              perm === 'FULL ACCESS'
                                ? 'bg-primary-container text-on-primary-container border-primary-container'
                                : perm === 'FINANCE'
                                ? 'bg-tertiary-container text-on-tertiary-container border-tertiary-container'
                                : 'bg-surface-container text-on-surface-variant border-outline-variant/35'
                            }`}
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex justify-center items-center gap-1">
                        <button 
                          onClick={() => triggerToast(`Opening configuration adjustments editor for "${role.name}"...`, 'info')}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center rounded hover:bg-surface-container"
                          title="Edit Permissions"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteRole(role)}
                          className="p-1 text-on-surface-variant hover:text-error transition-colors flex items-center justify-center rounded hover:bg-surface-container"
                          title="Delete Role"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Database Sync Controls (Span 7) */}
        <section className="col-span-12 lg:col-span-7 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-stack-lg shadow-sm text-left settings-card">
          <div className="flex items-center mb-stack-md border-b border-outline-variant/20 pb-2">
            <span className="material-symbols-outlined text-error mr-3 p-2 bg-error-container/20 rounded-lg">backup</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Data &amp; Backup</h3>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="p-4 bg-surface-container-low rounded-lg flex items-center justify-between border border-outline-variant/30 gap-4 flex-wrap">
              <div className="flex items-center min-w-0">
                <span className={`material-symbols-outlined text-primary-container text-3xl mr-4 shrink-0 ${
                  isSyncing ? 'animate-spin' : ''
                }`}>cloud_done</span>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md font-bold text-on-surface">Cloud Database Backup</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 font-light">Last successful backup sync: Today, 2:04 AM</p>
                </div>
              </div>
              <button 
                onClick={handleCloudSync}
                disabled={isSyncing}
                className="text-primary font-bold text-xs hover:underline shrink-0"
              >
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </button>
            </div>

            <div className="p-4 border border-outline-variant/40 rounded-lg flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="font-label-md text-label-md font-bold text-on-surface">Manual Export Settings</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 font-light">Download institutional records as raw CSV/XLSX logs.</p>
              </div>
              <button 
                onClick={handleExportData}
                className="bg-primary-container text-on-primary-container hover:bg-primary-container/80 transition-colors px-4 py-2.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm font-bold">download</span>
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone (Span 5) */}
        <section className="col-span-12 lg:col-span-5 bg-error-container/10 border border-error/20 rounded-xl p-stack-lg shadow-sm text-left settings-card">
          <div className="flex items-center mb-stack-md border-b border-error/20 pb-2">
            <span className="material-symbols-outlined text-error mr-3 p-2 bg-error-container/30 rounded-lg">warning</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-error">Danger Zone</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap border-b border-error/10 pb-3">
              <div className="min-w-0">
                <p className="font-label-md text-label-md font-bold text-on-surface">Clear System Cache</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 font-light">May improve portal execution speeds.</p>
              </div>
              <button 
                onClick={handlePurgeCache}
                className="text-error font-bold text-xs hover:bg-error-container/30 px-3.5 py-1.5 rounded border border-error/20 transition-all shrink-0"
              >
                Purge
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="font-label-md text-label-md font-bold text-on-surface">Factory Parameter Reset</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 font-light">Erase all custom portal settings configurations.</p>
              </div>
              <button 
                onClick={handleFactoryReset}
                className="bg-error hover:bg-error/90 text-white font-bold text-xs px-3.5 py-1.5 rounded transition-all shrink-0 shadow-sm"
              >
                Reset Parameters
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Success Toaster */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

      {/* Modal: Create New Administrative Role */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => { setIsRoleModalOpen(false); document.body.style.overflow = 'auto'; }}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Create Portal Access Role</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={() => { setIsRoleModalOpen(false); document.body.style.overflow = 'auto'; }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleRoleSubmit} className="p-stack-md space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Role Name</label>
                <input 
                  type="text" 
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Course Coordinator"
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest font-medium text-body-sm"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-2.5 block uppercase tracking-wider font-bold">Select Permission Badges</label>
                <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-3 rounded-lg border border-outline-variant/35">
                  {availablePermissions.map((perm) => {
                    const isChecked = selectedPermissions.includes(perm);
                    return (
                      <div 
                        key={perm}
                        onClick={() => handleTogglePermission(perm)}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded border cursor-pointer select-none transition-all ${
                          isChecked 
                            ? 'bg-primary/10 text-primary border-primary font-bold' 
                            : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isChecked ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider">{perm}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => { setIsRoleModalOpen(false); document.body.style.overflow = 'auto'; }}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100 font-bold" 
                  type="submit"
                >
                  Create Role
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
