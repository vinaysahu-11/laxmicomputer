import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');
  const [isDotVisible, setIsDotVisible] = useState(true);

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-margin-desktop">
      {/* Search Input Area */}
      <div className="flex items-center gap-4 flex-1 text-left">
        <div className="relative w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary text-body-sm"
            placeholder="Search students, courses, or invoices..."
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
      </div>

      {/* Right Quick Actions Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-all scale-102 flex items-center justify-center">
            <span className="material-symbols-outlined">help</span>
          </button>
          
          <button className="text-on-surface-variant hover:text-primary transition-all scale-102 flex items-center justify-center">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsDotVisible(false)}
              className="text-on-surface-variant hover:text-primary transition-all scale-102 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            {isDotVisible && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
            )}
          </div>
        </div>

        <div className="h-8 w-[1px] bg-outline-variant"></div>

        <div 
          onClick={() => navigate('/admin/profile')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">Laxmi Education</span>
          <img
            alt="Admin User Avatar"
            className="w-8 h-8 rounded-full object-cover border border-outline-variant/40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARMnA0U7WgcUnlA6fXP500re2M9K1O6jMHW6gW8NsJuh9MN20BkPdcWifkjmgSpvcinY73-_Nwgcv-WTehLsCgAY_QCcPi4vTdJJyBOAhgD5pk5dP49LBpmLmxlySvQ46Pq5bzJNFe65kgkK-cdMStJPDQXWOnggKfTzWTJpzyWQq_7fBYvItRQhXaryKouAlyXU5BNGuuJXXn9Z20WQ3HvrMESry5phreZ-4YqdG-R3vd9TNRfHTeQBeH_Aai2GchXFG6fX2xD94I"
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
