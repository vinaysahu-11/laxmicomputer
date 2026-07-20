import React, { useState, useEffect } from 'react';
import reviewService from '../../services/reviewService';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getReviews();
        setReviews(data || []);
      } catch (err) {
        console.error('Error fetching homepage reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.split(' ');
    return parts.map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2) || 'ST';
  };

  const topReviews = reviews.slice(0, 3);

  if (loading) {
    return (
      <section className="py-stack-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-3">sync</span>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase">Loading Reviews...</p>
        </div>
      </section>
    );
  }

  if (topReviews.length === 0) {
    return null;
  }

  return (
    <section className="py-stack-lg bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="text-center mb-12 space-y-2">
          <h2 className="font-headline-lg text-headline-lg">What Our Students Say</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Verified reviews from our recent graduates and current students.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {topReviews.map((review) => {
            const hasPhoto = review.studentPhoto && review.studentPhoto.trim() !== '';
            const photoSrc = hasPhoto 
              ? (review.studentPhoto.startsWith('http') ? review.studentPhoto : `http://localhost:5000${review.studentPhoto}`)
              : null;
            
            return (
              <div key={review._id} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex text-primary mb-4">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[20px] fill-current">star</span>
                    ))}
                  </div>
                  <p className="text-body-md text-on-surface mb-6">"{review.reviewText}"</p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  {photoSrc ? (
                    <img 
                      className="w-10 h-10 rounded-full object-cover" 
                      src={photoSrc} 
                      alt={review.studentName} 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center text-primary font-bold text-sm">
                      {getInitials(review.studentName)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-body-md">{review.studentName}</h4>
                    <p className="text-label-sm text-on-surface-variant">{review.courseName || 'Student'}</p>
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

export default Reviews;
