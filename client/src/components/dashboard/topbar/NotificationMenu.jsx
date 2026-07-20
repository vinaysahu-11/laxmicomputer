import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchNotifications = async () => {
        try {
          const response = await api.get('/notifications');
          setAlerts(response.data || []);
        } catch (err) {
          console.error('Error fetching notifications:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchNotifications();
    }
  }, [isOpen]);

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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-surface-container hover:bg-secondary-container/45 text-on-surface-variant hover:text-primary flex items-center justify-center transition-all relative border border-outline-variant/40"
      >
        <span className="material-symbols-outlined text-xl">notifications</span>
        {alerts.length > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-surface border border-outline-variant rounded-2xl shadow-lg overflow-hidden z-50 animate-fade-in">
          <div className="p-4 border-b border-outline-variant/60 flex justify-between items-center bg-surface-container-low">
            <span className="font-label-md font-bold text-on-surface">Notifications</span>
            <span className="text-[10px] text-primary uppercase font-bold tracking-wider cursor-pointer hover:underline">Mark all read</span>
          </div>
          <div className="divide-y divide-outline-variant/40 max-h-64 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-on-surface-variant text-xs">
                Syncing alerts...
              </div>
            ) : alerts.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant text-xs">
                No active announcements.
              </div>
            ) : (
              alerts.map((item) => (
                <div key={item._id} className="p-4 hover:bg-secondary-container/10 transition-colors cursor-pointer text-left">
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-snug">
                    <span className="font-semibold block text-on-surface text-xs mb-0.5">{item.title}</span>
                    {item.content}
                  </p>
                  <span className="text-[10px] text-outline font-semibold mt-1.5 block">{formatTime(item.createdAt)}</span>
                </div>
              ))
            )}
          </div>
          <div className="p-3 text-center border-t border-outline-variant/60 bg-surface-container-lowest">
            <span className="text-xs text-primary font-bold hover:underline cursor-pointer">View all alerts</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
