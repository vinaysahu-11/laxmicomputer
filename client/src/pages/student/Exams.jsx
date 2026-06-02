import React, { useState, useEffect } from 'react';

const Exams = () => {
  // Assignments Files & Submission States
  const [dockerFile, setDockerFile] = useState(null);
  const [djangoSubmitting, setDjangoSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Active Exam states
  const [examSecondsLeft, setExamSecondsLeft] = useState(104 * 60 + 56); // 1h 44m 56s
  const [isExamActive, setIsExamActive] = useState(false); // proctored exam screen modal
  const [examAnswer, setExamAnswer] = useState('');
  const [isAdmitCardPrintOpen, setIsAdmitCardPrintOpen] = useState(false);
  const [admitCardFormat, setAdmitCardFormat] = useState('PDF');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportText, setSupportText] = useState('');

  // Practice/Test Reminders state
  const [scheduledReminders, setScheduledReminders] = useState({});

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setExamSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds into HH:MM:SS
  const formatTimer = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Toast triggers
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Simulated file picker callback
  const handleDockerFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setDockerFile(e.target.files[0]);
      triggerToast(`Simulated select: Selected ${e.target.files[0].name} for upload.`);
    }
  };

  const handleDockerSubmit = () => {
    if (!dockerFile) {
      triggerToast("⚠️ Please select a .zip or .pdf file first before submitting!");
      return;
    }
    triggerToast(`Congratulations! "Docker & Kubernetes Infrastructure" assignment successfully uploaded & submitted!`);
    setDockerFile(null);
  };

  const handleDjangoFinalize = () => {
    setDjangoSubmitting(true);
    setTimeout(() => {
      setDjangoSubmitting(false);
      triggerToast(`"Django REST API Development" assignment submission finalized successfully! Grade pending evaluation.`);
    }, 1800);
  };

  const toggleReminder = (id, title) => {
    setScheduledReminders(prev => {
      const active = !prev[id];
      triggerToast(active ? `🔔 Calendar notification set for "${title}"!` : `🔕 Reminder cleared for "${title}"`);
      return { ...prev, [id]: active };
    });
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportText.trim()) return;
    triggerToast("Your support ticket has been submitted! A proctor advisor will contact you.");
    setSupportText('');
    setIsSupportOpen(false);
  };

  // Mock exam questions
  const mockExamQuestion = {
    title: "Semester Practical Final Assessment: Web Architecture & Containers",
    desc: "Explain in detail the operational differences between Kubernetes Pods and Deployments. Provide a basic YAML deployment manifest containing a horizontal replica sync of 3 nodes.",
    referencePDF: "CS-401-Reference-Manifest.pdf"
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
      <header className="border-b border-outline-variant/20 pb-4">
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Exams & Assessments</h1>
        <p className="font-body-md text-on-surface-variant text-xs mt-1">
          Manage your academic evaluations, submit assignments, and prepare for upcoming tests.
        </p>
      </header>

      {/* Main Two Column layout */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Left Column (Span 7): Assignments & Active Exam Env */}
        <div className="col-span-12 lg:col-span-7 space-y-stack-lg">
          
          {/* Assignments list */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-base font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">assignment</span>
                Pending Assignments
              </h2>
              <span className="text-xs font-bold bg-error-container text-on-error-container px-3 py-1 rounded-full">
                3 Overdue
              </span>
            </div>

            <div className="space-y-4">
              
              {/* Card 1: Cloud Computing */}
              <div className="glass-card p-5 rounded-xl hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-grow text-left">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Cloud Computing</span>
                    <h3 className="font-headline-sm text-sm font-bold text-on-surface mt-1">
                      Docker & Kubernetes Infrastructure
                    </h3>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed mt-2">
                      Deploy a multi-tier application using Docker Compose and scale it via K8s clusters.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-error">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        Deadline: Oct 24, 2026
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-outline">
                        <span className="material-symbols-outlined text-sm">bar_chart</span>
                        Weight: 15%
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end min-w-[180px] shrink-0">
                    <div className="bg-surface-container-high/50 rounded-lg p-4 w-full border border-dashed border-outline-variant hover:border-primary transition-colors text-center relative cursor-pointer">
                      <input 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        type="file" 
                        onChange={handleDockerFileSelect}
                        id="docker-file-input"
                      />
                      <span className="material-symbols-outlined text-primary text-xl">cloud_upload</span>
                      <p className="text-[10px] font-bold mt-1 text-on-surface">
                        {dockerFile ? dockerFile.name : 'Upload .zip / .pdf'}
                      </p>
                    </div>
                    <button 
                      onClick={handleDockerSubmit}
                      className="mt-3 w-full bg-primary text-on-primary py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:brightness-110 active:scale-95 transition-all"
                    >
                      Submit Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Python Frameworks */}
              <div className="glass-card p-5 rounded-xl hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-4 text-left">
                  <div className="flex-grow">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Python Frameworks</span>
                    <h3 className="font-headline-sm text-sm font-bold text-on-surface mt-1">
                      Django REST API Development
                    </h3>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed mt-2">
                      Implement JWT authentication and CRUD operations for a library management system.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        Deadline: Oct 28, 2026
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-outline">
                        <span className="material-symbols-outlined text-sm">bar_chart</span>
                        Weight: 20%
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-end min-w-[180px] shrink-0">
                    <div className="flex items-center gap-2 text-primary font-bold justify-center bg-primary/10 py-2 rounded-lg border border-primary/20">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      <span className="text-[10px]">Status: Draft Saved</span>
                    </div>
                    <button 
                      onClick={handleDjangoFinalize}
                      disabled={djangoSubmitting}
                      className="mt-2 w-full bg-secondary-container text-on-secondary-container py-2.5 rounded-lg text-xs font-bold hover:bg-secondary-container/85 border-none cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      {djangoSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                          Submitting...
                        </>
                      ) : 'Finalize Submission'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Active Exam Environment Dashboard */}
          <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div>
                <h2 className="font-headline-md text-base font-bold text-primary">Active Exam Environment</h2>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Secure proctor browser sync. Ensure stable connection.</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-error tabular-nums">{formatTimer(examSecondsLeft)}</div>
                <div className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">Time Remaining</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <div className="glass-card p-4 rounded-xl text-left bg-white/70">
                <h3 className="font-label-md text-xs font-bold text-on-surface flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-base">info</span>
                  Instructions
                </h3>
                <ul className="text-[10px] space-y-1.5 text-on-surface-variant list-disc pl-4 leading-normal font-light">
                  <li>Multiple choice and coding essay answers.</li>
                  <li>Proctored tab locking is active. Do not navigate away.</li>
                  <li>Auto-submission triggers instantly at 00:00:00.</li>
                </ul>
              </div>

              <div className="glass-card p-4 rounded-xl flex flex-col justify-center items-center gap-2 bg-white/70 text-center">
                <span className="material-symbols-outlined text-3xl text-primary">description</span>
                <div>
                  <p className="font-label-md text-xs font-bold text-on-surface">Reference Syllabus Material</p>
                  <p className="text-[9px] text-outline mt-0.5">PDF • 2.4 MB</p>
                </div>
                <button 
                  onClick={() => triggerToast("Downloading secure reference manifest PDF...")}
                  className="text-primary font-bold bg-transparent text-xs hover:underline border-none cursor-pointer flex items-center gap-1 mt-1 outline-none"
                >
                  <span className="material-symbols-outlined text-sm font-bold">download</span> Download Paper
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                setIsExamActive(true);
                document.body.style.overflow = 'hidden';
              }}
              className="mt-6 w-full bg-primary text-on-primary py-3 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.99] border-none cursor-pointer transition-all flex items-center justify-center gap-2 relative z-10 text-xs"
            >
              <span className="material-symbols-outlined text-sm font-bold">rocket_launch</span>
              Enter Exam Portal
            </button>
          </section>

        </div>

        {/* Right Column (Span 5): Admit card & schedules */}
        <div className="col-span-12 lg:col-span-5 space-y-stack-lg">
          
          {/* Admit Card Passes */}
          <section className="space-y-4">
            <h2 className="font-headline-sm text-base font-bold mb-stack-md flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">badge</span>
              Upcoming Main Exams
            </h2>

            <div className="bg-white rounded-2xl overflow-hidden border border-outline-variant/35 shadow-sm hover:shadow-md transition-all text-left">
              <div className="bg-primary p-4 text-on-primary flex justify-between items-center">
                <div>
                  <p className="text-[9px] opacity-80 uppercase tracking-widest font-extrabold">Admit Hall Ticket</p>
                  <h3 className="font-headline-sm text-sm font-bold mt-1">Semester Finals - Dec 2026</h3>
                </div>
                <span className="material-symbols-outlined text-2xl opacity-50">school</span>
              </div>
              
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 gap-y-4 text-xs">
                  <div>
                    <p className="text-outline font-medium">Student Name</p>
                    <p className="font-bold text-on-surface mt-0.5">Arjun Kumar</p>
                  </div>
                  <div>
                    <p className="text-outline font-medium">Roll Number</p>
                    <p className="font-bold text-on-surface mt-0.5">LX-2024-089</p>
                  </div>
                  <div>
                    <p className="text-outline font-medium">Center</p>
                    <p className="font-bold text-on-surface mt-0.5">Main Campus - Hall B</p>
                  </div>
                  <div>
                    <p className="text-outline font-medium">Mode</p>
                    <p className="font-bold flex items-center gap-1 text-primary mt-0.5">
                      <span className="material-symbols-outlined text-sm">laptop_mac</span> Offline/Proctored
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-dashed border-outline-variant/40 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface-container flex items-center justify-center rounded shrink-0 border border-outline-variant/20">
                      <span className="material-symbols-outlined text-lg text-outline">qr_code_2</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-on-surface">Verification ID</p>
                      <p className="text-[9px] text-outline font-mono mt-0.5">B77X-99LK-P220</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAdmitCardPrintOpen(true)}
                    className="bg-secondary-container text-on-secondary-container px-4 py-2 border-none rounded-lg text-[10px] font-extrabold hover:bg-primary-container hover:text-on-primary-container cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">print</span> Print Ticket
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Test Schedule lists */}
          <section className="space-y-4">
            <h2 className="font-headline-sm text-base font-bold mb-stack-md flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">fact_check</span>
              Assessment Schedule
            </h2>

            <div className="space-y-3">
              
              {/* Test Item 1 */}
              <div className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-surface-container/30 transition-colors text-left">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-base">language</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-label-md text-xs font-bold text-on-surface">Web Architecture Quiz</h4>
                  <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Tomorrow, 10:00 AM • Online</p>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-[9px] bg-surface-container-high px-2 py-0.5 rounded font-bold">20 mins</span>
                  <button 
                    onClick={() => toggleReminder('t-1', 'Web Architecture Quiz')}
                    className="border-none bg-transparent cursor-pointer p-0 hover:scale-105 active:scale-95 outline-none flex items-center justify-center"
                  >
                    <span className={`material-symbols-outlined text-sm ${scheduledReminders['t-1'] ? 'text-primary font-bold' : 'text-outline'}`}>
                      {scheduledReminders['t-1'] ? 'notifications_active' : 'notifications'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Test Item 2 */}
              <div className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-surface-container/30 transition-colors text-left">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary">
                  <span className="material-symbols-outlined text-base font-bold">database</span>
                </div>
                <div className="flex-grow text-left">
                  <h4 className="font-label-md text-xs font-bold text-on-surface">SQL Optimization Test</h4>
                  <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Friday, 02:30 PM • Offline</p>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-[9px] bg-surface-container-high px-2 py-0.5 rounded font-bold">45 mins</span>
                  <button 
                    onClick={() => toggleReminder('t-2', 'SQL Optimization Test')}
                    className="border-none bg-transparent cursor-pointer p-0 hover:scale-105 active:scale-95 outline-none flex items-center justify-center"
                  >
                    <span className={`material-symbols-outlined text-sm ${scheduledReminders['t-2'] ? 'text-primary font-bold' : 'text-outline'}`}>
                      {scheduledReminders['t-2'] ? 'notifications_active' : 'notifications'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Test Item 3 Completed */}
              <div className="flex items-center gap-4 p-4 glass-card rounded-xl opacity-60 text-left cursor-not-allowed">
                <div className="w-10 h-10 rounded-full bg-outline-variant flex items-center justify-center shrink-0 text-on-surface-variant">
                  <span className="material-symbols-outlined text-base">check</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-label-md text-xs font-bold text-on-surface">System Design Basics</h4>
                  <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Completed Oct 15 • Score: 92%</p>
                </div>
                <span className="material-symbols-outlined text-primary text-base font-bold">verified</span>
              </div>

            </div>
          </section>

        </div>

      </div>

      {/* Footer Info section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter border-t border-outline-variant/20 pt-6 mt-4">
        
        {/* Success Analytics Card */}
        <div className="md:col-span-2 glass-card p-5 rounded-2xl flex flex-col sm:flex-row gap-5 items-center border border-outline-variant/35 text-left relative overflow-hidden group">
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-6xl text-primary/5 rotate-12 transition-transform group-hover:scale-125 duration-500 pointer-events-none">
            workspace_premium
          </span>
          <img 
            alt="Workspace setup" 
            className="w-full sm:w-40 h-28 object-cover rounded-xl shrink-0" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvZBE5FA2IDbIwN7djRh8-KoZK91hdtY0CKgS54HO1qOBnrsjx-srBzmGlnwpiZ_5R5FVDuQPgnXGkfCYHr2jYvv9UzcwuysOoE2pRS6WI3qVZ4KUNULBe7PYvohPNkHrGrU-DBxa9TbQqu5kXOcB-DM97yuvHOgFVpSdKrtwASQo1uCb6cGJTA7RfRQlVzoe4EAzK-QBLm7G4PF6zUpjhaEXMAtDKMw8AF4hyx-YWwT_0BWlBN6Cigcz-t_rNp66I-zcoVIjbtLcW"
          />
          <div>
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">Performance Insight</h3>
            <p className="text-[11px] text-on-surface-variant leading-relaxed mt-2">
              Your assignment submission rate is 100% this month. You're ranked in the top 5% for the "Cloud Infrastructure" course module. Keep up the momentum!
            </p>
            <button 
              onClick={() => navigate('/student/results')}
              className="mt-3 text-primary font-bold bg-transparent text-[11px] hover:underline flex items-center gap-1 border-none cursor-pointer outline-none p-0"
            >
              View Detailed Analytics <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
            </button>
          </div>
        </div>

        {/* Support helper ticket card */}
        <div className="bg-primary p-5 rounded-2xl text-on-primary text-left flex flex-col justify-between border-none">
          <div className="space-y-4">
            <span className="material-symbols-outlined text-3xl opacity-50">help</span>
            <h3 className="font-headline-sm text-sm font-bold">Need Help?</h3>
            <p className="text-[11px] opacity-80 leading-relaxed mt-1">
              Facing technical issues with assignment uploads or the exam portal? Contact the support desk immediately.
            </p>
          </div>
          <button 
            onClick={() => setIsSupportOpen(true)}
            className="bg-white text-primary w-full py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-opacity-95 transition-all mt-4"
          >
            Open Ticket
          </button>
        </div>

      </section>

      {/* Floating Plus action - Support Quick Launcher */}
      <button 
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-none cursor-pointer outline-none group"
      >
        <span className="material-symbols-outlined text-2xl font-bold">add</span>
        <span className="absolute right-full mr-3 bg-on-surface text-surface text-[10px] font-bold px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none shadow-md">
          Self-Attendance Log / Query
        </span>
      </button>

      {/* MODAL 1: MOCK PRINT ADMIT HALL CARD TICKET */}
      {isAdmitCardPrintOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">print</span>
                <h3 className="text-base font-bold text-on-surface">Print Admit Ticket</h3>
              </div>
              <button 
                onClick={() => setIsAdmitCardPrintOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="font-light text-on-surface-variant leading-relaxed">
                Save or print the academic hall ticket roll verification ID <strong>B77X-99LK-P220</strong> for proctored examinations.
              </p>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Download Format</label>
                <div className="flex gap-4">
                  {['PDF', 'PNG', 'Local Printer'].map((fmt) => (
                    <label key={fmt} className="flex items-center gap-1.5 cursor-pointer font-bold">
                      <input 
                        type="radio" 
                        name="printFmt" 
                        value={fmt} 
                        checked={admitCardFormat === fmt}
                        onChange={(e) => setAdmitCardFormat(e.target.value)}
                        className="cursor-pointer"
                      />
                      <span>{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-[10px] leading-relaxed">
                ℹ️ Standard printing formatting requires matching proctor photo verification upon lab center entry.
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    setIsAdmitCardPrintOpen(false);
                    if (admitCardFormat === 'Local Printer') {
                      window.print();
                    } else {
                      triggerToast(`Successfully saved Admit Ticket as verified ${admitCardFormat}!`);
                    }
                  }}
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all"
                >
                  Confirm & Download
                </button>
                <button 
                  onClick={() => setIsAdmitCardPrintOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: SECURE PROCTORED ONLINE EXAM SIMULATION */}
      {isExamActive && (
        <div className="fixed inset-0 z-[150] bg-black text-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          
          {/* Header bar */}
          <div className="flex justify-between items-center border-b border-white/20 pb-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 animate-pulse text-base">videocam</span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-500">Secure proctored exam console</h3>
                <p className="text-[10px] text-outline font-medium mt-0.5">{mockExamQuestion.title}</p>
              </div>
            </div>
            
            <div className="text-right shrink-0">
              <p className="text-lg font-black font-mono text-error tabular-nums">{formatTimer(examSecondsLeft)}</p>
              <p className="text-[8px] text-outline font-bold tracking-widest mt-0.5">Time Remaining</p>
            </div>
          </div>

          {/* Exam Questions Form */}
          <div className="flex-1 my-6 max-w-3xl w-full mx-auto space-y-5 text-left text-xs leading-relaxed">
            <div className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl space-y-3">
              <span className="bg-primary px-3 py-1 rounded-full text-[9px] font-extrabold uppercase">QUESTION 1 OF 1</span>
              <h4 className="text-sm font-bold text-zinc-100 mt-2">{mockExamQuestion.title}</h4>
              <p className="text-zinc-300 font-light leading-relaxed">{mockExamQuestion.desc}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase">Write Your Code Answer Sheet</label>
              <textarea 
                value={examAnswer}
                onChange={(e) => setExamAnswer(e.target.value)}
                placeholder="Type your explanation and manifest configurations here..."
                rows="10"
                className="w-full bg-zinc-950 text-green-400 font-mono border border-zinc-700 rounded-xl p-4 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none shadow-inner"
              />
            </div>

            <div className="p-3 bg-zinc-900 border border-zinc-700/65 rounded-xl text-[10px] text-zinc-400 flex items-center gap-2">
              ⚠️ Warning: Tab-switching or copying/pasting clipboard variables is recorded and flagged by AI detectors.
            </div>
          </div>

          {/* Submit action */}
          <div className="border-t border-white/20 pt-4 flex justify-between gap-4 shrink-0 max-w-3xl w-full mx-auto">
            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to exit the exam console? Your progress will not be saved.")) {
                  setIsExamActive(false);
                  document.body.style.overflow = 'auto';
                }
              }}
              className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-6 py-3 rounded-lg text-xs font-bold cursor-pointer hover:bg-zinc-700 transition-colors"
            >
              Cancel Exam
            </button>
            <button 
              onClick={() => {
                if (!examAnswer.trim()) {
                  alert("Please enter your answer sheet details before submitting!");
                  return;
                }
                if (window.confirm("Do you want to finalize and submit your proctored exam?")) {
                  setIsExamActive(false);
                  document.body.style.overflow = 'auto';
                  setExamAnswer('');
                  triggerToast("Congratulations! Your Semester Final Assessment has been submitted successfully.");
                }
              }}
              className="bg-primary text-white border-none px-10 py-3 rounded-lg text-xs font-bold cursor-pointer hover:bg-primary/95 transition-all shadow-lg active:scale-98"
            >
              Submit & Finalize Exam
            </button>
          </div>

        </div>
      )}

      {/* MODAL 3: HELP SUPPORT SYSTEM */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">support_agent</span>
                <h3 className="text-base font-bold text-on-surface">Proctor Support System</h3>
              </div>
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1.5 uppercase">Describe your Issue</label>
                <textarea 
                  value={supportText}
                  onChange={(e) => setSupportText(e.target.value)}
                  placeholder="Need assistance with file upload sizes, proctor permissions, or system schedules?"
                  rows="4"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-3 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none font-light"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-colors"
                >
                  Open Ticket
                </button>
                <button 
                  type="button"
                  onClick={() => setIsSupportOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Exams;
