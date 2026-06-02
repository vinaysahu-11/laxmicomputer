import React, { useState, useEffect } from 'react';

const Students = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Liam Henderson',
      email: 'liam.h@eduacademy.com',
      course: 'Full Stack Web Dev',
      batch: 'Jan 2024 (Morning)',
      status: 'Active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcLVHsWIOZ1_lkwJ16Ptn2T3ojmHV9Lamy_OUdsMyH31VS8vL-Yxl3FHCoXCDS06VGfymV1-UUD2EyYSPp8T4B-KGjUQHA4XG72sU_SNMHg1_FgJvozm2Tg4fO6MgChtXW73ZmQlMhPnFspxxYPiLGGOa_C6qbNMPL3QQpQYOv8vExxbpQkov0wIb0J0Tl_7H8wxvhtPWFG6Pi7Q9VDEallKdZjfRbpS_zV3-ZE6uetM3atCHDDYQ9BnjCntsmq4VgRsfH9RzsXubS',
      initials: 'LH'
    },
    {
      id: 2,
      name: 'Sophia Martinez',
      email: 'sophia.m@eduacademy.com',
      course: 'UI/UX Design',
      batch: 'Dec 2023 (Evening)',
      status: 'Active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMYsCRK16Zqs2GtsXiv5BjBDQqoD0UE1u-H9UYuhfzKn0fg5UNMGFkZAnJxQr_z3fOYPO15schI8k4he7m04qlYqN1SjY9wK-pds6LcfveyZlTl0RXpFvY0jSdANE20gUb-JNaYBZmXmvlEuVI68L9b-626L4mAVJS4k11Da9Wb4NnrFialF3YI_zpgW8J19QCydP5uqoIrSIfnF3VqZh9gA5QiIP6p8R9UoDAzLIkbg1vzkqYExBR_CJZUzDD5JSyBG7OZbh4jhzJ',
      initials: 'SM'
    },
    {
      id: 3,
      name: 'James Thompson',
      email: 'james.t@eduacademy.com',
      course: 'Python for Data Science',
      batch: 'Jan 2024 (Weekend)',
      status: 'Inactive',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwNtdsE8Lgdnwc5CX8zQkXO_D066ZLrPdlpE7fd4iDbQl1jfHiIWKh6o9GAjQKrRoCm5UQ_rHFCdHwW-UijrIjIi6-1VLAlkReDelfdz1ErGwTNjRTl-Gtxa3G22nSP-XcvpSCKmZJzSjZf47PHLAO1nz0wfgai_YAWSbgZMRL_ZgETacH3U14gc1K4Ds2bzxihpLd4A367EuFnDKWVkISCgftnXPvhcOQ0V_z8oCOtpdYEDVFVfnyg_448U6qW249Bax_B5BxleYx',
      initials: 'JT'
    },
    {
      id: 4,
      name: 'Elena Rossi',
      email: 'elena.r@eduacademy.com',
      course: 'UI/UX Design',
      batch: 'Feb 2024 (Morning)',
      status: 'Active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTic1EKcXTeKNPywy9-CUDGH9vtqzkRiBM_cNSNFEXnO3NUDxI453Gk50gqGVr2Rnxi_FJfBZatPmpBYu-FQLIRPcfktuoVc2_S-53CsVZRTjRife5KohovQVBlSpxJfKwO0rflJ_lO7opgiUTzrN1przo70s1qkmlRXmvQ3me0-iAMXHDKZLGffmk_ecFieUGf3X-m-r4t5A9Fd3p27lZBuQ1LQMt3IFDxntnvuQMcVCZR1XY-Dgs4funetXQU167ne6S9Zdmq2yS',
      initials: 'ER'
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [selectedBatch, setSelectedBatch] = useState('All Batches');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: 'Full Stack Web Dev',
    batch: 'Jan 2024 (Morning)'
  });

  const [chartHeights, setChartHeights] = useState({
    mon: '0%',
    tue: '0%',
    wed: '0%',
    thu: '0%',
    fri: '0%',
    sat: '0%',
    sun: '0%'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartHeights({
        mon: '40%',
        tue: '65%',
        wed: '55%',
        thu: '85%',
        fri: '70%',
        sat: '95%',
        sun: '60%'
      });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Filter students based on dropdown options
  const filteredStudents = students.filter(student => {
    const matchesCourse = selectedCourse === 'All Courses' || student.course === selectedCourse;
    const matchesBatch = selectedBatch === 'All Batches' || student.batch.includes(selectedBatch);
    return matchesCourse && matchesBatch;
  });

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
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterStudent = (e) => {
    e.preventDefault();
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.email) {
      alert('Please fill in all required fields.');
      return;
    }

    const fullName = `${newStudent.firstName} ${newStudent.lastName}`;
    const initials = `${newStudent.firstName.charAt(0)}${newStudent.lastName.charAt(0)}`.toUpperCase();

    const createdStudent = {
      id: students.length + 1,
      name: fullName,
      email: newStudent.email,
      course: newStudent.course,
      batch: newStudent.batch,
      status: 'Active',
      image: null,
      initials: initials
    };

    setStudents(prev => [createdStudent, ...prev]);
    setNewStudent({
      firstName: '',
      lastName: '',
      email: '',
      course: 'Full Stack Web Dev',
      batch: 'Jan 2024 (Morning)'
    });
    handleCloseModal();
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the student directory?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleViewProfile = (name) => {
    alert(`Viewing ${name}'s comprehensive student dashboard profiles...`);
  };

  const handleEditProfile = (name) => {
    alert(`Editing academic registers for student ${name}...`);
  };

  return (
    <div className="space-y-stack-lg">
      
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Student Directory</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Manage enrollments, track progress, and update student records.</p>
        </div>
        <button 
          onClick={handleOpenModal}
          className="flex items-center bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:scale-102 transition-all duration-200 shadow-md shrink-0 active:scale-95"
        >
          <span className="material-symbols-outlined mr-2">person_add</span>
          Add New Student
        </button>
      </div>

      {/* Stats Bento Grid (Mini) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg text-left">
        <div className="glass-card p-stack-md rounded-xl border border-outline-variant shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Total Students</p>
            <p className="font-headline-sm text-headline-sm font-bold">{students.length + 1280}</p>
          </div>
        </div>
        <div className="glass-card p-stack-md rounded-xl border border-outline-variant shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Active Now</p>
            <p className="font-headline-sm text-headline-sm font-bold">1,120</p>
          </div>
        </div>
        <div className="glass-card p-stack-md rounded-xl border border-outline-variant shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined">pending</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">On Leave</p>
            <p className="font-headline-sm text-headline-sm font-bold">14</p>
          </div>
        </div>
        <div className="glass-card p-stack-md rounded-xl border border-outline-variant shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Fee Overdue</p>
            <p className="font-headline-sm text-headline-sm font-bold">52</p>
          </div>
        </div>
      </div>

      {/* Main Data Table Container */}
      <div className="glass-card rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-stack-lg text-left">
        <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
          <div className="flex items-center space-x-4">
            <select 
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-sm text-label-sm focus:ring-primary focus:border-primary cursor-pointer"
            >
              <option value="All Courses">All Courses</option>
              <option value="Full Stack Web Dev">Full Stack Web Dev</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Python for Data Science">Python for Data</option>
            </select>
            
            <select 
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-sm text-label-sm focus:ring-primary focus:border-primary cursor-pointer"
            >
              <option value="All Batches">All Batches</option>
              <option value="Jan 2024">Jan 2024</option>
              <option value="Feb 2024">Feb 2024</option>
              <option value="Dec 2023">Dec 2023</option>
            </select>
          </div>
          <div className="flex items-center text-on-surface-variant font-label-sm text-label-sm">
            Showing <span className="font-bold mx-1">1-{filteredStudents.length}</span> of <span class="font-bold mx-1">{filteredStudents.length}</span>
            <div className="flex ml-4 space-x-1">
              <button className="p-1 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
              <button className="p-1 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-stack-md py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Student Name</th>
                <th className="px-stack-md py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Course</th>
                <th className="px-stack-md py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Batch</th>
                <th className="px-stack-md py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-stack-md py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-primary-container/5 transition-colors duration-150 group">
                  <td className="px-stack-md py-4">
                    <div className="flex items-center space-x-3">
                      {student.image ? (
                        <img 
                          className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" 
                          alt={student.name}
                          src={student.image}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-sm">
                          {student.initials}
                        </div>
                      )}
                      <div>
                        <p className="font-label-md text-label-md font-bold text-on-surface">{student.name}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-stack-md py-4">
                    <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${
                      student.course.includes('Web')
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-tertiary-container/20 text-on-tertiary-fixed-variant'
                    }`}>
                      {student.course}
                    </span>
                  </td>
                  <td className="px-stack-md py-4">
                    <p className="font-body-sm text-body-sm">{student.batch}</p>
                  </td>
                  <td className="px-stack-md py-4">
                    <span className={`flex items-center font-label-md text-label-md ${
                      student.status === 'Active' ? 'text-green-600' : 'text-on-surface-variant/70'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${student.status === 'Active' ? 'bg-green-500' : 'bg-outline-variant'}`}></span> 
                      {student.status}
                    </span>
                  </td>
                  <td className="px-stack-md py-4 text-right">
                    <div className="flex justify-end space-x-1">
                      <button 
                        onClick={() => handleViewProfile(student.name)}
                        className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center" 
                        title="View Profile"
                      >
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button 
                        onClick={() => handleEditProfile(student.name)}
                        className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center" 
                        title="Edit"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id, student.name)}
                        className="p-2 text-on-surface-variant hover:text-error transition-colors flex items-center justify-center" 
                        title="Delete"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-on-surface-variant font-light">
                    No matching student profiles found inside this selection filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-stack-md border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest">
          <div className="flex items-center space-x-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant">Rows per page:</label>
            <select className="bg-surface border border-outline-variant rounded-lg px-2 py-1 font-label-sm text-label-sm focus:ring-primary focus:border-primary cursor-pointer">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Recently Added Async Section (Asymmetric Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter text-left">
        
        <div className="lg:col-span-2 glass-card rounded-xl border border-outline-variant p-stack-md shadow-sm">
          <h3 className="font-headline-sm text-headline-sm mb-4">Enrollment Trends</h3>
          <div className="h-64 bg-surface-container/30 rounded-lg flex items-end justify-between px-8 py-4 gap-2 border-b border-outline-variant/35 pb-1">
            <div className="w-full bg-primary-container/40 rounded-t-md transition-all duration-1000 hover:bg-primary" style={{ height: chartHeights.mon }}></div>
            <div className="w-full bg-primary-container/40 rounded-t-md transition-all duration-1000 hover:bg-primary" style={{ height: chartHeights.tue }}></div>
            <div className="w-full bg-primary-container/40 rounded-t-md transition-all duration-1000 hover:bg-primary" style={{ height: chartHeights.wed }}></div>
            <div className="w-full bg-primary-container/40 rounded-t-md transition-all duration-1000 hover:bg-primary" style={{ height: chartHeights.thu }}></div>
            <div className="w-full bg-primary-container/40 rounded-t-md transition-all duration-1000 hover:bg-primary" style={{ height: chartHeights.fri }}></div>
            <div className="w-full bg-primary-container/40 rounded-t-md transition-all duration-1000 hover:bg-primary" style={{ height: chartHeights.sat }}></div>
            <div className="w-full bg-primary-container/40 rounded-t-md transition-all duration-1000 hover:bg-primary" style={{ height: chartHeights.sun }}></div>
          </div>
          <div className="flex justify-between mt-4 font-label-sm text-label-sm text-on-surface-variant px-4">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="glass-card rounded-xl border border-outline-variant p-stack-md shadow-sm bg-primary/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-label-md text-label-md font-bold uppercase tracking-wide text-primary">New Applications</h3>
            <span className="bg-primary text-on-primary px-2 py-0.5 rounded-full text-[10px] font-bold">12 NEW</span>
          </div>
          <div className="space-y-4">
            
            <div 
              onClick={() => navigate('/admin/admissions')}
              className="flex items-center space-x-3 p-2 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">AW</div>
              <div className="flex-grow">
                <p className="font-label-md text-label-md font-bold">Alex Wong</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-light">Cyber Security</p>
              </div>
              <span className="material-symbols-outlined text-primary-container font-bold">arrow_forward</span>
            </div>

            <div 
              onClick={() => navigate('/admin/admissions')}
              className="flex items-center space-x-3 p-2 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">KL</div>
              <div className="flex-grow">
                <p className="font-label-md text-label-md font-bold">Kate Lindon</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-light">Mobile Dev</p>
              </div>
              <span className="material-symbols-outlined text-primary-container font-bold">arrow_forward</span>
            </div>

            <div 
              onClick={() => navigate('/admin/admissions')}
              className="flex items-center space-x-3 p-2 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">RS</div>
              <div className="flex-grow">
                <p className="font-label-md text-label-md font-bold">Ryan Smith</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-light">React Native</p>
              </div>
              <span className="material-symbols-outlined text-primary-container font-bold">arrow_forward</span>
            </div>

          </div>
          <button 
            onClick={() => navigate('/admin/admissions')}
            className="w-full mt-6 py-2 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95 duration-150 font-bold"
          >
            Review All
          </button>
        </div>

      </div>

      {/* Modal for Adding Student */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low text-left">
              <h3 className="font-headline-sm text-headline-sm">Enroll New Student</h3>
              <button 
                className="p-2 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleRegisterStudent} className="p-stack-md space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">First Name</label>
                  <input 
                    name="firstName"
                    value={newStudent.firstName}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    placeholder="Enter first name" 
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">Last Name</label>
                  <input 
                    name="lastName"
                    value={newStudent.lastName}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                    placeholder="Enter last name" 
                    type="text"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">Email Address</label>
                <input 
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest" 
                  placeholder="student@example.com" 
                  type="email"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">Course Selection</label>
                  <select 
                    name="course"
                    value={newStudent.course}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                  >
                    <option value="Full Stack Web Dev">Full Stack Web Dev</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Python for Data Science">Python for Data Science</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 block uppercase tracking-wider">Batch Allocation</label>
                  <select 
                    name="batch"
                    value={newStudent.batch}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant rounded-lg focus:border-primary focus:ring-primary py-2.5 px-3 bg-surface-container-lowest cursor-pointer"
                  >
                    <option value="Jan 2024 (Morning)">Jan 2024 (Morning)</option>
                    <option value="Feb 2024 (Evening)">Feb 2024 (Evening)</option>
                    <option value="Jan 2024 (Weekend)">Jan 2024 (Weekend)</option>
                  </select>
                </div>
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
                  Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Students;
