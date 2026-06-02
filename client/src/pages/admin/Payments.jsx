import React, { useState } from 'react';

const Payments = () => {
  // 1. Initial Transaction Records State
  const [transactions, setTransactions] = useState([
    { id: 'INV-8821', studentName: 'Jane Doe', initials: 'JD', course: 'Python Mastery', date: 'Oct 24, 2023', amount: 1200.00, status: 'Paid', color: 'bg-primary-container text-on-primary-container' },
    { id: 'INV-8819', studentName: 'Michael Smith', initials: 'MS', course: 'Web Dev Pro', date: 'Oct 23, 2023', amount: 950.00, status: 'Pending', color: 'bg-secondary-container text-on-secondary-container' },
    { id: 'INV-8815', studentName: 'Alex Rivera', initials: 'AR', course: 'Cloud Arch.', date: 'Oct 21, 2023', amount: 2400.00, status: 'Overdue', color: 'bg-tertiary-container text-on-tertiary-container' },
    { id: 'INV-8810', studentName: 'Sarah Lee', initials: 'SL', course: 'UI/UX Design', date: 'Oct 20, 2023', amount: 850.00, status: 'Paid', color: 'bg-surface-variant text-on-surface-variant' }
  ]);

  // Available students database for invoice generation autocomplete search
  const availableStudents = [
    { name: 'Liam Henderson', course: 'Python Mastery', email: 'liam.h@email.com' },
    { name: 'Aria Montgomery', course: 'UI/UX Design', email: 'aria.m@email.com' },
    { name: 'David Okoro', course: 'Cloud Arch.', email: 'd.okoro@email.com' },
    { name: 'Sarah Jenkins', course: 'Web Dev Pro', email: 's.jenkins@test.org' },
    { name: 'Emma Watson', course: 'Digital Marketing', email: 'emma.w@email.com' }
  ];

  // Core configuration states
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Invoice form state
  const [invoiceForm, setInvoiceForm] = useState({
    studentSearch: '',
    amount: '0.00',
    dueDate: '2023-11-10'
  });
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Stat counters
  const [revenue, setRevenue] = useState(428590.00);
  const [pendingFees, setPendingFees] = useState(12450.00);
  const [invoiceCount, setInvoiceCount] = useState(1204);

  // Dynamic UI feedback
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [activeRowPopover, setActiveRowPopover] = useState(null);

  // 2. Event Triggers
  const triggerToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };

  const handleApplyQuickInvoice = (e) => {
    e.preventDefault();
    if (!invoiceForm.studentSearch || parseFloat(invoiceForm.amount) <= 0) {
      alert('Please select a student and specify an invoice amount.');
      return;
    }

    const initials = invoiceForm.studentSearch.split(' ').map(n => n[0]).join('').toUpperCase();
    const invId = `INV-${Math.floor(8800 + Math.random() * 100)}`;
    const newInv = {
      id: invId,
      studentName: invoiceForm.studentSearch,
      initials: initials,
      course: selectedStudent ? selectedStudent.course : 'General Course',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: parseFloat(invoiceForm.amount),
      status: 'Pending',
      color: 'bg-secondary-container text-on-secondary-container'
    };

    // Prepend invoice
    setTransactions(prev => [newInv, ...prev]);
    setInvoiceCount(prev => prev + 1);
    setPendingFees(prev => prev + parseFloat(invoiceForm.amount));
    
    triggerToast(`Invoice ${invId} successfully generated and dispatched to candidate!`);
    
    // Clear form
    setInvoiceForm({ studentSearch: '', amount: '0.00', dueDate: '2023-11-10' });
    setSelectedStudent(null);
    setShowDropdown(false);
  };

  const handleStudentSelect = (student) => {
    setInvoiceForm(prev => ({ ...prev, studentSearch: student.name }));
    setSelectedStudent(student);
    setShowDropdown(false);
  };

  const handleUpdateStatus = (invId, nextStatus) => {
    let transactionAmount = 0;
    setTransactions(prev => prev.map(txn => {
      if (txn.id === invId) {
        transactionAmount = txn.amount;
        return { ...txn, status: nextStatus };
      }
      return txn;
    }));

    if (nextStatus === 'Paid') {
      setRevenue(prev => prev + transactionAmount);
      setPendingFees(prev => Math.max(prev - transactionAmount, 0));
      triggerToast(`Transaction locked: Invoice ${invId} marked as successfully paid!`);
    } else {
      triggerToast(`Invoice ${invId} marked as ${nextStatus}.`);
    }
    setActiveRowPopover(null);
  };

  const handleDeleteInvoice = (invId, amount, status) => {
    if (window.confirm(`Are you sure you want to retract invoice record ${invId}?`)) {
      setTransactions(prev => prev.filter(t => t.id !== invId));
      setInvoiceCount(prev => Math.max(prev - 1, 0));
      if (status === 'Pending' || status === 'Overdue') {
        setPendingFees(prev => Math.max(prev - amount, 0));
      }
      triggerToast(`Invoice record ${invId} has been successfully deleted.`);
    }
    setActiveRowPopover(null);
  };

  const handleExportCSV = () => {
    triggerToast('Compiling financial transaction audit trails... Excel/CSV downloads complete.');
  };

  // 3. Resolving Filter Data
  const getFilteredTransactions = () => {
    return transactions.filter(txn => {
      // 1. Status Filter
      if (statusFilter !== 'Status: All' && statusFilter !== 'All') {
        if (txn.status !== statusFilter) return false;
      }
      // 2. Search Query (Top/local bar)
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
          <button 
            onClick={() => {
              const quickInputEl = document.getElementById('quick-invoice-tool');
              if (quickInputEl) {
                quickInputEl.scrollIntoView({ behavior: 'smooth' });
                quickInputEl.classList.add('ring-2', 'ring-primary/40');
                setTimeout(() => quickInputEl.classList.remove('ring-2', 'ring-primary/40'), 1500);
              }
            }}
            className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-md hover:scale-[1.02] transition-all active:scale-95 duration-100 flex items-center shadow-lg gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create Invoice</span>
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
              <span className="material-symbols-outlined text-sm mr-1">trending_up</span> +12.5%
            </span>
          </div>
          <div className="mt-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Total Revenue</p>
            <h3 className="font-headline-xl text-headline-xl text-primary font-bold mt-1 leading-none">
              ${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-xs text-on-surface-variant mt-2 font-medium">v.s last month ($381,000)</p>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-tertiary-container/20 rounded-lg text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
            </div>
            <span className="text-on-surface-variant text-sm font-bold bg-surface-container px-2 py-0.5 rounded-full">
              {transactions.filter(t => t.status === 'Pending').length + 80} students
            </span>
          </div>
          <div className="mt-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Pending Fees</p>
            <h3 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1 leading-none">
              ${pendingFees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="w-full bg-surface-container rounded-full h-1.5 mt-4">
              <div className="bg-tertiary h-1.5 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 font-medium">65% collected for Q3 Intake</p>
          </div>
        </div>

        {/* Invoices Issued */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-secondary-container/40 rounded-lg text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">receipt_long</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Invoices Issued</p>
            <h3 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1 leading-none">{invoiceCount}</h3>
            <p className="text-xs text-on-surface-variant mt-2 font-medium">Last updated 2 minutes ago</p>
          </div>
        </div>

      </div>

      {/* Asymmetric Section: Table & Actions */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        
        {/* Transactions Table */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm flex flex-col justify-between min-h-[480px]">
          <div>
            <div className="p-6 border-b border-outline-variant flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Transactions</h4>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search inside table..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-surface-container-low border border-outline-variant/60 rounded-full text-xs font-light focus:ring-1 focus:ring-primary focus:outline-none w-48"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[14px]">search</span>
                </div>
              </div>
              
              <div className="flex space-x-2 shrink-0">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs font-bold bg-surface-container border-none rounded-full px-4 py-1.5 focus:ring-0 cursor-pointer"
                >
                  <option value="All">Status: All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <button 
                  onClick={() => triggerToast('Applying dynamic transaction ledger orderings...')}
                  className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant flex items-center justify-center border border-outline-variant/50"
                >
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low/50 text-[11px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/30">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Invoice ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant text-body-sm font-light text-on-surface-variant">
                  {filteredTxns.map((txn) => (
                    <tr key={txn.id} className="hover:bg-surface-container-low/30 transition-colors relative">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mr-3 shrink-0 ${txn.color}`}>
                            {txn.initials}
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface font-bold leading-none">{txn.studentName}</p>
                            <p className="text-[10px] text-on-surface-variant mt-1 font-semibold">{txn.course}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-on-surface">{txn.id}</td>
                      <td className="px-6 py-4">{txn.date}</td>
                      <td className="px-6 py-4 font-label-md text-label-md font-bold text-on-surface">
                        ${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          txn.status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : txn.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button 
                          onClick={() => setActiveRowPopover(activeRowPopover === txn.id ? null : txn.id)}
                          className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center ml-auto"
                        >
                          more_vert
                        </button>
                        
                        {/* Action Popover Context Dropdown */}
                        {activeRowPopover === txn.id && (
                          <div className="absolute right-6 top-12 bg-surface rounded-xl border border-outline-variant shadow-xl z-50 py-2 w-44 animate-scale-in text-left">
                            {txn.status !== 'Paid' && (
                              <button 
                                onClick={() => handleUpdateStatus(txn.id, 'Paid')}
                                className="w-full text-left px-4 py-2 hover:bg-surface-container text-xs text-on-surface flex items-center gap-2 font-semibold"
                              >
                                <span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span>
                                <span>Mark as Paid</span>
                              </button>
                            )}
                            {txn.status === 'Paid' && (
                              <button 
                                onClick={() => handleUpdateStatus(txn.id, 'Pending')}
                                className="w-full text-left px-4 py-2 hover:bg-surface-container text-xs text-on-surface flex items-center gap-2 font-semibold"
                              >
                                <span className="material-symbols-outlined text-[16px] text-yellow-600 font-bold">hourglass_empty</span>
                                <span>Mark as Pending</span>
                              </button>
                            )}
                            <button 
                              onClick={() => triggerToast(`Dispatched payment reminder log to student email address.`)}
                              className="w-full text-left px-4 py-2 hover:bg-surface-container text-xs text-on-surface flex items-center gap-2 font-semibold"
                            >
                              <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                              <span>Send Reminder</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteInvoice(txn.id, txn.amount, txn.status)}
                              className="w-full text-left px-4 py-2 hover:bg-surface-container text-xs text-error border-t border-outline-variant/30 flex items-center gap-2 font-semibold mt-1"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                              <span>Delete Record</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredTxns.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-16 text-center text-on-surface-variant font-light text-sm">
                        No financial transactions found. Try adjusting filter fields.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-6 bg-surface-container-low/50 text-center border-t border-outline-variant/30">
            <button 
              onClick={() => triggerToast('Fetching complete academic transactions repository ledger list...')}
              className="text-primary font-label-md font-bold text-sm hover:underline"
            >
              View All Transactions
            </button>
          </div>
        </div>

        {/* Right Sidebar: Quick Actions & Invoicing */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          
          {/* Quick Invoicing Tool */}
          <div 
            id="quick-invoice-tool"
            className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-4"
          >
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold border-b border-outline-variant/30 pb-2">
              Generate Quick Invoice
            </h4>
            
            <form onSubmit={handleApplyQuickInvoice} className="space-y-4">
              <div className="relative">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">
                  Student Search
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    value={invoiceForm.studentSearch}
                    onChange={(e) => {
                      setInvoiceForm(prev => ({ ...prev, studentSearch: e.target.value }));
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowDropdown(invoiceForm.studentSearch.length > 0)}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 text-body-sm font-medium bg-surface-container-lowest focus:outline-none"
                    placeholder="Start typing student name..."
                    required
                  />
                  {invoiceForm.studentSearch && (
                    <button 
                      type="button"
                      onClick={() => {
                        setInvoiceForm(prev => ({ ...prev, studentSearch: '' }));
                        setSelectedStudent(null);
                        setShowDropdown(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>

                {/* Autocomplete Dropdown */}
                {showDropdown && (
                  <div className="absolute left-0 right-0 top-16 bg-surface rounded-xl border border-outline-variant shadow-2xl z-50 max-h-48 overflow-y-auto mt-1">
                    {availableStudents
                      .filter(s => s.name.toLowerCase().includes(invoiceForm.studentSearch.toLowerCase()))
                      .map((stu) => (
                        <div 
                          key={stu.name}
                          onClick={() => handleStudentSelect(stu)}
                          className="px-4 py-2.5 hover:bg-surface-container cursor-pointer border-b border-outline-variant/20 last:border-b-0"
                        >
                          <p className="text-xs font-bold text-on-surface leading-none">{stu.name}</p>
                          <p className="text-[10px] text-on-surface-variant mt-1">{stu.course} • {stu.email}</p>
                        </div>
                      ))}
                    {availableStudents.filter(s => s.name.toLowerCase().includes(invoiceForm.studentSearch.toLowerCase())).length === 0 && (
                      <div className="px-4 py-3 text-xs text-on-surface-variant font-light italic">
                        No registered candidates match.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">
                    Amount ($)
                  </label>
                  <input 
                    type="number"
                    value={invoiceForm.amount}
                    onChange={(e) => setInvoiceForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 text-body-sm font-bold bg-surface-container-lowest"
                    min="0"
                    step="50"
                    required
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 block uppercase tracking-wider font-bold">
                    Due Date
                  </label>
                  <input 
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 text-body-sm font-medium bg-surface-container-lowest cursor-pointer"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:bg-secondary-container/80 transition-all active:scale-95 duration-100 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">send</span> 
                <span>Send Invoice</span>
              </button>
            </form>
          </div>

          {/* Payment Distribution */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-4">
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold border-b border-outline-variant/30 pb-2">
              Method Distribution
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-primary mr-3 shrink-0"></span>
                  <span className="text-body-sm font-light text-on-surface">Credit/Debit Card</span>
                </div>
                <span className="font-bold text-body-sm text-on-surface">62%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-tertiary mr-3 shrink-0"></span>
                  <span className="text-body-sm font-light text-on-surface">Bank Transfer</span>
                </div>
                <span className="font-bold text-body-sm text-on-surface">28%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-secondary mr-3 shrink-0"></span>
                  <span className="text-body-sm font-light text-on-surface">Installment Plans</span>
                </div>
                <span className="font-bold text-body-sm text-on-surface">10%</span>
              </div>

              {/* Simple visual chart representation */}
              <div className="flex w-full h-3 rounded-full overflow-hidden mt-6 bg-surface-container border border-outline-variant/30 shrink-0">
                <div className="bg-primary transition-all duration-1000" style={{ width: '62%' }} title="Card: 62%"></div>
                <div className="bg-tertiary transition-all duration-1000" style={{ width: '28%' }} title="Bank: 28%"></div>
                <div className="bg-secondary transition-all duration-1000" style={{ width: '10%' }} title="Installment: 10%"></div>
              </div>
            </div>
          </div>

          {/* Financial Support Card */}
          <div 
            onClick={() => triggerToast('Connecting with centralized finance support services...')}
            className="relative rounded-xl overflow-hidden h-40 group cursor-pointer shadow-lg active:scale-[0.98] transition-all"
            style={{
              backgroundImage: `linear-gradient(rgba(0,97,164,0.85), rgba(0,97,164,0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMp8mMHqnDeR7t-SDCTV35mrDrnLGONm3KCbq_1cj3QBPxXihN5XxVr9Bde51VJ2rNEFhVI0-iKBU3Dw_643KnryGg1ylP1rX8YcIzwD4zs1797I6JvPkuyXbnEXraPRY78ldHu4T0IYQCBe6ImysGNiJdmofu2cgOpwhqrUZRuwKu5oIR2URsh14xRJed6YWfBLJKXEfh0EItC89lz4eWO1Yeahp8EbUiTuwWOQ5ez-pHThtA6rKcuMhxzRSxW8pq-8Uk8FIPMtFM')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
              <h5 className="text-on-primary font-headline-sm font-bold">Financial Support</h5>
              <p className="text-on-primary/80 text-body-sm font-light mt-1 leading-snug">
                Speak with our accounting team for custom reporting.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Slide-Up Notification Toast */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

      {/* FAB for Contextual Payment Actions */}
      <button 
        onClick={() => triggerToast('Initiating payment request compilation dispatch overlay...')}
        className="fixed bottom-10 right-10 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group z-50 border border-primary-fixed"
      >
        <span className="material-symbols-outlined text-3xl">currency_exchange</span>
        <span className="absolute right-16 bg-inverse-surface text-inverse-on-surface px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-outline-variant/25">
          New Payment Request
        </span>
      </button>

    </div>
  );
};

export default Payments;

