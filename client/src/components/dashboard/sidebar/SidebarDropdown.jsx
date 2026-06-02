import React, { useState } from 'react';

const SidebarDropdown = ({ label, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-label-md text-on-surface-variant hover:bg-secondary-container/30 hover:text-primary transition-all text-left"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}
          <span>{label}</span>
        </div>
        <span className="material-symbols-outlined text-sm transition-transform duration-200">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className="pl-6 space-y-1 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
