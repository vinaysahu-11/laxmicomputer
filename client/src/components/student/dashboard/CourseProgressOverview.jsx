import React from 'react';

const CourseProgressOverview = () => {
  const courses = [
    {
      id: 'cp-1',
      title: 'Full Stack Web Development Certification',
      duration: '12 Months',
      progress: 78, // percentage
      completedLectures: 35,
      totalLectures: 45,
      upcomingTopic: 'Redux State Slices & Thunk middleware'
    },
    {
      id: 'cp-2',
      title: 'Database Management Systems - Masterclass',
      duration: '6 Months',
      progress: 45, // percentage
      completedLectures: 18,
      totalLectures: 40,
      upcomingTopic: 'Relational Calculus & Query Optimizations'
    }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">menu_book</span>
        <span>Course Progress Overview</span>
      </h3>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="space-y-2 p-3 bg-surface-container-low rounded-lg border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
            <div className="flex justify-between items-start gap-2 flex-wrap">
              <div>
                <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight">{course.title}</h4>
                <span className="text-[10px] text-on-surface-variant font-medium mt-1 block">Course Duration: {course.duration}</span>
              </div>
              <span className="text-primary font-bold text-sm bg-primary-container/10 px-2 py-0.5 rounded border border-primary-container/25 shrink-0">
                {course.progress}% Completed
              </span>
            </div>

            {/* Progress Bar Container */}
            <div>
              <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/15">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1.5">
                <span>Lectures: {course.completedLectures} / {course.totalLectures}</span>
                <span>Next up: {course.upcomingTopic.slice(0, 22)}...</span>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/15 flex justify-between items-center text-[10px] text-on-surface-variant">
              <span className="font-medium">Active Topic: <strong className="text-on-surface">{course.upcomingTopic}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgressOverview;
