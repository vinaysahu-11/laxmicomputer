import React from 'react';

const PaymentsTable = () => {
  return (
    <div className="w-full bg-surface border border-outline-variant/60 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-outline-variant/60 bg-surface-container-low flex justify-between items-center">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Recent Payments</h3>
        <span className="text-xs text-outline">Fee transaction history</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest text-on-surface-variant font-label-sm border-b border-outline-variant/40">
              <th className="p-4 uppercase tracking-wider font-semibold">Txn ID</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Student</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Amount</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Method</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Date</th>
              <th className="p-4 uppercase tracking-wider font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
            <tr>
              <td className="p-4 font-semibold">TXN-884920</td>
              <td className="p-4 text-on-surface font-normal">Rahul Varma</td>
              <td className="p-4 font-normal">₹12,500</td>
              <td className="p-4">UPI / NetBanking</td>
              <td className="p-4">2026-06-01</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">Success</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTable;
