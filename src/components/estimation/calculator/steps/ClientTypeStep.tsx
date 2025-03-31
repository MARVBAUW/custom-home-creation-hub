
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Home, Hammer, Maximize, Columns } from 'lucide-react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";

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
  const [projectType, setProjectType] = React.useState<string>(formData.projectType || '');

  const handleSelect = (type: string) => {
    // First update the form data
    updateFormData({ 
      projectType: type,
      clientType: 'individual' // Default to individual for this flow
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
      <h2 className="text-xl font-semibold mb-4">Type de projet</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'construction' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('construction')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Home className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Construction neuve</h3>
            <p className="text-sm text-gray-500">
              Construction d'une maison ou d'un bâtiment neuf
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('renovation')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Hammer className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Rénovation</h3>
            <p className="text-sm text-gray-500">
              Rénovation d'un bâtiment existant
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'extension' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('extension')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Maximize className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Extension</h3>
            <p className="text-sm text-gray-500">
              Extension d'un bâtiment existant
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'agencement' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('agencement')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Columns className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Agencement intérieur</h3>
            <p className="text-sm text-gray-500">
              Aménagement ou réagencement des espaces intérieurs
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientTypeStep;
