import React, { useState } from 'react';

const AccountSettings = () => {
  const [email, setEmail] = useState('julian.vance@eduacademy.org');
  const [mobile, setMobile] = useState('+1 (555) 123-4567');
  const [address, setAddress] = useState('742 Evergreen Terrace,CA');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Save account settings click');
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">manage_accounts</span>
        <span>Account & Contact Settings</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Mobile Number</label>
          <input 
            type="text" 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Residential Address</label>
          <input 
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
          />
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            className="bg-primary hover:bg-surface-tint text-on-primary font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-sm transition-all"
          >
            Save Account Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
