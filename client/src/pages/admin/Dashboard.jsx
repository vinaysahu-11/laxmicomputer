import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [chartHeights, setChartHeights] = useState({
    jan: '0%',
    feb: '0%',
    mar: '0%',
    apr: '0%',
    may: '0%',
    jun: '0%'
  });

  useEffect(() => {
    // Trigger animated chart heights rendering after mount
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

  return (
    <div className="space-y-stack-lg">
      
      {/* Welcome Section */}
      <section className="flex justify-between items-end text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Morning, Administrator</h2>
          <p className="text-on-surface-variant font-body-md">Laxmi Computer Education is performing at +12% compared to last month.</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-lg flex items-center gap-2 font-label-md text-label-md hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Generate Report
        </button>
      </section>

      {/* Key Metrics Cards (Asymmetric Bento Grid Style) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter text-left">
        
        {/* Total Students */}
        <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all border-l-4 border-primary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-[#10b981] text-body-sm font-bold flex items-center gap-0.5">
              +8% <span className="material-symbols-outlined text-sm">trending_up</span>
            </span>
          </div>
          <p className="text-on-surface-variant font-label-sm mb-1 uppercase tracking-wider">Total Students</p>
          <h3 className="text-headline-md font-headline-md">1,284</h3>
        </div>

        {/* Active Courses */}
        <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all border-l-4 border-tertiary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <span className="text-on-surface-variant text-body-sm">4 New</span>
          </div>
          <p className="text-on-surface-variant font-label-sm mb-1 uppercase tracking-wider">Active Courses</p>
          <h3 className="text-headline-md font-headline-md">42</h3>
        </div>

        {/* Monthly Revenue */}
        <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all border-l-4 border-secondary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary-fixed text-on-secondary-fixed rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-[#10b981] text-body-sm font-bold flex items-center gap-0.5">
              +15% <span className="material-symbols-outlined text-sm">trending_up</span>
            </span>
          </div>
          <p className="text-on-surface-variant font-label-sm mb-1 uppercase tracking-wider">Monthly Revenue</p>
          <h3 className="text-headline-md font-headline-md">$24,500</h3>
        </div>

        {/* Pending Admissions */}
        <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all border-l-4 border-error">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-error-container text-on-error-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <span className="text-error text-body-sm font-bold flex items-center">Action Required</span>
          </div>
          <p className="text-on-surface-variant font-label-sm mb-1 uppercase tracking-wider">Pending Admissions</p>
          <h3 className="text-headline-md font-headline-md">18</h3>
        </div>

      </section>

      {/* Enrollment Trends & Recent Activity (Large Bento Grid) */}
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
          
          {/* Visualizing a simplified Bar Chart with HTML/CSS */}
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
            <button className="text-primary font-label-sm hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* Activity Item 1 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <div>
                <p className="text-body-sm font-medium">New Student Enrolled</p>
                <p className="text-label-sm text-on-surface-variant">Arjun Patel joined "Full Stack Web Dev"</p>
                <p className="text-[11px] text-outline mt-1 uppercase">12 Minutes ago</p>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <p className="text-body-sm font-medium">Payment Received</p>
                <p className="text-label-sm text-on-surface-variant">Course fee paid by Sarah J. ($450)</p>
                <p className="text-[11px] text-outline mt-1 uppercase">2 Hours ago</p>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">edit</span>
              </div>
              <div>
                <p className="text-body-sm font-medium">Course Updated</p>
                <p className="text-label-sm text-on-surface-variant">Python Mastery curriculum revised</p>
                <p className="text-[11px] text-outline mt-1 uppercase">5 Hours ago</p>
              </div>
            </div>

            {/* Activity Item 4 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                <p className="text-body-sm font-medium">Attendance Alert</p>
                <p className="text-label-sm text-on-surface-variant">Batch A attendance below 60%</p>
                <p className="text-[11px] text-outline mt-1 uppercase">1 Day ago</p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Bottom Row: Course Performance & Upcoming Tasks */}
      <section className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Popular Courses Table */}
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
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Revenue</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
                <tr className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-4 font-label-md text-on-surface">Web Development Bootcamp</td>
                  <td className="px-6 py-4">Rajesh Kumar</td>
                  <td className="px-6 py-4">450</td>
                  <td className="px-6 py-4 font-bold text-on-surface">$12,000</td>
                  <td className="px-6 py-4">
                    <div className="w-32 bg-secondary-fixed rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#d1fae5] text-[#065f46] px-3 py-1 rounded-full text-[11px] font-bold uppercase">Trending</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-4 font-label-md text-on-surface">Advanced Python Programming</td>
                  <td className="px-6 py-4">Sneha Sharma</td>
                  <td className="px-6 py-4">312</td>
                  <td className="px-6 py-4 font-bold text-on-surface">$8,400</td>
                  <td className="px-6 py-4">
                    <div className="w-32 bg-secondary-fixed rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[11px] font-bold uppercase">Stable</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-4 font-label-md text-on-surface">UI/UX Design Masterclass</td>
                  <td className="px-6 py-4">Amit Verma</td>
                  <td className="px-6 py-4">185</td>
                  <td className="px-6 py-4 font-bold text-on-surface">$4,100</td>
                  <td className="px-6 py-4">
                    <div className="w-32 bg-secondary-fixed rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full text-[11px] font-bold uppercase">Growing</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* Contextual FAB (Dashboard relevant) */}
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
