import React from 'react';

const RevenueChart = () => {
  return (
    <div className="bg-surface border border-outline-variant/60 rounded-2xl p-6 shadow-sm flex flex-col h-80 text-left">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Revenue Collections</h3>
          <p className="text-xs text-on-surface-variant font-light">Monthly income breakdown</p>
        </div>
        <span className="text-xs text-outline font-semibold">Yearly View</span>
      </div>

      {/* Simulated visual chart grid representation */}
      <div className="flex-1 flex items-end gap-3 pt-4 border-b border-l border-outline-variant/40 pl-4 pb-2">
        <div className="flex-1 bg-primary/25 rounded-t-lg h-24 relative group hover:bg-primary transition-all">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1.5 py-0.5 rounded">₹15k</span>
        </div>
        <div className="flex-1 bg-primary/25 rounded-t-lg h-36 relative group hover:bg-primary transition-all">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1.5 py-0.5 rounded">₹25k</span>
        </div>
        <div className="flex-1 bg-primary/25 rounded-t-lg h-48 relative group hover:bg-primary transition-all">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1.5 py-0.5 rounded">₹45k</span>
        </div>
        <div className="flex-1 bg-primary/25 rounded-t-lg h-60 relative group hover:bg-primary transition-all">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1.5 py-0.5 rounded">₹60k</span>
        </div>
        <div className="flex-1 bg-primary/25 rounded-t-lg h-40 relative group hover:bg-primary transition-all">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1.5 py-0.5 rounded">₹30k</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mt-2 px-4">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
      </div>
    </div>
  );
};

export default RevenueChart;
