import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between h-44">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
      
      <div>
        <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded border border-outline-variant/20">
          {course.category || 'Diploma'}
        </span>
        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight mt-2.5">{course.title}</h4>
        <p className="text-[11px] text-on-surface-variant mt-1.5 font-light">Instructor: <strong className="text-on-surface font-semibold">{course.instructor}</strong></p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
        <span>Syllabus: {course.progress || 0}% Done</span>
        <button className="text-primary hover:underline font-bold text-xs">Enter Course</button>
      </div>
    </div>
  );
};

export default CourseCard;
