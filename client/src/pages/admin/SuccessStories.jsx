import React, { useState, useEffect } from 'react';
import {
  getSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory
} from '../../services/successStoryService';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null); // null = Add, non-null = Edit
  const [previewVideo, setPreviewVideo] = useState(null); // stores video URL for embed player modal
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Form state
  const [formData, setFormData] = useState({
    studentName: '',
    title: '',
    description: '',
    youtubeUrl: '',
    thumbnail: '',
    status: true
  });

  const fetchStories = async () => {
    try {
      setLoading(true);
      const data = await getSuccessStories();
      setStories(data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch success stories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleOpenAddModal = () => {
    setEditingStory(null);
    setFormData({
      studentName: '',
      title: '',
      description: '',
      youtubeUrl: '',
      thumbnail: '',
      status: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (story) => {
    setEditingStory(story);
    setFormData({
      studentName: story.studentName,
      title: story.title,
      description: story.description,
      youtubeUrl: story.youtubeUrl,
      thumbnail: story.thumbnail || '',
      status: story.status
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const ytId = getYouTubeId(formData.youtubeUrl);
    if (!ytId) {
      alert('Please enter a valid YouTube video link.');
      return;
    }

    try {
      if (editingStory) {
        await updateSuccessStory(editingStory._id, formData);
        triggerToast('Success story updated successfully!', 'success');
      } else {
        await createSuccessStory(formData);
        triggerToast('Success story added successfully!', 'success');
      }
      setIsModalOpen(false);
      fetchStories();
    } catch (err) {
      console.error(err);
      triggerToast('Error saving success story.', 'error');
    }
  };

  const handleDeleteClick = async (story) => {
    if (window.confirm(`Are you sure you want to permanently delete ${story.studentName}'s success story?`)) {
      try {
        await deleteSuccessStory(story._id);
        triggerToast('Success story deleted successfully!', 'success');
        fetchStories();
      } catch (err) {
        console.error(err);
        triggerToast('Failed to delete success story.', 'error');
      }
    }
  };

  const handleToggleStatus = async (story) => {
    try {
      const updated = await updateSuccessStory(story._id, { status: !story.status });
      triggerToast(`Story is now ${updated.status ? 'Active' : 'Inactive'}`, 'success');
      fetchStories();
    } catch (err) {
      console.error(err);
      triggerToast('Failed to toggle status.', 'error');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'ST';
    return name.split(' ').map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2);
  };

  if (loading && stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Syncing student success stories...</p>
      </div>
    );
  }

  const activeCount = stories.filter(s => s.status).length;
  const inactiveCount = stories.length - activeCount;

  return (
    <div className="space-y-stack-lg text-left">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Success Stories Management</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Manage video testimonials and student success stories running on the public reviews page.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md active:scale-95 duration-100 flex items-center gap-2 hover:opacity-90 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add</span> Add Success Story
        </button>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <span className="p-3 bg-primary/10 text-primary rounded-lg material-symbols-outlined text-3xl">play_circle</span>
          <div>
            <p className="text-on-surface-variant text-xs uppercase font-semibold tracking-wider">Total Video Stories</p>
            <h3 className="font-headline-lg text-headline-lg font-bold mt-0.5">{stories.length}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <span className="p-3 bg-success/10 text-success rounded-lg material-symbols-outlined text-3xl">check_circle</span>
          <div>
            <p className="text-on-surface-variant text-xs uppercase font-semibold tracking-wider">Active on Website</p>
            <h3 className="font-headline-lg text-headline-lg font-bold text-success mt-0.5">{activeCount}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <span className="p-3 bg-error/10 text-error rounded-lg material-symbols-outlined text-3xl">cancel</span>
          <div>
            <p className="text-on-surface-variant text-xs uppercase font-semibold tracking-wider">Inactive Stories</p>
            <h3 className="font-headline-lg text-headline-lg font-bold text-error mt-0.5">{inactiveCount}</h3>
          </div>
        </div>
      </div>

      {/* Grid of Stories */}
      {stories.length === 0 ? (
        <div className="py-16 text-center bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-2">video_library</span>
          <p className="text-on-surface-variant font-body-lg">No success stories found. Click "Add Success Story" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-8">
          {stories.map((story) => {
            const ytId = getYouTubeId(story.youtubeUrl);
            const thumbUrl = story.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '');
            
            return (
              <div
                key={story._id}
                className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Thumbnail Preview wrapper */}
                <div className="relative aspect-video bg-black flex-shrink-0 group">
                  {thumbUrl ? (
                    <img
                      src={thumbUrl}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-on-surface-variant/40">
                      <span className="material-symbols-outlined text-5xl">video_library</span>
                    </div>
                  )}
                  {ytId && (
                    <button
                      onClick={() => setPreviewVideo(`https://www.youtube.com/embed/${ytId}`)}
                      className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-white text-5xl hover:scale-110 transition-transform">play_circle</span>
                    </button>
                  )}
                  <span className={`absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    story.status ? 'bg-success-container text-on-success-container' : 'bg-error-container text-on-error-container'
                  }`}>
                    {story.status ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Details Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                        {getInitials(story.studentName)}
                      </div>
                      <div>
                        <h4 className="font-label-md text-on-surface font-bold leading-none">{story.studentName}</h4>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">Student Reviewer</p>
                      </div>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1 pt-1">{story.title}</h3>
                    <p className="text-body-md text-on-surface-variant font-light line-clamp-3 leading-relaxed">{story.description}</p>
                  </div>

                  {/* Action controls */}
                  <div className="flex gap-2 pt-5 mt-auto border-t border-outline-variant/30 items-center justify-between">
                    <button
                      onClick={() => handleToggleStatus(story)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        story.status
                          ? 'bg-success-container/20 text-success hover:bg-success-container/40'
                          : 'bg-error-container/20 text-error hover:bg-error-container/40'
                      }`}
                    >
                      {story.status ? 'Disable' : 'Enable'}
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(story)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg flex items-center justify-center"
                        title="Edit Success Story"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(story)}
                        className="p-2 text-outline hover:text-error hover:bg-error-container/10 rounded-lg flex items-center justify-center"
                        title="Delete Success Story"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-xl overflow-hidden shadow-xl relative max-h-[90vh] flex flex-col text-left">
            <header className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {editingStory ? 'Edit Success Story' : 'Add Success Story'}
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
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Title / Heading</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Meera's Journey to Frontend Developer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">YouTube Video URL</label>
                  <input
                    type="text"
                    required
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                    className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="true">Active (Show on Site)</option>
                    <option value="false">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Thumbnail URL (Optional)</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. https://domain.com/image.jpg (leave blank to auto-generate from YouTube)"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Write details about the success story/experience..."
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
                  {editingStory ? 'Save Changes' : 'Create Success Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal Player (Preview) */}
      {previewVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-3xl overflow-hidden shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 flex items-center justify-center z-10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="aspect-video bg-black flex items-center justify-center">
              <iframe
                title="Success Story Preview"
                className="w-full h-full"
                src={previewVideo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast Popup */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-lg font-label-md flex items-center space-x-3 border border-outline-variant/30 animate-slide-up">
          <span className="material-symbols-outlined text-success">check_circle</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
