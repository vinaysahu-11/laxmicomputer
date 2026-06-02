import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-surface border border-outline-variant/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left space-y-4">
      <div className="flex justify-between items-start">
        <span className="material-symbols-outlined text-3xl text-primary bg-primary/10 p-3 rounded-2xl">menu_book</span>
        <span className="text-[10px] bg-primary-fixed text-on-primary-fixed-variant px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
          {course?.duration || '6 Months'}
        </span>
      </div>
      <div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{course?.title || 'Course Title'}</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2 font-light">
          {course?.description || 'Course detailed description and syllabus parameters.'}
        </p>
      </div>
      <div className="pt-2 border-t border-outline-variant/40 flex justify-between items-center text-xs text-on-surface-variant font-light">
        <span>Students: <strong>{course?.enrolledCount || '0'}</strong></span>
        <span>Fee: <strong>₹{course?.fee || '0'}</strong></span>
      </div>
    </div>
  );
};

export default CourseCard;
