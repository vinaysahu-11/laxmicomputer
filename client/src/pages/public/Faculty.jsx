import React, { useState } from 'react';

const Faculty = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const facultyData = [
    {
      id: 1,
      name: 'Dr. Anjali Sharma',
      badge: 'Senior Faculty',
      subject: 'Advanced Data Structures & Algorithms',
      experience: '15+ Years Experience',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa_SebGIwrEWkfHoCvTa5vgmkqfguK0Jfy6ZPvmfwLgAG0Qpl1yURheE0lY7AtLKPoNUkWSUhPB4fyXTGyPg3EjHgmmOnVQF3S1b7gfPcynjyN4HgYOS-EJLNe-QdvxQ5-rX2-CbizNBWeiqxEdz6DZ_efMjWMRACyw3SZaStvcUxvT9CQP9Nf228uv8WGRhkKc01UkDTF8IypFWLveM0aXCU5uLVztwn8xCOqgwwtO3VBH9iqPzlnEcgtNjwuQFtMs0J0khp1cfu-',
      description: 'Specializing in foundational computing and scalable architecture, Dr. Sharma has mentored over 5,000 students into Top-Tier tech firms. Her teaching style emphasizes logic and real-world problem solving.',
      btnText: 'View Research Papers',
      className: 'bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 faculty-card-shadow flex flex-col'
    },
    {
      id: 2,
      name: 'Prof. Rajesh Varma',
      badge: 'Course Lead',
      subject: 'Full-Stack Web Development (MERN)',
      experience: '10+ Years Experience',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4XqUDBD5lDCeMew55ilL8Mf5M_7ckIPcgpP6z9SOuS5GncU83y_F59ZFqJHpT93cKobqw2hI-yiEyQeWyhxmMexynf3qQPCImoQe7c35GUETb3_12EM-k5fDDo6HxljTIpLM3Jp9aWGsShr2qtRJ30fWa9r9lqHaTnOa8NtiCkDWGEI-Bl2nrSIArTjrg3JIQ_b8e2pZf69SvzZu0GdfiQvGdza9nTxLbC0PbAbx1rTKon7VwrdTMP6eaIAkm4ACfy6KUk77eVQ5G',
      description: 'A former Lead Developer at a multinational tech conglomerate, Rajesh brings direct industry workflows to the classroom. He focuses on modern frameworks and agile methodologies.',
      btnText: 'Portfolio & Projects',
      className: 'bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 faculty-card-shadow flex flex-col'
    },
    {
      id: 3,
      name: 'Ms. Sneha Kulkarni',
      badge: 'Industry Expert',
      subject: 'UI/UX Design & Human-Centric Systems',
      experience: '8+ Years Experience',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTe1_BGOzmBL95P5NroJrsqAmua91HV4JzTUCShKMwY1z-3nNSmM-GLNPj-67NzzpicNB-DZpUhsGnsud_NaB91w7Cg-npLTJ_ZQuI83AD2-fKjFycPglzBvgkoXtFwRhbpNSdDc3_6XlcX6XJx9DMtdjSyD9jdsA2U6TpzQMCjmC79DW5zzS078zjy2qQC9tIM6DfW_C-lLrE3FBQif3ikVGzW8fkIKYjMZNYrVG15ql1aHTGtHdc-jQwg0qIfuoN8wOiNMrL2-G_',
      description: 'Sneha bridges the gap between technology and human behavior. Her curriculum focuses on design thinking, accessibility, and high-fidelity prototyping using industry-standard tools.',
      btnText: 'Student Showcases',
      className: 'bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 faculty-card-shadow flex flex-col border-l-4 border-l-primary'
    },
    {
      id: 4,
      name: 'Mr. Amit Deshmukh',
      badge: 'Hacking Expert',
      subject: 'Network Security & Ethical Hacking',
      experience: '12+ Years Experience',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCglfntGBJTqJqCqVVbTVPg-JGhaiH_YvFEEHP4rZJdDYfHnRG4JWSHl08jR08myDuxsWFdrQTU-ZKXgVnmtts5oeUPK3ASKzKJOLjW9HRMp-Odn5tGDecG6IkzBPtsb9LCC29PxO_80CEPIEYB3Lkyj_qXPQ2Ilvrw0umxDw9zLkePuGH6_cDX5rE0ZFGA-TwV0lDUAXOAiJMDbgMQYQ0d0KQWHk5axV2x6ksStXtkGnC9euYBVElugcHPAmfxE_8DWFSoXIErZPu8',
      description: 'Certified in Ethical Hacking, Amit leads our cybersecurity division. He provides hands-on labs on vulnerability assessment, penetration testing, and secure network infrastructure.',
      btnText: 'Lab Credentials',
      className: 'bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 faculty-card-shadow flex flex-col'
    },
    {
      id: 5,
      name: 'Dr. Priya Nair',
      badge: 'AI Specialist',
      subject: 'Python & Machine Learning',
      experience: '7+ Years Experience',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsEOAqf-FNnYr96YBAvwjKyzNXf48K6-sWewfJdHF3JMtVZk7nrNEymzuRb6b8Kv5zETwFds7QFmDL8uqSQscDRQxRcFmR7QQLR4UW_VE9EN__ew_JjdEcaGXbA4d_ecBXiGX5SIb1OUarGiWVEUvucnvT_tCnHkddKIKECL0dQqdtP4Ek_JDvTHdzfhCmrfhqylD-bsr-J-gnLF4PIoYvyhj-1tbdHJfOAMHmAsbFUnVPOjk87YN0ZXYVmPtob6cu-kVyiVOKATDB',
      description: 'Priya specializes in big data and predictive analytics. She mentors students through the complexities of AI, helping them build models that solve complex business challenges.',
      btnText: 'Project Repository',
      className: 'bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 faculty-card-shadow flex flex-col'
    }
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg min-h-screen">
      {/* Header Section */}
      <header className="mb-stack-lg text-center md:text-left">
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-stack-sm">Our Expert Faculty</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Learn from industry veterans and certified educators dedicated to your digital success. Our faculty brings decades of combined experience in high-end IT fields.
        </p>
      </header>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {facultyData.map((faculty, idx) => (
          <article 
            key={faculty.id}
            className={faculty.className}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform: hoveredIndex === idx ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="relative h-64 w-full bg-secondary-container">
              <img 
                alt={faculty.name} 
                className="w-full h-full object-cover" 
                src={faculty.image} 
              />
              <div className="absolute bottom-4 left-4">
                <span className="px-4 py-1 bg-primary text-on-primary text-label-sm font-label-sm rounded-full">{faculty.badge}</span>
              </div>
            </div>
            <div className="p-stack-lg flex flex-col flex-grow">
              <h2 className="font-headline-md text-headline-md text-on-surface">{faculty.name}</h2>
              <p className="font-label-md text-primary mb-stack-sm">{faculty.subject}</p>
              <div className="flex items-center gap-2 text-on-surface-variant mb-stack-md">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                <span className="font-label-sm">{faculty.experience}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-lg flex-grow">
                {faculty.description}
              </p>
              <button className="w-full py-stack-sm border border-primary text-primary font-label-md rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all active:scale-95">
                {faculty.btnText}
              </button>
            </div>
          </article>
        ))}

        {/* CTA Card */}
        <article className="bg-primary-container text-on-primary-container rounded-xl p-stack-lg flex flex-col justify-center items-center text-center shadow-lg border border-primary/20">
          <div className="bg-surface-container-lowest rounded-full p-4 mb-stack-md">
            <span className="material-symbols-outlined text-primary text-[48px]">groups</span>
          </div>
          <h2 className="font-headline-md text-headline-md mb-stack-sm">Join Our Academic Team</h2>
          <p className="font-body-sm text-body-sm mb-stack-lg">
            Are you an industry expert with a passion for teaching? We are always looking for exceptional educators to join our growing community.
          </p>
          <button className="bg-on-primary-container text-surface px-stack-lg py-stack-sm rounded-lg font-label-md hover:scale-105 transition-transform active:scale-95">
            Apply Now
          </button>
        </article>
      </div>

      {/* Mentorship Stats */}
      <section className="mt-stack-lg bg-surface-container-low rounded-2xl p-stack-lg flex flex-col md:flex-row justify-around items-center gap-stack-lg">
        <div className="text-center">
          <p className="text-primary font-headline-lg text-headline-lg">50+</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Expert Mentors</p>
        </div>
        <div className="w-px h-16 bg-outline-variant hidden md:block"></div>
        <div className="text-center">
          <p className="text-primary font-headline-lg text-headline-lg">12K+</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Students Certified</p>
        </div>
        <div className="w-px h-16 bg-outline-variant hidden md:block"></div>
        <div className="text-center">
          <p className="text-primary font-headline-lg text-headline-lg">95%</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Satisfaction Rate</p>
        </div>
        <div className="w-px h-16 bg-outline-variant hidden md:block"></div>
        <div className="text-center">
          <p className="text-primary font-headline-lg text-headline-lg">20+</p>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Industry Partnerships</p>
        </div>
      </section>
    </main>
  );
};

export default Faculty;
