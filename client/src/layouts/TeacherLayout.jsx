import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const TeacherLayout = () => {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const mainMenuItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/teacher' },
    { label: 'My Classes', icon: 'school', to: '/teacher/classes' },
    { label: 'Students', icon: 'group', to: '/teacher/students' },
    { label: 'Attendance', icon: 'event_available', to: '/teacher/attendance' },
    { label: 'Exams', icon: 'quiz', to: '/teacher/exams' },
    { label: 'Study Materials', icon: 'menu_book', to: '/teacher/materials' },
    { label: 'Assignments', icon: 'assignment', to: '/teacher/assignments' },
    { label: 'Results', icon: 'assessment', to: '/teacher/results' },
  ];

  const bottomMenuItems = [
    { label: 'Notifications', icon: 'notifications', to: '/teacher/notifications' },
    { label: 'Profile', icon: 'person', to: '/teacher/profile' },
    { label: 'Settings', icon: 'settings', to: '/teacher/settings' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout from the Teacher Portal?')) {
      navigate('/login');
    }
  };

  const handleStartClass = () => {
    alert('🎥 Initializing virtual lecture environment... Syncing streaming latency...');
  };

  const sidebarContent = (
    <>
      <div className="mb-8 px-4 py-2 text-left">
        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary leading-none">Laxmi Academy</h1>
        <p className="font-label-md text-label-md text-on-surface-variant mt-1.5 font-medium">Teacher Portal</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {mainMenuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === '/teacher'}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-xl ${
                isActive
                  ? 'bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary font-bold scale-[1.02] transform'
                  : 'text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container-high dark:hover:bg-surface-container-highest'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-md text-label-md">{item.label}</span>
          </NavLink>
        ))}

        <div className="mt-auto pt-4 border-t border-outline-variant">
          {bottomMenuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-xl ${
                  isActive
                    ? 'bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary font-bold scale-[1.02] transform'
                    : 'text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container-high dark:hover:bg-surface-container-highest'
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <button 
          onClick={handleStartClass}
          className="mt-4 bg-primary text-on-primary font-label-md text-label-md py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border-none cursor-pointer outline-none active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">play_circle</span>
          <span>Start Class</span>
        </button>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md relative text-left">
      
      {/* Desktop Sidebar Navigation */}
      <aside className="h-screen w-72 fixed left-0 top-0 overflow-y-auto bg-surface dark:bg-inverse-surface border-r border-outline-variant dark:border-outline shadow-sm dark:shadow-none sidebar-scroll z-50 hidden md:flex flex-col p-4 gap-2">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
        ></div>
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`fixed top-0 bottom-0 left-0 w-72 bg-surface dark:bg-inverse-surface border-r border-outline-variant z-50 p-4 flex flex-col gap-2 transition-transform duration-300 md:hidden ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {sidebarContent}
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-72 min-h-screen flex flex-col">
        
        {/* Top App Bar */}
        <header className="flex justify-between items-center w-full h-16 px-6 sticky top-0 z-40 bg-surface/90 dark:bg-inverse-surface/90 backdrop-blur-md border-b border-outline-variant dark:border-outline shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                type="text" 
                placeholder="Search students, classes, or files..."
                className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-container font-body-sm text-body-sm outline-none"
              />
            </div>
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden text-on-surface bg-transparent border-none cursor-pointer outline-none p-1 hover:bg-surface-container rounded-full"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/teacher/notifications')}
                className="hover:bg-surface-container dark:hover:bg-surface-container-high rounded-full p-2 transition-colors cursor-pointer border-none bg-transparent text-on-surface-variant outline-none"
              >
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button 
                className="hover:bg-surface-container dark:hover:bg-surface-container-high rounded-full p-2 transition-colors cursor-pointer border-none bg-transparent text-on-surface-variant outline-none"
              >
                <span className="material-symbols-outlined">help</span>
              </button>
              <button 
                onClick={handleLogout}
                className="hover:bg-surface-container dark:hover:bg-surface-container-high rounded-full p-2 transition-colors cursor-pointer border-none bg-transparent text-on-surface-variant outline-none"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant text-left">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-label-md font-bold text-on-surface">Prof. Rajesh Kumar</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Senior Faculty</p>
              </div>
              <img 
                alt="Teacher Avatar" 
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-container cursor-pointer select-none"
                onClick={() => navigate('/teacher/profile')}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Gh2GzZoAqcDBJAkfriIGdM0VgXE_pAbhIVKtIqXHgBDTr5hm7zj1TqKZTRFPTfKTGWANQgFpEBey4ZwHwcmoY9jebsly5YVXlUHTEoArN_up6rhSTbgvWUHrD_GPIIDUaImEh76CvrzQLBA-nWQTUuckdl232GvtaJktxMxKymG3jrJ_CfQfbhP_FXcQ2KRAk31m-Vq7YTma12OXkhGXnbXU-DkPAE5nrmAibofkHrWj6wKwv5fm1EONM02vYvLUHaB42YoD91Av"
              />
            </div>
          </div>
        </header>

        {/* Content Canvas Area */}
        <div className="p-6 md:p-10 flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default TeacherLayout;
