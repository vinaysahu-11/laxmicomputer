import React, { useState } from 'react';

const AccountSettings = () => {
  const [emailAddress, setEmailAddress] = useState('sarah.jenkins@itacademy.edu');
  const [mobileNumber, setMobileNumber] = useState('+1 (555) 123-4567');

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30 text-xs">
      <div className="flex items-center gap-3 mb-stack-md">
        <span className="material-symbols-outlined text-primary">contact_phone</span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Contact Information</h3>
      </div>
      <div className="space-y-gutter">
        <div className="flex flex-col md:flex-row md:items-end gap-stack-md border-b border-outline-variant/30 pb-gutter">
          <div className="flex-1 space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase">Primary Email Address</label>
            <input 
              className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface-variant outline-none font-medium cursor-not-allowed" 
              type="email" 
              value={emailAddress}
              disabled
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-tertiary-container/20 text-on-tertiary-fixed-variant rounded-full text-label-sm h-fit mb-2 select-none border border-tertiary-container/30">
            <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Verified
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-stack-md">
          <div className="flex-1 space-y-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase">Mobile Number</label>
            <input 
              className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface-variant outline-none font-medium cursor-not-allowed" 
              type="tel" 
              value={mobileNumber}
              disabled
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-tertiary-container/20 text-on-tertiary-fixed-variant rounded-full text-label-sm h-fit mb-2 select-none border border-tertiary-container/30">
            <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Verified
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
