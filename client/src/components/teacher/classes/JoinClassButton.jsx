import React from 'react';

const JoinClassButton = () => {
  return (
    <button 
      onClick={() => alert('Starting live stream server... connecting proctoring APIs...')}
      className="bg-primary hover:bg-primary-container text-on-primary px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none outline-none flex items-center gap-1 shadow-sm"
    >
      <span className="material-symbols-outlined text-xs font-semibold">video_camera_front</span>
      Launch Stream
    </button>
  );
};

export default JoinClassButton;
