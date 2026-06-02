import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="py-stack-lg bg-surface-container-low overflow-hidden scroll-reveal active">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="text-center mb-16 space-y-2">
          <h2 className="font-headline-lg text-headline-lg">Why Choose Us?</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">We provide more than just certificates; we provide a career launchpad with real-world skills.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter h-auto md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 bg-primary text-on-primary p-10 rounded-2xl flex flex-col justify-between hover:shadow-2xl transition-all group">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">psychology</span>
              </div>
              <h3 className="font-headline-lg">Practical Training Focused</h3>
              <p className="text-primary-fixed/80 text-body-lg">Learn by doing. Our courses are 80% practical hands-on labs with real industry projects to build your portfolio from day one.</p>
            </div>
            <div className="mt-8">
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">check_circle</span> Industry Grade Projects</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">check_circle</span> Live Debugging Sessions</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">check_circle</span> Career Roadmap Planning</li>
              </ul>
            </div>
          </div>
          <div className="bg-surface-container-highest p-8 rounded-2xl hover:bg-secondary-container transition-colors group">
            <span className="material-symbols-outlined text-3xl text-primary mb-4 block">groups</span>
            <h3 className="font-headline-sm mb-2">Expert Faculty</h3>
            <p className="text-body-sm text-on-surface-variant">Mentors with over 10+ years of active industry experience from top tech giants.</p>
          </div>
          <div className="bg-surface-container-highest p-8 rounded-2xl hover:bg-secondary-container transition-colors group">
            <span className="material-symbols-outlined text-3xl text-primary mb-4 block">workspace_premium</span>
            <h3 className="font-headline-sm mb-2">Certification</h3>
            <p className="text-body-sm text-on-surface-variant">Globally recognized certificates to validate your professional skills to employers.</p>
          </div>
          <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-outline-variant flex items-center gap-8 hover:shadow-lg transition-all">
            <div className="hidden sm:block w-32 h-32 bg-primary-container/20 rounded-xl flex-shrink-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-primary">work_history</span>
            </div>
            <div>
              <h3 className="font-headline-md mb-2">Placement Assistance</h3>
              <p className="text-body-sm text-on-surface-variant">We partner with over 200+ companies to help our students land their dream jobs within months of graduation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
