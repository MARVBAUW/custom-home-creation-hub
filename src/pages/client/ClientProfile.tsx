
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import Navbar from '@/components/layout/Navbar';
import ProfileHeader from '@/components/client/profile/ProfileHeader';
import ProfileContent from '@/components/client/profile/ProfileContent';
import { useProfileData } from '@/hooks/useProfileData';

const ClientProfile = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { profileData, updateProfile } = useProfileData(user);

  // Check localStorage for admin mode
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Mon profil | Espace Client Progineer</title>
        <meta name="description" content="Gérez votre profil et vos informations personnelles." />
      </Helmet>

      <Navbar />

      <ProfileHeader 
        title="Profil utilisateur" 
        description="Gérez vos informations personnelles et vos préférences."
      />

      <section className="py-16 bg-white dark:bg-gray-950">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <ClientNavigation isAdminMode={isAdminMode} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <ProfileContent 
                  profileData={profileData}
                  onUpdateProfile={updateProfile}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientProfile;
