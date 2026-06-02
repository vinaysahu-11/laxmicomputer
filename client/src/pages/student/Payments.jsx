import React from 'react';
import PageHeader from '../../components/student/common/PageHeader';
import PaymentOverview from '../../components/student/dashboard/PaymentOverview';
import Pagination from '../../components/student/common/Pagination';

const Payments = () => {
  return (
    <div className="space-y-6 text-left">
      <PageHeader 
        title="Tuition Fees & Payments" 
        subtitle="Check outstanding installment schedules, download invoice receipts, and review payment logs."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Fees status ledger (Span 7) */}
        <div className="col-span-12 lg:col-span-7">
          <PaymentOverview />
          <Pagination />
        </div>

        {/* Financial assistance helper (Span 5) */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-label-md text-label-md font-bold text-on-surface mb-2 border-b border-outline-variant/20 pb-2 uppercase tracking-wider">
            Accounting Support
          </h3>
          <p className="text-xs text-on-surface-variant font-light leading-relaxed">
            Need adjustments to installment structures? Encountered transaction disputes? Submit a request directly to our institutional accounting department.
          </p>
          <button className="bg-primary hover:bg-surface-tint text-on-primary font-bold text-xs uppercase tracking-wider w-full py-2.5 rounded-lg transition-colors">
            Message Accountant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
