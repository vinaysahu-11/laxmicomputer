import React from 'react';

const RevenueCard = () => {
  return (
    <div className="bg-surface border border-outline-variant/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left">
      <div className="flex justify-between items-center mb-4">
        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Total Revenue</span>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Verified</span>
      </div>
      <h2 className="font-headline-lg text-headline-lg text-primary font-bold">₹1,45,230</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 font-light">
        Total collections calculated across active semesters.
      </p>
    </div>
  );
};

export default RevenueCard;
