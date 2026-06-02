import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' // Default testing role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleQuickLogin = (roleEmail, rolePassword, roleName) => {
    setFormData({
      email: roleEmail,
      password: rolePassword,
      role: roleName
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulated login verification based on credentials
    setTimeout(() => {
      const { email, password, role } = formData;

      if (!email || !password) {
        setError('Please fill in all fields.');
        setIsSubmitting(false);
        return;
      }

      // Check credentials and navigate to respective dashboards
      if (email === 'admin@laxmi.com' && password === 'admin123') {
        navigate('/admin');
      } else if (email === 'teacher@laxmi.com' && password === 'teacher123') {
        navigate('/teacher');
      } else if (email === 'student@laxmi.com' && password === 'student123') {
        navigate('/student');
      } else {
        // Dynamic fallback fallback if they entered custom credentials
        if (role === 'admin') navigate('/admin');
        else if (role === 'teacher') navigate('/teacher');
        else navigate('/student');
      }

      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-4 bg-surface-container-low relative overflow-hidden">
      {/* Dynamic Background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary-fixed/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-0"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-surface border border-outline-variant/60 rounded-3xl overflow-hidden shadow-xl relative z-10">
        
        {/* Left Side: Visual Showcase Info */}
        <div className="lg:col-span-5 bg-primary text-on-primary p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-15">
            <img 
              className="w-full h-full object-cover" 
              alt="Digital pattern of connections"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM6EBgMQvlIA0_ecTw5oiXjKjtIvenzIrLx7STupooezLVonmQqhKnPwJIqNcSSs41z69CvkDRH4N6_2xTVh219v5coaR2yUtrINQjWWCCr_y5psR6OJH8RMvYJCGGFNuQXu5qMS-9pWa7OAwGv3LWb09H1tBa0LbSqRsC2RWXbQqxDEejwB1nRg96i_pQhf9MPgqLSAjc4QN9YvP-QgQ1dLITt28dKTfDvGuEgjpbgyzWZhuRVrQ3PSlMLtP8lEOqwtQQqDOvCSUL"
            />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="font-headline-sm text-headline-sm font-bold tracking-wider uppercase">Laxmi Computer Education</div>
            <div className="space-y-4">
              <h2 className="font-headline-md text-headline-md text-white">Academic Portal Access</h2>
              <p className="font-body-md text-primary-fixed/80 font-light">
                Log in to access your digital classrooms, syllabus details, exam records, and certification portfolios.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-4">
              <span className="material-symbols-outlined text-tertiary-fixed text-3xl">admin_panel_settings</span>
              <p className="font-body-sm text-body-sm text-white/95">
                <strong>Notice:</strong> Registrations are managed exclusively by the Institute Administrator. If you do not have your ID and password, please contact the admin office.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-surface-container-lowest">
          <div className="space-y-6 max-w-md mx-auto w-full">
            <div>
              <h1 className="font-headline-md text-headline-md text-on-surface">Sign In</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Please enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3 border border-error/20">
                <span className="material-symbols-outlined shrink-0 text-error">error</span>
                <p className="font-body-sm text-body-sm">{error}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="email">Email / User ID</label>
                <input
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring transition-all"
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
                <div className="flex justify-between items-center">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="password">Password</label>
                  <Link className="font-label-sm text-label-sm text-primary hover:underline" to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <input
                    className="w-full pl-4 pr-12 py-3 bg-surface border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring transition-all"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">login</span>
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Testing Options Helper */}
            <div className="border-t border-outline-variant/40 pt-6 mt-6 space-y-3">
              <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider text-center">Quick Demo Logins (Click to Auto-fill)</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin@laxmi.com', 'admin123', 'admin')}
                  className="px-3 py-2 bg-secondary-container hover:bg-outline-variant/30 text-on-secondary-container font-label-sm rounded-lg text-center transition-colors text-xs"
                >
                  🏫 Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('teacher@laxmi.com', 'teacher123', 'teacher')}
                  className="px-3 py-2 bg-secondary-container hover:bg-outline-variant/30 text-on-secondary-container font-label-sm rounded-lg text-center transition-colors text-xs"
                >
                  👨‍🏫 Faculty
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student@laxmi.com', 'student123', 'student')}
                  className="px-3 py-2 bg-secondary-container hover:bg-outline-variant/30 text-on-secondary-container font-label-sm rounded-lg text-center transition-colors text-xs"
                >
                  🎓 Student
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
};

export default Login;
