import React, { useState } from 'react';

const Admission = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    course: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('Thank you for your application! Our academic counselor will contact you within 24 hours.');
      setIsSubmitting(false);
      setFormData({
        studentName: '',
        phone: '',
        course: '',
        address: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-stack-lg overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            className="w-full h-full object-cover"
            data-alt="A sophisticated digital pattern of interconnected nodes and glowing circuits against a light blue backdrop, representing the digital transformation and educational excellence of a modern computer academy. The lighting is bright and professional, creating an atmosphere of technological growth and clarity."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM6EBgMQvlIA0_ecTw5oiXjKjtIvenzIrLx7STupooezLVonmQqhKnPwJIqNcSSs41z69CvkDRH4N6_2xTVh219v5coaR2yUtrINQjWWCCr_y5psR6OJH8RMvYJCGGFNuQXu5qMS-9pWa7OAwGv3LWb09H1tBa0LbSqRsC2RWXbQqxDEejwB1nRg96i_pQhf9MPgqLSAjc4QN9YvP-QgQ1dLITt28dKTfDvGuEgjpbgyzWZhuRVrQ3PSlMLtP8lEOqwtQQqDOvCSUL"
          />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop text-center py-12">
          <h1 className="font-headline-xl text-headline-xl mb-4 text-on-surface">Secure Your Future in Tech</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Join the leading computer institute and master the skills that drive the digital economy. Your journey to professional excellence starts here.
          </p>
        </div>
      </section>

      {/* Admission Form Section */}
      <section className="py-stack-lg">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Left: Form Info */}
          <div className="lg:col-span-5 space-y-stack-lg">
            <div className="bg-surface border border-outline-variant rounded-xl p-stack-lg shadow-sm">
              <h2 className="font-headline-md text-headline-md mb-stack-md text-primary">Admission Process</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary-fixed text-on-primary-fixed w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm">Online Application</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Fill out the form with your correct details and preferred course.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary-fixed text-on-primary-fixed w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm">Counseling Call</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Our academic experts will reach out to guide you through the curriculum.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary-fixed text-on-primary-fixed w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm">Enrollment</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Complete your registration and start your professional learning journey.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl h-64 shadow-sm group">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                data-alt="A diverse group of enthusiastic students collaborating in a bright, modern computer laboratory equipped with high-end workstations and large monitors. Soft morning sunlight streams through windows, highlighting the clean white walls and blue accents of the classroom. The mood is focused yet collaborative and inspiring."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaeu7QaF04mrnv8jVsTT7ssLZkNsz55FUDVQqvLGt95rmlFwPli8ksoZVGWinuchYLSbDALnQRrGSlkabnUfyQhhdTNm341lt-ZncfQvisnvLz2lVHviwedC-e_GFgMrfdeqWSxaHIxDv8sa1ii9kRTJczCfD0EfakuQLGV11F9GTAGdX3PiBAWTJk5Joh3sl7LblttYPHHeMJw3hs2ICU9ZoWYBHvYXnsgCOSPuNMvL8cvDYjnyT1CYS-Pwoml15N1TlkLvJM6EPN"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                <p className="text-on-primary font-headline-sm">Empowering over 5,000+ students since 2010.</p>
              </div>
            </div>
          </div>

          {/* Right: The Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface border border-outline-variant rounded-xl p-stack-lg shadow-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="studentName">Student Name</label>
                    <input
                      className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface form-focus-ring transition-all"
                      id="studentName"
                      name="studentName"
                      placeholder="Enter full name"
                      required
                      type="text"
                      value={formData.studentName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="phone">Phone Number</label>
                    <input
                      className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface form-focus-ring transition-all"
                      id="phone"
                      name="phone"
                      placeholder="Enter 10-digit mobile"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="course">Class / Course Selection</label>
                  <select
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface form-focus-ring transition-all appearance-none cursor-pointer"
                    id="course"
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option disabled value="">Choose your course</option>
                    <option value="web-dev">Full Stack Web Development</option>
                    <option value="data-science">Data Science &amp; AI</option>
                    <option value="python">Python Programming</option>
                    <option value="graphic-design">Graphic Design Masterclass</option>
                    <option value="digital-marketing">Digital Marketing Pro</option>
                    <option value="basic">Office Productivity (MS Office)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="address">Address</label>
                  <input
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface form-focus-ring transition-all"
                    id="address"
                    name="address"
                    placeholder="Your current city or address"
                    required
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider" htmlFor="message">Message (Optional)</label>
                  <textarea
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface form-focus-ring transition-all"
                    id="message"
                    name="message"
                    placeholder="Any specific requirements or queries?"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-4 flex flex-col md:flex-row gap-4">
                  <button
                    className="flex-1 bg-primary text-on-primary font-label-md py-4 rounded-lg hover:bg-surface-tint shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">sync</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send</span>
                        Submit Application
                      </>
                    )}
                  </button>
                  <a
                    className="flex-1 bg-secondary-container text-on-secondary-container font-label-md py-4 rounded-lg hover:bg-outline-variant transition-all flex items-center justify-center gap-2 border border-outline-variant/30"
                    href="https://wa.me/yournumber"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    WhatsApp Inquiry
                  </a>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Admission;
