import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-stack-lg bg-surface scroll-reveal active">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-headline-lg text-headline-lg">Student Success Stories</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-outline hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 rounded-full border border-outline hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="p-8 bg-surface-container-low rounded-xl border-l-4 border-primary italic relative">
            <span className="material-symbols-outlined text-primary/10 text-6xl absolute top-4 right-4">format_quote</span>
            <p className="text-on-surface-variant mb-6">"The training at Laxmi was life-changing. I came in with zero coding knowledge and left with a high-paying job as a frontend developer."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container"></div>
              <div>
                <h4 className="font-bold">Rahul Sharma</h4>
                <p className="text-label-sm text-on-surface-variant">Web Dev Graduate</p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-surface-container-low rounded-xl border-l-4 border-primary italic relative">
            <span className="material-symbols-outlined text-primary/10 text-6xl absolute top-4 right-4">format_quote</span>
            <p className="text-on-surface-variant mb-6">"Professional faculty and amazing lab facilities. The practical approach to learning Python was exactly what I needed for my data career."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-container"></div>
              <div>
                <h4 className="font-bold">Sneha Patel</h4>
                <p className="text-label-sm text-on-surface-variant">Data Science Student</p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-surface-container-low rounded-xl border-l-4 border-primary italic relative">
            <span className="material-symbols-outlined text-primary/10 text-6xl absolute top-4 right-4">format_quote</span>
            <p className="text-on-surface-variant mb-6">"Highly recommended for anyone looking to upskill in Graphic Design. The Figma course was comprehensive and very well structured."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container"></div>
              <div>
                <h4 className="font-bold">Amit Kumar</h4>
                <p className="text-label-sm text-on-surface-variant">Graphic Design Alumnus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
