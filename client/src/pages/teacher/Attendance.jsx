import React, { useState } from 'react';

const Attendance = () => {
  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Modal / Drawer States
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Configuration States
  const [selectedBatch, setSelectedBatch] = useState('Python Data Science - Batch A');
  const [sessionDate, setSessionDate] = useState('2023-10-27');
  const [classMode, setClassMode] = useState('online'); // 'online' or 'offline'
  
  // Class Details based on Mode
  const [onlinePlatform, setOnlinePlatform] = useState('Zoom Meeting (ID: 844 219)');
  const [offlineLocation, setOfflineLocation] = useState('Main Campus - Lab 304');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Roster arrays
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Aditi Sharma', 
      roll: 'LCA-10294', 
      status: 'Present', 
      timeIn: '09:15 AM', 
      remarks: '', 
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4hzlUaLiO4DfO392mNUEIspxIjVsRkgbQkeMUw-QY9HRSNoArvB8kxEWGv7jWWDBdfmUdkQr4hLLTRq_bnaneacMps3ys7kJ49wh5HdD2TMJqrnfS0JyPST_IAxFfWw4ieTiSknooqLn3t_Xz0J5dXKLyTDyX0kHFKihnIIuMDZe3M450oA56-UwjE3pFzWQ6j174eafFdEsdWdY46DB6vLTt-VWeEzYHV4B-ZRSwg48DAAEc10mmhDt4UawM7eZTxs0QIqkp82eo',
      initials: 'AS',
      colorClass: 'bg-primary/10 text-primary'
    },
    { 
      id: 2, 
      name: 'Rohan Verma', 
      roll: 'LCA-10311', 
      status: 'Absent', 
      timeIn: '—', 
      remarks: 'Medical Leave', 
      avatar: null,
      initials: 'RV',
      colorClass: 'bg-primary-container/20 text-primary'
    },
    { 
      id: 3, 
      name: 'Aryan Malhotra', 
      roll: 'LCA-10283', 
      status: 'Present', 
      timeIn: '09:02 AM', 
      remarks: '', 
      avatar: null,
      initials: 'AM',
      colorClass: 'bg-tertiary-container/20 text-tertiary'
    },
    { 
      id: 4, 
      name: 'Sneha Patel', 
      roll: 'LCA-10304', 
      status: 'Late', 
      timeIn: '09:32 AM', 
      remarks: 'Late due to metro delay', 
      avatar: null,
      initials: 'SP',
      colorClass: 'bg-secondary-container text-secondary'
    }
  ]);

  // Dynamic history logs
  const [historyLogs, setHistoryLogs] = useState([
    { date: '2023-10-26', batch: 'Python Data Science - Batch A', mode: 'Offline', location: 'Lab 304', present: 39, total: 42 },
    { date: '2023-10-25', batch: 'Python Data Science - Batch A', mode: 'Online', location: 'Zoom Room 1', present: 41, total: 42 },
    { date: '2023-10-24', batch: 'Fullstack Web Dev - Morning', mode: 'Online', location: 'MS Teams', present: 28, total: 30 }
  ]);

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Toggle dynamic status
  const handleStatusChange = (studentId, newStatus) => {
    setStudents(prev => prev.map(stu => {
      if (stu.id === studentId) {
        let time = '—';
        if (newStatus === 'Present') time = '09:15 AM';
        else if (newStatus === 'Late') time = '09:28 AM';
        return { ...stu, status: newStatus, timeIn: time };
      }
      return stu;
    }));
    triggerToast(`Presence updated for student ${students.find(s => s.id === studentId)?.name}!`);
  };

  // Mark all present
  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(stu => ({ ...stu, status: 'Present', timeIn: '09:15 AM' })));
    triggerToast('✅ Marked all students in batch as Present.');
  };

  // Submit attendance and save
  const handleSubmitAttendance = () => {
    triggerToast(`💾 Attendance for ${selectedBatch} successfully submitted & recorded in system.`);
    
    // Add record to history log
    const presCount = students.filter(s => s.status === 'Present' || s.status === 'Late').length;
    const newLog = {
      date: sessionDate,
      batch: selectedBatch,
      mode: classMode === 'online' ? 'Online' : 'Offline',
      location: classMode === 'online' ? onlinePlatform.split(' (')[0] : offlineLocation.split(' - ')[1],
      present: presCount,
      total: students.length
    };
    
    setHistoryLogs([newLog, ...historyLogs]);
  };

  // PDF download mock
  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerToast(`📄 Attendance PDF report generated & downloaded: 'Presence_${selectedBatch.split(' ')[0]}_${sessionDate}.pdf'`);
    }, 2000);
  };

  // Filter students based on search query
  const filteredStudents = students.filter(stu => {
    const query = searchQuery.toLowerCase();
    return stu.name.toLowerCase().includes(query) || stu.roll.toLowerCase().includes(query);
  });

  // Calculate stats dynamically
  const totalStudents = students.length;
  const presentCount = students.filter(s => s.status === 'Present').length;
  const lateCount = students.filter(s => s.status === 'Late').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  
  // Total present today (Present + Late counts)
  const presentToday = presentCount + lateCount;
  const attendancePercentage = ((presentToday / totalStudents) * 100).toFixed(1);

  return (
    <div className="space-y-stack-lg text-left relative selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce text-xs font-semibold">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-none">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Attendance Management</h2>
          <p className="text-on-surface-variant text-body-md font-light leading-normal">
            Track, log, and analyze student presence for your daily batches.
          </p>
        </div>
        
        <div className="flex items-center gap-3 select-none">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest border border-outline-variant text-on-surface font-semibold rounded-lg hover:bg-surface-container transition-all cursor-pointer text-xs outline-none"
          >
            <span className="material-symbols-outlined text-[20px] shrink-0 font-bold">
              {isExporting ? 'progress_activity' : 'download'}
            </span>
            <span>{isExporting ? 'Generating...' : 'Export PDF'}</span>
          </button>
          
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold rounded-lg hover:scale-[1.02] active:scale-95 transition-all shadow-sm border-none cursor-pointer text-xs outline-none"
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">history</span>
            <span>View History</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Quick Stats Panel (Span 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Total Students */}
          <div className="glass-card p-6 rounded-xl flex items-center gap-5 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary shrink-0 select-none">
              <span className="material-symbols-outlined text-[32px] font-bold">groups</span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-tight text-[10px] font-bold">Total Students</p>
              <h3 className="font-headline-md text-3xl font-extrabold text-on-surface mt-0.5">{totalStudents}</h3>
            </div>
          </div>

          {/* Present Today */}
          <div className="glass-card p-6 rounded-xl flex items-center gap-5 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 select-none">
              <span className="material-symbols-outlined text-[32px] font-bold">check_circle</span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-tight text-[10px] font-bold">Present Today</p>
              <h3 className="font-headline-md text-3xl font-extrabold text-on-surface mt-0.5">{presentToday}</h3>
            </div>
          </div>

          {/* Absent */}
          <div className="glass-card p-6 rounded-xl flex items-center gap-5 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-error-container/20 flex items-center justify-center text-error shrink-0 select-none">
              <span className="material-symbols-outlined text-[32px] font-bold">cancel</span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-tight text-[10px] font-bold">Absent</p>
              <h3 className="font-headline-md text-3xl font-extrabold text-on-surface mt-0.5">{absentCount}</h3>
            </div>
          </div>

          {/* Attendance % */}
          <div className="glass-card p-6 rounded-xl flex items-center gap-5 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary shrink-0 select-none">
              <span className="material-symbols-outlined text-[32px] font-bold">analytics</span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label-sm uppercase tracking-tight text-[10px] font-bold">Attendance %</p>
              <h3 className="font-headline-md text-3xl font-extrabold text-on-surface mt-0.5">{attendancePercentage}%</h3>
            </div>
          </div>

        </div>

        {/* Mark Attendance Setup Form Card (Span 4) */}
        <div className="lg:col-span-4 glass-card p-6 rounded-2xl shadow-sm border-l-4 border-l-primary flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6 select-none">
            <span className="material-symbols-outlined text-primary font-bold">edit_calendar</span>
            <h4 className="font-headline-sm text-sm font-extrabold text-on-surface">Mark Attendance</h4>
          </div>

          <form className="space-y-5 flex-grow flex flex-col justify-between text-xs font-semibold">
            <div className="space-y-4">
              <div className="space-y-1.5 select-none">
                <label className="block text-label-sm font-label-sm text-on-surface-variant text-[10px] uppercase font-bold tracking-wide">Select Batch</label>
                <select 
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-surface outline-none text-on-surface text-xs py-2.5 px-3 font-medium cursor-pointer"
                >
                  <option value="Python Data Science - Batch A">Python Data Science - Batch A</option>
                  <option value="UI/UX Design - Advanced">UI/UX Design - Advanced</option>
                  <option value="Fullstack Web Dev - Morning">Fullstack Web Dev - Morning</option>
                  <option value="Ethical Hacking 101">Ethical Hacking 101</option>
                </select>
              </div>

              <div className="space-y-1.5 select-none">
                <label className="block text-label-sm font-label-sm text-on-surface-variant text-[10px] uppercase font-bold tracking-wide">Session Date</label>
                <input 
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-surface outline-none text-on-surface text-xs py-2.5 px-3 font-medium cursor-pointer"
                />
              </div>

              {/* Class Mode Delivery Selector (Online / Offline) - Satisfies User Request! */}
              <div className="space-y-1.5 select-none border-t border-outline-variant/10 pt-3">
                <label className="block text-label-sm font-label-sm text-on-surface-variant text-[10px] uppercase font-bold tracking-wide">Class Delivery Mode</label>
                
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => { setClassMode('online'); triggerToast('🌐 Class mode set to Online Lecture.'); }}
                    className={`py-2 px-3 rounded-lg border font-bold flex items-center justify-center gap-1.5 cursor-pointer outline-none transition-all ${
                      classMode === 'online'
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface border-outline-variant text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">dns</span>
                    <span>Online</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setClassMode('offline'); triggerToast('🏫 Class mode set to Physical Campus.'); }}
                    className={`py-2 px-3 rounded-lg border font-bold flex items-center justify-center gap-1.5 cursor-pointer outline-none transition-all ${
                      classMode === 'offline'
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface border-outline-variant text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">domain</span>
                    <span>Offline</span>
                  </button>
                </div>
              </div>

              {/* Conditional parameters based on online / offline mode selection */}
              {classMode === 'online' ? (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="block text-label-sm font-label-sm text-on-surface-variant text-[10px] uppercase font-bold tracking-wide">Virtual Classroom Sync</label>
                  <input 
                    type="text" 
                    value={onlinePlatform}
                    onChange={(e) => setOnlinePlatform(e.target.value)}
                    placeholder="Zoom details / stream link..." 
                    className="w-full rounded-lg border border-outline-variant bg-surface outline-none text-on-surface text-xs py-2.5 px-3 font-medium"
                  />
                </div>
              ) : (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="block text-label-sm font-label-sm text-on-surface-variant text-[10px] uppercase font-bold tracking-wide">Physical Lab / Venue Room</label>
                  <input 
                    type="text" 
                    value={offlineLocation}
                    onChange={(e) => setOfflineLocation(e.target.value)}
                    placeholder="Lab ID / Lecture Room..." 
                    className="w-full rounded-lg border border-outline-variant bg-surface outline-none text-on-surface text-xs py-2.5 px-3 font-medium"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-outline-variant/30 mt-4 select-none">
              <p className="text-[11px] text-on-surface-variant mb-4 italic font-light">
                Confirming will dynamically compile student registers matching the selected session date.
              </p>
              <button 
                type="button"
                onClick={() => triggerToast(`🔄 Register loaded: ${selectedBatch} (${classMode.toUpperCase()})`)}
                className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg hover:shadow-lg transition-all active:scale-[0.98] border-none cursor-pointer outline-none"
              >
                Load Student List
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Attendance Log Table Section */}
      <div className="glass-card rounded-2xl shadow-sm overflow-hidden mb-10">
        
        {/* Table header bar */}
        <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-low/50">
          <div>
            <h4 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-2 select-none">
              <span>Attendance Log</span>
              
              {/* Delivery mode badges dynamically rendered */}
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                classMode === 'online'
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/20'
              }`}>
                {classMode === 'online' ? '🌐 ONLINE SESSION' : '🏫 OFFLINE SESSION'}
              </span>
            </h4>
            <p className="text-xs text-on-surface-variant mt-1.5 font-light">
              {selectedBatch} | {sessionDate} | {classMode === 'online' ? onlinePlatform : offlineLocation}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto text-xs font-semibold">
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm select-none">search</span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or roll no..."
                className="w-full pl-9 pr-4 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            
            <button 
              onClick={handleMarkAllPresent}
              className="w-full sm:w-auto px-4 py-2 text-primary font-bold hover:bg-primary/5 rounded-lg transition-colors border border-primary/20 bg-transparent cursor-pointer outline-none"
            >
              Mark All Present
            </button>
          </div>
        </div>

        {/* Responsive Table grid */}
        <div className="overflow-x-auto text-xs font-semibold">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container text-on-surface-variant uppercase text-[10px] font-bold tracking-widest border-b border-outline-variant/15 select-none">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time In</th>
                <th className="px-6 py-4">Remarks</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant/70 italic select-none">
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-surface-container-low transition-colors">
                    
                    {/* Student Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {student.avatar ? (
                          <img 
                            alt={student.name} 
                            className="w-8 h-8 rounded-full border border-outline-variant object-cover shrink-0 select-none" 
                            src={student.avatar}
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-full ${student.colorClass} font-bold flex items-center justify-center text-[10px] select-none shrink-0 border border-outline-variant/10`}>
                            {student.initials}
                          </div>
                        )}
                        <span className="text-sm font-bold text-on-surface truncate">{student.name}</span>
                      </div>
                    </td>
                    
                    {/* Roll No */}
                    <td className="px-6 py-4 font-semibold select-none shrink-0">{student.roll}</td>
                    
                    {/* Status Toggles */}
                    <td className="px-6 py-4 select-none shrink-0">
                      <div className="inline-flex rounded-lg border border-outline-variant p-0.5 bg-surface-container-low">
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          type="button"
                          className={`px-3 py-1 text-xs font-bold rounded cursor-pointer border-none outline-none transition-all ${
                            student.status === 'Present' 
                              ? 'bg-green-500 text-white shadow-sm' 
                              : 'text-on-surface-variant hover:bg-surface-container'
                          }`}
                        >
                          Present
                        </button>
                        
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          type="button"
                          className={`px-3 py-1 text-xs font-bold rounded cursor-pointer border-none outline-none transition-all ${
                            student.status === 'Absent' 
                              ? 'bg-error text-white shadow-sm' 
                              : 'text-on-surface-variant hover:bg-surface-container'
                          }`}
                        >
                          Absent
                        </button>
                        
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Late')}
                          type="button"
                          className={`px-3 py-1 text-xs font-bold rounded cursor-pointer border-none outline-none transition-all ${
                            student.status === 'Late' 
                              ? 'bg-yellow-500 text-white shadow-sm' 
                              : 'text-on-surface-variant hover:bg-surface-container'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                    
                    {/* Time In */}
                    <td className="px-6 py-4 font-semibold text-on-surface-variant select-none shrink-0">{student.timeIn}</td>
                    
                    {/* Remarks Input */}
                    <td className="px-6 py-4">
                      <input 
                        type="text"
                        value={student.remarks}
                        onChange={(e) => {
                          const val = e.target.value;
                          setStudents(prev => prev.map(s => s.id === student.id ? { ...s, remarks: val } : s));
                        }}
                        placeholder="Add note..."
                        className="w-full bg-transparent border-none text-xs focus:ring-0 placeholder:text-on-surface-variant/40 outline-none font-medium truncate"
                      />
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer action bar */}
        <div className="p-6 bg-surface border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs font-medium text-on-surface-variant italic select-none">
            Showing {filteredStudents.length} of {totalStudents} students in this batch.
          </span>
          
          <div className="flex items-center gap-4 select-none">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg border border-outline-variant bg-transparent hover:bg-surface-container transition-colors cursor-pointer outline-none">
                <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
              </button>
              <button className="p-2 rounded-lg border border-outline-variant bg-transparent hover:bg-surface-container transition-colors cursor-pointer outline-none">
                <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
              </button>
            </div>
            
            <button 
              onClick={handleSubmitAttendance}
              className="px-8 py-2.5 bg-primary text-on-primary font-bold rounded-lg hover:shadow-lg transition-all active:scale-[0.98] border-none cursor-pointer outline-none"
            >
              Submit Attendance
            </button>
          </div>
        </div>

      </div>

      {/* VIEW HISTORY SLIDER DRAWER (Stateful Dialog Overlay) */}
      {isHistoryOpen && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] flex justify-end">
          <div className="glass-card w-full max-w-md h-full shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300 text-left border-l border-outline-variant">
            
            <div className="flex justify-between items-center select-none border-b border-outline-variant/20 pb-4">
              <h3 className="font-headline-sm text-base font-extrabold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                Attendance History
              </h3>
              <button 
                onClick={() => setIsHistoryOpen(false)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant bg-transparent border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 pr-1 text-xs">
              {historyLogs.map((log, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-outline-variant/40 bg-surface-container/30 space-y-2 relative">
                  
                  {/* Delivery mode tags */}
                  <span className={`absolute top-4 right-4 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                    log.mode === 'Online' 
                      ? 'bg-primary/10 text-primary border-primary/15' 
                      : 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/15'
                  }`}>
                    {log.mode}
                  </span>

                  <h4 className="font-bold text-on-surface">{log.batch}</h4>
                  <p className="text-[10px] text-on-surface-variant">{log.date} • Location: {log.location}</p>
                  
                  <div className="flex justify-between items-center pt-1 border-t border-outline-variant/10">
                    <span className="text-on-surface-variant font-light">Presence Score:</span>
                    <span className="font-bold text-primary">{log.present}/{log.total} Students ({((log.present / log.total) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-outline-variant/20 select-none">
              <button 
                onClick={() => setIsHistoryOpen(false)}
                className="w-full py-3 bg-surface-container hover:bg-surface-container-high font-bold text-on-surface rounded-lg transition-colors border border-outline-variant/50 cursor-pointer outline-none"
              >
                Close Logs Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Attendance;
