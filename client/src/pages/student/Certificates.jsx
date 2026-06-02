import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Certificates = () => {
  const navigate = useNavigate();

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Verification states per certificate ID
  const [verificationStates, setVerificationStates] = useState({});

  // Modals
  const [previewCert, setPreviewCert] = useState(null); // certificate object or null
  const [isIntegrationGuideOpen, setIsIntegrationGuideOpen] = useState(false);

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Verify certificate click simulation
  const handleVerifyCert = (id, title) => {
    if (verificationStates[id] === 'Verified') return;

    // Set checking state
    setVerificationStates(prev => ({ ...prev, [id]: 'Validating' }));
    
    setTimeout(() => {
      setVerificationStates(prev => ({ ...prev, [id]: 'Verified' }));
      triggerToast(`✅ Verification successful! "${title}" is validated on the public ledger.`);
    }, 1500);
  };

  // Certificate catalog
  const certificates = [
    {
      id: 'ITA-293-84',
      title: 'Advanced React Frameworks',
      track: 'Web Development',
      bgTag: 'bg-primary/90 text-on-primary',
      date: 'Oct 12, 2026',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA7FucICeSW_sNP2tIMsa6rMggu9fEMFxPEguPB5snjlaoAFMBae9qhE1Ln7aNEmIIyFZsccutJz3SlSZnUTvSpN1LK1wyxQo7A5URQFgJOIc58WE_qZ0ALpFFMTNInp5vAC9wW-dslKPUUa6Plh_UA8fsVL4W4odSYepGdBl96ZD_s4KXR7AT399xbaGg-S3GWkQWrhrV9LV2-B8lGaQGRGvHA6hBpI-pAQK_2DSryajeY_HMlLB10w-oKfzKH82oExHRs6pgrXBu',
      verifierName: 'Dr. Sarah Jenkins'
    },
    {
      id: 'ITA-112-45',
      title: 'Python for Data Analysis',
      track: 'Data Science',
      bgTag: 'bg-tertiary text-on-tertiary',
      date: 'Sep 05, 2026',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2H_tKex-vMo76kaTTnEqQWQjgpl-1gFTFu04Yr1KrDt-9tDQYOMTfzS_nTA5MySebQMVdbGGwm06MQPPPFXfACipjKJ0BNuiiVnw_-hhVuWu1UaP1EyjVYSuPBR-rRNYyEfhVYKc4yrW0_TCPUP_INLpcvK9xR25bdh7nDzmfTEoI6kB5detaKdwVxdLSIhzL-dbBWf7YdQIE10LaABG_or8d-Gcq1Vv4QiioF_vMKWDyUyxcAQGvBHMnX_5m-evkf4ytM6_ISnI',
      verifierName: 'Prof. Alan Turing'
    },
    {
      id: 'ITA-550-12',
      title: 'Principles of Modern UI/UX',
      track: 'Design',
      bgTag: 'bg-secondary text-on-secondary',
      date: 'Aug 21, 2026',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbbP1gAnq39uSCYNlEBYZw87go3B-AzCGPPEBTT4Zxv0XjPtInLq8HEvzezJ06xR7CxgA3L5TaFvlDIB0T8hFgopbXL0sjKkyl2tiH5Oi_CQVrtioH4YoU0poomnejqD6KR9lOB3Si3mJQ0tjaK48zJkMjYJ6p72yebruURSuhQKxZeY4IrlwnvQZt3F7N5GZfHMVacxqQJqoavOs9Mu9rx45L6zO8Bb5Vi2rMVoYyjXBvZICAAn5hrE_hGMlSr18JRA2t5CtxYs1p',
      verifierName: 'Maria Rossi'
    },
    {
      id: 'ITA-009-88',
      title: 'Ethical Hacking Essentials',
      track: 'Cybersecurity',
      bgTag: 'bg-error text-on-tertiary',
      date: 'July 15, 2026',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0bSdFNn9Aps--i8YFmFSPBJWZ3ptoztiIglnVMPinrUEdxmJ1CXWeGPfCTmGSUzs-2X1SmhEQ6HbJEtqF0wt-6YDWNsl2A6pyuJKLWVbJpUAmT89NjgclqI_reEoPLftPAigrX5v-HVNp-ihVSp9eNkpco1twkZxTP4TCQUAjDPOk-upNiOT7tH2J72i-qKFFvSJEfD1wzwnmZa4gDzFOilNxJoR-q71vr6Bm9X78aJYEYcfTyVvd-sGOTgOqqgeOd8VvQIS6MLyM',
      verifierName: 'Prof. James Wilson'
    }
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
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">My Certificates</h2>
          <p className="text-on-surface-variant font-body-md text-xs mt-1">
            Validate your achievements and showcase your professional growth. All certificates are cryptographically verifiable.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={() => {
              navigator.clipboard.writeText('https://laxmi-education.in/portfolio/LX-2024-089');
              triggerToast("Professional certificate portfolio link copied to clipboard!");
            }}
            className="flex items-center gap-2 px-4 py-2 border border-outline text-on-surface rounded-lg font-bold text-xs hover:bg-surface-container-high transition-colors bg-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">share</span>
            Share All
          </button>
        </div>
      </header>

      {/* Stats Bento Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-md">
        <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-center items-center text-center">
          <span className="text-2xl font-black text-primary">08</span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase mt-1">Earned Certs</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-center items-center text-center">
          <span className="text-2xl font-black text-tertiary">02</span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase mt-1">In Progress</span>
        </div>
        <div className="md:col-span-2 bg-primary-container/10 p-5 rounded-xl border border-primary/20 shadow-sm flex items-center gap-4">
          <div className="bg-primary-container text-on-primary-container p-2.5 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
          </div>
          <div className="text-left leading-normal">
            <p className="font-label-md text-xs font-bold text-primary">Top Performance Tier</p>
            <p className="text-[11px] text-on-surface-variant font-light mt-0.5">
              You are in the top 5% of students completing the Python Web Development track this quarter. Keep up the high standard!
            </p>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter mt-6">
        
        {certificates.map((cert) => (
          <div 
            key={cert.id} 
            className="certificate-card group bg-white rounded-xl border border-outline-variant/35 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between text-left"
          >
            <div className="relative aspect-[1.414/1] bg-surface-container overflow-hidden">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt={cert.title}
                src={cert.thumbnail}
              />
              <div className="absolute inset-0 bg-primary/45 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-auto">
                <button 
                  onClick={() => setPreviewCert(cert)}
                  className="bg-white text-primary px-4 py-2 border-none rounded-lg font-bold text-xs shadow-lg flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer outline-none"
                >
                  <span className="material-symbols-outlined text-sm font-bold">zoom_in</span>
                  Preview Certificate
                </button>
              </div>
              <div className="absolute top-3 left-3 pointer-events-none">
                <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${cert.bgTag}`}>
                  {cert.track}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-headline-sm text-xs font-bold text-on-surface mb-1 line-clamp-1">{cert.title}</h3>
              <p className="text-[10px] text-outline font-medium mb-4">Issued on: {cert.date} • ID: {cert.id}</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => triggerToast(`Successfully started download of verified PDF certificate "${cert.title}"!`)}
                  className="flex-grow flex items-center justify-center gap-1.5 bg-primary text-on-primary py-2 rounded-lg font-bold border-none cursor-pointer hover:bg-primary/90 transition-colors active:scale-[0.98] text-[10px]"
                >
                  <span className="material-symbols-outlined text-sm font-bold">download</span>
                  Download
                </button>
                
                {verificationStates[cert.id] === 'Verified' ? (
                  <div className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-sm text-green-600 font-bold">check_circle</span>
                    Verified
                  </div>
                ) : (
                  <button 
                    onClick={() => handleVerifyCert(cert.id, cert.title)}
                    className="px-4 py-2 border border-outline text-on-surface bg-transparent rounded-lg font-bold text-[10px] hover:bg-surface-container-high cursor-pointer transition-all active:scale-[0.98]"
                  >
                    {verificationStates[cert.id] === 'Validating' ? 'Checking...' : 'Verify'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Locked State Card */}
        <div className="bg-surface-container-low/40 rounded-xl border border-dashed border-outline-variant flex flex-col items-center justify-center p-5 text-center opacity-65 min-h-[260px] text-left">
          <div className="mb-3 text-on-surface-variant/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-[48px]">lock</span>
          </div>
          <h3 className="font-headline-sm text-xs font-bold text-on-surface">Cloud Architecture</h3>
          <p className="text-[10px] text-on-surface-variant mt-1.5 mb-5 max-w-xs leading-normal">
            Complete the final proctored exam to unlock this professional certification pass.
          </p>
          <button 
            onClick={() => navigate('/student/courses')}
            className="px-6 py-2 bg-surface-container-high border-none text-on-surface font-bold text-[10px] rounded-lg hover:bg-surface-container-highest transition-colors cursor-pointer active:scale-95"
          >
            Resume Course
          </button>
        </div>

      </div>

      {/* Floating Info Action (bottom) */}
      <div className="mt-6 p-4 bg-secondary-container/20 border border-secondary/25 rounded-xl flex flex-col md:flex-row items-center gap-4 text-left leading-normal">
        <span className="material-symbols-outlined text-secondary text-4xl shrink-0">verified_user</span>
        <div className="flex-1">
          <h4 className="font-headline-sm text-xs font-bold text-secondary">External Verification Public Registry</h4>
          <p className="text-[11px] text-on-secondary-fixed-variant font-light mt-0.5">
            All IT Academy certificates are registered on the public ledger. Recruiters can verify your credentials instantly using the unique ID or the QR code provided on each document.
          </p>
        </div>
        <button 
          onClick={() => setIsIntegrationGuideOpen(true)}
          className="bg-secondary text-on-secondary border-none px-6 py-2.5 rounded-lg text-xs font-bold hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0 self-end md:self-center"
        >
          Integration Guide
        </button>
      </div>

      {/* MODAL 1: PREVIEW DETAILED DIPLOMA VIEW */}
      {previewCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center relative border-4 border-double border-yellow-600/35">
            
            <button 
              onClick={() => setPreviewCert(null)}
              className="absolute top-4 right-4 text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="border border-yellow-600/20 p-5 sm:p-6 space-y-5 text-center bg-yellow-50/5">
              
              <div className="space-y-1">
                <span className="font-serif italic text-yellow-700 text-[10px] tracking-wider">Official Certificate of Achievement</span>
                <h3 className="font-serif text-xl font-bold text-on-surface uppercase tracking-widest mt-1">IT Academy</h3>
                <p className="text-[8px] text-outline font-bold uppercase tracking-widest">Laxmi Computer Education Portal</p>
              </div>

              <div className="space-y-2 py-4">
                <p className="text-[9px] text-on-surface-variant">This verified certificate of completion is awarded to</p>
                <h4 className="font-serif text-lg font-extrabold text-primary border-b border-primary/20 pb-2 w-fit mx-auto px-10">
                  Arjun Kumar
                </h4>
                <p className="text-[10px] text-on-surface-variant max-w-sm mx-auto leading-relaxed mt-2">
                  for successfully completing all syllabus modules, practical checks, and evaluation goals in the track:
                </p>
                <p className="font-bold text-xs text-on-surface uppercase tracking-wider mt-1">
                  {previewCert.title}
                </p>
              </div>

              {/* Seal and signature row */}
              <div className="flex justify-between items-end pt-4 border-t border-outline-variant/35 text-[9px] text-outline font-semibold">
                <div className="text-left space-y-1">
                  <p>📅 <strong>Date Issued:</strong> {previewCert.date}</p>
                  <p>🔑 <strong>Verification ID:</strong> {previewCert.id}</p>
                </div>
                
                {/* Gold Seal */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 border border-yellow-700/35 flex items-center justify-center text-white shadow-md relative shrink-0">
                  <div className="absolute inset-1 border border-dashed border-white/50 rounded-full"></div>
                  <span className="material-symbols-outlined text-lg">workspace_premium</span>
                </div>

                <div className="text-right space-y-1">
                  <p className="font-serif italic border-b border-outline/35 pb-0.5">{previewCert.verifierName}</p>
                  <p>{previewCert.verifierName} (Faculty Lead)</p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-outline-variant/20">
              <button 
                onClick={() => {
                  setPreviewCert(null);
                  triggerToast(`Successfully downloaded "${previewCert.title}" PDF admit credentials!`);
                }}
                className="flex-grow bg-primary text-white py-3 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm font-bold">download</span>
                Download Verified PDF
              </button>
              <button 
                onClick={() => setPreviewCert(null)}
                className="bg-surface-container text-on-surface-variant py-3 px-6 rounded-lg text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: EXTERNAL RECRUITER PUBLIC INTEGRATION GUIDE */}
      {isIntegrationGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-container-low rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/10">
            
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                <h3 className="text-base font-bold text-on-surface">Recruiter Verification Guide</h3>
              </div>
              <button 
                onClick={() => setIsIntegrationGuideOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="font-light text-on-surface-variant leading-relaxed">
                Add cryptographically secure certifications directly to your LinkedIn, CV, or developer portfolio with these sync elements:
              </p>

              <div className="space-y-2">
                <p className="font-bold text-[10px] text-outline uppercase tracking-wider">1. Sync to LinkedIn Profile</p>
                <div className="bg-surface-container p-3 rounded-lg font-mono text-[9px] text-on-surface-variant overflow-x-auto select-all leading-normal border border-outline-variant/20">
                  https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME<br />
                  &name=Advanced%20React%20Frameworks&organizationId=IT_ACADEMY<br />
                  &certId=LX-293-84&certUrl=https://it-academy.edu/verify/LX-293-84
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-[10px] text-outline uppercase tracking-wider">2. Embedded HTML Portfolio Badge Code</p>
                <div className="bg-surface-container p-3 rounded-lg font-mono text-[9px] text-on-surface-variant overflow-x-auto select-all leading-normal border border-outline-variant/20">
                  &lt;a href="https://it-academy.edu/verify/LX-293-84" target="_blank"&gt;<br />
                  &nbsp;&nbsp;&lt;img src="https://it-academy.edu/badge/LX-293-84.png" alt="React Certified" /&gt;<br />
                  &lt;/a&gt;
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsIntegrationGuideOpen(false);
                  triggerToast("Public ledger verification credentials synced successfully!");
                }}
                className="w-full bg-primary text-white py-2.5 rounded-lg text-xs font-bold border-none cursor-pointer hover:bg-primary/95 transition-all outline-none"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Certificates;
