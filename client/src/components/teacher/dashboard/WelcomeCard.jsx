import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeCard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-xl bg-primary text-on-primary p-8 flex flex-col justify-between shadow-lg select-none text-left">
      <div className="relative z-10">
        <h2 className="font-headline-lg text-headline-lg font-bold mb-2">Welcome back, Prof. Rajesh!</h2>
        <p className="font-body-md text-body-md opacity-90 max-w-md font-light leading-relaxed">
          Your students have completed 85% of their weekly assignments. Great progress this semester!
        </p>
      </div>

      <div className="relative z-10 mt-8 flex gap-4">
        <button 
          onClick={() => navigate('/teacher/classes')}
          className="bg-white text-primary px-6 py-2.5 rounded-lg font-label-md text-label-md font-bold hover:bg-opacity-90 transition-all border-none cursor-pointer outline-none active:scale-95"
        >
          View Schedule
        </button>
        <button 
          onClick={() => navigate('/teacher/materials')}
          className="bg-primary-container text-white px-6 py-2.5 rounded-lg font-label-md text-label-md font-bold hover:bg-opacity-80 transition-all border-none cursor-pointer outline-none active:scale-95"
        >
          Prepare Materials
        </button>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-10 top-5 opacity-20 pointer-events-none">
        <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          school
        </span>
      </div>
    </div>
  );
};

export default WelcomeCard;
