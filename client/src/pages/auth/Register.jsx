import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-4 bg-surface-container-low relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary-fixed/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-0"></div>

      <div className="w-full max-w-md bg-surface border border-outline-variant/60 rounded-3xl p-8 md:p-10 shadow-xl text-center relative z-10 space-y-6">
        
        <span className="material-symbols-outlined text-primary text-5xl bg-primary-container/20 p-4 rounded-full mb-2">admin_panel_settings</span>
        
        <h1 className="font-headline-md text-headline-md text-on-surface">Registration Restricted</h1>
        
        <p className="font-body-md text-body-md text-on-surface-variant font-light">
          Laxmi Computer Education's digital portal uses administrative access controls. Accounts for **Students**, **Faculty/Teachers**, and **Staff** are generated exclusively by the Institute Administrator.
        </p>

        <div className="bg-primary-container/20 border border-primary/10 p-4 rounded-2xl text-left space-y-2">
          <p className="font-body-sm text-body-sm text-on-surface">
            If you are a student, teacher, or staff member who does not have access credentials, please reach out to the **admin office** to have your profile and access card set up.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Link
            className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            to="/login"
          >
            <span className="material-symbols-outlined text-sm">login</span>
            Go to Login
          </Link>
          
          <Link
            className="w-full bg-secondary-container text-on-secondary-container font-label-md py-3 rounded-xl hover:bg-outline-variant/40 transition-all flex items-center justify-center gap-2 border border-outline-variant/30 text-xs"
            to="/"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Register;
