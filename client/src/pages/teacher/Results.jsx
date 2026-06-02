import React, { useState } from 'react';

const Results = () => {
  // Page Notification Toasts
  const [toastMessage, setToastMessage] = useState(null);

  // Modal Dialogue overlays
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Sheet Tab selection
  const [sheetTab, setSheetTab] = useState('Theory'); // Theory, Practical, Final
  const [selectedSemester, setSelectedSemester] = useState('Semester II');

  // File Upload State
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Stateful student list to allow direct grade entry & dynamic recalculation
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Rahul Varma', 
      roll: 'LA-2024-001', 
      attendance: 95, 
      midTerm: 38, 
      finalExam: 58, 
      practicalMid: 19,
      practicalFinal: 38,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLC_eavHqD0EJrKP2i9iwNStv6f3h0aVLK8gNVdGcJwiJpOvlwc1wSN8AgsHC35zK18lOVYxZMgaSsnZlRq74qtZETSk8zvbNFULoqCtYWD44EHePD2ilLRdJ0rnvDDm2bQoT8sATCIsk0LYEn2v2aUAbLlHZ0OHJRTdH9kSvWhYfukyolgzgnaz1S7-K3jfTBfm_JXXUP4qEdfhJg3wM3q8LqD7tEc9zuQuvSxXQtR7cP6zd25fpIt4xUNicGC-NmEQxnzeDGxeAQ',
      initials: 'RV'
    },
    { 
      id: 2, 
      name: 'Sanya Ahmed', 
      roll: 'LA-2024-002', 
      attendance: 88, 
      midTerm: 35, 
      finalExam: 52, 
      practicalMid: 17,
      practicalFinal: 36,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD39KMmbgPDck74dkENKfLZHXASbGts8fe5_kFXNrxjLpeLUHSyW0wgOsD380jMSilqUF9dOQeff90ydDsAZVtYe-pQzjJL2wBdmZlPd5nFUvOlyhHuI7_gDCBQVn8CJ8032jLEooZ1KERHRPrOss0F6CHGMwbovmzzO54jxpVwHz0W4DlUF02EZ5w9oWU17EfgI8TJvU0LlfjtR8Uj3Bc9HRXVdgrK5C7Jw54WxRRS9Pb2lrjSMfx2PY3vEzZt9uW-zeA40hf_F9MN',
      initials: 'SA'
    },
    { 
      id: 3, 
      name: 'Manish Kumar', 
      roll: 'LA-2024-003', 
      attendance: 42, 
      midTerm: 12, 
      finalExam: 22, 
      practicalMid: 8,
      practicalFinal: 15,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAET72k-mG6PXhHx4nLCjCUzwI9zr3j7dDtGjM11HPqUuJViSm3WRDxcQa97W8kxLAF1jQwDZmF_Zjk6ANEqaq1l6RnQRlV5NiteIIgXMXwO-Nv-jNkn-JYwWcVX_zIC9iLZ4ivKzA7hEc0MWvu5KyoqUlD38HbYUKg37NnGNURvL8M93jWNRrmpYgJiT5j2Q_IpDsCD5EWUZclzlj1aWGiqibvdJ1M3uTG3MHvPdXQjFkBCXagIUYuuKxQWS7I3afbnLzoECuiKOUb',
      initials: 'MK'
    },
    { 
      id: 4, 
      name: 'Pooja Lal', 
      roll: 'LA-2024-004', 
      attendance: 90, 
      midTerm: 32, 
      finalExam: 48, 
      practicalMid: 16,
      practicalFinal: 32,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD93R-DdMtrnCsOzoB5DsIcgmS1Gys6KTBwEKoGhTUFGXv7oaUfhPHtYR8tfuTVfnxyakxkpida_WftMTiJvf99XtArySh3eYLIdlEiY_6sozxePfjifXtpnIo84UeC0f_bI_IQfgTqPYKmhV3Y2ji-rsucKGgqdH7jPIkWsaEO8jxflyI6j8cmLkP-csiutrkMmBrWpKgf56fJd4gius72a0_2_Pt-68rZPqwwQ4OGnvUEKaWX0A6uEiCmlGJmpgZckt5VNT2H9vRO',
      initials: 'PL'
    }
  ]);

  // Pagination states
  const [activePage, setActivePage] = useState(1);

  // Trigger Toasts
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Grade updates and totals calculator
  const handleGradeChange = (studentId, examType, value) => {
    const parsedVal = parseInt(value) || 0;
    
    setStudents(prev => prev.map(stu => {
      if (stu.id === studentId) {
        if (examType === 'mid') {
          return { ...stu, midTerm: parsedVal };
        } else if (examType === 'final') {
          return { ...stu, finalExam: parsedVal };
        } else if (examType === 'pracMid') {
          return { ...stu, practicalMid: parsedVal };
        } else if (examType === 'pracFinal') {
          return { ...stu, practicalFinal: parsedVal };
        }
      }
      return stu;
    }));

    triggerToast('📊 Recalculated total grade and status threshold.');
  };

  // Helper: Get student totals based on active tab
  const getStudentResults = (student) => {
    let mid = 0;
    let final = 0;
    let total = 0;
    let maxScore = 100;

    if (sheetTab === 'Theory') {
      mid = student.midTerm;
      final = student.finalExam;
      total = mid + final;
      maxScore = 100;
    } else if (sheetTab === 'Practical') {
      mid = student.practicalMid;
      final = student.practicalFinal;
      total = mid + final;
      maxScore = 60; // viva 20 + practical lab 40
    } else {
      // Final (Theory + Practical combined)
      const theoryTotal = student.midTerm + student.finalExam; // max 100
      const pracTotal = student.practicalMid + student.practicalFinal; // max 60
      total = Math.round(((theoryTotal + pracTotal) / 160) * 100);
      maxScore = 100;
    }

    let status = 'Passing';
    let statusClass = 'bg-primary-container/20 text-primary border border-primary/20';

    const scorePercentage = (total / maxScore) * 100;

    if (scorePercentage >= 90) {
      status = 'Excellent';
      statusClass = 'bg-green-100 text-green-700 border border-green-200';
    } else if (scorePercentage >= 75) {
      status = 'Great';
      statusClass = 'bg-primary-container/20 text-primary border border-primary/20';
    } else if (scorePercentage < 40) {
      status = 'Risk';
      statusClass = 'bg-error-container text-error border border-error/20';
    }

    return { mid, final, total, status, statusClass };
  };

  // Calculate top level metrics dynamically based on current student data
  const totalStudentsEvaluated = students.length;
  
  const studentMetricsList = students.map(s => getStudentResults(s));
  const averagesSum = studentMetricsList.reduce((acc, curr) => acc + curr.total, 0);
  
  // Dynamic metrics
  const classAvg = (averagesSum / totalStudentsEvaluated).toFixed(1);
  const needAttentionCount = studentMetricsList.filter(s => s.total < 40).length;
  const passRatePercentage = Math.round(((studentMetricsList.filter(s => s.total >= 40).length) / totalStudentsEvaluated) * 100);

  // Export PDF mock
  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerToast(`📄 Gradesheet Report printed & downloaded: 'Academic_Transcript_Python_${sessionDate()}.pdf'`);
    }, 2000);
  };

  const sessionDate = () => {
    const today = new Date();
    return `${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
  };

  // File Upload handler simulation
  const handleSpreadsheetBrowse = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const name = files[0].name;
      setUploadFileName(name);
      setIsUploading(true);
      
      // Simulate progress bar loader
      let progress = 0;
      const interval = setInterval(() => {
        progress += 25;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsUploadOpen(false);
            setUploadFileName('');
            setUploadProgress(0);
            
            // Add a mock imported student to show it worked!
            const newStudentObj = {
              id: students.length + 1,
              name: 'Karan Patel',
              roll: 'LA-2024-009',
              attendance: 92,
              midTerm: 34,
              finalExam: 49,
              practicalMid: 16,
              practicalFinal: 31,
              avatar: null,
              initials: 'KP'
            };
            setStudents([...students, newStudentObj]);
            triggerToast(`📈 Spreadsheet "${name}" parsed! Added Karan Patel's grades successfully.`);
          }, 600);
        }
      }, 350);
    }
  };

  return (
    <div className="space-y-8 text-left relative selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce text-xs font-semibold">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Export Controls */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-none">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Results &amp; Analytics</h2>
          <p className="text-on-surface-variant text-sm font-light mt-1">
            Semester II - Web Development &amp; Data Science
          </p>
        </div>
        
        <div className="flex items-center gap-3 select-none shrink-0">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container-high transition-all cursor-pointer bg-transparent outline-none"
          >
            <span className="material-symbols-outlined text-base">
              {isExporting ? 'progress_activity' : 'download'}
            </span>
            <span>{isExporting ? 'Generating...' : 'Export PDF'}</span>
          </button>
          
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-xs hover:bg-primary/90 transition-all shadow-sm border-none cursor-pointer outline-none active:scale-95"
          >
            <span className="material-symbols-outlined text-base">upload</span>
            <span>Upload Sheet</span>
          </button>
        </div>
      </section>

      {/* Summary Widgets Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Class Average */}
        <div className="glass-card p-6 rounded-xl flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0 select-none">
            <span className="material-symbols-outlined text-3xl font-bold">trending_up</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-[11px] font-bold uppercase tracking-tight">Class Average</p>
            <h3 className="font-headline-sm text-2xl font-bold text-primary mt-0.5">{classAvg}%</h3>
            <p className="text-[10px] text-green-600 font-extrabold mt-0.5 select-none">+2.5% from Mid-term</p>
          </div>
        </div>

        {/* Top Score */}
        <div className="glass-card p-6 rounded-xl flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0 select-none">
            <span className="material-symbols-outlined text-3xl font-bold">workspace_premium</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-[11px] font-bold uppercase tracking-tight">Top Score</p>
            <h3 className="font-headline-sm text-2xl font-bold text-tertiary mt-0.5">98/100</h3>
            <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Student: Rahul V.</p>
          </div>
        </div>

        {/* Need Attention */}
        <div className="glass-card p-6 rounded-xl flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-error-container/20 text-error flex items-center justify-center shrink-0 select-none">
            <span className="material-symbols-outlined text-3xl font-bold">error_outline</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-[11px] font-bold uppercase tracking-tight">Need Attention</p>
            <h3 className="font-headline-sm text-2xl font-bold text-error mt-0.5">{needAttentionCount} Students</h3>
            <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Below 40% threshold</p>
          </div>
        </div>

        {/* Pass Rate */}
        <div className="glass-card p-6 rounded-xl flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0 select-none">
            <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-[11px] font-bold uppercase tracking-tight">Pass Rate</p>
            <h3 className="font-headline-sm text-2xl font-bold text-secondary mt-0.5">{passRatePercentage}%</h3>
            <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Target: 95%</p>
          </div>
        </div>

      </div>

      {/* Performance Trends & Insights Asymmetric Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column Bar Chart (Span 2) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-xl text-xs font-semibold">
          <div className="flex items-center justify-between mb-8 select-none">
            <div>
              <h4 className="font-headline-sm text-sm font-bold text-on-surface">Performance Trends</h4>
              <p className="text-on-surface-variant font-light mt-0.5">Unit Test Comparison</p>
            </div>
            
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="bg-surface-container-low border-none rounded-lg py-1.5 px-3 outline-none text-xs font-bold text-on-surface-variant cursor-pointer"
            >
              <option value="Semester II">Semester II</option>
              <option value="Semester I">Semester I</option>
            </select>
          </div>

          {/* SVG Chart columns with high hover tooltips */}
          <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-outline-variant/60 mb-6 select-none relative">
            
            {/* UT Column Jan */}
            <div className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer">
              <div className="chart-bar w-full bg-primary-container/30 group-hover:bg-primary/50 rounded-t-lg transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '65%' : '50%' }}></div>
              <div className="chart-bar w-full bg-primary rounded-t-lg -mt-4 z-10 hover:opacity-95 transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '45%' : '35%' }}></div>
              <span className="absolute top-8 text-[9px] bg-surface-container-highest border border-outline-variant px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity font-extrabold text-on-surface-variant leading-none pointer-events-none">
                UT 1: 45%
              </span>
              <span className="text-[10px] mt-2 font-medium text-on-surface-variant">Jan</span>
            </div>

            {/* UT Column Feb */}
            <div className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer">
              <div className="chart-bar w-full bg-primary-container/30 group-hover:bg-primary/50 rounded-t-lg transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '75%' : '60%' }}></div>
              <div className="chart-bar w-full bg-primary rounded-t-lg -mt-4 z-10 hover:opacity-95 transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '60%' : '48%' }}></div>
              <span className="absolute top-4 text-[9px] bg-surface-container-highest border border-outline-variant px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity font-extrabold text-on-surface-variant leading-none pointer-events-none">
                UT 2: 60%
              </span>
              <span className="text-[10px] mt-2 font-medium text-on-surface-variant">Feb</span>
            </div>

            {/* UT Column Mar */}
            <div className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer">
              <div className="chart-bar w-full bg-primary-container/30 group-hover:bg-primary/50 rounded-t-lg transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '85%' : '70%' }}></div>
              <div className="chart-bar w-full bg-primary rounded-t-lg -mt-4 z-10 hover:opacity-95 transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '72%' : '55%' }}></div>
              <span className="absolute top-2 text-[9px] bg-surface-container-highest border border-outline-variant px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity font-extrabold text-on-surface-variant leading-none pointer-events-none">
                UT 3: 72%
              </span>
              <span className="text-[10px] mt-2 font-medium text-on-surface-variant">Mar</span>
            </div>

            {/* UT Column Apr */}
            <div className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer">
              <div className="chart-bar w-full bg-primary-container/30 group-hover:bg-primary/50 rounded-t-lg transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '60%' : '50%' }}></div>
              <div className="chart-bar w-full bg-primary rounded-t-lg -mt-4 z-10 hover:opacity-95 transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '55%' : '42%' }}></div>
              <span className="absolute top-10 text-[9px] bg-surface-container-highest border border-outline-variant px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity font-extrabold text-on-surface-variant leading-none pointer-events-none">
                Midterm: 55%
              </span>
              <span className="text-[10px] mt-2 font-medium text-on-surface-variant">Apr</span>
            </div>

            {/* UT Column May */}
            <div className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer">
              <div className="chart-bar w-full bg-primary-container/30 group-hover:bg-primary/50 rounded-t-lg transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '95%' : '80%' }}></div>
              <div className="chart-bar w-full bg-primary rounded-t-lg -mt-4 z-10 hover:opacity-95 transition-all duration-300" style={{ height: selectedSemester === 'Semester II' ? '88%' : '75%' }}></div>
              <span className="absolute top-0 text-[9px] bg-surface-container-highest border border-outline-variant px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity font-extrabold text-on-surface-variant leading-none pointer-events-none">
                UT 4: 88%
              </span>
              <span className="text-[10px] mt-2 font-medium text-on-surface-variant">May</span>
            </div>

          </div>

          {/* Chart Legends */}
          <div className="flex items-center gap-6 justify-center select-none text-[9px]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              <span className="font-bold uppercase tracking-wider text-on-surface-variant">Theory Marks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-container/40"></div>
              <span className="font-bold uppercase tracking-wider text-on-surface-variant">Practical Marks</span>
            </div>
          </div>
        </div>

        {/* Insights & Top Performers Card (Span 1) */}
        <div className="glass-card p-6 rounded-xl overflow-hidden relative flex flex-col justify-between">
          <div>
            <h4 className="font-headline-sm text-sm font-bold text-on-surface mb-6 select-none uppercase tracking-wider text-outline">Class Insight</h4>
            
            <div className="space-y-4">
              <div className="p-3 bg-secondary-container/20 rounded-lg border-l-4 border-secondary text-left select-none leading-relaxed">
                <p className="font-bold text-[10px] text-on-secondary-container uppercase tracking-tight">Improvement Spotted</p>
                <p className="text-body-sm text-[12px] text-on-surface-variant font-light mt-0.5">
                  The morning batch has shown a 12% increase in logic-building assignments compared to the evening batch.
                </p>
              </div>

              <div className="pt-4 text-left">
                <p className="font-label-sm text-on-surface-variant text-[10px] font-bold uppercase mb-3 tracking-wider select-none">Top Students This Month</p>
                
                <div className="space-y-3 font-semibold text-xs">
                  {/* Top student 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-[10px] select-none text-primary">RV</div>
                      <span className="text-on-surface text-[13px] font-bold">Rahul Varma</span>
                    </div>
                    <span className="text-primary font-bold text-[13px]">98</span>
                  </div>
                  
                  {/* Top student 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center font-bold text-[10px] select-none text-tertiary">SA</div>
                      <span className="text-on-surface text-[13px] font-bold">Sanya Ahmed</span>
                    </div>
                    <span className="text-primary font-bold text-[13px]">95</span>
                  </div>

                  {/* Top student 3 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-[10px] select-none text-secondary">KP</div>
                      <span className="text-on-surface text-[13px] font-bold">Karan Patel</span>
                    </div>
                    <span className="text-primary font-bold text-[13px]">92</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background blurred sphere decoration */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none select-none"></div>
        </div>

      </div>

      {/* Grade Entry Table Section */}
      <div className="glass-card rounded-xl overflow-hidden shadow-sm">
        
        {/* Table header with tabs */}
        <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          <h4 className="font-headline-sm text-sm font-bold text-on-surface">Grading Sheet - Python Advanced</h4>
          
          <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-tight">
            <div className="flex p-1 bg-surface-container-low rounded-lg border border-outline-variant">
              <button 
                onClick={() => { setSheetTab('Theory'); triggerToast('📝 Switched to Theory Markings.'); }}
                type="button"
                className={`px-3 py-1 rounded cursor-pointer border-none outline-none font-bold transition-all ${
                  sheetTab === 'Theory' ? 'bg-white shadow-sm text-on-surface font-extrabold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Theory
              </button>
              
              <button 
                onClick={() => { setSheetTab('Practical'); triggerToast('🔬 Switched to Practical/Lab registers.'); }}
                type="button"
                className={`px-3 py-1 rounded cursor-pointer border-none outline-none font-bold transition-all ${
                  sheetTab === 'Practical' ? 'bg-white shadow-sm text-on-surface font-extrabold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Practical
              </button>
              
              <button 
                onClick={() => { setSheetTab('Final'); triggerToast('🎓 Viewing combined final ratings.'); }}
                type="button"
                className={`px-3 py-1 rounded cursor-pointer border-none outline-none font-bold transition-all ${
                  sheetTab === 'Final' ? 'bg-white shadow-sm text-on-surface font-extrabold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Final
              </button>
            </div>
          </div>
        </div>

        {/* Grade Sheet Table grid */}
        <div className="overflow-x-auto text-xs font-semibold text-left">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low text-on-surface-variant font-bold text-xs border-b border-outline-variant/15 select-none">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Attendance</th>
                
                {/* Dynamically shift labels based on selected tab */}
                <th className="px-6 py-4">
                  {sheetTab === 'Theory' ? 'Mid-Term (40)' : sheetTab === 'Practical' ? 'Viva (20)' : 'Theory (100)'}
                </th>
                <th className="px-6 py-4">
                  {sheetTab === 'Theory' ? 'Final Exam (60)' : sheetTab === 'Practical' ? 'Lab Work (40)' : 'Practical (60)'}
                </th>
                
                <th className="px-6 py-4">Total (100)</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-outline-variant/10 font-light text-xs">
              {students.map((student) => {
                const results = getStudentResults(student);
                return (
                  <tr key={student.id} className="hover:bg-surface-container transition-colors">
                    
                    {/* Student Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {student.avatar ? (
                          <img 
                            alt={student.name} 
                            className="w-8 h-8 rounded-full border border-outline-variant object-cover shrink-0 select-none" 
                            src={student.avatar}
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px] select-none shrink-0 border border-outline-variant/10`}>
                            {student.initials}
                          </div>
                        )}
                        <span className="text-sm font-bold text-on-surface truncate">{student.name}</span>
                      </div>
                    </td>
                    
                    {/* Roll No */}
                    <td className="px-6 py-4 text-on-surface-variant font-medium select-none shrink-0">{student.roll}</td>
                    
                    {/* Attendance indicator */}
                    <td className="px-6 py-4 shrink-0 select-none">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 max-w-[80px] overflow-hidden border border-outline-variant/10">
                        <div 
                          className={`h-1.5 rounded-full ${student.attendance < 50 ? 'bg-error' : 'bg-primary'}`} 
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </td>
                    
                    {/* Midterm score field input */}
                    <td className="px-6 py-4 shrink-0">
                      {sheetTab === 'Final' ? (
                        <span className="font-bold text-on-surface select-none">
                          {student.midTerm + student.finalExam}
                        </span>
                      ) : (
                        <input 
                          type="number"
                          value={sheetTab === 'Theory' ? student.midTerm : student.practicalMid}
                          onChange={(e) => handleGradeChange(
                            student.id, 
                            sheetTab === 'Theory' ? 'mid' : 'pracMid', 
                            e.target.value
                          )}
                          className="w-16 bg-transparent border-none border-b border-outline focus:border-primary focus:ring-0 text-center py-1 font-bold outline-none text-xs"
                        />
                      )}
                    </td>
                    
                    {/* Final exam score field input */}
                    <td className="px-6 py-4 shrink-0">
                      {sheetTab === 'Final' ? (
                        <span className="font-bold text-on-surface select-none">
                          {student.practicalMid + student.practicalFinal}
                        </span>
                      ) : (
                        <input 
                          type="number"
                          value={sheetTab === 'Theory' ? student.finalExam : student.practicalFinal}
                          onChange={(e) => handleGradeChange(
                            student.id, 
                            sheetTab === 'Theory' ? 'final' : 'pracFinal', 
                            e.target.value
                          )}
                          className={`w-16 bg-transparent border-none border-b border-outline focus:border-primary focus:ring-0 text-center py-1 font-bold outline-none text-xs ${
                            (sheetTab === 'Theory' ? student.finalExam : student.practicalFinal) < 25 ? 'text-error' : ''
                          }`}
                        />
                      )}
                    </td>
                    
                    {/* Total rating column */}
                    <td className="px-6 py-4 shrink-0 select-none">
                      <span className={`font-extrabold text-sm ${results.total < 40 ? 'text-error' : 'text-primary'}`}>
                        {results.total}
                      </span>
                    </td>
                    
                    {/* Status Badge rating */}
                    <td className="px-6 py-4 shrink-0 select-none">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-tighter ${results.statusClass}`}>
                        {results.status}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 bg-surface border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs font-medium text-on-surface-variant italic select-none">
            Showing 1-{students.length} of 48 Students
          </span>
          
          <div className="flex items-center gap-2 select-none text-xs font-bold">
            <button className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container bg-transparent transition-colors cursor-pointer outline-none flex items-center justify-center">
              <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
            </button>
            
            <button 
              onClick={() => setActivePage(1)}
              className={`px-3 py-1.5 rounded-lg border-none cursor-pointer outline-none font-bold ${
                activePage === 1 ? 'bg-primary text-on-primary shadow-sm' : 'hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              1
            </button>
            <button 
              onClick={() => setActivePage(2)}
              className={`px-3 py-1.5 rounded-lg border-none cursor-pointer outline-none font-bold ${
                activePage === 2 ? 'bg-primary text-on-primary shadow-sm' : 'hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              2
            </button>
            <button 
              onClick={() => setActivePage(3)}
              className={`px-3 py-1.5 rounded-lg border-none cursor-pointer outline-none font-bold ${
                activePage === 3 ? 'bg-primary text-on-primary shadow-sm' : 'hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              3
            </button>

            <button className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container bg-transparent transition-colors cursor-pointer outline-none flex items-center justify-center">
              <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer Branding Copyright */}
      <footer className="p-8 border-t border-outline-variant/60 flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant text-xs select-none">
        <p>© 2024 Laxmi Computer Education. All rights reserved.</p>
        <div className="flex gap-6 font-semibold">
          <a className="hover:text-primary transition-colors cursor-pointer">Help Center</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
        </div>
      </footer>

      {/* UPLOAD MODAL: Drag & drop spreadsheet sheets parsing */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl shadow-2xl p-6 border border-outline-variant text-left animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-4 select-none border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">upload</span>
                Upload Grading Spreadsheet
              </h2>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant bg-transparent border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <p className="font-body-md text-on-surface-variant font-light leading-relaxed">
                Import offline theory or practical spreadsheets (CSV/XLSX format) directly into active student transcript portals.
              </p>

              {/* Upload Drop area */}
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center bg-surface-container/10">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">table_chart</span>
                
                <h4 className="font-bold text-on-surface mb-1">
                  {uploadFileName ? `Selected: "${uploadFileName}"` : 'Drag score sheet here'}
                </h4>
                <p className="text-[10px] text-on-surface-variant font-light mb-4">CSV or Excel files accepted</p>
                
                {isUploading ? (
                  <div className="w-full space-y-1.5 select-none pt-1">
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <span className="text-[9px] text-primary font-extrabold animate-pulse">Extracting marks columns... {uploadProgress}%</span>
                  </div>
                ) : (
                  <label className="bg-primary text-on-primary px-4 py-2 rounded font-bold cursor-pointer hover:bg-primary/95 transition-colors border-none outline-none text-[11px]">
                    Choose File
                    <input 
                      type="file" 
                      accept=".csv,.xlsx" 
                      className="hidden" 
                      onChange={handleSpreadsheetBrowse}
                    />
                  </label>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-3 select-none">
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors border-none bg-transparent cursor-pointer outline-none" 
                  onClick={() => setIsUploadOpen(false)} 
                  type="button"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Results;
