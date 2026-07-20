import React, { useState, useEffect } from 'react';
import reviewService from '../../services/reviewService';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getReviews();
        const textReviews = (data || []).filter(r => !r.videoUrl || r.videoUrl.trim() === '');
        setReviews(textReviews);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, reviews.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3 >= reviews.length ? 0 : prev + 1));
  };

  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.split(' ');
    return parts.map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2) || 'ST';
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  if (loading) {
    return (
      <section className="py-stack-lg bg-surface scroll-reveal active">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-3">sync</span>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase">Loading Success Stories...</p>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show the section if there are no testimonials
  }

  return (
    <section className="py-stack-lg bg-surface scroll-reveal active">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-headline-lg text-headline-lg">Student Success Stories</h2>
          {reviews.length > 3 && (
            <div className="flex gap-2">
              <button 
                onClick={handlePrev}
                className="p-2 rounded-full border border-outline hover:bg-surface-container transition-colors"
                aria-label="Previous testimonials"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-full border border-outline hover:bg-surface-container transition-colors"
                aria-label="Next testimonials"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter transition-all duration-350">
          {visibleReviews.map((review, index) => {
            const hasPhoto = review.studentPhoto && review.studentPhoto.trim() !== '';
            const photoSrc = hasPhoto 
              ? (review.studentPhoto.startsWith('http') ? review.studentPhoto : `http://localhost:5000${review.studentPhoto}`)
              : null;
            
            return (
              <div 
                key={review._id} 
                className="p-8 bg-surface-container-low rounded-xl border-l-4 border-primary italic relative flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-primary/10 text-6xl absolute top-4 right-4">format_quote</span>
                <p className="text-on-surface-variant mb-6 relative z-10">"{review.reviewText}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  {photoSrc ? (
                    <img 
                      className="w-12 h-12 rounded-full object-cover" 
                      src={photoSrc} 
                      alt={review.studentName} 
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
                      {getInitials(review.studentName)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold not-italic">{review.studentName}</h4>
                    <p className="text-label-sm text-on-surface-variant not-italic">{review.courseName || 'Student'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
