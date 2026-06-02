import React, { useState } from 'react';

const MarkAttendanceForm = ({ onComplete }) => {
  const [course, setCourse] = useState('cs401');
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Smith', present: true },
    { id: 2, name: 'Emily Davis', present: true },
    { id: 3, name: 'Marcus Miller', present: false },
  ]);

  const toggleStudent = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Attendance logged successfully!');
    onComplete();
  };

  return (
    <div className="glass-card rounded-xl p-stack-lg shadow-sm text-left border border-outline-variant/30">
      <h3 className="font-headline-sm text-headline-sm mb-4">Mark Attendance</h3>
      <form onSubmit={handleSubmit} className="space-y-gutter">
        <div className="space-y-1 text-xs">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Select Class</label>
          <select 
            value={course} 
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="cs401">CS-401 Cloud Infrastructure</option>
            <option value="cs402">CS-402 Full Stack Systems</option>
            <option value="cs409">CS-409 Practical Lab</option>
          </select>
        </div>

        <div className="space-y-2">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold text-xs mb-2">Student Roll</p>
          <div className="divide-y divide-outline-variant/10 text-xs">
            {students.map((s) => (
              <div key={s.id} className="py-2.5 flex items-center justify-between gap-3">
                <span className="font-semibold">{s.name}</span>
                <button
                  type="button"
                  onClick={() => toggleStudent(s.id)}
                  className={`px-3 py-1.5 rounded-lg border-none font-bold cursor-pointer transition-all ${
                    s.present ? 'bg-primary text-on-primary' : 'bg-error-container text-on-error-container'
                  }`}
                >
                  {s.present ? 'Present' : 'Absent'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button 
            type="button" 
            onClick={onComplete}
            className="bg-surface-container text-on-surface px-6 py-3 rounded-lg font-label-md hover:bg-surface-container-high transition-all cursor-pointer border border-outline-variant text-xs"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all hover:scale-[1.02] cursor-pointer border-none text-xs"
          >
            Submit Logs
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkAttendanceForm;
