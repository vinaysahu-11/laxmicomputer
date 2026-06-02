import React, { useState } from 'react';

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock list of global notifications
  const alerts = [
    { id: 1, text: 'New admission inquiry received from Priya.', time: '5m ago' },
    { id: 2, text: 'Payment verification pending for Rohit Varma.', time: '2h ago' },
    { id: 3, text: 'System backup completed successfully.', time: '1d ago' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-surface-container hover:bg-secondary-container/45 text-on-surface-variant hover:text-primary flex items-center justify-center transition-all relative border border-outline-variant/40"
      >
        <span className="material-symbols-outlined text-xl">notifications</span>
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface"></span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-surface border border-outline-variant rounded-2xl shadow-lg overflow-hidden z-50 animate-fade-in">
          <div className="p-4 border-b border-outline-variant/60 flex justify-between items-center bg-surface-container-low">
            <span className="font-label-md font-bold text-on-surface">Notifications</span>
            <span className="text-[10px] text-primary uppercase font-bold tracking-wider cursor-pointer hover:underline">Mark all read</span>
          </div>
          <div className="divide-y divide-outline-variant/40 max-h-64 overflow-y-auto">
            {alerts.map((item) => (
              <div key={item.id} className="p-4 hover:bg-secondary-container/10 transition-colors cursor-pointer text-left">
                <p className="font-body-sm text-body-sm text-on-surface-variant font-light">{item.text}</p>
                <span className="text-[10px] text-outline font-semibold mt-1 block">{item.time}</span>
              </div>
            ))}
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
