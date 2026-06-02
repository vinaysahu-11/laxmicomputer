import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import Topbar from '../components/dashboard/topbar/Topbar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md overflow-hidden relative">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen flex flex-col">
        {/* Top Header Header */}
        <Topbar />

        {/* Content Canvas */}
        <div className="mt-16 p-stack-lg overflow-y-auto h-[calc(100vh-4rem)] scrollbar-hide">
          <div className="max-w-container-max mx-auto space-y-stack-lg">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
