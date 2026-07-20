import React, { useState, useEffect } from 'react';
import { getAttendance, saveAttendance } from '../../services/attendanceService';
import { getCourses } from '../../services/courseService';
import { getStudents } from '../../services/studentService';

const Attendance = () => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filters State
  const [filters, setFilters] = useState({
    course: 'All Courses',
    batch: 'All Batches',
    date: new Date().toISOString().split('T')[0],
    search: ''
  });

  // Local state for toast notification
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success'
  });

  const showNotification = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Load courses and unique batches on mount
  useEffect(() => {
    const loadInitialFilterData = async () => {
      try {
        const courseData = await getCourses();
        setCourses(courseData);

        // Fetch students to extract unique batches
        const studentRes = await getStudents({ limit: 1000 });
        const studentList = studentRes.students || [];
        const uniqueBatches = Array.from(new Set(studentList.map(s => s.batch).filter(Boolean)));
        setBatches(uniqueBatches);
      } catch (err) {
        console.error('Error loading filter options:', err);
      }
    };
    loadInitialFilterData();
  }, []);

  // Fetch attendance sheet based on current filters (course, batch, date)
  const fetchAttendanceSheet = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAttendance(filters.course, filters.batch, filters.date);
      setRoster(data);
    } catch (err) {
      console.error('Error fetching attendance sheet:', err);
      setError('Failed to load student roster for selected filters');
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when filters (excluding search) change
  useEffect(() => {
    fetchAttendanceSheet();
  }, [filters.course, filters.batch, filters.date]);

  // Handle marking status locally in state
  const handleMarkStatus = (studentId, newStatus) => {
    setRoster(prev => prev.map(student => 
      student.studentId === studentId 
        ? { ...student, status: newStatus } 
        : student
    ));
  };

  // Bulk save attendance records to backend
  const handleSaveAttendance = async () => {
    if (roster.length === 0) {
      alert('Roster is empty. No attendance records to save.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        course: filters.course,
        batch: filters.batch,
        date: filters.date,
        records: roster.map(student => ({
          studentId: student.studentId,
          status: student.status
        }))
      };

      await saveAttendance(payload);
      showNotification('Attendance sheet updated successfully!');
      fetchAttendanceSheet();
    } catch (err) {
      console.error('Error saving attendance registry:', err);
      alert(err.response?.data?.message || 'Error saving attendance sheet.');
    } finally {
      setLoading(false);
    }
  };

  // Mark all students in current roster to a status
  const handleMarkAll = (status) => {
    setRoster(prev => prev.map(student => ({ ...student, status })));
    showNotification(`All students marked as ${status}`);
  };

  // Filter roster by client-side search query
  const filteredRoster = roster.filter(student => {
    const query = filters.search.toLowerCase().trim();
    if (!query) return true;
    return (
      student.name.toLowerCase().includes(query) ||
      (student.rollNumber && student.rollNumber.toLowerCase().includes(query))
    );
  });

  // Compute live stats from current roster state
  const totalCount = filteredRoster.length;
  const presentCount = filteredRoster.filter(s => s.status === 'Present').length;
  const absentCount = filteredRoster.filter(s => s.status === 'Absent').length;
  const attendanceRate = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : '0.0';

  const handleExportReport = () => {
    if (filteredRoster.length === 0) {
      alert('No roster data to export.');
      return;
    }
    const headers = 'RollNumber,Name,Email,Phone,Course,Batch,Date,Status\n';
    const csvRows = filteredRoster.map(s => {
      const roll = `"${s.rollNumber || ''}"`;
      const name = `"${s.name.replace(/"/g, '""')}"`;
      const email = `"${(s.email || '').replace(/"/g, '""')}"`;
      const phone = `"${(s.phone || '').replace(/"/g, '""')}"`;
      const course = `"${filters.course}"`;
      const batch = `"${filters.batch}"`;
      const date = `"${filters.date}"`;
      const status = `"${s.status}"`;
      return [roll, name, email, phone, course, batch, date, status].join(',');
    }).join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + headers + csvRows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Attendance_Report_${filters.course}_${filters.batch}_${filters.date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Attendance Management</h2>
          <p className="text-on-surface-variant font-body-md mt-1">Track and manage daily student logs dynamically.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-secondary-container text-primary px-4 py-2.5 rounded-lg font-label-md hover:scale-102 transition-all active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">download</span> 
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Bento Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
        
        {/* Overall Student Rate */}
        <div className="glass-card p-stack-md rounded-xl shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-primary-container/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[22px]">groups</span>
            </span>
          </div>
          <div className="mt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Overall Presence Rate</p>
            <h3 className="text-headline-lg font-headline-lg font-bold text-primary">{attendanceRate}%</h3>
          </div>
        </div>

        {/* Present Students */}
        <div className="glass-card p-stack-md rounded-xl shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-green-100/50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-[22px]">check_circle</span>
            </span>
          </div>
          <div className="mt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Students Present</p>
            <h3 className="text-headline-lg font-headline-lg font-bold text-on-surface">
              {presentCount} <span className="text-body-sm font-light text-on-surface-variant">/ {totalCount}</span>
            </h3>
          </div>
        </div>

        {/* Absent Students */}
        <div className="glass-card p-stack-md rounded-xl shadow-sm flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-red-100/50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-error text-[22px]">cancel</span>
            </span>
          </div>
          <div className="mt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Students Absent</p>
            <h3 className="text-headline-lg font-headline-lg font-bold text-on-surface">
              {absentCount} <span className="text-body-sm font-light text-on-surface-variant">/ {totalCount}</span>
            </h3>
          </div>
        </div>

        {/* Current Roster Info */}
        <div className="glass-card p-stack-md rounded-xl shadow-sm h-36 flex flex-col justify-between bg-gradient-to-br from-primary/5 to-transparent">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-none">Roster Info</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-on-surface">Course: <strong>{filters.course}</strong></p>
            <p className="text-xs text-on-surface">Batch: <strong>{filters.batch}</strong></p>
            <p className="text-xs text-on-surface">Date: <strong>{filters.date}</strong></p>
          </div>
          <div className="flex justify-between text-[8px] text-on-surface-variant font-bold">
            <span>Dynamic MongoDB Logs</span>
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
                <label className="block text-label-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Course Selection</label>
                <select 
                  value={filters.course}
                  onChange={(e) => setFilters(prev => ({ ...prev, course: e.target.value }))}
                  className="w-full bg-surface-container border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary py-2 px-3 cursor-pointer"
                >
                  <option value="All Courses">All Courses</option>
                  {courses.map(course => (
                    <option key={course._id} value={course.title}>{course.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-label-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Batch Selection</label>
                <select 
                  value={filters.batch}
                  onChange={(e) => setFilters(prev => ({ ...prev, batch: e.target.value }))}
                  className="w-full bg-surface-container border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary py-2 px-3 cursor-pointer"
                >
                  <option value="All Batches">All Batches</option>
                  {batches.map((batch, index) => (
                    <option key={index} value={batch}>{batch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-label-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Select Date</label>
                <input 
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-surface-container border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary py-2 px-3"
                />
              </div>

              <div>
                <label className="block text-label-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Search Student</label>
                <input 
                  type="text"
                  placeholder="Name or Roll Number"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full bg-surface-container border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary py-2 px-3"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={() => handleMarkAll('Present')}
                className="w-full py-2 bg-green-50 text-green-700 font-bold text-xs rounded-lg hover:bg-green-100 transition-all border border-green-200"
              >
                Mark All Present
              </button>
              <button 
                onClick={() => handleMarkAll('Absent')}
                className="w-full py-2 bg-red-50 text-red-700 font-bold text-xs rounded-lg hover:bg-red-100 transition-all border border-red-200"
              >
                Mark All Absent
              </button>
            </div>
          </div>
        </div>

        {/* Main Log Table */}
        <div className="col-span-12 lg:col-span-9">
          <div className="glass-card rounded-xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[500px]">
            
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Attendance Log: <span className="text-primary font-bold">{filters.date}</span>
                </h4>
                <span className="text-[10px] px-2.5 py-1 bg-primary/10 text-primary rounded-md font-bold uppercase tracking-wider shrink-0">
                  Course: {filters.course}
                </span>
                <span className="text-[10px] px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-md font-bold uppercase tracking-wider shrink-0">
                  Batch: {filters.batch}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] space-y-4">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
                <p className="text-on-surface-variant font-label-md">Loading student roster...</p>
              </div>
            ) : (
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-lowest border-b border-outline-variant/30">
                    <tr>
                      <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Roll & Student</th>
                      <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Course</th>
                      <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Batch</th>
                      <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Status</th>
                      <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide text-right">Mark Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
                    {filteredRoster.map((rec) => (
                      <tr key={rec.studentId} className="hover:bg-surface-container/30 transition-all duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {rec.photo ? (
                              <img 
                                alt="Profile Avatar" 
                                className="w-8 h-8 rounded-full object-cover border border-outline-variant/40" 
                                src={rec.photo}
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-xs border border-outline-variant/40">
                                {(rec.name || 'Student').split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'ST'}
                              </div>
                            )}
                            <div>
                              <p className="font-label-md text-label-md font-bold text-on-surface leading-none">{rec.name || 'Student'}</p>
                              <p className="text-[10px] text-on-surface-variant mt-1">{rec.rollNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-on-surface">{filters.course === 'All Courses' ? rec.course || 'N/A' : filters.course}</td>
                        <td className="px-6 py-4 font-medium">{filters.batch === 'All Batches' ? rec.batch || 'N/A' : filters.batch}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            rec.status === 'Present' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {rec.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleMarkStatus(rec.studentId, 'Present')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                rec.status === 'Present'
                                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                                  : 'bg-white hover:bg-green-50 text-green-700 border-green-200'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMarkStatus(rec.studentId, 'Absent')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                rec.status === 'Absent'
                                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                                  : 'bg-white hover:bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              Absent
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredRoster.length === 0 && (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-on-surface-variant font-light text-sm">
                          No active students found matching the filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer Toolbar */}
            <div className="p-stack-md flex justify-between items-center bg-surface-container-lowest border-t border-outline-variant/30 flex-wrap gap-4 shrink-0">
              <p className="text-body-sm text-on-surface-variant">
                Showing <strong>{filteredRoster.length}</strong> registered students in roster
              </p>
              <button 
                onClick={handleSaveAttendance}
                disabled={loading || roster.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-lg hover:scale-102 hover:bg-primary/95 transition-all shadow-sm active:scale-95 duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[20px]">save</span>
                <span>Save Attendance Registry</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Slide-Up Toast Notification */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

    </div>
  );
};

export default Attendance;
