import React, { useState, useEffect, useRef } from 'react';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../../services/teacherService';

const Teachers = () => {
  // States
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // UI Toast State
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Modal control states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Form Mode
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    subject: '',
    experience: '',
    bio: '',
    email: '',
    phone: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    status: true
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const fileInputRef = useRef(null);

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const fetchAllTeachers = async () => {
    try {
      setLoading(true);
      const data = await getTeachers();
      setTeachers(data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch faculty directory from the database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5000${path}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        triggerToast('Image file size must be under 5MB', 'warning');
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const openCreateModal = () => {
    setFormMode('create');
    setFormData({
      name: '',
      qualification: '',
      subject: '',
      experience: '',
      bio: '',
      email: '',
      phone: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      status: true
    });
    setPhotoFile(null);
    setPhotoPreview('');
    setIsFormModalOpen(true);
  };

  const openEditModal = (teacher) => {
    setFormMode('edit');
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name || '',
      qualification: teacher.qualification || '',
      subject: teacher.subject || '',
      experience: teacher.experience || '',
      bio: teacher.bio || '',
      email: teacher.email || '',
      phone: teacher.phone || '',
      facebook: teacher.socialLinks?.facebook || '',
      twitter: teacher.socialLinks?.twitter || '',
      linkedin: teacher.socialLinks?.linkedin || '',
      status: teacher.status !== undefined ? teacher.status : true
    });
    setPhotoFile(null);
    setPhotoPreview(teacher.photo ? getImageUrl(teacher.photo) : '');
    setIsFormModalOpen(true);
  };

  const openDetailModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDetailModalOpen(true);
  };

  const openDeleteConfirm = (teacher) => {
    setTeacherToDelete(teacher);
    setIsDeleteConfirmOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.qualification.trim() || !formData.subject.trim() || !formData.experience.trim()) {
      triggerToast('Please fill out all required fields', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      triggerToast('Please provide a valid email address', 'warning');
      return;
    }

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('qualification', formData.qualification);
      payload.append('subject', formData.subject);
      payload.append('experience', formData.experience);
      payload.append('bio', formData.bio);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('status', formData.status);

      const socialObj = {
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedin: formData.linkedin
      };
      payload.append('socialLinks', JSON.stringify(socialObj));

      if (photoFile) {
        payload.append('photo', photoFile);
      }

      if (formMode === 'create') {
        await createTeacher(payload);
        triggerToast(`Successfully added ${formData.name}!`);
      } else {
        await updateTeacher(selectedTeacher._id, payload);
        triggerToast(`Successfully updated ${formData.name}!`);
      }

      setIsFormModalOpen(false);
      fetchAllTeachers();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Error processing teacher profile.';
      triggerToast(msg, 'error');
    }
  };

  const toggleTeacherStatus = async (teacher) => {
    try {
      const newStatus = !teacher.status;
      const updatedFormData = new FormData();
      updatedFormData.append('status', newStatus);
      
      await updateTeacher(teacher._id, updatedFormData);
      triggerToast(`${teacher.name} status set to ${newStatus ? 'Active' : 'Inactive'}`);
      fetchAllTeachers();
    } catch (err) {
      console.error(err);
      triggerToast('Failed to toggle status.', 'error');
    }
  };

  const executeDeleteTeacher = async () => {
    if (!teacherToDelete) return;
    try {
      await deleteTeacher(teacherToDelete._id);
      triggerToast(`Instructor "${teacherToDelete.name}" permanently deleted.`);
      setIsDeleteConfirmOpen(false);
      setTeacherToDelete(null);
      fetchAllTeachers();
    } catch (err) {
      console.error(err);
      triggerToast('Error deleting teacher.', 'error');
    }
  };

  return (
    <div className="space-y-stack-lg relative">
      
      {/* Toast Alert Notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 z-[999] flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl border text-sm font-semibold transition-all animate-bounce duration-300 ${
          toast.type === 'success' 
            ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 backdrop-blur-md'
            : toast.type === 'warning'
            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400 backdrop-blur-md'
            : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 backdrop-blur-md'
        }`}>
          <span className="material-symbols-outlined text-[20px]">
            {toast.type === 'success' ? 'check_circle' : toast.type === 'warning' ? 'warning' : 'error'}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Faculty Directory</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Oversee and organize Laxmi Academy's expert instructors and teaching staff.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:scale-102 transition-transform shadow-md shrink-0 active:scale-95 duration-150"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add New Instructor
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg text-left">
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Faculty</p>
          <h3 className="font-headline-md text-headline-md text-primary font-bold">{loading ? '...' : teachers.length}</h3>
          <p className="text-[12px] text-on-surface-variant mt-1">Direct MongoDB seed files</p>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Instructors</p>
          <h3 className="font-headline-md text-headline-md text-green-600 font-bold">
            {loading ? '...' : teachers.filter(t => t.status).length}
          </h3>
          <p className="text-[12px] text-green-600 mt-1">Currently showing on public web</p>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Inactive</p>
          <h3 className="font-headline-md text-headline-md text-on-surface-variant/60 font-bold">
            {loading ? '...' : teachers.filter(t => !t.status).length}
          </h3>
          <p className="text-[12px] text-on-surface-variant mt-1">Hidden from public directory</p>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Specialties</p>
          <h3 className="font-headline-md text-headline-md text-tertiary font-bold">
            {loading ? '...' : new Set(teachers.map(t => t.subject)).size}
          </h3>
          <p className="text-[12px] text-on-surface-variant mt-1">Core training divisions</p>
        </div>
      </div>

      {/* List Table for Teachers */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden text-left shadow-sm">
        <div className="px-stack-lg py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Faculty Roster</h4>
          <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full uppercase">
            MongoDB Directory
          </span>
        </div>

        {error && (
          <div className="p-4 bg-error-container text-on-error-container border-b border-error/10 text-sm font-semibold">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/30 text-on-surface-variant font-label-sm uppercase">
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Instructor</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Specialty / Subject</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Qualification</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Experience</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Status</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-body-sm font-light text-on-surface-variant">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined animate-spin text-3xl text-primary block mb-2">sync</span>
                    Loading dynamic instructor database...
                  </td>
                </tr>
              ) : teachers.map((teacher) => {
                const initials = (teacher.name || 'Teacher').split(' ').map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2) || 'TC';
                
                return (
                  <tr key={teacher._id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="px-stack-lg py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container text-primary flex items-center justify-center font-bold text-sm">
                          {teacher.photo ? (
                            <img src={getImageUrl(teacher.photo)} alt={teacher.name || 'Teacher'} className="w-full h-full object-cover" />
                          ) : (
                            initials
                          )}
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-bold">{teacher.name || 'Teacher'}</p>
                          <p className="text-[12px] text-on-surface-variant">{teacher.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-stack-lg py-4 font-body-sm text-body-sm text-on-surface font-medium">{teacher.subject}</td>
                    <td className="px-stack-lg py-4">{teacher.qualification}</td>
                    <td className="px-stack-lg py-4">{teacher.experience}</td>
                    <td className="px-stack-lg py-4">
                      <button 
                        onClick={() => toggleTeacherStatus(teacher)}
                        className={`flex items-center font-label-md text-label-md transition-colors ${
                          teacher.status ? 'text-green-600 hover:text-green-800' : 'text-on-surface-variant/75 hover:text-primary'
                        }`}
                        title="Toggle availability status"
                      >
                        <span className={`w-2.5 h-2.5 rounded-full mr-2 ${teacher.status ? 'bg-green-500' : 'bg-outline-variant'}`}></span>
                        {teacher.status ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-stack-lg py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => openDetailModal(teacher)}
                          className="text-on-surface-variant hover:text-primary hover:bg-surface-container p-2 rounded-full flex items-center justify-center transition-colors"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button 
                          onClick={() => openEditModal(teacher)}
                          className="text-primary hover:bg-surface-container p-2 rounded-full flex items-center justify-center transition-colors"
                          title="Edit Instructor"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button 
                          onClick={() => openDeleteConfirm(teacher)}
                          className="text-error hover:bg-surface-container p-2 rounded-full flex items-center justify-center transition-colors"
                          title="Delete Instructor"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && teachers.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-on-surface-variant font-light">
                    No faculty profiles registered in MongoDB.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add or Edit Instructor */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsFormModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="px-stack-lg py-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {formMode === 'create' ? 'Add New Faculty Member' : 'Edit Faculty Member'}
              </h3>
              <button 
                className="p-2 hover:bg-surface-container rounded-full transition-colors flex items-center justify-center text-on-surface-variant" 
                onClick={() => setIsFormModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-stack-lg space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Photo Upload Area */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-surface-container border border-outline-variant flex items-center justify-center shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40">person</span>
                  )}
                </div>
                <div className="text-center sm:text-left space-y-1.5">
                  <h4 className="font-label-md text-label-md font-semibold text-on-surface">Instructor Headshot</h4>
                  <p className="text-[11px] text-on-surface-variant">JPEG, JPG, PNG or WEBP. Max 5MB file limit.</p>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-3 py-1 bg-primary text-on-primary text-xs font-semibold rounded hover:opacity-90 active:scale-95 transition-all"
                    >
                      Choose Photo
                    </button>
                    {photoPreview && (
                      <button 
                        type="button"
                        onClick={() => {
                          setPhotoFile(null);
                          setPhotoPreview('');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="px-3 py-1 bg-surface-container-high text-on-surface border border-outline-variant text-xs font-semibold rounded hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePhotoChange} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Full Name *</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. Dr. Sarah Jenkins" 
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Email Address *</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. sarah.j@laxmi.com" 
                    type="email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Phone Number *</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. +91 98765 43210" 
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Subject / Specialty *</label>
                  <input 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. Full Stack Development" 
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Qualification *</label>
                  <input 
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. MCA, M.Tech in CS" 
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Experience Details *</label>
                  <input 
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. 5+ Years" 
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Description / Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest resize-none" 
                  placeholder="Tell students about this instructor's career path, key expertise..." 
                />
              </div>

              {/* Social Media Links */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-3">
                <h4 className="font-label-md text-label-md font-semibold text-on-surface uppercase tracking-wide">Social Connect Profiles (Optional)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-on-surface-variant block uppercase tracking-wider font-medium">Linkedin</label>
                    <input 
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded border border-outline-variant text-xs bg-surface-container-lowest outline-none focus:border-primary"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-on-surface-variant block uppercase tracking-wider font-medium">Facebook</label>
                    <input 
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded border border-outline-variant text-xs bg-surface-container-lowest outline-none focus:border-primary"
                      placeholder="facebook.com/username"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-on-surface-variant block uppercase tracking-wider font-medium">Twitter / X</label>
                    <input 
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded border border-outline-variant text-xs bg-surface-container-lowest outline-none focus:border-primary"
                      placeholder="twitter.com/username"
                    />
                  </div>
                </div>
              </div>

              {/* Status checkbox */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  name="status"
                  id="teacher_status_field"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="w-4.5 h-4.5 text-primary bg-surface border-outline-variant rounded focus:ring-primary cursor-pointer"
                />
                <label htmlFor="teacher_status_field" className="font-body-sm text-on-surface font-semibold cursor-pointer select-none">
                  Enable active directory status (instructors will show on public faculty lists immediately)
                </label>
              </div>

              {/* Form buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant text-on-surface-variant rounded-lg font-label-md hover:bg-surface-container transition-colors" 
                  onClick={() => setIsFormModalOpen(false)} 
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-8 py-2 bg-primary text-on-primary rounded-lg font-label-md shadow-lg hover:scale-102 transition-transform active:scale-95 duration-100 font-bold" 
                  type="submit"
                >
                  {formMode === 'create' ? 'Create Profile' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Instructor Details */}
      {isDetailModalOpen && selectedTeacher && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsDetailModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="px-stack-lg py-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{selectedTeacher.name}</h3>
                <p className="text-xs uppercase text-primary font-bold tracking-wider">{selectedTeacher.subject}</p>
              </div>
              <button 
                className="p-2 hover:bg-surface-container rounded-full transition-colors flex items-center justify-center text-on-surface-variant" 
                onClick={() => setIsDetailModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-stack-lg space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-36 h-36 rounded-xl overflow-hidden bg-secondary-container border border-outline-variant shrink-0 mx-auto sm:mx-0">
                  {selectedTeacher.photo ? (
                    <img src={getImageUrl(selectedTeacher.photo)} alt={selectedTeacher.name || 'Teacher'} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-4xl">
                      {(selectedTeacher.name || 'Teacher').split(' ').map(p => p.charAt(0)).join('').toUpperCase().substring(0,2)}
                    </div>
                  )}
                </div>
                <div className="flex-grow space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Qualification</h4>
                      <p className="font-body-md text-on-surface font-medium">{selectedTeacher.qualification}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Experience</h4>
                      <p className="font-body-md text-on-surface font-medium">{selectedTeacher.experience}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20">
                    <div>
                      <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Email Address</h4>
                      <p className="text-body-sm font-light text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-primary">mail</span> {selectedTeacher.email}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Phone Number</h4>
                      <p className="text-body-sm font-light text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-primary">phone</span> {selectedTeacher.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Directory Visibility</h4>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                      selectedTeacher.status ? 'bg-green-500/10 text-green-600' : 'bg-outline-variant/10 text-on-surface-variant'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedTeacher.status ? 'bg-green-500' : 'bg-outline-variant'}`}></span>
                      {selectedTeacher.status ? 'Active & Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider mb-1">Biography</h4>
                <p className="text-body-sm text-on-surface-variant font-light leading-relaxed whitespace-pre-line bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                  {selectedTeacher.bio || 'No career biography registered yet.'}
                </p>
              </div>

              {selectedTeacher.socialLinks && (selectedTeacher.socialLinks.facebook || selectedTeacher.socialLinks.twitter || selectedTeacher.socialLinks.linkedin) && (
                <div className="pt-4 border-t border-outline-variant/30 flex items-center gap-3">
                  <span className="text-[11px] uppercase text-on-surface-variant font-bold">Social Handles:</span>
                  <div className="flex gap-2">
                    {selectedTeacher.socialLinks.linkedin && (
                      <span className="text-xs px-2.5 py-1 bg-surface-container rounded border border-outline-variant font-medium">
                        LinkedIn: {selectedTeacher.socialLinks.linkedin}
                      </span>
                    )}
                    {selectedTeacher.socialLinks.facebook && (
                      <span className="text-xs px-2.5 py-1 bg-surface-container rounded border border-outline-variant font-medium">
                        Facebook: {selectedTeacher.socialLinks.facebook}
                      </span>
                    )}
                    {selectedTeacher.socialLinks.twitter && (
                      <span className="text-xs px-2.5 py-1 bg-surface-container rounded border border-outline-variant font-medium">
                        Twitter: {selectedTeacher.socialLinks.twitter}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup: Delete Teacher */}
      {isDeleteConfirmOpen && teacherToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsDeleteConfirmOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl p-6 border border-outline-variant animate-scale-in text-left">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <span className="material-symbols-outlined text-[32px]">warning</span>
              <h3 className="font-headline-sm text-headline-sm font-semibold">Delete Instructor</h3>
            </div>
            
            <p className="text-body-md text-on-surface-variant font-light mb-6">
              Are you sure you want to permanently remove <span className="font-bold text-on-surface">"{teacherToDelete.name}"</span> from the faculty directory database? This action is irreversible and will delete their photo files from server storage.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-sm hover:bg-surface-container transition-all"
              >
                No, Keep
              </button>
              <button 
                onClick={executeDeleteTeacher}
                className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-red-750 active:scale-95 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Teachers;
