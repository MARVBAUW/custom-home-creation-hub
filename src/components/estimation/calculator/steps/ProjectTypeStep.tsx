
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowUpCircle, Wrench } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProjectTypeStepProps {
  formData: FormData;
  updateFormData: (data: { projectType: string; landIncluded?: string }) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const ProjectTypeStep: React.FC<ProjectTypeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [projectType, setProjectType] = React.useState<string>(formData.projectType || '');

  const handleSelect = (type: string) => {
    setProjectType(type);
    updateFormData({ projectType: type });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'construction' ? 'border-blue-500 bg-blue-50' : ''}`}
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
          className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('renovation')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Wrench className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Rénovation</h3>
            <p className="text-sm text-gray-500">
              Rénovation d'un bâtiment existant
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'extension' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => handleSelect('extension')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <ArrowUpCircle className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Extension</h3>
            <p className="text-sm text-gray-500">
              Agrandissement d'un bâtiment existant
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-start">
        <Button variant="outline" onClick={goToPreviousStep}>
          Retour
        </Button>
      </div>
    </div>
  );
};

export default ProjectTypeStep;
