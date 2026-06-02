import React, { useState, useEffect, useRef } from 'react';

const Classes = () => {
  // Tab State
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Modals States
  const [isLiveOpen, setIsLiveOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeInstructorChat, setActiveInstructorChat] = useState(null); // instructor object or null
  const [selectedRecordedVideo, setSelectedRecordedVideo] = useState(null); // video object or null
  const [isMentorBookingOpen, setIsMentorBookingOpen] = useState(false);
  const [instructorProfile, setInstructorProfile] = useState(null); // instructor object or null

  // Simulated Direct Chat State
  const [chatMessageText, setChatMessageText] = useState('');
  const [chatConversations, setChatConversations] = useState({
    'Elena': [
      { sender: ' Elena', text: 'Hi Arjun! How is your Fullstack Web Development module going?', time: 'Yesterday' }
    ],
    'Mark': [
      { sender: 'Mark', text: 'Hello Arjun, did you get a chance to review the SQL relational algebra slides?', time: '2 days ago' }
    ]
  });

  // Support/Mentor session Booking State
  const [bookingDate, setBookingDate] = useState('2026-06-05');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingSubject, setBookingSubject] = useState('React Performance Optimization');

  // Live Stream Chat simulated list
  const [liveStreamMessages, setLiveStreamMessages] = useState([
    { user: 'Siddharth R.', text: 'Is the Virtual DOM faster than direct DOM manipulation in all cases?' },
    { user: 'Anjali Sharma', text: 'Sarah, will thunk actions be covered next week?' },
    { user: 'Prof. Sarah Jenkins', text: 'Yes Anjali, next Wednesday we deep-dive into async middleware!' }
  ]);
  const [liveUserMsg, setLiveUserMsg] = useState('');

  // Auto-scroll for Live stream Chat
  const liveChatEndRef = useRef(null);

  useEffect(() => {
    if (isLiveOpen && liveChatEndRef.current) {
      liveChatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [liveStreamMessages, isLiveOpen]);

  // Handle toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Copy streaming Link
  const handleShareLink = () => {
    navigator.clipboard.writeText('https://zoom.us/j/9820491823?pwd=AdvancedReactArchitecture');
    triggerToast('Meeting invite link copied to clipboard!');
  };

  // Send Direct Message to instructor
  const handleSendDirectMessage = (e) => {
    e.preventDefault();
    if (!chatMessageText.trim()) return;

    const name = activeInstructorChat.shortName;
    const newMsg = { sender: 'You', text: chatMessageText, time: 'Just now' };

    setChatConversations(prev => ({
      ...prev,
      [name]: [...prev[name], newMsg]
    }));
    setChatMessageText('');

    // Simulate instant auto mentor reply
    setTimeout(() => {
      let replyText = `Thanks for your query Arjun! Let's check this in detail during our interactive lab session tomorrow at 4:30 PM. Keep practicing!`;
      if (name === 'Elena') {
        replyText = `Excellent question Arjun! Webpack & dynamic chunks are key in bundling. I have pushed a sample code branch to our repository. Take a look and let me know!`;
      }
      
      setChatConversations(prev => ({
        ...prev,
        [name]: [...prev[name], { sender: name, text: replyText, time: 'Just now' }]
      }));
    }, 1500);
  };

  // Post message to live chat stream
  const handlePostLiveChat = (e) => {
    e.preventDefault();
    if (!liveUserMsg.trim()) return;
    setLiveStreamMessages(prev => [
      ...prev,
      { user: 'You (Arjun)', text: liveUserMsg }
    ]);
    setLiveUserMsg('');

    // Simulate Sarah replying in live chat
    setTimeout(() => {
      setLiveStreamMessages(prev => [
        ...prev,
        { user: 'Prof. Sarah Jenkins', text: 'Good question Arjun! Custom hooks indeed isolate side-effects perfectly!' }
      ]);
    }, 1800);
  };

  // Submit Mentor Session
  const handleBookMentor = (e) => {
    e.preventDefault();
    triggerToast(`Mentor Session Scheduled successfully for ${bookingDate} at ${bookingTime}! Check your dashboard alerts.`);
    setIsMentorBookingOpen(false);
  };

  // Instructors static dataset
  const instructors = [
    {
      name: 'Prof. Elena Rodriguez',
      role: 'Fullstack Engineer & Architect',
      shortName: 'Elena',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiygsGDKmh2NbxfKewp8skUpVKcVolxCv0wosM2qmnggalD0w3HvSXbKSIC4FWHV48Kf9LmSizPSelg1KSBMx79C5NqCw2whqAo-XqbdBYORwre9GwBv2s92plm4R9gdqhbGe1dsMS36EXwzuf-LQTYYzEVWYp8dvx8P7ptgw2htr6vmAoZApfo_WL9IgN5XGv-aVo0Pg9-oin4QmPmB7RfcUjCQuG-p0peICHa6Bb6miHbWLReSSvq92KP28dVwIcO_72lJb6pGnr',
      bio: 'Elena has over 12 years of core development experience building high-scale distributed systems. Previously at Stripe and Netflix, she currently teaches advanced frontend patterns and node microservices.'
    },
    {
      name: 'Mark Sterling',
      role: 'Lead Data Analyst & DB Admin',
      shortName: 'Mark',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA03NRY3SAn1P1QRNJpdzaYB8OGpBoWoGBiH2WZ7xahSwa8aVWN8BWAAaiEIWWsvXM2w2-sMxsifB54jfdfsygaizjdq94AZSAOoUgbm_1gZ1Iu1bWTiTGYwvK2edK8WBO6psxitbrWBzrIer0OpfTzVcRFCTrQxkNVdxmKtR17WwKKsQiF2RjdOQRYYq87U4fPi9S-WT_Br3TlfDkPIzF5xMO1NF9Mq_430vyAP0QkIPLg4aY3--ae0utoWSfgvjT7MhQ34-rN4aMl',
      bio: 'Mark specializes in relational analytics, graph query optimizations, and database scaling methodologies. He manages Laxmi Education Masterclasses on SQL warehousing.'
    }
  ];

  // Recorded Sessions static dataset
  const recordedSessions = [
    {
      id: 'rec-1',
      title: 'Intro to State Management',
      sub: 'Foundations of Redux Toolkit & Selectors',
      week: 'Week 3',
      date: '2 days ago',
      duration: '45:12',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUaOJJJraEzICJ_LOJsYyNEwFgByDL8lHuq58aV1nrhPlSHy4k3Mo2d_L_xHF1GjcaaBuRQ8pFgi7jo9fvA2JRhyh6E2sb1C-Ft1nBy-wbnRYZmR8Wj_0UHnAvoJA1-MOVYOAxQUuHpskT7K-SeYXTWOHApdAjjdOU5lxuDanZM72kHCySurDsU9AQ2shR0MBy8maygR8as1G0rUinEYdsYtAMS_h19xHgduSzKO1p7HrgkwBKomWGyIfD9cswXvelFRcIL0e7lxxL',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      id: 'rec-2',
      title: 'Tailwind CSS Advanced Layouts',
      sub: 'Mastering Grid templates, Flexbox & Responsive design',
      week: 'Week 3',
      date: '4 days ago',
      duration: '58:04',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-bqSL0fRdmq-f13J8vjg9sywwZzuW1bDglbcGWcCncYQqqGw56OK_p4TtMCLaBrm_cvSXzaoK9HaA5rgV6d329rfc32Adm4fWNXgH7iYvGbJA0Xa7s86pfxdZJUuXxoYvQ3RcpF3UHdoocq_iMgxltgUNGsnsoySWkiZRj_PneSjNAf3xFGJNSBaSJyEs9Yvjw26fRwyrL3mM4D-dihDXCLWcrD4XxhGdyPrpZn80kzuHd3Db1TOEKFZ4Nn7v224rLHIvqOzHAA8B',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4'
    },
    {
      id: 'rec-3',
      title: 'Authentication with Firebase',
      sub: 'Setting up secure OAuth, login gates, and token states',
      week: 'Week 2',
      date: '1 week ago',
      duration: '32:45',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa17MCHPFXHxqT7JuuFeBYxkLb_pewPgh8q4iBXZFM0kFbz6YA1HmWxRQTNTIHspA1CJqeg4j-C8XHf5fop4fYI3_sYM6_NGKiI-qn6ps2l92A1hw-X0BwK2WovXX5UXt3UEEqy4PCdxP5skpwYmnneebVAGTQvpYNg8yVHe54ntLcSrGYan8vbQdmqFTkG69y-DxyalAjKk00e-eHq4ZgDX7VYZ1-yZE4-0Us_ZXYltNxliUbsOfpjG-p9Nm0ul7rFfmSlpgydlso',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      id: 'rec-4',
      title: 'API Integration Best Practices',
      sub: 'Error handling with fetch, axios interceptors, retry layers',
      week: 'Week 2',
      date: '10 days ago',
      duration: '1:15:20',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXncCWrrE8Y8c1NsF3XY3RtDQqPKsxjIk-VdLPiiQ04hX74qa2tKoi1J5SIhVG1hyI4Ztiwykni_t8FOmn1Joq-77OVCwqsTdtLSBQMx5f7crZ3bUvdBqKTkEMmTzeBMkwPcr5QqN_Xz-SkP-GbhUw5jyfMHUtgeeaejiZ7pZaUWuTskmoS9H69cCfFKDkOQ5jGRqs5TKsgHcf6naVI773ZmpW_tB3vcqYVW6uIYp7TctqeppaeWbAXQdgOJD29ImaYuO_5w3YT9gB',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4'
    }
  ];

  // Attended Class History static dataset
  const classHistory = [
    { id: 'hist-1', title: 'React Hooks & functional state managers', date: 'May 30, 2026', type: 'Online Live', status: 'Attended', rate: '100% Duration' },
    { id: 'hist-2', title: 'Relational Database normal forms (1NF/2NF/3NF)', date: 'May 28, 2026', type: 'Physical Lab', status: 'Attended', rate: '95% Duration' },
    { id: 'hist-3', title: 'CSS Flexbox architectures and responsive design', date: 'May 26, 2026', type: 'Physical Lab', status: 'Attended', rate: '100% Duration' },
    { id: 'hist-4', title: 'Introduction to Asynchronous Node operations', date: 'May 24, 2026', type: 'Online Live', status: 'Excused', rate: 'Medical Leave' }
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold">Class Schedule</h2>
          <p className="font-body-md text-on-surface-variant text-xs mt-1">Manage your online sessions and campus workshops</p>
        </div>
        <div className="flex bg-surface-container border border-outline-variant/20 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-5 py-2 rounded-md font-label-md text-xs font-bold transition-all border-none outline-none cursor-pointer ${
              activeTab === 'active' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:bg-surface-container-high/50'
            }`}
          >
            Active Sessions
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-5 py-2 rounded-md font-label-md text-xs font-bold transition-all border-none outline-none cursor-pointer ${
              activeTab === 'history' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:bg-surface-container-high/50'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {activeTab === 'active' ? (
        <>
          {/* Bento Grid Content */}
          <div className="grid grid-cols-12 gap-gutter">
            
            {/* ACTIVE LIVE CLASS (Bento Large) */}
            <div className="col-span-12 lg:col-span-8 group relative overflow-hidden rounded-xl bg-primary shadow-lg p-stack-lg text-white">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-error px-3 py-1 rounded-full mb-4 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider">Live Now</span>
                  </div>
                  <h3 className="font-headline-lg text-2xl font-bold mb-2">Advanced React Architecture</h3>
                  <p className="text-primary-fixed text-xs max-w-md leading-relaxed">
                    Deep dive into custom hooks, performance optimization, and server-side components with industry experts.
                  </p>
                </div>
                
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden shrink-0">
                      <img 
                        alt="Instructor" 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuARbKs-uSahSURYwnlCtau1vnC4NZwnvHW2Id5LtSkpvlUuOQb-YO8dcZCJlHi28BD_b0dHHiLQvUelVoNNwtWOgWev2NQ80GINUS9WTr6lHaZAei16-iqC8MWjCUFnHS0WAblsWaCjybaLkh91LjKm2eEreGUuYvL_dfU412_vSwzRwq2a1KOLgAfaVDs3TPiAev6u0dOKBbh-fBvZwMaeOmAusHl4HtoSSHQIOD1GtC2A8Sq7cshR9X22AjZEXftfddLDnsQZI4Xh"
                      />
                    </div>
                    <div>
                      <p className="font-label-md text-xs font-bold">Dr. Sarah Jenkins</p>
                      <p className="text-primary-fixed text-[10px] font-medium">Senior Frontend Lead @ TechCorp</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsLiveOpen(true)}
                      className="px-6 py-2.5 bg-white text-primary rounded-lg font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2 border-none outline-none cursor-pointer text-xs"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">play_circle</span>
                      Join Live Class
                    </button>
                    <button 
                      onClick={handleShareLink}
                      className="p-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors border-none outline-none cursor-pointer text-white flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-base">share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CLASSROOM DETAILS (Bento Small) */}
            <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-stack-lg flex flex-col justify-between">
              <div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface mb-4">Physical Session</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-secondary-container text-primary rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">location_on</span>
                    </div>
                    <div className="text-left">
                      <p className="font-label-md text-xs font-bold text-on-surface">Innovation Lab 402</p>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">North Wing, 4th Floor</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-secondary-container text-primary rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                    </div>
                    <div className="text-left">
                      <p className="font-label-md text-xs font-bold text-on-surface">Today, 04:30 PM</p>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Duration: 2 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div 
                  onClick={() => setIsMapOpen(true)}
                  className="w-full h-24 rounded-lg bg-surface-container relative overflow-hidden group cursor-pointer border border-outline-variant/20"
                >
                  <img 
                    alt="Map Preview" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHcEuu1oe51zbfu1Nb1KhzN1VtFAUhyShvihnW-LKUDumECo1X7MDB6LpnuTln4LwjHGUORaHojd2D_gVc9Ny7QFwXJ99LREOhv8HXJF5ztDfd-nbFPx-qmEgmDEOIW7fNFxlQ0Qzci8OFRuczAQXb6oUdJpHX7etgFT-b97LzS4Fap8gXO7l36y8IOiNu3RoDsS0hiR_Fqd7YlIAnHqz5M015oqAY-RW5Wc2AtoHrehBHnWIW8NAB8YbD0Yoa8u2pQX5v-o6A0Y_U"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <span className="bg-white/95 px-3 py-1.5 rounded-full text-[10px] font-extrabold text-primary shadow-md group-hover:scale-105 transition-transform">
                      Open Campus Map
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* UPCOMING CLASSES (Bento Medium) */}
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Upcoming Classes</h3>
                <button 
                  onClick={() => setIsCalendarOpen(true)}
                  className="text-primary font-label-md text-xs font-bold hover:underline bg-transparent border-none cursor-pointer p-0"
                >
                  Full Calendar
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Class Card 1 */}
                <div className="glass-card hover:bg-white rounded-xl p-4 flex items-center gap-6 transition-all hover:translate-x-1 group border-l-4 border-l-tertiary-container text-left">
                  <div className="w-12 flex flex-col items-center shrink-0 border-r border-outline-variant/30 pr-3">
                    <span className="text-[10px] font-extrabold text-on-surface-variant uppercase">Oct</span>
                    <span className="text-lg font-bold text-primary">24</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-extrabold text-tertiary uppercase tracking-wider mb-1">Backend Development</p>
                    <h4 className="font-headline-sm text-sm font-semibold text-on-surface">Microservices with Node.js</h4>
                    <div className="flex items-center gap-4 mt-1.5">
                      <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-light">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        10:00 AM - 12:00 PM
                      </div>
                      <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-light">
                        <span className="material-symbols-outlined text-sm">meeting_room</span>
                        Online (Zoom)
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => triggerToast("Registration reminder added for Oct 24th Microservices lecture.")}
                    className="opacity-0 group-hover:opacity-100 p-2 text-primary hover:bg-primary-container/20 rounded-full transition-all border-none bg-transparent cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">notifications</span>
                  </button>
                </div>

                {/* Class Card 2 */}
                <div className="glass-card hover:bg-white rounded-xl p-4 flex items-center gap-6 transition-all hover:translate-x-1 group border-l-4 border-l-secondary text-left">
                  <div className="w-12 flex flex-col items-center shrink-0 border-r border-outline-variant/30 pr-3">
                    <span className="text-[10px] font-extrabold text-on-surface-variant uppercase">Oct</span>
                    <span className="text-lg font-bold text-primary">25</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-extrabold text-secondary uppercase tracking-wider mb-1">UI/UX Design</p>
                    <h4 className="font-headline-sm text-sm font-semibold text-on-surface">Heuristic Evaluation Workshop</h4>
                    <div className="flex items-center gap-4 mt-1.5">
                      <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-light">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        02:00 PM - 03:30 PM
                      </div>
                      <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-light">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        Studio B
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => triggerToast("Registration reminder added for Oct 25th UI/UX evaluation session.")}
                    className="opacity-0 group-hover:opacity-100 p-2 text-primary hover:bg-primary-container/20 rounded-full transition-all border-none bg-transparent cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">notifications</span>
                  </button>
                </div>
              </div>
            </div>

            {/* TEACHER INFO CARDS (Bento Sidebar) */}
            <div className="col-span-12 lg:col-span-5 space-y-4">
              <h3 className="font-headline-sm text-base font-bold text-on-surface">Course Instructors</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {instructors.map((inst, idx) => (
                  <div key={idx} className="glass-card p-4 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow text-left">
                    <img 
                      alt="Teacher Avatar" 
                      className="w-14 h-14 rounded-lg object-cover border border-outline-variant/30 cursor-pointer" 
                      src={inst.avatar}
                      onClick={() => setInstructorProfile(inst)}
                    />
                    <div>
                      <h5 className="font-bold text-xs text-on-surface hover:text-primary cursor-pointer" onClick={() => setInstructorProfile(inst)}>
                        {inst.name}
                      </h5>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">{inst.role}</p>
                      <div className="flex gap-2 mt-2">
                        <button 
                          onClick={() => setInstructorProfile(inst)}
                          className="text-[9px] bg-primary/10 text-primary px-2.5 py-1 rounded font-bold border-none cursor-pointer hover:bg-primary/20"
                        >
                          Profile
                        </button>
                        <button 
                          onClick={() => setActiveInstructorChat(inst)}
                          className="text-[9px] bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded font-bold border-none cursor-pointer hover:opacity-85"
                        >
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECORDED SESSIONS (Section) */}
            <div className="col-span-12 space-y-4">
              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-6">
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Recorded Sessions</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => triggerToast("Session filter list: All courses active by default.")}
                    className="p-2 border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors bg-white flex items-center justify-center cursor-pointer outline-none"
                  >
                    <span className="material-symbols-outlined text-base">filter_list</span>
                  </button>
                  <button 
                    onClick={() => triggerToast("Viewing all available recorded session backups.")}
                    className="px-4 py-2 border border-outline-variant/30 rounded-lg font-label-md text-xs font-bold hover:bg-surface-container bg-white cursor-pointer transition-all"
                  >
                    View All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {recordedSessions.map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => setSelectedRecordedVideo(video)}
                    className="bg-white dark:bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/25 group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-left"
                  >
                    <div className="relative aspect-video">
                      <img 
                        alt="Video Thumbnail" 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                        src={video.thumbnail}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[9px] px-2 py-0.5 rounded font-bold">
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-0.5 bg-surface-container-high rounded text-[9px] font-bold text-on-surface-variant">
                          {video.week}
                        </span>
                        <span className="text-[9px] text-outline font-medium">{video.date}</span>
                      </div>
                      <h4 className="font-bold text-xs text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-[10px] text-on-surface-variant line-clamp-1 mt-1 leading-normal">
                        {video.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      ) : (
        /* HISTORY TAB DISPLAY */
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="glass-card rounded-xl p-6 text-left">
            <h3 className="font-headline-sm text-base font-bold text-on-surface mb-2">Class History Logs</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Review your course logs and download recorded files for physical syllabus sessions completed previously.
            </p>

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/35 text-outline uppercase text-[10px] font-bold">
                    <th className="py-3 px-4">Lecture Title</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4">Performance Check</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15">
                  {classHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-on-surface">{item.title}</td>
                      <td className="py-4 px-4 text-on-surface-variant">{item.date}</td>
                      <td className="py-4 px-4 text-on-surface-variant font-medium">{item.type}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                          item.status === 'Attended' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-primary">{item.rate}</td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => triggerToast(`Downloading course lecture files for "${item.title}"...`)}
                          className="bg-primary/10 text-primary border-none font-bold hover:bg-primary hover:text-white px-3 py-1.5 rounded text-[10px] cursor-pointer transition-all"
                        >
                          Download Files
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mentor scheduling */}
      <button 
        onClick={() => setIsMentorBookingOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-none cursor-pointer outline-none group"
      >
        <span className="material-symbols-outlined text-2xl">support_agent</span>
        <span className="absolute right-full mr-3 bg-on-surface text-surface text-[10px] font-bold px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 pointer-events-none shadow-md">
          Mentor Session Booking
        </span>
      </button>

      {/* MODAL 1: LIVE LECTURE PLAYER & ACTIVE CHAT */}
      {isLiveOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col lg:flex-row h-[90vh] lg:h-[80vh] border border-outline-variant/15 text-left">
            
            {/* Video Player (Left 2/3) */}
            <div className="flex-1 bg-black flex flex-col relative h-3/5 lg:h-full">
              {/* Fake Live Video Simulation */}
              <div className="flex-1 flex flex-col justify-center items-center text-white p-6 text-center relative overflow-hidden bg-gradient-to-br from-blue-900 to-black">
                
                {/* Simulated webcam of Sarah */}
                <div className="absolute top-4 left-4 z-20 bg-black/60 px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-1.5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                  LIVE: Sarah Jenkins
                </div>

                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-xl mb-4 relative z-10 animate-pulse">
                  <img 
                    alt="Instructor" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARbKs-uSahSURYwnlCtau1vnC4NZwnvHW2Id5LtSkpvlUuOQb-YO8dcZCJlHi28BD_b0dHHiLQvUelVoNNwtWOgWev2NQ80GINUS9WTr6lHaZAei16-iqC8MWjCUFnHS0WAblsWaCjybaLkh91LjKm2eEreGUuYvL_dfU412_vSwzRwq2a1KOLgAfaVDs3TPiAev6u0dOKBbh-fBvZwMaeOmAusHl4HtoSSHQIOD1GtC2A8Sq7cshR9X22AjZEXftfddLDnsQZI4Xh"
                  />
                </div>
                
                <h4 className="text-base font-bold relative z-10 max-w-md">Dr. Sarah Jenkins is presenting: React Custom Hooks & Performance Profiling</h4>
                <p className="text-[11px] text-blue-200 mt-2 max-w-sm relative z-10 font-light">
                  "Ensure you are extracting logic into modular hooks to keep your functional render loops light."
                </p>

                {/* Simulated code snippet card overlay */}
                <div className="bg-black/80 border border-outline-variant/25 rounded-lg p-3 max-w-sm w-full mt-4 text-left font-mono text-[9px] text-green-400 overflow-x-auto relative z-10 shadow-md">
                  <span className="text-blue-400">const</span> useFetch = (url) =&gt; &#123; <br />
                  &nbsp;&nbsp;<span className="text-blue-400">const</span> [data, setData] = useState(null);<br />
                  &nbsp;&nbsp;useEffect(() =&gt; &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;fetch(url).then(res =&gt; res.json()).then(setData);<br />
                  &nbsp;&nbsp;&#125;, [url]);<br />
                  &nbsp;&nbsp;<span className="text-blue-400">return</span> data;<br />
                  &#125;;
                </div>
              </div>

              {/* Video control bars */}
              <div className="bg-black border-t border-white/10 px-4 py-3 flex justify-between items-center z-10">
                <div className="flex items-center gap-4 text-white">
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary text-base">pause</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary text-base">volume_up</span>
                  <span className="text-[10px] text-outline font-semibold font-mono">01:14:02 / 02:00:00</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <span className="bg-error px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">720p HD</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary text-base">fullscreen</span>
                </div>
              </div>
            </div>

            {/* Chat Stream Panel (Right 1/3) */}
            <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-outline-variant/20 flex flex-col h-2/5 lg:h-full">
              
              <div className="bg-surface p-4 border-b border-outline-variant/25 flex justify-between items-center shrink-0">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Interactive Lecture Chat</h4>
                  <p className="text-[9px] text-outline font-medium">Post questions directly to the faculty instructor</p>
                </div>
                <button 
                  onClick={() => setIsLiveOpen(false)}
                  className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Messages display */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-container-lowest scrollbar-hide">
                {liveStreamMessages.map((msg, idx) => (
                  <div key={idx} className="text-xs text-left leading-normal">
                    <span className={`font-bold ${
                      msg.user === 'You (Arjun)' ? 'text-primary' : 
                      msg.user === 'Prof. Sarah Jenkins' ? 'text-error' : 'text-on-surface'
                    }`}>
                      {msg.user}:
                    </span>
                    <span className="text-on-surface-variant font-light ml-1.5">{msg.text}</span>
                  </div>
                ))}
                <div ref={liveChatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handlePostLiveChat} className="p-3 bg-surface border-t border-outline-variant/25 shrink-0 flex gap-2">
                <input 
                  type="text" 
                  value={liveUserMsg}
                  onChange={(e) => setLiveUserMsg(e.target.value)}
                  placeholder="Ask Prof. Sarah something..."
                  className="flex-1 bg-surface-container-low border border-outline-variant/35 rounded-lg px-3 py-1.5 text-[11px] focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white p-2 rounded-lg flex items-center justify-center border-none cursor-pointer hover:bg-primary/95"
                >
                  <span className="material-symbols-outlined text-sm font-bold">send</span>
                </button>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: INTERACTIVE CAMPUS MAP FLOOR PLAN */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-on-surface">Academy Wayfinding Layout</h3>
                <p className="text-[10px] text-outline font-medium mt-0.5">Innovation Lab 402 Location and Guidelines</p>
              </div>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full h-64 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/20 relative">
                <img 
                  alt="Full Campus Layout Map" 
                  className="w-full h-full object-cover grayscale opacity-60" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHcEuu1oe51zbfu1Nb1KhzN1VtFAUhyShvihnW-LKUDumECo1X7MDB6LpnuTln4LwjHGUORaHojd2D_gVc9Ny7QFwXJ99LREOhv8HXJF5ztDfd-nbFPx-qmEgmDEOIW7fNFxlQ0Qzci8OFRuczAQXb6oUdJpHX7etgFT-b97LzS4Fap8gXO7l36y8IOiNu3RoDsS0hiR_Fqd7YlIAnHqz5M015oqAY-RW5Wc2AtoHrehBHnWIW8NAB8YbD0Yoa8u2pQX5v-o6A0Y_U"
                />
                
                {/* Simulated pinpoint for Innovation Lab 402 */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                  <div className="bg-primary text-white text-[9px] font-black px-2.5 py-1 rounded shadow-md border border-white/20 whitespace-nowrap">
                    📍 LAB 402 (NORTH WING)
                  </div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full border-2 border-white mt-1 shadow-md"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10 text-xs">
                <div className="text-left space-y-1 leading-normal">
                  <p className="font-bold text-on-primary-container text-[11px] uppercase tracking-wider">Lab Access Guidelines</p>
                  <p className="font-light">✅ Biometric entry enabled via student ID card</p>
                  <p className="font-light">✅ High-Speed developer workstation nodes preconfigured</p>
                  <p className="font-light">✅ LAN and Wi-Fi credentials pre-installed on dashboard</p>
                </div>
                <div className="text-left space-y-1 leading-normal">
                  <p className="font-bold text-on-primary-container text-[11px] uppercase tracking-wider">Location details</p>
                  <p className="font-light">🏢 <strong>Floor:</strong> 4th Floor</p>
                  <p className="font-light">🚪 <strong>Wing:</strong> North Wing adjacent to Seminar Hall B</p>
                  <p className="font-light">📞 <strong>Lab Assistant Desk:</strong> Ext. 409</p>
                </div>
              </div>

              <button 
                onClick={() => setIsMapOpen(false)}
                className="w-full bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all"
              >
                Got It
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: INSTRUCTOR DIRECT MESSAGE Simulated Panel */}
      {activeInstructorChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10 flex flex-col h-[70vh]">
            
            {/* Header info */}
            <div className="bg-surface p-4 border-b border-outline-variant/20 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <img 
                  src={activeInstructorChat.avatar} 
                  alt={activeInstructorChat.name} 
                  className="w-10 h-10 rounded-full object-cover border border-primary/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-on-surface">{activeInstructorChat.name}</h4>
                  <p className="text-[9px] text-green-600 font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                    Active Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActiveInstructorChat(null)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Chat Bubble container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-surface-container-lowest scrollbar-hide text-xs">
              {chatConversations[activeInstructorChat.shortName].map((chat, idx) => {
                const isYou = chat.sender === 'You';
                return (
                  <div key={idx} className={`flex ${isYou ? 'justify-end' : 'justify-start'} text-left leading-relaxed`}>
                    <div className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                      isYou 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-surface-container border border-outline-variant/20 rounded-tl-none'
                    }`}>
                      <p className="font-light">{chat.text}</p>
                      <span className={`text-[8px] font-bold block mt-1.5 ${isYou ? 'text-blue-100 text-right' : 'text-outline'}`}>
                        {chat.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendDirectMessage} className="p-3 bg-surface border-t border-outline-variant/20 shrink-0 flex gap-2">
              <input 
                type="text" 
                value={chatMessageText}
                onChange={(e) => setChatMessageText(e.target.value)}
                placeholder={`Ask ${activeInstructorChat.shortName} something...`}
                className="flex-1 bg-surface-container-low border border-outline-variant/35 rounded-lg px-3 py-2 text-[11px] focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-white p-2.5 rounded-lg flex items-center justify-center border-none cursor-pointer hover:bg-primary/95 transition-all"
              >
                <span className="material-symbols-outlined text-sm font-bold">send</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 4: FULL ACADEMIC CALENDAR DIALOG */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-on-surface">Academic Lecture Calendar</h3>
                <p className="text-[10px] text-outline font-medium mt-0.5">October - November 2026</p>
              </div>
              <button 
                onClick={() => setIsCalendarOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs text-left leading-normal">
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                <p className="font-bold text-on-primary-container text-[11px] uppercase tracking-wider mb-2">Upcoming Calendar Slots</p>
                <div className="space-y-2">
                  <p>🗓️ <strong>Oct 27:</strong> RESTful APIs design schemas with Express (Sarah Jenkins)</p>
                  <p>🗓️ <strong>Oct 29:</strong> Database indexes & partition scaling (Mark Sterling)</p>
                  <p>🗓️ <strong>Nov 01:</strong> Dynamic CSS grids and dark-mode custom parameters (Elena Rodriguez)</p>
                </div>
              </div>

              <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/20">
                <p className="font-bold text-on-surface text-[10px] uppercase tracking-wider mb-1">Calendar Sync info</p>
                <p className="font-light text-on-surface-variant leading-relaxed">
                  Lectures are automatically synced to standard iCal formats. Click down to register sync parameters.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setIsCalendarOpen(false);
                    triggerToast("Sync request triggered successfully! Check your inbox.");
                  }}
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-colors"
                >
                  Sync to Google Calendar
                </button>
                <button 
                  onClick={() => setIsCalendarOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 5: WATCH RECORDED SESSION VIDEO PLAYER LIGHTBOX */}
      {selectedRecordedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/15 flex flex-col h-[75vh]">
            
            <div className="bg-surface p-4 border-b border-outline-variant/20 flex justify-between items-center shrink-0">
              <div>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[9px] font-extrabold">{selectedRecordedVideo.week} Recording</span>
                <h4 className="text-xs font-bold text-on-surface mt-1.5">{selectedRecordedVideo.title}</h4>
              </div>
              <button 
                onClick={() => setSelectedRecordedVideo(null)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none flex items-center justify-center animate-pulse"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Video Canvas */}
            <div className="flex-1 bg-black relative flex flex-col justify-center">
              <video 
                src={selectedRecordedVideo.videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full max-h-full object-contain"
              />
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-xs text-left">
                <p className="font-bold text-on-surface">{selectedRecordedVideo.sub}</p>
                <p className="text-[10px] text-outline mt-0.5">Recorded {selectedRecordedVideo.date} • Duration: {selectedRecordedVideo.duration}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => triggerToast("Downloading offline lecture files & slides...")}
                  className="bg-primary text-white border-none font-bold hover:opacity-90 px-4 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm font-bold">download</span>
                  Lecture Slides
                </button>
                <button 
                  onClick={() => setSelectedRecordedVideo(null)}
                  className="bg-surface-container text-on-surface-variant border border-outline-variant/30 font-bold hover:bg-surface-container-high px-4 py-2 rounded-lg text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 6: SCHEDULE MENTOR 1-ON-1 SESSION BOOKER */}
      {isMentorBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">support_agent</span>
                <h3 className="text-base font-bold text-on-surface">Schedule 1-to-1 Mentor session</h3>
              </div>
              <button 
                onClick={() => setIsMentorBookingOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleBookMentor} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Select Mentor</label>
                <select className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer">
                  {instructors.map((inst, i) => (
                    <option key={i} value={inst.shortName}>{inst.name} ({inst.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Date</label>
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Preferred Time Slot</label>
                  <select 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1.5">Mentorship Topic Description</label>
                <input 
                  type="text" 
                  value={bookingSubject}
                  onChange={(e) => setBookingSubject(e.target.value)}
                  placeholder="e.g. React Performance Profiling or DBMS indexing query"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  required
                />
              </div>

              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-[10px] text-on-primary-container leading-relaxed">
                📢 Mentoring slots are video meetings. You will receive an access code and a reminder email 10 minutes prior to scheduled slots.
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all"
                >
                  Book Session
                </button>
                <button 
                  type="button"
                  onClick={() => setIsMentorBookingOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 7: INSTRUCTOR DETAILED BIOGRAPHY CARD */}
      {instructorProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10 space-y-4">
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img 
                  src={instructorProfile.avatar} 
                  alt={instructorProfile.name} 
                  className="w-16 h-16 rounded-xl object-cover border-2 border-primary-container shadow-sm"
                />
                <div>
                  <h4 className="text-xs font-bold text-on-surface">{instructorProfile.name}</h4>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">{instructorProfile.role}</p>
                </div>
              </div>
              <button 
                onClick={() => setInstructorProfile(null)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-2 text-xs leading-normal">
              <p className="font-bold text-on-surface text-[10px] uppercase tracking-wider">Instructor Biography</p>
              <p className="font-light text-on-surface-variant leading-relaxed">
                {instructorProfile.bio}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  setInstructorProfile(null);
                  setActiveInstructorChat(instructorProfile);
                }}
                className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all"
              >
                Direct Message
              </button>
              <button 
                onClick={() => setInstructorProfile(null)}
                className="flex-1 bg-surface-container text-on-surface-variant py-2.5 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Classes;
