import React, { useState } from 'react';

const AddCourseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    fee: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Course Name / Title</label>
        <input 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
          placeholder="e.g. Masterclass in Python"
          required 
          type="text" 
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Duration (e.g. 6 Months)</label>
          <input 
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
            placeholder="6 Months"
            required 
            type="text" 
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Admission Fee (₹)</label>
          <input 
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
            placeholder="₹15000"
            required 
            type="number" 
            value={formData.fee}
            onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider font-bold">Detailed Curriculum Overview</label>
        <textarea 
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl font-body-md text-on-surface form-focus-ring" 
          placeholder="Detailed syllabus modules and certification targets"
          rows="3"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="pt-2">
        <button className="w-full bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-surface-tint shadow transition-all active:scale-95" type="submit">
          Publish Course Catalog
        </button>
      </div>
    </form>
  );
};

export default AddCourseForm;
