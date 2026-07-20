import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings, resetSettings } from '../../services/homepageService';

const Settings = () => {
  // 1. Academy Identity State parameters
  const [academyName, setAcademyName] = useState('EduAcademy Excellence');
  const [academyEmail, setAcademyEmail] = useState('contact@eduacademy.com');
  const [academyAddress, setAcademyAddress] = useState('742 Evergreen Terrace, Tech Valley, CA 90210');
  const [academyPhone, setAcademyPhone] = useState('+1 (555) 123-4567');
  const [academyWebsite, setAcademyWebsite] = useState('www.eduacademy.com');

  // 2. Toggles state for Preferences
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
  const [loading, setLoading] = useState(true);

  const availablePermissions = ['ATTENDANCE', 'GRADES', 'ADMISSIONS', 'RECORDS', 'FINANCE', 'FULL ACCESS'];

  const fetchSettingsData = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      setAcademyName(data.academyName);
      setAcademyEmail(data.academyEmail);
      setAcademyAddress(data.academyAddress);
      setAcademyPhone(data.academyPhone);
      setAcademyWebsite(data.academyWebsite);
      setDarkMode(data.darkMode);
      setAutoBackups(data.autoBackups);
      setPublicAccess(data.publicAccess);
      
      if (data.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Failed to load settings configuration from MongoDB.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleToggleTheme = async () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    try {
      await updateSettings({ darkMode: nextDark });
      if (nextDark) {
        document.documentElement.classList.add('dark');
        triggerToast('System dark theme enabled in MongoDB.', 'info');
      } else {
        document.documentElement.classList.remove('dark');
        triggerToast('System light theme enabled in MongoDB.', 'info');
      }
    } catch (err) {
      triggerToast('Failed to toggle theme status.', 'error');
    }
  };

  const handleIdentitySave = async (e) => {
    e.preventDefault();
    try {
      await updateSettings({
        academyName,
        academyEmail,
        academyAddress,
        academyPhone,
        academyWebsite,
        autoBackups,
        publicAccess
      });
      triggerToast('Academy Identity settings saved successfully in MongoDB!', 'success');
    } catch (err) {
      triggerToast('Failed to save settings parameters.', 'error');
    }
  };

  const handleCloudSync = () => {
    setIsSyncing(true);
    triggerToast('Synchronizing local database schemas...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      triggerToast('Database vault sync completed successfully. All systems green.', 'success');
    }, 1500);
  };

  const handleExportData = () => {
    triggerToast('Compiling secure schema spreadsheets... System download initialized.', 'success');
  };

  const handlePurgeCache = () => {
    if (window.confirm('Are you sure you want to purge the system cache? This will temporarily reload dashboard parameters.')) {
      triggerToast('System cached parameters flushed. Interface loading speeds refreshed.', 'success');
    }
  };

  const handleFactoryReset = async () => {
    if (window.confirm('CAUTION: You are about to initiate a factory reset. All custom permissions, identity overrides, and local parameters will be erased. Proceed?')) {
      try {
        const data = await resetSettings();
        setAcademyName(data.academyName);
        setAcademyEmail(data.academyEmail);
        setAcademyAddress(data.academyAddress);
        setAcademyPhone(data.academyPhone);
        setAcademyWebsite(data.academyWebsite);
        setDarkMode(data.darkMode);
        setAutoBackups(data.autoBackups);
        setPublicAccess(data.publicAccess);
        document.documentElement.classList.remove('dark');
        triggerToast('Academy parameters successfully reset to default standards in MongoDB.', 'error');
      } catch (err) {
        triggerToast('Failed to reset configuration.', 'error');
      }
    }
  };

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
      triggerToast('Please select at least one permission badge.', 'error');
      return;
    }

    const createdRole = {
      id: `role-${Date.now()}`,
      name: newRoleName.trim(),
      usersCount: 0,
      permissions: selectedPermissions,
      icon: 'person',
      iconStyle: 'bg-secondary-container/30 text-secondary'
    };

    setRolesList(prev => [...prev, createdRole]);
    setIsRoleModalOpen(false);
    document.body.style.overflow = 'auto';

    triggerToast(`Role "${newRoleName}" created successfully!`, 'success');
    setNewRoleName('');
    setSelectedPermissions([]);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading configuration profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg text-left font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Global Settings</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Configure academy parameters, staff credentials, and sync local datastores.</p>
        </div>
        <button 
          onClick={handleCloudSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-md hover:scale-102 active:scale-95 transition-transform duration-100 disabled:opacity-50 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">sync</span>
          <span>{isSyncing ? 'Synchronizing...' : 'Sync MongoDB'}</span>
        </button>
      </div>

      {/* Grid Configuration */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Left Column: Academy Profile Config */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">domain</span>
              Academy Profile Configurations
            </h3>
            
            <form onSubmit={handleIdentitySave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1.5 font-bold tracking-wider">Academy Name</label>
                  <input 
                    type="text" 
                    value={academyName}
                    onChange={(e) => setAcademyName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1.5 font-bold tracking-wider">Official Email</label>
                  <input 
                    type="email" 
                    value={academyEmail}
                    onChange={(e) => setAcademyEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1.5 font-bold tracking-wider">Academy Address</label>
                <input 
                  type="text" 
                  value={academyAddress}
                  onChange={(e) => setAcademyAddress(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1.5 font-bold tracking-wider">Phone / Hotline</label>
                  <input 
                    type="text" 
                    value={academyPhone}
                    onChange={(e) => setAcademyPhone(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1.5 font-bold tracking-wider">Domain Website</label>
                  <input 
                    type="text" 
                    value={academyWebsite}
                    onChange={(e) => setAcademyWebsite(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-md active:scale-95 duration-100 hover:scale-[1.01]"
                >
                  Save Profile Configuration
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Preferences & Danger Zone */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          
          {/* Preferences Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">tune</span>
              System Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-label-md text-on-surface font-bold">Dark Interface Mode</p>
                  <p className="text-[10px] text-on-surface-variant">Toggles system HSL parameters.</p>
                </div>
                <button 
                  onClick={handleToggleTheme}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-label-md text-on-surface font-bold">Backup Automatically</p>
                  <p className="text-[10px] text-on-surface-variant">Sync DB backups weekly.</p>
                </div>
                <button 
                  onClick={() => setAutoBackups(!autoBackups)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${autoBackups ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoBackups ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-error/20 shadow-sm space-y-4 border-t-4 border-t-error">
            <h3 className="font-headline-sm text-headline-sm text-error font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              System Danger Zone
            </h3>
            <p className="text-body-sm text-on-surface-variant font-light">Critical system maintenance override protocols.</p>
            
            <div className="space-y-2 pt-2">
              <button 
                onClick={handlePurgeCache}
                className="w-full py-2.5 border border-outline hover:bg-surface-container text-on-surface font-label-md text-label-md font-bold rounded-lg transition-colors text-center block"
              >
                Flush System Cache
              </button>
              <button 
                onClick={handleFactoryReset}
                className="w-full py-2.5 bg-error text-on-error hover:bg-opacity-90 font-label-md text-label-md font-bold rounded-lg transition-all text-center block"
              >
                Perform Factory Reset
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Role ledger & overlay modals */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden text-left mt-8">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Administrative Permission Ledger</h3>
          <button 
            onClick={() => setIsRoleModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-container/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Custom Role
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface border-b border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Security Role</th>
                <th className="px-6 py-4">Assigned Staff</th>
                <th className="px-6 py-4">Configured Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant font-light">
              {rolesList.map((role) => (
                <tr key={role.id} className="hover:bg-surface-container transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${role.iconStyle || 'bg-surface-variant text-on-surface-variant'} flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-[18px]">{role.icon}</span>
                      </div>
                      <span className="font-bold text-on-surface">{role.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-on-surface">{role.usersCount} Members</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {role.permissions.map(perm => (
                        <span key={perm} className="bg-surface-container text-on-surface-variant text-[9px] px-2 py-0.5 rounded font-bold uppercase">{perm}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role creator modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setIsRoleModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Create Custom Admin Role</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={() => setIsRoleModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleRoleSubmit} className="p-6 space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Role Label</label>
                <input 
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface" 
                  placeholder="e.g. Finance Moderator"
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-3 block uppercase tracking-wider font-bold">Grant Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePermissions.map(perm => (
                    <button
                      type="button"
                      key={perm}
                      onClick={() => handleTogglePermission(perm)}
                      className={`p-2.5 border rounded-lg text-left text-xs font-bold transition-all ${
                        selectedPermissions.includes(perm)
                          ? 'border-primary bg-primary-container/20 text-primary'
                          : 'border-outline-variant text-on-surface-variant bg-transparent'
                      }`}
                    >
                      {perm}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => setIsRoleModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Publish Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification popups */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-[110] bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-lg font-label-md flex items-center space-x-3 border border-outline-variant/30 animate-slide-up">
          <span className="material-symbols-outlined text-success">check_circle</span>
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
};

export default Settings;
