
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User, Building } from 'lucide-react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from 'lucide-react';

interface ClientTypeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  animationDirection: string;
}

const ClientTypeStep: React.FC<ClientTypeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  animationDirection
}) => {
  const [clientType, setClientType] = React.useState<string>(formData.clientType || '');

  const handleSelect = (type: string) => {
    // First update the form data
    updateFormData({ 
      clientType: type
    });
    
    // Then proceed to next step after a short delay
    setTimeout(() => {
      goToNextStep();
    }, 100);
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Votre profil</h2>
      <p className="text-gray-600 mb-6">Vous êtes ?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.clientType === 'individual' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('individual')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <User className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Particulier</h3>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.clientType === 'professional' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('professional')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Building className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Professionnel</h3>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={() => {
            if (clientType) {
              handleSelect(clientType);
            }
          }}
          disabled={!clientType}
          className="px-6"
        >
          Poursuivre
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ClientTypeStep;
