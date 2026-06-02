import React from 'react';
import WelcomeCard from '../../components/teacher/dashboard/WelcomeCard';
import StudentOverview from '../../components/teacher/dashboard/StudentOverview';
import UpcomingClasses from '../../components/teacher/dashboard/UpcomingClasses';
import AttendanceOverview from '../../components/teacher/dashboard/AttendanceOverview';
import PendingAssignments from '../../components/teacher/dashboard/PendingAssignments';
import RecentActivities from '../../components/teacher/dashboard/RecentActivities';

const Dashboard = () => {
  return (
    <div className="space-y-gutter text-left">
      
      {/* Welcome & Stats Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2">
          <WelcomeCard />
        </div>
        <div className="lg:col-span-1">
          <StudentOverview />
        </div>
      </section>

      {/* Schedule, Analytics & Student Logs Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Today's Schedule Timeline (Left, Span 4) */}
        <div className="xl:col-span-4">
          <UpcomingClasses />
        </div>

        {/* Analytics & Table Logs (Right, Span 8) */}
        <div className="xl:col-span-8 space-y-gutter">
          {/* Subgrid: Attendance Circular Chart & Python Exams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <AttendanceOverview />
            <PendingAssignments />
          </div>

          {/* Recent Student Activities Table */}
          <RecentActivities />
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
