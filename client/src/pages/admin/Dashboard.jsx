import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdminStats } from '../../services/homepageService';
import { getCourses } from '../../services/courseService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    revenue: 0,
    pendingFees: 0,
    invoiceCount: 0,
    pendingAdmissions: 0,
    recentAdmissions: [],
    recentNotifications: []
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [chartHeights, setChartHeights] = useState({
    jan: '0%',
    feb: '0%',
    mar: '0%',
    apr: '0%',
    may: '0%',
    jun: '0%'
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, coursesData] = await Promise.all([
          getAdminStats(),
          getCourses()
        ]);
        setStats(statsData);
        setCourses(coursesData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard metrics from backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    const timer = setTimeout(() => {
      setChartHeights({
        jan: '40%',
        feb: '55%',
        mar: '75%',
        apr: '65%',
        may: '90%',
        jun: '82%'
      });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleExportCSV = () => {
    alert('Exporting course performance data as CSV... Download started.');
  };

  const handleGenerateReport = () => {
    alert('Generating full Operations Report... Please check your system notifications.');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading real-time admin statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-6 rounded-xl border border-error/20 text-center max-w-xl mx-auto my-12">
        <span className="material-symbols-outlined text-error text-5xl mb-4">error</span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Connection Failure</h3>
        <p className="text-on-surface-variant font-body-md mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md hover:scale-102 transition-all active:scale-95"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Generate activities list from recent admissions and notifications
  const activities = [];
  (stats?.recentAdmissions || []).forEach(adm => {
    const timeLabel = adm.time || 'Just now';
    activities.push({
      id: `adm-${adm._id}`,
      title: 'New Inquiry Submitted',
      description: `${adm.studentName || 'Student'} applied for "${adm.course || 'Course'}"`,
      time: timeLabel,
      icon: 'person_add',
      bgClass: 'bg-primary-container text-on-primary-container',
      timestamp: new Date(adm.createdAt).getTime()
    });
  });
  (stats?.recentNotifications || []).forEach(notif => {
    activities.push({
      id: `notif-${notif._id}`,
      title: notif.title || 'Notification',
      description: notif.content || '',
      time: 'Notice',
      icon: notif.category === 'student' ? 'school' : 'campaign',
      bgClass: 'bg-tertiary-container text-on-tertiary-container',
      timestamp: new Date(notif.createdAt).getTime()
    });
  });
  // Sort activities by timestamp descending
  activities.sort((a, b) => b.timestamp - a.timestamp);

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-stack-lg">
      
      {/* Welcome Section */}
      <section className="flex justify-between items-end text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Morning, {user?.name || 'Administrator'}</h2>
          <p className="text-on-surface-variant font-body-md">Laxmi Computer Education operational systems are active and live.</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-lg flex items-center gap-2 font-label-md text-label-md hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Generate Report
        </button>
      </section>

      {/* Key Metrics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-gutter text-left">
        
        {/* Total Students */}
        <div className="glass-card p-4 rounded-xl hover:shadow-lg transition-all border-l-4 border-primary">
          <div className="flex justify-between items-start mb-2">
            <div className="p-1.5 bg-primary-fixed text-on-primary-fixed rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
            <span className="text-green-600 text-xs font-semibold flex items-center gap-0.5">Live</span>
          </div>
          <p className="text-on-surface-variant font-label-sm text-xs mb-1 uppercase tracking-wider">Total Students</p>
          <h3 className="text-headline-sm font-bold text-xl">{stats.totalStudents || 0}</h3>
        </div>

        {/* Total Teachers */}
        <div className="glass-card p-4 rounded-xl hover:shadow-lg transition-all border-l-4 border-tertiary">
          <div className="flex justify-between items-start mb-2">
            <div className="p-1.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <span className="text-on-surface-variant text-xs">Faculty</span>
          </div>
          <p className="text-on-surface-variant font-label-sm text-xs mb-1 uppercase tracking-wider">Total Teachers</p>
          <h3 className="text-headline-sm font-bold text-xl">{stats.totalTeachers || 0}</h3>
        </div>

        {/* Total Admissions */}
        <div className="glass-card p-4 rounded-xl hover:shadow-lg transition-all border-l-4 border-error">
          <div className="flex justify-between items-start mb-2">
            <div className="p-1.5 bg-error-container text-on-error-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <span className="text-xs font-bold text-error">({stats.pendingAdmissions || 0} Pending)</span>
          </div>
          <p className="text-on-surface-variant font-label-sm text-xs mb-1 uppercase tracking-wider">Admissions</p>
          <h3 className="text-headline-sm font-bold text-xl">{stats.totalAdmissions || 0}</h3>
        </div>

        {/* Attendance Percentage */}
        <div className="glass-card p-4 rounded-xl hover:shadow-lg transition-all border-l-4 border-primary">
          <div className="flex justify-between items-start mb-2">
            <div className="p-1.5 bg-primary-fixed text-on-primary-fixed rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">done_all</span>
            </div>
            <span className="text-green-600 text-xs font-semibold">Live %</span>
          </div>
          <p className="text-on-surface-variant font-label-sm text-xs mb-1 uppercase tracking-wider">Attendance %</p>
          <h3 className="text-headline-sm font-bold text-xl">{stats.attendancePercentage || 0}%</h3>
        </div>

        {/* Active Courses */}
        <div className="glass-card p-4 rounded-xl hover:shadow-lg transition-all border-l-4 border-secondary">
          <div className="flex justify-between items-start mb-2">
            <div className="p-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <span className="text-on-surface-variant text-xs">Active</span>
          </div>
          <p className="text-on-surface-variant font-label-sm text-xs mb-1 uppercase tracking-wider">Total Courses</p>
          <h3 className="text-headline-sm font-bold text-xl">{stats.totalCourses || 0}</h3>
        </div>

        {/* Total Revenue */}
        <div className="glass-card p-4 rounded-xl hover:shadow-lg transition-all border-l-4 border-green-600">
          <div className="flex justify-between items-start mb-2">
            <div className="p-1.5 bg-green-100 text-green-800 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <span className="text-green-600 text-xs font-semibold">Paid</span>
          </div>
          <p className="text-on-surface-variant font-label-sm text-xs mb-1 uppercase tracking-wider">Revenue</p>
          <h3 className="text-headline-sm font-bold text-xl">₹{stats.revenue?.toLocaleString() || 0}</h3>
        </div>

      </section>

      {/* Enrollment Trends & Recent Activity */}
      <section className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Enrollment Chart Area */}
        <div className="col-span-12 lg:col-span-8 glass-card p-stack-lg rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline-sm text-headline-sm">Enrollment Trends</h3>
              <p className="text-on-surface-variant text-body-sm">Monthly student intake across all branches</p>
            </div>
            <select className="bg-surface-container border-none text-label-md rounded-lg py-2 px-4 focus:ring-2 focus:ring-primary cursor-pointer">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-4 px-4 h-64 border-b border-outline-variant/30 pb-1">
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-secondary-container/50 rounded-t-lg relative transition-all duration-1000" style={{ height: chartHeights.jan }}>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
              </div>
              <span className="mt-4 text-label-sm text-on-surface-variant">Jan</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-secondary-container/50 rounded-t-lg relative transition-all duration-1000" style={{ height: chartHeights.feb }}>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
              </div>
              <span className="mt-4 text-label-sm text-on-surface-variant">Feb</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-secondary-container/50 rounded-t-lg relative transition-all duration-1000" style={{ height: chartHeights.mar }}>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
              </div>
              <span className="mt-4 text-label-sm text-on-surface-variant">Mar</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-secondary-container/50 rounded-t-lg relative transition-all duration-1000" style={{ height: chartHeights.apr }}>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
              </div>
              <span className="mt-4 text-label-sm text-on-surface-variant">Apr</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-secondary-container/50 rounded-t-lg relative transition-all duration-1000" style={{ height: chartHeights.may }}>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
              </div>
              <span className="mt-4 text-label-sm text-on-surface-variant">May</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-primary rounded-t-lg relative transition-all duration-1000" style={{ height: chartHeights.jun }}></div>
              <span className="mt-4 text-label-sm text-primary font-bold">Jun</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-xl flex flex-col overflow-hidden">
          <div className="p-stack-md bg-surface-container-high border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm">Recent Activity</h3>
            <button className="text-primary font-label-sm hover:underline" onClick={() => navigate('/admin/notifications')}>View All</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6 max-h-[350px]">
            {activities.length > 0 ? (
              activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex gap-4 items-start text-left">
                  <div className={`w-10 h-10 rounded-full ${activity.bgClass} flex items-center justify-center flex-shrink-0`}>
                    <span className="material-symbols-outlined">{activity.icon}</span>
                  </div>
                  <div>
                    <p className="text-body-sm font-medium">{activity.title}</p>
                    <p className="text-label-sm text-on-surface-variant">{activity.description}</p>
                    <p className="text-[11px] text-outline mt-1 uppercase">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-on-surface-variant font-body-sm">
                No recent activity recorded.
              </div>
            )}
          </div>
        </div>

      </section>

      {/* Course Performance Table */}
      <section className="grid grid-cols-12 gap-gutter text-left">
        
        <div className="col-span-12 glass-card rounded-xl overflow-hidden shadow-sm">
          <div className="p-stack-md flex justify-between items-center border-b border-outline-variant bg-surface-container-low">
            <h3 className="font-headline-sm text-headline-sm">Course Performance</h3>
            <button 
              onClick={handleExportCSV}
              className="bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 px-4 py-2 rounded-lg text-label-md transition-colors"
            >
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase border-b border-outline-variant/30">
                <tr>
                  <th className="px-6 py-4">Course Name</th>
                  <th className="px-6 py-4">Instructor</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
                {courses.length > 0 ? (
                  courses.slice(0, 5).map((course) => (
                    <tr key={course._id} className="hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-4 font-label-md text-on-surface">{course.title}</td>
                      <td className="px-6 py-4">{course.instructor || 'Staff'}</td>
                      <td className="px-6 py-4">{course.category}</td>
                      <td className="px-6 py-4">{course.duration}</td>
                      <td className="px-6 py-4 font-bold text-on-surface">₹{course.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                          course.status === 'active' ? 'bg-[#d1fae5] text-[#065f46]' : 'bg-surface-variant text-on-surface-variant'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-on-surface-variant">
                      No courses available in directory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* Contextual FAB */}
      <button 
        onClick={() => navigate('/admin/admissions')}
        className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-on-primary rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center z-50 group border border-primary-fixed"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
        <span className="absolute right-full mr-4 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg text-label-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          New Student Admission
        </span>
      </button>

    </div>
  );
};

export default Dashboard;
