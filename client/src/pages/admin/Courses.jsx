import React, { useState } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Basic Computer Course',
      category: 'Foundation',
      duration: '3 Months',
      description: 'Fundamental training in operating systems, internet usage, and Microsoft Office essentials for beginners.',
      students: 342,
      progressWidth: '85%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnN85QBIH-CMZ6Iqqfaa1DNPUyK_TULuVyM1KlCDlGxzX17Mpwy5h7QgdfA7YJ2R8uBEwXENcffL305rgRDGjB0lmID5bYIb0rF6Hyfaxt3sG5fLm3v1XLTsRsKn9_nv2sano6QE2SuZGq6n3RN_o0IZ0WtK02MVL-Hk8cmmzhalykQ4FBeIwPNC9gPZgRcW4yN7tdG7zJ61zBc0mNsIPYyknuK8dYwNF1XG48X-ekdKuuoLh-F8g7ipTNUrzOj-nN-2fts8WlYDT1',
      tagColor: 'bg-primary/90 text-white'
    },
    {
      id: 2,
      title: 'DCA (Diploma)',
      category: 'Diploma',
      duration: '6 Months',
      description: 'Advanced diploma covering database management, software development basics, and business accounting.',
      students: 518,
      progressWidth: '62%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK4N67LlN3e5K3DjUWTzcYDQ-caU4PBi5538S3tn-ZRjSIA5CcEHaFHZ6cYwiFm7SzHEq4rnsZhUL1_pRRCOGv5FTK7iUkBbgm0YkFjeztijjeT1ckXTxh-AUehZXkVgeSphpO5QRrDCwu6oOiN0qwZ6OSppkJIgYfMZC3Q-b5ncGN8n3i1PD0ZJLGik-dZ5pGXrfATFm6a06MHDM02D63V7HhOGl6-WgoXYupat-1XUgVktBhPAl6zcYJzvuhr48OeYMB7Wfz4nih',
      tagColor: 'bg-tertiary/90 text-white'
    },
    {
      id: 3,
      title: 'PGDCA',
      category: 'Post-Graduate',
      duration: '1 Year',
      description: 'In-depth postgraduate curriculum focusing on system analysis, programming logic, and IT management.',
      students: 214,
      progressWidth: '45%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD2NnvZ7RKmB2032UsgwOx5U2CPAzvvSe3EFhfAwwqeh5gmpYkXUfFKvGxyndjtr8FwD4gOE2aQwGNa4ac_hY5U3j1S1aKLX08xSXTGWGMDv-ySloBAzp-1kVbcyXtuKsQDvIWV7ABJTiQIvIj-6QTTbKOTVxzFMywNJaTgrhUOFn43YFV7zBpHlL3mBOXYTEZsx25eLVPAB2hT60L908RD-FzgIGKJDKZSsRU32gvFPsIPtdhjfN8an9Mymr4-I-JWkU5ML2fd-Ya',
      tagColor: 'bg-on-surface-variant/90 text-white'
    }
  ]);

  const [toast, setToast] = useState({
    visible: false,
    message: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Foundation',
    duration: '3 Months',
    description: '',
    students: 50
  });

  const showToastNotification = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateCourseSubmit = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description) {
      alert('Please fill in all required fields.');
      return;
    }

    let tagColor = 'bg-primary/90 text-white';
    if (newCourse.category === 'Diploma') tagColor = 'bg-tertiary/90 text-white';
    else if (newCourse.category === 'Post-Graduate') tagColor = 'bg-on-surface-variant/90 text-white';

    const createdCourse = {
      id: courses.length + 1,
      title: newCourse.title,
      category: newCourse.category,
      duration: newCourse.duration,
      description: newCourse.description,
      students: parseInt(newCourse.students) || 0,
      progressWidth: '50%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnN85QBIH-CMZ6Iqqfaa1DNPUyK_TULuVyM1KlCDlGxzX17Mpwy5h7QgdfA7YJ2R8uBEwXENcffL305rgRDGjB0lmID5bYIb0rF6Hyfaxt3sG5fLm3v1XLTsRsKn9_nv2sano6QE2SuZGq6n3RN_o0IZ0WtK02MVL-Hk8cmmzhalykQ4FBeIwPNC9gPZgRcW4yN7tdG7zJ61zBc0mNsIPYyknuK8dYwNF1XG48X-ekdKuuoLh-F8g7ipTNUrzOj-nN-2fts8WlYDT1',
      tagColor: tagColor
    };

    setCourses(prev => [...prev, createdCourse]);
    setNewCourse({
      title: '',
      category: 'Foundation',
      duration: '3 Months',
      description: '',
      students: 50
    });
    handleCloseModal();
    showToastNotification('New academic course created successfully.');
  };

  const handleEditDetails = (title) => {
    showToastNotification(`Details updated for ${title} successfully.`);
  };

  const handleDownloadSyllabus = (fileName) => {
    alert(`Downloading syllabus repository resource: ${fileName}...`);
  };

  return (
    <div className="space-y-stack-lg">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 text-left gap-4">
        <div>
          <nav className="flex text-xs text-on-surface-variant mb-2 gap-2 font-medium">
            <span>Academy</span>
            <span>/</span>
            <span className="text-primary font-semibold">Courses Management</span>
          </nav>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">Curriculum Dashboard</h2>
          <p className="text-on-surface-variant mt-2 max-w-2xl font-light">
            Manage your educational offerings, update semester syllabi, and monitor enrollment trends across all certificate and diploma programs.
          </p>
        </div>
        <button 
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:scale-102 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 shrink-0"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Create New Course
        </button>
      </div>

      {/* Stats Overview - Glassmorphism Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-12 text-left">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-primary/10 text-primary rounded-lg material-symbols-outlined">school</span>
            <span className="text-xs font-bold text-green-600">+12% vs LY</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-sm text-label-sm">Total Active Courses</p>
            <h3 className="font-headline-lg text-headline-lg mt-1 font-bold">{courses.length + 21}</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-tertiary/10 text-tertiary rounded-lg material-symbols-outlined">group</span>
            <span className="text-xs font-bold text-on-surface-variant">Live Students</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-sm text-label-sm">Total Enrollments</p>
            <h3 className="font-headline-lg text-headline-lg mt-1 font-bold">1,482</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-secondary-container/50 text-on-secondary-container rounded-lg material-symbols-outlined">pending_actions</span>
            <span className="text-xs font-bold text-error">4 Updates Due</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-sm text-label-sm">Syllabus Revisions</p>
            <h3 className="font-headline-lg text-headline-lg mt-1 font-bold">08</h3>
          </div>
        </div>
        
        <div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg shadow-primary/10 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-white/20 text-white rounded-lg material-symbols-outlined">trending_up</span>
          </div>
          <div className="mt-4">
            <p className="text-white/80 font-label-sm text-label-sm">Revenue Potential</p>
            <h3 className="font-headline-lg text-headline-lg mt-1 font-bold">$42.8k</h3>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[450px]"
          >
            <div className="h-40 relative overflow-hidden shrink-0">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={course.title}
                src={course.image}
              />
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${course.tagColor}`}>
                {course.category}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h4 className="font-headline-sm text-headline-sm font-semibold leading-tight">{course.title}</h4>
                  <span className="text-xs bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-md shrink-0 font-bold">{course.duration}</span>
                </div>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-6 font-light">{course.description}</p>
              </div>

              <div className="space-y-3 shrink-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant font-light">Active Students</span>
                  <span className="font-bold">{course.students} Students</span>
                </div>
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: course.progressWidth }}></div>
                </div>
              </div>

              <div className="mt-8 flex gap-2 shrink-0">
                <button 
                  onClick={() => handleEditDetails(course.title)}
                  className="flex-1 py-2.5 bg-secondary-container text-on-secondary-container rounded-lg font-label-md text-label-md hover:bg-primary hover:text-white transition-all font-bold active:scale-95 duration-100"
                >
                  Edit Details
                </button>
                <button className="px-4 py-2.5 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm" data-icon="more_vert">more_vert</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Syllabus Management Section */}
      <div className="mt-16 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/50 text-left">
        <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold">Quick Syllabus Access</h3>
            <p className="text-on-surface-variant font-body-sm text-body-sm">Review and update semester modules for active programs.</p>
          </div>
          <button 
            onClick={() => alert('Opening central curriculum repository directory...')}
            className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline font-bold"
          >
            View All Repository
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="space-y-4">
          
          {/* Syllabus Row 1 */}
          <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-tertiary-container/30 flex items-center justify-center text-on-tertiary-container flex-shrink-0">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div>
                <h5 className="font-bold text-on-surface leading-snug">DCA_Semester_01_Python_Basics.pdf</h5>
                <p className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter mt-0.5">Updated 2 days ago • 4.2 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2.5 py-1 rounded-full font-bold">DRAFT</span>
              <button 
                onClick={() => handleEditDetails('DCA Python Basics Syllabus')}
                className="p-2 text-on-surface-variant group-hover:text-primary transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">edit_note</span>
              </button>
              <button 
                onClick={() => handleDownloadSyllabus('DCA_Semester_01_Python_Basics.pdf')}
                className="p-2 text-on-surface-variant group-hover:text-primary transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>

          {/* Syllabus Row 2 */}
          <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-primary-container/30 flex items-center justify-center text-on-primary-container flex-shrink-0">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div>
                <h5 className="font-bold text-on-surface leading-snug">PGDCA_Core_Database_Systems_V2.pdf</h5>
                <p className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter mt-0.5">Updated 1 week ago • 12.8 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-700 text-[10px] px-2.5 py-1 rounded-full font-bold">PUBLISHED</span>
              <button 
                onClick={() => handleEditDetails('PGDCA Database Systems Syllabus')}
                className="p-2 text-on-surface-variant group-hover:text-primary transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">edit_note</span>
              </button>
              <button 
                onClick={() => handleDownloadSyllabus('PGDCA_Core_Database_Systems_V2.pdf')}
                className="p-2 text-on-surface-variant group-hover:text-primary transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Feedback Area (Toast System) */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

      {/* Modal: Create New Course */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low text-left">
              <h3 className="font-headline-sm text-headline-sm">Create New Academic Course</h3>
              <button 
                className="p-2 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateCourseSubmit} className="p-stack-md space-y-4 text-left">
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Course Name / Title</label>
                <input 
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                  placeholder="e.g. Graphic Design Pro" 
                  type="text"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Category</label>
                  <select 
                    name="category"
                    value={newCourse.category}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                  >
                    <option value="Foundation">Foundation</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Post-Graduate">Post-Graduate</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Duration</label>
                  <select 
                    name="duration"
                    value={newCourse.duration}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                  >
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Initial Enrollees Count</label>
                  <input 
                    name="students"
                    value={newCourse.students}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    type="number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Brief Curriculum Overview</label>
                <textarea 
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                  placeholder="Summarize course content and syllabus outline..."
                  rows="3"
                  required
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={handleCloseModal} 
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-shadow shadow-md active:scale-95" 
                  type="submit"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Courses;
