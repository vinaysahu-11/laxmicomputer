import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left">
      <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/10 pb-2">
        <span className="material-symbols-outlined text-primary text-lg">bolt</span>
        <h4 className="font-headline-sm text-sm font-bold">Quick Actions</h4>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <button 
          onClick={() => navigate('/teacher/attendance')}
          className="p-3 bg-surface hover:bg-primary/5 border border-outline-variant/30 rounded-lg text-left transition-all duration-150 cursor-pointer flex flex-col gap-1 text-primary font-bold outline-none"
        >
          <span className="material-symbols-outlined text-base">co_present</span>
          <span>Attendance</span>
        </button>
        <button 
          onClick={() => navigate('/teacher/materials')}
          className="p-3 bg-surface hover:bg-primary/5 border border-outline-variant/30 rounded-lg text-left transition-all duration-150 cursor-pointer flex flex-col gap-1 text-primary font-bold outline-none"
        >
          <span className="material-symbols-outlined text-base">upload_file</span>
          <span>Upload Notes</span>
        </button>
        <button 
          onClick={() => navigate('/teacher/exams')}
          className="p-3 bg-surface hover:bg-primary/5 border border-outline-variant/30 rounded-lg text-left transition-all duration-150 cursor-pointer flex flex-col gap-1 text-primary font-bold outline-none"
        >
          <span className="material-symbols-outlined text-base">quiz</span>
          <span>Create Test</span>
        </button>
        <button 
          onClick={() => navigate('/teacher/notifications')}
          className="p-3 bg-surface hover:bg-primary/5 border border-outline-variant/30 rounded-lg text-left transition-all duration-150 cursor-pointer flex flex-col gap-1 text-primary font-bold outline-none"
        >
          <span className="material-symbols-outlined text-base">notifications_active</span>
          <span>Alert Students</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
