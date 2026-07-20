import React, { useState, useEffect } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../services/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [toast, setToast] = useState({
    visible: false,
    message: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Diploma',
    duration: '3 Months',
    description: '',
    price: '1500',
    mode: 'offline',
    instructor: 'Prof. Rajesh Kumar',
    status: 'active',
    featured: false
  });

  const [editingCourse, setEditingCourse] = useState({
    _id: '',
    title: '',
    category: 'Diploma',
    duration: '3 Months',
    description: '',
    price: '1500',
    mode: 'offline',
    instructor: 'Prof. Rajesh Kumar',
    status: 'active',
    featured: false
  });

  const fetchCoursesData = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch courses directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

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

  const handleOpenEditModal = (course) => {
    setEditingCourse({
      _id: course._id,
      title: course.title,
      category: course.category || 'Diploma',
      duration: course.duration || '3 Months',
      description: course.description || '',
      price: course.price ? course.price.toString() : '1500',
      mode: course.mode || 'offline',
      instructor: course.instructor || 'Prof. Rajesh Kumar',
      status: course.status || 'active',
      featured: course.featured || false
    });
    setIsEditModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingCourse(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateCourseSubmit = async (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await createCourse({
        ...newCourse,
        price: Number(newCourse.price)
      });
      fetchCoursesData();
      setNewCourse({
        title: '',
        category: 'Diploma',
        duration: '3 Months',
        description: '',
        price: '1500',
        mode: 'offline',
        instructor: 'Prof. Rajesh Kumar',
        status: 'active',
        featured: false
      });
      handleCloseModal();
      showToastNotification('New academic course created successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating course.');
    }
  };

  const handleUpdateCourseSubmit = async (e) => {
    e.preventDefault();
    if (!editingCourse.title || !editingCourse.description) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await updateCourse(editingCourse._id, {
        ...editingCourse,
        price: Number(editingCourse.price)
      });
      fetchCoursesData();
      handleCloseEditModal();
      showToastNotification('Course details updated successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating course.');
    }
  };

  const handleDeleteCourse = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove ${title} from the curriculum catalog?`)) {
      try {
        await deleteCourse(id);
        fetchCoursesData();
        showToastNotification('Course removed from catalogue.');
      } catch (err) {
        alert('Error deleting course.');
      }
    }
  };

  const handleDownloadSyllabus = (fileName) => {
    alert(`Downloading syllabus repository resource: ${fileName}...`);
  };

  if (loading && courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading course catalog...</p>
      </div>
    );
  }

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
            Manage your educational offerings, update syllabi, and monitor catalog active courses.
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-12 text-left">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-primary/10 text-primary rounded-lg material-symbols-outlined">school</span>
            <span className="text-xs font-bold text-green-600">Active</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-sm text-label-sm">Total Active Courses</p>
            <h3 className="font-headline-lg text-headline-lg mt-1 font-bold">{courses.length}</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-tertiary/10 text-tertiary rounded-lg material-symbols-outlined">group</span>
            <span className="text-xs font-bold text-on-surface-variant">Live</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-sm text-label-sm">Seeded Curriculum</p>
            <h3 className="font-headline-lg text-headline-lg mt-1 font-bold">{courses.filter(c => c.featured).length} Featured</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-secondary-container/50 text-on-secondary-container rounded-lg material-symbols-outlined">pending_actions</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-sm text-label-sm">Modes Configured</p>
            <h3 className="font-headline-lg text-headline-lg mt-1 font-bold">Hybrid / Offline</h3>
          </div>
        </div>
        
        <div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg shadow-primary/10 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-white/20 text-white rounded-lg material-symbols-outlined">trending_up</span>
          </div>
          <div className="mt-4">
            <p className="text-white/80 font-label-sm text-label-sm">Catalog Status</p>
            <h3 className="font-headline-lg text-headline-lg mt-1 font-bold">Dynamic DB</h3>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {courses.map((course) => {
          let tagColor = 'bg-primary/90 text-white';
          if (course.category === 'Diploma') tagColor = 'bg-tertiary/90 text-white';
          else if (course.category === 'Accounting') tagColor = 'bg-on-surface-variant/90 text-white';

          return (
            <div 
              key={course._id}
              className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[480px] relative"
            >
              <button 
                onClick={() => handleDeleteCourse(course._id, course.title)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-error hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-md border border-outline-variant/30"
                title="Delete Course"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>

              <div className="h-40 relative overflow-hidden shrink-0">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={course.title}
                  src={course.thumbnail || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnN85QBIH-CMZ6Iqqfaa1DNPUyK_TULuVyM1KlCDlGxzX17Mpwy5h7QgdfA7YJ2R8uBEwXENcffL305rgRDGjB0lmID5bYIb0rF6Hyfaxt3sG5fLm3v1XLTsRsKn9_nv2sano6QE2SuZGq6n3RN_o0IZ0WtK02MVL-Hk8cmmzhalykQ4FBeIwPNC9gPZgRcW4yN7tdG7zJ61zBc0mNsIPYyknuK8dYwNF1XG48X-ekdKuuoLh-F8g7ipTNUrzOj-nN-2fts8WlYDT1'}
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${tagColor}`}>
                  {course.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h4 className="font-headline-sm text-headline-sm font-semibold leading-tight">{course.title}</h4>
                    <span className="text-xs bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-md shrink-0 font-bold">{course.duration}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm line-clamp-3 mb-6 font-light">{course.description}</p>
                </div>

                <div className="space-y-3 shrink-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant font-light">Class Mode: <b className="text-on-surface font-semibold capitalize">{course.mode}</b></span>
                    <span className="font-bold text-primary">₹{course.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-outline">
                    <span>Instructor: {course.instructor || 'Staff'}</span>
                    {course.featured && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold text-[10px]">Featured</span>}
                  </div>
                </div>

                <div className="mt-6 flex gap-2 shrink-0">
                  <button 
                    onClick={() => handleOpenEditModal(course)}
                    className="flex-1 py-2.5 bg-secondary-container text-on-secondary-container rounded-lg font-label-md text-label-md hover:bg-primary hover:text-white transition-all font-bold active:scale-95 duration-100"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Syllabus Management Section */}
      <div className="mt-16 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/50 text-left">
        <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold">Quick Syllabus Access</h3>
            <p className="text-on-surface-variant font-body-sm text-body-sm">Review and update modules for active programs.</p>
          </div>
        </div>

        <div className="space-y-4">
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
                onClick={() => handleDownloadSyllabus('DCA_Semester_01_Python_Basics.pdf')}
                className="p-2 text-on-surface-variant group-hover:text-primary transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>

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
              <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2.5 py-1 rounded-full font-bold">RELEASED</span>
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

      {/* Modal: Create New Course */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low text-left">
              <h3 className="font-headline-sm text-headline-sm font-semibold">Publish New Academy Course</h3>
              <button className="p-2 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" onClick={handleCloseModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateCourseSubmit} className="p-6 space-y-4 text-left">
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase">Course Title *</label>
                <input 
                  name="title" 
                  type="text" 
                  required 
                  value={newCourse.title} 
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  placeholder="e.g. Full Stack Web Development"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Category</label>
                  <select 
                    name="category" 
                    value={newCourse.category} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  >
                    <option value="Diploma">Diploma</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Coding">Coding</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Duration</label>
                  <input 
                    name="duration" 
                    type="text" 
                    value={newCourse.duration} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                    placeholder="e.g. 3 Months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Price (INR) *</label>
                  <input 
                    name="price" 
                    type="number" 
                    required 
                    value={newCourse.price} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Mode</label>
                  <select 
                    name="mode" 
                    value={newCourse.mode} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Instructor</label>
                  <input 
                    name="instructor" 
                    type="text" 
                    value={newCourse.instructor} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase">Description *</label>
                <textarea 
                  name="description" 
                  rows="3" 
                  required 
                  value={newCourse.description} 
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  placeholder="Summarize course curriculum details..."
                />
              </div>

              <div className="flex items-center gap-4 py-2">
                <label className="flex items-center gap-2 cursor-pointer font-label-md">
                  <input 
                    name="featured" 
                    type="checkbox" 
                    checked={newCourse.featured} 
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-primary border-outline-variant focus:ring-primary"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-outline-variant text-on-surface rounded-lg font-label-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md shadow-sm"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Course */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseEditModal}></div>
          <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low text-left">
              <h3 className="font-headline-sm text-headline-sm font-semibold">Modify Course Parameters</h3>
              <button className="p-2 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" onClick={handleCloseEditModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUpdateCourseSubmit} className="p-6 space-y-4 text-left">
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase">Course Title *</label>
                <input 
                  name="title" 
                  type="text" 
                  required 
                  value={editingCourse.title} 
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Category</label>
                  <select 
                    name="category" 
                    value={editingCourse.category} 
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  >
                    <option value="Diploma">Diploma</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Coding">Coding</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Duration</label>
                  <input 
                    name="duration" 
                    type="text" 
                    value={editingCourse.duration} 
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Price (INR) *</label>
                  <input 
                    name="price" 
                    type="number" 
                    required 
                    value={editingCourse.price} 
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Mode</label>
                  <select 
                    name="mode" 
                    value={editingCourse.mode} 
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Instructor</label>
                  <input 
                    name="instructor" 
                    type="text" 
                    value={editingCourse.instructor} 
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase">Description *</label>
                <textarea 
                  name="description" 
                  rows="3" 
                  required 
                  value={editingCourse.description} 
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border border-outline-variant rounded-lg font-body-md text-on-surface bg-surface-container-lowest"
                />
              </div>

              <div className="flex items-center gap-4 py-2">
                <label className="flex items-center gap-2 cursor-pointer font-label-md">
                  <input 
                    name="featured" 
                    type="checkbox" 
                    checked={editingCourse.featured} 
                    onChange={handleEditInputChange}
                    className="w-4 h-4 rounded text-primary border-outline-variant focus:ring-primary"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={handleCloseEditModal}
                  className="px-4 py-2 border border-outline-variant text-on-surface rounded-lg font-label-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification Popup */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-lg font-label-md flex items-center space-x-3 border border-outline-variant/30 animate-slide-up">
          <span className="material-symbols-outlined text-success">check_circle</span>
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
};

export default Courses;
