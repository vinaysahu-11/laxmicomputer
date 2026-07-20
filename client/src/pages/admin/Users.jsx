import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    customField: '',
    status: true
  });

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    status: true
  });

  const [resetPasswordVal, setResetPasswordVal] = useState('');

  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success'
  });

  const showNotification = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/users');
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user accounts directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.name || !createForm.email || !createForm.password) {
      alert('Please fill in Name, Email, and Password.');
      return;
    }

    try {
      await api.post('/auth/users', createForm);
      showNotification(`User account for ${createForm.name} created successfully!`);
      fetchUsers();
      setCreateForm({
        name: '',
        email: '',
        password: '',
        role: 'student',
        customField: '',
        status: true
      });
      setIsCreateModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating user account.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.name || !editForm.email) {
      alert('Name and Email are required.');
      return;
    }

    try {
      await api.put(`/auth/users/${selectedUser._id}`, editForm);
      showNotification(`User credentials updated for ${editForm.name}.`);
      fetchUsers();
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating user.');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!resetPasswordVal || resetPasswordVal.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      await api.put(`/auth/users/${selectedUser._id}`, { password: resetPasswordVal });
      showNotification(`Password successfully reset for ${selectedUser.name}!`);
      setIsResetModalOpen(false);
      setResetPasswordVal('');
      setSelectedUser(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error resetting password.');
    }
  };

  const handleToggleStatus = async (userItem) => {
    const nextStatus = !userItem.status;
    const actionText = nextStatus ? 'enable login access for' : 'disable login access for';
    if (window.confirm(`Are you sure you want to ${actionText} ${userItem.name}?`)) {
      try {
        await api.put(`/auth/users/${userItem._id}`, { status: nextStatus });
        showNotification(`Login status updated for ${userItem.name}.`);
        fetchUsers();
      } catch (err) {
        alert(err.response?.data?.message || 'Error updating user status.');
      }
    }
  };

  const handleDeleteUser = async (userItem) => {
    if (window.confirm(`Are you sure you want to permanently delete user account: ${userItem.name}? This cannot be undone.`)) {
      try {
        await api.delete(`/auth/users/${userItem._id}`);
        showNotification(`User account removed successfully.`);
        fetchUsers();
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting user.');
      }
    }
  };

  const openEditModal = (userItem) => {
    setSelectedUser(userItem);
    setEditForm({
      name: userItem.name,
      email: userItem.email,
      status: userItem.status
    });
    setIsEditModalOpen(true);
  };

  const openResetModal = (userItem) => {
    setSelectedUser(userItem);
    setIsResetModalOpen(true);
  };

  // Filter logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.email.toLowerCase().includes(search.toLowerCase()) || 
                          (u.userId && u.userId.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = roleFilter === 'All' || u.role === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  // Calculate statistics
  const totalCount = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const teacherCount = users.filter(u => u.role === 'teacher').length;
  const studentCount = users.filter(u => u.role === 'student').length;
  const activeCount = users.filter(u => u.status === true).length;

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4 text-left">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">User Accounts Directory</h2>
          <p className="text-on-surface-variant font-body-md mt-1">Configure credentials, toggle login access, and reset passwords.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md hover:scale-102 transition-all active:scale-95 duration-150 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add_moderator</span> 
          <span>Create User Credentials</span>
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter mb-stack-lg">
        
        {/* Total Accounts */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-28 border-l-4 border-primary">
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Total Accounts</p>
          <h3 className="text-headline-sm font-bold text-2xl text-primary">{totalCount}</h3>
        </div>

        {/* Admins */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-28 border-l-4 border-error">
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Administrators</p>
          <h3 className="text-headline-sm font-bold text-2xl text-on-surface">{adminCount}</h3>
        </div>

        {/* Teachers */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-28 border-l-4 border-tertiary">
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Faculty Accounts</p>
          <h3 className="text-headline-sm font-bold text-2xl text-on-surface">{teacherCount}</h3>
        </div>

        {/* Students */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-28 border-l-4 border-secondary">
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Student Accounts</p>
          <h3 className="text-headline-sm font-bold text-2xl text-on-surface">{studentCount}</h3>
        </div>

        {/* Active Logins */}
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-28 border-l-4 border-green-500">
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Active Logins</p>
          <h3 className="text-headline-sm font-bold text-2xl text-green-600">{activeCount} / {totalCount}</h3>
        </div>

      </div>

      {/* Main Table & Filter Area */}
      <div className="glass-card rounded-xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Filter Header */}
        <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">User Database</h4>
            <div className="flex gap-2">
              {['All', 'Admin', 'Teacher', 'Student'].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    roleFilter === role 
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-64">
            <input 
              type="text"
              placeholder="Search Name, Email, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-outline-variant/60 rounded-lg text-body-sm py-2 px-3 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* The Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            <p className="text-on-surface-variant font-label-md mt-4">Loading system credentials index...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-lowest border-b border-outline-variant/30">
                <tr>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">ID / Username</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Full Name</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Email Address</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Role</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Status</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide">Details</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant font-bold uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm font-light text-on-surface-variant">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-surface-container/20 transition-all duration-150">
                    <td className="px-6 py-4 font-mono font-bold text-on-surface">{u.userId}</td>
                    <td className="px-6 py-4 font-medium text-on-surface">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                        u.role === 'admin' 
                          ? 'bg-error-container text-error' 
                          : u.role === 'teacher' 
                          ? 'bg-tertiary-container text-tertiary' 
                          : 'bg-secondary-container text-primary'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        u.status 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {u.status ? 'Active Access' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs italic">{u.details}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => openResetModal(u)}
                          className="p-2 text-primary hover:bg-primary-container/20 rounded-full transition-colors flex items-center justify-center"
                          title="Reset Password"
                        >
                          <span className="material-symbols-outlined text-[18px]">key</span>
                        </button>
                        <button
                          onClick={() => handleToggleStatus(u)}
                          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                            u.status ? 'text-amber-600 hover:bg-amber-100/30' : 'text-green-600 hover:bg-green-100/30'
                          }`}
                          title={u.status ? "Deactivate User" : "Activate User"}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {u.status ? 'block' : 'check_circle'}
                          </span>
                        </button>
                        <button
                          onClick={() => openEditModal(u)}
                          className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors flex items-center justify-center"
                          title="Edit Profile"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u)}
                          className="p-2 text-error hover:bg-error-container/20 rounded-full transition-colors flex items-center justify-center"
                          title="Delete Account"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-on-surface-variant">
                      No user accounts match current criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Modal: Create User */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Create User Account</h3>
              <button className="p-1 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" onClick={() => setIsCreateModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-stack-md space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="font-label-sm text-label-sm block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={createForm.name}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-outline-variant/60 rounded-lg p-2.5 bg-surface-container-lowest focus:ring-2 focus:ring-primary"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={createForm.email}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full border border-outline-variant/60 rounded-lg p-2.5 bg-surface-container-lowest focus:ring-2 focus:ring-primary"
                    placeholder="name@laxmi.com"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm block mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    value={createForm.password}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full border border-outline-variant/60 rounded-lg p-2.5 bg-surface-container-lowest focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-label-sm text-label-sm block mb-1">Account Role</label>
                  <select
                    value={createForm.role}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, role: e.target.value, customField: '' }))}
                    className="w-full border border-outline-variant/60 rounded-lg p-2.5 bg-surface-container-lowest focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                {createForm.role !== 'admin' && (
                  <div className="col-span-2 md:col-span-1">
                    <label className="font-label-sm text-label-sm block mb-1">
                      {createForm.role === 'student' ? 'Preferred Course' : 'Subject Specialty'}
                    </label>
                    <input
                      type="text"
                      value={createForm.customField}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, customField: e.target.value }))}
                      className="w-full border border-outline-variant/60 rounded-lg p-2.5 bg-surface-container-lowest focus:ring-2 focus:ring-primary"
                      placeholder={createForm.role === 'student' ? 'e.g. Basic Computer' : 'e.g. Full Stack Web Dev'}
                    />
                  </div>
                )}
              </div>
              <div className="pt-4 flex justify-end gap-2 border-t border-outline-variant/30">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit User Details */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Edit User Account</h3>
              <button className="p-1 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" onClick={() => setIsEditModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-stack-md space-y-4">
              <div>
                <label className="font-label-sm text-label-sm block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-outline-variant/60 rounded-lg p-2.5 bg-surface-container-lowest"
                />
              </div>
              <div>
                <label className="font-label-sm text-label-sm block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-outline-variant/60 rounded-lg p-2.5 bg-surface-container-lowest"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2 border-t border-outline-variant/30">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reset Password */}
      {isResetModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setIsResetModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-scale-in text-left">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Reset Password</h3>
              <button className="p-1 hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center" onClick={() => setIsResetModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleResetSubmit} className="p-stack-md space-y-4">
              <div>
                <p className="text-xs text-on-surface-variant mb-3">Resetting password for: <strong>{selectedUser.name}</strong> ({selectedUser.userId})</p>
                <label className="font-label-sm text-label-sm block mb-1">New Secure Password *</label>
                <input
                  type="password"
                  required
                  value={resetPasswordVal}
                  onChange={(e) => setResetPasswordVal(e.target.value)}
                  className="w-full border border-outline-variant/60 rounded-lg p-2.5 bg-surface-container-lowest focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
              <div className="pt-4 flex justify-end gap-2 border-t border-outline-variant/30">
                <button type="button" onClick={() => setIsResetModalOpen(false)} className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-10 right-10 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 z-[110] border border-outline-variant/20 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md font-semibold">{toast.message}</span>
      </div>

    </div>
  );
};

export default Users;
