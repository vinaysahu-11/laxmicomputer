import React from 'react';

const JoinClassButton = ({ to = '#' }) => {
  return (
    <a 
      href={to}
      className="bg-primary hover:bg-surface-tint text-on-primary px-3.5 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider shadow-sm transition-all hover:scale-102 active:scale-95 duration-100 shrink-0"
    >
      Join Class
    </a>
  );
};

export default JoinClassButton;
