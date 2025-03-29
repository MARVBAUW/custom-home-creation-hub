
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { User, Building2 } from 'lucide-react';

interface ClientTypeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const ClientTypeStep: React.FC<ClientTypeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [clientType, setClientType] = React.useState<string>(formData.clientType || '');

  const handleSelect = (type: string) => {
    setClientType(type);
    updateFormData({ clientType: type });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${clientType === 'individual' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('individual')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <User className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Particulier</h3>
            <p className="text-sm text-gray-500">
              Vous êtes un particulier et souhaitez estimer un projet personnel
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${clientType === 'professional' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('professional')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Building2 className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Professionnel</h3>
            <p className="text-sm text-gray-500">
              Vous êtes un professionnel et souhaitez estimer un projet pour un client
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientTypeStep;
