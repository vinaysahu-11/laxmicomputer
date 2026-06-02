import React from 'react';

const FloatingActions = () => {
  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-4 items-end z-40">
      <div className="group flex items-center gap-3">
        <span className="opacity-0 group-hover:opacity-100 bg-surface-container-highest px-3 py-1 rounded shadow-sm text-label-md transition-opacity">Admission Now</span>
        <button className="bg-secondary-container text-on-secondary-container rounded-full p-4 shadow-lg hover:scale-110 hover:shadow-xl transition-all active:scale-90">
          <span className="material-symbols-outlined">edit_note</span>
        </button>
      </div>
      <div className="group flex items-center gap-3">
        <span className="opacity-0 group-hover:opacity-100 bg-surface-container-highest px-3 py-1 rounded shadow-sm text-label-md transition-opacity">WhatsApp Chat</span>
        <button className="bg-secondary-container text-on-secondary-container rounded-full p-4 shadow-lg hover:scale-110 hover:shadow-xl transition-all active:scale-90">
          <span className="material-symbols-outlined">chat</span>
        </button>
      </div>
      <div className="group flex items-center gap-3">
        <span className="opacity-0 group-hover:opacity-100 bg-surface-container-highest px-3 py-1 rounded shadow-sm text-label-md transition-opacity">Call Us</span>
        <button className="bg-secondary-container text-on-secondary-container rounded-full p-4 shadow-lg hover:scale-110 hover:shadow-xl transition-all active:scale-90">
          <span className="material-symbols-outlined">call</span>
        </button>
      </div>
      <div className="group flex items-center gap-3">
        <span className="opacity-0 group-hover:opacity-100 bg-surface-container-highest px-3 py-1 rounded shadow-sm text-label-md transition-opacity">Location</span>
        <button className="bg-secondary-container text-on-secondary-container rounded-full p-4 shadow-lg hover:scale-110 hover:shadow-xl transition-all active:scale-90">
          <span className="material-symbols-outlined">distance</span>
        </button>
      </div>
    </div>
  );
};

export default FloatingActions;
