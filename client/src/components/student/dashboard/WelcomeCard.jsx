import React from 'react';

const WelcomeCard = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-surface-tint p-6 rounded-xl text-on-primary shadow-md relative overflow-hidden text-left mb-6">
      <div className="relative z-10 max-w-xl">
        <h3 className="font-headline-lg text-headline-lg font-bold">Welcome Back, Sarah!</h3>
        <p className="font-body-md text-body-md text-white/90 mt-2 font-light leading-relaxed">
          You are doing amazing! You have completed <strong>78%</strong> of your Web Development courses syllabus. Keep pushing toward your final professional certifications!
        </p>
        <div className="flex gap-4 mt-6 items-center flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/20 border border-white/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>Biometric attendance: Good Standing</span>
          </div>
        </div>
      </div>
      {/* Visual layout abstract circle decoration */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default WelcomeCard;
