import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reviewService from '../../services/reviewService';
import successStoryService from '../../services/successStoryService';

const Reviews = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reviewsData, storiesData] = await Promise.all([
        reviewService.getReviews(),
        successStoryService.getSuccessStories(true)
      ]);
      setReviews(reviewsData || []);
      setSuccessStories(storiesData || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load student reviews and success stories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeDetails = (url) => {
    if (!url) return null;
    const videoId = getYouTubeId(url);
    if (!videoId) return null;
    return {
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      maxResThumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    };
  };

  const textReviews = reviews.filter(r => !r.videoUrl || r.videoUrl.trim() === '');
  const categories = ['All', ...new Set(textReviews.map(r => r.courseName || 'General'))];

  const filteredReviews = activeFilter === 'All'
    ? textReviews
    : textReviews.filter(r => (r.courseName || 'General') === activeFilter);

  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.split(' ');
    return parts.map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2) || 'ST';
  };

  const videoTestimonials = successStories
    .map(s => {
      const ytDetails = getYouTubeDetails(s.youtubeUrl);
      const thumbnail = s.thumbnail && s.thumbnail.trim() !== ''
        ? (s.thumbnail.startsWith('http') ? s.thumbnail : `http://localhost:5000${s.thumbnail}`)
        : (ytDetails ? ytDetails.maxResThumbnailUrl : '');
      return {
        id: s._id,
        title: s.title,
        description: s.description,
        thumbnail,
        url: ytDetails ? ytDetails.embedUrl : '',
        studentName: s.studentName
      };
    })
    .filter(v => v.url !== '');

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      {/* Hero Section */}
      <header className="text-center py-16 md:py-24 space-y-stack-md">
        <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface">What Our Students Say</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Discover the transformative journeys of our learners. Our commitment to digital excellence has empowered thousands to achieve their professional dreams.
        </p>
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="flex text-amber-400">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
          </div>
          <span className="font-bold text-headline-sm">4.9/5</span>
          <span className="text-on-surface-variant">based on 2,000+ reviews</span>
        </div>
      </header>

      {/* Overall Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter py-stack-lg">
        <div className="bg-surface-container-low p-stack-lg rounded-xl text-center border border-outline-variant/30 bento-card">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">sentiment_satisfied</span>
          <h3 className="font-headline-lg text-headline-lg text-primary">95%</h3>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Student Satisfaction</p>
        </div>
        <div className="bg-surface-container-low p-stack-lg rounded-xl text-center border border-outline-variant/30 bento-card">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">workspace_premium</span>
          <h3 className="font-headline-lg text-headline-lg text-primary">12,000+</h3>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Certified Students</p>
        </div>
        <div className="bg-surface-container-low p-stack-lg rounded-xl text-center border border-outline-variant/30 bento-card">
          <span className="material-symbols-outlined text-primary text-4xl mb-2">trending_up</span>
          <h3 className="font-headline-lg text-headline-lg text-primary">500+</h3>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Placement Successes</p>
        </div>
      </section>

      {/* Filter/Search */}
      {!loading && !error && (
        <section className="flex flex-col md:flex-row items-center justify-between gap-gutter py-stack-md mt-12 mb-8 w-full">
          <h2 className="font-headline-md text-headline-md text-on-surface">Student Testimonials</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full font-label-md transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-primary text-on-primary'
                    : 'bg-secondary-container text-on-secondary-container hover:bg-primary/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials Grid / Loading / Error */}
      {loading ? (
        <div className="py-24 text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-3">sync</span>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Syncing testimonials...</p>
        </div>
      ) : error ? (
        <div className="py-16 max-w-md mx-auto text-center bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20">
          <span className="material-symbols-outlined text-4xl text-error mb-2">warning</span>
          <p className="font-body-md font-semibold">{error}</p>
          <button 
            onClick={fetchReviews}
            className="mt-4 px-6 py-2 bg-error text-on-error rounded-lg font-label-md text-xs hover:opacity-90 transition-opacity"
          >
            Retry Load
          </button>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="py-16 text-center w-full">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">rate_review</span>
          <p className="font-body-lg text-on-surface-variant">No testimonials found for this category.</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter transition-all duration-300">
          {filteredReviews.map((review) => {
            const hasPhoto = review.studentPhoto && review.studentPhoto.trim() !== '';
            const photoSrc = hasPhoto 
              ? (review.studentPhoto.startsWith('http') ? review.studentPhoto : `http://localhost:5000${review.studentPhoto}`)
              : null;
            
            return (
              <div
                key={review._id}
                className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm bento-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 italic">
                    "{review.reviewText}"
                  </p>
                </div>
                <div className="flex items-center gap-stack-md mt-auto">
                  {photoSrc ? (
                    <img
                      alt={review.studentName}
                      className="w-12 h-12 rounded-full object-cover"
                      src={photoSrc}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
                      {getInitials(review.studentName)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">{review.studentName}</h4>
                    <p className="font-label-sm text-label-sm text-primary uppercase">{review.courseName || 'Student'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Video Testimonials Section */}
      <section className="py-24 space-y-stack-lg">
        <h2 className="font-headline-lg text-headline-lg text-center text-on-surface">Student Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {videoTestimonials.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-video bg-surface-dim border border-outline-variant"
            >
              <img
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={video.thumbnail}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-6xl opacity-90 group-hover:scale-125 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_circle
                </span>
              </div>
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                <p className="text-white font-headline-sm">{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-on-primary rounded-3xl p-stack-lg md:p-24 text-center space-y-stack-md relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <h2 className="font-headline-lg text-headline-lg relative z-10">Ready to start your own success story?</h2>
        <p className="font-body-lg text-body-lg max-w-xl mx-auto opacity-90 relative z-10">
          Join 12,000+ graduates who have already accelerated their careers with our industry-recognized certifications.
        </p>
        <div className="pt-6 relative z-10">
          <button
            onClick={() => navigate('/admission')}
            className="bg-on-primary text-primary px-12 py-4 rounded-xl font-bold text-lg hover:bg-primary-fixed transition-colors shadow-lg active:scale-95 duration-150"
          >
            Enroll Now
          </button>
        </div>
      </section>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-3xl overflow-hidden shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 flex items-center justify-center transition-colors z-10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="aspect-video bg-black flex items-center justify-center">
              <iframe
                title={selectedVideo.title}
                className="w-full h-full"
                src={selectedVideo.url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-surface text-left">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{selectedVideo.title}</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {selectedVideo.description || "Discover how Laxmi Computer Education equips thousands of students with professional computing skills, direct real-world project portfolios, and robust job opportunities."}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Reviews;
