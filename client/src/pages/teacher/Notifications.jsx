import React, { useState } from 'react';

const Notifications = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: 'Spring Mid-Term Exams Schedule Declared', category: 'Exam', date: 'Today at 10:30 AM', sender: 'Academic Administration', priority: 'high', content: 'The comprehensive timetable for Spring Semester Mid-Terms has been released. Classroom allocations and proctor guidelines have been synchronized across panels.' },
    { id: 2, title: 'Maintenance Window: Lab Servers Offline', category: 'Facility', date: 'Yesterday at 04:00 PM', sender: 'IT Department', priority: 'medium', content: 'Innovation Laboratory servers will undergo security updates on Saturday from 12:00 AM to 04:00 AM. Access credentials may be temporarily delayed.' },
    { id: 3, title: 'Syllabus Review Meeting scheduled tomorrow', category: 'Academic', date: 'June 01, 2026', sender: 'Dean Office', priority: 'low', content: 'All senior computer science lecturers are requested to join the curriculum check review in Room 201 at 11:00 AM.' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Academic');
  const [isPosting, setIsPosting] = useState(false);

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const notice = {
      id: notices.length + 1,
      title: newTitle,
      category: newCategory,
      date: 'Just now',
      sender: 'Dr. Sarah Jenkins (You)',
      priority: 'medium',
      content: newContent
    };

    setNotices([notice, ...notices]);
    setNewTitle('');
    setNewContent('');
    setIsPosting(false);
    alert('Notice published successfully to the student Notice Board!');
  };

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-gutter border-b border-outline-variant/20 pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-1">Notice Board &amp; Notifications</h2>
          <p className="font-body-md text-on-surface-variant">Review announcements, coordinate critical academic notifications, and publish posts.</p>
        </div>
        <button 
          onClick={() => setIsPosting(!isPosting)}
          className="bg-primary text-on-primary px-stack-lg py-3 rounded-lg font-label-md hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none outline-none font-bold"
        >
          {isPosting ? 'View Notices' : 'Publish Announcement'}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {isPosting ? (
          /* Post Announcement Form */
          <div className="col-span-12 max-w-2xl">
            <div className="glass-card rounded-xl p-stack-lg shadow-sm">
              <h3 className="font-headline-sm text-headline-sm mb-4">Publish Announcement</h3>
              <form onSubmit={handlePostNotice} className="space-y-gutter">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Notice Title</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Lab Session Rescheduled"
                    className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Exam">Exam</option>
                      <option value="Facility">Facility</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Notice Message</label>
                  <textarea 
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Write detailed announcements for students..."
                    rows="5"
                    className="w-full p-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none font-light"
                    required
                  />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsPosting(false)}
                    className="bg-surface-container text-on-surface px-6 py-3 rounded-lg font-label-md hover:bg-surface-container-high transition-all cursor-pointer border border-outline-variant"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all hover:scale-[1.02] cursor-pointer border-none"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Notices Log Grid */
          <div className="col-span-12 space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className="glass-card rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow relative border-l-4 border-l-primary text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full select-none">{notice.category}</span>
                    <h3 className="font-headline-sm text-base font-bold text-on-surface">{notice.title}</h3>
                  </div>
                  <span className="text-xs text-on-surface-variant font-light">{notice.date}</span>
                </div>
                <p className="font-body-md text-sm text-on-surface-variant font-light leading-relaxed mb-4">{notice.content}</p>
                <div className="flex items-center gap-2 border-t border-outline-variant/10 pt-3 text-[11px] text-on-surface-variant font-semibold">
                  <span className="material-symbols-outlined text-sm font-bold">person</span>
                  <span>Issued By: {notice.sender}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Notifications;
