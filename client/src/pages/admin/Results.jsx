import React, { useState, useEffect } from 'react';
import { getResults, createResult, updateResult, deleteResult } from '../../services/resultService';
import { getCourses } from '../../services/courseService';

const Results = () => {
  const [resultsList, setResultsList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Recent Activity Feed State
  const [activityLogs, setActivityLogs] = useState([
    { id: 'act-1', type: 'verified', title: 'Course Finalized', details: 'Database Systems', time: '10 mins ago', author: 'Admin Sarah', iconColor: 'bg-primary-container/10 text-primary' }
  ]);

  // Core configuration & modal states
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const [newBatch, setNewBatch] = useState({
    studentName: '',
    courseName: '',
    examName: 'Annual Term 2026',
    percentage: '85',
    grade: 'A'
  });

  const getGradeFromPercentage = (pct) => {
    const val = Number(pct);
    if (val >= 90) return 'A+';
    if (val >= 80) return 'A';
    if (val >= 70) return 'B';
    if (val >= 60) return 'C';
    if (val >= 50) return 'D';
    return 'F';
  };

  const fetchResultsData = async () => {
    try {
      setLoading(true);
      const [resData, coursesData] = await Promise.all([
        getResults(),
        getCourses()
      ]);
      setResultsList(resData);
      setCourses(coursesData);
      if (coursesData.length > 0) {
        setSelectedCourse(coursesData[0].title);
      }
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch student gradings from MongoDB');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultsData();
  }, []);

  const triggerToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };

  const handleScoreChange = (resultId, newScore) => {
    setResultsList(prev => prev.map(res => {
      if (res._id === resultId) {
        return {
          ...res,
          percentage: Number(newScore),
          grade: getGradeFromPercentage(newScore)
        };
      }
      return res;
    }));
  };

  const handleSaveStudentGrade = async (studentResult) => {
    if (studentResult.percentage === '' || isNaN(studentResult.percentage)) {
      triggerToast(`Please enter a valid numeric grade for ${studentResult.studentName}.`);
      return;
    }
    
    try {
      await updateResult(studentResult._id, {
        percentage: Number(studentResult.percentage),
        grade: studentResult.grade
      });
      triggerToast(`Grades finalized & saved for ${studentResult.studentName} in MongoDB!`);
      
      const newLog = {
        id: `act-${Date.now()}`,
        type: 'verified',
        title: 'Grade Updated',
        details: `${studentResult.studentName}: Score ${studentResult.percentage}% (${studentResult.grade})`,
        time: 'Just now',
        author: 'Super Admin',
        iconColor: 'bg-primary-container/10 text-primary'
      };
      setActivityLogs(prev => [newLog, ...prev]);
    } catch (err) {
      alert('Failed to save student grade.');
    }
  };

  const handleDeleteResult = async (resultId, studentName) => {
    if (window.confirm(`Are you sure you want to delete result for ${studentName}?`)) {
      try {
        await deleteResult(resultId);
        triggerToast(`Result removed for ${studentName}.`);
        fetchResultsData();
      } catch (err) {
        alert('Failed to delete student result.');
      }
    }
  };

  const handleExportReports = () => {
    triggerToast('Compiled master grading worksheets... PDF and CSV download initialized.');
  };

  const handleOpenExamModal = () => {
    setNewBatch({
      studentName: '',
      courseName: selectedCourse || (courses.length > 0 ? courses[0].title : ''),
      examName: 'Annual Term 2026',
      percentage: '85',
      grade: 'A'
    });
    setIsExamModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseExamModal = () => {
    setIsExamModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleCreateExamBatchSubmit = async (e) => {
    e.preventDefault();
    if (!newBatch.studentName || !newBatch.courseName) {
      alert('Please fill out student name and course.');
      return;
    }

    try {
      const computedGrade = getGradeFromPercentage(newBatch.percentage);
      await createResult({
        studentName: newBatch.studentName,
        courseName: newBatch.courseName,
        examName: newBatch.examName,
        percentage: Number(newBatch.percentage),
        grade: computedGrade
      });

      triggerToast(`New exam grading recorded for ${newBatch.studentName}!`);
      handleCloseExamModal();
      fetchResultsData();

      const newLog = {
        id: `act-${Date.now()}`,
        type: 'history_edu',
        title: 'New Exam Grade Added',
        details: `${newBatch.studentName} scored ${newBatch.percentage}% in ${newBatch.courseName}`,
        time: 'Just now',
        author: 'Super Admin',
        iconColor: 'bg-secondary-container/10 text-secondary'
      };
      setActivityLogs(prev => [newLog, ...prev]);
    } catch (err) {
      alert(err.response?.data?.message || 'Error recording exam result.');
    }
  };

  // Filter students by selected course name
  const activeStudents = resultsList.filter(res => res.courseName === selectedCourse);

  if (loading && resultsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading grading ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg text-left gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Results Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Oversee academic performance, finalize exam results, and track certification eligibility.
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
            <span>New Result Entry</span>
          </button>
        </div>
      </div>

      {/* Bento Dashboard Grid */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Summary Stats Cards */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="p-3 bg-primary-container/10 text-primary rounded-xl material-symbols-outlined">trending_up</span>
          </div>
          <div className="mt-4">
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Active Courses</h3>
            <p className="font-headline-xl text-headline-xl text-on-surface font-bold leading-tight mt-1">
              {courses.length}
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="p-3 bg-tertiary-container/10 text-tertiary rounded-xl material-symbols-outlined">verified</span>
          </div>
          <div className="mt-4">
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Graded Marks In MongoDB</h3>
            <p className="font-headline-xl text-headline-xl text-on-surface font-bold leading-tight mt-1">{resultsList.length} Entries</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <span className="p-3 bg-error-container/20 text-error rounded-xl material-symbols-outlined">pending_actions</span>
          </div>
          <div className="mt-4">
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Average Score</h3>
            <p className="font-headline-xl text-headline-xl text-on-surface font-bold leading-tight mt-1">
              {resultsList.length > 0 ? (resultsList.reduce((acc, curr) => acc + curr.percentage, 0) / resultsList.length).toFixed(1) : 0}%
            </p>
          </div>
        </div>

        {/* Main Action Area: Bulk Entry */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 gap-2 flex-wrap">
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Grade Roster Tool</h4>
              <div className="flex gap-2">
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-sm text-label-sm focus:ring-primary focus:border-primary cursor-pointer font-bold text-on-surface"
                >
                  {courses.map((course) => (
                    <option key={course._id} value={course.title}>{course.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                    <th className="pb-4">Student Name</th>
                    <th className="pb-4 text-center">Score (100)</th>
                    <th className="pb-4">Grade</th>
                    <th className="pb-4">Exam Name</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-body-sm font-light text-on-surface-variant">
                  {activeStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-primary-container text-on-primary-container">
                          {student.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-bold leading-none">{student.studentName}</p>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <input 
                          className="w-16 text-center bg-white border border-outline-variant rounded p-1 font-label-md focus:ring-2 focus:ring-primary/20 font-bold text-on-surface" 
                          type="number" 
                          min="0"
                          max="100"
                          placeholder="--"
                          value={student.percentage}
                          onChange={(e) => handleScoreChange(student._id, e.target.value)}
                        />
                      </td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">
                          {student.grade}
                        </span>
                      </td>
                      <td className="py-4">
                        {student.examName}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleSaveStudentGrade(student)}
                            className="material-symbols-outlined text-outline hover:text-primary transition-colors text-[20px] active:scale-90"
                            title="Save changes"
                          >
                            save
                          </button>
                          <button 
                            onClick={() => handleDeleteResult(student._id, student.studentName)}
                            className="material-symbols-outlined text-outline hover:text-error transition-colors text-[20px] active:scale-90"
                            title="Delete"
                          >
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeStudents.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-on-surface-variant font-light italic">
                        No graded records for this course. Click New Result Entry to record scores.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Actions */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm relative overflow-hidden group space-y-4">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Certification Status</h4>
            <div className="space-y-4">
              <p className="text-body-sm text-on-surface-variant leading-snug">
                Student results are linked directly to MongoDB collections and update instantly on the public rankings page.
              </p>
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
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold leading-none">{log.title}</p>
                  <p className="text-body-sm text-body-sm text-on-surface-variant mt-1.5 font-light leading-snug">{log.details}</p>
                  <p className="text-[10px] text-outline mt-1 font-semibold uppercase">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Slide-Up Notification Toast */}
      {toast.visible && (
        <div className="fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl z-[110] border border-outline-variant/20">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Modal: New Result Entry */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={handleCloseExamModal}></div>
          <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Record Student Exam Score</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseExamModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateExamBatchSubmit} className="p-6 space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Student Name *</label>
                <input 
                  value={newBatch.studentName}
                  onChange={(e) => setNewBatch(prev => ({ ...prev, studentName: e.target.value }))}
                  className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface" 
                  placeholder="e.g. Ramesh Kumar"
                  type="text"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Course Selection</label>
                  <select 
                    value={newBatch.courseName}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, courseName: e.target.value }))}
                    className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface cursor-pointer font-bold text-body-sm"
                  >
                    {courses.map((course) => (
                      <option key={course._id} value={course.title}>{course.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Exam Description</label>
                  <input 
                    value={newBatch.examName}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, examName: e.target.value }))}
                    className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface" 
                    type="text"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Percentage (0-100) *</label>
                <input 
                  value={newBatch.percentage}
                  onChange={(e) => setNewBatch(prev => ({ ...prev, percentage: e.target.value }))}
                  className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest text-on-surface" 
                  type="number"
                  min="0"
                  max="100"
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
                  Save Result
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
