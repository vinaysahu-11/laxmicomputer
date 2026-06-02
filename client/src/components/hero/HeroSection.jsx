import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48 bg-gradient-to-br from-surface to-primary-fixed/20 scroll-reveal active">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-secondary-container/30 rounded-full blur-3xl"></div>
      <div className="max-w-container-max mx-auto px-margin-desktop grid md:grid-cols-2 gap-stack-lg items-center relative z-10">
        <div className="space-y-stack-lg">
          <div className="inline-flex items-center gap-2 bg-primary-container/20 text-primary px-4 py-1.5 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span className="font-label-md uppercase tracking-wider">ISO 9001:2015 Certified Academy</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl md:text-headline-xl leading-tight">
            Professional Computer Education For Your <span className="text-primary italic">Bright Future</span>
          </h1>
          <p className="text-on-surface-variant text-body-lg max-w-lg">
            Master the digital landscape with expert-led training in Web Development, Data Science, and Graphic Design. Empowering students since 2010.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-headline-sm hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
              Admission Now <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="bg-surface-container-lowest text-primary border border-primary/10 px-8 py-4 rounded-lg font-headline-sm hover:bg-primary-fixed/20 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">chat</span> WhatsApp
            </button>
          </div>
          <div className="flex items-center gap-6 pt-stack-md text-on-surface-variant">
            <div className="flex -space-x-3">
              <img 
                alt="Student" 
                className="w-10 h-10 rounded-full border-2 border-white" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBebdQjkBTW9p0eOFYDhaxpK94z3q6fE2VByeCeInta_TVRKEkJE1n4P3TrAv91r8R6rK2zDa8Nl3qNZiiCGOLIMVxp0TSRE1GEJ5yq6u7RcP-Njx4s7eeiDZIUYBpYlqWjtB22a75a8tNaOhJwLEf-EzIMPKxlEeoORDm4xNvkuKr17a1ny64rCdcNYUsmKpR6SMx2vYYrearo5KcBYfkgIDwMKLMU4RqP2mkwrcIb3Uzafd_CCBgyIKC78INcnbAuZeQ4XWFsogQJ" 
              />
              <img 
                alt="Student" 
                className="w-10 h-10 rounded-full border-2 border-white" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_t9b4Lfyy5-6mDyJxuWQ7whBtWC__L4fG0pbE1CJ0Zb2fDBHDi-IAlQ2Zfj3stuHHqid_AQxJv-Uz1SZHEmk4kdifKczCcp4ESsSiLkrr0F4MalixYSWAM1EOv6GqYdmsBgyN0bxWGxSx81_U-kuV2tX12_EUGEfmkx0cmZym43bV1Lq-RHvgVl3iiGJd2DxY_1Fkhf8_9JX6frPxHIZE_U5B9zKx6aZSFl6Y_v6BdlDKOyFW8DxNENFJje2cObvivstwyb_4FcVZ" 
              />
              <img 
                alt="Student" 
                className="w-10 h-10 rounded-full border-2 border-white" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqBjlainYHAmXTl_orlM-w6e3fKDILxrWPrFqWAfDXc51PmObb6MKxjaSnV-wrA6hEFiUZIDqlD3JhXcXaYGrL3MisIm2Tymb8wwVstzc8pdaJ7hl7yvN--rnMuB71pvn9bj_KHUaCGtr9dFp6T-j43FxpHGKDLbqbcS631W5t5D1u2rrG4vV9y5CLONCCyMMhEvScDPr2lvqqEIhOzDkt18jBim6csOSAQrM6ZyBqFL8_jrsJDU5gd59fNJo6it3FPY0m2H9by2ZB" 
              />
            </div>
            <p className="font-label-md">Join <span className="font-bold text-primary">5,000+</span> successful graduates</p>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="bg-surface-container rounded-[2rem] overflow-hidden aspect-square shadow-2xl relative">
            <img 
              alt="Students Learning" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXXx3sVVS3z9Fy73EbePMflCNCEHKwQC_izq_90WBD565HBXaKpAdbVCjYecKD8ADi0T5RiKzmLB7BUcUlMz2l9s4Q57fAtmNfbPSsLykqN1tDK0SX6GLoZm0Qn3gpyn70_Js-yu_kxmM4AZ0m_7tUFHSE9wvyZLpDmbrmN4sptihTSo78vvSTigbmatf11tMjsznDGFaPl2yU6ZgJy-5ngVooATzABFRxsET-w_34RvwQju9fVI1n4IRYWLvt8BbwdH8n8tSSxZLp" 
            />
            <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-label-sm text-primary uppercase">Next Batch</p>
                <p className="font-headline-sm">October 15, 2024</p>
              </div>
              <div className="bg-primary text-on-primary p-3 rounded-lg">
                <span className="material-symbols-outlined">event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
