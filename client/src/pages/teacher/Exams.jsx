import React, { useState } from 'react';

const Exams = () => {
  // Page States
  const [toastMessage, setToastMessage] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedResumeExam, setSelectedResumeExam] = useState(null);

  // Stats Counters
  const [averageScore, setAverageScore] = useState(78.5);
  const [upcomingCount, setUpcomingCount] = useState(12);

  // New Exam fields (State)
  const [newTitle, setNewTitle] = useState('');
  const [newBatch, setNewBatch] = useState('Web Dev B2');
  const [newDate, setNewDate] = useState('');
  const [newDuration, setNewDuration] = useState('2 Hours');
  const [newQuestionsCount, setNewQuestionsCount] = useState('25');

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Direct Marks Entry state
  const [selectedClass, setSelectedClass] = useState('Python A1');
  const [studentsPython, setStudentsPython] = useState([
    { id: 1, name: 'Ankit Sharma', initials: 'AS', roll: 'LX-2024-001', colorClass: 'bg-primary-fixed text-primary', viva: '', theory: '', isSaved: false },
    { id: 2, name: 'Priya Kumari', initials: 'PK', roll: 'LX-2024-005', colorClass: 'bg-secondary-fixed text-secondary', viva: '18', theory: '72', isSaved: true }
  ]);
  const [studentsWeb, setStudentsWeb] = useState([
    { id: 3, name: 'Rohan Gupta', initials: 'RG', roll: 'LX-2024-012', colorClass: 'bg-tertiary-fixed text-tertiary', viva: '15', theory: '60', isSaved: true },
    { id: 4, name: 'Simran Jit', initials: 'SJ', roll: 'LX-2024-019', colorClass: 'bg-primary-fixed text-primary', viva: '', theory: '', isSaved: false }
  ]);

  // Online Exams List (Stateful to allow interactive launch & draft resolution)
  const [activeExams, setActiveExams] = useState([
    {
      id: 1,
      title: 'Web Dev Fundamentals Q2',
      details: '45 Students • Starts: Today, 2:00 PM',
      icon: 'code',
      bgClass: 'bg-secondary-container text-primary',
      status: 'Launchable',
      actionText: 'Launch'
    },
    {
      id: 2,
      title: 'Database Management Final',
      details: '32 Students • Starts: Tomorrow, 10:00 AM',
      icon: 'database',
      bgClass: 'bg-secondary-container text-primary',
      status: 'Scheduled',
      actionText: 'Scheduled'
    },
    {
      id: 3,
      title: 'Java Architecture Mid-term',
      details: 'Draft • Missing Question Bank',
      icon: 'warning',
      bgClass: 'bg-error-container text-error border-l-4 border-l-error',
      status: 'Draft',
      actionText: 'Resume'
    }
  ]);

  // Trigger Notification Toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Launch online exam click handler
  const handleLaunchExam = (examId, examTitle) => {
    setActiveExams(prev => prev.map(exam => {
      if (exam.id === examId) {
        return {
          ...exam,
          status: 'Live',
          actionText: 'Live Now',
          details: '45 Students • Active Exam Session • 01:45:00 Remaining'
        };
      }
      return exam;
    }));
    triggerToast(`🚀 Live Proctored Exam "${examTitle}" launched! Student portals activated.`);
  };

  // Handle template selection to prefill form
  const handleSelectTemplate = (templateName) => {
    setNewTitle(templateName);
    if (templateName.includes('MCQ')) {
      setNewQuestionsCount('30');
      setNewDuration('45 Min');
    } else if (templateName.includes('Coding')) {
      setNewQuestionsCount('4');
      setNewDuration('3 Hours');
    } else {
      setNewQuestionsCount('1');
      setNewDuration('1.5 Hours');
    }
    setIsCreateOpen(true);
    triggerToast(`📋 Loaded blueprint template: ${templateName}`);
  };

  // Submit test publisher form
  const handlePublishTest = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newExamObj = {
      id: activeExams.length + 1,
      title: newTitle,
      details: `${newBatch === 'Python A1' ? '38' : '45'} Students • Scheduled for ${newDate || 'Next Monday'} (${newDuration})`,
      icon: newTitle.toLowerCase().includes('coding') ? 'code' : 'quiz',
      bgClass: 'bg-secondary-container text-primary',
      status: 'Scheduled',
      actionText: 'Scheduled'
    };

    setActiveExams([newExamObj, ...activeExams]);
    setUpcomingCount(prev => prev + 1);
    setIsCreateOpen(false);
    triggerToast(`🎉 Assessment "${newTitle}" configured & dispatched to batch ${newBatch}!`);
    // reset fields
    setNewTitle('');
    setNewDate('');
  };

  // Handle missing question bank drafts resolution
  const handleOpenResume = (exam) => {
    setSelectedResumeExam(exam);
    setIsResumeOpen(true);
  };

  const handleResolveDraft = (e) => {
    e.preventDefault();
    setActiveExams(prev => prev.map(exam => {
      if (exam.id === selectedResumeExam.id) {
        return {
          ...exam,
          details: '42 Students • Scheduled: Friday, 11:00 AM',
          bgClass: 'bg-secondary-container text-primary',
          status: 'Scheduled',
          actionText: 'Scheduled'
        };
      }
      return exam;
    }));
    setUpcomingCount(prev => prev + 1);
    setIsResumeOpen(false);
    triggerToast(`✅ Question Bank linked successfully! "${selectedResumeExam.title}" is now active.`);
  };

  // Save Direct marks entry input
  const handleSaveMarks = (studentId, studentName, vivaScore, theoryScore, isPython = true) => {
    const listToUpdate = isPython ? studentsPython : studentsWeb;
    const setList = isPython ? setStudentsPython : setStudentsWeb;

    const parsedViva = parseFloat(vivaScore) || 0;
    const parsedTheory = parseFloat(theoryScore) || 0;

    if (parsedViva > 20 || parsedTheory > 80) {
      alert('⚠️ Maximum points allowed are 20 for Viva and 80 for Theory!');
      return;
    }

    setList(listToUpdate.map(stu => {
      if (stu.id === studentId) {
        return { ...stu, viva: vivaScore, theory: theoryScore, isSaved: true };
      }
      return stu;
    }));

    // Dynamic Average score shifting for fun!
    const totalScore = parsedViva + parsedTheory;
    const newAverage = parseFloat(((averageScore * 50 + totalScore - 70) / 50).toFixed(2));
    setAverageScore(newAverage);

    triggerToast(`💾 Grades recorded for ${studentName}! Total Score: ${totalScore}/100.`);
  };

  // Drag and Drop simulation
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processMockUpload(files[0].name);
    }
  };

  const handleFileBrowse = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processMockUpload(files[0].name);
    }
  };

  const processMockUpload = (fileName) => {
    setUploadedFile(fileName);
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      triggerToast(`📄 Automated AI parser successfully processed "${fileName}" and structured 25 questions!`);
    }, 1800);
  };

  const activeStudentList = selectedClass === 'Python A1' ? studentsPython : studentsWeb;

  return (
    <div className="space-y-stack-lg text-left relative selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce text-xs font-semibold">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-none">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Exams &amp; Assessments</h2>
          <p className="font-body-md text-on-surface-variant text-body-md font-light leading-normal">
            Manage online tests, manual marking, and performance tracking.
          </p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary text-on-primary rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md border-none cursor-pointer text-xs outline-none shrink-0"
        >
          <span className="material-symbols-outlined text-sm font-bold">add_circle</span>
          <span>Create Test</span>
        </button>
      </div>

      {/* Bento Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        
        {/* Average Score */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm col-span-1 hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg text-lg select-none">trending_up</span>
            <span className="text-xs font-extrabold text-primary select-none bg-primary/10 px-2 py-0.5 rounded-full">+4.2%</span>
          </div>
          <p className="font-label-md text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Average Score</p>
          <h3 className="font-headline-md text-3xl font-bold text-on-surface mt-1">{averageScore}%</h3>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm col-span-1 hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-lg text-lg select-none">event</span>
            <span className="text-[10px] font-extrabold text-tertiary select-none bg-tertiary/10 px-2.5 py-0.5 rounded">Next: 2h</span>
          </div>
          <p className="font-label-md text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Upcoming Exams</p>
          <h3 className="font-headline-md text-3xl font-bold text-on-surface mt-1">{upcomingCount}</h3>
        </div>

        {/* Glassmorphism Highlight Card */}
        <div className="relative bg-primary-container p-6 rounded-xl border border-white/20 shadow-lg col-span-1 md:col-span-2 overflow-hidden flex flex-col justify-center select-none">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <h4 className="font-headline-sm text-sm font-bold text-on-primary mb-1">Assessment Insights</h4>
          <p className="text-on-primary/85 font-body-sm text-[13px] leading-relaxed mb-4 font-light max-w-md">
            Class B is currently performing 15% better in Python Logic challenges than the academy average.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-semibold text-on-primary backdrop-blur-md">Python Logic</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-semibold text-on-primary backdrop-blur-md">Class B</span>
          </div>
        </div>

      </div>

      {/* Main Work Area split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        
        {/* Left column: Online Exams and Marks table (Span 2) */}
        <div className="lg:col-span-2 space-y-stack-lg">
          
          {/* Active Online Exams list */}
          <div className="space-y-stack-md">
            <div className="flex items-center justify-between select-none">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface">Active Online Exams</h3>
              <button className="text-primary font-label-md text-xs font-bold hover:underline bg-transparent border-none outline-none cursor-pointer">View All</button>
            </div>
            
            <div className="space-y-4">
              {activeExams.map((exam) => (
                <div 
                  key={exam.id} 
                  className={`bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md hover:translate-y-[-2px] transition-all flex items-center gap-4 ${
                    exam.id === 3 && exam.status === 'Draft' ? 'border-l-4 border-l-error' : ''
                  }`}
                >
                  <div className={`h-12 w-12 flex items-center justify-center rounded-lg select-none shrink-0 ${exam.bgClass}`}>
                    <span className="material-symbols-outlined text-xl">{exam.icon}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-label-md font-bold text-on-surface truncate"> {exam.title}</h4>
                    <p className="text-xs text-on-surface-variant font-light mt-0.5 truncate">{exam.details}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 select-none shrink-0">
                    <button 
                      onClick={() => handleSelectTemplate(exam.title)}
                      className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer outline-none rounded-full hover:bg-surface-container"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>

                    {exam.status === 'Launchable' && (
                      <button 
                        onClick={() => handleLaunchExam(exam.id, exam.title)}
                        className="bg-primary-fixed text-on-primary-fixed-variant px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-on-primary transition-all border-none cursor-pointer"
                      >
                        Launch
                      </button>
                    )}

                    {exam.status === 'Scheduled' && (
                      <button className="bg-surface-container text-on-surface-variant/80 px-4 py-1.5 rounded-lg text-xs font-bold cursor-not-allowed border-none">
                        Scheduled
                      </button>
                    )}

                    {exam.status === 'Draft' && (
                      <button 
                        onClick={() => handleOpenResume(exam)}
                        className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity border-none cursor-pointer"
                      >
                        Resume
                      </button>
                    )}

                    {exam.status === 'Live' && (
                      <span className="bg-error-container text-on-error-container text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-lg border border-error/20 flex items-center gap-1.5 animate-pulse">
                        <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
                        LIVE NOW
                      </span>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Marks Entry section */}
          <div className="space-y-stack-md pt-4">
            <div className="flex items-center justify-between select-none">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface">Direct Marks Entry</h3>
              
              <div className="flex gap-2">
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant rounded-lg text-xs py-1.5 px-3 outline-none cursor-pointer font-bold"
                >
                  <option value="Python A1">Python A1</option>
                  <option value="Web Dev B2">Web Dev B2</option>
                </select>
              </div>
            </div>

            <div className="overflow-hidden border border-outline-variant rounded-xl bg-surface-container-lowest">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant font-bold text-xs select-none">
                  <tr>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Roll No.</th>
                    <th className="px-6 py-4">Viva (20)</th>
                    <th className="px-6 py-4">Theory (80)</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 font-light text-xs">
                  {activeStudentList.map((student) => (
                    <tr key={student.id} className="hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${student.colorClass} font-bold flex items-center justify-center text-[10px] select-none shrink-0 border border-outline-variant/10`}>
                            {student.initials}
                          </div>
                          <span className="font-label-md font-bold text-on-surface truncate">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant select-none font-medium shrink-0">{student.roll}</td>
                      <td className="px-6 py-4 shrink-0">
                        <input 
                          type="number"
                          value={student.viva}
                          onChange={(e) => {
                            const val = e.target.value;
                            const setList = selectedClass === 'Python A1' ? setStudentsPython : setStudentsWeb;
                            const currentList = selectedClass === 'Python A1' ? studentsPython : studentsWeb;
                            setList(currentList.map(s => s.id === student.id ? { ...s, viva: val, isSaved: false } : s));
                          }}
                          placeholder="--"
                          disabled={student.isSaved}
                          className={`w-16 bg-transparent border-none border-b border-outline hover:border-primary focus:border-primary focus:ring-0 text-xs py-1 transition-colors outline-none text-center font-bold disabled:opacity-75 disabled:cursor-not-allowed`}
                        />
                      </td>
                      <td className="px-6 py-4 shrink-0">
                        <input 
                          type="number"
                          value={student.theory}
                          onChange={(e) => {
                            const val = e.target.value;
                            const setList = selectedClass === 'Python A1' ? setStudentsPython : setStudentsWeb;
                            const currentList = selectedClass === 'Python A1' ? studentsPython : studentsWeb;
                            setList(currentList.map(s => s.id === student.id ? { ...s, theory: val, isSaved: false } : s));
                          }}
                          placeholder="--"
                          disabled={student.isSaved}
                          className={`w-16 bg-transparent border-none border-b border-outline hover:border-primary focus:border-primary focus:ring-0 text-xs py-1 transition-colors outline-none text-center font-bold disabled:opacity-75 disabled:cursor-not-allowed`}
                        />
                      </td>
                      <td className="px-6 py-4 text-right select-none shrink-0">
                        {student.isSaved ? (
                          <div className="flex justify-end gap-1.5 items-center">
                            <span className="text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border border-secondary-fixed">
                              SAVED
                            </span>
                            <button 
                              onClick={() => {
                                const setList = selectedClass === 'Python A1' ? setStudentsPython : setStudentsWeb;
                                const currentList = selectedClass === 'Python A1' ? studentsPython : studentsWeb;
                                setList(currentList.map(s => s.id === student.id ? { ...s, isSaved: false } : s));
                              }}
                              className="text-primary hover:text-error transition-colors bg-transparent border-none outline-none cursor-pointer font-bold text-[10px]"
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleSaveMarks(student.id, student.name, student.viva, student.theory, selectedClass === 'Python A1')}
                            className="text-primary hover:underline hover:scale-105 active:scale-95 bg-transparent border-none outline-none cursor-pointer font-bold text-xs"
                          >
                            Save
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right column: Dropzone, Templates, Evaluation (Span 1) */}
        <div className="space-y-stack-lg">
          
          {/* File Upload Dropzone */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-surface-container-lowest p-6 rounded-xl border-2 border-dashed flex flex-col items-center text-center transition-all duration-300 ${
              isDragOver ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-outline-variant/60'
            }`}
          >
            <div className="h-16 w-16 bg-primary-fixed rounded-full flex items-center justify-center text-primary mb-4 select-none">
              <span className="material-symbols-outlined text-4xl">upload_file</span>
            </div>
            
            <h4 className="font-headline-sm text-sm font-bold text-on-surface mb-2">Upload Question Paper</h4>
            <p className="text-xs text-on-surface-variant font-light mb-6 leading-relaxed max-w-[200px]">
              {uploadedFile 
                ? `Uploaded file: "${uploadedFile}"` 
                : 'Drag and drop PDF or DOCX files here to start the automated marking configuration.'
              }
            </p>
            
            {isUploading ? (
              <div className="w-full space-y-2 select-none">
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-progress rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span className="text-[10px] text-primary font-bold animate-pulse">Extracting marking keys...</span>
              </div>
            ) : (
              <label className="bg-outline-variant/20 hover:bg-outline-variant/40 text-on-surface font-bold text-xs px-6 py-2.5 rounded-lg transition-colors cursor-pointer border-none outline-none">
                Browse Files
                <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  className="hidden" 
                  onChange={handleFileBrowse}
                />
              </label>
            )}
          </div>

          {/* Quick templates */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm text-left">
            <h4 className="font-label-md font-bold mb-4 flex items-center gap-2 select-none">
              <span className="material-symbols-outlined text-primary text-sm font-bold">collections_bookmark</span>
              Quick Templates
            </h4>
            
            <div className="space-y-3 font-semibold text-xs">
              <button 
                onClick={() => handleSelectTemplate('MCQ - Rapid Quiz')}
                className="w-full text-left p-3 rounded-lg bg-transparent hover:bg-surface-container transition-all border border-outline-variant/30 flex justify-between items-center group cursor-pointer outline-none"
              >
                <span className="text-on-surface-variant group-hover:text-primary">MCQ - Rapid Quiz</span>
                <span className="material-symbols-outlined text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
              </button>

              <button 
                onClick={() => handleSelectTemplate('Coding Challenge (C++/Python)')}
                className="w-full text-left p-3 rounded-lg bg-transparent hover:bg-surface-container transition-all border border-outline-variant/30 flex justify-between items-center group cursor-pointer outline-none"
              >
                <span className="text-on-surface-variant group-hover:text-primary">Coding Challenge</span>
                <span className="material-symbols-outlined text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
              </button>

              <button 
                onClick={() => handleSelectTemplate('Project Report Evaluation')}
                className="w-full text-left p-3 rounded-lg bg-transparent hover:bg-surface-container transition-all border border-outline-variant/30 flex justify-between items-center group cursor-pointer outline-none"
              >
                <span className="text-on-surface-variant group-hover:text-primary">Project Evaluation</span>
                <span className="material-symbols-outlined text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
              </button>
            </div>
          </div>

          {/* Evaluation Progress */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm text-left">
            <h4 className="font-label-md font-bold mb-4 text-xs uppercase tracking-wider text-on-surface select-none">Evaluation Progress</h4>
            
            <div className="space-y-4 text-xs font-semibold text-on-surface-variant select-none">
              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span>Python Quiz Q1</span>
                  <span className="text-primary">85%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden border border-outline-variant/10">
                  <div className="bg-primary h-full w-[85%] rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span>Cloud Architecture Final</span>
                  <span className="text-tertiary">30%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden border border-outline-variant/10">
                  <div className="bg-tertiary h-full w-[30%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* CREATE MODAL: Create Assessment Form */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-2xl shadow-2xl p-8 border border-outline-variant text-left animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-6 select-none border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                Configure Assessment
              </h2>
              <button 
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant bg-transparent border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handlePublishTest} className="space-y-6 text-xs font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Test Title</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                    placeholder="e.g. Mid-Term Examination" 
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-1.5 select-none">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Target Class</label>
                  <select 
                    value={newBatch}
                    onChange={(e) => setNewBatch(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs"
                  >
                    <option value="Python A1">Python A1: Advanced Programming</option>
                    <option value="Web Dev B2">Web Dev B2: Core Systems</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Date &amp; Time</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                    type="datetime-local"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Duration</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                    placeholder="e.g. 2 Hours" 
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Total Questions</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs font-medium" 
                    placeholder="25" 
                    type="number"
                    value={newQuestionsCount}
                    onChange={(e) => setNewQuestionsCount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 select-none">
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors border-none bg-transparent cursor-pointer outline-none" 
                  onClick={() => setIsCreateOpen(false)} 
                  type="button"
                >
                  Discard
                </button>
                <button 
                  className="px-8 py-2.5 rounded-xl font-bold bg-primary text-on-primary shadow-lg hover:opacity-95 transition-opacity border-none cursor-pointer outline-none hover:scale-[1.01] active:scale-95" 
                  type="submit"
                >
                  Publish Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESUME DRAFT MODAL: Complete Missing Question Bank */}
      {isResumeOpen && selectedResumeExam && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl shadow-2xl p-6 border border-outline-variant text-left animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-4 select-none border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-error">warning</span>
                Complete Exam Setup
              </h2>
              <button 
                onClick={() => setIsResumeOpen(false)}
                className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant bg-transparent border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleResolveDraft} className="space-y-4 text-xs font-semibold">
              <p className="font-body-md text-on-surface-variant font-light">
                The draft assessment <strong>{selectedResumeExam.title}</strong> requires a valid Question Bank file to schedule.
              </p>

              <div className="space-y-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase text-[10px] tracking-wide">Link Question Bank</label>
                <select className="w-full bg-surface border border-outline-variant rounded-xl p-3 outline-none cursor-pointer text-xs">
                  <option>Java Midterm pool (50 MCQs)</option>
                  <option>Java Core classes (120 MCQs)</option>
                  <option>Create new from AI generator</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3 select-none">
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors border-none bg-transparent cursor-pointer outline-none" 
                  onClick={() => setIsResumeOpen(false)} 
                  type="button"
                >
                  Discard
                </button>
                <button 
                  className="px-6 py-2.5 rounded-xl font-bold bg-primary text-on-primary shadow-lg hover:opacity-95 transition-opacity border-none cursor-pointer outline-none active:scale-95" 
                  type="submit"
                >
                  Publish Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Exams;
