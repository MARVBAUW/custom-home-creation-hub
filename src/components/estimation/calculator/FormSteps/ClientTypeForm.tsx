
import React from 'react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Building2, ArrowRightIcon } from 'lucide-react';

interface ClientTypeFormProps {
  defaultValues: {
    clientType?: string;
  };
  onSubmit: (data: { clientType: string }) => void;
  animationDirection: 'forward' | 'backward';
}

const ClientTypeForm: React.FC<ClientTypeFormProps> = ({ 
  defaultValues,
  onSubmit,
  animationDirection
}) => {
  const [clientType, setClientType] = React.useState<string>(defaultValues.clientType || "");

  const handleContinue = (selectedType: string) => {
    setClientType(selectedType);
    onSubmit({ clientType: selectedType });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Bienvenue sur notre estimateur de projet</h2>
        <p className="text-gray-600 mt-2">
          Obtenez une estimation détaillée et personnalisée pour votre projet de construction ou rénovation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${clientType === 'individual' ? 'border-progineer-gold bg-progineer-gold/5' : ''}`}
          onClick={() => handleContinue('individual')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <User className="h-12 w-12 text-progineer-gold mb-4" />
            <h3 className="text-lg font-medium mb-2">Particulier</h3>
            <p className="text-sm text-gray-500">
              Vous êtes un particulier et souhaitez estimer un projet personnel
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${clientType === 'professional' ? 'border-progineer-gold bg-progineer-gold/5' : ''}`}
          onClick={() => handleContinue('professional')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Building2 className="h-12 w-12 text-progineer-gold mb-4" />
            <h3 className="text-lg font-medium mb-2">Professionnel</h3>
            <p className="text-sm text-gray-500">
              Vous êtes un professionnel et souhaitez estimer un projet pour un client
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 text-center">
        <Button
          onClick={() => onSubmit({ clientType })}
          disabled={!clientType}
          className="bg-progineer-gold hover:bg-progineer-gold/90"
        >
          Commencer l'estimation
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ClientTypeForm;
