import React from 'react';

const CourseProgressCard = ({ course }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md space-y-3">
      <div>
        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight">{course.title}</h4>
        <span className="text-[10px] text-on-surface-variant font-medium mt-1 block">Cohort: {course.cohort}</span>
      </div>

      <div>
        <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/15">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1.5">
          <span>Lectures: {course.completed} / {course.total}</span>
          <span className="text-primary">{course.progress}% Completed</span>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;
