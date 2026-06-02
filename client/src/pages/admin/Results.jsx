import React, { useState } from 'react';

const Results = () => {
  // 1. Initial State Data for Courses & Student Gradings
  const [selectedCourse, setSelectedCourse] = useState('Python Fundamentals (PY-101)');
  
  const [studentGradings, setStudentGradings] = useState({
    'Python Fundamentals (PY-101)': [
      { id: 'STU-8821', name: 'Aditi Sharma', initials: 'AS', score: '92', status: 'Passed', feedback: 'Excellent logic...', bgColor: 'bg-primary-container/30 text-primary' },
      { id: 'STU-7712', name: 'Marc Koppel', initials: 'MK', score: '', status: 'Pending', feedback: 'Awaiting lab exam...', bgColor: 'bg-secondary-container text-on-secondary-container' },
      { id: 'STU-1143', name: 'Jia Ning', initials: 'JN', score: '78', status: 'Passed', feedback: 'Solid performance', bgColor: 'bg-tertiary-container/30 text-tertiary' }
    ],
    'Web Design (WD-202)': [
      { id: 'STU-9901', name: 'Emma Watson', initials: 'EW', score: '95', status: 'Passed', feedback: 'Outstanding CSS layout!', bgColor: 'bg-primary-container/30 text-primary' },
      { id: 'STU-9902', name: 'Robert Junior', initials: 'RJ', score: '88', status: 'Passed', feedback: 'Excellent mobile responsiveness.', bgColor: 'bg-secondary-container text-on-secondary-container' },
      { id: 'STU-9903', name: 'Chloe Wang', initials: 'CW', score: '42', status: 'Failed', feedback: 'Needs work on flexbox grids.', bgColor: 'bg-tertiary-container/30 text-tertiary' }
    ],
    'Database Systems (DB-301)': [
      { id: 'STU-1002', name: 'Alice Miller', initials: 'AM', score: '', status: 'Pending', feedback: 'Awaiting query review...', bgColor: 'bg-primary-container/30 text-primary' },
      { id: 'STU-1005', name: 'David Okoro', initials: 'DO', score: '84', status: 'Passed', feedback: 'Great indexing schemas.', bgColor: 'bg-secondary-container text-on-secondary-container' }
    ]
  });

  // Recent Activity Feed State
  const [activityLogs, setActivityLogs] = useState([
    { id: 'act-1', type: 'verified', title: 'Course Finalized', details: 'Advanced React Hooks (AR-400)', time: '10 mins ago', author: 'Admin Sarah', iconColor: 'bg-primary-container/10 text-primary' },
    { id: 'act-2', type: 'history_edu', title: 'Bulk Entry Uploaded', details: 'Intro to UI Design (UID-101)', time: '2 hours ago', author: 'Prof. Miller', iconColor: 'bg-secondary-container/10 text-secondary' },
    { id: 'act-3', type: 'error', title: 'Discrepancy Flagged', details: 'Student ID STU-9902: Grade Mismatch', time: 'Yesterday', author: 'Auto-System Alert', iconColor: 'bg-error-container/20 text-error' }
  ]);

  // Core configuration & modal states
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const [newBatch, setNewBatch] = useState({
    courseName: 'Python Fundamentals (PY-101)',
    examiner: '',
    maxMarks: '100',
    examDate: '2023-11-15'
  });

  // 2. Micro-interactions & Handlers
  const triggerToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };

  const handleScoreChange = (course, studentId, newScore) => {
    setStudentGradings(prev => {
      const list = prev[course].map(student => {
        if (student.id === studentId) {
          let computedStatus = 'Pending';
          if (newScore !== '') {
            computedStatus = parseInt(newScore) >= 50 ? 'Passed' : 'Failed';
          }
          return { ...student, score: newScore, status: computedStatus };
        }
        return student;
      });
      return { ...prev, [course]: list };
    });
  };

  const handleFeedbackChange = (course, studentId, newFeedback) => {
    setStudentGradings(prev => {
      const list = prev[course].map(student => {
        if (student.id === studentId) {
          return { ...student, feedback: newFeedback };
        }
        return student;
      });
      return { ...prev, [course]: list };
    });
  };

  const handleSaveStudentGrade = (student) => {
    if (student.score === '') {
      triggerToast(`Please enter a valid numeric grade for ${student.name}.`);
      return;
    }
    triggerToast(`Grades finalized & synchronized for ${student.name} (${student.id})!`);
    
    // Add activity to log
    const newLog = {
      id: `act-${Date.now()}`,
      type: 'verified',
      title: 'Grade Updated',
      details: `${student.name}: Score ${student.score} in ${selectedCourse}`,
      time: 'Just now',
      author: 'Super Admin',
      iconColor: 'bg-primary-container/10 text-primary'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const handleExportReports = () => {
    triggerToast('Compiled master grading worksheets... PDF and CSV download initialized.');
  };

  const handleOpenExamModal = () => {
    setNewBatch({
      courseName: selectedCourse,
      examiner: 'Ms. Emily Watson',
      maxMarks: '100',
      examDate: '2023-11-15'
    });
    setIsExamModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseExamModal = () => {
    setIsExamModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleCreateExamBatchSubmit = (e) => {
    e.preventDefault();
    if (!newBatch.examiner) {
      alert('Please fill out examiner details.');
      return;
    }

    triggerToast(`New exam grading batch created for ${newBatch.courseName}!`);
    handleCloseExamModal();

    // Add activity log
    const newLog = {
      id: `act-${Date.now()}`,
      type: 'history_edu',
      title: 'New Exam Batch',
      details: `${newBatch.courseName} scheduled with max score: ${newBatch.maxMarks}`,
      time: 'Just now',
      author: newBatch.examiner,
      iconColor: 'bg-secondary-container/10 text-secondary'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const handleSendReport = (reportName) => {
    triggerToast(`Securely compiled Fall 2023 progress summaries dispatched to 120 registered students.`);
  };

  const handleViewAnalytics = () => {
    triggerToast('Opening interactive performance analytics portal drawer...');
  };

  const activeStudents = studentGradings[selectedCourse] || [];

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg text-left gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Results Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Oversee academic performance, finalize exam batches, and track certification eligibility across all departments.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleExportReports}
            className="bg-secondary-container text-primary font-label-md text-label-md px-6 py-2.5 rounded-lg flex items-center gap-2 hover:scale-102 transition-all active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_download</span>
            <span>Export Reports</span>
          </button>
          <button 
            onClick={handleOpenExamModal}
            className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-lg flex items-center gap-2 hover:scale-102 shadow-sm transition-all active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Exam Batch</span>
          </button>
        </div>
      </div>

      {/* Bento Dashboard Grid */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Summary Stats Cards */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="p-3 bg-primary-container/10 text-primary rounded-xl material-symbols-outlined">trending_up</span>
            <span className="text-label-sm font-label-sm text-on-secondary-container px-2.5 py-1 bg-secondary-container rounded font-bold">
              +12.5% vs last sem
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Average Grade Point</h3>
            <p className="font-headline-xl text-headline-xl text-on-surface font-bold leading-tight mt-1">
              3.82 <span className="text-headline-sm font-headline-sm text-outline font-light">/ 4.0</span>
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="p-3 bg-tertiary-container/10 text-tertiary rounded-xl material-symbols-outlined">verified</span>
            <span className="text-label-sm font-label-sm text-on-tertiary-container px-2.5 py-1 bg-tertiary-fixed rounded font-bold">
              94 Eligible
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Certification Ready</h3>
            <p className="font-headline-xl text-headline-xl text-on-surface font-bold leading-tight mt-1">86%</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="p-3 bg-error-container/20 text-error rounded-xl material-symbols-outlined">pending_actions</span>
            <span className="text-label-sm font-label-sm text-on-error-container px-2.5 py-1 bg-error-container rounded font-bold">
              High Priority
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Pending Gradings</h3>
            <p className="font-headline-xl text-headline-xl text-on-surface font-bold leading-tight mt-1">14</p>
          </div>
        </div>

        {/* Main Action Area: Bulk Entry (Asymmetric Layout) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 gap-2 flex-wrap">
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Bulk Grade Entry Tool</h4>
              <div className="flex gap-2">
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-sm text-label-sm focus:ring-primary focus:border-primary cursor-pointer font-bold"
                >
                  <option value="Python Fundamentals (PY-101)">Python Fundamentals (PY-101)</option>
                  <option value="Web Design (WD-202)">Web Design (WD-202)</option>
                  <option value="Database Systems (DB-301)">Database Systems (DB-301)</option>
                </select>
                <button 
                  onClick={() => triggerToast('Toggling grading visual metrics filter filters...')}
                  className="material-symbols-outlined p-1.5 hover:bg-surface-container rounded transition-colors flex items-center justify-center border border-outline-variant"
                >
                  filter_list
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                    <th className="pb-4">Student Name</th>
                    <th className="pb-4 text-center">Score (100)</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Feedback Snippet</th>
                    <th className="pb-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-body-sm font-light text-on-surface-variant">
                  {activeStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${student.bgColor || 'bg-secondary-container text-on-secondary-container'}`}>
                          {student.initials}
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-bold leading-none">{student.name}</p>
                          <p className="text-[10px] text-outline mt-1 font-semibold">ID: {student.id}</p>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <input 
                          className="w-16 text-center bg-white border border-outline-variant rounded p-1 font-label-md focus:ring-2 focus:ring-primary/20 font-bold" 
                          type="number" 
                          min="0"
                          max="100"
                          placeholder="--"
                          value={student.score}
                          onChange={(e) => handleScoreChange(selectedCourse, student.id, e.target.value)}
                        />
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          student.status === 'Passed'
                            ? 'bg-green-100 text-green-700'
                            : student.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <input 
                          className="w-full text-xs border-none focus:ring-0 bg-transparent placeholder:text-outline/40 font-light focus:bg-white focus:p-1.5 focus:rounded focus:border focus:border-outline-variant" 
                          placeholder="Provide performance feedback..." 
                          type="text"
                          value={student.feedback}
                          onChange={(e) => handleFeedbackChange(selectedCourse, student.id, e.target.value)}
                        />
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleSaveStudentGrade(student)}
                          className="material-symbols-outlined text-outline hover:text-primary transition-colors text-[20px] active:scale-90 flex items-center justify-center ml-auto"
                        >
                          save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center border-t border-outline-variant/30 pt-4 flex-wrap gap-2">
            <p className="text-label-sm font-label-sm text-on-surface-variant font-bold">Showing {activeStudents.length} of 42 students</p>
            <button 
              onClick={() => triggerToast(`Displaying full directory roster lists for ${selectedCourse}...`)}
              className="text-primary font-label-md text-label-md hover:underline font-bold text-sm"
            >
              View Full Roster
            </button>
          </div>
        </div>

        {/* Right Sidebar: Report Generation & Quick Actions */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          
          {/* Progress Reports Card */}
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm space-y-4">
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Report Generation</h4>
              <p className="text-body-sm text-body-sm text-on-surface-variant mt-1 font-light leading-snug">
                Instantly generate and distribute semesterly progress summaries to students and guardians.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">picture_as_pdf</span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-bold leading-none">Fall 2023 Summary</p>
                    <p className="text-[10px] text-outline mt-1 font-semibold">Ready for 120 students</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleSendReport('Fall 2023 Summary')}
                  className="p-1.5 hover:bg-surface-container rounded transition-all flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-bold leading-none">Performance Analytics</p>
                    <p className="text-[10px] text-outline mt-1 font-semibold">Generated 2h ago</p>
                  </div>
                </div>
                <button 
                  onClick={handleViewAnalytics}
                  className="p-1.5 hover:bg-surface-container rounded transition-all flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => triggerToast('Opening central custom syllabus analysis configurator...')}
              className="w-full mt-4 py-2.5 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md font-bold hover:bg-opacity-95 transition-all shadow-sm active:scale-95 duration-100"
            >
              Create Custom Report
            </button>
          </div>

          {/* Certification Eligibility Track */}
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm relative overflow-hidden group space-y-4">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary transition-all duration-300"></div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Certification Tracker</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1.5 font-bold text-xs uppercase tracking-wider">
                  <span className="text-on-surface">Core Python Certified</span>
                  <span className="text-primary">82%</span>
                </div>
                <div className="w-full bg-secondary-container h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-bold text-xs uppercase tracking-wider">
                  <span className="text-on-surface">Cloud Architecture</span>
                  <span className="text-tertiary">45%</span>
                </div>
                <div className="w-full bg-secondary-container h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-start gap-2 text-[10px] text-on-surface-variant font-bold leading-normal">
              <span className="material-symbols-outlined text-[15px] shrink-0 text-primary">info</span>
              <p>Eligibility requires cumulative GPA &gt; 3.5 and 90% attendance registries.</p>
            </div>
          </div>

        </div>

        {/* Bottom Row: Recent Activity Log */}
        <div className="col-span-12 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm text-left space-y-6">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Activity Log</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex gap-4 items-start">
                <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg ${log.iconColor}`}>
                  <span className="material-symbols-outlined">{log.type}</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold leading-none">{log.title}</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant mt-1.5 font-light leading-snug">{log.details}</p>
                  <p className="text-[10px] text-outline mt-1 font-semibold uppercase">{log.time} • By {log.author}</p>
                </div>
              </div>
            ))}
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

      {/* Modal: New Exam Batch */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={handleCloseExamModal}></div>
          <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Initiate New Exam Batch</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseExamModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateExamBatchSubmit} className="p-stack-md space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Academic Course</label>
                <select 
                  value={newBatch.courseName}
                  onChange={(e) => setNewBatch(prev => ({ ...prev, courseName: e.target.value }))}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer font-bold text-body-sm"
                >
                  <option value="Python Fundamentals (PY-101)">Python Fundamentals (PY-101)</option>
                  <option value="Web Design (WD-202)">Web Design (WD-202)</option>
                  <option value="Database Systems (DB-301)">Database Systems (DB-301)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Examiner Incharge</label>
                  <input 
                    value={newBatch.examiner}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, examiner: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    placeholder="Enter professor name"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Max Points Score</label>
                  <input 
                    value={newBatch.maxMarks}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, maxMarks: e.target.value }))}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    type="number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider">Scheduled Exam Date</label>
                <input 
                  value={newBatch.examDate}
                  onChange={(e) => setNewBatch(prev => ({ ...prev, examDate: e.target.value }))}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                  type="date"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={handleCloseExamModal}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Initiate Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Results;

