import React from 'react';

const About = () => {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      {/* Hero Section: History & Growth */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <span className="text-primary font-label-md tracking-wider uppercase mb-4 block">Our Legacy</span>
            <h1 className="font-headline-xl text-headline-xl mb-6 leading-tight">Decades of Digital Transformation</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Founded with a vision to bridge the digital divide, LAXMI COMPUTER EDUCATION has grown from a single classroom into a premier hub for technical excellence. Our journey is defined by the thousands of students who have walked through our doors and emerged as industry leaders.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-primary pl-4">
                <div className="text-headline-md font-bold text-primary">20+ Years</div>
                <div className="text-body-sm text-on-surface-variant">Industry Presence</div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <div className="text-headline-md font-bold text-primary">15k+</div>
                <div className="text-body-sm text-on-surface-variant">Certified Alumni</div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-outline-variant">
              <img 
                alt="Academy Interior" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPH414X8hqqdwLkKMVftpQxSDSWxO5oAZQTUf73XqRiu41uCQVrs_xkeZxgQun9WRqlLTgd5eaWfr6OcUrHl-2xF9EJb3UWhdfAR4zhbQxRxMBteuqTldVWK5-oyvUzTs36D3NTgSAcYDienv7u5e61xYA4aY9DxtqW0k4liNGZvwe5GaEYu_cCIOjBHhtJr4dGznzZDrbpAdtSlYHjoxVaRmi2nWfVTMj6rQ3tp6DYsQvWD-mhfdQ41_p4eYUduuqtY6e_zBcOokA" 
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary-container p-6 rounded-xl shadow-xl hidden md:block">
              <span className="material-symbols-outlined text-on-primary-container text-4xl mb-2">auto_awesome</span>
              <div className="text-on-primary-container font-bold text-headline-sm">ISO Certified</div>
              <div className="text-on-primary-container/80 text-body-sm">Excellence in Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision: Bento Layout */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg mb-4">Foundation of Purpose</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="md:col-span-1 glass-card p-stack-lg rounded-xl flex flex-col justify-between hover:shadow-md transition-all border-t-4 border-primary">
            <div>
              <span className="material-symbols-outlined text-primary text-5xl mb-6">rocket_launch</span>
              <h3 className="font-headline-sm text-headline-sm mb-4">Our Mission</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                To provide high-quality, accessible computer education that equips students with the practical skills needed to excel in the global digital economy.
              </p>
            </div>
          </div>
          <div className="md:col-span-1 glass-card p-stack-lg rounded-xl flex flex-col justify-between hover:shadow-md transition-all border-t-4 border-tertiary">
            <div>
              <span className="material-symbols-outlined text-tertiary text-5xl mb-6">visibility</span>
              <h3 className="font-headline-sm text-headline-sm mb-4">Our Vision</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                To be the most trusted name in vocational IT training, recognized for fostering innovation, professionalism, and lifelong learning in our community.
              </p>
            </div>
          </div>
          <div className="md:col-span-1 bg-primary p-stack-lg rounded-xl text-on-primary flex flex-col justify-center">
            <h3 className="font-headline-sm text-headline-sm mb-4">Core Values</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <span className="font-label-md">Integrity in Education</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <span className="font-label-md">Student-First Approach</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <span className="font-label-md">Practical Proficiency</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <span className="font-label-md">Continuous Innovation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Practical Training: Interactive Cards */}
      <section className="mb-20 py-stack-lg bg-surface-container-low rounded-3xl px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg mb-6">Hands-On Learning Experience</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            We believe true learning happens when theory meets practice. Our curriculum is 80% lab-based, ensuring you master the tools of the trade.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant hover:translate-y-[-8px] transition-transform">
            <div className="bg-secondary-container w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">computer</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm mb-3">Live Projects</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Real-world scenarios and client-brief simulation projects for practical exposure.</p>
          </div>
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant hover:translate-y-[-8px] transition-transform">
            <div className="bg-secondary-container w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">terminal</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm mb-3">Sandbox Labs</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Unlimited lab access for self-paced experimentation and rigorous practice sessions.</p>
          </div>
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant hover:translate-y-[-8px] transition-transform">
            <div className="bg-secondary-container w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">groups</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm mb-3">Expert Mentors</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">One-on-one guidance from industry professionals with over 10 years of experience.</p>
          </div>
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant hover:translate-y-[-8px] transition-transform">
            <div className="bg-secondary-container w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">verified</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm mb-3">Skill Audits</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Weekly assessments and constructive feedback loops to track your growth.</p>
          </div>
        </div>
      </section>

      {/* Student Success: Impact Statistics */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                alt="Successful Alumni" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy4_CjFlv8KSWSCCD_QvJJnmdFMwJN6tWBey21_5ihaPi8ox5Id9lSiDm2pi5iPxQkhFihQhlyBDES5qseS9pukGtt-OrCUlXE47qrvf8DGiCId3PCMaA1A4DZ53pVj6pzPQd_MBJn1yGd3sEQFCcGstOhlK54qLEoG_MT6PHlYNDkP0Iy6FOW_oABEgDJ9XiSEmTuAjh9MSmyA0dgs1td08aVkeuqQ-s0h82ErfFJkfDOMEpxdhoZVlzpuqpXupQB3FCvExlRHQ9Z" 
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden mt-8">
              <img 
                alt="Student Collaboration" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1NlLFSByKP9KeLzOpng4EM19MqIx93MKM_xA19J_KpY7cFGfBrvQPsLthsFrbzOHyPAJ-rhraBdeFwk58zw6TEYIQ2gLu9nf3pMlAITAuFtOl3kunrUZkw5GxeoviP7tix4lx3bcJ6q-8p3wenGSPO6Ci66sUWRPl99QG3ef66uJ3Z5Bhc4b4-DO0pHgdCVlSGRkRKpTR39AJKg2ROqXdX-Gh99H0PotP1F53u31VDhYo_4_C9Evf0n3Jf_7Ya4Iz_vf2KK4u4h_F" 
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-headline-lg text-headline-lg mb-6">Alumni Impact &amp; Success</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Our success is measured by the careers of our students. From multinational corporations to innovative startups, LAXMI graduates are making their mark everywhere.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-container p-3 rounded-full">
                  <span className="material-symbols-outlined text-on-primary-container">work</span>
                </div>
                <div>
                  <h5 className="font-headline-sm text-headline-sm">95% Placement Rate</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Our dedicated placement cell works tirelessly to connect students with top hiring partners.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-container p-3 rounded-full">
                  <span className="material-symbols-outlined text-on-primary-container">trending_up</span>
                </div>
                <div>
                  <h5 className="font-headline-sm text-headline-sm">40% Salary Hike</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Working professionals see a significant career boost after completing our advanced certifications.</p>
                </div>
              </div>
            </div>
            <button className="mt-10 px-8 py-4 bg-primary text-on-primary rounded-lg font-headline-sm hover:shadow-lg transition-all active:scale-95">Read Success Stories</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
