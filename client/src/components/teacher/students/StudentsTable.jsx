import React from 'react';

const StudentsTable = ({ students, onSelectStudent }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant font-bold">
            <th className="p-4">STUDENT NAME</th>
            <th className="p-4">ROLL NO.</th>
            <th className="p-4">GRADE</th>
            <th className="p-4">ATTENDANCE</th>
            <th className="p-4">STATUS</th>
            <th className="p-4 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
          {students.map((std) => (
            <tr key={std.id} className="hover:bg-surface-container-low/40 transition-colors group">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img 
                    alt={std.name} 
                    className="w-10 h-10 rounded-full border border-outline-variant object-cover shrink-0 select-none" 
                    src={std.avatar} 
                  />
                  <div>
                    <p className="font-semibold text-on-surface text-xs leading-none mb-1">{std.name}</p>
                    <p className="text-[10px] text-on-surface-variant font-light leading-none">{std.email}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 font-label-md text-on-surface-variant font-bold shrink-0">{std.roll}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${
                  std.grade.startsWith('A') 
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                    : std.grade.startsWith('C') 
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-secondary-container text-on-secondary-container'
                }`}>
                  {std.grade}
                </span>
              </td>
              <td className="p-4 select-none">
                <div className="w-32">
                  <div className="flex justify-between mb-1 text-[10px] font-bold text-on-surface leading-none">
                    <span>{std.attendance}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        std.status === 'Critical' ? 'bg-error' : 'bg-primary'
                      }`}
                      style={{ width: `${std.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="p-4 select-none">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  std.status === 'Critical'
                    ? 'bg-error-container/20 text-on-error-container border-error/20'
                    : 'bg-green-100 text-green-700 border-green-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    std.status === 'Critical' ? 'bg-error' : 'bg-green-600'
                  }`}></span>
                  {std.status}
                </span>
              </td>
              <td className="p-4 text-center select-none">
                <button 
                  onClick={() => onSelectStudent(std)}
                  className="p-2 hover:bg-surface-container-high rounded-full transition-colors border-none bg-transparent cursor-pointer outline-none text-on-surface-variant active:scale-90"
                >
                  <span className="material-symbols-outlined text-lg">
                    {std.status === 'Critical' ? 'warning' : 'edit_note'}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
