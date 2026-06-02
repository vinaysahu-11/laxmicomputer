import React from 'react';

const Reviews = () => {
  return (
    <section className="py-stack-lg bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="text-center mb-12 space-y-2">
          <h2 className="font-headline-lg text-headline-lg">What Our Students Say</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Verified reviews from our recent graduates and current students.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Review Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
            <div className="flex text-primary mb-4">
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
            </div>
            <p className="text-body-md text-on-surface mb-6">"Best computer institute in the area! The practical labs are top-notch."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center text-primary font-bold">AS</div>
              <div>
                <h4 className="font-bold text-body-md">Aman Singh</h4>
                <p className="text-label-sm text-on-surface-variant">Student</p>
              </div>
            </div>
          </div>
          {/* Review Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
            <div className="flex text-primary mb-4">
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
            </div>
            <p className="text-body-md text-on-surface mb-6">"Instructors are very helpful and explain everything clearly."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary font-bold">NG</div>
              <div>
                <h4 className="font-bold text-body-md">Neha Gupta</h4>
                <p className="text-label-sm text-on-surface-variant">Student</p>
              </div>
            </div>
          </div>
          {/* Review Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
            <div className="flex text-primary mb-4">
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="material-symbols-outlined text-[20px] fill-current">star</span>
            </div>
            <p className="text-body-md text-on-surface mb-6">"I landed a job right after completing my Tally course. Highly recommended!"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-on-secondary-container font-bold">RK</div>
              <div>
                <h4 className="font-bold text-body-md">Rohit Kumar</h4>
                <p className="text-label-sm text-on-surface-variant">Alumni</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
