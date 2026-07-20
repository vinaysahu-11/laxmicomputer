import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';

const PopularCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getFeaturedCourses();
      setCourses(data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load popular courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  return (
    <section className="py-stack-lg bg-surface scroll-reveal active text-left">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md mb-12">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface">Popular Courses</h2>
            <p className="text-on-surface-variant max-w-md font-light">Our curriculum is designed by industry experts to ensure you're ready for the real world.</p>
          </div>
          <button 
            onClick={() => navigate('/courses')}
            className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform active:scale-95 duration-100"
          >
            Explore All Courses <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <span className="material-symbols-outlined animate-spin text-3xl text-primary mb-2">sync</span>
            <p className="font-label-sm text-on-surface-variant uppercase tracking-wider text-xs font-semibold">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="py-12 bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20 max-w-md mx-auto text-center">
            <span className="material-symbols-outlined text-3xl text-error mb-2">warning</span>
            <p className="font-body-sm font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {courses.slice(0, 3).map((course) => (
              <div 
                key={course._id || course.slug}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
              >
                <div className="h-56 overflow-hidden relative bg-surface-container-high">
                  {course.thumbnail ? (
                    <img 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      src={course.thumbnail.startsWith('http') ? course.thumbnail : `http://localhost:5000${course.thumbnail}`} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-5xl">menu_book</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold text-[10px] uppercase tracking-wider">
                    {course.duration}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-on-surface-variant mb-2">
                      <span className="material-symbols-outlined text-[16px] text-orange-500 fill-current">star</span>
                      <span className="font-label-md font-semibold text-xs text-on-surface-variant">4.9 Featured</span>
                    </div>
                    <h3 className="font-headline-md mb-2 font-semibold text-on-surface line-clamp-1">{course.title}</h3>
                    <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-2 font-light">{course.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/35">
                    <span className="font-headline-sm text-primary font-bold">₹{course.price.toLocaleString('en-IN')}</span>
                    <button 
                      onClick={() => navigate('/courses')}
                      className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-label-md group-hover:bg-primary group-hover:text-on-primary transition-colors font-bold active:scale-95 duration-100"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {courses.length === 0 && (
              <div className="col-span-full py-12 text-center text-on-surface-variant font-light bg-surface-container-low/20 rounded-2xl border border-outline-variant/40">
                <span className="material-symbols-outlined text-4xl mb-2 text-outline">menu_book</span>
                <p>No featured courses currently listed.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
