import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdmissions, createAdmission, updateAdmission, deleteAdmission } from '../../services/admissionService';
import { getCourses } from '../../services/courseService';

const Admissions = () => {
  const navigate = useNavigate();

  // Kanban Pipeline State
  const [pipelineData, setPipelineData] = useState({
    pending: [],
    approved: [],
    rejected: []
  });

  const [courses, setCourses] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApp, setNewApp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    batch: 'Jan 2024 (Morning)',
    address: '',
    message: ''
  });

  const fetchAdmissionsData = async () => {
    try {
      setLoading(true);
      const data = await getAdmissions();
      
      // Group by status
      const pending = data.filter(a => a.status === 'pending' || !a.status);
      const approved = data.filter(a => a.status === 'approved');
      const rejected = data.filter(a => a.status === 'rejected');

      setPipelineData({ pending, approved, rejected });
      
      // Map followups list (show pending and rejected inquiries)
      const nonApproved = data.filter(a => a.status !== 'approved').map(a => {
        const studentName = a.studentName || 'Student';
        const initials = studentName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'ST';
        const colors = ['bg-primary-container text-on-primary-container', 'bg-secondary-container text-on-secondary-container', 'bg-tertiary-container text-on-tertiary-container'];
        const colorIndex = studentName.charCodeAt(0) % colors.length;
        
        return {
          id: a._id,
          name: studentName,
          course: a.course,
          status: a.status ? a.status.charAt(0).toUpperCase() + a.status.slice(1) : 'Pending',
          lastInteraction: a.message || 'No remarks provided',
          nextStep: a.status === 'pending' ? 'Review & Approve' : 'Re-engage Applicant',
          initials,
          color: colors[colorIndex],
          phone: a.phone,
          email: a.email
        };
      });
      setFollowups(nonApproved);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch admissions list');
    } finally {
      setLoading(false);
    }
  };

  const fetchCoursesData = async () => {
    try {
      const courseList = await getCourses();
      setCourses(courseList);
      if (courseList.length > 0) {
        setNewApp(prev => ({ ...prev, course: courseList[0].title }));
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  useEffect(() => {
    fetchAdmissionsData();
    fetchCoursesData();
  }, []);

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
    setNewApp(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateApplication = async (e) => {
    e.preventDefault();
    if (!newApp.firstName || !newApp.lastName || !newApp.phone) {
      alert('Please fill in Name and Phone number.');
      return;
    }

    const fullName = `${newApp.firstName} ${newApp.lastName}`;

    try {
      await createAdmission({
        studentName: fullName,
        email: newApp.email,
        phone: newApp.phone,
        course: newApp.course || (courses.length > 0 ? courses[0].title : 'Basic Computer'),
        batch: newApp.batch,
        address: newApp.address,
        message: newApp.message,
        status: 'pending'
      });

      fetchAdmissionsData();
      setNewApp({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        course: courses.length > 0 ? courses[0].title : '',
        batch: 'Jan 2024 (Morning)',
        address: '',
        message: ''
      });
      handleCloseModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating application.');
    }
  };

  const handleStatusChange = async (id, name, newStatus) => {
    const confirmMessage = newStatus === 'approved' 
      ? `Approve enrollment for candidate ${name}? A student profile will be generated automatically in the directory.`
      : `Mark candidate ${name} status as ${newStatus}?`;

    if (window.confirm(confirmMessage)) {
      try {
        await updateAdmission(id, { status: newStatus });
        fetchAdmissionsData();
        if (newStatus === 'approved') {
          alert(`Candidate ${name} has been enrolled successfully!`);
        }
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Error updating candidate status.');
      }
    }
  };

  const handleDeleteApplication = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete candidate ${name}?`)) {
      try {
        await deleteAdmission(id);
        fetchAdmissionsData();
      } catch (err) {
        alert('Error removing candidate records.');
      }
    }
  };

  const handleContactAction = (action, name) => {
    alert(`Initiating standard administrative candidate ${action} to: ${name}...`);
  };

  const handleExportCSV = () => {
    const allAdmissions = [...pipelineData.pending, ...pipelineData.approved, ...pipelineData.rejected];
    if (allAdmissions.length === 0) {
      alert('No admissions data to export.');
      return;
    }
    const headers = 'Name,Email,Phone,Course,Batch,Address,Message,Status,AppliedDate\n';
    const csvRows = allAdmissions.map(a => {
      const name = `"${a.studentName.replace(/"/g, '""')}"`;
      const email = `"${(a.email || '').replace(/"/g, '""')}"`;
      const phone = `"${a.phone.replace(/"/g, '""')}"`;
      const course = `"${a.course.replace(/"/g, '""')}"`;
      const batch = `"${a.batch.replace(/"/g, '""')}"`;
      const address = `"${(a.address || '').replace(/"/g, '""')}"`;
      const message = `"${(a.message || '').replace(/"/g, '""')}"`;
      const status = `"${a.status}"`;
      const date = `"${new Date(a.createdAt).toLocaleDateString()}"`;
      return [name, email, phone, course, batch, address, message, status, date].join(',');
    }).join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + headers + csvRows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `admissions_pipeline_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading && pipelineData.pending.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading pipeline stages...</p>
      </div>
    );
  }

  const totalInquiriesCount = pipelineData.pending.length + pipelineData.approved.length + pipelineData.rejected.length;

  return (
    <div className="space-y-stack-lg">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Admissions Pipeline</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Track and manage the journey of prospective students.</p>
        </div>
        <div className="flex space-x-3 shrink-0">
          <button 
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg font-label-md hover:bg-primary-container/10 transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export CSV</span>
          </button>
          <button 
            onClick={handleOpenModal}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md shadow-sm hover:scale-102 transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Inquiry</span>
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter text-left">
        
        {/* Total Inquiries */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-44">
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-label-sm uppercase tracking-widest text-[11px]">Total Inquiries</span>
            <span className="material-symbols-outlined text-primary">contact_support</span>
          </div>
          <div className="mt-4">
            <h3 className="text-headline-xl font-headline-xl text-primary leading-none font-bold">{totalInquiriesCount}</h3>
            <p className="text-body-sm text-on-surface-variant mt-2 flex items-center">
              Active Database Records
            </p>
          </div>
        </div>

        {/* Pending Inquiries */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-44">
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-label-sm uppercase tracking-widest text-[11px]">Pending</span>
            <span className="material-symbols-outlined text-tertiary">assignment</span>
          </div>
          <div className="mt-4">
            <h3 className="text-headline-xl font-headline-xl text-on-surface leading-none font-bold">{pipelineData.pending.length}</h3>
            <p className="text-body-sm text-on-surface-variant mt-2">
              Waiting for interview & approval
            </p>
          </div>
        </div>

        {/* Approved Admissions */}
        <div className="bg-primary-container/10 p-stack-lg rounded-xl border border-primary/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-44">
          <div className="flex justify-between">
            <span className="text-primary font-label-sm uppercase tracking-widest text-[11px]">Approved (Students)</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <div className="mt-4">
            <h3 className="text-headline-xl font-headline-xl text-primary leading-none font-bold">{pipelineData.approved.length}</h3>
            <p className="text-body-sm text-primary mt-2">Registered in student directory</p>
          </div>
        </div>

        {/* Rejected Inquiries */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-44">
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-label-sm uppercase tracking-widest text-[11px]">Rejected</span>
            <span className="material-symbols-outlined text-outline">cancel</span>
          </div>
          <div className="mt-4">
            <h3 className="text-headline-xl font-headline-xl text-on-surface leading-none font-bold">{pipelineData.rejected.length}</h3>
            <p className="text-body-sm text-on-surface-variant mt-2">Retracted or rejected logs</p>
          </div>
        </div>

      </div>

      {/* Application Pipeline View */}
      <div className="space-y-stack-md text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Application Stages</h3>
        </div>

        <div className="flex space-x-gutter overflow-x-auto pb-6 pipeline-scroll custom-scrollbar">
          
          {/* Column: Pending Inquiries */}
          <div className="min-w-[340px] bg-surface-container-low rounded-xl p-4 flex flex-col max-h-[600px] h-[520px]">
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">Pending Inquiries</span>
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">{pipelineData.pending.length}</span>
              </div>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              {pipelineData.pending.map((app) => (
                <div key={app._id} className="glass-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all relative group">
                  <button 
                    onClick={() => handleDeleteApplication(app._id, app.studentName)}
                    className="absolute top-2 right-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Delete Record"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                  <div className="flex justify-between items-start mb-3 pr-4">
                    <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold uppercase">{app.course}</span>
                    <span className="text-[10px] text-on-surface-variant">{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{app.studentName}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1 font-light">{app.email || app.phone}</p>
                  {app.message && (
                    <p className="text-[11px] bg-surface-container p-2 rounded text-on-surface-variant mt-2 italic font-light">
                      "{app.message}"
                    </p>
                  )}
                  <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center">
                    <button 
                      onClick={() => handleStatusChange(app._id, app.studentName, 'rejected')}
                      className="text-error font-label-sm hover:underline font-bold text-xs"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleStatusChange(app._id, app.studentName, 'approved')}
                      className="bg-primary text-on-primary px-3 py-1.5 rounded text-[11px] font-bold hover:scale-102 transition-transform active:scale-95"
                    >
                      Approve & Enroll
                    </button>
                  </div>
                </div>
              ))}
              {pipelineData.pending.length === 0 && (
                <div className="p-8 text-center text-xs text-on-surface-variant/70 font-light border border-dashed border-outline-variant/60 rounded-lg">
                  No pending applicants at this stage.
                </div>
              )}
            </div>
          </div>

          {/* Column: Approved Admissions */}
          <div className="min-w-[340px] bg-surface-container-low rounded-xl p-4 flex flex-col max-h-[600px] h-[520px]">
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">Approved Admissions</span>
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">{pipelineData.approved.length}</span>
              </div>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              {pipelineData.approved.map((int) => (
                <div key={int._id} className="glass-card p-4 rounded-lg shadow-sm border-l-4 border-primary relative group">
                  <button 
                    onClick={() => handleDeleteApplication(int._id, int.studentName)}
                    className="absolute top-2 right-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Delete Record"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                  <div className="flex justify-between items-start mb-3 pr-4">
                    <span className="text-[10px] bg-primary-container/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{int.course}</span>
                    <span className="text-[10px] text-primary font-bold">{int.batch}</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{int.studentName}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1 font-light">{int.email || int.phone}</p>
                  <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center">
                    <span className="text-[10px] text-green-600 flex items-center font-bold">
                      <span className="material-symbols-outlined text-[14px] mr-1">check_circle</span> Active Student
                    </span>
                    <button 
                      onClick={() => handleStatusChange(int._id, int.studentName, 'rejected')}
                      className="text-error font-label-sm hover:underline text-xs"
                    >
                      Reject Student
                    </button>
                  </div>
                </div>
              ))}
              {pipelineData.approved.length === 0 && (
                <div className="p-8 text-center text-xs text-on-surface-variant/70 font-light border border-dashed border-outline-variant/60 rounded-lg">
                  No approved admissions.
                </div>
              )}
            </div>
          </div>

          {/* Column: Rejected Inquiries */}
          <div className="min-w-[340px] bg-surface-container-low rounded-xl p-4 flex flex-col max-h-[600px] h-[520px]">
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">Rejected Applications</span>
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">{pipelineData.rejected.length}</span>
              </div>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
              {pipelineData.rejected.map((rev) => (
                <div key={rev._id} className="glass-card p-4 rounded-lg shadow-sm border-l-4 border-red-500 relative group">
                  <button 
                    onClick={() => handleDeleteApplication(rev._id, rev.studentName)}
                    className="absolute top-2 right-2 text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Delete Record"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                  <div className="flex justify-between items-start mb-3 pr-4">
                    <span className="text-[10px] bg-outline-variant text-on-surface-variant px-2 py-0.5 rounded-full font-bold uppercase">{rev.course}</span>
                  </div>
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">{rev.studentName}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1 font-light">{rev.email || rev.phone}</p>
                  <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center">
                    <button 
                      onClick={() => handleStatusChange(rev._id, rev.studentName, 'pending')}
                      className="text-primary font-label-sm hover:underline text-xs font-bold"
                    >
                      Restore to Pending
                    </button>
                    <button 
                      onClick={() => handleStatusChange(rev._id, rev.studentName, 'approved')}
                      className="bg-secondary-container text-primary px-3 py-1 rounded text-[10px] font-bold hover:scale-102 active:scale-95"
                    >
                      Re-approve & Enroll
                    </button>
                  </div>
                </div>
              ))}
              {pipelineData.rejected.length === 0 && (
                <div className="p-8 text-center text-xs text-on-surface-variant/70 font-light border border-dashed border-outline-variant/60 rounded-lg">
                  No rejected applications recorded.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Follow-up List */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm text-left">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Follow-up List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4 font-semibold">Candidate</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Message/Remarks</th>
                <th className="px-6 py-4 font-semibold">Next Step</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
              {followups.map((fol) => (
                <tr key={fol.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${fol.color}`}>
                        {fol.initials}
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface font-bold leading-none">{fol.name}</p>
                        <p className="text-[10px] text-on-surface-variant mt-1">{fol.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-on-surface">{fol.course}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{fol.lastInteraction}</td>
                  <td className="px-6 py-4">
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-[10px] font-bold">
                      {fol.nextStep}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => handleContactAction(`phone call (${fol.phone || 'no number'})`, fol.name)}
                        className="p-2 text-primary hover:bg-primary-container/20 rounded-full transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[18px]">phone</span>
                      </button>
                      <button 
                        onClick={() => handleContactAction(`email dispatch (${fol.email || 'no email'})`, fol.name)}
                        className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {followups.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-on-surface-variant">
                    No active candidates in the pipeline list.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={handleOpenModal}
        className="fixed bottom-8 right-8 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-50 border border-primary-fixed"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </button>

      {/* Modal: Enroll New Application */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low text-left">
              <h3 className="font-headline-sm text-headline-sm">Record New Student Inquiry</h3>
              <button 
                className="p-2 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateApplication} className="p-stack-md space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">First Name *</label>
                  <input 
                    name="firstName" 
                    type="text" 
                    required 
                    value={newApp.firstName} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Last Name *</label>
                  <input 
                    name="lastName" 
                    type="text" 
                    required 
                    value={newApp.lastName} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    value={newApp.email} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Phone Number *</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    required 
                    value={newApp.phone} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Preferred Course</label>
                  <select 
                    name="course" 
                    value={newApp.course} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface"
                  >
                    {courses.map(course => (
                      <option key={course._id} value={course.title}>{course.title}</option>
                    ))}
                    {courses.length === 0 && (
                      <>
                        <option value="Basic Computer">Basic Computer</option>
                        <option value="DCA">DCA</option>
                        <option value="PGDCA">PGDCA</option>
                        <option value="Tally Prime">Tally Prime</option>
                        <option value="MS Office">MS Office</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Preferred Batch</label>
                  <select 
                    name="batch" 
                    value={newApp.batch} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface"
                  >
                    <option value="Jan 2024 (Morning)">Jan 2024 (Morning)</option>
                    <option value="Jan 2024 (Evening)">Jan 2024 (Evening)</option>
                    <option value="Jan 2024 (Weekend)">Jan 2024 (Weekend)</option>
                    <option value="Feb 2024 (Evening)">Feb 2024 (Evening)</option>
                    <option value="Jun 2024">Jun 2024</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Address</label>
                  <input 
                    name="address" 
                    type="text" 
                    value={newApp.address} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface"
                    placeholder="Enter student address (will map on approval)"
                  />
                </div>
                <div className="col-span-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1">Message / Remarks</label>
                  <textarea 
                    name="message" 
                    value={newApp.message} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface h-20"
                    placeholder="Enter remarks or message details"
                  />
                </div>
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
                  Create Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admissions;
