
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const SecurityAlert = () => {
  return (
    <Alert className="mt-4 bg-amber-50 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-700">Accès sécurisé</AlertTitle>
      <AlertDescription className="text-amber-600">
        Vos données sont protégées et strictement confidentielles. 
        Seules les personnes autorisées peuvent accéder à votre espace client.
      </AlertDescription>
    </Alert>
  );
};

export default SecurityAlert;
