import React, { useState, useEffect } from 'react';
import courseService from '../../services/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourses();
      setCourses(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load courses curriculum database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
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
          <div className="flex flex-col gap-stack-md text-left">
            <span className="text-primary font-label-md tracking-wider uppercase">Advance Your Career</span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold">Master Global Skills with our Expert Courses</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg font-light">
              Comprehensive IT training programs designed to bridge the gap between classroom learning and industrial demands. Join thousands of successful students today.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-md shadow-md hover:shadow-lg transition-all active:scale-95 duration-100">Explore Below</button>
              <button className="border border-primary text-primary px-8 py-3 rounded-lg font-label-md hover:bg-primary-fixed transition-all active:scale-95 duration-100">Download Brochure</button>
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
                    ? 'bg-primary text-on-primary font-bold' 
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
        {loading ? (
          <div className="py-24 text-center">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-3">sync</span>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Syncing curriculum catalogs...</p>
          </div>
        ) : error ? (
          <div className="py-16 max-w-md mx-auto text-center bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20">
            <span className="material-symbols-outlined text-4xl text-error mb-2">warning</span>
            <p className="font-body-md font-semibold">{error}</p>
            <button 
              onClick={fetchCourses}
              className="mt-4 px-6 py-2 bg-error text-on-error rounded-lg font-label-md text-xs hover:opacity-90 transition-opacity"
            >
              Retry Load
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter text-left">
            {filteredCourses.map((course, idx) => (
              <article 
                key={course._id || course.slug}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col hover:shadow-lg transition-all group"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transform: hoveredIndex === idx ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div className="h-48 overflow-hidden relative bg-surface-container-high">
                  {course.thumbnail ? (
                    <img 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={course.thumbnail.startsWith('http') ? course.thumbnail : `http://localhost:5000${course.thumbnail}`} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-5xl">menu_book</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider text-[10px]">
                    {course.category}
                  </div>
                </div>
                <div className="p-stack-md flex flex-col flex-grow gap-stack-sm">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{course.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 font-light">
                    {course.description}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant">
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      <span className="font-label-sm">{course.duration}</span>
                    </div>
                    <button className="text-primary font-label-md group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                      Enroll Now <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {filteredCourses.length === 0 && (
              <div className="col-span-full py-16 text-center text-on-surface-variant font-light bg-surface-container-low/20 rounded-2xl border border-outline-variant/40">
                <span className="material-symbols-outlined text-4xl mb-2 text-outline">search_off</span>
                <p>No matching courses found for your search query.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Call to Action */}
      <section className="bg-primary py-stack-lg my-stack-lg rounded-3xl mx-margin-desktop overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-5 -skew-x-12 translate-x-12"></div>
        <div className="px-margin-desktop text-center text-on-primary relative z-10">
          <h2 className="font-headline-lg text-headline-lg mb-4 font-bold">Unsure which course to pick?</h2>
          <p className="font-body-lg text-body-lg mb-8 opacity-90 max-w-2xl mx-auto font-light">
            Our academic counselors are ready to help you map out your career path and select the program that best fits your goals.
          </p>
          <button className="bg-on-primary text-primary px-10 py-4 rounded-full font-headline-sm hover:bg-secondary-fixed transition-colors font-bold active:scale-95">
            Book a Free Counseling Session
          </button>
        </div>
      </section>
    </>
  );
};

export default Courses;
