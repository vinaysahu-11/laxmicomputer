import React from 'react';
import ChangePassword from '../../components/teacher/settings/ChangePassword';
import AccountSettings from '../../components/teacher/settings/AccountSettings';
import NotificationSettings from '../../components/teacher/settings/NotificationSettings';
import PrivacySettings from '../../components/teacher/settings/PrivacySettings';

const Settings = () => {
  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Page Header */}
      <div className="mb-stack-lg border-b border-outline-variant/20 pb-4">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Account Settings</h2>
        <p className="font-body-md text-on-surface-variant">Update credentials, manage notification triggers, and platform privacy preferences.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Security & Access Section (Left Col, Span 8) */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <ChangePassword />
          <AccountSettings />
        </section>

        {/* Sidebar Preferences (Right Col, Span 4) */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <NotificationSettings />
          <PrivacySettings />
        </aside>

      </div>

    </div>
  );
};

export default Settings;
