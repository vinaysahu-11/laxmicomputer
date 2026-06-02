import React, { useState } from 'react';

const AddTeacherForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    bio: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Teacher Full Name</label>
        <input 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
          placeholder="Instructor name"
          required 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Work Email</label>
          <input 
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
            placeholder="instructor@laxmi.com"
            required 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Mobile Number</label>
          <input 
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
            placeholder="10 digit phone"
            required 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Department Specialty</label>
        <input 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
          placeholder="e.g. Accounting, Web Development"
          required 
          type="text" 
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-bold">Faculty Bio & Credentials</label>
        <textarea 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
          placeholder="Brief professional profile summary"
          rows="3"
          required
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
      </div>

      <div className="pt-2">
        <button className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow transition-all active:scale-95" type="submit">
          Register Faculty Profile
        </button>
      </div>
    </form>
  );
};

export default AddTeacherForm;
