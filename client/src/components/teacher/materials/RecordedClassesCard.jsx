import React from 'react';

const RecordedClassesCard = () => {
  return (
    <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-left text-xs">
      <div className="flex items-center gap-2 text-primary font-bold">
        <span className="material-symbols-outlined text-lg">video_library</span>
        <span>Lab Session 03 Stream.mp4</span>
      </div>
      <p className="text-on-surface-variant font-light mt-1.5">Size: 420 MB | Duration: 1 Hour 20 Min</p>
    </div>
  );
};

export default RecordedClassesCard;
