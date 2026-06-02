import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      // Simulation success
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-4 bg-surface-container-low relative overflow-hidden">
      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary-fixed/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-0"></div>

      <div className="w-full max-w-md bg-surface border border-outline-variant/60 rounded-3xl p-8 md:p-10 shadow-xl relative z-10">
        
        {!isSuccess ? (
          <div className="space-y-6">
            <div className="text-center">
              <span className="material-symbols-outlined text-primary text-5xl bg-primary-container/20 p-4 rounded-full mb-3">lock_reset</span>
              <h1 className="font-headline-md text-headline-md text-on-surface">Forgot Password?</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Enter your registered Email Address below and we will send you instructions to reset your password.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3 border border-error/20">
                <span className="material-symbols-outlined shrink-0 text-error">error</span>
                <p className="font-body-sm text-body-sm">{error}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="email">Registered Email Address</label>
                <input
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring transition-all"
                  id="email"
                  name="email"
                  placeholder="name@laxmi.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-75"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      Send Reset Instructions
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center">
              <Link className="font-label-sm text-label-sm text-primary hover:underline flex items-center justify-center gap-1" to="/login">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center animate-fade-in">
            <span className="material-symbols-outlined text-green-600 text-5xl bg-green-100 dark:bg-green-950/30 p-4 rounded-full mb-3">mark_email_read</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Instructions Sent!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We have dispatched a secure password recovery message to <strong>{email}</strong>.
            </p>
            
            <div className="bg-primary-container/20 border border-primary/10 p-4 rounded-2xl text-left space-y-3">
              <span className="font-label-sm text-primary font-bold block uppercase tracking-wider text-center">Testing Simulator Helper</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
                For testing/demo purposes, we have bypassed the actual email SMTP send. Click the button below to directly launch the password reset screen!
              </p>
              <button
                onClick={() => navigate('/reset-password')}
                className="w-full bg-primary/10 hover:bg-primary/25 text-primary py-2 rounded-lg font-label-sm transition-colors text-xs text-center block"
              >
                Go to Reset Password Form →
              </button>
            </div>

            <div className="pt-2">
              <Link
                className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                to="/login"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Login
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default ForgotPassword;
