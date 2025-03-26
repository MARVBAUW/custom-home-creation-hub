
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, Calendar } from 'lucide-react';

interface LastUpdateInfoProps {
  lastUpdate: string;
  nextScheduledUpdate: string;
}

export const LastUpdateInfo: React.FC<LastUpdateInfoProps> = ({ lastUpdate, nextScheduledUpdate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Alert className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm">
        <Clock className="h-4 w-4 text-blue-500 mr-2" />
        <AlertTitle className="font-medium text-blue-700 dark:text-blue-300">Dernière mise à jour</AlertTitle>
        <AlertDescription className="text-blue-600/80 dark:text-blue-300/80 mt-1">
          {lastUpdate}
        </AlertDescription>
      </Alert>
      
      <Alert className="border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/10 shadow-sm">
        <Calendar className="h-4 w-4 text-amber-500 mr-2" />
        <AlertTitle className="font-medium text-amber-700 dark:text-amber-300">Prochaine mise à jour</AlertTitle>
        <AlertDescription className="text-amber-600/80 dark:text-amber-300/80 mt-1">
          {nextScheduledUpdate}
        </AlertDescription>
      </Alert>
    </div>
  );
};
