import React, { useState } from 'react';

const MyCourses = () => {
  // Card Expansion State
  const [expandedCard, setExpandedCard] = useState('course-1'); // Default open course-1

  // Modals and Toasts
  const [toastMessage, setToastMessage] = useState(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isLecturesListOpen, setIsLecturesListOpen] = useState(false);
  const [isClassRoomOpen, setIsClassRoomOpen] = useState(false);
  const [activePracticeQuestions, setActivePracticeQuestions] = useState(false);
  const [activeLectureDetails, setActiveLectureDetails] = useState(null);

  // Stats drawer states
  const [activeStatModal, setActiveStatModal] = useState(null);

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Full lectures catalog dataset
  const fullLectures = [
    { num: 1, title: 'Introduction to HTML5 Semantic Tags', duration: '20:15', status: 'Completed' },
    { num: 2, title: 'CSS Box Model and Floats deep-dive', duration: '35:40', status: 'Completed' },
    { num: 3, title: 'Flexbox layouts & alignment matrices', duration: '40:12', status: 'Completed' },
    { num: 4, title: 'CSS Grid template areas & gap parameters', duration: '45:30', status: 'Completed' },
    { num: 5, title: 'Responsive viewport media queries', duration: '30:22', status: 'Completed' },
    { num: 20, title: 'Asynchronous JS operations & Promise chains', duration: '50:15', status: 'Completed' },
    { num: 21, title: 'Fetch API and Axios interceptor layers', duration: '42:10', status: 'Completed' },
    { num: 22, title: 'Intro to React components and render loops', duration: '38:50', status: 'Completed' },
    { num: 23, title: 'React state hook and input sync', duration: '44:20', status: 'Completed' },
    { num: 24, title: 'Redux State Management (Store, Reducers, Actions)', duration: '45:12', status: 'In Progress' },
    { num: 25, title: 'Context API vs Redux (Performance comparison)', duration: '50:08', status: 'Locked' },
    { num: 26, title: 'Vite Production builds and Rollup tuning', duration: '1:12:00', status: 'Locked' }
  ];

  // Practice Trivia Questions
  const practiceQuestions = [
    {
      q: "What is the primary difference between context state and Redux store state?",
      options: [
        "Context state is local and re-renders consumers; Redux is centralized and enables optimized selectors",
        "Redux stores only strings; Context stores React nodes",
        "Context works only in class components",
        "Redux bypasses state flows entirely"
      ],
      answer: 0,
      explanation: "Context triggers re-renders on all descendants when state changes, whereas Redux selectors allow components to subscribe to specific slices of state without unnecessary renders."
    }
  ];
  const [userPracticeAnswer, setUserPracticeAnswer] = useState(null);

  // Attended assignment logs
  const assignmentLogs = [
    { title: 'Responsive grid portfolios', date: 'May 10', grade: 'A+' },
    { title: 'Dynamic fetch dashboards', date: 'May 18', grade: 'A' },
    { title: 'Context theme switcher', date: 'May 22', grade: 'A+' },
    { title: 'Redux dynamic cart managers', date: 'May 29', grade: 'A-' }
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
      <header className="border-b border-outline-variant/20 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-2">My Enrolled Courses</h1>
            <p className="text-on-surface-variant font-body-md text-xs leading-relaxed max-w-2xl">
              Manage your active learning journey, track your progress, and access all course-related study materials from a single dashboard.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-full font-label-md shrink-0 w-fit">
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
            <span className="text-xs font-bold">4 Active Courses</span>
          </div>
        </div>
      </header>

      {/* Course Cards Container */}
      <div className="grid grid-cols-1 gap-gutter">
        
        {/* Course Card 1: Advanced Web Development */}
        <div 
          className={`bg-white dark:bg-surface-container-low border border-outline-variant/35 rounded-xl overflow-hidden transition-all duration-300 ${
            expandedCard === 'course-1' ? 'shadow-md ring-1 ring-primary/20' : 'hover:shadow-sm'
          }`}
        >
          {/* Summary Banner click */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'course-1' ? null : 'course-1')}
            className="p-5 flex flex-col md:flex-row gap-5 cursor-pointer select-none"
          >
            {/* Image banner */}
            <div className="w-full md:w-56 h-36 rounded-lg overflow-hidden relative shrink-0">
              <img 
                className="w-full h-full object-cover" 
                alt="Workspace"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB85wXdKayeTZdguDsuCtA27np4fV-RlnIBg9wggzY3mJPBZi0aoUBlBbBMknns6OAbViKVf0k8yvmAs04XEMvZL9hvI5j0pUwsBGWHPdOaAfoiSqKtLhLdSpDm0QVaFNBt22cLyg26egs_xudw3ePPhFFw71quM9OrmwBbN5jTF1dlKTEOpG5c5KdyLGH7oV4U9ouu_WN0LUuGRGjPTUuOdjc6exUWuphc4i00ABTKReFmGvkIGReG8kEC_DdF9cQQAfomyClAlOdR"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-0.5 bg-primary text-on-primary rounded-full text-[9px] font-black uppercase tracking-wider">Web Dev</span>
              </div>
            </div>

            {/* Title & Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-base font-bold text-on-surface hover:text-primary transition-colors">
                    Advanced Web Development: React & Node.js
                  </h3>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-1">Instructor: Dr. Sarah Jenkins • Semester 4</p>
                </div>
                <div className="text-on-surface-variant p-1 rounded-full hover:bg-surface-container transition-all">
                  <span className={`material-symbols-outlined transition-transform duration-300 block ${
                    expandedCard === 'course-1' ? 'rotate-180' : ''
                  }`}>
                    expand_more
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-on-surface-variant font-medium">Overall Syllabus Completed</span>
                  <span className="text-primary font-bold">68%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '68%' }} />
                </div>
                <div className="flex gap-4 pt-1">
                  <div className="flex items-center gap-1 text-on-surface-variant text-[10px] font-bold">
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                    24/36 Videos Completed
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant text-[10px] font-bold">
                    <span className="material-symbols-outlined text-sm">description</span>
                    12 Materials Active
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Syllabus Drawer */}
          {expandedCard === 'course-1' && (
            <div className="bg-surface-container-low border-t border-outline-variant/20 p-5 animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                
                {/* Videos panel */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <h4 className="font-label-md text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 border-b border-outline-variant/15 pb-2">
                    <span className="material-symbols-outlined text-base">play_circle</span>
                    Video Lectures
                  </h4>
                  
                  <div className="space-y-2">
                    {/* Active In-progress lecture */}
                    <div 
                      onClick={() => {
                        setActiveLectureDetails({ title: 'Lecture 24: Redux State Management', num: 24, dur: '45:12' });
                        setIsClassRoomOpen(true);
                      }}
                      className="flex items-center gap-3 p-3 bg-white hover:bg-primary/5 rounded-lg border border-primary/40 hover:border-primary cursor-pointer group transition-all"
                    >
                      <div className="w-8 h-8 shrink-0 bg-primary/10 rounded flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-base">play_arrow</span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-label-md text-xs font-bold truncate text-on-surface group-hover:text-primary transition-colors">
                          Lecture 24: Redux State Management
                        </p>
                        <p className="text-[9px] text-outline font-medium">45:12 • Last watched yesterday</p>
                      </div>
                    </div>

                    {/* Locked lecture */}
                    <div 
                      onClick={() => triggerToast("Lecture 25: Context API vs Redux is currently locked. It releases in 2 days!")}
                      className="flex items-center gap-3 p-3 bg-white/70 rounded-lg border border-outline-variant/20 hover:border-error/35 cursor-pointer group transition-all"
                    >
                      <div className="w-8 h-8 shrink-0 bg-surface-container-high rounded flex items-center justify-center text-on-surface-variant/40">
                        <span className="material-symbols-outlined text-base">lock</span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-label-md text-xs font-bold truncate text-on-surface-variant/50">
                          Lecture 25: Context API vs Redux
                        </p>
                        <p className="text-[9px] text-on-surface-variant/40 font-medium">Locked • Releases in 2 days</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsLecturesListOpen(true)}
                      className="w-full text-center py-2 bg-transparent text-primary font-bold text-xs hover:underline border-none cursor-pointer"
                    >
                      View All 36 Lectures
                    </button>
                  </div>
                </div>

                {/* Study Materials & Notes Column */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Downloads List */}
                  <div className="space-y-4">
                    <h4 className="font-label-md text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5 border-b border-outline-variant/15 pb-2">
                      <span className="material-symbols-outlined text-base">folder_open</span>
                      Study Guides & PDF Slides
                    </h4>
                    
                    <div className="space-y-2">
                      <div 
                        onClick={() => triggerToast("Successfully started downloading React Architecture Notes.pdf")}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-outline-variant/20 hover:shadow-sm cursor-pointer group transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-error text-base">picture_as_pdf</span>
                          <span className="font-body-sm text-xs font-bold text-on-surface">React Architecture.pdf</span>
                        </div>
                        <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary group-hover:scale-110 transition-all">download</span>
                      </div>

                      <div 
                        onClick={() => triggerToast("Successfully started downloading RESTful API Documentation.docx")}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-outline-variant/20 hover:shadow-sm cursor-pointer group transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-base">description</span>
                          <span className="font-body-sm text-xs font-bold text-on-surface">API Documentation.docx</span>
                        </div>
                        <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary group-hover:scale-110 transition-all">download</span>
                      </div>
                    </div>
                  </div>

                  {/* Assignments & Question papers */}
                  <div className="space-y-4">
                    <h4 className="font-label-md text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5 border-b border-outline-variant/15 pb-2">
                      <span className="material-symbols-outlined text-base">help_center</span>
                      Practice & Deadlines
                    </h4>
                    
                    <div className="space-y-2 text-left">
                      <div 
                        onClick={() => setActivePracticeQuestions(true)}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-outline-variant/20 hover:shadow-sm cursor-pointer group transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-tertiary text-base">quiz</span>
                          <span className="font-body-sm text-xs font-bold text-on-surface">Module 4 Practice Trivia</span>
                        </div>
                        <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-all">open_in_new</span>
                      </div>

                      <div className="p-3 bg-tertiary-container/10 border border-tertiary-container/30 rounded-lg">
                        <p className="font-label-md text-tertiary font-bold text-[10px] uppercase tracking-wider">Upcoming Deadline</p>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                          Project Milestone 2 due in <span className="font-bold text-on-surface text-error">48 hours</span>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Recorded Session promo footer banner */}
              <div className="mt-6 p-4 bg-primary text-on-primary rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="p-2.5 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">live_tv</span>
                  </div>
                  <div>
                    <p className="font-label-md text-xs font-bold">Next Recorded Session</p>
                    <p className="text-[11px] opacity-90 mt-0.5">Microservices Patterns with Node.js</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setActiveLectureDetails({ title: 'Microservices Patterns with Node.js', num: 25, dur: '50:00' });
                    setIsClassRoomOpen(true);
                  }}
                  className="px-6 py-2 bg-white text-primary border-none rounded-lg font-bold text-xs hover:bg-opacity-90 transition-all cursor-pointer outline-none active:scale-95 shrink-0 self-end sm:self-center"
                >
                  Go to Room
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Course Card 2: Python for Data Science */}
        <div 
          className={`bg-white dark:bg-surface-container-low border border-outline-variant/35 rounded-xl overflow-hidden transition-all duration-300 ${
            expandedCard === 'course-2' ? 'shadow-md ring-1 ring-tertiary/20' : 'hover:shadow-sm'
          }`}
        >
          {/* Summary Banner click */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'course-2' ? null : 'course-2')}
            className="p-5 flex flex-col md:flex-row gap-5 cursor-pointer select-none"
          >
            {/* Image banner */}
            <div className="w-full md:w-56 h-36 rounded-lg overflow-hidden relative shrink-0">
              <img 
                className="w-full h-full object-cover" 
                alt="Data Visualization"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT4IupQ4QbVStln6mBQkEnaToitIudJbDV4SZXvLlteAZYlZWZzDsTAV9E-J98yvCqC1iPwZwFWMArGqeybIj6gXT9CD72GGc1Pp-l5J9TB8TVEfZ0IOd_jP3VqYKr3MW6JPTGXwGLS_o_8dettZfbxPPU84t-b686dqEG_Va_mImB29Qux91Jji_XaEXXh6V0jJvc_-ue8ImhV775fvZBetSjdZf3DojxcrJ8Zalv6I9AVt2ApKeRbM-uY03d2jgPN1aBgNzT2FRo"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-0.5 bg-tertiary text-on-tertiary rounded-full text-[9px] font-black uppercase tracking-wider">Data Science</span>
              </div>
            </div>

            {/* Title & Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-base font-bold text-on-surface hover:text-primary transition-colors">
                    Python for Data Science & AI
                  </h3>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-1">Instructor: Prof. Alan Turing • Semester 2</p>
                </div>
                <div className="text-on-surface-variant p-1 rounded-full hover:bg-surface-container transition-all">
                  <span className={`material-symbols-outlined transition-transform duration-300 block ${
                    expandedCard === 'course-2' ? 'rotate-180' : ''
                  }`}>
                    expand_more
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-on-surface-variant font-medium">Overall Syllabus Completed</span>
                  <span className="text-primary font-bold">32%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '32%' }} />
                </div>
                <div className="flex gap-4 pt-1">
                  <div className="flex items-center gap-1 text-on-surface-variant text-[10px] font-bold">
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                    10/31 Videos Completed
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant text-[10px] font-bold">
                    <span className="material-symbols-outlined text-sm">description</span>
                    8 Materials Active
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Syllabus Drawer */}
          {expandedCard === 'course-2' && (
            <div className="bg-surface-container-low border-t border-outline-variant/20 p-5 animate-in slide-in-from-top-4 duration-300">
              <div className="p-8 flex flex-col items-center justify-center min-h-[150px] text-on-surface-variant text-center">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50 text-primary">auto_awesome</span>
                <h5 className="font-bold text-xs text-on-surface">Data Science & AI Module Loading</h5>
                <p className="text-[10px] text-outline mt-1 max-w-xs leading-normal">
                  Syllabus is updating. You have active analytics tests scheduled on Python pandas & mathematical plotting next Tuesday.
                </p>
                <button 
                  onClick={() => triggerToast("Data Science syllabus metrics synced successfully.")}
                  className="mt-3 bg-primary text-white border-none py-2 px-6 rounded-lg text-[10px] font-bold cursor-pointer hover:opacity-90 active:scale-95"
                >
                  Sync Course Metrics
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Course Card 3: UI/UX Fundamentals */}
        <div 
          className={`bg-white dark:bg-surface-container-low border border-outline-variant/35 rounded-xl overflow-hidden transition-all duration-300 ${
            expandedCard === 'course-3' ? 'shadow-md ring-1 ring-secondary/20' : 'hover:shadow-sm'
          }`}
        >
          {/* Summary Banner click */}
          <div 
            onClick={() => setExpandedCard(expandedCard === 'course-3' ? null : 'course-3')}
            className="p-5 flex flex-col md:flex-row gap-5 cursor-pointer select-none"
          >
            {/* Image banner */}
            <div className="w-full md:w-56 h-36 rounded-lg overflow-hidden relative shrink-0">
              <img 
                className="w-full h-full object-cover" 
                alt="Creative Studio"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-l95QHieyMmNygSWVMHYzr2MRUF2uYXWazxn71BuFCiKfH9oETb-zoh9xgtdHVhA_NtsvQ7iKPYCD9eIYr5A4jbfNk6C2FeHxyVWf5l9GvH4quq4vf7JCcz1eg7xIg4BlDjQ0El1axqT6CNwSQh7ZZT860KnRPb9GhO86QV__5KJCtWpai9OUi8_Nhr1jmvac81wMyrFHL6wRMLf1Ar4SSYLxOktocaM8u7hOhZjJ65-qNxiNZlVrt-sYxKsYcihKj7ooTgFuzC8P"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-0.5 bg-secondary text-on-secondary rounded-full text-[9px] font-black uppercase tracking-wider">Design</span>
              </div>
            </div>

            {/* Title & Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-base font-bold text-on-surface hover:text-primary transition-colors">
                    User Interface & User Experience Design
                  </h3>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-1">Instructor: Maria Rossi • Semester 3</p>
                </div>
                <div className="text-on-surface-variant p-1 rounded-full hover:bg-surface-container transition-all">
                  <span className={`material-symbols-outlined transition-transform duration-300 block ${
                    expandedCard === 'course-3' ? 'rotate-180' : ''
                  }`}>
                    expand_more
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-on-surface-variant font-medium">Overall Syllabus Completed</span>
                  <span className="text-primary font-bold">95%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '95%' }} />
                </div>
                <div className="flex gap-4 pt-1">
                  <div className="flex items-center gap-1 text-on-surface-variant text-[10px] font-bold">
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                    19/20 Videos Completed
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant text-[10px] font-bold text-primary font-bold">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Certificate Ready
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Syllabus Drawer */}
          {expandedCard === 'course-3' && (
            <div className="bg-surface-container-low border-t border-outline-variant/20 p-5 animate-in slide-in-from-top-4 duration-300">
              <div className="p-6 flex flex-col items-center justify-center min-h-[150px] text-on-surface-variant text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3 shadow-md animate-pulse">
                  <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                </div>
                <h5 className="font-bold text-sm text-on-surface">Congratulations, Course Completed!</h5>
                <p className="text-xs text-outline mt-1 max-w-sm leading-relaxed">
                  You have successfully completed 95% of your UI/UX design masterclass program. Your active certificate is generated and ready to download.
                </p>
                <button 
                  onClick={() => setIsCertificateOpen(true)}
                  className="mt-4 bg-primary text-white border-none py-2.5 px-8 rounded-lg text-xs font-bold cursor-pointer hover:bg-primary/95 transition-all shadow-md active:scale-98"
                >
                  Generate Certificate
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer Summary / Quick Stats */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-6 border-t border-outline-variant/20 pt-6">
        
        {/* Stat 1 */}
        <div 
          onClick={() => setActiveStatModal('time')}
          className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/25 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all text-left"
        >
          <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total Learning Time</p>
            <p className="text-xl font-bold text-on-surface mt-0.5">124 Hours</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div 
          onClick={() => setActiveStatModal('assignments')}
          className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/25 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all text-left"
        >
          <div className="w-12 h-12 rounded-full bg-tertiary/15 flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined">history_edu</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Assignments Done</p>
            <p className="text-xl font-bold text-on-surface mt-0.5">42 / 48</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div 
          onClick={() => setActiveStatModal('cache')}
          className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/25 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all text-left"
        >
          <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined">download_done</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Offline Materials</p>
            <p className="text-xl font-bold text-on-surface mt-0.5">12 GB Used</p>
          </div>
        </div>

      </footer>

      {/* MODAL 1: HIGH FIDELITY CERTIFICATE GENERATOR */}
      {isCertificateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center relative border-4 border-double border-yellow-600/35">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsCertificateOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Certificate Border Frame */}
            <div className="border border-yellow-600/20 p-5 sm:p-8 space-y-6 text-center select-none bg-yellow-50/5">
              
              <div className="space-y-1">
                <span className="font-serif italic text-yellow-700 text-xs tracking-wider">Certificate of Completion</span>
                <h3 className="font-serif text-2xl font-bold text-on-surface uppercase tracking-widest mt-1">IT Academy</h3>
                <p className="text-[8px] text-outline font-bold uppercase tracking-widest">Laxmi Computer Education Portal</p>
              </div>

              <div className="space-y-2 py-4">
                <p className="text-[10px] text-on-surface-variant">This is proudly awarded to active student</p>
                <h4 className="font-serif text-xl font-extrabold text-primary border-b border-primary/20 pb-2 w-fit mx-auto px-10">
                  Arjun Kumar
                </h4>
                <p className="text-[10px] text-on-surface-variant max-w-md mx-auto leading-relaxed mt-2">
                  for outstanding achievements and syllabus completion in the masterclass course program:
                </p>
                <p className="font-bold text-xs text-on-surface uppercase tracking-wider mt-1">
                  User Interface & User Experience Design
                </p>
              </div>

              {/* Seal and signature row */}
              <div className="flex justify-between items-end pt-4 border-t border-outline-variant/35">
                <div className="text-left text-[9px] text-outline space-y-1 font-semibold">
                  <p>📅 <strong>Date Issued:</strong> June 02, 2026</p>
                  <p>🔑 <strong>Verification ID:</strong> LX-UIUX-98012</p>
                </div>
                
                {/* Simulated Gold Foil Seal */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 border border-yellow-700/35 flex items-center justify-center text-white shadow-md relative shrink-0">
                  <div className="absolute inset-1.5 border border-dashed border-white/50 rounded-full"></div>
                  <span className="material-symbols-outlined text-xl">workspace_premium</span>
                </div>

                <div className="text-right text-[9px] text-outline space-y-1 font-semibold">
                  <p className="font-serif italic border-b border-outline/35 pb-1">Maria Rossi</p>
                  <p>Maria Rossi (Lead Instructor)</p>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-6 border-t border-outline-variant/20">
              <button 
                onClick={() => {
                  setIsCertificateOpen(false);
                  triggerToast("Download triggered! Your verified PDF certificate is saving to your system.");
                }}
                className="flex-1 bg-primary text-white py-3 rounded-lg text-xs font-bold border-none cursor-pointer hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm font-bold">download</span>
                Download Certificate (PDF)
              </button>
              <button 
                onClick={() => setIsCertificateOpen(false)}
                className="bg-surface-container text-on-surface-variant py-3 px-6 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: VIEW ALL LECTURES CATALOG CHECKLIST */}
      {isLecturesListOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10 flex flex-col h-[80vh]">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-on-surface">Full Course Syllabus</h3>
                <p className="text-[10px] text-outline font-medium mt-0.5">Advanced Web Development: React & Node.js</p>
              </div>
              <button 
                onClick={() => setIsLecturesListOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {fullLectures.map((lec) => {
                let badgeStyle = "bg-green-100 text-green-700";
                if (lec.status === 'Locked') badgeStyle = "bg-surface-container-high text-on-surface-variant/40";
                if (lec.status === 'In Progress') badgeStyle = "bg-primary-container text-on-primary-container font-extrabold";

                return (
                  <div 
                    key={lec.num} 
                    onClick={() => {
                      if (lec.status === 'Locked') {
                        triggerToast("This lecture is locked. Keep completing earlier modules to unlock!");
                      } else {
                        setIsLecturesListOpen(false);
                        setActiveLectureDetails({ title: lec.title, num: lec.num, dur: lec.duration });
                        setIsClassRoomOpen(true);
                      }
                    }}
                    className={`p-3 rounded-lg border border-outline-variant/20 flex items-center justify-between gap-4 transition-all ${
                      lec.status === 'Locked' ? 'opacity-65' : 'hover:bg-primary/5 hover:border-primary/45 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center shrink-0 text-xs font-bold">
                        {lec.num}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-on-surface leading-tight line-clamp-1">{lec.title}</p>
                        <p className="text-[9px] text-outline mt-0.5">{lec.duration} minutes</p>
                      </div>
                    </div>
                    
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase shrink-0 ${badgeStyle}`}>
                      {lec.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant/20 shrink-0">
              <button 
                onClick={() => setIsLecturesListOpen(false)}
                className="w-full bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all active:scale-[0.98]"
              >
                Close Syllabus
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: PRACTICE TRIVIA POPUP */}
      {activePracticeQuestions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">quiz</span>
                <h3 className="text-base font-bold text-on-surface">Module 4 Practice Questions</h3>
              </div>
              <button 
                onClick={() => {
                  setActivePracticeQuestions(false);
                  setUserPracticeAnswer(null);
                }}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-on-surface leading-normal">
                {practiceQuestions[0].q}
              </p>

              <div className="space-y-2">
                {practiceQuestions[0].options.map((opt, i) => {
                  let btnStyle = "bg-surface-container border border-outline-variant/30 hover:bg-surface-container-high";
                  if (userPracticeAnswer !== null) {
                    if (i === practiceQuestions[0].answer) {
                      btnStyle = "bg-green-100 text-green-700 border border-green-500 font-semibold";
                    } else if (i === userPracticeAnswer) {
                      btnStyle = "bg-red-100 text-red-700 border border-red-500";
                    } else {
                      btnStyle = "bg-surface-container border border-outline-variant/20 opacity-55";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={userPracticeAnswer !== null}
                      onClick={() => setUserPracticeAnswer(i)}
                      className={`w-full text-left p-3 rounded-lg text-xs transition-all border-none outline-none ${
                        userPracticeAnswer === null ? 'cursor-pointer hover:translate-x-1' : 'cursor-default'
                      } ${btnStyle}`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {userPracticeAnswer !== null && (
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 mt-3">
                  <p className="text-[11px] text-on-primary-container leading-relaxed">
                    💡 <strong>Explanation:</strong> {practiceQuestions[0].explanation}
                  </p>
                  <button 
                    onClick={() => {
                      setActivePracticeQuestions(false);
                      setUserPracticeAnswer(null);
                      triggerToast("Practice answer submitted! You collected +10 points.");
                    }}
                    className="w-full mt-3 bg-primary text-white py-2 rounded-lg text-xs font-bold border-none cursor-pointer hover:opacity-95"
                  >
                    Finish Practice
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODAL 4: NEXT RECORDED VIDEO LECTURE PLAYER */}
      {isClassRoomOpen && activeLectureDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/15 flex flex-col h-[75vh]">
            
            <div className="bg-surface p-4 border-b border-outline-variant/20 flex justify-between items-center shrink-0">
              <div>
                <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase">Syllabus Video Room</span>
                <h4 className="text-xs font-bold text-on-surface mt-1.5">{activeLectureDetails.title}</h4>
              </div>
              <button 
                onClick={() => setIsClassRoomOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Video content */}
            <div className="flex-1 bg-black relative flex flex-col justify-center">
              <video 
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                controls 
                autoPlay 
                className="w-full h-full max-h-full object-contain"
              />
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 shrink-0 flex justify-between items-center">
              <div className="text-xs text-left">
                <p className="font-bold text-on-surface">Instructor: Dr. Sarah Jenkins</p>
                <p className="text-[10px] text-outline mt-0.5">Vite Player Node • Duration: {activeLectureDetails.dur}</p>
              </div>
              <button 
                onClick={() => setIsClassRoomOpen(false)}
                className="bg-primary text-white border-none font-bold hover:opacity-95 px-5 py-2 rounded-lg text-xs cursor-pointer"
              >
                Mark Finished
              </button>
            </div>

          </div>
        </div>
      )}

      {/* STATS MODALS */}
      {activeStatModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10 space-y-4">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <h3 className="text-base font-bold text-on-surface">
                  {activeStatModal === 'time' && 'Learning Time Analytics'}
                  {activeStatModal === 'assignments' && 'Completed Assignments Logs'}
                  {activeStatModal === 'cache' && 'Offline Cached Materials'}
                </h3>
              </div>
              <button 
                onClick={() => setActiveStatModal(null)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="text-xs leading-normal space-y-3">
              {activeStatModal === 'time' && (
                <div className="space-y-2">
                  <p className="font-light">Arjun Kumar has accrued a total of <strong>124 syllabus learning hours</strong> across all professional course frameworks since joining Laxmi computer portal.</p>
                  <p className="font-light text-primary font-bold">⏱️ Weekly target achievement: 75% complete</p>
                </div>
              )}

              {activeStatModal === 'assignments' && (
                <div className="space-y-3">
                  <p className="font-light text-on-surface-variant mb-2">Here is a brief log of your 4 latest evaluated coursework grades:</p>
                  <div className="space-y-2">
                    {assignmentLogs.map((log, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 bg-surface-container rounded-lg border border-outline-variant/15">
                        <span className="font-bold">{log.title}</span>
                        <div className="flex items-center gap-2 font-semibold">
                          <span className="text-[10px] text-outline font-medium">{log.date}</span>
                          <span className="text-primary font-bold">{log.grade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStatModal === 'cache' && (
                <div className="space-y-2">
                  <p className="font-light">Your student workspace has cached <strong>12 GB of lecture recordings, PDF materials, and code slides</strong> onto your local developer cache.</p>
                  <button 
                    onClick={() => {
                      setActiveStatModal(null);
                      triggerToast("Successfully cleared 8.5 GB of recorded session caches!");
                    }}
                    className="w-full mt-2 bg-error text-white border-none py-2 rounded-lg text-xs font-bold cursor-pointer hover:opacity-90 transition-all"
                  >
                    Clear Cached Videos (Free up space)
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setActiveStatModal(null)}
              className="w-full bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              Close Analytics
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyCourses;
