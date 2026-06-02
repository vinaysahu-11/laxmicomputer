import React from 'react';

const PrivacySettings = () => {
  const activeDevices = [
    { name: 'Chrome Browser - Windows 11', location: 'New Delhi, India', current: true },
    { name: 'Safari Browser - iOS Mobile', location: 'Mumbai, India', current: false }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">security</span>
        <span>Privacy & Device Sessions</span>
      </h3>

      <div className="space-y-4">
        {/* Device Logging List */}
        <div>
          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">Active Logged Sessions</p>
          <div className="space-y-3">
            {activeDevices.map((device, i) => (
              <div key={i} className="p-3 bg-surface-container-low border border-outline-variant/35 rounded-lg flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-label-sm text-label-sm font-bold text-on-surface flex items-center gap-1.5 leading-none">
                    <span>{device.name}</span>
                    {device.current && (
                      <span className="bg-green-500/10 text-green-700 px-1.5 py-0.5 rounded text-[8px] border border-green-500/20 font-bold uppercase tracking-wider">Current</span>
                    )}
                  </h4>
                  <span className="text-[10px] text-on-surface-variant font-medium mt-1.5 block">{device.location}</span>
                </div>
                {!device.current && (
                  <button 
                    type="button" 
                    className="text-error font-bold text-xs hover:underline"
                  >
                    Logout
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-outline-variant/20">
          <button 
            type="button"
            className="text-error font-bold text-xs border border-error/20 hover:bg-error-container/20 px-4 py-2 rounded-lg transition-colors uppercase tracking-wider"
          >
            Logout From All Other Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
