import React from 'react';

const PopularCourses = () => {
  return (
    <section className="py-stack-lg bg-surface scroll-reveal active">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md mb-12">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg">Popular Courses</h2>
            <p className="text-on-surface-variant max-w-md">Our curriculum is designed by industry experts to ensure you're ready for the real world.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
            Explore All Courses <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Course Card 1 */}
          <div className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="h-56 overflow-hidden relative">
              <img 
                alt="Web Development" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfAIph5WnJtjfAvRB0SiZ4QnB0AxNIhMtSJ811uGNn1GNsNtkSQqB3SxmE7IEo0berYbG7p0ySGuewIrNgtRtgowoKf4t7KVygRPz7iwCg-exwM3tedGvbhuP6VGHfZANXMbL0rgue0vF0oBiflYO7VtDvf4XKeEK7LL9cSZ7Bh2cpp1kvFr36O_Bqdt7063iGErEhUlpsgMEYpBALn6ZYgx-Fn7gfg7qYbvQFh9Xu0loH2DF1z-1M490ALkz15QunNx7fGuVp7N-z" 
              />
              <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm">6 Months</span>
            </div>
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-1 text-on-surface-variant mb-2">
                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                <span className="font-label-md">4.9 (1.2k Reviews)</span>
              </div>
              <h3 className="font-headline-md mb-2">Full Stack Web Development</h3>
              <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-2">Master HTML, CSS, JavaScript, React, and Node.js to build modern web applications.</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline-sm text-primary">₹24,999</span>
                <button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-label-md group-hover:bg-primary group-hover:text-on-primary transition-colors">Details</button>
              </div>
            </div>
          </div>
          {/* Course Card 2 */}
          <div className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="h-56 overflow-hidden relative">
              <img 
                alt="Data Science" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB6lqdV7jx0-Qm9msbvwY1HnVxLxW08FTkiYkh4o7N6dlCvxawg3iMgapgCqUZ53MC4jZXw1cuAdA1_ig9s8NTTX23zUrgnPB3CbdFLKpDFrMPLTcF1NdRUslERyUsKHSSkqWRtD73Q6B0mgKU46w5qDPRiVp2Ke_UgU3LUKkQBbJR3-1r7eEavwYTY6hV1tTrEPcHgTRoP88-IEWdhSEeUi690ZjQ-LfpOn0teMQtPP6y7Gz0tMWyOD0L86JRk3izaIV3OYeGCnGQ" 
              />
              <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm">8 Months</span>
            </div>
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-1 text-on-surface-variant mb-2">
                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                <span className="font-label-md">4.8 (850 Reviews)</span>
              </div>
              <h3 className="font-headline-md mb-2">Data Science &amp; AI</h3>
              <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-2">Learn Python, Machine Learning, and AI tools to analyze complex data sets and drive insights.</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline-sm text-primary">₹32,000</span>
                <button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-label-md group-hover:bg-primary group-hover:text-on-primary transition-colors">Details</button>
              </div>
            </div>
          </div>
          {/* Course Card 3 */}
          <div className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="h-56 overflow-hidden relative">
              <img 
                alt="Graphic Design" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1Um67i2AKBfGwstF606L5_3N0h3Kb_-GBFxC42MT_jh7Afa8hdBMDbk2nhGNaTtVSGChj33TCLIxFKItPQUHRrDI_0ekrnQdoFXBoq5ewSYuxoKf5XE3pAT9CM4YfBQhnCeqVHIr6at-ca4IVQp0nezhiMwDMltc4-RuyJ7QagXzjFpM5_ERqLazzgyVTfpcHlLlA5opUCg2iIXnK9pkM6wMyNugLTWqW9fmgcJ9dLL6R3KpGc5WZRMvzYD24aEjlEkY7hiZSqBX6" 
              />
              <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm">4 Months</span>
            </div>
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-1 text-on-surface-variant mb-2">
                <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                <span className="font-label-md">5.0 (920 Reviews)</span>
              </div>
              <h3 className="font-headline-md mb-2">Graphic Design Mastery</h3>
              <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-2">Unleash your creativity with Photoshop, Illustrator, and Figma. Build a stunning portfolio.</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline-sm text-primary">₹18,500</span>
                <button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-label-md group-hover:bg-primary group-hover:text-on-primary transition-colors">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
