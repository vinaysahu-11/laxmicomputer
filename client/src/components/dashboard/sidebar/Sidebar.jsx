import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/admin' },
    { label: 'Students', icon: 'group', to: '/admin/students' },
    { label: 'Teachers', icon: 'school', to: '/admin/teachers' },
    { label: 'User Management', icon: 'manage_accounts', to: '/admin/users' },
    { label: 'Courses', icon: 'menu_book', to: '/admin/courses' },
    { label: 'Admissions', icon: 'person_add', to: '/admin/admissions' },
    { label: 'Attendance', icon: 'calendar_month', to: '/admin/attendance' },
    { label: 'Results', icon: 'grade', to: '/admin/results' },
    { label: 'Payments', icon: 'payments', to: '/admin/payments' },
    { label: 'Gallery', icon: 'collections', to: '/admin/gallery' },
    { label: 'Reviews', icon: 'rate_review', to: '/admin/reviews' },
    { label: 'Success Stories', icon: 'play_circle', to: '/admin/success-stories' },
    { label: 'Notifications', icon: 'notifications', to: '/admin/notifications' },
    { label: 'Settings', icon: 'settings', to: '/admin/settings' },
    { label: 'Profile', icon: 'account_circle', to: '/admin/profile' },
  ];

  const getInitials = (name) => {
    if (!name) return 'AD';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

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
          {user?.profilePhoto ? (
            <img
              alt="Academy Admin Profile"
              className="w-10 h-10 rounded-full object-cover border border-outline"
              src={user.profilePhoto}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
              {getInitials(user?.name)}
            </div>
          )}
          <div className="overflow-hidden">
            <p className="font-label-md text-label-md truncate">{user?.name || 'Admin User'}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant truncate uppercase">
              {user?.role === 'admin' ? 'Super Admin' : user?.role || 'User'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
