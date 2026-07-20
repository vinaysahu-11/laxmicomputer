import React, { useState, useEffect } from 'react';
import { getNotifications, createNotification, deleteNotification } from '../../services/homepageService';

const Notifications = () => {
  // 1. Initial State Data for System Alerts Inbox (Admin System States)
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-1',
      title: 'Database Sync Completed',
      time: 'Just now',
      description: 'The local MongoDB configuration and indexing operations completed successfully. Seeding arrays have populated 5 collections.',
      type: 'success',
      unread: false,
      icon: 'update',
      iconColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
    },
    {
      id: 'alert-2',
      title: 'New Inquiries Awaiting Review',
      time: '2 hours ago',
      description: 'New admission inquiries have been submitted via the public portal contact form. Audit profiles in the Admissions Pipeline.',
      type: 'info',
      unread: true,
      icon: 'person_add',
      iconColor: 'bg-secondary-container text-on-secondary-container'
    }
  ]);

  // 2. Sent History log table ledger
  const [sentHistory, setSentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 3. Search and form draft controllers
  const [searchQuery, setSearchQuery] = useState('');
  const [audience, setAudience] = useState('all'); // 'all', 'teacher', 'student'
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Interaction feedback states
  const [toast, setToast] = useState({ visible: false, message: '' });

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await getNotifications(); // Fetches notices from MongoDB
      
      const mapped = data.map(n => ({
        id: n._id,
        _id: n._id,
        date: new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date(n.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        title: n.title,
        audience: n.category === 'all' ? 'All Students & Staff' : n.category === 'teacher' ? 'Teachers Only' : 'Students Only',
        views: 124, // Simulated views
        status: n.status || 'Delivered'
      }));
      setSentHistory(mapped);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch announcements history from MongoDB');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const triggerToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };

  const handleComposeSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      alert('Please fill out the announcement subject and message content.');
      return;
    }

    try {
      await createNotification({
        title: subject,
        content: message,
        category: audience,
        status: 'active'
      });

      triggerToast(`Announcement "${subject}" published successfully!`);
      setSubject('');
      setMessage('');
      setAudience('all');
      fetchAnnouncements();
    } catch (err) {
      alert('Failed to publish announcement.');
    }
  };

  const handleDeleteAnnouncement = async (id, title) => {
    if (window.confirm(`Are you sure you want to retract the announcement "${title}"?`)) {
      try {
        await deleteNotification(id);
        triggerToast(`Announcement retracted.`);
        fetchAnnouncements();
      } catch (err) {
        alert('Failed to retract announcement.');
      }
    }
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
    triggerToast('Alert dismissed.');
  };

  const getFilteredHistory = () => {
    return sentHistory.filter(hist => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return hist.title.toLowerCase().includes(query) || hist.audience.toLowerCase().includes(query);
      }
      return true;
    });
  };

  const filteredHistory = getFilteredHistory();

  if (loading && sentHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading announcements center...</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg text-left font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Announcements & Alerts</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Compose broadcast bulletins and review active system logs.</p>
        </div>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Left Column: System Alerts Feed */}
        <div className="col-span-12 lg:col-span-5 space-y-gutter">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between min-h-[400px]">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-6 flex items-center justify-between">
                <span>System Inbox</span>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  MongoDB Status
                </span>
              </h3>

              <div className="space-y-4">
                {alerts.map((alertItem) => (
                  <div key={alertItem.id} className="p-4 bg-surface-container rounded-xl flex gap-4 items-start relative group transition-shadow hover:shadow-sm">
                    <button 
                      onClick={() => handleDismissAlert(alertItem.id)}
                      className="absolute top-2 right-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      title="Dismiss Alert"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                    <div className={`w-10 h-10 rounded-lg ${alertItem.iconColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <span className="material-symbols-outlined">{alertItem.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface font-bold leading-none">{alertItem.title}</h4>
                      <p className="text-[10px] text-outline mt-1 font-semibold">{alertItem.time}</p>
                      <p className="text-body-sm text-on-surface-variant font-light mt-3 leading-relaxed">{alertItem.description}</p>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="py-12 text-center text-on-surface-variant font-light italic">
                    Inbox is clear. No active system warning alerts.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Compose Announcement Tool */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div className="text-left space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1">Compose Broadcasting Announcement</h3>
            <p className="text-body-sm text-on-surface-variant font-light mb-6">Create bulletins to display instantly on the public home page noticeboard.</p>
            
            <form onSubmit={handleComposeSubmit} className="space-y-4">
              
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1.5 tracking-wider font-bold">Subject / Title *</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Diwali Holidays announcement" 
                  required
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1.5 tracking-wider font-bold">Target Audience</label>
                  <select 
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-bold text-on-surface cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="all">All Students &amp; Staff</option>
                    <option value="student">Students Only</option>
                    <option value="teacher">Teachers Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1.5 tracking-wider font-bold">Message Content *</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4" 
                  placeholder="Type bulletin announcement message details..." 
                  required
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-primary text-on-primary rounded-lg font-label-md hover:scale-[1.01] active:scale-95 duration-100 flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-base">campaign</span>
                Broadcast Bulletin Announcement
              </button>

            </form>
          </div>
        </div>

      </div>

      {/* Sent Bulletins Ledger History */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden text-left mt-8">
        <div className="px-stack-md py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low flex-wrap gap-4">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Announcements History</h3>
          <div className="relative w-full md:w-64 shrink-0">
            <span className="absolute left-3 top-2.5 text-on-surface-variant material-symbols-outlined text-base">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements..." 
              className="w-full pl-9 pr-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface border-b border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Announcement Title</th>
                <th className="px-6 py-4">Audience</th>
                <th className="px-6 py-4">Broadcast Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant font-light">
              {filteredHistory.map((hist) => (
                <tr key={hist.id} className="hover:bg-surface-container transition-all">
                  <td className="px-6 py-4 font-bold text-on-surface">{hist.title}</td>
                  <td className="px-6 py-4 font-medium text-on-surface">{hist.audience}</td>
                  <td className="px-6 py-4">{hist.date} at {hist.time}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{hist.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteAnnouncement(hist._id, hist.title)}
                      className="p-1.5 hover:bg-error-container/20 text-error rounded-lg transition-colors flex items-center justify-center ml-auto"
                      title="Retract Announcement"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-on-surface-variant">
                    No matching announcements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-Up Notification Toast */}
      {toast.visible && (
        <div className="fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl z-[110] border border-outline-variant/20">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
        </div>
      )}

    </div>
  );
};

export default Notifications;
