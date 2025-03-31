
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Home, Hammer, Maximize, Columns, Printer, Scissors } from 'lucide-react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface IndividualProjectTypeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const IndividualProjectTypeStep: React.FC<IndividualProjectTypeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [projectType, setProjectType] = React.useState<string>(formData.projectType || '');

  const handleSelect = (type: string) => {
    // Update the form data
    updateFormData({ 
      projectType: type,
    });
    
    // Proceed to next step with a slight delay for animation
    setTimeout(() => {
      goToNextStep();
    }, 100);
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Informations sur votre projet</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6 text-sm">
        <p>Cet estimatif de travaux est fourni à titre indicatif pour vous aider dans votre prise de décision. Il ne remplace pas un devis complet, qui nécessite un rendez-vous avec un maître d'œuvre ou des artisans pour étudier votre projet en détail et adapter le chiffrage à vos besoins spécifiques.</p>
      </div>
      
      <p className="font-medium mb-4">Quel type de projet ? <span className="text-red-500">*</span></p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'construction' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('construction')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Home className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Construction</h3>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('renovation')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Hammer className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Rénovation</h3>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'extension' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('extension')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Maximize className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Extension</h3>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'optimization' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('optimization')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Printer className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Optimisation</h3>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'division' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('division')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Scissors className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Division</h3>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${formData.projectType === 'design' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('design')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Columns className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Design d'espace / décoration</h3>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
        
        <Button 
          onClick={() => {
            if (projectType) {
              handleSelect(projectType);
            }
          }}
          disabled={!projectType}
          className="flex items-center gap-2"
        >
          Poursuivre
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default IndividualProjectTypeStep;
