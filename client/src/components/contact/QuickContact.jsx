import React, { useState } from 'react';

const QuickContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };
  return (
    <section className="py-stack-lg bg-surface scroll-reveal active">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="bg-primary-container/10 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-6">
            <h2 className="font-headline-lg text-headline-lg">Ready to start your journey?</h2>
            <p className="text-on-surface-variant text-body-lg">Contact us today for a free career counseling session or to inquire about our upcoming batches.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary text-on-primary p-2 rounded-lg">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant">Call Us</p>
                  <p className="font-bold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary text-on-primary p-2 rounded-lg">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant">Email Us</p>
                  <p className="font-bold">info@laxmiedu.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full bg-white p-8 rounded-2xl shadow-xl border border-outline-variant">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Thank You!</h3>
                <p className="text-body-md text-on-surface-variant">We have received your inquiry. Our counselor will contact you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-tight">Full Name</label>
                  <input 
                    className="w-full border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                    placeholder="Your Name" 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-tight">Email Address</label>
                  <input 
                    className="w-full border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                    placeholder="example@gmail.com" 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-tight">Message</label>
                  <textarea 
                    className="w-full border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                    placeholder="Tell us which course you're interested in" 
                    rows="3"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Inquiry</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
