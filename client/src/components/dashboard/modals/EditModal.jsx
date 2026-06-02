import React from 'react';

const EditModal = ({ isOpen, onClose, onSave, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-outline-variant/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-scale-in">
        <div className="flex justify-between items-center pb-2 border-b border-outline-variant/40">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{title || 'Edit Record'}</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="py-2">
          {children}
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant/40">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 bg-secondary-container text-on-secondary-container font-label-md rounded-xl hover:bg-outline-variant/40 border border-outline-variant/20 transition-all active:scale-95 text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={onSave} 
            className="px-5 py-2.5 bg-primary text-on-primary font-label-md rounded-xl hover:bg-surface-tint shadow transition-all active:scale-95 text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
