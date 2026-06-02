import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Contact Information states
  const [emailAddress, setEmailAddress] = useState('alex.smith@itacademy.edu');
  const [mobileNumber, setMobileNumber] = useState('+1 (555) 000-1234');
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  // Toggles states
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [examReminders, setExamReminders] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [publicProfile, setPublicProfile] = useState(false);
  const [showGradesToPeers, setShowGradesToPeers] = useState(false);

  // Modals
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isEmailChangeOpen, setIsEmailChangeOpen] = useState(false);
  const [newEmailText, setNewEmailText] = useState(emailAddress);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportText, setSupportText] = useState('');

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Password Submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword.trim() || !newPassword.trim()) {
      alert("Please fill in both current and new password fields!");
      return;
    }
    triggerToast("🔒 Security password updated successfully!");
    setCurrentPassword('');
    setNewPassword('');
  };

  // OTP Verification Submit
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpCode.length !== 4) {
      alert("Please enter a valid 4-digit security code!");
      return;
    }
    setIsMobileVerified(true);
    setIsOtpOpen(false);
    setOtpCode('');
    triggerToast("✅ Mobile number verified successfully!");
  };

  // Email Change Submit
  const handleEmailChangeSubmit = (e) => {
    e.preventDefault();
    if (!newEmailText.trim()) return;
    setEmailAddress(newEmailText);
    setIsEmailChangeOpen(false);
    triggerToast("📧 Primary email updated successfully!");
  };

  // Toggle Preferences handlers
  const handleToggle = (label, value, setter) => {
    const nextVal = !value;
    setter(nextVal);
    triggerToast(`Preference "${label}" ${nextVal ? 'enabled' : 'disabled'}.`);
  };

  // Logout handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of your student portal?")) {
      navigate('/login');
    }
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportText.trim()) return;
    triggerToast("Your IT Support ticket has been created! A security specialist will contact you.");
    setSupportText('');
    setIsSupportOpen(false);
  };

  return (
    <div className="max-w-container-max mx-auto text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-stack-lg">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Account Settings</h2>
        <p className="font-body-md text-on-surface-variant">Manage your profile, security, and notification preferences.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Security & Access Section */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          
          {/* Change Password Card */}
          <div className="glass-card rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              <h3 className="font-headline-sm text-headline-sm">Security &amp; Password</h3>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-gutter">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">Current Password</label>
                  <input 
                    className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">New Password</label>
                  <input 
                    className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  className="bg-primary text-on-primary px-stack-lg py-3 rounded-lg font-label-md hover:bg-primary-container hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer active:scale-95 border-none outline-none" 
                  type="submit"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Update Contact Section */}
          <div className="glass-card rounded-xl p-stack-lg shadow-sm">
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="material-symbols-outlined text-primary">contact_phone</span>
              <h3 className="font-headline-sm text-headline-sm">Contact Information</h3>
            </div>
            
            <div className="space-y-gutter">
              {/* Email Verification State */}
              <div className="flex flex-col md:flex-row md:items-end gap-stack-md border-b border-outline-variant/30 pb-gutter">
                <div className="flex-1 space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">Primary Email Address</label>
                  <input 
                    className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface-variant outline-none font-medium cursor-not-allowed" 
                    type="email" 
                    value={emailAddress}
                    disabled
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-tertiary-container/20 text-on-tertiary-fixed-variant rounded-full text-label-sm h-fit mb-2 select-none border border-tertiary-container/30">
                  <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  Verified
                </div>
                <button 
                  onClick={() => {
                    setNewEmailText(emailAddress);
                    setIsEmailChangeOpen(true);
                  }}
                  className="mb-1 text-primary font-label-md hover:underline bg-transparent border-none p-0 cursor-pointer outline-none"
                >
                  Change
                </button>
              </div>

              {/* Mobile Verification State */}
              <div className="flex flex-col md:flex-row md:items-end gap-stack-md">
                <div className="flex-1 space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">Mobile Number</label>
                  <input 
                    className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface-variant outline-none font-medium cursor-not-allowed" 
                    type="tel" 
                    value={mobileNumber}
                    disabled
                  />
                </div>

                {isMobileVerified ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-tertiary-container/20 text-on-tertiary-fixed-variant rounded-full text-label-sm h-fit mb-2 select-none border border-tertiary-container/30">
                    <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 bg-error-container/20 text-on-error-container rounded-full text-label-sm h-fit mb-2 select-none border border-error-container/30">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    Pending
                  </div>
                )}

                {!isMobileVerified && (
                  <button 
                    onClick={() => setIsOtpOpen(true)}
                    className="mb-1 text-primary font-label-md hover:underline bg-transparent border-none p-0 cursor-pointer outline-none"
                  >
                    Verify Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Settings Sections */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          
          {/* Notification Preferences */}
          <div className="glass-card rounded-xl p-stack-lg shadow-sm">
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="material-symbols-outlined text-primary">notifications_active</span>
              <h3 className="font-headline-sm text-headline-sm">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body-md">Course Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={courseUpdates}
                    onChange={() => handleToggle('Course Updates', courseUpdates, setCourseUpdates)}
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-md">Exam Reminders</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={examReminders}
                    onChange={() => handleToggle('Exam Reminders', examReminders, setExamReminders)}
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-md">Promotional Emails</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={promoEmails}
                    onChange={() => handleToggle('Promotional Emails', promoEmails, setPromoEmails)}
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="glass-card rounded-xl p-stack-lg shadow-sm">
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="material-symbols-outlined text-primary">visibility</span>
              <h3 className="font-headline-sm text-headline-sm">Privacy</h3>
            </div>
            <div className="space-y-4">
              <p className="font-body-sm text-on-surface-variant mb-stack-md">Control how your data and profile visibility is shared across the academy platform.</p>
              <div className="flex items-center justify-between">
                <span className="font-body-md">Public Profile</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={publicProfile}
                    onChange={() => handleToggle('Public Profile', publicProfile, setPublicProfile)}
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-md">Show Grades to Peers</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={showGradesToPeers}
                    onChange={() => handleToggle('Show Grades to Peers', showGradesToPeers, setShowGradesToPeers)}
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Logout Button Container */}
          <div className="p-stack-md flex flex-col items-center">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-error text-error font-headline-sm rounded-xl hover:bg-error-container/20 active:scale-95 transition-all duration-200 bg-transparent cursor-pointer outline-none font-bold"
            >
              <span className="material-symbols-outlined">logout</span>
              Logout Session
            </button>
            <p className="mt-4 font-body-sm text-on-surface-variant text-center">Last login: Today at 09:42 AM from Chrome on MacOS.</p>
          </div>
        </aside>
      </div>

      {/* Footer Support Banner */}
      <div className="mt-stack-lg bg-primary-container rounded-xl p-stack-lg text-on-primary-container flex flex-col md:flex-row items-center justify-between gap-gutter overflow-hidden relative border-none">
        <div className="relative z-10 text-left">
          <h4 className="font-headline-sm text-headline-sm mb-2">Need Help with Security?</h4>
          <p className="font-body-md opacity-90 max-w-lg">Our support team is available 24/7 to help you secure your account or recover access.</p>
        </div>
        <button 
          onClick={() => setIsSupportOpen(true)}
          className="relative z-10 bg-on-primary-container text-surface px-gutter py-3 rounded-lg font-label-md hover:shadow-xl transition-all cursor-pointer border-none outline-none shrink-0"
        >
          Contact IT Support
        </button>
        {/* Decorative blur */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* MODAL 1: OTP Mobile Passcode Verification */}
      {isOtpOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/20">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">security</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">OTP Mobile Verification</h3>
              </div>
              <button 
                onClick={() => setIsOtpOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <p className="font-body-md text-on-surface-variant">
                We have dispatched a 4-digit dynamic verification passcode onto your mobile number <strong>{mobileNumber}</strong>. Enter the passcode to mark as verified.
              </p>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5 uppercase font-semibold">4-Digit Passcode</label>
                <input 
                  type="text" 
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g,'').slice(0,4))}
                  placeholder="e.g. 1234"
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-center font-mono tracking-widest text-lg font-bold focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md border-none cursor-pointer hover:bg-primary-container transition-all hover:scale-[1.02]"
                >
                  Verify Now
                </button>
                <button 
                  type="button"
                  onClick={() => setIsOtpOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-md border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Change Primary Email */}
      {isEmailChangeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/20">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">mail</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Change Primary Email</h3>
              </div>
              <button 
                onClick={() => setIsEmailChangeOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleEmailChangeSubmit} className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5 uppercase font-semibold">New Email Address</label>
                <input 
                  type="email" 
                  value={newEmailText}
                  onChange={(e) => setNewEmailText(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md border-none cursor-pointer hover:bg-primary-container transition-all hover:scale-[1.02]"
                >
                  Confirm Change
                </button>
                <button 
                  type="button"
                  onClick={() => setIsEmailChangeOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-md border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: IT Security Support */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left border border-outline-variant/20">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">security</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">IT Security Support</h3>
              </div>
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="text-on-surface-variant bg-transparent hover:text-error transition-colors border-none cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5 uppercase font-semibold">Describe Security Issue</label>
                <textarea 
                  value={supportText}
                  onChange={(e) => setSupportText(e.target.value)}
                  placeholder="Need assistance with password locks, biometric failures, OTP passcodes, or linked devices?"
                  rows="4"
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md border-none cursor-pointer hover:bg-primary-container transition-all hover:scale-[1.02]"
                >
                  Create Ticket
                </button>
                <button 
                  type="button"
                  onClick={() => setIsSupportOpen(false)}
                  className="flex-1 bg-surface-container text-on-surface py-3 rounded-lg font-label-md border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors"
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

export default Settings;
