import React from 'react';

const QuickActions = () => {
  const actions = [
    { label: 'Download Notes', icon: 'download', color: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' },
    { label: 'Submit Assignment', icon: 'drive_file_upload', color: 'bg-secondary-container/30 text-secondary border-outline-variant/30 hover:bg-secondary-container/65' },
    { label: 'Pay Fee Balances', icon: 'credit_card', color: 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20' },
    { label: 'View Certificate', icon: 'verified', color: 'bg-tertiary-container/20 text-tertiary border-tertiary/20 hover:bg-tertiary-container/40' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">bolt</span>
        <span>Quick Portal Shortcuts</span>
      </h3>

      <div className="grid grid-cols-2 gap-3.5">
        {actions.map((act) => (
          <button 
            key={act.label}
            className={`p-3.5 rounded-lg border font-bold text-xs transition-all flex flex-col items-center justify-center text-center gap-2 outline-none select-none hover:scale-102 active:scale-95 duration-100 ${act.color}`}
          >
            <span className="material-symbols-outlined text-2xl">{act.icon}</span>
            <span className="leading-snug">{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
