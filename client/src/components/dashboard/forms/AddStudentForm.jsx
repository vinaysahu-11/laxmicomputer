import React, { useState } from 'react';

const AddStudentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Full Name</label>
        <input 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
          placeholder="Student name"
          required 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Email Address</label>
          <input 
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
            placeholder="name@gmail.com"
            required 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Phone Number</label>
          <input 
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
            placeholder="10 digit mobile"
            required 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Syllabus Preference / Course</label>
        <select 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring appearance-none cursor-pointer"
          required
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
        >
          <option value="" disabled>Select preferred stream</option>
          <option value="web-dev">Full Stack Web Development</option>
          <option value="data-science">Data Science & AI</option>
          <option value="python">Python Programming</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Residential Address</label>
        <textarea 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
          placeholder="City, state and pin"
          rows="3"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="pt-2">
        <button className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow transition-all active:scale-95" type="submit">
          Save Student Profile
        </button>
      </div>
    </form>
  );
};

export default AddStudentForm;
