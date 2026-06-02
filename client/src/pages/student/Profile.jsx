import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Profile data states
  const [profileName, setProfileName] = useState('Alexander Pierce');
  const [profileEmail, setProfileEmail] = useState('a.pierce@university.edu');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 012-3456');
  const [profileAddress, setProfileAddress] = useState('124 Computer Way, Suite 400\nSilicon Valley, CA 94025');
  const [profileAvatar, setProfileAvatar] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuBsFr9jo7LNxB8meA0cEsbPx8enHXwpLoajzDBiQlSJubcZcQA4aeAyJueKq68nk66khesh-Cn0gGKBUY_gzolgAuu5pEvc6ZiPyVm6Cl6MLeOmTFBRM-R6OTmhq9iEGS24txQR3ViFde_IwBsxr5cJ3AErDeZxaU_3qLofzxx-RkpMbd8v2a5ubfydXkkWpm51CiLuHHpzuYQRppTsbwaZ1jvksjrmVK894uRWZ_JUVUEydNheeVtpm2sRYN2oH2ouEmxeGTkG0cmS');

  // Modal active state
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form temporary inputs
  const [editName, setEditName] = useState(profileName);
  const [editEmail, setEditEmail] = useState(profileEmail);
  const [editPhone, setEditPhone] = useState(profilePhone);
  const [editAddress, setEditAddress] = useState(profileAddress);

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Profile update submit handler
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProfileName(editName);
    setProfileEmail(editEmail);
    setProfilePhone(editPhone);
    setProfileAddress(editAddress);
    setIsEditOpen(false);
    triggerToast("🎉 Profile details updated successfully!");
  };

  // Avatar upload simulation
  const handleAvatarUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Simulate file upload URL representation
      setProfileAvatar(URL.createObjectURL(file));
      triggerToast("👤 Profile picture uploaded successfully!");
    }
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

      {/* Hero Header / Premium Identity Section */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg group select-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>
        <img 
          alt="Student Life Banner" 
          className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWiaKDRAIsGJS417yQDz-XQVR7xzCPWrZm6HSStVhxcv0cFaT064_gwhWjkclGiHe4Oe9GstpZEBjT2BS01wr-2D4fp_Zs2B20SZZZhyVCWMxullE22PedqGMuRgmHy-DYJ-AU2_-HtyM4-hssdoNTOTz9VT7dybTdWI4ICnFqTuIPECUcEdNi7SmT0CzSeeVmkRY7V7wZaIUmJ7qMdk0LluUU6YriM03cQiZi9j_jVkaWuH3L9J5ylTkpDAsrXXHB2KK6zI1vD41o"
        />
        <div className="absolute bottom-0 left-0 p-8 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
          <div className="flex flex-col md:flex-row md:items-end gap-6 text-left">
            <div className="relative shrink-0">
              <div className="h-32 w-32 md:h-36 md:w-36 rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-white relative">
                <img 
                  alt="Student Portrait" 
                  className="w-full h-full object-cover" 
                  src={profileAvatar}
                />
                
                {/* Camera upload trigger overlay */}
                <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <input 
                    type="file" 
                    onChange={handleAvatarUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="avatar-upload"
                  />
                  <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 h-5 w-5 rounded-full border-4 border-white" title="Active Account"></div>
            </div>
            
            <div className="text-white pb-1">
              <div className="flex flex-wrap items-center gap-3 mb-2 text-left">
                <h2 className="font-headline-lg text-xl md:text-2xl font-black leading-none">{profileName}</h2>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-extrabold uppercase tracking-widest border border-white/30">
                  Verified Student
                </span>
              </div>
              <p className="font-body-md opacity-90 flex items-center gap-1.5 text-xs font-medium">
                <span className="material-symbols-outlined text-base">badge</span>
                Enrollment ID: ITA-2026-8842
              </p>
            </div>
          </div>

          <div className="pb-1 shrink-0 self-end">
            <button 
              onClick={() => {
                setEditName(profileName);
                setEditEmail(profileEmail);
                setEditPhone(profilePhone);
                setEditAddress(profileAddress);
                setIsEditOpen(true);
              }}
              className="bg-white text-primary border-none px-6 py-3 rounded-lg font-bold hover:bg-primary-fixed transition-all cursor-pointer shadow-md active:scale-95 text-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm font-bold">edit</span>
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Personal & Contact Info (Left Col) */}
        <div className="md:col-span-4 flex flex-col gap-gutter text-left">
          
          <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-headline-sm text-sm font-bold text-primary flex items-center gap-2 mb-6 border-b border-outline-variant/15 pb-2 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base font-bold">contact_page</span>
              Contact Details
            </h3>
            
            <div className="space-y-5 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Email Address</span>
                <span className="text-xs font-bold text-on-surface break-all">{profileEmail}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Phone Number</span>
                <span className="text-xs font-bold text-on-surface">{profilePhone}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Mailing Address</span>
                <span className="text-xs font-bold text-on-surface whitespace-pre-line leading-relaxed">{profileAddress}</span>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-primary text-white p-5 rounded-xl shadow-lg relative overflow-hidden text-left border-none select-none">
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[160px]">shield</span>
            </div>
            <h3 className="font-headline-sm text-sm font-bold mb-4 uppercase tracking-wider">Account Standing</h3>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-bold">Good Standing</span>
            </div>
            <div className="space-y-3 relative z-10 text-xs">
              <div 
                onClick={() => triggerToast("Membership is premium tier.")}
                className="flex justify-between items-center bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-white/15"
              >
                <span>Membership</span>
                <span className="font-bold">Premium Tier</span>
              </div>
              <div 
                onClick={() => navigate('/student/payments')}
                className="flex justify-between items-center bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-white/15"
              >
                <span>Renewal Date</span>
                <span className="font-bold">Oct 12, 2026</span>
              </div>
            </div>
          </div>

        </div>

        {/* Academic Overview (Right Col) */}
        <div className="md:col-span-8 space-y-gutter text-left">
          
          {/* Active Course Card */}
          <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden shrink-0 border-r border-outline-variant/20 select-none">
              <img 
                alt="Web Development Course" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOpGouUMlOmOTC3XHP21IVH8U3cNyZ864KlU48WkNo1SmwLJZRV4nbBoWQbkTM-U9vb4r0bJZb1Y5GsHTOtQ37BEdWEVU8A1-T1Kw3aCwujz2yJdHVWjJ5R27KkKCfV39x7fGFvBYHVi4HXRnWnOfvgNYnnyq0gEi5n8ldaPVxJc8YPXgD1tnQjaw4qi-jUsIBEFW8ZNkz-XfIXfI0LW2xtiMca4Kumv2DXDJlZX5ltcoD0A1jPwlHNx51itOwdFM42-PyZiGB7IIa"
              />
            </div>
            
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container rounded text-[9px] font-bold uppercase">
                    Active Course
                  </span>
                  <span className="text-[10px] font-bold text-primary">Batch #ITA-W26</span>
                </div>
                <h3 className="font-headline-md text-base font-bold text-on-surface mb-2">
                  Advanced Full-Stack Engineering
                </h3>
                <p className="text-[11px] text-on-surface-variant font-light leading-relaxed mb-6">
                  Mastering the modern web with React, Node.js, and Cloud Infrastructure deployments.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-on-surface-variant font-medium">Course Progress</span>
                  <span className="text-primary font-bold">68%</span>
                </div>
                <div className="w-full h-1.5 bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: '68%' }}></div>
                </div>
                <div className="flex gap-4 pt-2 font-bold text-[10px] text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    <span>Started Jan 2026</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>3 Months Remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Metrics & Deadlines Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            
            {/* Metrics */}
            <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm text-center">
              <h4 className="font-label-md text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4 text-left border-b border-outline-variant/15 pb-2">
                Academic Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div 
                  onClick={() => navigate('/student/results')}
                  className="p-3 bg-surface rounded-lg border border-outline-variant/20 flex flex-col items-center cursor-pointer hover:bg-primary/5 transition-all"
                >
                  <span className="text-lg font-black text-primary">3.85</span>
                  <span className="text-[9px] font-bold text-on-surface-variant mt-0.5">Current GPA</span>
                </div>
                <div 
                  onClick={() => navigate('/student/attendance')}
                  className="p-3 bg-surface rounded-lg border border-outline-variant/20 flex flex-col items-center cursor-pointer hover:bg-primary/5 transition-all"
                >
                  <span className="text-lg font-black text-primary">94%</span>
                  <span className="text-[9px] font-bold text-on-surface-variant mt-0.5">Attendance</span>
                </div>
                <div 
                  onClick={() => navigate('/student/exams')}
                  className="p-3 bg-surface rounded-lg border border-outline-variant/20 flex flex-col items-center cursor-pointer hover:bg-primary/5 transition-all"
                >
                  <span className="text-lg font-black text-primary">12</span>
                  <span className="text-[9px] font-bold text-on-surface-variant mt-0.5">Projects Done</span>
                </div>
                <div 
                  onClick={() => navigate('/student/certificates')}
                  className="p-3 bg-surface rounded-lg border border-outline-variant/20 flex flex-col items-center cursor-pointer hover:bg-primary/5 transition-all"
                >
                  <span className="text-lg font-black text-primary">02</span>
                  <span className="text-[9px] font-bold text-on-surface-variant mt-0.5">Certificates</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between text-left">
              <div>
                <h4 className="font-label-md text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4 border-b border-outline-variant/15 pb-2">
                  Upcoming Deadlines
                </h4>
                
                <div className="space-y-4 mt-4">
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-lg bg-error-container flex items-center justify-center text-on-error-container shrink-0">
                      <span className="material-symbols-outlined text-lg">assignment_late</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface leading-tight">Database Optimization Labs</p>
                      <p className="text-[10px] text-error font-extrabold mt-0.5">Due in 2 days</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-lg">quiz</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface leading-tight">Weekly Theory Quiz</p>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Due in 5 days</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/student/exams')}
                className="w-full mt-6 py-2 border-2 border-primary text-primary bg-transparent rounded-lg font-bold hover:bg-primary/5 cursor-pointer transition-colors active:scale-95 text-xs outline-none"
              >
                View All Tasks
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* EDIT MODAL DIALOG */}
      {isEditOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit</span>
                <h3 className="text-base font-bold text-on-surface">Update Student Profile</h3>
              </div>
              <button 
                onClick={() => setIsEditOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1.5 uppercase">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1.5 uppercase">Email Address</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1.5 uppercase">Phone Number</label>
                <input 
                  type="text" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1.5 uppercase">Mailing Address</label>
                <textarea 
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  rows="3"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all shadow-sm"
                >
                  Save Changes
                </button>
                <button 
                  type="button"
                  onClick={() => setIsEditOpen(false)}
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

export default Profile;
