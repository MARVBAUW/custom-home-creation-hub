
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Bell, Clock, Calendar } from 'lucide-react';

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
        Notre système d'intelligence artificielle analyse les sources officielles et publie automatiquement 3 articles par semaine sur les nouvelles réglementations affectant la construction et l'immobilier.
        <div className="mt-2 text-sm flex flex-col sm:flex-row sm:gap-4 text-khaki-600">
          <span className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" /> Dernière mise à jour : {lastUpdate}
          </span>
          <span className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" /> Prochaine publication : {nextScheduledUpdate}
          </span>
        </div>
      </AlertDescription>
    </Alert>
  );
};
