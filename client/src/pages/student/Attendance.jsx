import React, { useState } from 'react';

const Attendance = () => {
  // Calendar Navigation
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState('October');

  // Stats Period Dropdown State
  const [trendsPeriod, setTrendsPeriod] = useState('Last 6 Months');

  // Selected Calendar Day State
  const [selectedDay, setSelectedDay] = useState(8);

  // Modal and Toast States
  const [toastMessage, setToastMessage] = useState(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDayDetailsOpen, setIsDayDetailsOpen] = useState(false);

  // Self Attendance check-in form states
  const [checkInCode, setCheckInCode] = useState('');
  const [checkInCourse, setCheckInCourse] = useState('Advanced React Patterns');

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Calendar click handler
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsDayDetailsOpen(true);
  };

  // Check In handler
  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    if (checkInCode.length !== 6) {
      alert("Please enter a valid 6-digit dynamic attendance code!");
      return;
    }
    triggerToast(`Biometric and Geolocation validation completed. Self-Attendance logged successfully for "${checkInCourse}"!`);
    setIsCheckInOpen(false);
    setCheckInCode('');
  };

  // Static Monthly Graph trends
  const trendsData = {
    'Last 6 Months': [
      { month: 'MAY', height: 'h-[70%]', value: '84%' },
      { month: 'JUN', height: 'h-[85%]', value: '89%' },
      { month: 'JUL', height: 'h-[92%]', value: '92%' },
      { month: 'AUG', height: 'h-[60%]', value: '78%' },
      { month: 'SEP', height: 'h-[88%]', value: '91%' },
      { month: 'OCT', height: 'h-[95%]', value: '94.2%' }
    ],
    'This Year': [
      { month: 'JAN', height: 'h-[90%]', value: '92%' },
      { month: 'FEB', height: 'h-[95%]', value: '96%' },
      { month: 'MAR', height: 'h-[80%]', value: '88%' },
      { month: 'APR', height: 'h-[85%]', value: '89%' },
      { month: 'MAY', height: 'h-[70%]', value: '84%' },
      { month: 'JUN', height: 'h-[95%]', value: '95%' }
    ]
  };

  // Calendar Day details mockup
  const getDayDetails = (day) => {
    if (day === 4) {
      return { status: 'Absent', course: 'Machine Learning Basics', checkIn: 'N/A', reason: 'Unexcused Absence' };
    }
    if (day === 8) {
      return { status: 'Present', course: 'Advanced React Patterns', checkIn: '09:15 AM', reason: 'On Time check-in (Sync Mode)' };
    }
    if ([7, 14, 15, 21, 22].includes(day)) {
      return { status: 'Weekend', course: 'N/A', checkIn: 'N/A', reason: 'Institute Holiday' };
    }
    return { status: 'Present', course: 'Syllabus Core Practical Session', checkIn: '09:30 AM', reason: 'Checked-in via Biometric System' };
  };

  return (
    <div className="space-y-stack-lg text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[100] bg-primary text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="border-b border-outline-variant/20 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-1">Attendance Management</h2>
          <p className="text-on-surface-variant font-body-md text-xs">Monitor your daily presence, participation metrics, and monthly learning streaks.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => triggerToast("Attendance Log compiled. Excel export started successfully.")}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-surface-variant/20 border border-outline-variant/50 rounded-lg text-primary font-bold text-xs cursor-pointer active:scale-95 transition-all outline-none"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export Log
          </button>
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer border-none"
          >
            <span className="material-symbols-outlined text-sm">history</span>
            View History
          </button>
        </div>
      </header>

      {/* Dashboard Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-stack-md">
        
        {/* Overall Presence */}
        <div className="glass-card p-5 rounded-xl flex flex-col justify-between hover:shadow-sm cursor-pointer transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-primary/10 text-primary rounded-lg material-symbols-outlined">person_check</span>
            <span className="text-primary font-bold text-[10px] bg-primary/5 px-2 py-0.5 rounded">+2.4%</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[11px] font-bold">Overall Presence</p>
            <h3 className="text-xl font-extrabold text-on-surface mt-1">94.2%</h3>
          </div>
        </div>

        {/* Online Sessions */}
        <div className="glass-card p-5 rounded-xl flex flex-col justify-between hover:shadow-sm cursor-pointer transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-tertiary/10 text-tertiary rounded-lg material-symbols-outlined">devices</span>
            <span className="text-tertiary font-bold text-[10px] bg-tertiary/5 px-2 py-0.5 rounded">Active</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[11px] font-bold">Online Sessions</p>
            <h3 className="text-xl font-extrabold text-on-surface mt-1">42</h3>
          </div>
        </div>

        {/* Offline Classes */}
        <div className="glass-card p-5 rounded-xl flex flex-col justify-between hover:shadow-sm cursor-pointer transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-secondary/10 text-secondary rounded-lg material-symbols-outlined">meeting_room</span>
            <span className="text-secondary font-bold text-[10px] bg-secondary/5 px-2 py-0.5 rounded">Consistent</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[11px] font-bold">Offline Classes</p>
            <h3 className="text-xl font-extrabold text-on-surface mt-1">28</h3>
          </div>
        </div>

        {/* Absences */}
        <div className="glass-card p-5 rounded-xl flex flex-col justify-between hover:shadow-sm cursor-pointer transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-error/10 text-error rounded-lg material-symbols-outlined">event_busy</span>
            <span className="text-error font-bold text-[10px] bg-error/5 px-2 py-0.5 rounded">Low</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-[11px] font-bold">Absences</p>
            <h3 className="text-xl font-extrabold text-on-surface mt-1">03</h3>
          </div>
        </div>

      </div>

      {/* Calendar and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-start mt-6">
        
        {/* Attendance Calendar (Left 7 Columns) */}
        <div className="lg:col-span-7 glass-card rounded-xl overflow-hidden shadow-sm">
          
          <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/30 select-none">
            <h4 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base font-bold">calendar_month</span>
              {currentMonth} {currentYear}
            </h4>
            <div className="flex gap-1">
              <button 
                onClick={() => {
                  setCurrentMonth(currentMonth === 'October' ? 'September' : 'October');
                  triggerToast("Switched calendar months.");
                }}
                className="p-1.5 border border-outline-variant/30 bg-white rounded-lg hover:bg-surface-variant cursor-pointer transition-all outline-none"
              >
                <span className="material-symbols-outlined text-xs font-bold block">chevron_left</span>
              </button>
              <button 
                onClick={() => {
                  setCurrentMonth(currentMonth === 'October' ? 'November' : 'October');
                  triggerToast("Switched calendar months.");
                }}
                className="p-1.5 border border-outline-variant/30 bg-white rounded-lg hover:bg-surface-variant cursor-pointer transition-all outline-none"
              >
                <span className="material-symbols-outlined text-xs font-bold block">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="p-5">
            {/* Days header */}
            <div className="grid grid-cols-7 text-center font-bold text-[10px] text-on-surface-variant mb-4 tracking-wider">
              <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {/* Empty days represented visually (e.g. starting Wednesday) */}
              {[24, 25, 26, 27, 28, 29, 30].map((dummy) => (
                <div key={dummy} className="aspect-square flex items-center justify-center text-outline/25 text-[10px] font-medium pointer-events-none">
                  {dummy}
                </div>
              ))}

              {/* Present days with dots */}
              {[1, 2, 3, 5, 6, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 23, 24, 25].map((day) => (
                <div 
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square border border-outline-variant/35 rounded-lg flex flex-col items-center justify-center relative group cursor-pointer hover:border-primary transition-all ${
                    selectedDay === day ? 'bg-primary/5 ring-1 ring-primary' : 'bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-on-surface">{day}</span>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1"></div>
                </div>
              ))}

              {/* Absent days */}
              {[4].map((day) => (
                <div 
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square border border-outline-variant/35 rounded-lg flex flex-col items-center justify-center relative group cursor-pointer hover:border-error transition-all ${
                    selectedDay === day ? 'bg-error-container/20 ring-1 ring-error' : 'bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-on-surface">{day}</span>
                  <div className="w-1.5 h-1.5 bg-error rounded-full mt-1 animate-pulse"></div>
                </div>
              ))}

              {/* Holidays/Weekends */}
              {[7, 14, 15, 21, 22].map((day) => (
                <div 
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square bg-surface-container border border-outline-variant/30 rounded-lg flex flex-col items-center justify-center relative cursor-pointer ${
                    selectedDay === day ? 'ring-1 ring-outline' : ''
                  }`}
                >
                  <span className="text-xs font-bold text-on-surface-variant">{day}</span>
                </div>
              ))}

              {/* Selected Day Today Oct 8 */}
              <div 
                onClick={() => handleDayClick(8)}
                className="aspect-square bg-primary-container border-2 border-primary rounded-lg flex flex-col items-center justify-center relative shadow-sm scale-105 z-10 cursor-pointer"
              >
                <span className="text-xs font-extrabold text-on-primary-container">8</span>
                <span className="text-[7px] text-on-primary-container font-black uppercase mt-0.5 tracking-tighter">Today</span>
              </div>

            </div>

            {/* Calendar legend footer */}
            <div className="px-2 py-4 border-t border-outline-variant/20 flex gap-6 mt-6 justify-center text-[10px] font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-on-surface-variant">Present</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-error" />
                <span className="text-on-surface-variant">Absent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-22 h-2 bg-surface-container border border-outline-variant/30 rounded" />
                <span className="text-on-surface-variant">Holiday/Weekend</span>
              </div>
            </div>

          </div>

        </div>

        {/* Monthly Trends (Right 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-stack-lg">
          
          {/* Monthly trends chart */}
          <div className="glass-card p-5 rounded-xl shadow-sm text-left">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-headline-sm text-sm font-bold text-on-surface">Monthly Trends</h4>
              <select 
                value={trendsPeriod}
                onChange={(e) => setTrendsPeriod(e.target.value)}
                className="text-[10px] border-none bg-surface-container-low px-2 py-1.5 rounded-lg focus:ring-1 focus:ring-primary outline-none cursor-pointer font-bold"
              >
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
            
            <div className="h-44 flex items-end justify-between gap-4 px-2 mb-4">
              {trendsData[trendsPeriod].map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group relative cursor-pointer">
                  
                  {/* Tooltip percentage */}
                  <div className="absolute bottom-full mb-1 bg-on-surface text-surface text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-md">
                    {data.value}
                  </div>

                  <div className="w-full bg-primary/20 rounded-t-sm relative h-32 flex flex-col justify-end">
                    <div 
                      className={`w-full bg-primary rounded-t-sm transition-all duration-700 ease-out origin-bottom ${data.height}`} 
                    />
                  </div>
                  <span className="text-[9px] font-bold mt-2 text-on-surface-variant">{data.month}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-on-surface-variant text-center">
              Your attendance increased by <span className="text-primary font-bold">7.2%</span> compared to last month.
            </p>
          </div>

          {/* Online vs Offline Learning Mix */}
          <div className="glass-card p-5 rounded-xl shadow-sm text-left">
            <h4 className="font-headline-sm text-sm font-bold text-on-surface mb-6">Participation Mix</h4>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2 text-xs font-bold">
                  <span className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-tertiary text-base">computer</span> 
                    Online Classes
                  </span>
                  <span className="text-primary">60%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[60%] rounded-full" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2 text-xs font-bold">
                  <span className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-base">school</span> 
                    Campus Lectures
                  </span>
                  <span className="text-primary">40%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[40%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Detailed logs table */}
      <section className="glass-card rounded-xl overflow-hidden shadow-sm mt-6">
        
        <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center select-none bg-surface-container-low/30">
          <h4 className="font-headline-sm text-sm font-bold text-on-surface">Detailed Attendance Log</h4>
          <button 
            onClick={() => triggerToast("Loading historical log registry archive...")}
            className="text-primary font-bold text-xs hover:underline bg-transparent border-none cursor-pointer"
          >
            View All Records
          </button>
        </div>

        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-[10px] font-extrabold text-outline uppercase tracking-wider">
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Course Name</th>
                <th className="px-6 py-3.5">Mode</th>
                <th className="px-6 py-3.5">Check-In</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs font-medium">
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">Oct 08, 2026</td>
                <td className="px-6 py-4 font-bold text-on-surface">Advanced React Patterns</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 bg-tertiary/10 text-tertiary rounded-full text-[9px] font-extrabold uppercase">Online</span>
                </td>
                <td className="px-6 py-4 text-on-surface-variant font-mono">09:15 AM</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-primary font-bold text-[11px]">
                    <span className="material-symbols-outlined text-base">check_circle</span> Present
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">Oct 07, 2026</td>
                <td className="px-6 py-4 font-bold text-on-surface">Database Architecture</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 bg-secondary/10 text-secondary rounded-full text-[9px] font-extrabold uppercase">Campus</span>
                </td>
                <td className="px-6 py-4 text-on-surface-variant font-mono">10:02 AM</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-primary font-bold text-[11px]">
                    <span className="material-symbols-outlined text-base">check_circle</span> Present
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">Oct 06, 2026</td>
                <td className="px-6 py-4 font-bold text-on-surface">Machine Learning Basics</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 bg-tertiary/10 text-tertiary rounded-full text-[9px] font-extrabold uppercase">Online</span>
                </td>
                <td className="px-6 py-4 text-on-surface-variant font-mono">--:--</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-error font-bold text-[11px]">
                    <span className="material-symbols-outlined text-base">cancel</span> Absent
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">Oct 05, 2026</td>
                <td className="px-6 py-4 font-bold text-on-surface">UI/UX Principles</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 bg-secondary/10 text-secondary rounded-full text-[9px] font-extrabold uppercase">Campus</span>
                </td>
                <td className="px-6 py-4 text-on-surface-variant font-mono">08:55 AM</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-primary font-bold text-[11px]">
                    <span className="material-symbols-outlined text-base">check_circle</span> Present
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

      {/* Floating Action Button (FAB) - Geolocation Self check-in portal */}
      <button 
        onClick={() => setIsCheckInOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-none cursor-pointer outline-none group"
      >
        <span className="material-symbols-outlined text-2xl font-bold">add</span>
        <span className="absolute right-full mr-3 bg-on-surface text-surface text-[10px] font-bold px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          Self-Attendance Log
        </span>
      </button>

      {/* MODAL 1: GEOLOCATION BIOMETRIC SELF CHECK-IN */}
      {isCheckInOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_location_alt</span>
                <h3 className="text-base font-bold text-on-surface">Self-Attendance Check-In</h3>
              </div>
              <button 
                onClick={() => setIsCheckInOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleCheckInSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Select active session</label>
                <select 
                  value={checkInCourse}
                  onChange={(e) => setCheckInCourse(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer font-bold"
                >
                  <option value="Advanced React Patterns">Advanced React Patterns (CS-401)</option>
                  <option value="Database Architecture">Database Architecture (CS-402)</option>
                  <option value="Machine Learning Basics">Machine Learning Basics (CS-405)</option>
                  <option value="UI/UX Principles">UI/UX Principles (CS-409)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">
                  Dynamic 6-Digit Class Code
                </label>
                <input 
                  type="text" 
                  value={checkInCode}
                  onChange={(e) => setCheckInCode(e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="e.g. 489012"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs font-mono text-center tracking-widest focus:ring-1 focus:ring-primary outline-none"
                  required
                />
              </div>

              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-[10px] leading-relaxed text-on-primary-container">
                📍 Secure Check-In tracks your browser device coordinates. Please ensure GPS/Location access is granted to authenticate presence.
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all"
                >
                  Confirm Check-in
                </button>
                <button 
                  type="button"
                  onClick={() => setIsCheckInOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: DETAILED HISTORY CALENDAR LOGS */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10 flex flex-col h-[70vh]">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                <h3 className="text-base font-bold text-on-surface">Comprehensive Attendance History</h3>
              </div>
              <button 
                onClick={() => setIsHistoryOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-3 pr-1 custom-scrollbar text-xs leading-normal">
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                <p className="font-bold text-on-primary-container text-[10px] uppercase">Yearly Summary 2026</p>
                <p className="mt-1 font-light">Present Sessions: 120 • Absences recorded: 5 • Excused leaves: 2</p>
              </div>

              <div className="space-y-2 mt-4 text-left">
                <p className="font-bold text-[10px] text-outline uppercase tracking-wider">Older Log Sheets</p>
                <div className="divide-y divide-outline-variant/15">
                  <div className="py-2.5 flex justify-between">
                    <span>September 2026 Attendance</span>
                    <span className="font-bold text-primary">96% Completed</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span>August 2026 Attendance</span>
                    <span className="font-bold text-primary">92% Completed</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span>July 2026 Attendance</span>
                    <span className="font-bold text-primary">98% Completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant/20 shrink-0">
              <button 
                onClick={() => setIsHistoryOpen(false)}
                className="w-full bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all"
              >
                Close History
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: CALENDAR DAY SPECIFIC LOG DETAILS */}
      {isDayDetailsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10 space-y-4">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">date_range</span>
                <h3 className="text-xs font-bold text-on-surface">Log Details: {currentMonth} {selectedDay}, {currentYear}</h3>
              </div>
              <button 
                onClick={() => setIsDayDetailsOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-left">
              <div className="flex justify-between">
                <span className="text-outline">Attendance Status:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  getDayDetails(selectedDay).status === 'Present' ? 'bg-green-100 text-green-700' :
                  getDayDetails(selectedDay).status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  {getDayDetails(selectedDay).status}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-outline">Course/Lecturer Name:</span>
                <span className="font-bold text-on-surface">{getDayDetails(selectedDay).course}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-outline">Check-In Node:</span>
                <span className="font-bold text-on-surface font-mono">{getDayDetails(selectedDay).checkIn}</span>
              </div>

              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-[10px] leading-relaxed">
                📢 <strong>System validation info:</strong> {getDayDetails(selectedDay).reason}
              </div>
            </div>

            <button 
              onClick={() => setIsDayDetailsOpen(false)}
              className="w-full bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              Close Details
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Attendance;
