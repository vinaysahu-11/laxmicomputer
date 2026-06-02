import React from 'react';

const PerformanceAnalytics = () => {
  const monthlyMetrics = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 80 },
    { month: 'Apr', score: 90 },
    { month: 'May', score: 95 }
  ];

  const statistics = [
    { label: 'Batch Rank', value: '4th / 45' },
    { label: 'Avg Test Score', value: '88.2%' },
    { label: 'Assignment On-Time', value: '100%' },
    { label: 'Percentile Score', value: '91.4%' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">trending_up</span>
        <span>Performance Analytics</span>
      </h3>

      <div className="space-y-6">
        {/* Simple Bar Chart Layout */}
        <div className="space-y-2">
          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Monthly Grades Progress</p>
          <div className="flex justify-between items-end h-28 gap-2 bg-surface-container-low/50 rounded-lg p-3 border border-outline-variant/20">
            {monthlyMetrics.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center h-full justify-end">
                <div 
                  className="w-full bg-primary/75 hover:bg-primary transition-all rounded-t-sm relative group"
                  style={{ height: `${item.score}%` }}
                >
                  {/* Tooltip */}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow pointer-events-none z-10">
                    {item.score}%
                  </span>
                </div>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mt-2.5">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statistics.map((stat) => (
            <div key={stat.label} className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-left">
              <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider block">{stat.label}</span>
              <span className="font-bold text-on-surface block text-base mt-1">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
