import React, { useState } from 'react';
import StudentsTable from '../../components/teacher/students/StudentsTable';

const Students = () => {
  // Modals & Drawers States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // For detail side drawer

  // Search & Filter fields
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [gradeFilter, setGradeFilter] = useState('ALL');

  // Form fields for New Student
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRoll, setNewRoll] = useState('');
  const [newGrade, setNewGrade] = useState('A');
  const [newAttendance, setNewAttendance] = useState('92');
  const [newStatus, setNewStatus] = useState('Active');

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Static directory array
  const [students, setStudents] = useState([
    { 
      id: 'std1', 
      name: 'Rahul Varma', 
      email: 'rahul.v@laxmi.edu', 
      roll: 'LX-2024-041', 
      grade: 'B+', 
      attendance: 88, 
      status: 'Active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtFVd9kZGinBpE5Hzi1pK2csuanECmtykLa5OKSYsNa6XchvYqL05PfL1VA1PkQ2GS_i3usUdXSGaVO187jOjDeErop34RIBX-WxsgwIHqH9semg-53XZVyO9H85cuTOcFQSnU5A_pypkYkehEZOYzarPrjdIUJJfwIlXddpqyTO6pr47ixTfQstDcJrMcED4X_NkkGwZ4iMGGXEtS3pgj80ZcO8UzXBpuI4fuW_AW8YNy_i3dZlMzqnBF1F_CZ7XZR9uT28mUxsDY'
    },
    { 
      id: 'std2', 
      name: 'Priya Singh', 
      email: 'priya.s@laxmi.edu', 
      roll: 'LX-2024-012', 
      grade: 'A', 
      attendance: 92, 
      status: 'Active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgPZAgHl2FMUONGdvtLQdkIwb3nz-tnMGOIPhGGcKctdKvNZ1DUjHxzWkelLejGXf_7hMcXyKdzU92ldZ6lYf4VKrLgDeXVAm26zdvh18la6Sc7PHJTjpzt0F1t1qfPIlM0Az7M3AATJU2S8Z231to81ob5i1UZ-RLUXBrxnbhAucszme3l5qR-KnEiJ5dDm8wtJh-QWQ_8VwQ20frsfH5HHZaQJpEcJzGB1aaDwwmfReNAwhGId1LQR5DmiVhw1BiwTIeGLhINzGh'
    },
    { 
      id: 'std3', 
      name: 'Karan Mehra', 
      email: 'karan.m@laxmi.edu', 
      roll: 'LX-2024-089', 
      grade: 'C-', 
      attendance: 64, 
      status: 'Critical',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYIwwdF4cPkMI54rENu6SwcpNmyd1Z7pr9g14vSHzXMwVx_yJDFYacugf_ZXGLpnKHOj806nJOiKoE0GeEkqxKSE3BIKiajM1FYneFz_UB5zzQcOiB9RFA2Yss6fmfhcmtof3fxxPXq0gKgA-fbYjHyKGnlrHqU96BWahrSHTgFeM_2b1BiFrCzG3y1pcntAEo_TCYcX3g9EIp-Gt3lr2JbAcXuPNtSxlebv4Mri4o7I3qU3UgIJL-_FvZojnhwhveBESX-GnJHMZd'
    },
    { 
      id: 'std4', 
      name: 'Ananya Das', 
      email: 'ananya.d@laxmi.edu', 
      roll: 'LX-2024-055', 
      grade: 'A-', 
      attendance: 95, 
      status: 'Active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWJwHxFVAo9HiMKFD2V9jZdaesUmJ5lR4vudCjqY3DhTOhRvKmZ1Z-NGXw4mtIT0ho4NHoz7bd_VjEuDUxl0pN0xhwEBYNopDxMdopmxVbmExFJF3p9WzJtCElQ6yCXsJsNdAeSYpm7bd55gnr6ZPVu-kZ0yyF5Y_6EtZC2cQTrvn43v7rDomEqwDBjIo91a0DYPMSvQ_VXYGSSGMwwInfgL-FJVesC7UcyQEHoZDkqTTVE50FG1C_XaCZ8HGjC0Pal8HV_QmfVCnP'
    }
  ]);

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newRoll.trim()) return;

    const std = {
      id: 'std' + (students.length + 1),
      name: newName,
      email: newEmail,
      roll: newRoll,
      grade: newGrade,
      attendance: parseInt(newAttendance),
      status: newStatus,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtFVd9kZGinBpE5Hzi1pK2csuanECmtykLa5OKSYsNa6XchvYqL05PfL1VA1PkQ2GS_i3usUdXSGaVO187jOjDeErop34RIBX-WxsgwIHqH9semg-53XZVyO9H85cuTOcFQSnU5A_pypkYkehEZOYzarPrjdIUJJfwIlXddpqyTO6pr47ixTfQstDcJrMcED4X_NkkGwZ4iMGGXEtS3pgj80ZcO8UzXBpuI4fuW_AW8YNy_i3dZlMzqnBF1F_CZ7XZR9uT28mUxsDY'
    };

    setStudents([...students, std]);
    setNewName('');
    setNewEmail('');
    setNewRoll('');
    setIsUploadOpen(false);
    triggerToast("🎒 Student registered and profile synchronized successfully!");
  };

  const handleExport = (type) => {
    triggerToast(`⏳ Compiling directory logs... Packaging ${type} file format...`);
    setIsExportOpen(false);
  };

  // Filter & Search Logic
  const filteredStudents = students.filter(std => {
    const matchesSearch = std.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          std.roll.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || std.status === statusFilter;
    const matchesGrade = gradeFilter === 'ALL' || std.grade.startsWith(gradeFilter);
    return matchesSearch && matchesStatus && matchesGrade;
  });

  return (
    <div className="space-y-stack-lg text-left relative selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Bento Dashboard Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Top Performer Spotlight (Hero, Span 8) */}
        <div className="lg:col-span-8 bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-xl p-stack-lg border border-outline-variant shadow-sm flex flex-col md:flex-row gap-6 items-center">
          <div className="relative select-none shrink-0">
            <div className="w-32 h-32 rounded-full border-4 border-primary-container p-1">
              <img 
                alt="Student Profile" 
                className="w-full h-full rounded-full object-cover border border-outline-variant"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBAhQaXA5xuTbinQwXbEiAbeFAarEl8Zg1-FCYNnMpWZ7tprMXobsvF6MBPtNxvOCL70LO46EaTS3s36x_QqhdZg3Y8JeQZAq1NGtvjILHyWKuArdSA8pfYZ-Icc_1Vs4LhIAwaU3MJYGoNE3lYYliPy-JOFtYXQYWjHO-g6hf8v_g7C1V521_Z0RrgVbmB1QbtK3Ms_GUPjWXVCSgyuoflDE91Qs9Y-iadf16ZUkhdfzCpBo-xnRfEES7s-vcjKZbGYgx8AaVMAU9"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">military_tech</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left text-xs font-semibold">
            <span className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full text-label-sm font-bold border border-primary/20 select-none">
              TOP PERFORMER
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface mt-2 font-bold text-lg">Aryan Malhotra</h2>
            <p className="text-on-surface-variant font-body-md text-xs font-light mt-1.5 leading-relaxed">
              Consistently leads the Advanced Python module with 98% project completion rate.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 select-none">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-primary text-sm font-bold">grade</span>
                <span>Grade: A+</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-primary text-sm font-bold">query_stats</span>
                <span>94% Attendance</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setSelectedStudent({ name: 'Aryan Malhotra', email: 'aryan.m@laxmi.edu', roll: 'LX-2024-001', grade: 'A+', attendance: 94, status: 'Active', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBAhQaXA5xuTbinQwXbEiAbeFAarEl8Zg1-FCYNnMpWZ7tprMXobsvF6MBPtNxvOCL70LO46EaTS3s36x_QqhdZg3Y8JeQZAq1NGtvjILHyWKuArdSA8pfYZ-Icc_1Vs4LhIAwaU3MJYGoNE3lYYliPy-JOFtYXQYWjHO-g6hf8v_g7C1V521_Z0RrgVbmB1QbtK3Ms_GUPjWXVCSgyuoflDE91Qs9Y-iadf16ZUkhdfzCpBo-xnRfEES7s-vcjKZbGYgx8AaVMAU9' })}
            className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform flex items-center gap-2 text-xs border-none cursor-pointer outline-none active:scale-95 shrink-0 self-center"
          >
            <span>View Profile</span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </button>
        </div>

        {/* Trend Performance Metrics (Span 4) */}
        <div className="lg:col-span-4 bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-xl p-6 border border-outline-variant shadow-sm text-left">
          <div className="flex justify-between items-center mb-6 select-none">
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">Performance Overview</h3>
            <span className="material-symbols-outlined text-on-surface-variant font-bold">more_vert</span>
          </div>
          
          <div className="space-y-4 text-xs font-semibold text-on-surface-variant select-none">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between mb-1">
                <span>Exams</span>
                <span className="font-bold text-on-surface">82%</span>
              </div>
              <div className="h-4 bg-surface-container rounded-lg flex overflow-hidden border border-outline-variant/15">
                <div className="bg-primary-container w-[82%] transition-all duration-1000"></div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between mb-1">
                <span>Projects</span>
                <span className="font-bold text-on-surface">91%</span>
              </div>
              <div className="h-4 bg-surface-container rounded-lg flex overflow-hidden border border-outline-variant/15">
                <div className="bg-tertiary-container w-[91%] transition-all duration-1000"></div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between mb-1">
                <span>Assignments</span>
                <span className="font-bold text-on-surface">75%</span>
              </div>
              <div className="h-4 bg-surface-container rounded-lg flex overflow-hidden border border-outline-variant/15">
                <div className="bg-outline-variant w-[75%] transition-all duration-1000"></div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-on-surface-variant mt-6 text-center italic font-medium leading-none select-none">
            ↑ 12% increase from last term
          </p>
        </div>

      </div>

      {/* Student Directory Table Container */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-xl border border-outline-variant shadow-sm overflow-hidden text-left">
        
        {/* Dynamic Controls Header */}
        <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">Student Directory</h3>
            <p className="text-xs text-on-surface-variant font-light mt-0.5">Manage and monitor student engagement rosters</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto text-xs font-semibold select-none">
            
            {/* Direct Inline Search bar */}
            <input 
              type="text" 
              placeholder="Search directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 md:flex-none px-3 py-2 bg-surface border border-outline-variant rounded-lg outline-none focus:ring-1 focus:ring-primary text-xs w-48 font-normal"
            />

            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors border-none cursor-pointer font-bold outline-none text-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              Filter
            </button>
            
            <button 
              onClick={() => setIsExportOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors border-none cursor-pointer font-bold outline-none text-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export
            </button>
            
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity border-none cursor-pointer outline-none text-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Student
            </button>
          </div>
        </div>

        {/* Filter Drawer details */}
        {isFilterOpen && (
          <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/30 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs select-none">
            <div className="space-y-1">
              <label className="block text-[10px] text-on-surface-variant uppercase font-bold">Filter By Status</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none cursor-pointer"
              >
                <option value="ALL">All Status</option>
                <option value="Active">Active Only</option>
                <option value="Critical">Critical Only</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] text-on-surface-variant uppercase font-bold">Filter By Grade</label>
              <select 
                value={gradeFilter} 
                onChange={(e) => setGradeFilter(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none cursor-pointer"
              >
                <option value="ALL">All Grades</option>
                <option value="A">Grade A Only</option>
                <option value="B">Grade B Only</option>
                <option value="C">Grade C Only</option>
              </select>
            </div>
            <div className="flex items-end select-none">
              <button 
                onClick={() => {
                  setStatusFilter('ALL');
                  setGradeFilter('ALL');
                  setSearchQuery('');
                  setIsFilterOpen(false);
                }}
                className="w-full bg-surface border border-outline-variant hover:bg-surface-container-high py-2.5 rounded-lg font-bold cursor-pointer transition-colors border-none"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Table Directory Render */}
        <StudentsTable 
          students={filteredStudents} 
          onSelectStudent={(std) => setSelectedStudent(std)} 
        />

        {/* Directory Footer Pagination */}
        <div className="p-4 bg-surface-container-low flex justify-between items-center text-xs font-semibold select-none">
          <p className="text-label-sm text-on-surface-variant font-light leading-none">Showing 1-{filteredStudents.length} of 124 students</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-outline-variant bg-surface-container-lowest disabled:opacity-50 cursor-pointer">
              <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
            </button>
            <button className="p-2 rounded-lg border border-outline-variant bg-surface-container-lowest cursor-pointer hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
            </button>
          </div>
        </div>

      </div>

      {/* MODAL 1: Register Student */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/20">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4 select-none">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Register New Student</h3>
              </div>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-[10px] text-on-surface-variant uppercase font-bold">Student Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Aryan Malhotra" 
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] text-on-surface-variant uppercase font-bold">Email Address</label>
                  <input 
                    type="email" 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="e.g. aryan@laxmi.edu" 
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] text-on-surface-variant uppercase font-bold">Roll Number</label>
                  <input 
                    type="text" 
                    value={newRoll} 
                    onChange={(e) => setNewRoll(e.target.value)}
                    placeholder="e.g. LX-2024-001" 
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 select-none">
                <div className="space-y-1">
                  <label className="block text-[10px] text-on-surface-variant uppercase font-bold">Grade</label>
                  <select 
                    value={newGrade} 
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 cursor-pointer outline-none text-xs"
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C-">C-</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] text-on-surface-variant uppercase font-bold">Attendance %</label>
                  <input 
                    type="number" 
                    value={newAttendance} 
                    onChange={(e) => setNewAttendance(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] text-on-surface-variant uppercase font-bold">Status</label>
                  <select 
                    value={newStatus} 
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 cursor-pointer outline-none text-xs"
                  >
                    <option value="Active">Active</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2 select-none">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md border-none cursor-pointer hover:bg-primary-container transition-all hover:scale-[1.02] font-bold"
                >
                  Register Profile
                </button>
                <button 
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-md border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Export Directory */}
      {isExportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/20 select-none">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">download</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Export Directory Log</h3>
              </div>
              <button 
                onClick={() => setIsExportOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <p className="font-light text-on-surface-variant leading-relaxed">
                Generate dynamic backup marksheets, attendance files, or profiles from recent directories.
              </p>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => handleExport('CSV')}
                  className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md border-none cursor-pointer hover:bg-primary-container transition-all hover:scale-[1.02] font-bold"
                >
                  Export CSV
                </button>
                <button 
                  onClick={() => handleExport('PDF')}
                  className="flex-1 bg-secondary text-on-secondary py-3 rounded-lg font-label-md border border-outline-variant cursor-pointer hover:bg-secondary-container/85 transition-colors font-bold"
                >
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Slide Details Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest dark:bg-inverse-surface/95 w-full max-w-md h-full shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300 text-left overflow-y-auto">
            
            {/* Header select */}
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">Student Profile Details</h3>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="text-on-surface-variant bg-transparent hover:bg-surface-container transition-colors border-none cursor-pointer outline-none p-1.5 rounded-full"
              >
                <span className="material-symbols-outlined text-lg font-bold">close</span>
              </button>
            </div>

            {/* Profile Avatar Spot */}
            <div className="flex flex-col items-center text-center select-none shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-primary-container p-0.5 mb-2">
                <img 
                  alt={selectedStudent.name} 
                  className="w-full h-full rounded-full object-cover border border-outline-variant"
                  src={selectedStudent.avatar} 
                />
              </div>
              <h4 className="font-bold text-sm text-on-surface">{selectedStudent.name}</h4>
              <p className="text-[10px] text-on-surface-variant font-light mt-0.5">{selectedStudent.email}</p>
            </div>

            {/* Core logs */}
            <div className="space-y-4 text-xs leading-relaxed flex-1">
              
              <div className="p-4 bg-surface rounded-xl border border-outline-variant/35">
                <h5 className="font-bold text-on-surface mb-2 select-none uppercase text-[10px] tracking-wide">Academic Stats</h5>
                <div className="space-y-2 font-medium text-on-surface-variant">
                  <p className="flex justify-between"><span>Roll Number:</span> <strong className="text-on-surface font-bold">{selectedStudent.roll}</strong></p>
                  <p className="flex justify-between"><span>Current Grade:</span> <strong className="text-primary font-bold">{selectedStudent.grade}</strong></p>
                  <p className="flex justify-between"><span>Average Attendance:</span> <strong className="text-primary font-bold">{selectedStudent.attendance}%</strong></p>
                  <p className="flex justify-between"><span>Profile Status:</span> <strong className="text-primary font-bold">{selectedStudent.status}</strong></p>
                </div>
              </div>

              {selectedStudent.status === 'Critical' && (
                <div className="p-4 bg-error-container/10 border border-error/25 rounded-xl text-error">
                  <h5 className="font-bold mb-1 flex items-center gap-1.5 uppercase text-[10px] tracking-wide select-none">
                    <span className="material-symbols-outlined text-sm font-bold">warning</span>
                    System warning
                  </h5>
                  <p className="font-light text-[10px] leading-relaxed">
                    Student attendance has dropped below 75% limits. System will automatically restrict exam proctor cards next semester.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedStudent(null);
                      triggerToast("✅ Warning cleared successfully! Proctor pass activated.");
                    }}
                    className="mt-3 bg-error text-white font-bold px-3 py-1.5 rounded text-[9px] border-none cursor-pointer hover:bg-opacity-95 transition-all"
                  >
                    Clear Warning
                  </button>
                </div>
              )}

              <div className="p-4 bg-surface rounded-xl border border-outline-variant/35 select-none">
                <h5 className="font-bold text-on-surface mb-2 uppercase text-[10px] tracking-wide">Communication Quick actions</h5>
                <div className="grid grid-cols-2 gap-2 font-bold text-[10px]">
                  <button 
                    onClick={() => {
                      setSelectedStudent(null);
                      triggerToast("✉️ Academic warning notification dispatched successfully!");
                    }}
                    className="bg-primary text-on-primary py-2 rounded-lg border-none cursor-pointer hover:bg-primary-container transition-all"
                  >
                    Send Warning Email
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedStudent(null);
                      triggerToast("📞 Simulated call ticket created! Coordinator will contact parent.");
                    }}
                    className="bg-secondary-container text-on-secondary-container py-2 rounded-lg border-none cursor-pointer hover:bg-surface-container-high transition-all"
                  >
                    Call Student
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Students;
