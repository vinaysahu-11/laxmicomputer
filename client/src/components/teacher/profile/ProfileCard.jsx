import React from 'react';

const ProfileCard = () => {
  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm border border-outline-variant/30 text-left flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mb-3 border border-primary/20 shadow-inner select-none">
        TJ
      </div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Dr. Sarah Jenkins</h3>
      <p className="font-body-md text-xs text-primary font-bold uppercase tracking-wider">Senior Computer Science Faculty</p>
      <p className="font-body-md text-xs text-on-surface-variant font-light mt-2 max-w-xs leading-relaxed">
        Passionate about full-stack engineering practices, cloud native patterns, and educational CRM integrations.
      </p>
    </div>
  );
};

export default ProfileCard;
