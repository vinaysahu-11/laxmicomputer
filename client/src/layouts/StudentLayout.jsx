import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const StudentLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/student' },
    { label: 'My Courses', icon: 'menu_book', to: '/student/courses' },
    { label: 'Classes', icon: 'calendar_today', to: '/student/classes' },
    { label: 'Exams', icon: 'crisis_alert', to: '/student/exams' },
    { label: 'Attendance', icon: 'calendar_month', to: '/student/attendance' },
    { label: 'Results', icon: 'military_tech', to: '/student/results' },
    { label: 'Certificates', icon: 'verified', to: '/student/certificates' },
    { label: 'Payments', icon: 'credit_card', to: '/student/payments' },
    { label: 'Notifications', icon: 'notifications', to: '/student/notifications' },
    { label: 'Profile', icon: 'account_circle', to: '/student/profile' },
    { label: 'Settings', icon: 'settings', to: '/student/settings' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout from the Student Portal?')) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md overflow-hidden relative">
      
      {/* Student Sidebar Navigation */}
      <aside className="bg-surface-container-lowest dark:bg-surface-container-low h-screen w-64 fixed left-0 top-0 overflow-y-auto border-r border-outline-variant dark:border-outline shadow-sm dark:shadow-none flex flex-col py-stack-lg z-50">
        <div className="px-6 mb-8 text-left">
          <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed leading-none">EduAcademy</h1>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mt-1.5">Student Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-0.5 custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/student'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'text-primary dark:text-primary-fixed-dim font-bold border-l-4 border-primary dark:border-primary-fixed-dim bg-secondary-container/30 shadow-sm'
                    : 'text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container'
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              <span className="font-label-md text-label-md text-xs">{item.label}</span>
            </NavLink>
          ))}

          {/* Logout Trigger */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/10 transition-all text-xs font-bold text-left border-none bg-transparent cursor-pointer outline-none"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Logout</span>
          </button>
        </nav>

        {/* Footer Profile card */}
        <div className="px-4 mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/35 text-left">
            <img
              alt="Student Profile Avatar"
              className="w-9 h-9 rounded-full object-cover border border-primary/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUfA65JV4uzymI372Wkby0p4JnhM47dR4uPAOE7DTW0UAtfv-KAiblVuTdjLsXlBKnvJ4FLitgu2Dc3dQicrJ9Ra5F67w0p_sT9Du0_-bUS_zz0QihITjQp3Qfq1q1xf1gAoDBnYaORJQEOx-DDA72uh1M0pfMnc0FHTTCf-zbDXhV854T2wGTEbSpgna5cg-o8v5D7SkVkVBa4HK4KHbbserkoTIngCnHclthdHy4-f1OkHNOI8gc4VaLeM3H8_YBUCH5pgE3M-qH"
            />
            <div className="overflow-hidden min-w-0">
              <p className="font-label-md text-label-md text-xs font-bold truncate">Sarah Jenkins</p>
              <p className="text-[10px] text-on-surface-variant truncate font-semibold uppercase">Active Student</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen flex flex-col">
        
        {/* Topbar Header */}
        <header className="bg-surface dark:bg-surface-dim fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 border-b border-outline-variant dark:border-outline flex justify-between items-center px-margin-desktop shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-80 max-w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">search</span>
              <input 
                type="text" 
                placeholder="Search classes, notes, results..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-light"
              />
            </div>
          </div>

          <div className="flex items-center gap-5 shrink-0 text-on-surface-variant">
            <button className="material-symbols-outlined text-lg hover:text-primary transition-colors">help</button>
            <button className="material-symbols-outlined text-lg hover:text-primary transition-colors">dark_mode</button>
            <div className="relative">
              <button className="material-symbols-outlined text-lg hover:text-primary transition-colors">notifications</button>
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-error rounded-full"></span>
            </div>
            <div className="h-6 w-[1px] bg-outline-variant"></div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-xs font-bold text-on-surface">EduAcademy Student Portal</span>
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-extrabold text-[11px] border border-primary-container/30 shadow-sm">S</div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="mt-16 p-stack-lg overflow-y-auto h-[calc(100vh-4rem)] scrollbar-hide">
          <div className="max-w-container-max mx-auto space-y-stack-lg">
            <Outlet />
          </div>
        </div>

      </main>

    </div>
  );
};

export default StudentLayout;
