import React from 'react';

const StatCard = ({ title, value, icon, trend, trendType }) => {
  return (
    <div className="bg-surface border border-outline-variant/60 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
      <div className="space-y-2 text-left">
        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">{title}</span>
        <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{value}</h3>
        {trend && (
          <div className="flex items-center gap-1">
            <span className={`material-symbols-outlined text-sm ${trendType === 'up' ? 'text-green-600' : 'text-red-500'}`}>
              {trendType === 'up' ? 'trending_up' : 'trending_down'}
            </span>
            <span className={`text-xs font-semibold ${trendType === 'up' ? 'text-green-600' : 'text-red-500'}`}>
              {trend}
            </span>
            <span className="text-[10px] text-outline">vs last month</span>
          </div>
        )}
      </div>
      
      {icon && (
        <div className="w-12 h-12 bg-primary-container/20 text-primary border border-primary/10 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
