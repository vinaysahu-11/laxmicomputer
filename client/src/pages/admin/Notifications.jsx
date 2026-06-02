import React, { useState } from 'react';

const Notifications = () => {
  // 1. Initial State Data for System Alerts Inbox
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-1',
      title: 'Critical System Failure: Payment Gateway',
      time: '12 mins ago',
      description: 'The integration with Stripe API reported 403 errors during the last 5 transaction attempts. Investigate configuration immediately.',
      type: 'critical',
      unread: true,
      icon: 'report',
      iconColor: 'bg-error-container text-on-error-container',
      actions: [
        { label: 'View Logs', actionKey: 'logs' },
        { label: 'Dismiss', actionKey: 'dismiss' }
      ]
    },
    {
      id: 'alert-2',
      title: 'New Enrollment Spikes',
      time: '2 hours ago',
      description: 'Course "Introduction to Python" has reached 95% capacity for the Fall semester. Consider opening a new batch.',
      type: 'info',
      unread: false,
      icon: 'person_add',
      iconColor: 'bg-secondary-container text-on-secondary-container',
      actions: [
        { label: 'Manage Batch', actionKey: 'manage' }
      ]
    },
    {
      id: 'alert-3',
      title: 'Scheduled Maintenance Complete',
      time: '5 hours ago',
      description: 'System update v2.4.1 successfully deployed. Performance metrics remain within the target threshold.',
      type: 'success',
      unread: false,
      icon: 'update',
      iconColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      actions: [
        { label: 'Details', actionKey: 'details' }
      ]
    },
    {
      id: 'alert-4',
      title: 'New Instructor Review',
      time: 'Yesterday',
      description: 'A student submitted a 5-star review for the Web Development bootcamp. "Excellent course structure!"',
      type: 'review',
      unread: false,
      icon: 'feedback',
      iconColor: 'bg-surface-variant text-on-surface-variant',
      dimmed: true
    }
  ]);

  // 2. Sent History log table ledger
  const [sentHistory, setSentHistory] = useState([
    {
      id: 'hist-1',
      date: 'Oct 12, 2023',
      time: '09:15 AM',
      title: 'Fall Semester Registration Open',
      audience: 'All Students',
      views: 1200,
      emails: 850,
      status: 'Delivered'
    },
    {
      id: 'hist-2',
      date: 'Oct 08, 2023',
      time: '02:30 PM',
      title: 'Exam Center Change - Room 402',
      audience: 'Python Course',
      views: 142,
      emails: 120,
      status: 'Delivered'
    },
    {
      id: 'hist-3',
      date: 'Sep 28, 2023',
      time: '11:00 AM',
      title: 'New Teacher Onboarding Kit',
      audience: 'Teachers Only',
      views: 45,
      emails: 45,
      status: 'Delivered'
    }
  ]);

  // 3. Search and form draft controllers
  const [searchQuery, setSearchQuery] = useState('');
  const [audience, setAudience] = useState('All Students & Staff');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailSync, setEmailSync] = useState(false);

  // Interaction feedback states
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedStatus, setPublishedStatus] = useState(null);

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Inbox interactive handlers
  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, unread: false })));
    triggerToast('All system inbox alerts marked as read.');
  };

  const handleAlertAction = (alertId, actionKey) => {
    if (actionKey === 'dismiss') {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      triggerToast('Alert dismissed successfully.');
    } else if (actionKey === 'logs') {
      triggerToast('Fetching Stripe integration API debug logs...', 'info');
    } else if (actionKey === 'manage') {
      triggerToast('Redirecting to Course Batches planner utility...', 'info');
    } else if (actionKey === 'details') {
      triggerToast('System update v2.4.1 deployment checklist: 100% operational.', 'info');
    }
  };

  // Broadcast publisher simulation
  const handlePublishBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      triggerToast('Subject title and message content are required.', 'error');
      return;
    }

    setIsPublishing(true);
    
    setTimeout(() => {
      // Create new sent announcement object
      const now = new Date();
      const formatTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formatDate = now.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' });

      const newBroadcast = {
        id: `hist-${Date.now()}`,
        date: formatDate,
        time: formatTime,
        title: subject,
        audience: audience === 'All Students & Staff' ? 'All Students' : audience.replace(' Only', ''),
        views: 0,
        emails: emailSync ? 1 : 0,
        status: 'Delivered'
      };

      setSentHistory(prev => [newBroadcast, ...prev]);
      setIsPublishing(false);
      setPublishedStatus('success');

      triggerToast('Global broadcast published and student portals updated!', 'success');

      // Reset form variables
      setSubject('');
      setMessage('');
      setEmailSync(false);

      // Revert publish button state after success message
      setTimeout(() => {
        setPublishedStatus(null);
      }, 3000);
    }, 1500);
  };

  const handleExportData = () => {
    triggerToast('Exporting notification broadcast logs history... CSV ready.', 'success');
  };

  // 4. Client Search Filter Resolver
  const filteredAlerts = alerts.filter(a => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return a.title.toLowerCase().includes(query) || a.description.toLowerCase().includes(query);
  });

  const filteredHistory = sentHistory.filter(h => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return h.title.toLowerCase().includes(query) || h.audience.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-stack-lg text-left relative">
      
      {/* Page Header */}
      <div className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Notifications Hub</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Manage system-wide alerts, broadcast new announcements, and track the communication history across the academy.
          </p>
        </div>
        <div className="flex gap-stack-sm shrink-0">
          <button 
            onClick={() => {
              const element = document.getElementById('broadcast-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.classList.add('ring-2', 'ring-primary/40');
                setTimeout(() => element.classList.remove('ring-2', 'ring-primary/40'), 2000);
              }
            }}
            className="flex items-center gap-2 px-stack-md py-2.5 bg-primary text-on-primary rounded-lg font-label-md transition-all hover:scale-105 active:scale-95 shadow-sm font-semibold text-xs"
          >
            <span className="material-symbols-outlined text-[20px]">campaign</span>
            <span>New Announcement</span>
          </button>
        </div>
      </div>

      {/* Main Grid Canvas */}
      <div className="grid grid-cols-12 gap-gutter items-start">
        
        {/* Left Column: Alerts Inbox (Span 8) */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-sm overflow-hidden text-left">
            <div className="px-stack-lg py-4 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-low/50">
              <h3 className="font-headline-sm text-headline-sm flex items-center gap-2 font-bold text-on-surface">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>inbox</span>
                <span>System Alerts Inbox</span>
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary font-bold px-3 py-1.5 hover:bg-primary-container/20 rounded transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            </div>

            {/* Custom Search bar inside panel for reactive queries */}
            <div className="p-4 border-b border-outline-variant/40 bg-surface-container-lowest flex items-center gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input 
                  type="text"
                  placeholder="Filter inbox alerts and delivery history logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-surface-container border border-outline-variant/50 rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary font-medium"
                />
              </div>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-on-surface-variant hover:text-primary font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="divide-y divide-outline-variant/40 max-h-[500px] overflow-y-auto custom-scrollbar">
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-stack-lg hover:bg-surface-container-low/30 transition-colors flex gap-4 items-start group ${
                    alert.dimmed ? 'opacity-65' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-outline-variant/20 ${alert.iconColor}`}>
                    <span className="material-symbols-outlined text-[20px]">{alert.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1 gap-2 flex-wrap">
                      <h4 className="font-label-md text-label-md font-bold text-on-surface leading-snug">{alert.title}</h4>
                      <span className="text-[10px] text-on-surface-variant font-medium shrink-0">{alert.time}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-3 font-light leading-relaxed">
                      {alert.description}
                    </p>
                    {alert.actions && alert.actions.length > 0 && (
                      <div className="flex gap-2">
                        {alert.actions.map((act) => (
                          <button
                            key={act.actionKey}
                            onClick={() => handleAlertAction(alert.id, act.actionKey)}
                            className={`px-3 py-1 text-[11px] font-bold rounded transition-colors ${
                              act.actionKey === 'logs' || act.actionKey === 'manage'
                                ? 'bg-primary-container/30 text-primary hover:bg-primary-container/60 border border-primary/20'
                                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant border border-outline-variant/30'
                            }`}
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {alert.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0 animate-pulse" title="Unread Alert"></div>
                  )}
                </div>
              ))}

              {filteredAlerts.length === 0 && (
                <div className="p-12 text-center text-on-surface-variant italic font-light text-sm bg-surface-container-low/10">
                  No system alerts currently match your active search logs filter.
                </div>
              )}
            </div>

            <div className="px-stack-lg py-3.5 bg-surface-container/30 text-center border-t border-outline-variant/40">
              <button 
                onClick={() => triggerToast('Loading central audit reports archive registry...', 'info')}
                className="text-xs font-bold text-primary hover:underline uppercase tracking-wider"
              >
                View All Alert History
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Global Broadcast Card (Span 4) */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          <section 
            id="broadcast-section"
            className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-md p-stack-lg relative overflow-hidden text-left transition-all duration-200"
          >
            <div className="absolute top-0 right-0 -m-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-stack-md flex items-center gap-2 border-b border-outline-variant/20 pb-2">
              <span className="material-symbols-outlined text-primary">send</span>
              <span>Global Broadcast</span>
            </h3>

            <form onSubmit={handlePublishBroadcastSubmit} className="space-y-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-bold uppercase tracking-wider">Target Audience</label>
                <select 
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer font-medium"
                >
                  <option value="All Students & Staff">All Students &amp; Staff</option>
                  <option value="Students Only">Students Only</option>
                  <option value="Staff/Teachers Only">Staff/Teachers Only</option>
                  <option value="Selected Course Groups">Selected Course Groups</option>
                </select>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-bold uppercase tracking-wider">Subject Title</label>
                <input 
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Campus Holiday Notice" 
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:ring-2 focus:ring-primary focus:border-primary font-medium"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-bold uppercase tracking-wider">Message Content</label>
                <textarea 
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your announcement details here..." 
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:ring-2 focus:ring-primary focus:border-primary font-light"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-secondary-container/20 rounded-lg border border-secondary-container/40">
                <input 
                  type="checkbox"
                  id="email_sync"
                  checked={emailSync}
                  onChange={(e) => setEmailSync(e.target.checked)}
                  className="rounded border-outline text-primary focus:ring-primary cursor-pointer"
                />
                <label htmlFor="email_sync" className="font-label-sm text-label-sm text-on-secondary-container font-semibold cursor-pointer">
                  Send as Email notification as well
                </label>
              </div>

              <button 
                type="submit"
                disabled={isPublishing}
                className={`w-full py-3 text-on-primary font-bold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex justify-center items-center gap-2 text-xs uppercase tracking-wider ${
                  publishedStatus === 'success'
                    ? 'bg-green-600'
                    : 'bg-primary hover:bg-surface-tint'
                } ${isPublishing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isPublishing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                    <span>Broadcasting...</span>
                  </>
                ) : publishedStatus === 'success' ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">publish</span>
                    <span>Publish Announcement</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Channels Stats */}
          <section className="bg-surface border border-outline-variant/60 rounded-xl p-stack-lg text-left shadow-sm space-y-4">
            <h4 className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/30 pb-2">
              Channel Performance
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span>Dashboard Reach</span>
                  <span className="text-primary font-extrabold">92%</span>
                </div>
                <div className="h-2 bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span>Email Open Rate</span>
                  <span className="text-tertiary font-extrabold">64%</span>
                </div>
                <div className="h-2 bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full transition-all duration-1000" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sent History Table (Full Width) */}
        <div className="col-span-12">
          <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-sm overflow-hidden text-left">
            <div className="px-stack-lg py-5 border-b border-outline-variant/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/30">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Broadcast Log Ledger</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-light mt-1">
                  Track all previous broadcast messages, target cohorts, and engagement status trails.
                </p>
              </div>
              <div className="flex gap-2 self-start sm:self-center shrink-0">
                <button 
                  onClick={() => triggerToast('Advanced sorting parameters toggle...')}
                  className="flex items-center gap-2 px-4 py-2 border border-outline-variant/70 text-on-surface-variant rounded-lg text-xs font-bold hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  <span>Filter</span>
                </button>
                <button 
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-4 py-2 border border-outline-variant/70 text-on-surface-variant rounded-lg text-xs font-bold hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-surface-container text-[11px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/40">
                    <th className="px-6 py-4">Sent Date</th>
                    <th className="px-6 py-4">Announcement Title</th>
                    <th className="px-6 py-4">Audience</th>
                    <th className="px-6 py-4">Engagement Metrics</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40 font-body-sm text-on-surface font-light">
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-container-low/20 transition-colors">
                      <td className="px-6 py-4 leading-normal whitespace-nowrap">
                        <span className="font-semibold block">{item.date}</span>
                        <span className="text-on-surface-variant text-[10px] block font-medium mt-0.5">{item.time}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-on-surface max-w-xs truncate" title={item.title}>
                        {item.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-secondary-container/45 border border-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
                          {item.audience}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3 font-semibold text-xs text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-primary">visibility</span> 
                            <span>{item.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-tertiary">mail</span> 
                            <span>{item.emails.toLocaleString()}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-xs text-primary font-bold">
                          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span> 
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button 
                          onClick={() => triggerToast(`Opening settings dashboard context configurations for: "${item.title}"`, 'info')}
                          className="material-symbols-outlined text-outline hover:text-primary transition-colors flex items-center justify-center mx-auto"
                        >
                          more_horiz
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredHistory.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-on-surface-variant italic font-light text-sm bg-surface-container-low/10">
                        No previous broadcasts match your active filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

      </div>

      {/* Floating Success Toaster Alert */}
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

export default Notifications;
