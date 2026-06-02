import React, { useState } from 'react';

const AdmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    phone: '',
    courseInterest: '',
    status: 'Inquiry'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Candidate Name</label>
        <input 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
          placeholder="Enter full name"
          required 
          type="text" 
          value={formData.candidateName}
          onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Email Address</label>
          <input 
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
            placeholder="candidate@gmail.com"
            required 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Contact Number</label>
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
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Course Selection</label>
        <select 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring appearance-none cursor-pointer"
          required
          value={formData.courseInterest}
          onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
        >
          <option value="" disabled>Choose target course</option>
          <option value="web-dev">Full Stack Web Development</option>
          <option value="data-science">Data Science & AI</option>
          <option value="python">Python Programming</option>
        </select>
      </div>

      <div className="pt-2">
        <button className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow transition-all active:scale-95" type="submit">
          Record Admission Application
        </button>
      </div>
    </form>
  );
};

export default AdmissionForm;
