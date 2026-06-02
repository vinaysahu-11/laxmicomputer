import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-outline-variant/60 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 animate-scale-in">
        <span className="material-symbols-outlined text-error text-5xl bg-error-container/20 p-4 rounded-full">delete_forever</span>
        
        <div className="space-y-2">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Delete Record?</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant font-light">
            Are you sure you want to delete **{itemName || 'this item'}**? This process cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            onClick={onClose} 
            className="flex-1 bg-secondary-container text-on-secondary-container font-label-md py-3 rounded-xl hover:bg-outline-variant/40 border border-outline-variant/20 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 bg-error text-on-error font-label-md py-3 rounded-xl hover:bg-red-700 shadow transition-all active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
