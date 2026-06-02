import React, { useState } from 'react';
import AssignmentReviewModal from '../../components/teacher/assignments/AssignmentReviewModal';

const Assignments = () => {
  // Modal & Review States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [reviewStudent, setReviewStudent] = useState(null); // { name, course, batch, status }
  const [filterBatch, setFilterBatch] = useState('ALL');

  // New Assignment fields
  const [newTitle, setNewTitle] = useState('');
  const [newBatch, setNewBatch] = useState('PY-A1: Python Advanced');
  const [newDesc, setNewDesc] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPoints, setNewPoints] = useState('100');
  const [allowLate, setAllowLate] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Static submissions array
  const [submissions, setSubmissions] = useState([
    { id: 1, name: 'Rohan K.', initials: 'RK', course: 'Python Data Structures', batch: 'PY-B2', status: 'Submitted', colorClass: 'bg-primary-container/20 text-primary' },
    { id: 2, name: 'Sneha P.', initials: 'SP', course: 'React Component Lifecycle', batch: 'FED-24', status: 'Urgent', colorClass: 'bg-tertiary-container/20 text-tertiary' },
    { id: 3, name: 'Aryan V.', initials: 'AV', course: 'SQL Joins Practice', batch: 'DB-M8', status: 'Graded', colorClass: 'bg-secondary-container text-secondary' }
  ]);

  // Submission count
  const [activeCount, setActiveCount] = useState(12);
  const [pendingCount, setPendingCount] = useState(24);
  const [completionRate, setCompletionRate] = useState(88);

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Trigger toast & increment active assignments
    setActiveCount(prev => prev + 1);
    setIsCreateOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewDueDate('');
    triggerToast(`🚀 Assignment folder "${newTitle}" published successfully to batch ${newBatch.split(':')[0]}!`);
  };

  const handleGradeSubmit = (score, feedback) => {
    if (!reviewStudent) return;

    // Update student status to Graded
    setSubmissions(submissions.map(sub => 
      sub.id === reviewStudent.id ? { ...sub, status: 'Graded' } : sub
    ));

    // Decrement pending reviews
    setPendingCount(prev => Math.max(0, prev - 1));
    triggerToast(`✅ Grades declared successfully for ${reviewStudent.name}! Score: ${score}/100.`);
    setReviewStudent(null);
  };

  const filteredSubmissions = submissions.filter(sub => {
    return filterBatch === 'ALL' || sub.batch === filterBatch;
  });

  return (
    <div className="space-y-stack-lg text-left relative selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce text-xs font-semibold">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-none">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Assignments Dashboard</h1>
          <p className="text-on-surface-variant text-body-md font-light leading-normal">
            Manage, track, and review student submissions across all batches.
          </p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary text-on-primary rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md border-none cursor-pointer text-xs outline-none shrink-0"
        >
          <span className="material-symbols-outlined text-sm font-bold">add_task</span>
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Bento Grid Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Active Assignments Card */}
        <div className="glass-panel p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between overflow-hidden relative text-xs hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <span className="text-on-surface-variant font-label-md font-semibold flex items-center gap-2 mb-2 select-none">
              <span className="material-symbols-outlined text-primary text-sm font-bold">event_note</span>
              Active Assignments
            </span>
            <div className="flex items-baseline gap-2">
              <h2 className="font-headline-xl text-4xl text-primary font-bold">{activeCount}</h2>
              <span className="text-on-surface-variant font-light">+2 this week</span>
            </div>
          </div>

          <div className="mt-4 flex -space-x-2 select-none pointer-events-none">
            <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI_XoahWgFFc5veav7qOoHQ3Id2Rr_K8E73yTvcIGN4vd9DjO7yEW1A4rqMowNMuOY8xmU4yA4wBqvj-CY6bvZNqrG7hzqwVurBBdUsdeIdL4aDJyhDjJnV5JZh9OBlpachydp-KTZdL3qP22wZ077leEUUqGNNaR7vxAM4Lt5hzG-jJI-4BnGf30-IsAxcK9v9wuPzb_9nYDjlyRzdvNTLSWVmU9E718CgnHBSqnErDT5PSIJlXAUuBK9GDieqIDQYCh4g4J6BWL3" alt="Student" />
            <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4hzlUaLiO4DfO392mNUEIspxIjVsRkgbQkeMUw-QY9HRSNoArvB8kxEWGv7jWWDBdfmUdkQr4hLLTRq_bnaneacMps3ys7kJ49wh5HdD2TMJqrnfS0JyPST_IAxFfWw4ieTiSknooqLn3t_Xz0J5dXKLyTDyX0kHFKihnIIuMDZe3M450oA56-UwjE3pFzWQ6j174eafFdEsdWdY46DB6vLTt-VWeEzYHV4B-ZRSwg48DAAEc10mmhDt4UawM7eZTxs0QIqkp82eo" alt="Student" />
            <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq1gV5NA_UFX3Rs1pi2fHeyWiJ7q1ARnStHjq09JZ6WZytxoRwluLJu7v9KomZBdMJdRuqT2DHJB3NrBekgDa203VTwZCgW47rpQ1Fsg3ljinBiS8YkQYTnEYwTj03rgXAXbfJVnHMy0xgKq0nSmW5pvtiCIJq6h72jrtYmvaEmDs6Vg6YnR7_NDQLpXZpQW7PaGwQVD6nSeMI-QEbJ9wrXYECrBBdRhnAY6CMYlFGTpqu-Zj0DaSE2DnSxZXXwpHsZsKvHMrcvw8z" alt="Student" />
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold border-2 border-white">
              +142
            </div>
          </div>
        </div>

        {/* Pending Reviews Card */}
        <div className="glass-panel p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between text-xs hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
          <div>
            <span className="text-on-surface-variant font-label-md font-semibold flex items-center gap-2 mb-2 select-none">
              <span className="material-symbols-outlined text-error text-sm font-bold">pending_actions</span>
              Pending Reviews
            </span>
            <h2 className="font-headline-xl text-4xl text-on-surface font-bold">{pendingCount}</h2>
          </div>
          <div className="bg-error-container text-on-error-container text-[10px] px-2.5 py-0.5 rounded font-bold border border-error/15 w-fit select-none">
            High Priority
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="glass-panel p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between text-xs hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
          <div>
            <span className="text-on-surface-variant font-label-md font-semibold flex items-center gap-2 mb-2 select-none">
              <span className="material-symbols-outlined text-primary-container text-sm font-bold">check_circle</span>
              Completion Rate
            </span>
            <h2 className="font-headline-xl text-4xl text-on-surface font-bold">{completionRate}%</h2>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/15 select-none">
            <div className="h-full bg-primary" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>

      </div>

      {/* Main Grid: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Table Section (Left, Span 8) */}
        <div className="lg:col-span-8 glass-panel rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex items-center justify-between">
            <h3 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-2 select-none">
              <span className="material-symbols-outlined text-primary">view_list</span>
              Recent Submissions
            </h3>
            
            <div className="flex items-center gap-2 select-none text-xs font-semibold">
              <select 
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="bg-surface border border-outline-variant rounded-lg px-2.5 py-1.5 outline-none cursor-pointer text-xs"
              >
                <option value="ALL">All Batches</option>
                <option value="PY-B2">PY-B2</option>
                <option value="FED-24">FED-24</option>
                <option value="DB-M8">DB-M8</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low text-on-surface-variant font-bold">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Assignment</th>
                  <th className="px-6 py-4">Batch</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant/70">
                      No matching student submissions found for selected batch.
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${sub.colorClass} font-bold flex items-center justify-center text-[10px] select-none shrink-0 border border-outline-variant/10`}>
                            {sub.initials}
                          </div>
                          <span className="font-label-md font-bold text-on-surface truncate">{sub.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-on-surface truncate max-w-[150px]">{sub.course}</td>
                      <td className="px-6 py-4 font-medium shrink-0">{sub.batch}</td>
                      <td className="px-6 py-4 select-none shrink-0">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                          sub.status === 'Urgent' 
                            ? 'bg-error-container/20 text-on-error-container border-error/20' 
                            : sub.status === 'Graded'
                            ? 'bg-tertiary-container/20 text-on-tertiary-fixed-variant border-tertiary/20'
                            : 'bg-primary/10 text-primary border-primary/20'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right select-none shrink-0">
                        {sub.status === 'Graded' ? (
                          <button 
                            onClick={() => setReviewStudent(sub)}
                            className="border border-primary text-primary font-bold px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none active:scale-95 text-[10px]"
                          >
                            Re-evaluate
                          </button>
                        ) : (
                          <button 
                            onClick={() => setReviewStudent(sub)}
                            className="bg-primary text-on-primary font-bold px-4 py-2 rounded-lg hover:bg-primary-container transition-opacity border-none cursor-pointer outline-none active:scale-95 text-[10px]"
                          >
                            Review Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts & Progress Section (Right, Span 4) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Grading Progress Card */}
          <div className="glass-panel p-6 rounded-xl border border-outline-variant shadow-sm text-left">
            <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-6 flex items-center gap-2 select-none">
              <span className="material-symbols-outlined text-primary text-lg">bar_chart</span>
              Grading Progress
            </h3>
            
            <div className="space-y-6 text-xs font-semibold text-on-surface-variant select-none">
              {/* Batch 1 */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-on-surface">
                  <span>Python Advanced (PY-A1)</span>
                  <span className="text-on-surface-variant font-medium">42/50</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/15">
                  <div className="h-full bg-primary" style={{ width: '84%' }}></div>
                </div>
              </div>
              
              {/* Batch 2 */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-on-surface">
                  <span>Frontend Web (FW-44)</span>
                  <span className="text-on-surface-variant font-medium">15/48</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/15">
                  <div className="h-full bg-tertiary" style={{ width: '31%' }}></div>
                </div>
              </div>

              {/* Batch 3 */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-on-surface">
                  <span>Java Backend (JB-09)</span>
                  <span className="text-on-surface-variant font-medium">55/60</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/15">
                  <div className="h-full bg-primary-container" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Trends (Visual Column Graph) */}
          <div className="glass-panel p-6 rounded-xl border border-outline-variant shadow-sm text-left">
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs font-bold mb-4 select-none">
              Submission Trends
            </h3>
            
            <div className="flex items-end justify-between h-32 gap-2 mt-4 select-none pointer-events-none">
              <div className="bg-primary/45 w-full rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '40%' }}></div>
              <div className="bg-primary/65 w-full rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '70%' }}></div>
              <div className="bg-primary/80 w-full rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '55%' }}></div>
              <div className="bg-primary w-full rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '90%' }}></div>
              <div className="bg-primary/50 w-full rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '35%' }}></div>
            </div>
            
            <div className="flex justify-between mt-2 text-[10px] font-bold text-outline select-none leading-none">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Quick Links & Help */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-left">
        
        {/* Tip 1 */}
        <div className="bg-secondary-container/30 p-4 rounded-xl flex items-center gap-4 border border-secondary-container/10">
          <div className="w-12 h-12 rounded-full bg-on-secondary-container/10 flex items-center justify-center text-on-secondary-container shrink-0 select-none">
            <span className="material-symbols-outlined text-primary text-xl font-bold">auto_awesome</span>
          </div>
          <div>
            <h4 className="font-label-md font-bold text-on-surface">Auto-Grader Tip</h4>
            <p className="text-body-sm text-on-surface-variant font-light mt-0.5 leading-relaxed">
              Enable for Python mcqs to save 3 hours/week.
            </p>
          </div>
        </div>

        {/* Tip 2 */}
        <div className="bg-primary-container/10 p-4 rounded-xl flex items-center gap-4 border border-primary-container/10">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0 select-none">
            <span className="material-symbols-outlined text-xl font-bold">campaign</span>
          </div>
          <div>
            <h4 className="font-label-md font-bold text-on-surface">Late Policy</h4>
            <p className="text-body-sm text-on-surface-variant font-light mt-0.5 leading-relaxed">
              Global update for winter break assignments.
            </p>
          </div>
        </div>

        {/* Tip 3 */}
        <div className="bg-surface-container p-4 rounded-xl flex items-center gap-4 border border-outline-variant/30">
          <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 select-none">
            <span className="material-symbols-outlined text-on-surface-variant text-xl font-bold">help_outline</span>
          </div>
          <div>
            <h4 className="font-label-md font-bold text-on-surface">Instructor Support</h4>
            <p className="text-body-sm text-on-surface-variant font-light mt-0.5 leading-relaxed">
              Connect with technical staff for grading issues.
            </p>
          </div>
        </div>

      </div>

      {/* CREATE MODAL: Create Assignment Form */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-2xl shadow-2xl p-8 border border-outline-variant text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 select-none border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_task</span>
                Create New Assignment
              </h2>
              <button 
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant bg-transparent border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-6 text-xs font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Assignment Title</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                    placeholder="e.g. Intro to NumPy" 
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5 select-none">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Target Batch</label>
                  <select 
                    value={newBatch}
                    onChange={(e) => setNewBatch(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs"
                  >
                    <option value="PY-A1: Python Advanced">PY-A1: Python Advanced</option>
                    <option value="FW-44: Frontend Web">FW-44: Frontend Web</option>
                    <option value="DB-M8: SQL Mastery">DB-M8: SQL Mastery</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Description &amp; Instructions</label>
                <textarea 
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none resize-none font-light text-xs" 
                  placeholder="Provide detailed instructions for the students..." 
                  rows="4"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Due Date</label>
                  <div className="relative">
                    <input 
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Points / Weightage</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                    placeholder="100" 
                    type="number"
                    value={newPoints}
                    onChange={(e) => setNewPoints(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 py-2 select-none">
                <input 
                  className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer" 
                  id="late-submissions" 
                  type="checkbox"
                  checked={allowLate}
                  onChange={() => setAllowLate(!allowLate)}
                />
                <label className="text-body-sm font-medium cursor-pointer" htmlFor="late-submissions">
                  Allow late submissions with penalty
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 select-none">
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors border-none bg-transparent cursor-pointer outline-none" 
                  onClick={() => setIsCreateOpen(false)} 
                  type="button"
                >
                  Discard
                </button>
                <button 
                  className="px-8 py-2.5 rounded-xl font-bold bg-primary text-on-primary shadow-lg hover:opacity-95 transition-opacity border-none cursor-pointer outline-none hover:scale-[1.01] active:scale-95" 
                  type="submit"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EVALUATE MODAL: Grade review popup */}
      {reviewStudent && (
        <AssignmentReviewModal 
          studentName={reviewStudent.name}
          onClose={() => setReviewStudent(null)}
          onSubmitGrade={handleGradeSubmit}
        />
      )}

    </div>
  );
};

export default Assignments;
