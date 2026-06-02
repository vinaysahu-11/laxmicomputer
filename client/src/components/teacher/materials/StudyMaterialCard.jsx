import React from 'react';

const StudyMaterialCard = ({ title, course, format, size, timeAgo, coverImage, onPreview, onDownload }) => {
  return (
    <div className="group border border-outline-variant rounded-2xl overflow-hidden hover:shadow-md transition-all hover:border-primary/45 bg-white text-left">
      {/* Visual Cover */}
      <div className="aspect-video relative overflow-hidden bg-slate-100 select-none">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={coverImage} 
          alt={title} 
        />
        
        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={onPreview}
            className="bg-white hover:bg-primary text-primary hover:text-white p-2.5 rounded-full cursor-pointer transition-colors border-none outline-none active:scale-90"
          >
            <span className="material-symbols-outlined text-lg font-bold">
              {format === 'MP4' ? 'play_arrow' : 'visibility'}
            </span>
          </button>
          <button 
            onClick={onDownload}
            className="bg-white hover:bg-primary text-primary hover:text-white p-2.5 rounded-full cursor-pointer transition-colors border-none outline-none active:scale-90"
          >
            <span className="material-symbols-outlined text-lg font-bold">
              {format === 'MP4' ? 'share' : 'download'}
            </span>
          </button>
        </div>

        {/* Top-Right Format Badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-tight shadow-sm ${
            format === 'PDF' 
              ? 'bg-primary-container/90 text-on-primary-container backdrop-blur-md border border-primary-container/30'
              : 'bg-secondary text-on-secondary border border-outline-variant/30'
          }`}>
            {format}
          </span>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-4 text-xs font-semibold">
        <p className="font-label-sm text-primary mb-1">{course}</p>
        <h5 className="font-headline-sm text-[16px] text-on-surface truncate font-bold" title={title}>
          {title}
        </h5>
        <div className="mt-4 flex items-center justify-between text-on-surface-variant text-[11px] font-normal leading-none">
          <span>{size}</span>
          <span>Uploaded {timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialCard;
