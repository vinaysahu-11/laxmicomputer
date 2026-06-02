import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // State for Learning Hours Chart
  const [chartPeriod, setChartPeriod] = useState('This Week');

  // Modal States
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isHackathonOpen, setIsHackathonOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Daily Quiz Trivia State
  const quizQuestions = [
    {
      q: "Which React hook is used to perform side effects like fetching data or subscribing to events?",
      options: ["useState", "useEffect", "useContext", "useMemo"],
      answer: 1,
      explanation: "useEffect is designed to perform side effects in functional React components."
    },
    {
      q: "What is the primary benefit of the Virtual DOM in React?",
      options: [
        "It directly communicates with database servers",
        "It renders CSS faster than HTML engines",
        "It minimizes costly real DOM manipulations by batching changes",
        "It stores user session data permanently"
      ],
      answer: 2,
      explanation: "The Virtual DOM keeps a virtual representation of the UI and uses diffing algorithms to update only changed components in the real DOM."
    },
    {
      q: "Which CSS property is commonly used to create high-end frosted glassmorphism elements?",
      options: ["backdrop-filter", "background-blend-mode", "box-shadow-inset", "filter-blur"],
      answer: 0,
      explanation: "backdrop-filter (e.g. backdrop-blur-md) applies graphical effects like blur to the area behind an element."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Function to show self-disappearing toast notifications
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Trivia Quiz Handlers
  const handleStartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setIsQuizOpen(true);
  };

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizQuestions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Support Request State
  const [supportText, setSupportText] = useState('');
  const handleSendSupport = (e) => {
    e.preventDefault();
    if (!supportText.trim()) return;
    triggerToast("Your support ticket has been submitted. A student advisor will contact you shortly!");
    setSupportText('');
    setIsSupportOpen(false);
  };

  // Learning Hours Bar Graph Data mapping
  const weeklyData = {
    'This Week': [
      { day: 'Mon', hours: 3, label: '3 hrs', height: 'h-24', isToday: false },
      { day: 'Tue', hours: 4, label: '4.5 hrs', height: 'h-32', isToday: false },
      { day: 'Wed', hours: 5, label: '5.2 hrs', height: 'h-40', isToday: false },
      { day: 'Thu', hours: 6, label: '6.8 hrs (Today)', height: 'h-48', isToday: true },
      { day: 'Fri', hours: 2, label: '2.1 hrs', height: 'h-16', isToday: false },
      { day: 'Sat', hours: 1.2, label: '1.2 hrs', height: 'h-10', isToday: false },
      { day: 'Sun', hours: 1, label: '0.8 hrs', height: 'h-8', isToday: false }
    ],
    'Last Week': [
      { day: 'Mon', hours: 2, label: '2.4 hrs', height: 'h-16', isToday: false },
      { day: 'Tue', hours: 5, label: '5.0 hrs', height: 'h-40', isToday: false },
      { day: 'Wed', hours: 4, label: '4.0 hrs', height: 'h-32', isToday: false },
      { day: 'Thu', hours: 2.5, label: '2.8 hrs', height: 'h-20', isToday: false },
      { day: 'Fri', hours: 6, label: '6.5 hrs', height: 'h-48', isToday: true },
      { day: 'Sat', hours: 4.5, label: '4.2 hrs', height: 'h-36', isToday: false },
      { day: 'Sun', hours: 1.5, label: '1.5 hrs', height: 'h-12', isToday: false }
    ]
  };

  return (
    <div className="space-y-stack-lg text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[100] bg-primary text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Greeting */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-md bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl border border-primary/5">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Welcome back, Arjun! 👋</h2>
          <p className="font-body-lg text-on-surface-variant mt-1.5">You've completed 75% of your weekly learning goal. Keep it up!</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button 
            onClick={() => navigate('/student/classes')}
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md shadow-sm hover:scale-[1.02] transition-transform active:scale-95 border-none cursor-pointer text-xs font-bold"
          >
            <span className="material-symbols-outlined text-base">live_tv</span>
            Join Live Class
          </button>
          <button 
            onClick={() => navigate('/student/exams')}
            className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-6 py-3 rounded-lg font-label-md hover:bg-secondary-container/80 transition-colors border-none cursor-pointer text-xs font-bold"
          >
            <span className="material-symbols-outlined text-base">assignment</span>
            View Assignments
          </button>
        </div>
      </section>

      {/* Bento Grid Overview */}
      <section className="grid grid-cols-12 gap-gutter">
        
        {/* Enrolled Courses Card */}
        <div 
          onClick={() => navigate('/student/courses')}
          className="col-span-12 sm:col-span-6 md:col-span-3 glass-card p-stack-lg rounded-xl flex flex-col justify-between group hover:border-primary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary/10 rounded-lg text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="font-label-sm text-primary bg-primary/5 px-2 py-1 rounded text-[10px] font-bold">+2 this month</span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant text-xs mt-4">Enrolled Courses</p>
            <h3 className="font-headline-xl text-3xl font-extrabold text-on-surface mt-1">06</h3>
          </div>
        </div>

        {/* Average Attendance Card */}
        <div 
          onClick={() => navigate('/student/attendance')}
          className="col-span-12 sm:col-span-6 md:col-span-3 glass-card p-stack-lg rounded-xl flex flex-col justify-between group hover:border-tertiary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-tertiary-container/15 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <span className="font-label-sm text-tertiary bg-tertiary/5 px-2 py-1 rounded text-[10px] font-bold">Good</span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant text-xs mt-4">Average Attendance</p>
            <h3 class="font-headline-xl text-3xl font-extrabold text-on-surface mt-1">92%</h3>
          </div>
        </div>

        {/* Upcoming Exams Card */}
        <div 
          onClick={() => navigate('/student/exams')}
          className="col-span-12 sm:col-span-6 md:col-span-3 glass-card p-stack-lg rounded-xl flex flex-col justify-between group hover:border-error/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-error-container/15 text-error flex items-center justify-center">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="font-label-sm text-error bg-error/5 px-2 py-1 rounded text-[10px] font-bold">2 Days Left</span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant text-xs mt-4">Upcoming Exams</p>
            <h3 className="font-headline-xl text-3xl font-extrabold text-on-surface mt-1">03</h3>
          </div>
        </div>

        {/* Active Certificates Card */}
        <div 
          onClick={() => navigate('/student/certificates')}
          className="col-span-12 sm:col-span-6 md:col-span-3 glass-card p-stack-lg rounded-xl flex flex-col justify-between group hover:border-secondary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-secondary-container/20 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <span className="font-label-sm text-secondary bg-secondary/5 px-2 py-1 rounded text-[10px] font-bold">Lifetime</span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant text-xs mt-4">Active Certificates</p>
            <h3 className="font-headline-xl text-3xl font-extrabold text-on-surface mt-1">04</h3>
          </div>
        </div>

        {/* Learning Hours Chart Card */}
        <div className="col-span-12 lg:col-span-8 glass-card p-stack-lg rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-sm text-headline-sm font-semibold">Learning Hours</h4>
            <select 
              value={chartPeriod}
              onChange={(e) => setChartPeriod(e.target.value)}
              className="bg-surface-container border-none text-xs rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-primary outline-none cursor-pointer font-bold"
            >
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
            </select>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2 pt-4 border-b border-outline-variant/20 px-2">
            {weeklyData[chartPeriod].map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer">
                
                {/* Custom Tooltip */}
                <div className="absolute bottom-full mb-2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 shadow-md">
                  {data.label}
                </div>

                {/* Animated Bar */}
                <div 
                  className={`w-full rounded-t-lg transition-all duration-700 ease-out origin-bottom ${
                    data.isToday 
                      ? 'bg-primary shadow-[0_0_12px_rgba(0,97,164,0.4)]' 
                      : 'bg-primary/20 group-hover:bg-primary/35'
                  } ${data.height}`}
                />
                
                <span className={`text-[10px] font-bold mt-1 ${data.isToday ? 'text-primary font-bold' : 'text-outline'}`}>
                  {data.day}
                </span>
              </div>
            ))}
          </div>
          
          <p className="text-[11px] text-on-surface-variant mt-3 text-center italic">
            * Hover over the bars to see exact learning duration details.
          </p>
        </div>

        {/* Recent Activity Card */}
        <div className="col-span-12 lg:col-span-4 glass-card p-stack-lg rounded-xl flex flex-col justify-between overflow-hidden">
          <h4 className="font-headline-sm text-headline-sm font-semibold mb-6">Recent Activity</h4>
          
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            {/* Item 1 */}
            <div className="flex gap-4 items-start relative">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container border border-primary/20">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </div>
                <div className="absolute top-9 bottom-[-24px] w-[1.5px] bg-outline-variant/35"></div>
              </div>
              <div className="text-left">
                <p className="font-label-md text-on-surface font-bold text-xs">Assignment Submitted</p>
                <p className="text-[11px] text-outline mt-0.5">Python Advanced Functions</p>
                <p className="text-[10px] text-primary font-semibold mt-1">2 hours ago</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4 items-start relative">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary border border-tertiary/20">
                  <span className="material-symbols-outlined text-[18px]">video_library</span>
                </div>
                <div className="absolute top-9 bottom-[-24px] w-[1.5px] bg-outline-variant/35"></div>
              </div>
              <div className="text-left">
                <p className="font-label-md text-on-surface font-bold text-xs">Lecture Attended</p>
                <p className="text-[11px] text-outline mt-0.5">Web Development Bootcamp</p>
                <p className="text-[10px] text-primary font-semibold mt-1">Yesterday</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4 items-start">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container border border-secondary/20">
                  <span className="material-symbols-outlined text-[18px]">emoji_events</span>
                </div>
              </div>
              <div className="text-left">
                <p className="font-label-md text-on-surface font-bold text-xs">New Badge Earned</p>
                <p className="text-[11px] text-outline mt-0.5">Fast Learner - 100hrs</p>
                <p className="text-[10px] text-primary font-semibold mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Section & Daily Quiz */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          
          {/* Hackathon Banner */}
          <div className="md:col-span-2 glass-card rounded-xl overflow-hidden flex relative min-h-[160px] border border-outline-variant/20">
            <div className="p-stack-lg z-10 w-full md:w-2/3 flex flex-col justify-center text-left">
              <span className="font-label-sm text-primary bg-primary/10 w-fit px-3 py-1 rounded-full text-[10px] font-bold mb-3 uppercase tracking-wider">Announcement</span>
              <h4 className="font-headline-sm text-headline-sm font-semibold mb-2">Upcoming Hackathon 2024</h4>
              <p className="font-body-md text-on-surface-variant text-xs mb-4 leading-relaxed">
                Register before June 15th to participate in the biggest coding event at Laxmi Education.
              </p>
              <button 
                onClick={() => setIsHackathonOpen(true)}
                className="text-primary font-label-md flex items-center gap-1 hover:gap-2 transition-all bg-transparent border-none outline-none cursor-pointer text-xs font-bold w-fit p-0"
              >
                Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3">
              <img 
                alt="Hackathon event" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4B5JSt0obMgRkJSOgn8DdvNti21k1BPEZr9bBZfuP01ynKC5n78E-E2YGotmR2wf5SSCA04sv7HW13_pHyndsBHUfZ8LVgp7SjcL3D24U3A1yugFbPSHNOi881yEhcMBgbZPi9SqP6ZXLMeC1gYVzy4KxgrPnzMROYFVcLmE51Q3zZaGfVQTyfFZZRySRPxVpsBdtAOjUVBESjrDbNJFIbPP21VycZ0V2oC7sK9A81pdxyFV7K30vjgK52_z0Nod-TO_60HKANRFo"
              />
            </div>
          </div>

          {/* Daily Quiz Card */}
          <div className="glass-card p-stack-lg rounded-xl flex flex-col items-center justify-center text-center group bg-primary/5 hover:bg-primary/10 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">quiz</span>
            </div>
            <h4 className="font-label-md text-on-surface font-bold text-sm">Daily Quiz</h4>
            <p className="font-body-sm text-outline text-xs mt-1 mb-4">Test your knowledge and earn points!</p>
            <button 
              onClick={handleStartQuiz}
              className="w-full border-2 border-primary text-primary bg-transparent py-2.5 rounded-lg font-label-md hover:bg-primary hover:text-white transition-all outline-none cursor-pointer text-xs font-bold"
            >
              Start Now
            </button>
          </div>
        </div>

      </section>

      {/* Floating Action Button for Help Center */}
      <button 
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-none cursor-pointer outline-none group"
      >
        <span className="material-symbols-outlined text-2xl">help_center</span>
        <span className="absolute right-full mr-3 bg-on-surface text-surface text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          Get Help
        </span>
      </button>

      {/* MODAL 1: HACKATHON ANNOUNCEMENT */}
      {isHackathonOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="relative h-48 bg-primary/20">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4B5JSt0obMgRkJSOgn8DdvNti21k1BPEZr9bBZfuP01ynKC5n78E-E2YGotmR2wf5SSCA04sv7HW13_pHyndsBHUfZ8LVgp7SjcL3D24U3A1yugFbPSHNOi881yEhcMBgbZPi9SqP6ZXLMeC1gYVzy4KxgrPnzMROYFVcLmE51Q3zZaGfVQTyfFZZRySRPxVpsBdtAOjUVBESjrDbNJFIbPP21VycZ0V2oC7sK9A81pdxyFV7K30vjgK52_z0Nod-TO_60HKANRFo"
                alt="Hackathon detail" 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setIsHackathonOpen(false)}
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Hackathon 2024</span>
              <h3 className="text-xl font-bold text-on-surface">Laxmi Education Hackathon</h3>
              
              <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
                <p><strong>🗓️ Date:</strong> June 25th - June 27th, 2026</p>
                <p><strong>📍 Venue:</strong> Hybrid (Online Submissions & Main Innovation Lab Pitch)</p>
                <p><strong>🏆 Prize Pool:</strong> ₹50,000 Cash + Mentor Internships at Top SaaS Partners</p>
                <p className="mt-2 text-[11px] leading-relaxed">
                  Join fellow students to design, develop, and deploy amazing web tools. Work in teams of 2 to 4 students. Mentors will be present throughout the weekend to assist with queries and API setups.
                </p>
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  onClick={() => {
                    setIsHackathonOpen(false);
                    triggerToast("Congratulations! You have successfully registered for Hackathon 2024!");
                  }}
                  className="flex-1 bg-primary text-white py-3 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-colors active:scale-98"
                >
                  Register Now
                </button>
                <button 
                  onClick={() => setIsHackathonOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface-variant py-3 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INTERACTIVE TRIVIA QUIZ */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">emoji_events</span>
                <h3 className="text-base font-bold text-on-surface">Daily Developer Trivia</h3>
              </div>
              <button 
                onClick={() => setIsQuizOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {!quizFinished ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[11px] text-outline font-bold">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span className="text-primary font-bold">Score: {score}/{quizQuestions.length}</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                <p className="text-xs font-semibold text-on-surface leading-normal min-h-[48px] mt-2">
                  {quizQuestions[currentQuestion].q}
                </p>

                <div className="space-y-2 pt-2">
                  {quizQuestions[currentQuestion].options.map((opt, i) => {
                    let btnStyle = "bg-surface-container border border-outline-variant/30 hover:bg-surface-container-high";
                    if (isAnswered) {
                      if (i === quizQuestions[currentQuestion].answer) {
                        btnStyle = "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-500 font-semibold";
                      } else if (i === selectedOption) {
                        btnStyle = "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-500";
                      } else {
                        btnStyle = "bg-surface-container border border-outline-variant/20 opacity-55";
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={isAnswered}
                        onClick={() => handleOptionClick(i)}
                        className={`w-full text-left p-3 rounded-lg text-xs transition-all border-none outline-none ${
                          !isAnswered ? 'cursor-pointer hover:translate-x-1 active:scale-[0.99]' : 'cursor-default'
                        } ${btnStyle}`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 mt-3 animate-in fade-in duration-200">
                    <p className="text-[11px] text-on-primary-container leading-relaxed">
                      💡 <strong>Explanation:</strong> {quizQuestions[currentQuestion].explanation}
                    </p>
                    <button 
                      onClick={handleNextQuestion}
                      className="w-full mt-3 bg-primary text-white py-2 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-colors active:scale-98"
                    >
                      {currentQuestion === quizQuestions.length - 1 ? 'Show Score' : 'Next Question'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <span className="material-symbols-outlined text-4xl">workspace_premium</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-on-surface">Quiz Completed!</h4>
                  <p className="text-xs text-outline mt-1">You did a fantastic job testing your skills today.</p>
                </div>
                
                <div className="bg-primary-container/20 p-4 rounded-xl max-w-xs mx-auto border border-primary/15">
                  <p className="text-[11px] text-on-primary-container font-semibold uppercase tracking-wider">Final Score</p>
                  <p className="text-2xl font-black text-primary mt-1">{score} / {quizQuestions.length}</p>
                  <p className="text-[10px] text-primary mt-1 font-bold">Earned +{score * 15} Learning Points! ⚡</p>
                </div>

                <button 
                  onClick={() => {
                    setIsQuizOpen(false);
                    triggerToast(`Successfully collected +${score * 15} Learning Points! Check your leaderboards.`);
                  }}
                  className="w-full mt-4 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all active:scale-[0.98]"
                >
                  Claim Points & Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: QUICK SUPPORT INTERACTION */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">support_agent</span>
                <h3 className="text-base font-bold text-on-surface">Academy Help Center</h3>
              </div>
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleSendSupport} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant mb-1.5 uppercase">Ask a Question or Describe your issue</label>
                <textarea 
                  value={supportText}
                  onChange={(e) => setSupportText(e.target.value)}
                  placeholder="Need help with courses, classes, fee payments, or assignments? Detail your request here..."
                  rows="4"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-3 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none font-light"
                  required
                />
              </div>

              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 text-[10px] text-on-primary-container leading-relaxed">
                ℹ️ Support tickets are reviewed by academic advisors and IT technicians. You will receive an email and a system alert once resolved.
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-colors"
                >
                  Submit Ticket
                </button>
                <button 
                  type="button"
                  onClick={() => setIsSupportOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
