
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import Navbar from '@/components/layout/Navbar';
import SettingsHeader from '@/components/client/settings/SettingsHeader';
import SettingsContent from '@/components/client/settings/SettingsContent';

const ClientSettings = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [documentNotifications, setDocumentNotifications] = useState(true);

  // Check localStorage for admin mode
  React.useEffect(() => {
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
        <title>Paramètres | Espace Client Progineer</title>
        <meta name="description" content="Gérez les paramètres de votre compte Progineer." />
      </Helmet>

      <Navbar />

      <SettingsHeader 
        title="Paramètres du compte"
        description="Personnalisez les paramètres de votre espace client selon vos préférences."
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
              <SettingsContent 
                emailNotifications={emailNotifications}
                setEmailNotifications={setEmailNotifications}
                smsNotifications={smsNotifications}
                setSmsNotifications={setSmsNotifications}
                documentNotifications={documentNotifications}
                setDocumentNotifications={setDocumentNotifications}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientSettings;
