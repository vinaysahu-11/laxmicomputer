import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpcomingClasses = () => {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-6 rounded-xl text-left border border-outline-variant/30 hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface">Today's Schedule</h3>
        <button 
          onClick={() => navigate('/teacher/classes')}
          className="text-primary bg-transparent border-none cursor-pointer p-0 hover:underline font-label-sm text-xs font-bold outline-none"
        >
          View Calendar
        </button>
      </div>

      <div className="space-y-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant select-none">
        
        {/* Timeline Item 1 */}
        <div className="relative pl-10">
          <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-container border-4 border-white dark:border-inverse-surface z-10"></div>
          <div 
            onClick={() => navigate('/teacher/classes')}
            className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/10 text-xs"
          >
            <p className="font-label-sm text-primary mb-1 font-bold">09:00 AM - 10:30 AM</p>
            <p className="font-label-md font-bold text-on-surface">Advanced Java Programming</p>
            <p className="text-xs text-on-surface-variant mt-1.5 flex items-center gap-1 font-light">
              <span className="material-symbols-outlined text-xs">location_on</span> 
              <span>Lab 04 • B-Tech 3rd Year</span>
            </p>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative pl-10">
          <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-tertiary-container border-4 border-white dark:border-inverse-surface z-10"></div>
          <div 
            onClick={() => navigate('/teacher/classes')}
            className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border-l-4 border-l-tertiary border-y border-r border-outline-variant/10 text-xs"
          >
            <p className="font-label-sm text-tertiary mb-1 font-bold">11:00 AM - 12:30 PM</p>
            <p className="font-label-md font-bold text-on-surface">Data Structures &amp; Algo</p>
            <p className="text-xs text-on-surface-variant mt-1.5 flex items-center gap-1 font-light">
              <span className="material-symbols-outlined text-xs">videocam</span> 
              <span>Online • Section C</span>
            </p>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative pl-10 opacity-60">
          <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-outline-variant border-4 border-white dark:border-inverse-surface z-10"></div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 text-xs">
            <p className="font-label-sm text-on-surface-variant mb-1 font-bold">02:00 PM - 03:30 PM</p>
            <p className="font-label-md font-bold text-on-surface">Workshop: AI Essentials</p>
            <p className="text-xs text-on-surface-variant mt-1.5 flex items-center gap-1 font-light">
              <span className="material-symbols-outlined text-xs">groups</span> 
              <span>Seminar Hall</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UpcomingClasses;
