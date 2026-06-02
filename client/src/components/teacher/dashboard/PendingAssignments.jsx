import React from 'react';
import { useNavigate } from 'react-router-dom';

const PendingAssignments = () => {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-6 rounded-xl text-left border border-outline-variant/30 hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
      <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-4">Upcoming Exams</h3>
      
      <div className="space-y-4">
        
        {/* Exam Item 1 */}
        <div 
          onClick={() => navigate('/teacher/exams')}
          className="flex items-center justify-between p-3 bg-surface-container-low hover:bg-surface-container rounded-lg cursor-pointer transition-colors border border-outline-variant/10 text-xs"
        >
          <div className="flex items-center gap-3">
            <div className="bg-error-container text-error w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">assignment_late</span>
            </div>
            <div>
              <p className="font-label-md font-bold text-on-surface">Mid-Term Python</p>
              <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Tomorrow, 10:00 AM</p>
            </div>
          </div>
          <span className="bg-error/10 text-error text-[10px] px-2 py-1 rounded font-bold border border-error/15 shrink-0 select-none">
            HIGH PRIO
          </span>
        </div>

        {/* Exam Item 2 */}
        <div 
          onClick={() => navigate('/teacher/exams')}
          className="flex items-center justify-between p-3 bg-surface-container-low hover:bg-surface-container rounded-lg cursor-pointer transition-colors border border-outline-variant/10 text-xs"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary-container/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">event</span>
            </div>
            <div>
              <p className="font-label-md font-bold text-on-surface">UX Research Quiz</p>
              <p className="text-[10px] text-on-surface-variant font-light mt-0.5">24 Oct, 02:30 PM</p>
            </div>
          </div>
          <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded font-bold border border-primary/15 shrink-0 select-none">
            STANDARD
          </span>
        </div>

      </div>
    </div>
  );
};

export default PendingAssignments;
