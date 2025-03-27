
import React, { useState, useEffect } from 'react';
import { Bell, UserPlus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface UserRegistrationProps {
  userId: string;
  userName: string;
  userEmail: string;
  registrationDate: string;
  hasProject: boolean;
  onDismiss: () => void;
}

export const triggerUserRegistrationNotification = (
  toast: any, 
  userId: string,
  userName: string,
  userEmail: string,
  registrationDate: string,
  hasProject: boolean = false
) => {
  toast({
    title: "Nouvel utilisateur inscrit",
    description: `${userName} vient de créer un compte.`,
    action: (
      <Button variant="outline" size="sm" asChild>
        <Link to={`/workspace/client-area/admin/clients/${userId}`}>
          Voir
        </Link>
      </Button>
    ),
  });

  // Also play a sound
  const audio = new Audio('/notification-sound.mp3');
  audio.play().catch(e => console.log('Sound notification error:', e));

  // Store in local storage to show as a card notification in the admin dashboard
  const notifications = JSON.parse(localStorage.getItem('userRegistrationNotifications') || '[]');
  notifications.push({
    userId,
    userName,
    userEmail,
    registrationDate,
    hasProject,
    seen: false
  });
  localStorage.setItem('userRegistrationNotifications', JSON.stringify(notifications));
};

const UserRegistrationNotification: React.FC<UserRegistrationProps> = ({
  userId,
  userName,
  userEmail,
  registrationDate,
  hasProject,
  onDismiss
}) => {
  return (
    <Card className="border-khaki-200 shadow-sm mb-4 relative">
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <div className="flex items-center">
            <UserPlus className="h-5 w-5 text-khaki-600 mr-2" />
            <CardTitle className="text-base">Nouvel utilisateur</CardTitle>
          </div>
          <CardDescription>
            Un nouvel utilisateur s'est inscrit sur la plateforme
          </CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full" 
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fermer</span>
        </Button>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div>
            <div className="font-medium">{userName}</div>
            <div className="text-sm text-gray-600">{userEmail}</div>
          </div>
          <div className="text-xs text-gray-500">
            Inscrit le {new Date(registrationDate).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/workspace/client-area/admin/clients/${userId}`}>
              Voir le profil
            </Link>
          </Button>
          {!hasProject && (
            <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700 text-white" asChild>
              <Link to={`/workspace/client-area/admin/clients/${userId}?tab=projects`}>
                Assigner un projet
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export const UserRegistrationNotificationsContainer = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = JSON.parse(localStorage.getItem('userRegistrationNotifications') || '[]');
    setNotifications(storedNotifications.filter((n: any) => !n.seen).slice(0, 3)); // Show only 3 most recent
    
    // Demo: Add a sample notification if none exist (for demonstration only)
    if (storedNotifications.length === 0) {
      // This is just for demo purposes - would be triggered by real registrations
      setTimeout(() => {
        triggerUserRegistrationNotification(
          toast,
          'demo-user-1',
          'Marc Dubois',
          'marc.dubois@example.com',
          new Date().toISOString(),
          false
        );
      }, 3000);
    }
    
    // Check for new notifications periodically
    const interval = setInterval(() => {
      const currentNotifications = JSON.parse(localStorage.getItem('userRegistrationNotifications') || '[]');
      setNotifications(currentNotifications.filter((n: any) => !n.seen).slice(0, 3));
    }, 10000);
    
    return () => clearInterval(interval);
  }, [toast]);

  const handleDismiss = (userId: string) => {
    // Mark as seen in localStorage
    const storedNotifications = JSON.parse(localStorage.getItem('userRegistrationNotifications') || '[]');
    const updatedNotifications = storedNotifications.map((n: any) => 
      n.userId === userId ? {...n, seen: true} : n
    );
    localStorage.setItem('userRegistrationNotifications', JSON.stringify(updatedNotifications));
    
    // Update state
    setNotifications(notifications.filter(n => n.userId !== userId));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 space-y-2">
      {notifications.map(notification => (
        <UserRegistrationNotification
          key={notification.userId}
          userId={notification.userId}
          userName={notification.userName}
          userEmail={notification.userEmail}
          registrationDate={notification.registrationDate}
          hasProject={notification.hasProject}
          onDismiss={() => handleDismiss(notification.userId)}
        />
      ))}
    </div>
  );
};

export default UserRegistrationNotification;
