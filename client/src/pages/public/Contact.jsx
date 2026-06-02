import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
      {/* Hero Section */}
      <section className="mb-stack-lg">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-headline-xl text-headline-xl mb-stack-sm text-on-surface">Get in Touch</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Have questions about our computer courses or admission process? Our team is here to guide your digital journey.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Contact Info & Map (Left Column) */}
        <div className="lg:col-span-5 space-y-gutter">
          {/* Contact Details Cards */}
          <div className="glass-card rounded-xl p-stack-lg shadow-sm">
            <h2 className="font-headline-md text-headline-md mb-stack-md text-primary">Contact Information</h2>
            <div className="space-y-stack-md">
              <div className="flex items-start gap-4">
                <div className="bg-primary-container p-3 rounded-lg text-on-primary-container">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold uppercase">Our Address</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    3rd Floor, Above Laxmi Bank, Main Road,<br />
                    Nawanshahr, Punjab 144514
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-container p-3 rounded-lg text-on-primary-container">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold uppercase">Phone Number</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">+91 98765 43210</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">01823-222222</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-container p-3 rounded-lg text-on-primary-container">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold uppercase">Working Hours</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Representation */}
          <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-sm group border border-outline-variant">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPmuZ4Aaekk0UactT7WrCgp4KG4_u-bvt3h4YLj0haYcrYw7jByldxJz7EKU79JG-QE_nIq6sp_-Wr3_bTwyUUatvePE7EuBvV8Oml2n94OXAWptNITMTCdys_jTEZr95_tT9oBuMjI9AT1jiqXM-okkz47HRyn-M1N4wjTXuEZWqoQW-DqMytvJQNkNt3OawzUMm7M8uBQc0yH3772fdFG1pdsxWeuoU6ev_BIpVY6BjUswucgj02xw8v1VptN2R7MDRhDcu7vNKD" 
              alt="Nawanshahr Location Map"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            <a 
              className="absolute bottom-4 right-4 bg-primary text-on-primary px-stack-md py-stack-sm rounded-full font-label-md text-label-md shadow-lg flex items-center gap-2 hover:bg-surface-tint transition-colors" 
              href="https://maps.app.goo.gl/X129hUeveeSmj5YAA" 
              target="_blank" 
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              View on Google Maps
            </a>
          </div>
        </div>

        {/* Contact Form (Right Column) */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-xl p-stack-lg shadow-sm border-t-4 border-t-primary">
            <h2 className="font-headline-md text-headline-md mb-stack-md text-on-surface">Send us a Message</h2>
            <form className="space-y-stack-md" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 ml-1">Your Name</label>
                  <input 
                    className="w-full h-12 px-4 rounded-lg border border-outline bg-surface-container-lowest font-body-md text-body-md input-glow focus:border-primary transition-all" 
                    placeholder="John Doe" 
                    required 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 ml-1">Email Address</label>
                  <input 
                    className="w-full h-12 px-4 rounded-lg border border-outline bg-surface-container-lowest font-body-md text-body-md input-glow focus:border-primary transition-all" 
                    placeholder="john@example.com" 
                    required 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 ml-1">Subject</label>
                <select 
                  className="w-full h-12 px-4 rounded-lg border border-outline bg-surface-container-lowest font-body-md text-body-md input-glow focus:border-primary transition-all appearance-none" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option disabled value="">Select a topic</option>
                  <option value="Course Inquiry">Course Inquiry</option>
                  <option value="Admission Process">Admission Process</option>
                  <option value="Fee Structure">Fee Structure</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 ml-1">Message</label>
                <textarea 
                  className="w-full p-4 rounded-lg border border-outline bg-surface-container-lowest font-body-md text-body-md input-glow focus:border-primary transition-all resize-none" 
                  placeholder="How can we help you today?" 
                  required 
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button 
                className="w-full md:w-auto px-10 h-14 bg-primary text-on-primary rounded-lg font-headline-sm text-headline-sm hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2" 
                type="submit"
              >
                Send Message
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
