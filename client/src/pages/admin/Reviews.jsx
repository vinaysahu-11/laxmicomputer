import React, { useState, useEffect } from 'react';
import { getReviews, createReview, updateReview, deleteReview } from '../../services/reviewService';

const Reviews = () => {
  // 1. State Data for Student Reviews
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Moderator Logs state
  const [moderatorLogs, setModeratorLogs] = useState([
    { id: 'log-1', action: 'System status synced with MongoDB', time: 'Just now', author: 'System', iconColor: 'bg-primary' }
  ]);

  // Add/Edit review modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    rating: 5,
    reviewText: '',
    studentPhoto: '',
    videoUrl: '',
    status: 'Pending'
  });

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
  const [visibleCount, setVisibleCount] = useState(6);

  const fetchReviewsData = async () => {
    try {
      setLoading(true);
      const data = await getReviews(true); // Fetch all reviews (Approved, Pending, Flagged, Archived)
      
      const mapped = data.map(r => {
        // Map avatars or default initials
        const avatar = r.studentPhoto || `https://lh3.googleusercontent.com/aida-public/AB6AXuCUfA65JV4uzymI372Wkby0p4JnhM47dR4uPAOE7DTW0UAtfv-KAiblVuTdjLsXlBKnvJ4FLitgu2Dc3dQicrJ9Ra5F67w0p_sT9Du0_-bUS_zz0QihITjQp3Qfq1q1xf1gAoDBnYaORJQEOx-DDA72uh1M0pfMnc0FHTTCf-zbDXhV854T2wGTEbSpgna5cg-o8v5D7SkVkVBa4HK4KHbbserkoTIngCnHclthdHy4-f1OkHNOI8gc4VaLeM3H8_YBUCH5pgE3M-qH`;
        return {
          id: r._id,
          _id: r._id,
          studentName: r.studentName,
          course: r.courseName,
          time: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          rating: r.rating,
          avatar,
          feedback: r.reviewText,
          status: r.status,
          videoUrl: r.videoUrl || '',
          verified: true
        };
      });

      setReviewsList(mapped);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch student reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsData();
  }, []);

  const handleAddReviewClick = () => {
    setEditingReview(null);
    setFormData({
      studentName: '',
      courseName: '',
      rating: 5,
      reviewText: '',
      studentPhoto: '',
      videoUrl: '',
      status: 'Pending'
    });
    setIsModalOpen(true);
  };

  const handleEditReviewClick = (rev) => {
    setEditingReview(rev);
    setFormData({
      studentName: rev.studentName,
      courseName: rev.course || '',
      rating: rev.rating || 5,
      reviewText: rev.feedback || '',
      studentPhoto: rev.avatar && !rev.avatar.startsWith('https://lh3.googleusercontent.com') ? rev.avatar : '',
      videoUrl: rev.videoUrl || '',
      status: rev.status || 'Pending'
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await updateReview(editingReview._id, formData);
        triggerToast(`Review for ${formData.studentName} updated successfully!`, 'success');
        
        const newLog = {
          id: `log-${Date.now()}`,
          action: `Edited review of "${formData.studentName}"`,
          time: 'Just now',
          author: 'Super Admin',
          iconColor: 'bg-primary'
        };
        setModeratorLogs(prev => [newLog, ...prev]);
      } else {
        await createReview(formData);
        triggerToast(`Review for ${formData.studentName} created successfully!`, 'success');
        
        const newLog = {
          id: `log-${Date.now()}`,
          action: `Created review for "${formData.studentName}"`,
          time: 'Just now',
          author: 'Super Admin',
          iconColor: 'bg-primary'
        };
        setModeratorLogs(prev => [newLog, ...prev]);
      }
      setIsModalOpen(false);
      fetchReviewsData();
    } catch (err) {
      console.error(err);
      alert('Error saving review data.');
    }
  };

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleApproveReview = async (review) => {
    try {
      await updateReview(review._id, { status: 'Approved' });
      
      const newLog = {
        id: `log-${Date.now()}`,
        action: `Approved "${review.studentName}'s review"`,
        time: 'Just now',
        author: 'Super Admin',
        iconColor: 'bg-primary'
      };
      setModeratorLogs(prev => [newLog, ...prev]);
      
      triggerToast(`Testimonial from ${review.studentName} approved for public website!`, 'success');
      fetchReviewsData();
    } catch (err) {
      alert('Error approving review.');
    }
  };

  const handleRejectReview = async (review) => {
    try {
      await updateReview(review._id, { status: 'Archived' });
      
      const newLog = {
        id: `log-${Date.now()}`,
        action: `Archived "${review.studentName}'s review"`,
        time: 'Just now',
        author: 'Super Admin',
        iconColor: 'bg-error'
      };
      setModeratorLogs(prev => [newLog, ...prev]);
      
      triggerToast(`Review from ${review.studentName} archived.`, 'info');
      fetchReviewsData();
    } catch (err) {
      alert('Error archiving review.');
    }
  };

  const handleFlagReview = async (review) => {
    try {
      await updateReview(review._id, { status: 'Flagged' });
      
      const newLog = {
        id: `log-${Date.now()}`,
        action: `Flagged "${review.studentName}'s review"`,
        time: 'Just now',
        author: 'Super Admin',
        iconColor: 'bg-tertiary'
      };
      setModeratorLogs(prev => [newLog, ...prev]);
      
      triggerToast(`Review from ${review.studentName} has been flagged.`, 'warning');
      fetchReviewsData();
    } catch (err) {
      alert('Error flagging review.');
    }
  };

  const handleDeleteReviewClick = async (review) => {
    if (window.confirm(`Are you sure you want to permanently delete review from ${review.studentName}?`)) {
      try {
        await deleteReview(review._id);
        
        const newLog = {
          id: `log-${Date.now()}`,
          action: `Deleted "${review.studentName}'s review"`,
          time: 'Just now',
          author: 'Super Admin',
          iconColor: 'bg-error'
        };
        setModeratorLogs(prev => [newLog, ...prev]);
        
        triggerToast(`Review removed successfully.`, 'error');
        fetchReviewsData();
      } catch (err) {
        alert('Error deleting review.');
      }
    }
  };

  const getFilteredReviews = () => {
    return reviewsList.filter(rev => {
      // 1. Status Filter
      if (selectedStatus !== 'All Reviews') {
        if (rev.status !== selectedStatus) return false;
      }
      // 2. Rating Filter
      if (selectedRating !== null) {
        if (rev.rating !== selectedRating) return false;
      }
      // 3. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = rev.studentName.toLowerCase().includes(query);
        const matchesFeedback = rev.feedback.toLowerCase().includes(query);
        const matchesCourse = rev.course.toLowerCase().includes(query);
        if (!matchesName && !matchesFeedback && !matchesCourse) return false;
      }
      return true;
    });
  };

  const filteredReviews = getFilteredReviews();

  if (loading && reviewsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading student testimonials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Testimonials Moderation</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Audit, approve, and curate user feedback displaying on the public home page.</p>
        </div>
        <button
          onClick={handleAddReviewClick}
          className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md active:scale-95 duration-100 flex items-center gap-2 hover:opacity-90 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add</span> Add Review
        </button>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Left Column: Metrics & Moderation Controls */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          
          {/* Metrics Bento Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <span className="p-3 bg-primary-container text-primary rounded-lg material-symbols-outlined">rate_review</span>
              <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                MongoDB Live
              </span>
            </div>
            <div className="mt-4">
              <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">Total Testimonials</p>
              <h3 className="font-headline-xl text-headline-xl text-primary font-bold leading-none mt-1">{reviewsList.length}</h3>
              <p className="text-xs text-on-surface-variant mt-2 font-medium">
                {reviewsList.filter(r => r.status === 'Approved').length} Approved • {reviewsList.filter(r => r.status === 'Pending').length} Pending
              </p>
            </div>
          </div>

          {/* Filtering Widgets Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-6">
            <h4 className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Moderation Filter</h4>
            
            <div className="space-y-2">
              {['All Reviews', 'Approved', 'Pending', 'Flagged', 'Archived'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`w-full flex justify-between items-center px-4 py-2.5 rounded-lg text-body-sm font-medium transition-all ${
                    (selectedStatus === status)
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                      : 'hover:bg-surface-container text-on-surface-variant font-light'
                  }`}
                >
                  <span>{status}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedStatus === status ? 'bg-primary text-on-primary' : 'bg-surface-container-high'
                  }`}>
                    {status === 'All Reviews' ? reviewsList.length : reviewsList.filter(r => r.status === status).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-outline-variant">
              <h5 className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase mb-3 tracking-wider">Rating Score</h5>
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => setSelectedRating(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedRating === null ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high'}`}
                >
                  All Stars
                </button>
                {[5, 4, 3, 2, 1].map(stars => (
                  <button
                    key={stars}
                    onClick={() => setSelectedRating(stars)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${selectedRating === stars ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high'}`}
                  >
                    {stars} <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Reviews Moderation Inbox */}
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-between">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col justify-between">
            <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Moderation Queue</h3>
              
              <div className="relative w-full md:w-72">
                <span className="absolute left-3 top-2.5 text-on-surface-variant material-symbols-outlined text-base">search</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviewer or course..." 
                  className="w-full pl-9 pr-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[500px]">
              {filteredReviews.slice(0, visibleCount).map((rev) => (
                <div key={rev.id} className="p-5 rounded-xl border border-outline-variant/60 bg-surface-container-lowest hover:border-primary/40 transition-all flex flex-col md:flex-row gap-4 justify-between items-start text-left">
                  
                  {/* Avatar & Content details */}
                  <div className="flex gap-4 items-start">
                    <img className="w-12 h-12 object-cover rounded-full border border-outline-variant shadow-sm flex-shrink-0" src={rev.avatar} alt={rev.studentName} />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-label-md text-on-surface font-bold leading-none">{rev.studentName}</h4>
                        {rev.verified && <span className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5">Verified Student</span>}
                      </div>
                      <p className="text-[11px] text-on-surface-variant">{rev.course} • {rev.time}</p>
                      
                      {/* Star Rating display */}
                      <div className="flex text-yellow-500 py-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: s <= rev.rating ? "'FILL' 1" : "'FILL' 0" }}>
                            star
                          </span>
                        ))}
                      </div>

                      <p className="text-body-md text-on-surface font-light leading-relaxed pt-2">"{rev.feedback}"</p>
                      
                      {rev.videoUrl && (
                        <div className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded font-semibold mt-1">
                          <span className="material-symbols-outlined text-sm">play_circle</span> YouTube Video: {rev.videoUrl}
                        </div>
                      )}
                      
                      {rev.status === 'Flagged' && (
                        <div className="mt-4 p-3 bg-error-container/20 rounded-lg text-error text-xs border border-error/10 font-bold flex items-start gap-2">
                          <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">warning</span>
                          <span>Spam check review flagged for safety parameters.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/30">
                    {rev.status !== 'Approved' && (
                      <button 
                        onClick={() => handleApproveReview(rev)}
                        className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-xs font-bold shadow-sm active:scale-95 duration-100 flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">check</span> Approve
                      </button>
                    )}
                    {rev.status !== 'Archived' && (
                      <button 
                        onClick={() => handleRejectReview(rev)}
                        className="flex-1 px-4 py-2 border border-outline-variant text-on-surface-variant hover:bg-surface-container rounded-lg font-label-sm text-xs font-bold active:scale-95 duration-100 flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">archive</span> Archive
                      </button>
                    )}
                    {rev.status !== 'Flagged' && rev.status !== 'Approved' && (
                      <button 
                        onClick={() => handleFlagReview(rev)}
                        className="flex-1 px-4 py-2 hover:bg-surface-container text-warning rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">flag</span> Flag
                      </button>
                    )}
                    <button 
                      onClick={() => handleEditReviewClick(rev)}
                      className="flex-1 px-4 py-2 bg-secondary text-on-secondary rounded-lg font-label-sm text-xs font-bold shadow-sm active:scale-95 duration-100 flex items-center justify-center gap-1.5 hover:opacity-90"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteReviewClick(rev)}
                      className="px-2.5 py-2 text-outline hover:text-error hover:bg-error-container/10 rounded-lg flex items-center justify-center transition-colors"
                      title="Permanently Delete Review"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                </div>
              ))}

              {filteredReviews.length === 0 && (
                <div className="py-16 text-center text-on-surface-variant font-light italic">
                  No review testimonials matched the selected filter criteria.
                </div>
              )}
            </div>

            {/* Load More Button */}
            {filteredReviews.length > visibleCount && (
              <div className="p-4 bg-surface-container-low flex justify-center border-t border-outline-variant/30 shrink-0">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 4)}
                  className="text-primary font-label-md flex items-center hover:underline font-bold text-sm"
                >
                  Load More Testimonials
                  <span className="material-symbols-outlined ml-1">expand_more</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Popover Background Blocker / Settings toggle */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsSettingsOpen(false)} />
      )}

      {/* Floating Action / Audit logs card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden text-left mt-8">
        <div className="px-stack-md py-4 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm font-bold">Moderation History Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface border-b border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Action Details</th>
                <th className="px-6 py-4">Managed By</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant font-light">
              {moderatorLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-container transition-all">
                  <td className="px-6 py-4 flex items-center">
                    <span className={`w-2.5 h-2.5 rounded-full mr-3 shrink-0 ${log.iconColor}`}></span>
                    <span className="font-medium text-on-surface">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{log.author}</td>
                  <td className="px-6 py-4 text-right text-on-surface-variant font-bold text-xs uppercase">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast popup */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-lg font-label-md flex items-center space-x-3 border border-outline-variant/30 animate-slide-up">
          <span className="material-symbols-outlined text-success">check_circle</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-xl overflow-hidden shadow-xl relative max-h-[90vh] flex flex-col text-left">
            <header className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface material-symbols-outlined"
              >
                close
              </button>
            </header>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Student Name</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Meera"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Course Name</label>
                  <input
                    type="text"
                    required
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Web Development"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {['Approved', 'Pending', 'Flagged', 'Archived'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Student Photo URL (Optional)</label>
                <input
                  type="text"
                  value={formData.studentPhoto}
                  onChange={(e) => setFormData({ ...formData, studentPhoto: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. https://domain.com/photo.jpg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">YouTube Video URL (Optional)</label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                />
                <p className="text-[10px] text-on-surface-variant">Provide a YouTube link to make this a video review (Student Success Story).</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Review / Success Story Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Describe the student's journey or review..."
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface-variant hover:bg-surface-container rounded-lg font-label-sm text-xs font-bold active:scale-95 duration-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-xs font-bold shadow-sm active:scale-95 duration-100 hover:opacity-90"
                >
                  {editingReview ? 'Save Changes' : 'Create Review'}
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
