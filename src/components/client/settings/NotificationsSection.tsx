
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface NotificationsSectionProps {
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  smsNotifications: boolean;
  setSmsNotifications: (value: boolean) => void;
  documentNotifications: boolean;
  setDocumentNotifications: (value: boolean) => void;
}

const NotificationsSection = ({
  emailNotifications,
  setEmailNotifications,
  smsNotifications,
  setSmsNotifications,
  documentNotifications,
  setDocumentNotifications
}: NotificationsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Notifications par email</Label>
            <p className="text-sm text-gray-500">Recevez des notifications par email concernant votre projet.</p>
          </div>
          <Switch 
            id="email-notifications" 
            checked={emailNotifications} 
            onCheckedChange={setEmailNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sms-notifications">Notifications par SMS</Label>
            <p className="text-sm text-gray-500">Recevez des notifications par SMS pour les mises à jour importantes.</p>
          </div>
          <Switch 
            id="sms-notifications" 
            checked={smsNotifications} 
            onCheckedChange={setSmsNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="document-notifications">Notifications de documents</Label>
            <p className="text-sm text-gray-500">Recevez des notifications lorsque de nouveaux documents sont disponibles.</p>
          </div>
          <Switch 
            id="document-notifications" 
            checked={documentNotifications} 
            onCheckedChange={setDocumentNotifications}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
