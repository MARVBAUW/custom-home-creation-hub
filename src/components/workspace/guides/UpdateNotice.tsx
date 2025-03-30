
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export const UpdateNotice: React.FC = () => {
  return (
    <Card className="bg-khaki-50 border-khaki-100">
      <CardContent className="p-6">
        <h3 className="font-medium mb-2 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-khaki-600" />
          Mise à jour automatique
        </h3>
        <p className="text-sm text-gray-600">
          Nos guides et ressources sont mis à jour régulièrement pour refléter les dernières réglementations et meilleures pratiques du secteur. 
          Vous avez toujours accès aux versions les plus récentes.
        </p>
      </CardContent>
    </Card>
  );
};
