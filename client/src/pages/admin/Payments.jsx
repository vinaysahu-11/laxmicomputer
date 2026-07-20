import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { getPayments, createPayment, updatePayment, deletePayment } from '../../services/paymentService';

const Payments = () => {
  // 1. Transaction Records State
  const [transactions, setTransactions] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Core configuration states
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Invoice form state
  const [invoiceForm, setInvoiceForm] = useState({
    studentSearch: '',
    amount: '0',
    dueDate: '2026-11-10'
  });
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Stat counters
  const [revenue, setRevenue] = useState(0);
  const [pendingFees, setPendingFees] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);

  // Dynamic UI feedback
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [activeRowPopover, setActiveRowPopover] = useState(null);

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      const [txnsData, usersData] = await Promise.all([
        getPayments(),
        api.get('/auth/users')
      ]);

      // Map backend payments
      const mappedTxns = txnsData.map(t => {
        const studentName = t.studentName || 'Student';
        const initials = studentName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'ST';
        let color = 'bg-primary-container text-on-primary-container';
        if (t.status === 'Pending') color = 'bg-secondary-container text-on-secondary-container';
        else if (t.status === 'Overdue') color = 'bg-tertiary-container text-on-tertiary-container';

        return {
          id: t.invoiceId,
          _id: t._id,
          studentName: studentName,
          initials,
          course: t.course,
          date: t.date || new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          amount: t.amount,
          status: t.status,
          color,
          dueDate: t.dueDate
        };
      });
      setTransactions(mappedTxns);

      // Compute statistics
      const paidSum = mappedTxns.filter(t => t.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
      const pendingSum = mappedTxns.filter(t => t.status === 'Pending' || t.status === 'Overdue').reduce((acc, curr) => acc + curr.amount, 0);
      setRevenue(paidSum);
      setPendingFees(pendingSum);
      setInvoiceCount(mappedTxns.length);

      // Map students list for autocompletion
      const students = usersData.data.filter(u => u.role === 'student').map(u => {
        // Parse course name from studentId if formatted (ST-2026-101#Full Stack Web Dev#...)
        const coursePart = (u.studentId || '').split('#')[1] || 'General Course';
        return {
          name: u.name,
          course: coursePart,
          email: u.email
        };
      });
      setAvailableStudents(students);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch payments records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsData();
  }, []);

  const triggerToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };

  const handleApplyQuickInvoice = async (e) => {
    e.preventDefault();
    if (!invoiceForm.studentSearch || parseFloat(invoiceForm.amount) <= 0) {
      alert('Please select a student and specify an invoice amount.');
      return;
    }

    try {
      const studentName = invoiceForm.studentSearch;
      const course = selectedStudent ? selectedStudent.course : 'General Course';
      const amount = parseFloat(invoiceForm.amount);
      const dueDate = invoiceForm.dueDate;

      await createPayment({
        studentName,
        course,
        amount,
        status: 'Pending',
        dueDate
      });

      triggerToast(`Invoice successfully generated and saved!`);
      // Clear form
      setInvoiceForm({ studentSearch: '', amount: '0', dueDate: '2026-11-10' });
      setSelectedStudent(null);
      setShowDropdown(false);
      
      // Refresh list
      fetchPaymentsData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating invoice.');
    }
  };

  const handleStudentSelect = (student) => {
    setInvoiceForm(prev => ({ ...prev, studentSearch: student.name }));
    setSelectedStudent(student);
    setShowDropdown(false);
  };

  const handleUpdateStatus = async (dbId, invId, nextStatus) => {
    try {
      await updatePayment(dbId, { status: nextStatus });
      triggerToast(`Transaction updated: Invoice ${invId} marked as ${nextStatus}!`);
      setActiveRowPopover(null);
      fetchPaymentsData();
    } catch (err) {
      alert('Failed to update invoice status.');
    }
  };

  const handleDeleteInvoice = async (dbId, invId) => {
    if (window.confirm(`Are you sure you want to retract invoice record ${invId}?`)) {
      try {
        await deletePayment(dbId);
        triggerToast(`Invoice record ${invId} has been successfully deleted.`);
        setActiveRowPopover(null);
        fetchPaymentsData();
      } catch (err) {
        alert('Failed to delete invoice.');
      }
    }
  };

  const handleExportCSV = () => {
    triggerToast('Compiling financial transaction audit trails... Excel/CSV downloads complete.');
  };

  const getFilteredTransactions = () => {
    return transactions.filter(txn => {
      // 1. Status Filter
      if (statusFilter !== 'Status: All' && statusFilter !== 'All') {
        if (txn.status !== statusFilter) return false;
      }
      // 2. Search Query
      if (searchQuery !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = txn.studentName.toLowerCase().includes(query);
        const matchesCourse = txn.course.toLowerCase().includes(query);
        const matchesId = txn.id.toLowerCase().includes(query);
        if (!matchesName && !matchesCourse && !matchesId) return false;
      }
      return true;
    });
  };

  const filteredTxns = getFilteredTransactions();

  if (loading && transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
        <p className="text-on-surface-variant font-label-md">Loading billing profiles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 text-left gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Financial Overview</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Real-time revenue tracking and payment management system.</p>
        </div>
        <div className="flex space-x-3 shrink-0">
          <button 
            onClick={handleExportCSV}
            className="px-6 py-2.5 rounded-lg border border-outline text-primary font-label-md hover:bg-surface-container transition-all active:scale-95 duration-100 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg text-left">
        
        {/* Total Revenue */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary-container/20 rounded-lg text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
            </div>
            <span className="text-success text-sm font-bold flex items-center text-[#2e7d32] bg-green-50 px-2 py-0.5 rounded-full">
              Live <span className="material-symbols-outlined text-sm ml-1">check_circle</span>
            </span>
          </div>
          <div className="mt-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Total Revenue</p>
            <h3 className="font-headline-xl text-headline-xl text-primary font-bold mt-1 leading-none">
              ₹{revenue.toLocaleString()}
            </h3>
            <p className="text-xs text-on-surface-variant mt-2 font-medium">Aggregated Paid Invoices</p>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-tertiary-container/20 rounded-lg text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Pending Fees</p>
            <h3 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1 leading-none">
              ₹{pendingFees.toLocaleString()}
            </h3>
            <div className="w-full bg-surface-container rounded-full h-1.5 mt-4">
              <div className="bg-tertiary h-1.5 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 font-medium">Invoices pending payment</p>
          </div>
        </div>

        {/* Invoice Count */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-secondary-container/25 rounded-lg text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">receipt_long</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Invoices Generated</p>
            <h3 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1 leading-none">{invoiceCount}</h3>
            <p className="text-xs text-[#2b7de9] mt-2 font-semibold">Managed transactions in MongoDB</p>
          </div>
        </div>

      </div>

      {/* Main Ledger Table */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Table Column */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-low">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Transaction Ledger</h3>
            <div className="flex space-x-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <span className="absolute left-3 top-2.5 text-on-surface-variant material-symbols-outlined text-base">search</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search invoice, student..." 
                  className="w-full pl-9 pr-4 py-2 border border-outline-variant bg-surface rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-surface border border-outline-variant text-label-md rounded-lg py-2 px-4 focus:ring-1 focus:ring-primary cursor-pointer text-on-surface"
              >
                <option value="All">Status: All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase border-b border-outline-variant/30">
                <tr>
                  <th className="px-6 py-4 font-semibold">Student</th>
                  <th className="px-6 py-4 font-semibold">Course</th>
                  <th className="px-6 py-4 font-semibold">Inv Date</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
                {filteredTxns.length > 0 ? (
                  filteredTxns.map((txn) => (
                    <tr key={txn.id} className="hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${txn.color}`}>
                            {txn.initials}
                          </div>
                          <div>
                            <p className="font-label-md text-on-surface font-bold leading-none">{txn.studentName}</p>
                            <p className="text-[10px] text-outline mt-1">{txn.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-on-surface">{txn.course}</td>
                      <td className="px-6 py-4">{txn.date}</td>
                      <td className="px-6 py-4 font-bold text-on-surface">₹{txn.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          txn.status === 'Paid' ? 'bg-[#e2f9ec] text-[#137333]' : txn.status === 'Pending' ? 'bg-[#fef3c7] text-[#92400e]' : 'bg-[#fce8e6] text-[#c5221f]'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button 
                          onClick={() => setActiveRowPopover(activeRowPopover === txn.id ? null : txn.id)}
                          className="p-1 hover:bg-surface-container rounded-full transition-colors flex items-center justify-center ml-auto"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                        
                        {activeRowPopover === txn.id && (
                          <div className="absolute right-6 top-10 w-44 bg-surface border border-outline-variant rounded-lg shadow-xl z-50 py-1 text-left">
                            <button 
                              onClick={() => handleUpdateStatus(txn._id, txn.id, 'Paid')}
                              className="w-full px-4 py-2 hover:bg-surface-container text-body-sm text-on-surface flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-success text-base">check_circle</span>
                              Mark Paid
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(txn._id, txn.id, 'Pending')}
                              className="w-full px-4 py-2 hover:bg-surface-container text-body-sm text-on-surface flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-warning text-base">hourglass_empty</span>
                              Mark Pending
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(txn._id, txn.id, 'Overdue')}
                              className="w-full px-4 py-2 hover:bg-surface-container text-body-sm text-on-surface flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-error text-base">warning</span>
                              Mark Overdue
                            </button>
                            <div className="h-[1px] bg-outline-variant/30 my-1"></div>
                            <button 
                              onClick={() => handleDeleteInvoice(txn._id, txn.id)}
                              className="w-full px-4 py-2 hover:bg-surface-container text-body-sm text-error flex items-center gap-2 font-bold"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                              Retract Invoice
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-on-surface-variant font-body-sm">
                      No matching transaction entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Invoice Dispatch bento widget */}
        <div id="quick-invoice-tool" className="col-span-12 lg:col-span-4 glass-card p-6 rounded-xl border border-outline-variant flex flex-col justify-between">
          <div className="text-left">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">Quick Invoice Tool</h3>
            <p className="text-body-sm text-on-surface-variant font-light mb-6">Dispatches an invoice to student profiles instantly.</p>
            
            <form onSubmit={handleApplyQuickInvoice} className="space-y-4">
              
              {/* Autocomplete Search input */}
              <div className="relative">
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1 tracking-wide">Student Search</label>
                <input 
                  type="text" 
                  value={invoiceForm.studentSearch}
                  onChange={(e) => {
                    setInvoiceForm(prev => ({ ...prev, studentSearch: e.target.value }));
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Type student name..." 
                  required
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
                
                {/* Search Dropdown list */}
                {showDropdown && availableStudents.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-surface border border-outline-variant rounded-lg shadow-xl z-50 divide-y divide-outline-variant/30">
                    {availableStudents
                      .filter(s => s.name.toLowerCase().includes(invoiceForm.studentSearch.toLowerCase()))
                      .map((student, i) => (
                        <button 
                          type="button" 
                          key={i} 
                          onClick={() => handleStudentSelect(student)}
                          className="w-full px-4 py-2 text-left text-body-sm font-light hover:bg-surface-container text-on-surface block"
                        >
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-[10px] text-on-surface-variant mt-0.5">{student.course}</p>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Course Detail (Readonly preview) */}
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1 tracking-wide">Allocated Course</label>
                <input 
                  type="text" 
                  value={selectedStudent ? selectedStudent.course : 'General Fee'} 
                  readOnly 
                  className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/30 rounded-lg text-body-sm text-on-surface-variant cursor-not-allowed"
                />
              </div>

              {/* Invoice Amount */}
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1 tracking-wide">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-on-surface-variant">₹</span>
                  <input 
                    type="number" 
                    value={invoiceForm.amount}
                    onChange={(e) => setInvoiceForm(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="INR amount" 
                    required
                    min="1"
                    className="w-full pl-7 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase mb-1 tracking-wide">Due Date</label>
                <input 
                  type="date" 
                  value={invoiceForm.dueDate}
                  onChange={(e) => setInvoiceForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-light text-on-surface focus:outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md shadow-md hover:scale-[1.01] active:scale-95 duration-100 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                Dispatch Invoice
              </button>

            </form>
          </div>
        </div>

      </div>

      {/* Popover Background Blocker (Click to close popover) */}
      {activeRowPopover && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setActiveRowPopover(null)}
        />
      )}

      {/* Toast Notification popup feedback */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-lg font-label-md flex items-center space-x-3 border border-outline-variant/30 animate-slide-up">
          <span className="material-symbols-outlined text-success">check_circle</span>
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
};

export default Payments;
