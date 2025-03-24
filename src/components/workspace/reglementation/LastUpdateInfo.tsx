
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Bell, Clock, Calendar, RefreshCw } from 'lucide-react';

interface LastUpdateInfoProps {
  lastUpdate: string;
  nextScheduledUpdate: string;
}

export const LastUpdateInfo: React.FC<LastUpdateInfoProps> = ({ lastUpdate, nextScheduledUpdate }) => {
  return (
    <Alert className="bg-khaki-50 border-khaki-200 mb-6">
      <Bell className="h-4 w-4 text-khaki-700" />
      <AlertTitle className="text-khaki-800">Publication automatisée par IA</AlertTitle>
      <AlertDescription className="text-khaki-700">
        Notre système d'intelligence artificielle surveille et analyse quotidiennement les sources officielles (Journal Officiel, Légifrance, sites ministériels) et publie automatiquement des articles sur les nouvelles réglementations affectant la construction, l'immobilier et les métiers du bâtiment.
        <div className="mt-3 p-2 bg-white bg-opacity-60 rounded-md border border-khaki-100">
          <div className="text-sm flex flex-col sm:flex-row sm:gap-4 text-khaki-700">
            <span className="flex items-center mb-1 sm:mb-0">
              <Clock className="h-3.5 w-3.5 mr-1 flex-shrink-0" /> 
              <span>Dernière mise à jour : <strong>{lastUpdate}</strong></span>
            </span>
            <span className="flex items-center mb-1 sm:mb-0">
              <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" /> 
              <span>Prochaine publication : <strong>{nextScheduledUpdate}</strong></span>
            </span>
            <span className="flex items-center">
              <RefreshCw className="h-3.5 w-3.5 mr-1 flex-shrink-0" /> 
              <span>Fréquence : <strong>3 articles par semaine</strong></span>
            </span>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
