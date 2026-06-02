import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md border-b border-outline-variant dark:border-outline shadow-sm" style={{ opacity: 1 }}>
      <nav className="flex justify-between items-center px-margin-desktop max-w-container-max mx-auto h-16">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed-dim">LAXMI COMPUTER EDUCATION</span>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md pb-1 transition-all ${
                isActive 
                  ? "text-primary dark:text-primary-fixed border-b-2 border-primary font-bold" 
                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
              }`
            } 
            to="/"
          >
            HOME
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md pb-1 transition-all ${
                isActive 
                  ? "text-primary dark:text-primary-fixed border-b-2 border-primary font-bold" 
                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
              }`
            } 
            to="/courses"
          >
            COURSES
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md pb-1 transition-all ${
                isActive 
                  ? "text-primary dark:text-primary-fixed border-b-2 border-primary font-bold" 
                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
              }`
            } 
            to="/gallery"
          >
            GALLERY
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md pb-1 transition-all ${
                isActive 
                  ? "text-primary dark:text-primary-fixed border-b-2 border-primary font-bold" 
                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
              }`
            } 
            to="/results"
          >
            RESULTS
          </NavLink>

          {/* MORE Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="font-body-md text-body-md border border-primary text-primary px-4 py-1 rounded-lg flex items-center gap-1 hover:bg-primary-container/20 transition-all font-medium"
            >
              MORE <span className="text-[10px]">▼</span>
            </button>
            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dim border border-outline-variant dark:border-outline rounded-lg shadow-lg py-2 z-50">
                <NavLink 
                  className="block px-4 py-2 font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors" 
                  to="/admission"
                  onClick={() => setIsMoreOpen(false)}
                >
                  ADMISSION
                </NavLink>
                <NavLink 
                  className="block px-4 py-2 font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors" 
                  to="/reviews"
                  onClick={() => setIsMoreOpen(false)}
                >
                  REVIEW
                </NavLink>
                <NavLink 
                  className="block px-4 py-2 font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors" 
                  to="/faculty"
                  onClick={() => setIsMoreOpen(false)}
                >
                  FACULTY
                </NavLink>
                <NavLink 
                  className="block px-4 py-2 font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors" 
                  to="/about"
                  onClick={() => setIsMoreOpen(false)}
                >
                  ABOUT US
                </NavLink>
              </div>
            )}
          </div>

          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md pb-1 transition-all ${
                isActive 
                  ? "text-primary dark:text-primary-fixed border-b-2 border-primary font-bold" 
                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
              }`
            } 
            to="/contact"
          >
            CONTACT
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `bg-primary text-on-primary px-5 py-2 rounded-lg font-label-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm hover:shadow`
            } 
            to="/login"
          >
            <span className="material-symbols-outlined text-sm">login</span>
            PORTAL LOGIN
          </NavLink>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-primary flex items-center justify-center p-2 focus:outline-none"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile Dropdown Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-surface-dim border-b border-outline-variant/60 shadow-lg px-6 py-4 flex flex-col gap-3 absolute left-0 right-0 top-16 z-50">
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HOME
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/courses"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            COURSES
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/gallery"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            GALLERY
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/results"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            RESULTS
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/admission"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ADMISSION
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/reviews"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            REVIEWS
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/faculty"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FACULTY
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ABOUT US
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              `font-body-md text-body-md py-2 border-b border-outline-variant/20 transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`
            } 
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CONTACT
          </NavLink>

          <NavLink 
            className="bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm mt-2" 
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-sm">login</span>
            PORTAL LOGIN
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
