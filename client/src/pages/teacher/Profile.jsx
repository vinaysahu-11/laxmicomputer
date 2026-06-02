import React, { useState } from 'react';
import ProfileCard from '../../components/teacher/profile/ProfileCard';
import EditProfileForm from '../../components/teacher/profile/EditProfileForm';
import TeacherDetails from '../../components/teacher/profile/TeacherDetails';
import ProfessionalDetails from '../../components/teacher/profile/ProfessionalDetails';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-stack-lg text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-gutter border-b border-outline-variant/20 pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-1">My Profile</h2>
          <p className="font-body-md text-on-surface-variant">Manage your bio details, contact cards, and educational credentials.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-primary text-on-primary px-stack-lg py-3 rounded-lg font-label-md hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none outline-none font-bold"
        >
          {isEditing ? 'View Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Left Side: Avatar & Core Information (Span 4) */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <ProfileCard />
        </aside>

        {/* Right Side: Tab panels and forms (Span 8) */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          {isEditing ? (
            <EditProfileForm onComplete={() => setIsEditing(false)} />
          ) : (
            <div className="space-y-gutter">
              <TeacherDetails />
              <ProfessionalDetails />
            </div>
          )}
        </section>

      </div>

    </div>
  );
};

export default Profile;
