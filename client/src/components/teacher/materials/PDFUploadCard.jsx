import React from 'react';

const PDFUploadCard = () => {
  return (
    <div className="glass-card rounded-xl p-4 shadow-sm border border-outline-variant/30 text-left text-xs">
      <div className="flex items-center gap-2 text-primary font-bold">
        <span className="material-symbols-outlined text-lg">menu_book</span>
        <span>Reference_Syllabus.pdf</span>
      </div>
      <p className="text-on-surface-variant font-light mt-1.5">Size: 1.2 MB | Format: PDF Document</p>
    </div>
  );
};

export default PDFUploadCard;
