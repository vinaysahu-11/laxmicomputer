import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, code, newPassword, confirmPassword } = formData;

    if (!email || !code || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await api.post('/auth/reset-password', { email, password: newPassword, code });
      setIsSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-4 bg-surface-container-low relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary-fixed/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-0"></div>

      <div className="w-full max-w-md bg-surface border border-outline-variant/60 rounded-3xl p-8 md:p-10 shadow-xl relative z-10">
        
        {!isSuccess ? (
          <div className="space-y-6">
            <div className="text-center">
              <span className="material-symbols-outlined text-primary text-5xl bg-primary-container/20 p-4 rounded-full mb-3">lock_open</span>
              <h1 className="font-headline-md text-headline-md text-on-surface">Reset Password</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Set a secure new password for your academic account
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
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="email">Email Address</label>
                <input
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring transition-all"
                  id="email"
                  name="email"
                  placeholder="name@laxmi.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="code">Reset Verification Code</label>
                <input
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring transition-all"
                  id="code"
                  name="code"
                  placeholder="e.g. 123456"
                  required
                  type="text"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="newPassword">New Password</label>
                <div className="relative">
                  <input
                    className="w-full pl-4 pr-12 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring transition-all"
                    id="newPassword"
                    name="newPassword"
                    placeholder="••••••••"
                    required
                    type={showPasswords ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPasswords ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="confirmPassword">Confirm New Password</label>
                <div className="relative">
                  <input
                    className="w-full pl-4 pr-12 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring transition-all"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                    type={showPasswords ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
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
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">key</span>
                      Save Password
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center">
              <Link className="font-label-sm text-label-sm text-primary hover:underline" to="/login">Cancel and go back</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center animate-fade-in">
            <span className="material-symbols-outlined text-green-600 text-5xl bg-green-100 dark:bg-green-950/30 p-4 rounded-full mb-3">check_circle</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Password Updated!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your account password has been updated successfully. You can now use your new credentials to log in.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">login</span>
                Sign In to Account
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default ResetPassword;
