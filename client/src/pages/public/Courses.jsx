import React, { useState } from 'react';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const coursesData = [
    {
      id: 'basic-computer',
      title: 'Basic Computer',
      badge: 'Beginner',
      category: 'Diploma',
      description: 'Fundamental course covering operating systems, file management, and hardware basics for everyday digital tasks.',
      duration: '3 Months',
      icon: 'schedule',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQS9JpkRiEURqAExqyf9RwAz61xGess61Tt0gaRxOGf02kdqqQI0wr3ING71sB3DAAvFbBRLr1Dy50jdn6m-04p05USBvDETcf--7srWbB90QXcd_nUdmLOSLM6RFkFIcdA7upxsmHUU0gxD_L7cuVnEZXlMkh8yDDm6K6qCO8_lQDTGrmM_DjmXaKITD7O1bADo_miHrJ0kMAGEslDd2GdgAGRbYSQ6q951dFdCZhIlkvwrvs9z8_Eo816fpf0jUROIa3SIdNgi'
    },
    {
      id: 'dca',
      title: 'DCA',
      badge: 'Diploma',
      category: 'Diploma',
      description: 'Diploma in Computer Applications covering core software suites, basic web technologies, and database concepts.',
      duration: '6 Months',
      icon: 'schedule',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCfmrE-1jgZinp1e9XXf8Mo9gfR-8SeYx5SJWKIaW5zNKt93HtIR3mkUmoRGlIKPMu0RUYzJ2XcpjFKNWGhWk2zKGauofOaU6Cjhlqu3gHTdVufT4oprmGpxYm0gHeQUPJDZn4fsvMyO9G5QG7bE2YmGYcHlwFt4SPiyE1VptH8UVBPEVM6_Q6Jxnd3fNFqQ_2FViUevRdqUGGIjJp154tnwJhJSBU9z6PRoR36sruXy_hwKN5yu_zcllyyvnrlJyWSC8P0hUCFBNv'
    },
    {
      id: 'pgdca',
      title: 'PGDCA',
      badge: 'Post Graduate',
      category: 'Diploma',
      description: 'Advanced postgraduate diploma focusing on systems analysis, advanced programming, and professional IT management.',
      duration: '1 Year',
      icon: 'schedule',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwA6hJcaDrniWKSWspyJHRyIP_QbgFu_gJx5yt7wnlBjm3BUhi1E5mEli_By2b4zboSH-qQ7I5DGtZii3RV8dLe44_tG1yGRP3OWkljBsujkb-U3PjGxC5NH9uh932HLOXI6VDF0ASNAkhy32t1RQBUKktt-a7UsToaNi4vd6HvnHYUGkad6MDSafekG9hDc1vXAgTy6CGhIJFj7IEQ_Yx95wWW7tixY25dccjOzrC2ic0m8hFQ0x6nGG4PFcNCgj4R_fcsQ8ZmaH'
    },
    {
      id: 'tally-prime',
      title: 'Tally Prime',
      badge: 'Professional',
      category: 'Accounting',
      description: 'Master computerized accounting, GST filing, payroll management, and inventory tracking using Tally Prime.',
      duration: '3 Months',
      icon: 'schedule',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4N6840n2rJ_g2OGE2yxQtT_Y8jT7zMTTW3HCvm6LsOz2xcxStrwy95KONuYtGupeH5-vFQtvLRr_BZawHcrwToaohB5cxJhQxnuWKHIjwHGBXE3Pe-jCBahTF939u_ym_tI5XSRTEvu2L3VWqQRDMDVYoiELIa-ilpN4wNHAzD2PMdLSKg4x6mH0wcZ5gxHNJOz9UrOLOtq0-J0-1MGs-dwX9JB1hwlxR6fPmq_HTCDmaFK1CnjU9o26nZxC0m4FvgJWTgVbm5Th9'
    },
    {
      id: 'ms-office',
      title: 'MS Office',
      badge: 'Essential',
      category: 'Diploma',
      description: 'Comprehensive training in Word, Excel, PowerPoint, and Outlook for professional productivity and documentation.',
      duration: '2 Months',
      icon: 'schedule',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLQkfNwHzVgVZGL87EPlILWV8y-gt9Fnxt_FBO3IlBv9kLzKjt1dP-VXC1kds4HCO8QMaTC3NoHKysTHgUSDuGCUDhqAd9hlbfB-owfx8qbsYWCUsK1amuFnTRAujozXSzwNZKh2VD57dnxkWn2dl12zJ0dbK8c93Vqj5lbd6JsWBlXG_IgnaGv5TAu5HO3el9P9843YNruF6Y13KBLDBaAFFVzdINZGRiDnbt91lJeqWPw08knLf72RhdOolcPKERcrip2aTw-ITU'
    },
    {
      id: 'typing',
      title: 'English & Hindi Typing',
      badge: 'Skill',
      category: 'Diploma',
      description: 'Build exceptional speed and accuracy in both English and Hindi typing with our specialized software and tutors.',
      duration: '1-3 Months',
      icon: 'bolt',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABo02Mx8fb3_Xmig4RV-OEI7MPyzPN9roi4sTvzk5GVH6x8S4x7B3dpujrSj31_c0pDxLUBIvpN1zKUCYbNFFmsC_4y41A4vnaMJKtxyCMJUsAWtMpyrD60C6qUFAi9EYI0NyAIGlmdQxi6R7HK1_Pw9lHnk583m09nwY3Yxxgr0sFsLZZcPCOrzYgvAzjSZXhXmz_bXiJJJbv7PdAMNdxpHOFq7YqL24z0t0cbMVpGjXB4E7ahJ-2GegjNwognIL4oifdEiC1H34L'
    },
    {
      id: 'internet',
      title: 'Internet & Security',
      badge: 'Web',
      category: 'Diploma',
      description: 'Learn effective web searching, email management, online safety, and how to use digital government services.',
      duration: '1 Month',
      icon: 'public',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_xQJTyXrEjQ1WHVyfWl4w98R4BFC9KrOhUWZTuAM0bKaPbhbhhXgNZnhLX0D-HN6tJZUhchw_YswpuPj9fpzq9D-uNV9cK_oGuKzm7-kJhQjRMoCBUgKbitevPDiA3maV4TMWQ_7RjfJJXUUHJFb0LAeaxT0YOpR0D9Yi726jVBTrQtGZudM3z_lxvOB3-XU-uzosLZjXSKzQpLz2G-Vfz7sXGEJm5RmhztOg3b52x7s2P5WfEjKhfwWCmeugq19kCC8AXCz6MbXZ'
    },
    {
      id: 'programming-basics',
      title: 'Programming Basics',
      badge: 'Coding',
      category: 'Coding',
      description: 'Introduction to logic, algorithms, and fundamental coding concepts using Python or C++ to kickstart your dev career.',
      duration: '4 Months',
      icon: 'code',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwfVGQrnBDkybLOGtMG50XoM9-n_v-XAFJ7be_7vkWH_xaULvMLilfoFS-jEzAGGJ41M3cUcEcGxnA-ZyUo115yHSTuQP8Z6N8kFql7ZVxnAdY99iWA7sZyLzyNVvdo6a26jVl113mzpmF6DKBnngMAoiA8NsVjKXh_sTS3Bfd7hlym9GTKhybKW2S8jLJmfpje3qxudWz2gKAud9lS7BKNWVh7gLDogDUQ2lNOAY_TzmI0RbOcXpwvbogz6ap22kplXMFLJHO34EF'
    }
  ];

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Courses' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="py-stack-lg bg-surface-container-low overflow-hidden">
        <div className="px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-gutter">
          <div className="flex flex-col gap-stack-md">
            <span className="text-primary font-label-md tracking-wider uppercase">Advance Your Career</span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">Master Global Skills with our Expert Courses</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Comprehensive IT training programs designed to bridge the gap between classroom learning and industrial demands. Join thousands of successful students today.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-md shadow-md hover:shadow-lg transition-all">Explore Below</button>
              <button className="border border-primary text-primary px-8 py-3 rounded-lg font-label-md hover:bg-primary-fixed transition-all">Download Brochure</button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-fixed rounded-full opacity-30 blur-3xl"></div>
            <img 
              alt="Computer Education" 
              className="rounded-xl shadow-lg z-10 relative object-cover h-[400px] w-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9H1p8Xh5w8U1EPtXjRDESJKLp-uXzyOe_p700AkPDkunZ1J5eF_N8_vGsd3kpa_Ylfjq-4ErweP07oasEYmaMWeJ6s3Mctclxwobdv1iSpwhlHQ64YctbAYENfYKoICMXFalkmjYuv7YBuHnbQwolpP3pPrz-MBkLZy-5zgXYKMliN290sDrZ1ZejNXZ17Kaebw6YYnWiDzJyidM4P5V9l0KXfZaTtIdgq3F06gP00k066ZdQ_eijNtkJQyhrZlyhajvUblavEg93" 
            />
          </div>
        </div>
      </section>

      {/* Course Search & Filter Bar */}
      <div className="bg-surface sticky top-16 z-40 py-4 border-b border-outline-variant">
        <div className="px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              placeholder="Search for a course..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {['All Courses', 'Diploma', 'Accounting', 'Coding'].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-label-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-primary text-on-primary' 
                    : 'bg-secondary-container text-on-secondary-container hover:bg-outline-variant'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <main className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
          {filteredCourses.map((course, idx) => (
            <article 
              key={course.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col hover:shadow-lg transition-all group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: hoveredIndex === idx ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={course.image} 
                />
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm">{course.badge}</div>
              </div>
              <div className="p-stack-md flex flex-col flex-grow gap-stack-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{course.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                  {course.description}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-[18px]">{course.icon}</span>
                    <span className="font-label-sm">{course.duration}</span>
                  </div>
                  <button className="text-primary font-label-md group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Enroll Now <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Call to Action */}
      <section className="bg-primary py-stack-lg my-stack-lg rounded-3xl mx-margin-desktop overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-5 -skew-x-12 translate-x-12"></div>
        <div className="px-margin-desktop text-center text-on-primary relative z-10">
          <h2 className="font-headline-lg text-headline-lg mb-4">Unsure which course to pick?</h2>
          <p className="font-body-lg text-body-lg mb-8 opacity-90 max-w-2xl mx-auto">Our academic counselors are ready to help you map out your career path and select the program that best fits your goals.</p>
          <button className="bg-on-primary text-primary px-10 py-4 rounded-full font-headline-sm hover:bg-secondary-fixed transition-colors">Book a Free Counseling Session</button>
        </div>
      </section>
    </>
  );
};

export default Courses;
