import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();

  // Active Filter state
  const [activeFilter, setActiveFilter] = useState('All');

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Detailed Transaction report state
  const [isFeeDetailOpen, setIsFeeDetailOpen] = useState(false);

  // Load More state
  const [loadedMore, setLoadedMore] = useState(false);

  // Alert Inbox datasets
  const [alerts, setAlerts] = useState([
    {
      id: 'a-1',
      priority: 'Urgent',
      category: 'Fees',
      title: 'Semester Fee Balance Due',
      desc: 'Your remaining tuition balance of $450.00 for the Fall Semester is due by Friday. Please settle this to avoid late registration penalties for the next term.',
      time: '2 hours ago',
      unread: true,
      icon: 'payments',
      iconStyle: 'bg-error-container/20 text-error',
      borderStyle: 'border-l-error'
    },
    {
      id: 'a-2',
      priority: 'Academics',
      category: 'Exams',
      title: 'Mid-Term Exam Dates Released',
      desc: 'The examination schedule for October has been finalized. Your first exam (Network Security) is scheduled for Oct 12th at Hall B.',
      time: 'Yesterday',
      unread: true,
      icon: 'quiz',
      iconStyle: 'bg-primary-container/20 text-primary',
      borderStyle: 'border-l-primary'
    },
    {
      id: 'a-3',
      priority: 'Announcement',
      category: 'Announcements',
      title: 'Annual Tech Symposium 2024',
      desc: 'Registration is now open for our flagship annual tech event. Join industry leaders from Google, Meta, and Microsoft for a 3-day workshop series.',
      time: '2 days ago',
      unread: false,
      icon: 'campaign',
      iconStyle: 'bg-secondary-container/20 text-secondary',
      borderStyle: 'border-l-secondary'
    },
    {
      id: 'a-4',
      priority: 'Normal',
      category: 'Assignments',
      title: 'New Course Material Uploaded',
      desc: 'Professor Zhang has uploaded the supplementary reading materials and lab exercises for "Database Management Systems - Module 4".',
      time: '3 days ago',
      unread: false,
      icon: 'school',
      iconStyle: 'bg-surface-container-high text-on-surface-variant',
      borderStyle: 'border-l-outline-variant/30'
    }
  ]);

  // Archive older alerts
  const archivedAlerts = [
    {
      id: 'a-5',
      priority: 'Normal',
      category: 'Assignments',
      title: 'Assignment Marks Released',
      desc: 'Syllabus Assignment 3 "React Hooks & Dynamic Forms" marks are released. Your final evaluated grade: A+.',
      time: '1 week ago',
      unread: false,
      icon: 'done_all',
      iconStyle: 'bg-green-100 text-green-700',
      borderStyle: 'border-l-green-400'
    },
    {
      id: 'a-6',
      priority: 'Urgent',
      category: 'Exams',
      title: 'Proctor Photo Verification Due',
      desc: 'Ensure your student profile headshot is uploaded and verified to register proctored exam hall admit passes.',
      time: '10 days ago',
      unread: false,
      icon: 'account_box',
      iconStyle: 'bg-error-container/20 text-error',
      borderStyle: 'border-l-error'
    }
  ];

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle Single Alert read/unread status
  const handleToggleRead = (id) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.unread;
        triggerToast(nextState ? "Alert marked as unread." : "Alert marked as read.");
        return { ...a, unread: nextState };
      }
      return a;
    }));
  };

  // Mark all as read
  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, unread: false })));
    triggerToast("All active notifications marked as read!");
  };

  // Load more trigger
  const handleLoadMore = () => {
    if (loadedMore) {
      triggerToast("No further archived notifications available.");
      return;
    }
    setAlerts(prev => [...prev, ...archivedAlerts]);
    setLoadedMore(true);
    triggerToast("Archived notification logs fetched successfully.");
  };

  // Filter lists
  const filteredAlerts = alerts.filter(a => {
    if (activeFilter === 'All') return true;
    return a.category.toLowerCase() === activeFilter.toLowerCase();
  });

  // Calculate stats in real-time
  const criticalCount = alerts.filter(a => a.priority === 'Urgent' && a.unread).length;
  const activeTasksCount = alerts.filter(a => a.unread).length;

  return (
    <div className="space-y-stack-lg text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[100] bg-primary text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header and Filters */}
      <header className="border-b border-outline-variant/20 pb-4 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Notifications Hub</h2>
          <p className="text-on-surface-variant font-body-md text-xs mt-1">
            Stay updated with your latest academic alerts and campus news.
          </p>
        </div>
        
        {/* Horizontal filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar select-none">
          {['All', 'Assignments', 'Exams', 'Fees', 'Announcements'].map((filt) => (
            <button
              key={filt}
              onClick={() => {
                setActiveFilter(filt === 'All' ? 'All' : filt);
                triggerToast(`Filtered alerts: showing ${filt}.`);
              }}
              className={`px-4 py-1.5 rounded-full font-label-md text-[11px] font-bold whitespace-nowrap active:scale-95 transition-all cursor-pointer border-none outline-none ${
                (filt === 'All' && activeFilter === 'All') || (activeFilter === filt)
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {filt === 'All' ? 'All Notifications' : filt}
            </button>
          ))}
        </div>
      </header>

      {/* Overview Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        
        {/* Stat 1 */}
        <div className="md:col-span-1 bg-white border border-outline-variant/35 p-stack-md rounded-xl shadow-sm flex items-center gap-stack-md">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[26px]">priority_high</span>
          </div>
          <div className="text-left">
            <p className="font-label-sm text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Critical Alerts</p>
            <p className="font-headline-sm text-lg font-black text-on-surface mt-0.5">
              {String(criticalCount).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="md:col-span-1 bg-white border border-outline-variant/35 p-stack-md rounded-xl shadow-sm flex items-center gap-stack-md">
          <div className="w-12 h-12 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-[26px]">assignment</span>
          </div>
          <div className="text-left">
            <p className="font-label-sm text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Unread Alerts</p>
            <p className="font-headline-sm text-lg font-black text-on-surface mt-0.5">
              {String(activeTasksCount).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* Next Deadline Promo Card */}
        <div className="md:col-span-2 bg-primary text-on-primary p-stack-md rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden gap-4 text-left border-none">
          <div className="relative z-10">
            <p className="font-label-md text-[10px] font-bold uppercase tracking-wider opacity-85">Next Pending Deadline</p>
            <h3 className="font-headline-sm text-base font-extrabold mt-1">Python Final AI Project</h3>
            <p className="text-[11px] opacity-90 mt-1 font-light">Due in 2 days, 4 hours</p>
          </div>
          <div className="relative z-10 shrink-0 self-end sm:self-center">
            <button 
              onClick={() => navigate('/student/exams')}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer outline-none"
            >
              Submit Now
            </button>
          </div>
          {/* Decorative blur ball */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

      </div>

      {/* List View Notifications */}
      <div className="bg-white border border-outline-variant/35 rounded-xl overflow-hidden shadow-sm mt-6">
        
        <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center select-none bg-surface-container-low/30">
          <h3 className="font-headline-sm text-sm font-bold text-on-surface">Recent Alerts</h3>
          <button 
            onClick={handleMarkAllRead}
            className="text-primary font-bold bg-transparent text-xs hover:underline border-none cursor-pointer outline-none"
          >
            Mark all as read
          </button>
        </div>

        {filteredAlerts.length > 0 ? (
          <div className="divide-y divide-outline-variant/15 text-left">
            {filteredAlerts.map((item) => (
              <div 
                key={item.id} 
                className={`group flex flex-col md:flex-row gap-5 p-5 hover:bg-surface-container-low/40 cursor-pointer transition-colors duration-200 border-l-4 ${item.borderStyle} ${
                  item.unread ? 'bg-primary/5 font-semibold shadow-inner' : 'bg-white font-normal'
                }`}
              >
                {/* Icon wrapper */}
                <div 
                  onClick={() => handleToggleRead(item.id)}
                  className="flex-shrink-0 cursor-pointer w-fit"
                  title="Click to toggle read state"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border border-outline-variant/20 ${item.iconStyle}`}>
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                </div>

                {/* Description details */}
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 select-none">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.priority === 'Urgent' ? (
                        <span className="bg-error/10 text-error px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                          Urgent
                        </span>
                      ) : (
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                          {item.category}
                        </span>
                      )}
                      <h4 className="font-body-lg text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-outline font-medium">{item.time}</span>
                  </div>
                  
                  <p className="font-body-md text-xs text-on-surface-variant font-light leading-relaxed max-w-3xl pt-1">
                    {item.desc}
                  </p>

                  {/* Contextual actions inside cards */}
                  {item.category === 'Fees' && (
                    <div className="flex gap-3 pt-3 flex-wrap">
                      <button 
                        onClick={() => navigate('/student/payments')}
                        className="bg-primary text-on-primary py-2 px-5 border-none rounded-lg text-[10px] font-bold cursor-pointer hover:bg-primary/95 transition-all shadow-sm"
                      >
                        Pay Balance
                      </button>
                      <button 
                        onClick={() => setIsFeeDetailOpen(true)}
                        className="text-on-surface-variant hover:text-on-surface bg-surface-container py-2 px-5 border border-outline-variant/40 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                      >
                        View Invoice
                      </button>
                    </div>
                  )}

                  {item.category === 'Exams' && (
                    <div className="flex gap-3 pt-3">
                      <button 
                        onClick={() => {
                          triggerToast("Exam Schedule PDF successfully downloading...");
                        }}
                        className="bg-primary-container text-on-primary-container py-2 px-5 border-none rounded-lg text-[10px] font-bold cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                      >
                        Download Schedule
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 flex flex-col items-center justify-center text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl opacity-40">notifications_off</span>
            <p className="font-bold text-xs mt-2">No active notifications found.</p>
            <p className="text-[10px] text-outline mt-1 max-w-xs">
              Check back later or adjust filters to view archived notices.
            </p>
          </div>
        )}

        {/* Load more trigger bar */}
        <div className="p-3 bg-surface border-t border-outline-variant/20 text-center select-none shrink-0 border-none">
          <button 
            onClick={handleLoadMore}
            className="bg-transparent border-none outline-none font-bold text-xs text-primary hover:underline cursor-pointer py-1"
          >
            {loadedMore ? 'No More Notifications' : 'Load More Notifications'}
          </button>
        </div>

      </div>

      {/* MODAL 1: semester fee transaction detailed report */}
      {isFeeDetailOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">receipt_long</span>
                <h3 className="text-base font-bold text-on-surface">Tuition Fees Invoice Summary</h3>
              </div>
              <button 
                onClick={() => setIsFeeDetailOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-y-3 leading-normal font-medium text-left">
                <div>
                  <p className="text-outline">Invoice Code</p>
                  <p className="font-bold text-on-surface mt-0.5">INV-2026-90812</p>
                </div>
                <div>
                  <p className="text-outline">Due Date</p>
                  <p className="font-bold text-error mt-0.5">Friday, June 05, 2026</p>
                </div>
                <div>
                  <p className="text-outline">Billed Candidate</p>
                  <p className="font-bold text-on-surface mt-0.5">Arjun Kumar (LX-2024)</p>
                </div>
                <div>
                  <p className="text-outline">Billed Account</p>
                  <p className="font-bold text-on-surface mt-0.5">Laxmi Computer Education</p>
                </div>
              </div>

              <div className="border-t border-outline-variant/20 pt-4 flex justify-between items-center text-sm font-black text-primary">
                <span>Outstanding Tuition Balance:</span>
                <span>$450.00</span>
              </div>

              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-[10px] leading-relaxed text-on-primary-container">
                ℹ️ Tuition installments can be settled dynamically via credit card, UPI gateways, or local bank transfers. Delayed payments attract a 2.5% late interest charge.
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    setIsFeeDetailOpen(false);
                    navigate('/student/payments');
                  }}
                  className="flex-grow bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all shadow-md"
                >
                  Pay Now
                </button>
                <button 
                  onClick={() => setIsFeeDetailOpen(false)}
                  className="bg-surface-container text-on-surface-variant py-2.5 px-6 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Notifications;
