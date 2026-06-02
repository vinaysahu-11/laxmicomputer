import React from 'react';

const PaymentOverview = () => {
  const fees = [
    { title: 'Enrollment Fee Deposit', amount: 150, dueDate: 'Paid (May 10)', status: 'Paid' },
    { title: 'Syllabus Quarter 1 Installment', amount: 250, dueDate: 'June 15, 2026', status: 'Pending' }
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm text-left relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="absolute top-0 right-0 -m-4 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

      <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
        <span className="material-symbols-outlined text-primary text-lg">credit_card</span>
        <span>Payment Status & Fees</span>
      </h3>

      <div className="space-y-3.5">
        {fees.map((fee) => (
          <div key={fee.title} className="p-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-left flex justify-between items-center gap-4">
            <div>
              <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight">{fee.title}</h4>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1.5 block">
                {fee.status === 'Paid' ? 'Paid: ' : 'Due Date: '} {fee.dueDate}
              </span>
            </div>
            
            <div className="text-right shrink-0 flex flex-col gap-1 items-end">
              <span className="font-bold text-on-surface text-base">${fee.amount}</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider border ${
                fee.status === 'Paid'
                  ? 'bg-green-500/10 text-green-700 border-green-500/20'
                  : 'bg-error-container text-on-error-container border-error-container/30'
              }`}>
                {fee.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOverview;
