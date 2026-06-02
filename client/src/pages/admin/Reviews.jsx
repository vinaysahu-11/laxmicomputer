import React, { useState } from 'react';

const Reviews = () => {
  // 1. Initial State Data for Student Reviews
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      studentName: 'Sarah Jenkins',
      course: 'Full Stack Web Development',
      time: '2 hours ago',
      rating: 5,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUfA65JV4uzymI372Wkby0p4JnhM47dR4uPAOE7DTW0UAtfv-KAiblVuTdjLsXlBKnvJ4FLitgu2Dc3dQicrJ9Ra5F67w0p_sT9Du0_-bUS_zz0QihITjQp3Qfq1q1xf1gAoDBnYaORJQEOx-DDA72uh1M0pfMnc0FHTTCf-zbDXhV854T2wGTEbSpgna5cg-o8v5D7SkVkVBa4HK4KHbbserkoTIngCnHclthdHy4-f1OkHNOI8gc4VaLeM3H8_YBUCH5pgE3M-qH',
      feedback: 'The Python curriculum was incredibly well-structured. I went from knowing zero code to building my own automation tools in just 12 weeks. The instructors are clearly industry professionals who care about your career path.',
      status: 'Pending',
      verified: true
    },
    {
      id: 'rev-2',
      studentName: 'Marcus Thorne',
      course: 'UI/UX Design Masterclass',
      time: 'Yesterday',
      rating: 4,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfljxNtWGS4s4GOagETHonAmsV3uULTDC8VH9joKuS80C1qf81Vmc6fWPxOfs-Qed9xzDE_JQkZGL28r4jc-YyD4sQyJC5UMlYiOblQlPfJcaBut1j6rt2LMNSdIXgJw6DbiOVhDFe-EVMt1KCpaq50W1bimdMkLMt_2aXLQjevKYt4a0pFMV5l5Jr4XPXi0D15ahxd5MV4dlldc2313HCZTReLiQH6YJkepHHLrGauzK7bIJB6XF0Xw7GWJUgqlNVtSy-6xONOANH',
      feedback: 'Great course overall, but I felt the final project was a bit rushed. The feedback loop from teachers is amazing though. I\'ve already landed a junior role using my portfolio from this class!',
      status: 'Approved',
      verified: true
    },
    {
      id: 'rev-3',
      studentName: 'Anonymous Learner',
      course: 'Cloud Architecture',
      time: '3 days ago',
      rating: 1,
      feedback: 'PLEASE REFUND MONEY RIGHT NOW!!!!! COURSE IS NOT GOOD AT ALL!!!!!! TOO MUCH WORK!!!!!! NO HELP FROM ANYONE!!!!!!',
      status: 'Flagged',
      flaggedReason: 'Flagged by system: Potential spam or irrelevant content detected. Contains excessive punctuation and non-academic language.',
      verified: false
    },
    {
      id: 'rev-4',
      studentName: 'Lucas Thorne',
      course: 'Data Science Evening',
      time: '4 days ago',
      rating: 5,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqfD9tJZosq75ltfcDtxI4emDZ3FbP3ifE4H0ztHdL9XTpAQFO3kFMXpX2NO0x4eWlf8HbtHl7P4sEC-9h5nIfp2WBn4NpHv1sK3hC9jvqM4xez8kVrcemC2baUUL7_257j6AXsBvCe8SXlJfs76gUrmpOydYqqpiXCNuluYKIlyyfe7M7KXqqHWw-iGnGA2QO8cuEsRw_LkH2WimouKerjhQvkZiAwg76IbaIQmlEn4SUz0UfwAqkB5WP813sbfxAq127Q6pQYxdt',
      feedback: 'Deep dive into PyTorch and Pandas. Highly practical with active laboratory assessments. The capstone project was extremely challenging but totally worth it.',
      status: 'Approved',
      verified: true
    }
  ]);

  // Moderator Logs state
  const [moderatorLogs, setModeratorLogs] = useState([
    { id: 'log-1', action: 'Approved "Python for Data..."', time: '10m ago', author: 'Admin Sarah', iconColor: 'bg-primary' },
    { id: 'log-2', action: 'Rejected 3 spam reviews', time: '1h ago', author: 'System', iconColor: 'bg-error' },
    { id: 'log-3', action: 'Archived 12 old testimonials', time: '3h ago', author: 'Admin Mike', iconColor: 'bg-tertiary' }
  ]);

  // View settings and filter parameters
  const [selectedStatus, setSelectedStatus] = useState('All Reviews');
  const [selectedRating, setSelectedRating] = useState(null); // null means all
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Settings and overlay modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoApproveConfig, setAutoApproveConfig] = useState({
    autoApproveVerified: true,
    ratingThreshold: 4,
    spamWordFilter: true
  });

  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [visibleCount, setVisibleCount] = useState(3);

  // 2. Micro-interactions and moderation hooks
  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleApproveReview = (review) => {
    setReviewsList(prev => prev.map(r => r.id === review.id ? { ...r, status: 'Approved' } : r));
    
    // Add log
    const newLog = {
      id: `log-${Date.now()}`,
      action: `Approved "${review.studentName}'s review"`,
      time: 'Just now',
      author: 'Super Admin',
      iconColor: 'bg-primary'
    };
    setModeratorLogs(prev => [newLog, ...prev]);
    
    triggerToast(`Testimonial from ${review.studentName} has been successfully approved for public website!`, 'success');
  };

  const handleRejectReview = (review) => {
    setReviewsList(prev => prev.map(r => r.id === review.id ? { ...r, status: 'Archived' } : r));
    
    // Add log
    const newLog = {
      id: `log-${Date.now()}`,
      action: `Rejected "${review.studentName}'s review"`,
      time: 'Just now',
      author: 'Super Admin',
      iconColor: 'bg-error'
    };
    setModeratorLogs(prev => [newLog, ...prev]);
    
    triggerToast(`Testimonial from ${review.studentName} was rejected and moved to Archive.`, 'error');
  };

  const handleUndoApproval = (review) => {
    setReviewsList(prev => prev.map(r => r.id === review.id ? { ...r, status: 'Pending' } : r));
    triggerToast(`Approval retracted for ${review.studentName}. Status reverted to Pending.`, 'info');
  };

  const handleArchiveReview = (review) => {
    setReviewsList(prev => prev.map(r => r.id === review.id ? { ...r, status: 'Archived' } : r));
    triggerToast(`Testimonial archived successfully.`);
  };

  const handleClearFilters = () => {
    setSelectedStatus('All Reviews');
    setSelectedRating(null);
    setSearchQuery('');
    triggerToast('All moderation filters cleared.');
  };

  const handleExportCSV = () => {
    triggerToast('Compiling testimonials database log trails... CSV download initialized.');
  };

  const handleSettingsSaveSubmit = (e) => {
    e.preventDefault();
    setIsSettingsOpen(false);
    document.body.style.overflow = 'auto';
    triggerToast('Testimonial automation rules applied successfully.');
  };

  // 3. Data Filters Resolver
  const getFilteredReviews = () => {
    return reviewsList.filter(item => {
      // 1. Status dropdown filter
      if (selectedStatus !== 'All Reviews') {
        if (item.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
      }
      // 2. Star filter button
      if (selectedRating !== null) {
        if (item.rating !== selectedRating) return false;
      }
      // 3. Search query filter
      if (searchQuery !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.studentName.toLowerCase().includes(query);
        const matchesCourse = item.course.toLowerCase().includes(query);
        const matchesFeedback = item.feedback.toLowerCase().includes(query);
        if (!matchesName && !matchesCourse && !matchesFeedback) return false;
      }
      return true;
    });
  };

  const filteredReviews = getFilteredReviews();
  const paginatedReviews = filteredReviews.slice(0, visibleCount);

  // Quick stats computed directly from live state
  const totalReviewsCount = reviewsList.length + 1280; // offset based on baseline
  const pendingReviewsCount = reviewsList.filter(r => r.status === 'Pending' || r.status === 'Flagged').length;

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Reviews Management</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Moderate and curate student testimonials for the public website.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2.5 border border-outline text-on-surface font-label-md text-label-md rounded-lg flex items-center gap-2 hover:bg-surface-container transition-all active:scale-95 duration-100"
          >
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => {
              setIsSettingsOpen(true);
              document.body.style.overflow = 'hidden';
            }}
            className="px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 duration-100 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">settings_suggest</span>
            <span>Auto-Approve Settings</span>
          </button>
        </div>
      </div>

      {/* Dashboard Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg text-left">
        <div className="glass-card p-stack-md rounded-xl flex flex-col justify-between h-28 border border-outline-variant/60 shadow-sm">
          <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-bold">Total Reviews</span>
          <div className="flex items-end justify-between mt-2">
            <span className="font-headline-lg text-headline-lg font-bold text-primary">{totalReviewsCount.toLocaleString()}</span>
            <span className="text-primary font-bold text-xs bg-primary-fixed border border-primary-fixed-dim px-2 py-0.5 rounded">+12%</span>
          </div>
        </div>

        <div className="glass-card p-stack-md rounded-xl flex flex-col justify-between border-l-4 border-tertiary h-28 border border-outline-variant/60 shadow-sm">
          <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-bold">Pending Moderation</span>
          <div className="flex items-end justify-between mt-2">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{pendingReviewsCount}</span>
            <span className="text-tertiary font-bold text-xs flex items-center gap-1 bg-tertiary-fixed px-2.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[14px]">warning</span> Action Required
            </span>
          </div>
        </div>

        <div className="glass-card p-stack-md rounded-xl flex flex-col justify-between h-28 border border-outline-variant/60 shadow-sm">
          <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-bold">Avg. Rating</span>
          <div className="flex items-end justify-between mt-2">
            <div className="flex flex-col">
              <span className="font-headline-lg text-headline-lg font-bold text-on-surface">4.8</span>
              <div className="flex text-surface-tint mt-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-xs text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
            </div>
            <span className="text-on-surface-variant font-bold text-[10px] uppercase">Last 30 days</span>
          </div>
        </div>

        <div className="glass-card p-stack-md rounded-xl flex flex-col justify-between h-28 border border-outline-variant/60 shadow-sm">
          <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-bold">Conversion Rate</span>
          <div className="flex items-end justify-between mt-2">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">94%</span>
            <span className="text-on-surface-variant font-bold text-[10px] uppercase">Published</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-card rounded-xl p-4 mb-stack-lg flex flex-wrap items-center gap-6 text-left border border-outline-variant/60 shadow-sm">
        <div className="flex items-center gap-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Status:</label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-surface border-outline-variant text-body-sm rounded-lg focus:ring-primary focus:border-primary py-1 px-3 cursor-pointer"
          >
            <option value="All Reviews">All Reviews</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Rating:</label>
          <div className="flex gap-1">
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(selectedRating === star ? null : star)}
                className={`w-8 h-8 rounded border text-xs font-bold transition-all ${
                  selectedRating === star
                    ? 'bg-primary text-on-primary shadow-sm border-primary'
                    : 'border-outline-variant hover:bg-primary-container/20 text-on-surface-variant'
                }`}
              >
                {star}★
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Date Search:</label>
          <input 
            type="date"
            className="bg-surface border border-outline-variant/60 text-body-sm rounded-lg focus:ring-primary focus:border-primary px-3 py-1 font-medium"
          />
        </div>

        <button 
          onClick={handleClearFilters}
          className="ml-auto text-primary font-label-md text-label-md hover:underline font-bold text-xs"
        >
          Clear all filters
        </button>
      </div>

      {/* Review Cards Grid (Asymmetric Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter text-left items-start">
        
        {/* Primary Feed (Left Column) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {paginatedReviews.map((review) => (
            <div 
              key={review.id}
              className={`bg-surface-container-lowest border rounded-xl p-stack-md card-lift transition-all ${
                review.status === 'Flagged' ? 'border-2 border-error-container' : 'border-outline-variant'
              }`}
            >
              <div className="flex justify-between items-start mb-4 gap-2 flex-wrap">
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <img 
                      alt="Student Avatar" 
                      className="w-12 h-12 rounded-full object-cover border border-outline-variant/40" 
                      src={review.avatar}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant font-bold text-sm border border-outline-variant/40">
                      {review.studentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface font-bold leading-none">{review.studentName}</h4>
                    <p className="text-body-sm text-on-surface-variant mt-1.5 font-light">
                      {review.course} • <span className="font-semibold">{review.time}</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-0.5 text-primary shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: `"FILL" ${i < review.rating ? 1 : 0}` }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>

              {review.status === 'Flagged' && (
                <div className="bg-error-container/20 p-3 rounded-lg mb-4 flex gap-3 items-start border border-error-container/30 leading-snug">
                  <span className="material-symbols-outlined text-error shrink-0 text-[18px]">flag</span>
                  <p className="text-[11px] text-on-error-container italic font-bold">
                    {review.flaggedReason}
                  </p>
                </div>
              )}

              <p className="text-body-md text-on-surface leading-relaxed mb-6 italic font-light">
                "{review.feedback}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/50 flex-wrap gap-3">
                <div className="flex gap-2">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    review.status === 'Approved'
                      ? 'bg-green-500/10 text-green-700'
                      : review.status === 'Pending'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-error-container text-on-error-container'
                  }`}>
                    {review.status}
                  </span>
                  {review.verified && (
                    <span className="px-2.5 py-1 bg-surface-container text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-wider border border-outline-variant/30">
                      Verified Purchase
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {review.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => handleRejectReview(review)}
                        className="px-3.5 py-1.5 border border-error text-error rounded-lg font-bold text-xs hover:bg-error/10 transition-colors active:scale-95 duration-100"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleApproveReview(review)}
                        className="px-4 py-1.5 bg-primary text-on-primary rounded-lg font-bold text-xs hover:bg-primary/90 transition-colors active:scale-95 duration-100 shadow-sm"
                      >
                        Approve
                      </button>
                    </>
                  )}

                  {review.status === 'Approved' && (
                    <>
                      <button 
                        onClick={() => handleArchiveReview(review)}
                        className="px-3.5 py-1.5 border border-outline text-on-surface-variant rounded-lg font-bold text-xs hover:bg-surface-container transition-colors active:scale-95 duration-100"
                      >
                        Archive
                      </button>
                      <button 
                        onClick={() => handleUndoApproval(review)}
                        className="px-4 py-1.5 bg-surface-container text-on-surface-variant rounded-lg font-bold text-xs hover:bg-surface-container-high transition-colors active:scale-95 duration-100"
                      >
                        Undo Approval
                      </button>
                    </>
                  )}

                  {review.status === 'Flagged' && (
                    <button 
                      onClick={() => handleRejectReview(review)}
                      className="px-4 py-1.5 bg-error text-on-error rounded-lg font-bold text-xs hover:bg-error/90 transition-colors active:scale-95 duration-100 shadow-sm"
                    >
                      Reject &amp; Notify Admin
                    </button>
                  )}

                  <button 
                    onClick={() => triggerToast('Opening advanced moderations dropdown menu options...')}
                    className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="p-12 text-center border border-dashed border-outline-variant/60 rounded-xl bg-surface-container-lowest text-on-surface-variant italic font-light text-sm">
              No testimonials match the selected status or rating criteria.
            </div>
          )}

          {visibleCount < filteredReviews.length && (
            <div className="flex justify-center mt-12 mb-8">
              <button 
                onClick={() => setVisibleCount(prev => prev + 2)}
                className="px-12 py-3 bg-surface-container-low hover:bg-surface-container-high text-primary border border-outline-variant font-bold rounded-lg transition-all active:scale-95 duration-100 text-sm shadow-sm"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>

        {/* Secondary Info (Right Column) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Moderation Guidelines */}
          <div className="glass-card rounded-xl p-stack-md border border-outline-variant/60 shadow-sm space-y-4">
            <h3 className="font-headline-sm text-headline-sm font-bold border-b border-outline-variant/30 pb-2">
              Moderation Rules
            </h3>
            <ul className="space-y-4 text-xs font-medium">
              <li className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-green-500 text-[20px] shrink-0">check_circle</span>
                <span className="text-on-surface-variant leading-snug">Reviews must focus on course content, instructor quality, or learning outcomes.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-green-500 text-[20px] shrink-0">check_circle</span>
                <span className="text-on-surface-variant leading-snug">Constructive criticism is allowed and encouraged for transparency.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-error text-[20px] shrink-0">cancel</span>
                <span className="text-on-surface-variant leading-snug">Personal attacks, profanity, or blatant marketing of other services will be rejected.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-error text-[20px] shrink-0">cancel</span>
                <span className="text-on-surface-variant leading-snug">Payment disputes should be handled via the 'Payments' tab, not public reviews.</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-outline-variant/30">
              <button 
                onClick={() => triggerToast('Redirecting to the central institutional moderation policy guide...')}
                className="w-full py-2 text-primary font-bold text-xs border border-primary/20 rounded-lg hover:bg-primary-container/10 transition-colors"
              >
                View Full Policy
              </button>
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="glass-card rounded-xl p-stack-md border border-outline-variant/60 shadow-sm bg-gradient-to-br from-surface to-primary-container/5 space-y-4">
            <h3 className="font-headline-sm text-headline-sm font-bold border-b border-outline-variant/30 pb-2">
              Review Insights
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-xs font-bold uppercase">
                  <span>Positive Sentiment</span>
                  <span className="text-primary">88%</span>
                </div>
                <div className="h-2 w-full bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '88%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-xs font-bold uppercase">
                  <span>Neutral Sentiment</span>
                  <span className="text-tertiary">9%</span>
                </div>
                <div className="h-2 w-full bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container rounded-full transition-all duration-1000" style={{ width: '9%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-xs font-bold uppercase">
                  <span>Negative Sentiment</span>
                  <span className="text-error">3%</span>
                </div>
                <div className="h-2 w-full bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-error rounded-full transition-all duration-1000" style={{ width: '3%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-white/50 rounded-lg border border-outline-variant/50">
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">
                Popular Keywords
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Curriculum', 'Instructor', 'Job Ready', 'Helpful', 'Practical'].map((keyword) => (
                  <span 
                    key={keyword}
                    onClick={() => {
                      setSearchQuery(keyword);
                      triggerToast(`Filtering testimonials for keyword: "${keyword}"`);
                    }}
                    className="px-2.5 py-1 bg-surface-container hover:bg-primary/10 hover:text-primary transition-all rounded-full text-[11px] text-on-surface-variant font-bold cursor-pointer border border-outline-variant/20"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Mini-Feed */}
          <div className="glass-card rounded-xl p-stack-md border border-outline-variant/60 shadow-sm space-y-4">
            <h3 className="font-headline-sm text-headline-sm font-bold border-b border-outline-variant/30 pb-2">
              Moderator Activity
            </h3>
            <div className="space-y-4">
              {moderatorLogs.map((log) => (
                <div key={log.id} className="flex gap-3 items-start">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                    log.iconColor === 'bg-error' ? 'bg-red-500' : log.iconColor === 'bg-tertiary' ? 'bg-blue-600' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="text-body-sm text-on-surface font-bold leading-tight">{log.action}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1 font-semibold uppercase">{log.time} • By {log.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Slide-Up Notification Toast */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

      {/* Modal: Auto-Approve Automation Settings */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => { setIsSettingsOpen(false); document.body.style.overflow = 'auto'; }}></div>
          <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Auto-Approve Testimonials Settings</h3>
              <button 
                className="p-1.5 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={() => { setIsSettingsOpen(false); document.body.style.overflow = 'auto'; }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSettingsSaveSubmit} className="p-stack-md space-y-4">
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/40">
                <div>
                  <h5 className="font-bold text-xs uppercase text-on-surface">Verified Purchases Auto-Publish</h5>
                  <p className="text-[10px] text-on-surface-variant font-light mt-0.5 leading-snug">Automatically approve reviews with verified purchase credentials.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={autoApproveConfig.autoApproveVerified}
                  onChange={(e) => setAutoApproveConfig(prev => ({ ...prev, autoApproveVerified: e.target.checked }))}
                  className="w-10 h-5 rounded-full bg-surface-container-highest checked:bg-primary border-none cursor-pointer focus:ring-0 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">Auto-Approve Ratings Threshold</label>
                <select 
                  value={autoApproveConfig.ratingThreshold}
                  onChange={(e) => setAutoApproveConfig(prev => ({ ...prev, ratingThreshold: parseInt(e.target.value) }))}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer font-bold text-body-sm"
                >
                  <option value="5">Only 5-Star Reviews</option>
                  <option value="4">4-Stars and Above</option>
                  <option value="3">3-Stars and Above</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/40">
                <div>
                  <h5 className="font-bold text-xs uppercase text-on-surface">System AI Spam Filters</h5>
                  <p className="text-[10px] text-on-surface-variant font-light mt-0.5 leading-snug">Enable real-time AI checking of language, excessive punctuation, and spam words.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={autoApproveConfig.spamWordFilter}
                  onChange={(e) => setAutoApproveConfig(prev => ({ ...prev, spamWordFilter: e.target.checked }))}
                  className="w-10 h-5 rounded-full bg-surface-container-highest checked:bg-primary border-none cursor-pointer focus:ring-0 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => { setIsSettingsOpen(false); document.body.style.overflow = 'auto'; }}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/95 transition-shadow shadow-md active:scale-95 duration-100" 
                  type="submit"
                >
                  Apply Rules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Reviews;

