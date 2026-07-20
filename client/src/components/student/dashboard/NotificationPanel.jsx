import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notifications');
        // Filter to only show student announcements (either category 'all' or 'student')
        const studentNotifs = (response.data || []).filter(
          (notif) => notif.category === 'all' || notif.category === 'student'
        );
        setNotifications(studentNotifs);
      } catch (err) {
        console.error('Error fetching student notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">notifications</span>
        <span>Recent Academy Announcements</span>
      </h3>

      <div className="space-y-3.5 max-h-[330px] overflow-y-auto pr-1.5 custom-scrollbar">
        {loading ? (
          <div className="py-8 text-center text-on-surface-variant text-xs">
            Syncing announcements...
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-8 text-center text-on-surface-variant text-xs">
            No recent announcements.
          </div>
        ) : (
          notifications.map((notif) => {
            const isImportant = notif.category === 'student'; // categorizing student specific as important
            return (
              <div 
                key={notif._id} 
                className={`p-3 rounded-lg border transition-all flex flex-col gap-1.5 ${
                  isImportant
                    ? 'bg-primary-container/15 border-primary/25'
                    : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/50'
                }`}
              >
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                    isImportant
                      ? 'bg-primary-container text-on-primary-container border-primary-container'
                      : 'bg-surface-container text-on-surface-variant border-outline-variant/40'
                  }`}>
                    {notif.category}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">{formatTime(notif.createdAt)}</span>
                </div>

                <div>
                  <h4 className="font-label-sm text-label-sm font-bold text-on-surface leading-snug">{notif.title}</h4>
                  <p className="text-[11px] text-on-surface-variant mt-1.5 font-light leading-relaxed">
                    {notif.content}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
