import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-highest w-full pt-stack-lg pb-stack-md border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto mb-12">
        <div className="col-span-1 md:col-span-1 space-y-4">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-on-surface-variant">LAXMI EDUCATION</span>
          <p className="text-body-sm text-on-surface-variant">Empowering digital excellence through industry-relevant computer education and mentorship since 2010.</p>
          <div className="flex gap-4">
            <a className="text-primary hover:scale-110 transition-transform" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-primary hover:scale-110 transition-transform" href="#"><span className="material-symbols-outlined">video_chat</span></a>
            <a className="text-primary hover:scale-110 transition-transform" href="#"><span className="material-symbols-outlined">campaign</span></a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface">Quick Links</h4>
          <ul className="space-y-2 text-body-sm text-on-surface-variant">
            <li className=""><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
            <li className=""><a className="hover:text-primary transition-colors" href="#">Courses</a></li>
            <li className=""><a className="hover:text-primary transition-colors" href="#">Admissions</a></li>
            <li className=""><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface">Legal</h4>
          <ul className="space-y-2 text-body-sm text-on-surface-variant">
            <li className=""><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
            <li className=""><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
            <li className=""><a className="hover:text-primary transition-colors" href="#">Sitemap</a></li>
            <li className=""><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface">Location</h4>
          <p className="text-body-sm text-on-surface-variant">123 Education Plaza, IT Road, Mumbai, Maharashtra 400001</p>
          <div className="rounded-lg overflow-hidden h-32 w-full grayscale hover:grayscale-0 transition-all duration-500">
            <img 
              alt="Map View" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATDcSkRIPN-HomPAZSAUw9e9IuJWnWPzXNNU9UJWaz1JmAII766BYyjJP8W4sD2L5aAEPd0Vj5xCCj7w5IEza5fCmJT5grtz-e1v-LLpPvXjWEBcpgCBWiNC6lWSj0x-B-36XbRfoSxQ2IzYgYEh32UiazZOKjLbxrLdeFKBAFwQMmfD3ja8lUCfRnnUeeZ2Mh5vK1vixBvyt2Y9ebrROenNKXoC8C2OjV6h1NMABSkrq9ydF8f5YGjyzhQI_nIGu9sKIjQ4HpJ8X4" 
            />
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant pt-8 text-center px-margin-desktop max-w-container-max mx-auto">
        <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 LAXMI COMPUTER EDUCATION. Empowering Digital Excellence.</p>
      </div>
    </footer>
  );
};

export default Footer;
