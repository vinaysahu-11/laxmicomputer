import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admissions = () => {
  const navigate = useNavigate();

  // Kanban Pipeline State
  const [pipelineData, setPipelineData] = useState({
    applied: [
      {
        id: 'app-1',
        name: 'Liam Henderson',
        email: 'liam.h@email.com',
        course: 'Python Dev',
        time: '2h ago',
        reviewerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBPeJ0t5_sMWv1erIh3ODurWJUwQXxPghYqIhlEapxE43fDFWmp8Uwq7Dg9sIr0JIki_A67I32YldGRd_lJxQbv2ErRv1Nivjeex1baQY5-FFGETcn0Xx5845gdneJhn5iIjmA0t9tCDtPAYOvrdMRVTEIDy3evk9qu_FCiBe-iL1DWPddgUjdwN4qAoshbHPNwq9factWXJWtZRPRedF3QQ6X8GWZZPLFpAIC-tleVBMzMY6r1UmSpXdJ1bTWb-SIxrXyfxxLJUAc'
      },
      {
        id: 'app-2',
        name: 'Sarah Jenkins',
        email: 's.jenkins@test.org',
        course: 'Cybersecurity',
        time: '5h ago',
        reviewerInitials: 'SJ'
      }
    ],
    interviewed: [
      {
        id: 'int-1',
        name: 'Michael Chen',
        course: 'Web Design',
        time: 'Tomorrow, 10 AM',
        detail: 'Zoom Meeting',
        type: 'video',
        date: 'Aug 24, 2023'
      },
      {
        id: 'int-2',
        name: 'Aria Montgomery',
        course: 'UI/UX Found.',
        time: 'Aug 26, 2 PM',
        detail: 'Room 302',
        type: 'room',
        reviewerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZjRpUF-gjcooZfHZUnR2yv2ozDJQ59nk3DSyAxdJOsjTL-IcjK0Tz7RgzvkZzJ5aN_GHVe05eMlmnJqAcP7U1jA3rxdVjCpWn0N-lhDtJnl1ZtFAmpW7XZS20Z3LyqzHTZVCuT7BP6tqJ1nr0gAKsa3dkqbk4rG5Jrb-7_6hOaaPRK3fACbwnfaVgdgefq8inpQHwNAmAA_2MExnh8e1UrqBI1Dm5rgFhVa3uAcNiL3dCeHWshSSfLfwN7Vn48RzHfzx3v27QtkAk'
      }
    ],
    reviewing: [
      {
        id: 'rev-1',
        name: 'David Okoro',
        course: 'Data Science',
        time: 'Action Needed',
        detail: 'Background check pending.'
      }
    ],
    enrolled: []
  });

  const [followups, setFollowups] = useState([
    {
      id: 'fol-1',
      name: 'Emma Watson',
      course: 'Digital Marketing',
      status: 'New Inquiry',
      lastInteraction: 'Email sent 2d ago',
      nextStep: 'Call for interview',
      initials: 'EW',
      color: 'bg-primary-container text-on-primary-container'
    },
    {
      id: 'fol-2',
      name: 'Robert Junior',
      course: 'Python Masterclass',
      status: 'Interviewed',
      lastInteraction: 'F2F Meeting 1d ago',
      nextStep: 'Review Documents',
      initials: 'RJ',
      color: 'bg-tertiary-container text-on-tertiary-container'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApp, setNewApp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: 'Python Dev',
    stage: 'applied'
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApp(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateApplication = (e) => {
    e.preventDefault();
    if (!newApp.firstName || !newApp.lastName || !newApp.email) {
      alert('Please fill in all fields.');
      return;
    }

    const fullName = `${newApp.firstName} ${newApp.lastName}`;
    const initials = `${newApp.firstName.charAt(0)}${newApp.lastName.charAt(0)}`.toUpperCase();

    if (newApp.stage === 'applied') {
      const added = {
        id: `app-${Date.now()}`,
        name: fullName,
        email: newApp.email,
        course: newApp.course,
        time: 'Just now',
        reviewerInitials: initials
      };
      setPipelineData(prev => ({
        ...prev,
        applied: [added, ...prev.applied]
      }));
    } else if (newApp.stage === 'interviewed') {
      const added = {
        id: `int-${Date.now()}`,
        name: fullName,
        course: newApp.course,
        time: 'Tomorrow, 11 AM',
        detail: 'Zoom Meeting',
        type: 'video',
        date: 'Aug 25, 2023'
      };
      setPipelineData(prev => ({
        ...prev,
        interviewed: [added, ...prev.interviewed]
      }));
    } else if (newApp.stage === 'reviewing') {
      const added = {
        id: `rev-${Date.now()}`,
        name: fullName,
        course: newApp.course,
        time: 'Under Review',
        detail: 'Academic records review pending.'
      };
      setPipelineData(prev => ({
        ...prev,
        reviewing: [added, ...prev.reviewing]
      }));
    }

    // Add to follow-up list as well
    const folAdded = {
      id: `fol-${Date.now()}`,
      name: fullName,
      course: newApp.course,
      status: 'New Inquiry',
      lastInteraction: 'Created profile just now',
      nextStep: 'Review Application',
      initials: initials,
      color: 'bg-primary-container text-on-primary-container'
    };
    setFollowups(prev => [folAdded, ...prev]);

    setNewApp({
      firstName: '',
      lastName: '',
      email: '',
      course: 'Python Dev',
      stage: 'applied'
    });
    handleCloseModal();
  };

  const handleReviewCandidate = (name, stage, id) => {
    // Action trigger simulated candidates transition down the board
    if (stage === 'applied') {
      const candidate = pipelineData.applied.find(c => c.id === id);
      if (window.confirm(`Review candidate ${name}? Confirm scheduling an academic interview.`)) {
        // Move from Applied to Interviewed
        setPipelineData(prev => ({
          ...prev,
          applied: prev.applied.filter(c => c.id !== id),
          interviewed: [
            {
              id: `int-${Date.now()}`,
              name: candidate.name,
              course: candidate.course,
              time: 'Aug 28, 11 AM',
              detail: 'Zoom Meeting',
              type: 'video',
              date: 'Aug 28, 2023'
            },
            ...prev.interviewed
          ]
        }));
      }
    } else if (stage === 'reviewing') {
      if (window.confirm(`Approve enrollment for candidate ${name}?`)) {
        // Remove from reviewing (enrolling)
        setPipelineData(prev => ({
          ...prev,
          reviewing: prev.reviewing.filter(c => c.id !== id)
        }));
        alert(`Candidate ${name} has been enrolled successfully! Batches will allocate soon.`);
      }
    }
  };

  const handleContactAction = (action, name) => {
    alert(`Initiating standard administrative candidate ${action} to: ${name}...`);
  };

  const handleExportCSV = () => {
    alert('Preparing admissions pipeline audit logs... Download started.');
  };

  return (
    <div className="space-y-stack-lg">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Admissions Pipeline</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Track and manage the journey of prospective students.</p>
        </div>
        <div className="flex space-x-3 shrink-0">
          <button 
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg font-label-md hover:bg-primary-container/10 transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export CSV</span>
          </button>
          <button 
            onClick={handleOpenModal}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md shadow-sm hover:scale-102 transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Dashboard Stats (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter text-left">
        
        {/* Total Inquiries */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-44">
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-label-sm uppercase tracking-widest text-[11px]">Total Inquiries</span>
            <span className="material-symbols-outlined text-primary">contact_support</span>
          </div>
          <div className="mt-4">
            <h3 className="text-headline-xl font-headline-xl text-primary leading-none font-bold">142</h3>
            <p className="text-body-sm text-on-surface-variant mt-2 flex items-center">
              <span className="text-tertiary font-bold flex items-center mr-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                12%
              </span> 
              vs last month
            </p>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-44">
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-label-sm uppercase tracking-widest text-[11px]">Applications</span>
            <span className="material-symbols-outlined text-tertiary">assignment</span>
          </div>
          <div className="mt-4">
            <h3 className="text-headline-xl font-headline-xl text-on-surface leading-none font-bold">84</h3>
            <p className="text-body-sm text-on-surface-variant mt-2 flex items-center">
              <span className="text-tertiary font-bold flex items-center mr-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                5%
              </span> 
              vs last month
            </p>
          </div>
        </div>

        {/* Waitlisted */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-44">
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-label-sm uppercase tracking-widest text-[11px]">Waitlisted</span>
            <span className="material-symbols-outlined text-outline">hourglass_empty</span>
          </div>
          <div className="mt-4">
            <h3 className="text-headline-xl font-headline-xl text-on-surface leading-none font-bold">18</h3>
            <p className="text-body-sm text-on-surface-variant mt-2">Currently under review</p>
          </div>
        </div>

        {/* New Enrolled */}
        <div className="bg-primary-container/10 p-stack-lg rounded-xl border border-primary/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-44">
          <div className="flex justify-between">
            <span className="text-primary font-label-sm uppercase tracking-widest text-[11px]">New Enrolled</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <div className="mt-4">
            <h3 className="text-headline-xl font-headline-xl text-primary leading-none font-bold">52</h3>
            <div className="w-full bg-primary-container/20 h-2 rounded-full mt-4">
              <div className="bg-primary h-2 rounded-full w-[65%]"></div>
            </div>
            <p className="text-body-sm text-primary mt-2">65% Target achieved</p>
          </div>
        </div>

      </div>

      {/* Application Pipeline View */}
      <div className="space-y-stack-md text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Application Stages</h3>
          <div className="flex space-x-2">
            <button className="p-2 rounded hover:bg-surface-container text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">view_kanban</span>
            </button>
            <button className="p-2 rounded hover:bg-surface-container text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined">format_list_bulleted</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-gutter overflow-x-auto pb-6 pipeline-scroll custom-scrollbar">
          
          {/* Column: Applied */}
          <div className="min-w-[320px] bg-surface-container-low rounded-xl p-4 flex flex-col max-h-[600px] h-[500px]">
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-outline"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">Applied</span>
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">{pipelineData.applied.length}</span>
              </div>
              <button className="text-on-surface-variant hover:text-primary flex items-center justify-center"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              {pipelineData.applied.map((app) => (
                <div key={app.id} className="glass-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold uppercase">{app.course}</span>
                    <span className="text-[10px] text-on-surface-variant">{app.time}</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{app.name}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1 font-light">{app.email}</p>
                  <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {app.reviewerImage ? (
                        <img 
                          alt="Reviewer" 
                          className="w-6 h-6 rounded-full border-2 border-surface object-cover" 
                          src={app.reviewerImage}
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-outline-variant flex items-center justify-center text-[9px] text-on-surface font-bold border border-surface">
                          {app.reviewerInitials}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => handleReviewCandidate(app.name, 'applied', app.id)}
                      className="text-primary font-label-sm hover:underline font-bold text-xs"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
              {pipelineData.applied.length === 0 && (
                <div className="p-8 text-center text-xs text-on-surface-variant/70 font-light border border-dashed border-outline-variant/60 rounded-lg">
                  No applicants at this stage.
                </div>
              )}
            </div>
          </div>

          {/* Column: Interview Scheduled */}
          <div className="min-w-[320px] bg-surface-container-low rounded-xl p-4 flex flex-col max-h-[600px] h-[500px]">
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">Interview Scheduled</span>
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">{pipelineData.interviewed.length}</span>
              </div>
              <button className="text-on-surface-variant hover:text-primary flex items-center justify-center"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              {pipelineData.interviewed.map((int) => (
                <div key={int.id} className="glass-card p-4 rounded-lg shadow-sm border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] bg-primary-container/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{int.course}</span>
                    <span className="text-[10px] text-primary font-bold">{int.time}</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{int.name}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1 flex items-center gap-1 font-light">
                    <span className="material-symbols-outlined text-[14px]">
                      {int.type === 'video' ? 'videocam' : 'location_on'}
                    </span> 
                    {int.detail}
                  </p>
                  <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center">
                    <div className="flex items-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] mr-1">calendar_today</span>
                      <span className="text-[10px] font-semibold">{int.date || 'Aug 24, 2023'}</span>
                    </div>
                    <button 
                      onClick={() => alert(`Rescheduling session for candidate: ${int.name}`)}
                      className="bg-primary text-on-primary px-3 py-1 rounded text-[10px] font-bold active:scale-95 duration-100"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
              {pipelineData.interviewed.length === 0 && (
                <div className="p-8 text-center text-xs text-on-surface-variant/70 font-light border border-dashed border-outline-variant/60 rounded-lg">
                  No interviews scheduled.
                </div>
              )}
            </div>
          </div>

          {/* Column: Under Review */}
          <div className="min-w-[320px] bg-surface-container-low rounded-xl p-4 flex flex-col max-h-[600px] h-[500px]">
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">Reviewing</span>
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">{pipelineData.reviewing.length}</span>
              </div>
              <button className="text-on-surface-variant hover:text-primary flex items-center justify-center"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              {pipelineData.reviewing.map((rev) => (
                <div key={rev.id} className="glass-card p-4 rounded-lg shadow-sm border-l-4 border-tertiary">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded-full font-bold uppercase">{rev.course}</span>
                    <span className="text-[10px] text-tertiary font-bold">{rev.time}</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{rev.name}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1 font-light">{rev.detail}</p>
                  <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center">
                    <button 
                      onClick={() => alert(`Flagging background check issues for ${rev.name}...`)}
                      className="text-error font-label-sm hover:underline text-xs font-bold"
                    >
                      Flag Issue
                    </button>
                    <button 
                      onClick={() => handleReviewCandidate(rev.name, 'reviewing', rev.id)}
                      className="bg-tertiary text-on-tertiary px-3 py-1 rounded text-[10px] font-bold active:scale-95 duration-100"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
              {pipelineData.reviewing.length === 0 && (
                <div className="p-8 text-center text-xs text-on-surface-variant/70 font-light border border-dashed border-outline-variant/60 rounded-lg">
                  No candidate folders under active review.
                </div>
              )}
            </div>
          </div>

          {/* Column: Enrolled */}
          <div className="min-w-[320px] bg-surface-container-low rounded-xl p-4 flex flex-col max-h-[600px] h-[500px]">
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">Enrolled</span>
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">42</span>
              </div>
              <button className="text-on-surface-variant hover:text-primary flex items-center justify-center"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              <div className="bg-white/40 p-4 rounded-lg border border-dashed border-outline-variant opacity-80">
                <div className="flex items-center justify-center py-8 flex-col text-on-surface-variant">
                  <span className="material-symbols-outlined text-[32px] mb-2 text-primary">verified_user</span>
                  <p className="font-label-sm text-center leading-snug font-bold">Batch finalized for <br/> Sept Intake</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Recent Activity / Action Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm text-left">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Follow-up List</h3>
          <div className="flex space-x-2">
            <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-xs font-bold">3 High Priority</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4 font-semibold">Candidate</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Last Interaction</th>
                <th className="px-6 py-4 font-semibold">Next Step</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
              {followups.map((fol) => (
                <tr key={fol.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${fol.color}`}>
                        {fol.initials}
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface font-bold leading-none">{fol.name}</p>
                        <p className="text-[10px] text-on-surface-variant mt-1">{fol.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-on-surface">{fol.course}</td>
                  <td className="px-6 py-4">{fol.lastInteraction}</td>
                  <td className="px-6 py-4">
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-[10px] font-bold">
                      {fol.nextStep}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => handleContactAction('phone call', fol.name)}
                        className="p-2 text-primary hover:bg-primary-container/20 rounded-full transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[18px]">phone</span>
                      </button>
                      <button 
                        onClick={() => handleContactAction('work email dispatch', fol.name)}
                        className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-surface-container-low flex justify-center border-t border-outline-variant/30">
          <button 
            onClick={() => alert('Reviewing deep history logs of admissions campaigns...')}
            className="text-primary font-label-md flex items-center hover:underline font-bold text-sm"
          >
            View All Admissions Activity 
            <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={handleOpenModal}
        className="fixed bottom-8 right-8 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-50 border border-primary-fixed"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </button>

      {/* Modal: Enroll New Application */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low text-left">
              <h3 className="font-headline-sm text-headline-sm">Record New Student Application</h3>
              <button 
                className="p-2 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateApplication} className="p-stack-md space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">First Name</label>
                  <input 
                    name="firstName"
                    value={newApp.firstName}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    placeholder="Enter first name" 
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">Last Name</label>
                  <input 
                    name="lastName"
                    value={newApp.lastName}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    placeholder="Enter last name" 
                    type="text"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">Email Address</label>
                <input 
                  name="email"
                  value={newApp.email}
                  onChange={handleInputChange}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                  placeholder="candidate@gmail.com" 
                  type="email"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">Course Preference</label>
                  <select 
                    name="course"
                    value={newApp.course}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                  >
                    <option value="Python Dev">Python Dev</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Web Design">Web Design</option>
                    <option value="UI/UX Found.">UI/UX Found.</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">Pipeline Stage</label>
                  <select 
                    name="stage"
                    value={newApp.stage}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                  >
                    <option value="applied">Applied</option>
                    <option value="interviewed">Interview Scheduled</option>
                    <option value="reviewing">Under Reviewing</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={handleCloseModal} 
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-shadow shadow-md active:scale-95" 
                  type="submit"
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admissions;
