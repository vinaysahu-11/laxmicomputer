import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/admin' },
    { label: 'Students', icon: 'group', to: '/admin/students' },
    { label: 'Teachers', icon: 'school', to: '/admin/teachers' },
    { label: 'Courses', icon: 'menu_book', to: '/admin/courses' },
    { label: 'Admissions', icon: 'person_add', to: '/admin/admissions' },
    { label: 'Attendance', icon: 'calendar_month', to: '/admin/attendance' },
    { label: 'Results', icon: 'grade', to: '/admin/results' },
    { label: 'Payments', icon: 'payments', to: '/admin/payments' },
    { label: 'Gallery', icon: 'collections', to: '/admin/gallery' },
    { label: 'Reviews', icon: 'rate_review', to: '/admin/reviews' },
    { label: 'Notifications', icon: 'notifications', to: '/admin/notifications' },
    { label: 'Settings', icon: 'settings', to: '/admin/settings' },
    { label: 'Profile', icon: 'account_circle', to: '/admin/profile' },
  ];

  return (
    <aside className="bg-surface-container-lowest dark:bg-surface-container-low h-screen w-64 fixed left-0 top-0 overflow-y-auto border-r border-outline-variant dark:border-outline shadow-sm dark:shadow-none flex flex-col py-stack-lg z-50">
      <div className="px-6 mb-8 text-left">
        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">EduAcademy Admin</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant">Management Portal</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                isActive
                  ? 'text-primary dark:text-primary-fixed-dim font-bold border-l-4 border-primary dark:border-primary-fixed-dim bg-secondary-container/30'
                  : 'text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-md text-label-md">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high text-left">
          <img
            alt="Academy Admin Profile"
            className="w-10 h-10 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXsM5BRm9BCuVU4a4_QoUYA6bqbykHJEnFxdOPIYBKGtXjnYEDs-PS1ZvKmS-9q3vo6pcKZHthyBxM87c9elQJ8iHfix6jo9mrrLwfApZh3XuBezqL0y_Ii4mI32Ay00-57Xe1lZTtVi8_h381T-L9sGaYTr6IwCAxhLTr1LfUQMzXE0Y7PU78P0I8V_MXhoyDU-sJEK7Csc3s62iWOcdQlFhT2oKrxVuVc1LUO3wtDSNDmncfoRs11ZcU8cpnSLKc-SyvRtMZuXtv"
          />
          <div className="overflow-hidden">
            <p className="font-label-md text-label-md truncate">Admin User</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant truncate">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
