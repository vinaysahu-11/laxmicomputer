import React, { useState, useEffect, useRef } from 'react';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../../services/studentService';

const Students = () => {
  // Database & Filter States
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [selectedBatch, setSelectedBatch] = useState('All Batches');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Toast Notification
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Modal control states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Camera Capture Modal
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  // Form Mode & selection targets
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    course: 'Full Stack Web Dev',
    batch: 'Jan 2024 (Morning)',
    email: '',
    phone: '',
    address: '',
    joiningDate: '',
    status: true
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [capturedBase64, setCapturedBase64] = useState('');

  // Refs
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchQuery.trim(),
        course: selectedCourse,
        batch: selectedBatch,
        page: currentPage,
        limit: rowsPerPage
      };
      
      const data = await getStudents(params);
      setStudents(data.students || []);
      setTotalPages(data.pages || 1);
      setTotalStudents(data.total || 0);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch students database records.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page, search, or filters change
  useEffect(() => {
    fetchStudentData();
  }, [currentPage, selectedCourse, selectedBatch, rowsPerPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchStudentData();
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') || path.startsWith('data:') ? path : `http://localhost:5000${path}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Local computer file uploads
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        triggerToast('Image file size must be under 5MB', 'warning');
        return;
      }
      setPhotoFile(file);
      setCapturedBase64('');
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // CAMERA CAPTURE LOGIC
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 400, height: 400 }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      triggerToast('Unable to open camera stream. Permission denied.', 'error');
      setIsCameraActive(false);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const base64Data = canvas.toDataURL('image/jpeg');
      setCapturedBase64(base64Data);
      setPhotoPreview(base64Data);
      setPhotoFile(null); // remove manual file upload
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const openCreateModal = () => {
    setFormMode('create');
    setFormData({
      name: '',
      rollNumber: `ST-${Date.now().toString().slice(-6)}`,
      course: 'Full Stack Web Dev',
      batch: 'Jan 2024 (Morning)',
      email: '',
      phone: '',
      address: '',
      joiningDate: new Date().toISOString().substring(0, 10),
      status: true
    });
    setPhotoFile(null);
    setCapturedBase64('');
    setPhotoPreview('');
    setIsFormModalOpen(true);
  };

  const openEditModal = (student) => {
    setFormMode('edit');
    setSelectedStudent(student);
    setFormData({
      name: student.name || '',
      rollNumber: student.rollNumber || '',
      course: student.course || 'Full Stack Web Dev',
      batch: student.batch || 'Jan 2024 (Morning)',
      email: student.email || '',
      phone: student.phone || '',
      address: student.address || '',
      joiningDate: student.joiningDate ? new Date(student.joiningDate).toISOString().substring(0, 10) : '',
      status: student.status !== undefined ? student.status : true
    });
    setPhotoFile(null);
    setCapturedBase64('');
    setPhotoPreview(student.photo ? getImageUrl(student.photo) : '');
    setIsFormModalOpen(true);
  };

  const openDetailModal = (student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const openDeleteConfirm = (student) => {
    setStudentToDelete(student);
    setIsDeleteConfirmOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.name.trim() || !formData.rollNumber.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.joiningDate) {
      triggerToast('Please complete all required fields.', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      triggerToast('Invalid email address format.', 'warning');
      return;
    }

    try {
      let payload;
      
      // If we have a physical photo file, we use FormData. Otherwise we can send JSON
      if (photoFile) {
        payload = new FormData();
        payload.append('name', formData.name);
        payload.append('rollNumber', formData.rollNumber);
        payload.append('course', formData.course);
        payload.append('batch', formData.batch);
        payload.append('email', formData.email);
        payload.append('phone', formData.phone);
        payload.append('address', formData.address);
        payload.append('joiningDate', formData.joiningDate);
        payload.append('status', formData.status);
        payload.append('photo', photoFile);
      } else {
        // base64 camera image capture OR unchanged photo URL
        payload = {
          ...formData,
          photo: capturedBase64 || (formMode === 'edit' ? selectedStudent.photo : '')
        };
      }

      if (formMode === 'create') {
        await createStudent(payload);
        triggerToast(`Successfully enrolled student ${formData.name}!`);
      } else {
        await updateStudent(selectedStudent._id, payload);
        triggerToast(`Successfully updated record of ${formData.name}!`);
      }

      setIsFormModalOpen(false);
      fetchStudentData();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Error saving student profile.';
      triggerToast(msg, 'error');
    }
  };

  const toggleStudentStatus = async (student) => {
    try {
      const newStatus = !student.status;
      await updateStudent(student._id, { status: newStatus });
      triggerToast(`Student status updated to ${newStatus ? 'Active' : 'Inactive'}`);
      fetchStudentData();
    } catch (err) {
      console.error(err);
      triggerToast('Error toggling student status.', 'error');
    }
  };

  const executeDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudent(studentToDelete._id);
      triggerToast(`Student profile "${studentToDelete.name}" permanently deleted.`);
      setIsDeleteConfirmOpen(false);
      setStudentToDelete(null);
      fetchStudentData();
    } catch (err) {
      console.error(err);
      triggerToast('Error removing student profile from MongoDB.', 'error');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'ST';
    return name.split(' ').map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2);
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Student Directory</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Oversee, search, and update students' academic profiles and roll registers.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:scale-102 transition-transform duration-200 active:scale-95 shadow-md shrink-0"
        >
          <span className="material-symbols-outlined mr-2">person_add</span>
          Enroll Student
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg text-left">
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Enrolled</p>
            <p className="font-headline-sm text-headline-sm font-bold text-on-surface">{totalStudents}</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 border border-green-500/20">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Students</p>
            <p className="font-headline-sm text-headline-sm font-bold text-green-600">
              {students.filter(s => s.status).length}
            </p>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-outline-variant/20 flex items-center justify-center text-on-surface-variant border border-outline-variant/30">
            <span className="material-symbols-outlined">pause_circle</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Suspended/Inactive</p>
            <p className="font-headline-sm text-headline-sm font-bold text-on-surface-variant/70">
              {students.filter(s => !s.status).length}
            </p>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-tertiary-container/30 flex items-center justify-center text-tertiary border border-tertiary/20">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Paging Index</p>
            <p className="font-headline-sm text-headline-sm font-bold text-tertiary">Page {currentPage} / {totalPages}</p>
          </div>
        </div>
      </div>

      {/* Main Student Directory Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden text-left mb-stack-lg">
        
        {/* Filters and Search toolbar */}
        <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-low/50">
          
          <form onSubmit={handleSearchSubmit} className="flex w-full md:max-w-md items-center gap-2">
            <input 
              type="text" 
              placeholder="Search by student name, email, roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm hover:opacity-90 active:scale-95 transition-all font-semibold"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              value={selectedCourse}
              onChange={(e) => { setSelectedCourse(e.target.value); setCurrentPage(1); }}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-primary focus:border-primary outline-none cursor-pointer flex-grow md:flex-grow-0"
            >
              <option value="All Courses">All Courses</option>
              <option value="Full Stack Web Dev">Full Stack Web Dev</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Python for Data Science">Python for Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
            
            <select 
              value={selectedBatch}
              onChange={(e) => { setSelectedBatch(e.target.value); setCurrentPage(1); }}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-primary focus:border-primary outline-none cursor-pointer flex-grow md:flex-grow-0"
            >
              <option value="All Batches">All Batches</option>
              <option value="Jan 2024 (Morning)">Jan 2024 (Morning)</option>
              <option value="Feb 2024 (Evening)">Feb 2024 (Evening)</option>
              <option value="Jan 2024 (Weekend)">Jan 2024 (Weekend)</option>
            </select>
          </div>
        </div>

        {/* Database records table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-on-surface-variant font-label-sm uppercase tracking-wider">
                <th className="px-stack-md py-4 font-semibold text-xs">Student Name</th>
                <th className="px-stack-md py-4 font-semibold text-xs">Roll Number</th>
                <th className="px-stack-md py-4 font-semibold text-xs">Course / Degree</th>
                <th className="px-stack-md py-4 font-semibold text-xs">Allocated Batch</th>
                <th className="px-stack-md py-4 font-semibold text-xs">Status</th>
                <th className="px-stack-md py-4 font-semibold text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-body-sm font-light text-on-surface-variant">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined animate-spin text-3xl text-primary block mb-2">sync</span>
                    Querying student directory registers...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-on-surface-variant font-light">
                    No matching student profiles registered in database.
                  </td>
                </tr>
              ) : students.map((student) => {
                const initials = getInitials(student.name);
                
                return (
                  <tr key={student._id} className="hover:bg-primary-container/5 transition-colors duration-150 group">
                    <td className="px-stack-md py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                          {student.photo ? (
                            <img src={getImageUrl(student.photo)} alt={student.name} className="w-full h-full object-cover" />
                          ) : (
                            initials
                          )}
                        </div>
                        <div>
                          <p className="font-label-md text-label-md font-bold text-on-surface">{student.name}</p>
                          <p className="text-[11px] text-on-surface-variant">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-stack-md py-4 font-mono font-medium text-xs text-on-surface">{student.rollNumber}</td>
                    <td className="px-stack-md py-4">
                      <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded text-xs font-semibold">
                        {student.course}
                      </span>
                    </td>
                    <td className="px-stack-md py-4">{student.batch}</td>
                    <td className="px-stack-md py-4">
                      <button 
                        onClick={() => toggleStudentStatus(student)}
                        className={`flex items-center font-label-md text-label-md transition-colors ${
                          student.status ? 'text-green-600 hover:text-green-800' : 'text-on-surface-variant/75 hover:text-primary'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-2.5 h-2.5 rounded-full mr-2 ${student.status ? 'bg-green-500' : 'bg-outline-variant'}`}></span> 
                        {student.status ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-stack-md py-4 text-right">
                      <div className="flex justify-end space-x-1">
                        <button 
                          onClick={() => openDetailModal(student)}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors flex items-center justify-center" 
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        <button 
                          onClick={() => openEditModal(student)}
                          className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors flex items-center justify-center" 
                          title="Edit Profile"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button 
                          onClick={() => openDeleteConfirm(student)}
                          className="p-2 text-error hover:bg-surface-container rounded-full transition-colors flex items-center justify-center" 
                          title="Delete Record"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination toolbar */}
        <div className="p-4 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-low/20">
          <div className="flex items-center space-x-2">
            <label className="text-xs text-on-surface-variant font-medium">Rows per page:</label>
            <select 
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
              className="bg-surface border border-outline-variant rounded px-2 py-1 text-xs outline-none cursor-pointer"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50 text-xs font-semibold"
            >
              Previous
            </button>
            <span className="text-xs font-semibold">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-colors disabled:opacity-50 text-xs font-semibold"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Modal: Enroll / Edit Student Form */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsFormModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-semibold">
                {formMode === 'create' ? 'Enroll New Student' : 'Edit Student Profile'}
              </h3>
              <button 
                className="p-2 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center text-on-surface-variant" 
                onClick={() => setIsFormModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-stack-md space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* Photo Input options */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container border border-outline-variant flex items-center justify-center shrink-0">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-[30px] text-on-surface-variant/40">person</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-label-md text-label-md font-semibold text-on-surface">Student Profile Photo</h4>
                    <p className="text-[11px] text-on-surface-variant">Use local file upload or take camera capture.</p>
                  </div>
                </div>

                {isCameraActive ? (
                  <div className="flex flex-col items-center gap-2 p-2 bg-black rounded-lg relative overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline className="w-full max-h-48 rounded object-cover" />
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={captureFrame} 
                        className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded shadow hover:opacity-90"
                      >
                        Capture Frame
                      </button>
                      <button 
                        type="button" 
                        onClick={stopCamera} 
                        className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded shadow hover:opacity-90"
                      >
                        Cancel Camera
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-3 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded hover:opacity-90 active:scale-95 transition-all"
                    >
                      Upload File
                    </button>
                    <button 
                      type="button"
                      onClick={startCamera}
                      className="px-3 py-1.5 bg-secondary-container text-primary text-xs font-semibold rounded hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">videocam</span> Take Capture
                    </button>
                    {photoPreview && (
                      <button 
                        type="button"
                        onClick={() => {
                          setPhotoFile(null);
                          setCapturedBase64('');
                          setPhotoPreview('');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="px-3 py-1.5 bg-surface-container-high text-on-surface border border-outline-variant text-xs font-semibold rounded hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
                      >
                        Clear Image
                      </button>
                    )}
                  </div>
                )}

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePhotoChange} 
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Full Name *</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="Enter student name" 
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Roll Number *</label>
                  <input 
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest font-mono" 
                    placeholder="e.g. ST-2026-102" 
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Email Address *</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="student@gmail.com" 
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Phone Number *</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. +91 99999 88888" 
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Course Selection *</label>
                  <select 
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2 px-3 bg-surface-container-lowest cursor-pointer text-xs"
                  >
                    <option value="Full Stack Web Dev">Full Stack Web Dev</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Python for Data Science">Python for Data Science</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Batch Allocation *</label>
                  <select 
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2 px-3 bg-surface-container-lowest cursor-pointer text-xs"
                  >
                    <option value="Jan 2024 (Morning)">Jan 2024 (Morning)</option>
                    <option value="Feb 2024 (Evening)">Feb 2024 (Evening)</option>
                    <option value="Jan 2024 (Weekend)">Jan 2024 (Weekend)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Joining Date *</label>
                  <input 
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest cursor-pointer" 
                    type="date"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Status *</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2 px-3 bg-surface-container-lowest cursor-pointer text-xs"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-semibold">Permanent Address *</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest resize-none" 
                  placeholder="Street Address, City, State" 
                  required
                />
              </div>

              {/* Form buttons */}
              <div className="pt-4 flex justify-end space-x-3 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors" 
                  onClick={() => setIsFormModalOpen(false)} 
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 shadow-md active:scale-95 transition-all font-bold" 
                  type="submit"
                >
                  {formMode === 'create' ? 'Register Student' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Student Details */}
      {isDetailModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsDetailModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-semibold">{selectedStudent.name}</h3>
                <p className="text-xs uppercase text-primary font-mono tracking-wider font-bold">Roll: {selectedStudent.rollNumber}</p>
              </div>
              <button 
                className="p-2 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center text-on-surface-variant" 
                onClick={() => setIsDetailModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-stack-md space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-secondary-container border border-outline-variant shrink-0 mx-auto sm:mx-0">
                  {selectedStudent.photo ? (
                    <img src={getImageUrl(selectedStudent.photo)} alt={selectedStudent.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-4xl">
                      {getInitials(selectedStudent.name)}
                    </div>
                  )}
                </div>
                
                <div className="flex-grow space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Course Selection</h4>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-semibold">{selectedStudent.course}</span>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Assigned Batch</h4>
                      <p className="text-body-sm font-medium">{selectedStudent.batch}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Joining Date</h4>
                      <p className="text-body-sm font-light">{new Date(selectedStudent.joiningDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Current Status</h4>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        selectedStudent.status ? 'bg-green-500/10 text-green-600' : 'bg-outline-variant/10 text-on-surface-variant'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${selectedStudent.status ? 'bg-green-500' : 'bg-outline-variant'}`}></span>
                        {selectedStudent.status ? 'Active Student' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-outline-variant/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Email Address</h4>
                    <p className="text-body-sm font-light text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">mail</span> {selectedStudent.email}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Phone Number</h4>
                    <p className="text-body-sm font-light text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">phone</span> {selectedStudent.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">Permanent Address</h4>
                  <p className="text-body-sm font-light text-on-surface flex items-start gap-1.5 bg-surface-container-low p-3 rounded-lg border border-outline-variant/20 mt-1">
                    <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">location_on</span> {selectedStudent.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup: Delete Student */}
      {isDeleteConfirmOpen && studentToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsDeleteConfirmOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl p-6 border border-outline-variant animate-scale-in text-left">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <span className="material-symbols-outlined text-[32px]">warning</span>
              <h3 className="font-headline-sm text-headline-sm font-semibold">Delete Student Profile</h3>
            </div>
            
            <p className="text-body-md text-on-surface-variant font-light mb-6">
              Are you sure you want to permanently delete student <span className="font-bold text-on-surface">"{studentToDelete.name}"</span> (Roll Number: {studentToDelete.rollNumber})? This will delete all record associations and unlink their photo files from server storage.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-sm hover:bg-surface-container transition-all"
              >
                No, Cancel
              </button>
              <button 
                onClick={executeDeleteStudent}
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

export default Students;
