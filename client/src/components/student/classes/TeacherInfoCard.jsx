import React from 'react';

const TeacherInfoCard = ({ teacher }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm text-left flex items-center gap-3 transition-all duration-200 hover:shadow-md">
      <img 
        alt="Teacher Photo" 
        className="w-11 h-11 rounded-full object-cover border border-outline-variant/35"
        src={teacher.photo || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_hsml_XSG-65isOvydpbNntCXVRn9zsfKvNcUDmzggczI6DcBcsXJXyC60Oo_7rg8pnizQIdGBoHQ-AFgypbeg1LPfLzF5TuT__C6jtZSYY-nrHWAUsMOFVqELEWB2_qMqCGmcF5NJmTmy0dWEKftMjmCO2dpHlKMPqRbsL3tJiQsq_nOJ6LyuOs5Q37RSqE4PNNApT40-KRuM_EaeNfDrxsguzg4oMcfo5FV9AC7y9UP3RQdTgvOhZXBPgEyjrNzDs6LNDMnRlIc'}
      />
      <div className="min-w-0 flex-1">
        <h4 className="font-label-sm text-label-sm font-bold text-on-surface leading-tight truncate">{teacher.name}</h4>
        <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block mt-1 leading-none">{teacher.role || 'Lecturer'}</span>
        <span className="text-[10px] text-primary font-semibold block mt-1.5">{teacher.email}</span>
      </div>
    </div>
  );
};

export default TeacherInfoCard;
