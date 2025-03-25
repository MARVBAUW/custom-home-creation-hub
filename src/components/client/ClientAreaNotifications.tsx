
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar, FileText, MessageSquare, Clock, User, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample notification data
const notifications = [
  { 
    id: 1, 
    title: 'Nouveau document disponible', 
    description: 'Le devis pour les travaux de menuiserie a été ajouté à vos documents', 
    date: 'Aujourd\'hui, 10:30', 
    type: 'document', 
    read: false 
  },
  { 
    id: 2, 
    title: 'Réunion de chantier', 
    description: 'Rappel: Réunion de chantier prévue demain à 10:00', 
    date: 'Hier, 15:22', 
    type: 'event', 
    read: false 
  },
  { 
    id: 3, 
    title: 'Nouveau message', 
    description: 'Marie Dupont vous a envoyé un message concernant les finitions', 
    date: '06/07/2023, 11:45', 
    type: 'message', 
    read: true 
  },
  { 
    id: 4, 
    title: 'Étape validée', 
    description: 'L\'étape "Préparation du terrain" a été validée', 
    date: '04/07/2023, 09:15', 
    type: 'project', 
    read: true 
  },
  { 
    id: 5, 
    title: 'Rappel paiement', 
    description: 'L\'échéance pour le premier acompte arrive dans 5 jours', 
    date: '01/07/2023, 14:30', 
    type: 'payment', 
    read: true 
  },
];

const ClientAreaNotifications = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
            <CardDescription>
              Dernières mises à jour concernant votre projet
            </CardDescription>
          </div>
          <Badge className="bg-khaki-600 hover:bg-khaki-700">
            {notifications.filter(n => !n.read).length} nouvelles
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`flex p-3 rounded-lg border ${
                notification.read ? 'border-gray-100 bg-white' : 'border-khaki-100 bg-khaki-50'
              }`}
            >
              {/* Icon based on notification type */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                notification.type === 'document' ? 'bg-blue-100' : 
                notification.type === 'message' ? 'bg-purple-100' :
                notification.type === 'event' ? 'bg-green-100' :
                notification.type === 'project' ? 'bg-amber-100' :
                notification.type === 'payment' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                {notification.type === 'document' && <FileText className="h-5 w-5 text-blue-600" />}
                {notification.type === 'message' && <MessageSquare className="h-5 w-5 text-purple-600" />}
                {notification.type === 'event' && <Calendar className="h-5 w-5 text-green-600" />}
                {notification.type === 'project' && <User className="h-5 w-5 text-amber-600" />}
                {notification.type === 'payment' && <AlertCircle className="h-5 w-5 text-red-600" />}
              </div>
              
              <div className="ml-3 flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className={`font-medium ${!notification.read ? 'text-khaki-800' : ''}`}>
                    {notification.title}
                    {!notification.read && (
                      <span className="inline-block w-2 h-2 bg-khaki-600 rounded-full ml-2"></span>
                    )}
                  </h3>
                  <span className="text-xs text-gray-500">{notification.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientAreaNotifications;
