
import React from 'react';
import NotificationsSection from './NotificationsSection';
import AppearanceSection from './AppearanceSection';
import SecuritySection from './SecuritySection';
import { Button } from '@/components/ui/button';

interface SettingsContentProps {
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  smsNotifications: boolean;
  setSmsNotifications: (value: boolean) => void;
  documentNotifications: boolean;
  setDocumentNotifications: (value: boolean) => void;
}

const SettingsContent = ({
  emailNotifications,
  setEmailNotifications,
  smsNotifications,
  setSmsNotifications,
  documentNotifications,
  setDocumentNotifications
}: SettingsContentProps) => {
  return (
    <div className="space-y-6">
      <NotificationsSection 
        emailNotifications={emailNotifications}
        setEmailNotifications={setEmailNotifications}
        smsNotifications={smsNotifications}
        setSmsNotifications={setSmsNotifications}
        documentNotifications={documentNotifications}
        setDocumentNotifications={setDocumentNotifications}
      />

      <AppearanceSection />
      
      <SecuritySection />

      <div className="flex justify-end mt-6">
        <Button className="bg-khaki-600 hover:bg-khaki-700 text-white">
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
};

export default SettingsContent;
