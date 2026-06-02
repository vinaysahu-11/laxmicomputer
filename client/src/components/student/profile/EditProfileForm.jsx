import React, { useState } from 'react';

const EditProfileForm = () => {
  const [name, setName] = useState('Sarah Jenkins');
  const [title, setTitle] = useState('Software Engineering Student');
  const [mobile, setMobile] = useState('+1 (555) 892-4512');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Update personal changes');
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">edit</span>
        <span>Edit Personal Profile</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Student Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Mobile Number</label>
          <input 
            type="text" 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md bg-surface" 
          />
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            className="bg-primary hover:bg-surface-tint text-on-primary font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-sm transition-all"
          >
            Save Personal Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
