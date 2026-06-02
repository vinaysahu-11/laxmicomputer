import React, { useState } from 'react';

const Attendance = () => {
  // 1. Initial State Data
  const [studentRecords, setStudentRecords] = useState([
    { id: 'STD-100245', name: 'John Smith', batch: 'Web Design B12', timeIn: '08:55 AM', status: 'Present', performance: 98, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJX5NMNE3wfj4oCTBe6iTMVVmjf3BMYmSWg0AXNs3fX8iOGGi3vr66rVgpQpmFXt9W8Ys86m0H9cHCEPZWLOBM7zjWzcJ6svHkRyNNcwxel6VrDrw1b26o0g5ESCG_VixPBYJPbR35xpAoTdm-SWkW--K7j4Z6-Bpau_a-yUuE-ZNKuPGqDkF3wT9T9UDIA5bK00--11M_N7j7ETsj9H0VxIltBJVuIYCV2d_VJk291TiPS9WL6ugS5PQLMYZtlzGGYP1A53pZUnvU' },
    { id: 'STD-100248', name: 'Alice Miller', batch: 'Web Design B12', timeIn: '09:15 AM', status: 'Late', performance: 85, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpekJs9_bbtyFYqe6Gf_j0Ic3lZrp1zmjBVKk2gveNAw8mkHd6_M5WDUTmwNSU734Xhu50XWh8efiMhZtB4xYiB8Xxu0BWM5guJXUL_UTRl53stApkoaM-L0gCJfXguTULmSk0p3pZAfzXf9fISltiri12Zw0cLhOUw1OXrfl9qRP_aoC_OAlB9-9CB4-EvXYTcONHb92zPQl3jUUyRSmH_LnQ2QzBkGeqWXoW9bHoeTqoD0VqCkIgq9jRUAwWgQNixijG-1POcJQi' },
    { id: 'STD-100251', name: 'Mark Davis', batch: 'Web Design B12', timeIn: '—', status: 'Absent', performance: 62, initials: 'MD' },
    { id: 'STD-100255', name: 'Chloe Wang', batch: 'Web Design B12', timeIn: '08:48 AM', status: 'Present', performance: 95, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB58vv_YumqO9saZP1SbMIpnlbNQiDdbgCoduG7cz5yyBEeGRg6eLJgWvZqzNWbcIEEziVdB1nDMJQtWrrldprKBPqzi9FL8Uql9bz_UM3jlZTPjj_N_tTqXmZSdvaSQ2nZFYtV3BuanbtM3ABPIGnYynMnElaXwnmg9q860rusSMIPYXSiD6GXaoR0UHo8woFPv-vTVm51K89tzBY1LIL31w2YRhrkqAETEsJNPRuVww81oqzgOLzXYUgJ-8x-1yrdvMI4Av0QN1R7' },
    { id: 'STD-100259', name: 'Lucas Thorne', batch: 'Web Design B12', timeIn: '08:59 AM', status: 'Present', performance: 88, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqfD9tJZosq75ltfcDtxI4emDZ3FbP3ifE4H0ztHdL9XTpAQFO3kFMXpX2NO0x4eWlf8HbtHl7P4sEC-9h5nIfp2WBn4NpHv1sK3hC9jvqM4xez8kVrcemC2baUUL7_257j6AXsBvCe8SXlJfs76gUrmpOydYqqpiXCNuluYKIlyyfe7M7KXqqHWw-iGnGA2QO8cuEsRw_LkH2WimouKerjhQvkZiAwg76IbaIQmlEn4SUz0UfwAqkB5WP813sbfxAq127Q6pQYxdt' },
    { id: 'STD-100262', name: 'Sophia Loren', batch: 'Python Dev 2024-A', timeIn: '09:05 AM', status: 'Late', performance: 92, initials: 'SL' },
    { id: 'STD-100265', name: 'Ethan Hunt', batch: 'Python Dev 2024-A', timeIn: '08:45 AM', status: 'Present', performance: 99, initials: 'EH' },
    { id: 'STD-100268', name: 'Emma Watson', batch: 'Python Dev 2024-A', timeIn: '—', status: 'Absent', performance: 78, initials: 'EW' },
    { id: 'STD-100270', name: 'Liam Neeson', batch: 'Data Science Evening', timeIn: '06:12 PM', status: 'Present', performance: 94, initials: 'LN' },
    { id: 'STD-100273', name: 'Bruce Wayne', batch: 'Data Science Evening', timeIn: '—', status: 'Absent', performance: 80, initials: 'BW' }
  ]);

  const [facultyRecords, setFacultyRecords] = useState([
    { id: 'FAC-100201', name: 'Prof. Sarah Jenkins', batch: 'Computer Science', timeIn: '08:30 AM', status: 'Present', performance: 99, initials: 'SJ', color: 'bg-green-500' },
    { id: 'FAC-100202', name: 'Dr. Robert Chen', batch: 'IT Department', timeIn: '—', status: 'On Leave', performance: 92, initials: 'RC', color: 'bg-red-500' },
    { id: 'FAC-100203', name: 'Ms. Emily Watson', batch: 'Design & Arts', timeIn: '08:50 AM', status: 'Late', performance: 88, initials: 'EW', color: 'bg-amber-500' },
    { id: 'FAC-100204', name: 'Mr. David Miller', batch: 'Software Engineering', timeIn: '08:42 AM', status: 'Present', performance: 96, initials: 'DM', color: 'bg-green-500' }
  ]);

  const [staffRecords, setStaffRecords] = useState([
    { id: 'STF-100301', name: 'Alice Miller', batch: 'Admissions Office', timeIn: '08:55 AM', status: 'Present', performance: 90, initials: 'AM' },
    { id: 'STF-100302', name: 'James Wilson', batch: 'Finance Desk', timeIn: '09:02 AM', status: 'Late', performance: 85, initials: 'JW' },
    { id: 'STF-100303', name: 'Elena Rostova', batch: 'Administration', timeIn: '—', status: 'Absent', performance: 78, initials: 'ER' }
  ]);

  // 2. Active View Filters & Configuration State
  const [tempFilters, setTempFilters] = useState({
    category: 'Students',
    batch: 'All Batches',
    date: '2023-10-27',
    status: 'All'
  });

  const [appliedFilters, setAppliedFilters] = useState({
    category: 'Students',
    batch: 'All Batches',
    date: '2023-10-27',
    status: 'All'
  });

  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [newEntry, setNewEntry] = useState({
    name: '',
    id: '',
    category: 'Students',
    batch: 'Web Design B12',
    timeIn: '09:00 AM',
    status: 'Present',
    performance: 90
  });

  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success'
  });

  // Pagination Helper
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 3. UI Action Triggers
  const showNotification = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    setCurrentPage(1);
    showNotification(`Filters applied: Showing ${tempFilters.category} log.`);
  };

  const handleStatusFilterToggle = (status) => {
    setTempFilters(prev => ({ ...prev, status }));
  };

  const handleExportReport = () => {
    const fileName = `${appliedFilters.category}_Attendance_Report_${appliedFilters.date}.csv`;
    showNotification(`Preparing download for: ${fileName}... Success!`, 'success');
  };

  // 4. Modal Interactions
  const handleOpenManualEntry = () => {
    setNewEntry({
      name: '',
      id: `STD-${Math.floor(100000 + Math.random() * 900000)}`,
      category: appliedFilters.category,
      batch: appliedFilters.category === 'Students' ? 'Web Design B12' : 'IT Department',
      timeIn: '08:50 AM',
      status: 'Present',
      performance: 95
    });
    setIsManualModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseManualEntry = () => {
    setIsManualModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleCreateManualEntrySubmit = (e) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.id) {
      alert('Please provide all details.');
      return;
    }

    if (newEntry.category === 'Students') {
      const added = {
        id: newEntry.id,
        name: newEntry.name,
        batch: newEntry.batch,
        timeIn: newEntry.status === 'Absent' ? '—' : newEntry.timeIn,
        status: newEntry.status,
        performance: parseInt(newEntry.performance) || 90,
        initials: newEntry.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      setStudentRecords(prev => [added, ...prev]);
    } else if (newEntry.category === 'Teachers') {
      const added = {
        id: newEntry.id,
        name: newEntry.name,
        batch: newEntry.batch,
        timeIn: newEntry.status === 'Absent' ? '—' : newEntry.timeIn,
        status: newEntry.status,
        performance: parseInt(newEntry.performance) || 90,
        initials: newEntry.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        color: newEntry.status === 'Present' ? 'bg-green-500' : newEntry.status === 'Late' ? 'bg-amber-500' : 'bg-red-500'
      };
      setFacultyRecords(prev => [added, ...prev]);
    } else {
      const added = {
        id: newEntry.id,
        name: newEntry.name,
        batch: newEntry.batch,
        timeIn: newEntry.status === 'Absent' ? '—' : newEntry.timeIn,
        status: newEntry.status,
        performance: parseInt(newEntry.performance) || 90,
        initials: newEntry.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      setStaffRecords(prev => [added, ...prev]);
    }

    handleCloseManualEntry();
    showNotification(`New attendance registry saved for ${newEntry.name}.`);
  };

  const handleOpenEditEntry = (record) => {
    setEditingRecord({ ...record });
    setIsEditModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseEditEntry = () => {
    setIsEditModalOpen(false);
    setEditingRecord(null);
    document.body.style.overflow = 'auto';
  };

  const handleUpdateEntrySubmit = (e) => {
    e.preventDefault();
    const updater = (prevRecords) =>
      prevRecords.map(r => r.id === editingRecord.id ? {
        ...editingRecord,
        timeIn: editingRecord.status === 'Absent' ? '—' : editingRecord.timeIn
      } : r);

    if (appliedFilters.category === 'Students') {
      setStudentRecords(updater);
    } else if (appliedFilters.category === 'Teachers') {
      setFacultyRecords(prev => prev.map(r => r.id === editingRecord.id ? {
        ...editingRecord,
        timeIn: editingRecord.status === 'Absent' ? '—' : editingRecord.timeIn,
        color: editingRecord.status === 'Present' ? 'bg-green-500' : editingRecord.status === 'Late' ? 'bg-amber-500' : 'bg-red-500'
      } : r));
    } else {
      setStaffRecords(updater);
    }

    handleCloseEditEntry();
    showNotification(`Registry updated for ${editingRecord.name}.`);
  };

  // 5. Data Resolvers (Filtering logic)
  const getFilteredData = () => {
    let rawList = [];
    if (appliedFilters.category === 'Students') rawList = studentRecords;
    else if (appliedFilters.category === 'Teachers') rawList = facultyRecords;
    else rawList = staffRecords;

    return rawList.filter(item => {
      // 1. Batch filter
      if (appliedFilters.category === 'Students' && appliedFilters.batch !== 'All Batches') {
        if (item.batch !== appliedFilters.batch) return false;
      }
      // 2. Status filter
      if (appliedFilters.status !== 'All') {
        if (item.status.toLowerCase() !== appliedFilters.status.toLowerCase()) return false;
      }
      return true;
    });
  };

  const filteredRecords = getFilteredData();
  const totalEntries = filteredRecords.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;

  // Paginated chunk
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  // Stats calculation
  const totalStudentsCount = studentRecords.length;
  const presentStudentsCount = studentRecords.filter(s => s.status === 'Present' || s.status === 'Late').length;
  const studentPercentage = ((presentStudentsCount / totalStudentsCount) * 100).toFixed(1);

  const totalTeachersCount = facultyRecords.length;
  const presentTeachersCount = facultyRecords.filter(t => t.status === 'Present' || t.status === 'Late').length;
  const leaveTeachersCount = facultyRecords.filter(t => t.status === 'On Leave').length;

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Attendance Management</h2>
          <p className="text-on-surface-variant font-body-md mt-1">Track and manage daily logs for students and faculty members.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-secondary-container text-primary px-4 py-2.5 rounded-lg font-label-md hover:scale-102 transition-all active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">download</span> 
            <span>Export Report</span>
          </button>
          <button 
            onClick={handleOpenManualEntry}
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md hover:scale-102 transition-all active:scale-95 duration-150 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add</span> 
            <span>Manual Entry</span>
          </button>
        </div>
      </div>

      {/* Bento Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
        
        {/* Stat Card 1 */}
        <div className="glass-card p-stack-md rounded-xl shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-primary-container/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[22px]">groups</span>
            </span>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+2.4% vs last week</span>
          </div>
          <div className="mt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Overall Student Rate</p>
            <h3 className="text-headline-lg font-headline-lg font-bold text-primary">{studentPercentage}%</h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="glass-card p-stack-md rounded-xl shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-tertiary-container/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[22px]">person</span>
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Live Data</span>
          </div>
          <div className="mt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Students Present</p>
            <h3 className="text-headline-lg font-headline-lg font-bold text-on-surface">
              {presentStudentsCount} <span className="text-body-sm font-light text-on-surface-variant">/ {totalStudentsCount}</span>
            </h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="glass-card p-stack-md rounded-xl shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-secondary-container/50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[22px]">school</span>
            </span>
            <span className="text-[10px] font-bold text-error bg-error-container/30 px-2 py-0.5 rounded-full">
              {leaveTeachersCount} On Leave
            </span>
          </div>
          <div className="mt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Faculty Registry</p>
            <h3 className="text-headline-lg font-headline-lg font-bold text-on-surface">
              {presentTeachersCount} <span className="text-body-sm font-light text-on-surface-variant">/ {totalTeachersCount}</span>
            </h3>
          </div>
        </div>

        {/* Attendance Visualizer (Mini Chart) */}
        <div className="glass-card p-stack-md rounded-xl shadow-sm h-36 flex flex-col justify-between">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-none">Weekly Trend</p>
          <div className="flex items-end gap-2 h-14 mt-2">
            <div className="w-full bg-primary/20 rounded-t-sm h-[80%] hover:bg-primary transition-colors cursor-pointer" title="Monday: 80%"></div>
            <div className="w-full bg-primary/40 rounded-t-sm h-[95%] hover:bg-primary transition-colors cursor-pointer" title="Tuesday: 95%"></div>
            <div className="w-full bg-primary/60 rounded-t-sm h-[70%] hover:bg-primary transition-colors cursor-pointer" title="Wednesday: 70%"></div>
            <div className="w-full bg-primary/80 rounded-t-sm h-[85%] hover:bg-primary transition-colors cursor-pointer" title="Thursday: 85%"></div>
            <div className="w-full bg-primary rounded-t-sm h-[92%] hover:bg-primary transition-colors cursor-pointer" title="Friday: 92%"></div>
            <div className="w-full bg-primary/30 rounded-t-sm h-[40%] hover:bg-primary transition-colors cursor-pointer" title="Saturday: 40%"></div>
            <div className="w-full bg-primary/50 rounded-t-sm h-[60%] hover:bg-primary transition-colors cursor-pointer" title="Sunday: 60%"></div>
          </div>
          <div className="flex justify-between text-[8px] text-on-surface-variant font-bold">
            <span>Mon</span><span>Sun</span>
          </div>
        </div>
      </div>

      {/* Filters & Main Table Section */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Left Sidebar Filters */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="glass-card p-stack-md rounded-xl shadow-sm space-y-4">
            <h4 className="font-headline-sm text-headline-sm font-bold border-b border-outline-variant/30 pb-2">View Filters</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-label-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Category</label>
                <select 
                  value={tempFilters.category}
                  onChange={(e) => setTempFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-surface-container border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary py-2 px-3 cursor-pointer"
                >
                  <option value="Students">Students</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              {tempFilters.category === 'Students' && (
                <div>
                  <label className="block text-label-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Batch / Course</label>
                  <select 
                    value={tempFilters.batch}
                    onChange={(e) => setTempFilters(prev => ({ ...prev, batch: e.target.value }))}
                    className="w-full bg-surface-container border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary py-2 px-3 cursor-pointer"
                  >
                    <option value="All Batches">All Batches</option>
                    <option value="Python Dev 2024-A">Python Dev 2024-A</option>
                    <option value="Web Design B12">Web Design B12</option>
                    <option value="Data Science Evening">Data Science Evening</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-label-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Select Date</label>
                <input 
                  type="date"
                  value={tempFilters.date}
                  onChange={(e) => setTempFilters(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-surface-container border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary py-2 px-3"
                />
              </div>

              <div>
                <label className="block text-label-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Status</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Present', 'Absent', 'Late'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusFilterToggle(st)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        tempFilters.status === st
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleApplyFilters}
              className="w-full mt-4 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-lg hover:bg-primary/95 transition-all shadow-sm active:scale-95 duration-100"
            >
              Apply Filters
            </button>
          </div>

          {/* Faculty Quick Status Widget */}
          <div className="glass-card p-stack-md rounded-xl shadow-sm bg-gradient-to-br from-primary/5 to-transparent space-y-4">
            <h4 className="font-label-md text-label-md font-bold border-b border-outline-variant/30 pb-2 uppercase tracking-wider">
              Daily Faculty Status
            </h4>
            <div className="space-y-3">
              {facultyRecords.slice(0, 3).map((fac) => (
                <div key={fac.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      fac.status === 'Present' ? 'bg-green-500' : fac.status === 'Late' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></span>
                    <span className="text-body-sm font-light text-on-surface leading-tight">{fac.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${
                    fac.status === 'Present' ? 'text-green-600' : fac.status === 'Late' ? 'text-amber-600' : 'text-red-500'
                  }`}>
                    {fac.status === 'Late' ? 'Late (15m)' : fac.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Log View */}
        <div className="col-span-12 lg:col-span-9">
          <div className="glass-card rounded-xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[500px]">
            
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Attendance Log: <span className="text-primary font-bold">{appliedFilters.date}</span>
                </h4>
                <span className="text-[10px] px-2.5 py-1 bg-primary/10 text-primary rounded-md font-bold uppercase tracking-wider shrink-0">
                  Category: {appliedFilters.category}
                </span>
                {appliedFilters.category === 'Students' && (
                  <span className="text-[10px] px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-md font-bold uppercase tracking-wider shrink-0">
                    Batch: {appliedFilters.batch}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => {
                    const prevDate = new Date(appliedFilters.date);
                    prevDate.setDate(prevDate.getDate() - 1);
                    const formatted = prevDate.toISOString().split('T')[0];
                    setAppliedFilters(prev => ({ ...prev, date: formatted }));
                    setTempFilters(prev => ({ ...prev, date: formatted }));
                  }}
                  className="p-1.5 hover:bg-surface-container rounded-lg transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button 
                  onClick={() => {
                    const nextDate = new Date(appliedFilters.date);
                    nextDate.setDate(nextDate.getDate() + 1);
                    const formatted = nextDate.toISOString().split('T')[0];
                    setAppliedFilters(prev => ({ ...prev, date: formatted }));
                    setTempFilters(prev => ({ ...prev, date: formatted }));
                  }}
                  className="p-1.5 hover:bg-surface-container rounded-lg transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-lowest border-b border-outline-variant/30">
                  <tr>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">ID & Candidate</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Batch / Dept</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Time In</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Performance</th>
                    <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
                  {paginatedRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-surface-container/30 transition-all duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {rec.avatar ? (
                            <img 
                              alt="Profile Avatar" 
                              className="w-8 h-8 rounded-full object-cover border border-outline-variant/40" 
                              src={rec.avatar}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-xs border border-outline-variant/40">
                              {rec.initials}
                            </div>
                          )}
                          <div>
                            <p className="font-label-md text-label-md font-bold text-on-surface leading-none">{rec.name}</p>
                            <p className="text-[10px] text-on-surface-variant mt-1">{rec.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-on-surface">{rec.batch}</td>
                      <td className="px-6 py-4 font-medium">{rec.timeIn}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          rec.status === 'Present' 
                            ? 'bg-green-100 text-green-700' 
                            : rec.status === 'Late' 
                            ? 'bg-amber-100 text-amber-700'
                            : rec.status === 'On Leave'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden" title={`${rec.performance}% Score`}>
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500" 
                            style={{ width: `${rec.performance}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleOpenEditEntry(rec)}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center ml-auto"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit_square</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRecords.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-on-surface-variant font-light text-sm">
                        No active records found matching the chosen filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="p-stack-md flex justify-between items-center bg-surface-container-lowest border-t border-outline-variant/30 flex-wrap gap-2 shrink-0">
              <p className="text-body-sm text-on-surface-variant">
                Showing {totalEntries > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, totalEntries)} of {totalEntries} entries
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-surface-container text-on-surface text-xs font-bold rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Slide-Up Notification Toast */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

      {/* Modal: Manual Entry Form */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={handleCloseManualEntry}></div>
          <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Record Attendance Entry</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseManualEntry}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateManualEntrySubmit} className="p-stack-md space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Candidate Category</label>
                <select 
                  value={newEntry.category}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value, id: e.target.value === 'Students' ? `STD-${Math.floor(100000 + Math.random() * 900000)}` : `FAC-${Math.floor(200000 + Math.random() * 900000)}` }))}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                >
                  <option value="Students">Students</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Registry ID</label>
                  <input 
                    value={newEntry.id}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    placeholder="STD-XXXXXX"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Full Name</label>
                  <input 
                    value={newEntry.name}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    placeholder="Enter full name"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Batch / Dept</label>
                  {newEntry.category === 'Students' ? (
                    <select 
                      value={newEntry.batch}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, batch: e.target.value }))}
                      className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                    >
                      <option value="Web Design B12">Web Design B12</option>
                      <option value="Python Dev 2024-A">Python Dev 2024-A</option>
                      <option value="Data Science Evening">Data Science Evening</option>
                    </select>
                  ) : (
                    <input 
                      value={newEntry.batch}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, batch: e.target.value }))}
                      className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                      placeholder="e.g. Design Desk"
                      type="text"
                      required
                    />
                  )}
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Attendance Status</label>
                  <select 
                    value={newEntry.status}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    {newEntry.category === 'Teachers' && <option value="On Leave">On Leave</option>}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Clock In Time</label>
                  <input 
                    value={newEntry.timeIn}
                    disabled={newEntry.status === 'Absent' || newEntry.status === 'On Leave'}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, timeIn: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest disabled:opacity-50 disabled:cursor-not-allowed" 
                    type="text"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Academic Score %</label>
                  <input 
                    value={newEntry.performance}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, performance: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={handleCloseManualEntry}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Record Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Entry */}
      {isEditModalOpen && editingRecord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={handleCloseEditEntry}></div>
          <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Modify Attendance Registry</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseEditEntry}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUpdateEntrySubmit} className="p-stack-md space-y-4">
              <div>
                <p className="text-sm font-bold text-on-surface mb-1">Candidate Profile</p>
                <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-on-surface">{editingRecord.name}</h5>
                    <p className="text-xs text-on-surface-variant font-light mt-0.5">{editingRecord.id} • {editingRecord.batch}</p>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-primary-fixed border border-primary-fixed-dim px-2.5 py-0.5 rounded-full uppercase">
                    {appliedFilters.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Attendance Status</label>
                  <select 
                    value={editingRecord.status}
                    onChange={(e) => setEditingRecord(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer text-body-sm font-semibold"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    {appliedFilters.category === 'Teachers' && <option value="On Leave">On Leave</option>}
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Clock In Time</label>
                  <input 
                    value={editingRecord.timeIn}
                    disabled={editingRecord.status === 'Absent' || editingRecord.status === 'On Leave'}
                    onChange={(e) => setEditingRecord(prev => ({ ...prev, timeIn: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-body-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                    type="text"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Performance Index</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={editingRecord.performance}
                    onChange={(e) => setEditingRecord(prev => ({ ...prev, performance: parseInt(e.target.value) }))}
                    className="w-full accent-primary h-2 bg-surface-container rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-bold text-sm bg-surface-container-high px-2.5 py-1 rounded text-on-surface min-w-[48px] text-center">
                    {editingRecord.performance}%
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={handleCloseEditEntry}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Update Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Attendance;

