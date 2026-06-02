import React, { useState } from 'react';

const MyClasses = () => {
  // Page Notification Toasts
  const [toastMessage, setToastMessage] = useState(null);

  // Modal Dialog States
  const [isNewBatchOpen, setIsNewBatchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  // Active Schedule Day selection state
  const [activeDay, setActiveDay] = useState(19); // Default: Tuesday 19th Sept

  // Batch Form state variables
  const [batchSubject, setBatchSubject] = useState('');
  const [batchSem, setBatchSem] = useState('BCA 4th Sem');
  const [batchSection, setBatchSection] = useState('Section A');
  const [batchRoom, setBatchRoom] = useState('Room 102');
  const [batchTime, setBatchTime] = useState('02:00 PM');

  // Trigger Notification Toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Simulated Live Class action
  const handleJoinLive = () => {
    triggerToast('🎥 Connecting to virtual lecture hall... Syncing high-definition video grids!');
  };

  // Attendance shortcut
  const handleAttendanceShort = (subject) => {
    triggerToast(`📋 Attendance ledger loaded for: ${subject}`);
  };

  // Exam shortcut
  const handleExamShort = (subject) => {
    triggerToast(`📝 Dispatching rapid evaluation form for: ${subject}`);
  };

  // Submit New Batch
  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!batchSubject.trim()) return;

    triggerToast(`🎉 Batch "${batchSubject}" (${batchSem}) registered & successfully scheduled!`);
    setIsNewBatchOpen(false);
    setBatchSubject('');
  };

  // Daily Schedule mapped by clicked day
  const scheduleByDay = {
    18: [
      {
        id: 101,
        subject: 'Advanced Cryptography',
        topic: 'Asymmetric Encryption Key Pairs',
        time: '11:00 AM',
        detail: 'MTech 1st Sem • Lab 01',
        icon: 'lock',
        bg: 'bg-primary-fixed text-primary border-t-4 border-t-primary'
      },
      {
        id: 102,
        subject: 'Human Computer Interaction',
        topic: 'Aesthetic Usability Thresholds',
        time: '03:00 PM',
        detail: 'BCA 2nd Sem • Room 204',
        icon: 'devices',
        bg: 'bg-tertiary-fixed text-tertiary border-t-4 border-t-tertiary'
      }
    ],
    19: [
      {
        id: 201,
        subject: 'Python Programming',
        topic: 'Data Structures & Algorithms',
        time: '2:00 PM',
        detail: 'Section A • Room 102',
        icon: 'data_object',
        bg: 'bg-tertiary-fixed text-tertiary border-t-4 border-t-tertiary',
        isOffline: true
      },
      {
        id: 202,
        subject: 'DBMS Essentials',
        topic: 'SQL Query Optimization',
        time: '4:30 PM',
        detail: 'Section C • Online (Zoom)',
        icon: 'database',
        bg: 'bg-secondary-container text-primary border-t-4 border-t-primary-container',
        isOffline: false
      }
    ],
    20: [
      {
        id: 301,
        subject: 'Cloud Architectures',
        topic: 'Designing Multi-Tenant VPC Structures',
        time: '10:00 AM',
        detail: 'BCA 4th Sem • Lab 04',
        icon: 'dns',
        bg: 'bg-primary-fixed text-primary border-t-4 border-t-primary'
      }
    ],
    21: [
      {
        id: 401,
        subject: 'Software Engineering',
        topic: 'Agile Sprints & Kanban Boards',
        time: '11:30 AM',
        detail: 'BCA 3rd Sem • Room 301',
        icon: 'checklist',
        bg: 'bg-secondary-container text-primary border-t-4 border-t-primary-container'
      },
      {
        id: 402,
        subject: 'Python Data Science',
        topic: 'NumPy Grid Conversions',
        time: '04:00 PM',
        detail: 'BCA 4th Sem • Room 102',
        icon: 'terminal',
        bg: 'bg-tertiary-fixed text-tertiary border-t-4 border-t-tertiary'
      }
    ],
    22: [
      {
        id: 501,
        subject: 'Microservices Deployments',
        topic: 'Docker Containers Orchestration',
        time: '09:00 AM',
        detail: 'BCA 4th Sem • Lab 04',
        icon: 'integration_instructions',
        bg: 'bg-primary-fixed text-primary border-t-4 border-t-primary'
      },
      {
        id: 502,
        subject: 'Interactive Media Design',
        topic: 'Color Harmonizations',
        time: '01:00 PM',
        detail: 'UI/UX B2 • Lab 02',
        icon: 'palette',
        bg: 'bg-tertiary-fixed text-tertiary border-t-4 border-t-tertiary'
      }
    ],
    23: [],
    24: []
  };

  const activeDayClasses = scheduleByDay[activeDay] || [];

  return (
    <div className="space-y-8 text-left relative selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce text-xs font-semibold">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-none">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">My Classes</h2>
          <p className="text-on-surface-variant text-body-md font-light leading-normal">
            Manage your current lectures and plan your academic week.
          </p>
        </div>
        <div className="flex gap-2 select-none shrink-0">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="bg-surface-container-highest text-on-surface px-4 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-outline-variant transition-colors cursor-pointer border-none outline-none"
          >
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span>Schedule Settings</span>
          </button>
          
          <button 
            onClick={() => setIsNewBatchOpen(true)}
            className="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer border-none outline-none"
          >
            <span className="material-symbols-outlined text-sm font-bold">add_circle</span>
            <span>New Batch</span>
          </button>
        </div>
      </section>

      {/* Live Now Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary select-none">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
          </span>
          <h3 className="font-headline-sm text-sm font-extrabold uppercase tracking-wide">Live Now</h3>
        </div>

        {/* Live Class Bento Grid Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Card (Span 8) */}
          <div className="lg:col-span-8 glass-card rounded-2xl overflow-hidden shadow-lg border-l-4 border-l-primary flex flex-col md:flex-row h-full">
            
            {/* Live Room Image cover */}
            <div className="md:w-1/2 relative group select-none shrink-0 min-h-[220px]">
              <img 
                alt="Live Classroom" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVJIOjmJvn5fzcpikt34nAjXRAQAHJP1NFoEWAi4yLcgZQoaKv5rdPBKdavu0cVuMpGEtR9S5fdMzCsKOqyyoY7xPAMv61xHxuY8Q6meQ7PfIFeBuSOn0PmlCvzuYvImxc28FX2JP7_SBc5pq3aNr4OBnP7YoFMsJgBxB9N1UMR67-xcWL15gkTJwU_frMkFFB9s52R0zRiK1lR1i2L7K3uTyDziW3brzcvsjfx-ZnStbchHYvA0jK_-OXZGwplein1wDdr0pJDDcQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-[9px] px-2.5 py-0.5 rounded uppercase font-extrabold border border-white/10">Advanced</span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[9px] px-2.5 py-0.5 rounded uppercase font-extrabold border border-white/10">Lab 04</span>
              </div>
            </div>

            {/* Live Details info */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-primary font-bold text-xs uppercase tracking-wider select-none">BCA 4th Sem • Section B</span>
                <h4 className="font-headline-md text-xl font-bold text-on-surface mt-1">Advanced Web Architecture &amp; Clouds</h4>
                <p className="text-on-surface-variant text-xs font-light mt-2 leading-relaxed">
                  Topic: Deploying Microservices with Docker and Kubernetes Orchestration.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant select-none">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  <span>42/45 Joined</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>Ends in 35m</span>
                </div>
              </div>

              <div className="flex gap-3 select-none">
                <button 
                  onClick={handleJoinLive}
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95 border-none cursor-pointer outline-none text-xs"
                >
                  <span className="material-symbols-outlined text-sm">videocam</span>
                  <span>Join Live Class</span>
                </button>
                <button 
                  onClick={() => triggerToast('⚙️ Accessing lecture options...')}
                  className="p-3 bg-secondary-container text-primary rounded-xl hover:bg-primary-container/20 transition-colors border-none cursor-pointer outline-none shrink-0"
                >
                  <span className="material-symbols-outlined text-sm font-bold">more_horiz</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-outline-variant/30 select-none text-xs">
                <button 
                  onClick={() => handleAttendanceShort('Advanced Web Clouds')}
                  className="flex-1 bg-secondary-container text-on-secondary-container py-2.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 hover:bg-secondary-fixed transition-colors border-none cursor-pointer outline-none"
                >
                  <span className="material-symbols-outlined text-sm font-bold">how_to_reg</span>
                  <span>Mark Attendance</span>
                </button>
                <button 
                  onClick={() => handleExamShort('Advanced Web Clouds')}
                  className="flex-1 border border-primary/20 text-primary py-2.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 hover:bg-primary-container/10 transition-colors bg-transparent cursor-pointer outline-none"
                >
                  <span className="material-symbols-outlined text-sm font-bold">quiz</span>
                  <span>Schedule Exam</span>
                </button>
              </div>
            </div>

          </div>

          {/* Class Insights Sidebar Card (Span 4) */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 shadow-sm border border-outline-variant flex flex-col justify-between">
            <h5 className="font-headline-sm text-sm font-extrabold uppercase tracking-wider text-on-surface select-none">Class Insights</h5>
            
            <div className="space-y-4 py-4 select-none">
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-on-surface-variant font-medium">Avg. Participation</span>
                  <span className="font-bold text-primary">88%</span>
                </div>
                <div className="w-full bg-secondary-container h-2 rounded-full overflow-hidden border border-outline-variant/10">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-semibold">
                <span className="text-on-surface-variant font-medium">Assignments Due</span>
                <span className="font-bold text-error">12 pending</span>
              </div>

              <div className="flex -space-x-2 pt-1 select-none pointer-events-none">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmFdwOU6NHiEYcLY3V116HpuJ28YqB8niK5gZ0lJi6ZAWvNgfcIvoyID4RyStGeU8RgEPzn9PBtq-l80zcdFmWMksYLuNOMJIViCmCIZDVVBxF_mNlw3a-2ombxa1I2UNz98tV7vCr0Z6RMSmy2gA3eADOG6br9y4zWGIJVDqlcw4IHiw8RofPoqCvx5ziZ-7yuU6YCp--x21JpcdnVYz5XHF963XtATR0N30xZ7T0svUD_A1WcsPzSR3iizlZ3h4f2XRZi_J88rwC" alt="Student" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgzaV4TXQ7MsW6LG_FhE5eXCvGSKtU_W5waj1XeeVcx3cmOGNpyhwbpTwqZvnrQkmwIMOoT7bjIRIqs-dhVr6CqAXcI2fKtPEBoILNFkdEUQ3OVE44BgYa0PmSrKICK3oBQf_oW86p2cJI1btWZtXj_8AoiK4SiozArf3ZPeNIFFLsCJD2anQQ7zCKyEYgI017SRXWL9oRqv_aLoO_VgTiWeDwe15IuQl-_fRKhFstXb2-mE_uKaNuYBkruL-kL3bi_ctjS5BIQKI7" alt="Student" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvSP2l1AYwH2W18EjGXIoFO-LvzAOH0BugjlKYJQFUCw1qbh1FgLYbZpxPGSZBFxisc-XOqOyKfkQd5eRpH2r2OmyRvpvPei_FsbGeXet0I_hMPT3dF7e5thRvA3mORShG2unqRrNk3tInW3ZPFbM20cwAArjdeY0mIY7KBhoR-tQ0utrzbqJ9d1OIZi3bN9LKxQirg3ZNsA65P75LdbNZfWpHt7UR6LASC1FOOe-NRQcYQvfqzjvQHIcqGenq9IL6hSkdEcBHLnLN" alt="Student" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[9px] font-bold text-on-surface-variant font-sans">
                  +39
                </div>
              </div>
            </div>

            <button 
              onClick={() => triggerToast('📊 Synchronizing class statistical dashboards...')}
              className="w-full text-primary font-bold py-2 border border-primary/20 rounded-lg hover:bg-primary-container/10 bg-transparent transition-all cursor-pointer outline-none text-xs"
            >
              View All Statistics
            </button>
          </div>

        </div>
      </section>

      {/* Weekly Schedule Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          <h3 className="font-headline-sm text-sm font-extrabold uppercase tracking-wide text-on-surface">Class Schedule - This Week</h3>
          
          <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => triggerToast('📅 Shifting schedule back 7 days')}
                className="p-1.5 hover:bg-surface-container rounded-full bg-transparent border-none cursor-pointer outline-none flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <span className="mx-1 font-bold text-on-surface">Sept 18 - Sept 24</span>
              <button 
                onClick={() => triggerToast('📅 Shifting schedule forward 7 days')}
                className="p-1.5 hover:bg-surface-container rounded-full bg-transparent border-none cursor-pointer outline-none flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
            
            <div className="h-8 w-px bg-outline-variant mx-1"></div>
            
            <button 
              onClick={() => setIsNewBatchOpen(true)}
              className="text-primary hover:bg-primary/5 px-3 py-2 rounded-lg flex items-center gap-1.5 bg-transparent border-none cursor-pointer outline-none"
            >
              <span className="material-symbols-outlined text-base">add_box</span>
              <span>Schedule New</span>
            </button>
            
            <button 
              onClick={() => triggerToast('✏️ Edit mode enabled for calendar grid.')}
              className="text-on-surface-variant hover:bg-surface-container px-3 py-2 rounded-lg flex items-center gap-1.5 bg-transparent border-none cursor-pointer outline-none"
            >
              <span className="material-symbols-outlined text-base">edit_calendar</span>
              <span>Modify</span>
            </button>
          </div>
        </div>

        {/* Horizontal Calendar Slider */}
        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar select-none">
          
          {/* Monday 18 */}
          <div 
            onClick={() => setActiveDay(18)}
            className={`flex-none w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              activeDay === 18 
                ? 'active-schedule-day shadow-lg bg-primary text-on-primary scale-105' 
                : 'glass-card hover:border-primary border border-outline-variant/30 text-on-surface'
            }`}
          >
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${activeDay === 18 ? 'opacity-80' : 'text-on-surface-variant'}`}>Mon</span>
            <span className="text-2xl font-bold font-sans">18</span>
            <div className="flex gap-1 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 18 ? 'bg-white' : 'bg-primary'}`}></span>
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 18 ? 'bg-white' : 'bg-primary'}`}></span>
            </div>
          </div>

          {/* Tuesday 19 (Active Default) */}
          <div 
            onClick={() => setActiveDay(19)}
            className={`flex-none w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              activeDay === 19 
                ? 'active-schedule-day shadow-lg bg-primary text-on-primary scale-105' 
                : 'glass-card hover:border-primary border border-outline-variant/30 text-on-surface'
            }`}
          >
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${activeDay === 19 ? 'opacity-80' : 'text-on-surface-variant'}`}>Tue</span>
            <span className="text-2xl font-bold font-sans">19</span>
            <div className="flex gap-1 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 19 ? 'bg-white' : 'bg-primary'}`}></span>
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 19 ? 'bg-white' : 'bg-primary'}`}></span>
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 19 ? 'bg-white' : 'bg-primary'}`}></span>
            </div>
          </div>

          {/* Wednesday 20 */}
          <div 
            onClick={() => setActiveDay(20)}
            className={`flex-none w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              activeDay === 20 
                ? 'active-schedule-day shadow-lg bg-primary text-on-primary scale-105' 
                : 'glass-card hover:border-primary border border-outline-variant/30 text-on-surface'
            }`}
          >
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${activeDay === 20 ? 'opacity-80' : 'text-on-surface-variant'}`}>Wed</span>
            <span className="text-2xl font-bold font-sans">20</span>
            <div className="flex gap-1 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 20 ? 'bg-white' : 'bg-primary'}`}></span>
            </div>
          </div>

          {/* Thursday 21 */}
          <div 
            onClick={() => setActiveDay(21)}
            className={`flex-none w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              activeDay === 21 
                ? 'active-schedule-day shadow-lg bg-primary text-on-primary scale-105' 
                : 'glass-card hover:border-primary border border-outline-variant/30 text-on-surface'
            }`}
          >
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${activeDay === 21 ? 'opacity-80' : 'text-on-surface-variant'}`}>Thu</span>
            <span className="text-2xl font-bold font-sans">21</span>
            <div className="flex gap-1 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 21 ? 'bg-white' : 'bg-primary'}`}></span>
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 21 ? 'bg-white' : 'bg-primary'}`}></span>
            </div>
          </div>

          {/* Friday 22 */}
          <div 
            onClick={() => setActiveDay(22)}
            className={`flex-none w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
              activeDay === 22 
                ? 'active-schedule-day shadow-lg bg-primary text-on-primary scale-105' 
                : 'glass-card hover:border-primary border border-outline-variant/30 text-on-surface'
            }`}
          >
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${activeDay === 22 ? 'opacity-80' : 'text-on-surface-variant'}`}>Fri</span>
            <span className="text-2xl font-bold font-sans">22</span>
            <div className="flex gap-1 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 22 ? 'bg-white' : 'bg-primary'}`}></span>
              <span className={`w-1.5 h-1.5 rounded-full ${activeDay === 22 ? 'bg-white' : 'bg-primary'}`}></span>
            </div>
          </div>

          {/* Saturday 23 */}
          <div 
            onClick={() => setActiveDay(23)}
            className={`flex-none w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all opacity-60 ${
              activeDay === 23 
                ? 'active-schedule-day shadow-lg bg-primary text-on-primary scale-105' 
                : 'glass-card hover:border-primary border border-outline-variant/30 text-on-surface'
            }`}
          >
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${activeDay === 23 ? 'opacity-80' : 'text-on-surface-variant'}`}>Sat</span>
            <span className="text-2xl font-bold font-sans">23</span>
            <div className="mt-1 flex items-center justify-center">
              <span className="text-[9px] font-bold">No Classes</span>
            </div>
          </div>

          {/* Sunday 24 */}
          <div 
            onClick={() => setActiveDay(24)}
            className={`flex-none w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all opacity-60 ${
              activeDay === 24 
                ? 'active-schedule-day shadow-lg bg-primary text-on-primary scale-105' 
                : 'glass-card hover:border-primary border border-outline-variant/30 text-on-surface'
            }`}
          >
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${activeDay === 24 ? 'opacity-80' : 'text-on-surface-variant'}`}>Sun</span>
            <span className="text-2xl font-bold font-sans">24</span>
            <div className="mt-1 flex items-center justify-center">
              <span className="text-[9px] font-bold">No Classes</span>
            </div>
          </div>

        </div>
      </section>

      {/* Upcoming Today/Selected day Classes Cards */}
      <section className="space-y-6">
        <h3 className="font-headline-sm text-sm font-extrabold uppercase tracking-wide text-on-surface select-none">
          {activeDay === 19 ? 'Upcoming Today' : `Classes Scheduled - Sept ${activeDay}`}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {activeDayClasses.length === 0 ? (
            <div className="col-span-full border-2 border-dashed border-outline-variant/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center select-none text-on-surface-variant font-light italic text-xs">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">hotel</span>
              <span>No lectures scheduled for this calendar day. Enjoy your holiday!</span>
            </div>
          ) : (
            activeDayClasses.map((cl) => (
              <div key={cl.id} className={`glass-card rounded-2xl p-6 hover:shadow-lg hover:translate-y-[-4px] transition-all group flex flex-col justify-between ${cl.bg}`}>
                <div>
                  <div className="flex justify-between items-start mb-4 select-none">
                    <div className="p-3 bg-white/40 dark:bg-surface-container rounded-xl text-primary font-bold">
                      <span className="material-symbols-outlined text-xl">{cl.icon}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">
                      {cl.time}
                    </span>
                  </div>
                  
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">{cl.subject}</span>
                  <h4 className="font-headline-sm text-base font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">{cl.topic}</h4>
                  <p className="text-xs text-on-surface-variant font-light mt-2">{cl.detail}</p>
                </div>

                <div className="mt-6 flex items-center justify-between select-none text-xs font-bold">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {cl.isOffline === false ? (
                      <button 
                        onClick={handleJoinLive}
                        className="bg-primary text-on-primary py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:brightness-95 transition-all border-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">videocam</span>
                        <span>Manage Link</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleAttendanceShort(cl.subject)}
                        className="bg-secondary-container text-on-secondary-container py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:brightness-95 transition-all border-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">how_to_reg</span>
                        <span>Attendance</span>
                      </button>
                    )}

                    <button 
                      onClick={() => handleExamShort(cl.subject)}
                      className="border border-outline-variant/60 text-on-surface-variant py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-surface-container/20 transition-all bg-transparent cursor-pointer outline-none"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">assignment_add</span>
                      <span>Add Exam</span>
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}

          {/* Add Special Class placeholder card */}
          <div 
            onClick={() => setIsAddClassOpen(true)}
            className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group select-none min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined font-bold">add</span>
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">Add Special Class</p>
              <p className="text-[11px] text-on-surface-variant font-light mt-0.5 leading-normal max-w-[200px]">
                Schedule a remedial or extra session.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CREATE MODAL: Create New Batch Form */}
      {isNewBatchOpen && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-outline-variant text-left animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-4 select-none border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary font-bold">add_circle</span>
                Register New Batch
              </h2>
              <button 
                onClick={() => setIsNewBatchOpen(false)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant bg-transparent border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Course / Lecture Title</label>
                <input 
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                  placeholder="e.g. Fullstack Web Systems" 
                  type="text"
                  value={batchSubject}
                  onChange={(e) => setBatchSubject(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 select-none">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Semester</label>
                  <select 
                    value={batchSem}
                    onChange={(e) => setBatchSem(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs"
                  >
                    <option value="BCA 2nd Sem">BCA 2nd Sem</option>
                    <option value="BCA 4th Sem">BCA 4th Sem</option>
                    <option value="BTech 3rd Sem">BTech 3rd Sem</option>
                    <option value="MTech 1st Sem">MTech 1st Sem</option>
                  </select>
                </div>
                
                <div className="space-y-1.5 select-none">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Section / Division</label>
                  <select 
                    value={batchSection}
                    onChange={(e) => setBatchSection(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs"
                  >
                    <option value="Section A">Section A</option>
                    <option value="Section B">Section B</option>
                    <option value="Section C">Section C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 select-none">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Class Venue / Room</label>
                  <select 
                    value={batchRoom}
                    onChange={(e) => setBatchRoom(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs"
                  >
                    <option value="Room 102">Room 102 (Theory)</option>
                    <option value="Room 204">Room 204 (Lecture)</option>
                    <option value="Lab 01">Lab 01 (Systems)</option>
                    <option value="Lab 04">Lab 04 (Advanced)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Schedule Lecture Time</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                    placeholder="02:00 PM" 
                    type="text"
                    value={batchTime}
                    onChange={(e) => setBatchTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 select-none">
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors border-none bg-transparent cursor-pointer outline-none" 
                  onClick={() => setIsNewBatchOpen(false)} 
                  type="button"
                >
                  Discard
                </button>
                <button 
                  className="px-8 py-2.5 rounded-xl font-bold bg-primary text-on-primary shadow-lg hover:opacity-95 transition-opacity border-none cursor-pointer outline-none active:scale-95" 
                  type="submit"
                >
                  Publish Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL: Configure Scheduler Break / Times */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl shadow-2xl p-6 border border-outline-variant text-left animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-4 select-none border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary font-bold">settings</span>
                Schedule Settings
              </h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant bg-transparent border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsSettingsOpen(false); triggerToast('⚙️ Scheduler thresholds updated.'); }} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Default Lecture Duration</label>
                <select className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs">
                  <option>1 Hour</option>
                  <option>1.5 Hours</option>
                  <option>2 Hours (Standard)</option>
                  <option>3 Hours (Practical Labs)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Recess / Break intervals</label>
                <select className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs">
                  <option>10 Minutes</option>
                  <option>15 Minutes</option>
                  <option>30 Minutes</option>
                </select>
              </div>

              <div className="flex items-center gap-2 py-1 select-none">
                <input className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer" id="auto-reminders" type="checkbox" defaultChecked />
                <label className="text-body-sm font-medium cursor-pointer" htmlFor="auto-reminders">Automated stream reminders to student portals</label>
              </div>

              <div className="pt-2 flex justify-end gap-3 select-none">
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors border-none bg-transparent cursor-pointer outline-none" 
                  onClick={() => setIsSettingsOpen(false)} 
                  type="button"
                >
                  Discard
                </button>
                <button 
                  className="px-8 py-2.5 rounded-xl font-bold bg-primary text-on-primary shadow-lg hover:opacity-95 transition-opacity border-none cursor-pointer outline-none active:scale-95" 
                  type="submit"
                >
                  Save Config
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SPECIAL CLASS MODAL */}
      {isAddClassOpen && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl shadow-2xl p-6 border border-outline-variant text-left animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-4 select-none border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary font-bold">add</span>
                Schedule Special / Remedial Class
              </h2>
              <button 
                onClick={() => setIsAddClassOpen(false)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant bg-transparent border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsAddClassOpen(false); triggerToast('📅 Remedial session registered & notified.'); }} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Target Topic / Scope</label>
                <input 
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                  placeholder="e.g. Doubts Resolution on SQL Optimizations" 
                  type="text"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 select-none">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Select Batch</label>
                  <select className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs">
                    <option>Python Data Science - Batch A</option>
                    <option>UI/UX Design - Advanced</option>
                    <option>Fullstack Web Dev - Morning</option>
                  </select>
                </div>
                
                <div className="space-y-1.5 select-none">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Session Mode</label>
                  <select className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs">
                    <option>Offline Room 102</option>
                    <option>Online Zoom Room 2</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 select-none">
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors border-none bg-transparent cursor-pointer outline-none" 
                  onClick={() => setIsAddClassOpen(false)} 
                  type="button"
                >
                  Discard
                </button>
                <button 
                  className="px-8 py-2.5 rounded-xl font-bold bg-primary text-on-primary shadow-lg hover:opacity-95 transition-opacity border-none cursor-pointer outline-none active:scale-95" 
                  type="submit"
                >
                  Confirm Special Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyClasses;
