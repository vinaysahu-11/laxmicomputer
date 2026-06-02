import React, { useState, useEffect } from 'react';

const Teachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 'FAC-2023-089',
      name: 'James Wilson',
      specialty: 'Cybersecurity',
      joined: 'Mar 2023',
      email: 'j.wilson@eduacademy.com',
      initials: 'JW',
      color: 'bg-tertiary-container'
    },
    {
      id: 'FAC-2022-114',
      name: 'Amara Kalu',
      specialty: 'Mobile Development',
      joined: 'Oct 2022',
      email: 'a.kalu@eduacademy.com',
      initials: 'AK',
      color: 'bg-primary-container'
    },
    {
      id: 'FAC-2023-005',
      name: 'Simon Miller',
      specialty: 'Cloud Computing',
      joined: 'Jan 2023',
      email: 's.miller@eduacademy.com',
      initials: 'SM',
      color: 'bg-secondary-container text-on-secondary-container'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    specialty: 'Full Stack Development',
    joinedDate: '',
    departments: {
      cs: true,
      it: false,
      media: false
    }
  });

  const [availabilityHeights, setAvailabilityHeights] = useState({
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
      setAvailabilityHeights({
        mon: '75%',
        tue: '100%',
        wed: '50%',
        thu: '83%',
        fri: '66%',
        sat: '33%',
        sun: '25%'
      });
    }, 150);
    return () => clearTimeout(timer);
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
    setNewTeacher(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (deptKey) => {
    setNewTeacher(prev => ({
      ...prev,
      departments: {
        ...prev.departments,
        [deptKey]: !prev.departments[deptKey]
      }
    }));
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.email) {
      alert('Please fill in all required fields.');
      return;
    }

    const nameParts = newTeacher.name.split(' ');
    const initials = nameParts.map(p => p.charAt(0)).join('').toUpperCase().substring(0, 2);

    const yearJoined = newTeacher.joinedDate ? newTeacher.joinedDate.substring(0, 4) : '2026';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthJoined = newTeacher.joinedDate ? monthNames[parseInt(newTeacher.joinedDate.substring(5, 7)) - 1] : 'Jun';

    const createdTeacher = {
      id: `FAC-${yearJoined}-${100 + teachers.length + 1}`,
      name: newTeacher.name,
      specialty: newTeacher.specialty,
      joined: `${monthJoined} ${yearJoined}`,
      email: newTeacher.email,
      initials: initials || 'IN',
      color: 'bg-primary-container'
    };

    setTeachers(prev => [...prev, createdTeacher]);
    setNewTeacher({
      name: '',
      email: '',
      specialty: 'Full Stack Development',
      joinedDate: '',
      departments: {
        cs: true,
        it: false,
        media: false
      }
    });
    handleCloseModal();
  };

  const handleEditTeacher = (name) => {
    alert(`Editing schedule and catalog structures for Instructor ${name}...`);
  };

  const handleMessageTeacher = (name) => {
    alert(`Opening direct portal chat channel to ${name}...`);
  };

  const handleManageSchedule = (name) => {
    alert(`Opening dynamic calendar scheduler for ${name}...`);
  };

  return (
    <div className="space-y-stack-lg">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Faculty Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Oversee and organize the academy's expert instructors and teaching staff.</p>
        </div>
        <button 
          onClick={handleOpenModal}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:scale-102 transition-transform shadow-md shrink-0 active:scale-95 duration-150"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add New Instructor
        </button>
      </div>

      {/* Dashboard Stats for Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg text-left">
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant card-lift">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Faculty</p>
          <h3 className="font-headline-md text-headline-md text-primary font-bold">48</h3>
          <p className="text-[12px] text-green-600 flex items-center mt-1 font-semibold">
            <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
            +3 this month
          </p>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant card-lift">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Courses</p>
          <h3 className="font-headline-md text-headline-md text-tertiary font-bold">112</h3>
          <p className="text-[12px] text-on-surface-variant mt-1">Average 2.3 per teacher</p>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant card-lift">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Rating</p>
          <h3 className="font-headline-md text-headline-md text-orange-500 font-bold">4.8/5</h3>
          <div className="flex mt-1 text-orange-400">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined text-[14px]">star_half</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant card-lift">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">On Leave</p>
          <h3 className="font-headline-md text-headline-md text-error font-bold">2</h3>
          <p className="text-[12px] text-on-surface-variant mt-1 font-light">Returning next week</p>
        </div>
      </div>

      {/* Bento Grid Faculty List */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Teacher Card 1 (Large Featured) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col md:flex-row group">
          <div className="w-full md:w-1/3 relative h-48 md:h-auto overflow-hidden">
            <img 
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              alt="A professional headshot of a female computer science professor"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8R1xHQ-91rAG8uSNBeP8yHYKUvREHaA3Y1l6XtLnborfK6wjOzXjAi2caaJ_X1b-mJph9n-PbvdvgxzvtAq5yuieoLhJ7SiVs7Jtc3jio2RV9s0MnkMwab22sJQ95FUfyCoTnB8V38MckRy-3SwqSYd1sqHAk3HdBZWNRYJceiCjGUO5NCHsAk2iQmSthYtrngxxh1ERVkhh958px_EA90kE-nk6RwPh78o32g8vMihc_OpVq3n0jjmGvKmQHOuufg_svTA6TNi8c"
            />
          </div>
          <div className="p-stack-lg flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm mb-2 inline-block font-semibold">Department Head</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Dr. Sarah Jenkins</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Senior Full Stack Architect</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleMessageTeacher('Dr. Sarah Jenkins')}
                  className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">mail</span>
                </button>
                <button 
                  className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Courses</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[11px] font-bold">Advanced React</span>
                  <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[11px] font-bold">Node.js API Design</span>
                </div>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Experience</p>
                <p className="font-body-sm text-body-sm text-on-surface font-light">12 Years Professional</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => handleMessageTeacher('Dr. Sarah Jenkins')}
                className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline underline-offset-4 font-semibold"
              >
                View Profile <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Teacher Card 2 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-md flex flex-col justify-between card-lift">
          <div className="flex items-center gap-4 mb-4">
            <img 
              className="w-16 h-16 rounded-full object-cover border border-outline-variant/35" 
              alt="Male data scientist instructor"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCPsXZ6JwFWuVueUldHpWIO_8epWmYNAOTTM5wa6S_LG__Xwsms-Meq_guYhiGtlGHQ6lNRcU_5oD6KFlCWzKNpq08RuS3HguzvFNOLmE73tBo9Vgmi1pIyg5PhYYQVsxJxb-dEizVfYvVHBTwA8w78-IBvlTFUHYcvB7_cSAWMT_7MjtrxK-vVeq4oFEL3EoHHtMVFDq0rC2G_DNAb26x4zzwFmIIVF0z2qQkTihrpeAxeBCUAEUVS-hoCtdfZ7u4FW2eE-MuUKwP"
            />
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Mark Thompson</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-light">Data Science &amp; AI</p>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/50">
              <span className="text-on-surface-variant text-[13px]">Assigned Courses</span>
              <span className="font-label-md text-on-surface font-bold">4</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/50">
              <span className="text-on-surface-variant text-[13px]">Next Session</span>
              <span className="font-label-md text-on-surface font-semibold">2:00 PM Today</span>
            </div>
          </div>
          <div className="mt-4 pt-4">
            <button 
              onClick={() => handleManageSchedule('Mark Thompson')}
              className="w-full py-2 border border-primary text-primary rounded-lg font-label-md hover:bg-primary/5 transition-colors font-bold active:scale-98 duration-100"
            >
              Manage Schedule
            </button>
          </div>
        </div>

        {/* Teacher Card 3 */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-md flex flex-col justify-between card-lift">
          <div className="flex items-center gap-4 mb-4">
            <img 
              className="w-16 h-16 rounded-full object-cover border border-outline-variant/35" 
              alt="Elena Rodriguez UI UX"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7pePi1rnWbPKD25SfoQGYU04C-sE4mXqijIJS-0htGqZ2NcMmgNmVmrl0V8OHOih7pYo7zuL3SFttVnNBMQuw1SDmuUVLy_NItm2Toe8gjk-bPVzjtyg2_7wvvPvh5JWL4iEqovIHksZ2M5KJBX5dxF_4OOlmKLVAAcgKeJ5a0ThV8gVdYScC-cMt3EPVBfR7LP7TRmcC_ZX-mvDZnhR-n9OjyQNJDmAl4wBxkB2eRSFSkO9Y-ASaPNwBgIMT37HvtJ4E4vOHQ6nd"
            />
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Elena Rodriguez</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-light">UI/UX Lead</p>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/50">
              <span className="text-on-surface-variant text-[13px]">Active Projects</span>
              <span className="font-label-md text-on-surface font-bold">8 Teams</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/50">
              <span className="text-on-surface-variant text-[13px]">Status</span>
              <span className="text-green-600 font-label-md flex items-center gap-1 font-bold">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span> Online
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4">
            <button 
              onClick={() => handleMessageTeacher('Elena Rodriguez')}
              className="w-full py-2 border border-primary text-primary rounded-lg font-label-md hover:bg-primary/5 transition-colors font-bold active:scale-98 duration-100"
            >
              Message
            </button>
          </div>
        </div>

        {/* Teacher Card 4 (Horizontal Wide) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Staff Availability Overview</h4>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full"></span> <span class="text-[12px] text-on-surface-variant mr-4">Teaching</span>
              <span className="w-3 h-3 bg-secondary-container rounded-full"></span> <span class="text-[12px] text-on-surface-variant">Office Hours</span>
            </div>
          </div>
          
          {/* Simplified Visual Graph Placeholder */}
          <div className="h-32 w-full flex items-end gap-2 px-2 border-b border-outline-variant/30 pb-1">
            <div className="flex-grow bg-primary/20 rounded-t-lg relative group transition-all duration-1000" style={{ height: availabilityHeights.mon }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface shadow-md p-1 rounded hidden group-hover:block text-[10px] whitespace-nowrap z-10 border border-outline-variant">Mon: 75%</div>
            </div>
            <div className="flex-grow bg-primary rounded-t-lg transition-all duration-1000" style={{ height: availabilityHeights.tue }}></div>
            <div className="flex-grow bg-primary/40 rounded-t-lg transition-all duration-1000" style={{ height: availabilityHeights.wed }}></div>
            <div className="flex-grow bg-primary rounded-t-lg transition-all duration-1000" style={{ height: availabilityHeights.thu }}></div>
            <div className="flex-grow bg-primary/60 rounded-t-lg transition-all duration-1000" style={{ height: availabilityHeights.fri }}></div>
            <div className="flex-grow bg-secondary-container rounded-t-lg transition-all duration-1000" style={{ height: availabilityHeights.sat }}></div>
            <div className="flex-grow bg-secondary-container rounded-t-lg transition-all duration-1000" style={{ height: availabilityHeights.sun }}></div>
          </div>
          <div className="flex justify-between mt-2 px-2 font-label-sm text-label-sm text-on-surface-variant">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

      </div>

      {/* List Table for Remaining Teachers */}
      <div className="mt-stack-lg bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden text-left shadow-sm">
        <div className="px-stack-lg py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h4 className="font-headline-sm text-headline-sm text-on-surface">Faculty Directory</h4>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
            <button 
              onClick={() => alert('Downloading comprehensive faculty roster CSV sheet...')}
              className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/30 text-on-surface-variant font-label-sm uppercase">
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Instructor</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Specialty</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Joined</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Contact</th>
                <th className="px-stack-lg py-4 font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-body-sm font-light text-on-surface-variant">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-stack-lg py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${teacher.color}`}>
                        {teacher.initials}
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-bold">{teacher.name}</p>
                        <p className="text-[12px] text-on-surface-variant">ID: {teacher.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-stack-lg py-4 font-body-sm text-body-sm text-on-surface">{teacher.specialty}</td>
                  <td className="px-stack-lg py-4">{teacher.joined}</td>
                  <td className="px-stack-lg py-4">{teacher.email}</td>
                  <td className="px-stack-lg py-4">
                    <button 
                      onClick={() => handleEditTeacher(teacher.name)}
                      className="text-primary hover:text-on-primary-container flex items-center justify-center p-1"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-stack-lg py-4 flex justify-center border-t border-outline-variant bg-surface-container-low/30">
          <button 
            onClick={() => alert('Loading secondary archives of teaching faculty members...')}
            className="font-label-md text-label-md text-primary flex items-center gap-2 hover:gap-3 transition-all font-bold"
          >
            Load 15 More <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>

      {/* Modal: Add New Teacher */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in">
            <div className="px-stack-lg py-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low text-left">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Add New Faculty Member</h3>
              <button 
                className="p-2 hover:bg-surface-container rounded-full transition-colors flex items-center justify-center" 
                onClick={handleCloseModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddTeacher} className="p-stack-lg space-y-6 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Full Name</label>
                  <input 
                    name="name"
                    value={newTeacher.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. Dr. Emily Watson" 
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Email Address</label>
                  <input 
                    name="email"
                    value={newTeacher.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest" 
                    placeholder="e.g. e.watson@eduacademy.com" 
                    type="email"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Primary Specialty</label>
                  <select 
                    name="specialty"
                    value={newTeacher.specialty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm appearance-none bg-surface-container-lowest cursor-pointer"
                  >
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Joining Date</label>
                  <input 
                    name="joinedDate"
                    value={newTeacher.joinedDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm bg-surface-container-lowest cursor-pointer" 
                    type="date"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Assigned Department</label>
                <div className="flex flex-wrap gap-3 p-4 bg-surface-container-low rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      checked={newTeacher.departments.cs}
                      onChange={() => handleCheckboxChange('cs')}
                      className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer" 
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">Computer Science</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      checked={newTeacher.departments.it}
                      onChange={() => handleCheckboxChange('it')}
                      className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer" 
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">Information Technology</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      checked={newTeacher.departments.media}
                      onChange={() => handleCheckboxChange('media')}
                      className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer" 
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">Digital Media</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30 mt-6">
                <button 
                  className="px-6 py-2 border border-outline-variant text-on-surface-variant rounded-lg font-label-md hover:bg-surface-container transition-colors" 
                  onClick={handleCloseModal} 
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="px-8 py-2 bg-primary text-on-primary rounded-lg font-label-md shadow-lg hover:scale-102 transition-transform active:scale-95 duration-100" 
                  type="submit"
                >
                  Create Instructor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Teachers;
