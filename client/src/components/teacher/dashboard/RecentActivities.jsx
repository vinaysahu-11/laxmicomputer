import React, { useState } from 'react';

const RecentActivities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const initialActivities = [
    { 
      id: 1, 
      name: 'Amit Sharma', 
      course: 'Java Programming', 
      action: 'Submitted Assignment #4', 
      status: 'COMPLETED', 
      time: '12 mins ago',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT2X45S3bJvcdndFCqOTEJLElGyPA0oCzp4yMiKyiFp3Tj41NSB4D_FShOCKkzTc9C7x_NCLXq318F5nt_O6zqcOOeJn34ZEO4r3L-ZRenDq6IG8j0PmyKlIJULNlwhAvOfyJRCAW4YidHDvBWPAZiVSps7qFCjvvEGIMiKXFOC2uxfAzI_3NQ3RMEy6rn_l0ORmOI3MsojgKMWAX5qDFB4KZDnuzKnkBx7LCnY4dsfKMlZdKCtekAkMuTrXa9T4FBzlZJMIxN4W3p'
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      course: 'UI/UX Design', 
      action: 'Asked a doubt (Lecture 12)', 
      status: 'PENDING', 
      time: '45 mins ago',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSB-d6WQWdx08f_bS_N_xlEA0o-bIhTSye-CdzVWp0ts4Mbo5u0Jjojrv2qYWDHx5_Vgs1OE_O8DIkdsj-Waf1Y-as-774vAGAlvsa3E1pfdDF38Ni4CPt9RLJXiyEVdkAd9f0uk4vpkF8ysSyKbz-bcSnU8XnjgVmY3mQmy_vV1UtviVG0GuFW1S3lO5Txbd-M854xBQFKMBE62OytzrEfFk1cYqziPcgvoYaObZ5bo5l0bQsigjkfrXuhc-BctBbi-QgzDs6p4_6'
    },
    { 
      id: 3, 
      name: 'Rahul Verma', 
      course: 'Python Basics', 
      action: 'Retook Quiz #2', 
      status: 'COMPLETED', 
      time: '1 hour ago',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0w4VTDLy9ohrBsbKX9hqMhEC8jwzYsSYawGneXCWOuNxjc7byyyYUabi_u8G40cRJ6N3i5x3pi5mLrYUSHTALYPW6LIq7-42fgdfQw750ii18VCR1DFUZh6VWBk1gcLZuZPkp9znSnN_qd6D6qPbSyEOGRn9Fxy5cScQip-oLOsVHRxVR-dbmD5mJ3TIQO5UB0KZu3m3HlDEzFbgJFbYvc0S1UijwtM2WqoTk-HolG2tjGdH00l-U-kKimUUjLELLlTfpoMhy3bWT'
    }
  ];

  const filteredActivities = initialActivities.filter(act => {
    const matchesSearch = act.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          act.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || act.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="glass-card rounded-xl overflow-hidden border border-outline-variant/30 text-left">
      
      {/* Table Header Section */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/20">
        <h3 className="font-headline-sm text-sm font-bold text-on-surface">Recent Student Activities</h3>
        
        {/* Search and Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto text-xs font-semibold select-none">
          <input 
            type="text" 
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 bg-surface border border-outline-variant rounded-lg outline-none focus:ring-1 focus:ring-primary focus:border-primary font-normal text-xs"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-surface border border-outline-variant rounded-lg outline-none cursor-pointer focus:ring-1 focus:ring-primary text-xs"
          >
            <option value="ALL">All Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      {/* Table Records */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-surface-container-low text-on-surface-variant font-bold">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-light">
            {filteredActivities.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant/65">
                  No matching student activities found.
                </td>
              </tr>
            ) : (
              filteredActivities.map((act) => (
                <tr key={act.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        className="w-8 h-8 rounded-full border border-outline-variant object-cover shrink-0 select-none" 
                        src={act.avatar} 
                        alt={act.name} 
                      />
                      <span className="font-label-md font-bold text-on-surface truncate">{act.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 truncate max-w-[120px] font-medium">{act.course}</td>
                  <td className="px-6 py-4 truncate max-w-[200px]">{act.action}</td>
                  <td className="px-6 py-4 shrink-0">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                      act.status === 'COMPLETED' 
                        ? 'bg-tertiary-container/20 text-on-tertiary-fixed-variant border-tertiary/20' 
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-on-surface-variant font-medium shrink-0 whitespace-nowrap">{act.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivities;
