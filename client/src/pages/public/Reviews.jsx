import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Web Design Graduate',
      category: 'Coding',
      rating: 5,
      text: '"Laxmi Computer Education changed my career trajectory. The Web Design course was practical and the faculty was incredibly supportive during the placement process."',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuQirGqNIUNzGyq6uV2NIrQW_L83-pndMjKWlWW1_VkkZi37FV_KnSYsms10zhpAtiU8QqRdMciXv_GYtTSUKW3fM-eY41l9pc-lvU7CHjdKJSjrcFPWgLgGJLO4eHbZSdRULrtxS4awyUcPdKgjb3YERye3Ih_gq56QzIN4N5GxeUVPrNKu4x65rBeyZFsaDqka-wl8iY1Jc0zhQt-OOJs2yWntlW7jRyiBQ9H_VxyiI5s2629cYfkqllttTKb0qbztuKI6U1Hcr_',
      initials: 'PS'
    },
    {
      id: 2,
      name: 'Anil Kumar',
      role: 'Accounting Pro',
      category: 'Accounting',
      rating: 5,
      text: '"The Tally Prime and GST modules were exactly what I needed for my accounting job. The hands-on training on real datasets was the best part."',
      image: null,
      initials: 'AK'
    },
    {
      id: 3,
      name: 'Rahul Varma',
      role: 'DCA Student',
      category: 'Basic IT',
      rating: 5,
      text: '"Starting from scratch in DCA, I never thought I would be so comfortable with MS Office and basic programming. Truly the best institute in the city."',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpAKEhyiazoVqe6QnUFT_-SONxUE2uga0ty73s0h1Cka3I4Nx2wSYXOmuOjnHDKAFNFrMLO7eoeOYghlvMA7x130kVKdtBwGAgkJa-bdpCo4Mamyf8LkXBjEpziWzPYad_FgYVEiG18heXXkVhpIQCQN66ROSBxvystY5rH0R21WDdoXyvGwsr-QMkMVbmv-kLi3eES9L8Jgn30eMlToby1ceRcqhqUIWTPyhdgtki4mzngT5v6fK3YCtn511Frrv9iFu2V-SH1rbT',
      initials: 'RV'
    }
  ];

  const categories = ['All', 'Coding', 'Accounting', 'Basic IT'];

  const filteredReviews = activeFilter === 'All'
    ? reviews
    : reviews.filter(r => r.category === activeFilter);

  const videoTestimonials = [
    {
      id: 1,
      title: "Meera's Journey to Front-End Developer",
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz_JxcCJ-xe5iuCZ70T2x_T5X4cb1OVvyY0HfKvaqhbULj0IuvvL8vos3U2YbUmxMKWn4jnzIAAYpoxx0K2Rmua9W_5lNHLQWRD_fJmd24a66anjuZsNYYMtysTiAa81VbqRKLMzyVLeqX7hf00bAWYF3X_URQbW8MjOMrlshd5AmwfVeyRRVQaOdv_O-VNjey2MtSe99DHxRrRxvmqr_MQhNuM3r4-UB33sEwFT6GIqqIUrVJrCnuUX_YEXq36MUndv0mrof59ln8',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: "How Tally Transformed Rohan's Business",
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASL3fk9lmwNiVkfq34gf40ohrCuWk_pXtzvxrUKDMhRMDLdH9vB7gsYugT-ZxxTILxtM4dJgu4zM13-987jlCz-cV_4kXnOXn-FikaDaZ-EEyzH4D4uq13YM01M-XazIHWO3REglHnzZE-UzSK7akqRw_BDHs7c9qN1MbXnCb6tyFymuLg67L7WPJNV4ODgpWn3_TG11GbCxPqEFCrhMSLQNICiz2OwHE67t_F-lfArm5Il1yOFwIIqrg7zmMRyCOGGWpN4cNF2uts',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

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
      <section className="flex flex-col md:flex-row items-center justify-between gap-gutter py-stack-md mt-12 mb-8">
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

      {/* Testimonials Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter transition-all duration-300">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm bento-card flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 italic">
                {review.text}
              </p>
            </div>
            <div className="flex items-center gap-stack-md">
              {review.image ? (
                <img
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                  src={review.image}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
                  {review.initials}
                </div>
              )}
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">{review.name}</h4>
                <p className="font-label-sm text-label-sm text-primary uppercase">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

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
            <div className="p-6 bg-surface">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{selectedVideo.title}</h3>
              <p className="font-body-md text-on-surface-variant">
                Discover how Laxmi Computer Education equips thousands of students with professional computing skills, direct real-world project portfolios, and robust job opportunities.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Reviews;
