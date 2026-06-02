import React from 'react';

const ProfileCard = () => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Profile Picture */}
        <div className="relative group shrink-0">
          <img 
            alt="Student Avatar" 
            className="w-24 h-24 rounded-xl object-cover border-4 border-surface-container shadow-sm" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUfA65JV4uzymI372Wkby0p4JnhM47dR4uPAOE7DTW0UAtfv-KAiblVuTdjLsXlBKnvJ4FLitgu2Dc3dQicrJ9Ra5F67w0p_sT9Du0_-bUS_zz0QihITjQp3Qfq1q1xf1gAoDBnYaORJQEOx-DDA72uh1M0pfMnc0FHTTCf-zbDXhV854T2wGTEbSpgna5cg-o8v5D7SkVkVBa4HK4KHbbserkoTIngCnHclthdHy4-f1OkHNOI8gc4VaLeM3H8_YBUCH5pgE3M-qH"
          />
          <button 
            type="button"
            className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-1.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-surface-container-lowest"
            title="Upload New Photo"
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
          </button>
        </div>

        {/* Basic Details */}
        <div className="text-center sm:text-left">
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Sarah Jenkins</h4>
          <p className="text-xs font-semibold text-primary mt-1">Enrollment ID: SEC-2026-0894</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5 text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
            <span className="bg-green-500/10 text-green-700 px-2 py-0.5 rounded border border-green-500/20">Active Student</span>
            <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded border border-outline-variant/30">Cohort B12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
