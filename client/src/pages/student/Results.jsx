import React, { useState } from 'react';

const Results = () => {
  // Semester filter state
  const [semesterFilter, setSemesterFilter] = useState('Semester 4');

  // Modal and Toast States
  const [toastMessage, setToastMessage] = useState(null);
  const [isDetailedAnalyticsOpen, setIsDetailedAnalyticsOpen] = useState(false);
  const [activeMarksheetDetail, setActiveMarksheetDetail] = useState(null);

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Static semester marksheet data
  const subjectScores = [
    { code: 'CS-401', name: 'Cloud Infrastructure', instructor: 'Prof. Sarah Miller', theory: 65, practical: 28, total: 93, grade: 'A+' },
    { code: 'CS-402', name: 'Full Stack Systems', instructor: 'Prof. David Chen', theory: 58, practical: 29, total: 87, grade: 'A' },
    { code: 'CS-405', name: 'AI & Machine Learning', instructor: 'Prof. Elena Rodriguez', theory: 62, practical: 25, total: 87, grade: 'A' },
    { code: 'CS-409', name: 'Information Security', instructor: 'Prof. James Wilson', theory: 60, practical: 30, total: 90, grade: 'A+' }
  ];

  // Detailed subject analytics data
  const detailedAnalytics = [
    { subject: 'Cloud Infrastructure', theoryAverage: 55, practicalAverage: 24, classHighest: 98, studentPercentile: 'Top 1%' },
    { subject: 'Full Stack Systems', theoryAverage: 50, practicalAverage: 25, classHighest: 94, studentPercentile: 'Top 5%' },
    { subject: 'AI & Machine Learning', theoryAverage: 52, practicalAverage: 22, classHighest: 91, studentPercentile: 'Top 10%' },
    { subject: 'Information Security', theoryAverage: 54, practicalAverage: 26, classHighest: 95, studentPercentile: 'Top 2%' }
  ];

  return (
    <div className="space-y-stack-lg text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[100] bg-primary text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="border-b border-outline-variant/20 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Academic Performance</h2>
          <p className="text-on-surface-variant font-body-md text-xs mt-1">
            {semesterFilter}: Advanced Web Development & Cloud Systems
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <select 
            value={semesterFilter}
            onChange={(e) => {
              setSemesterFilter(e.target.value);
              triggerToast(`Filtered dashboard to ${e.target.value}.`);
            }}
            className="flex items-center bg-white border border-outline px-4 py-2 rounded-lg font-label-md text-xs font-bold focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer"
          >
            <option value="Semester 4">Semester 4</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 1">Semester 1</option>
          </select>
          <button 
            onClick={() => triggerToast("Compiling full academic transcript. Download started.")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold text-xs hover:opacity-90 shadow-sm border-none cursor-pointer active:scale-95 transition-all outline-none"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Full Transcript
          </button>
        </div>
      </header>

      {/* Top Bento Grid: Analytics & Success Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Performance Radar Chart Placeholder */}
        <div className="lg:col-span-8 glass-card rounded-xl p-5 flex flex-col gap-4 bg-white/60">
          <div className="flex justify-between items-center select-none">
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">Skill Distribution</h3>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-label-sm text-[10px] font-bold text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-primary block"></span>Current
              </span>
              <span className="flex items-center gap-1 font-label-sm text-[10px] font-bold text-secondary">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary block"></span>Average
              </span>
            </div>
          </div>
          
          <div className="flex-grow flex items-center justify-center min-h-[300px] relative select-none">
            {/* Custom CSS radar layout */}
            <div className="w-56 h-56 border-2 border-outline-variant/30 rounded-full flex items-center justify-center relative bg-surface-container-low/10">
              <div className="absolute inset-0 border border-outline-variant/20 rounded-full scale-75"></div>
              <div className="absolute inset-0 border border-outline-variant/20 rounded-full scale-50"></div>
              <div className="absolute inset-0 border border-outline-variant/20 rounded-full scale-25"></div>
              
              {/* Star Lines */}
              <div className="absolute w-full h-[1px] bg-outline-variant/20 rotate-0"></div>
              <div className="absolute w-full h-[1px] bg-outline-variant/20 rotate-45"></div>
              <div className="absolute w-full h-[1px] bg-outline-variant/20 rotate-90"></div>
              <div className="absolute w-full h-[1px] bg-outline-variant/20 rotate-135"></div>
              
              {/* Shaded Area pseudo skills */}
              <div 
                className="absolute inset-4 bg-primary/20 border-2 border-primary opacity-80" 
                style={{ clipPath: 'polygon(50% 5%, 90% 25%, 95% 65%, 70% 90%, 30% 90%, 5% 65%, 15% 25%)' }}
              />
              
              {/* Radar Labels */}
              <span className="absolute -top-7 font-bold text-[9px] text-on-surface-variant uppercase tracking-wider">Frontend</span>
              <span className="absolute -right-14 top-1/4 font-bold text-[9px] text-on-surface-variant uppercase tracking-wider">Backend</span>
              <span className="absolute -right-12 bottom-0 font-bold text-[9px] text-on-surface-variant uppercase tracking-wider">DevOps</span>
              <span className="absolute -left-12 bottom-0 font-bold text-[9px] text-on-surface-variant uppercase tracking-wider">Database</span>
              <span className="absolute -left-14 top-1/4 font-bold text-[9px] text-on-surface-variant uppercase tracking-wider">UI/UX</span>
            </div>
          </div>
        </div>

        {/* Success Cards Stack */}
        <div className="lg:col-span-4 flex flex-col gap-gutter text-left">
          
          {/* Top Performance Insight card */}
          <div className="bg-primary-container/15 border-l-4 border-primary p-stack-md rounded-r-xl relative overflow-hidden group border-t border-b border-r border-outline-variant/20 bg-white">
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-6xl text-primary/10 rotate-12 transition-transform group-hover:scale-110 duration-500 pointer-events-none">
              workspace_premium
            </span>
            <h4 className="font-headline-sm text-sm font-bold text-on-primary-container">Top Tier performance</h4>
            <p className="text-[11px] text-on-primary-container/85 leading-relaxed mt-1">
              Ranked #3 in Advanced React Workshop out of 120 enrolled students.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-primary font-black text-sm">
              98% <span className="material-symbols-outlined text-base">trending_up</span>
            </div>
          </div>

          {/* GPA Card */}
          <div className="glass-card p-stack-md rounded-xl hover:-translate-y-0.5 hover:shadow-sm transition-all border-l-4 border-l-tertiary">
            <h4 className="font-label-md text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Average GPA</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline-lg text-2xl font-black text-on-surface">3.88</span>
              <span className="text-on-surface-variant text-[11px] font-medium">/ 4.0</span>
            </div>
            <div className="mt-4 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full w-[92%]" />
            </div>
          </div>

          {/* Attendance Card */}
          <div className="glass-card p-stack-md rounded-xl hover:-translate-y-0.5 hover:shadow-sm transition-all border-l-4 border-l-error">
            <h4 className="font-label-md text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Attendance Rate</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline-lg text-2xl font-black text-on-surface">94%</span>
            </div>
            <p className="font-label-sm text-[10px] text-error font-bold mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm font-bold">warning</span>
              2 Absences remaining this semester
            </p>
          </div>

        </div>

      </div>

      {/* Detailed Results Table Section */}
      <section className="glass-card rounded-xl overflow-hidden shadow-sm mt-6">
        
        <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center select-none bg-surface-container-low/30">
          <div>
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">Semester Marksheet</h3>
            <p className="text-[10px] text-outline font-medium mt-0.5">Spring Session 2026</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                triggerToast("Preparing Print Layout context...");
                window.print();
              }}
              className="p-2 border border-outline-variant bg-white rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center cursor-pointer outline-none"
            >
              <span className="material-symbols-outlined text-base">print</span>
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('https://laxmi-education.in/verify/LX-2024-089');
                triggerToast("Marksheet verification link copied to clipboard!");
              }}
              className="p-2 border border-outline-variant bg-white rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center cursor-pointer outline-none"
            >
              <span className="material-symbols-outlined text-base">share</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-[10px] font-extrabold text-outline uppercase tracking-wider">
                <th className="px-6 py-3.5">Subject Code</th>
                <th className="px-6 py-3.5">Subject Name</th>
                <th className="px-6 py-3.5">Theory (70)</th>
                <th className="px-6 py-3.5">Practical (30)</th>
                <th className="px-6 py-3.5">Total (100)</th>
                <th className="px-6 py-3.5">Grade</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs font-medium">
              {subjectScores.map((score, index) => (
                <tr key={index} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-5 font-bold text-on-surface">{score.code}</td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-on-surface text-xs leading-tight">{score.name}</p>
                    <p className="text-[10px] text-outline mt-0.5 font-medium">{score.instructor}</p>
                  </td>
                  <td className="px-6 py-5 font-mono font-bold text-on-surface">{score.theory}</td>
                  <td className="px-6 py-5 font-mono font-bold text-on-surface">{score.practical}</td>
                  <td className="px-6 py-5 font-mono font-black text-primary text-sm">{score.total}</td>
                  <td className="px-6 py-5">
                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary font-black rounded-full text-[9px] tracking-wider">
                      {score.grade}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => setActiveMarksheetDetail(score)}
                      className="bg-primary/10 text-primary border-none font-bold hover:bg-primary hover:text-white px-3 py-1.5 rounded text-[10px] cursor-pointer transition-all"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

      {/* Bottom Cards: Subject-wise Performance Mini-Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mt-6">
        
        {/* Card 1 */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between gap-4 bg-white/60">
          <div className="flex items-center justify-between">
            <span className="p-2 bg-primary/10 rounded-lg text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">cloud</span>
            </span>
            <span className="text-primary font-black text-[9px] uppercase bg-primary/5 px-2 py-0.5 rounded">Top 1%</span>
          </div>
          <div className="text-left">
            <h4 className="font-label-md text-xs font-bold text-on-surface">Cloud Infra</h4>
            <div className="flex items-end gap-1 h-10 mt-3 select-none">
              <div className="flex-1 bg-primary-container/30 h-1/2 rounded-t-sm" />
              <div className="flex-1 bg-primary-container/30 h-3/4 rounded-t-sm" />
              <div className="flex-1 bg-primary h-full rounded-t-sm" />
              <div className="flex-1 bg-primary-container/30 h-2/3 rounded-t-sm" />
              <div className="flex-1 bg-primary-container/30 h-[80%] rounded-t-sm" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between gap-4 bg-white/60">
          <div className="flex items-center justify-between">
            <span className="p-2 bg-tertiary/10 rounded-lg text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">code</span>
            </span>
            <span className="text-tertiary font-black text-[9px] uppercase bg-tertiary/5 px-2 py-0.5 rounded">Top 5%</span>
          </div>
          <div className="text-left">
            <h4 className="font-label-md text-xs font-bold text-on-surface">Full Stack</h4>
            <div className="flex items-end gap-1 h-10 mt-3 select-none">
              <div className="flex-1 bg-tertiary-container/30 h-2/3 rounded-t-sm" />
              <div className="flex-1 bg-tertiary h-full rounded-t-sm" />
              <div className="flex-1 bg-tertiary-container/30 h-1/2 rounded-t-sm" />
              <div className="flex-1 bg-tertiary-container/30 h-3/4 rounded-t-sm" />
              <div className="flex-1 bg-tertiary-container/30 h-1/3 rounded-t-sm" />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between gap-4 bg-white/60">
          <div className="flex items-center justify-between">
            <span className="p-2 bg-error/10 rounded-lg text-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">security</span>
            </span>
            <span className="text-error font-black text-[9px] uppercase bg-error/5 px-2 py-0.5 rounded">Top 2%</span>
          </div>
          <div className="text-left">
            <h4 className="font-label-md text-xs font-bold text-on-surface">Security</h4>
            <div className="flex items-end gap-1 h-10 mt-3 select-none">
              <div className="flex-1 bg-error/15 h-1/3 rounded-t-sm" />
              <div className="flex-1 bg-error/15 h-1/2 rounded-t-sm" />
              <div className="flex-1 bg-error/15 h-2/3 rounded-t-sm" />
              <div className="flex-1 bg-error/15 h-3/4 rounded-t-sm" />
              <div className="flex-1 bg-error h-full rounded-t-sm" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between gap-4 bg-white/60">
          <div className="flex items-center justify-between">
            <span className="p-2 bg-secondary/10 rounded-lg text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">psychology</span>
            </span>
            <span className="text-secondary font-black text-[9px] uppercase bg-secondary/5 px-2 py-0.5 rounded">Top 10%</span>
          </div>
          <div className="text-left">
            <h4 className="font-label-md text-xs font-bold text-on-surface">AI/ML</h4>
            <div className="flex items-end gap-1 h-10 mt-3 select-none">
              <div className="flex-1 bg-secondary-container/30 h-full rounded-t-sm" />
              <div className="flex-1 bg-secondary h-2/3 rounded-t-sm" />
              <div className="flex-1 bg-secondary-container/30 h-3/4 rounded-t-sm" />
              <div className="flex-1 bg-secondary-container/30 h-1/2 rounded-t-sm" />
              <div className="flex-1 bg-secondary-container/30 h-[80%] rounded-t-sm" />
            </div>
          </div>
        </div>

      </div>

      {/* MODAL 1: MARKSHEET ITEM SPECIFIC DETAILED REPORT */}
      {activeMarksheetDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10 space-y-4">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assessment</span>
                <h3 className="text-xs font-bold text-on-surface">Subject Audit: {activeMarksheetDetail.name}</h3>
              </div>
              <button 
                onClick={() => setActiveMarksheetDetail(null)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-left">
              <div className="flex justify-between">
                <span className="text-outline">Subject Code:</span>
                <span className="font-bold text-on-surface">{activeMarksheetDetail.code}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-outline">Theory Score:</span>
                <span className="font-bold text-on-surface font-mono">{activeMarksheetDetail.theory} / 70</span>
              </div>

              <div className="flex justify-between">
                <span className="text-outline">Practical Lab Score:</span>
                <span className="font-bold text-on-surface font-mono">{activeMarksheetDetail.practical} / 30</span>
              </div>

              <div className="flex justify-between border-t border-outline-variant/20 pt-2 font-black text-sm text-primary">
                <span>Aggregated Total:</span>
                <span>{activeMarksheetDetail.total} / 100 ({activeMarksheetDetail.grade})</span>
              </div>

              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-[10px] leading-relaxed">
                📢 <strong>Cohort Average analysis:</strong> Arjun's aggregated {activeMarksheetDetail.total}% is in the{' '}
                <strong>
                  {detailedAnalytics.find(a => a.subject.includes(activeMarksheetDetail.name.split(' ')[0]))?.studentPercentile || 'Top 5%'}
                </strong>{' '}
                of the active learning block.
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setActiveMarksheetDetail(null);
                  triggerToast(`Triggered download of sheet CS-${activeMarksheetDetail.code}`);
                }}
                className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all"
              >
                Download PDF Marksheet
              </button>
              <button 
                onClick={() => setActiveMarksheetDetail(null)}
                className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                Close Audit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Results;
