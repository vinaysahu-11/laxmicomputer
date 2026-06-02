import React from 'react';

const StudyMaterialOverview = () => {
  const materials = [
    { title: 'React Hooks & State Management Guide', type: 'Lecture Notes', size: '1.2 MB', ext: 'PDF' },
    { title: 'DBMS Semester Exam 2025 Solved Key', type: 'Question Paper', size: '850 KB', ext: 'PDF' },
    { title: 'JavaScript ES6 Reference Sheets', type: 'Reference Sheet', size: '4.5 MB', ext: 'ZIP' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">folder_open</span>
        <span>Study Material & Papers</span>
      </h3>

      <div className="space-y-3.5">
        {materials.map((mat) => (
          <div key={mat.title} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-left flex justify-between items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8.5 h-8.5 bg-primary/10 text-primary border border-primary/20 rounded flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-base">picture_as_pdf</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-label-sm text-label-sm font-bold text-on-surface leading-tight truncate">{mat.title}</h4>
                <p className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider">
                  {mat.type} • {mat.size} ({mat.ext})
                </p>
              </div>
            </div>

            <button 
              type="button" 
              className="text-primary hover:underline text-xs font-bold shrink-0"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialOverview;
