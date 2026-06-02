import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ label, icon, to }) => {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-label-md transition-all ${
          isActive
            ? 'bg-primary text-on-primary shadow-sm font-semibold'
            : 'text-on-surface-variant hover:bg-secondary-container/30 hover:text-primary'
        }`
      }
    >
      {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
