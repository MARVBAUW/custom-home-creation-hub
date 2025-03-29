
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Home, Ruler, PenTool, Building, Plus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProjectTypeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const ProjectTypeStep: React.FC<ProjectTypeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [projectType, setProjectType] = React.useState<string>(formData.projectType || 'construction');
  const [landIncluded, setLandIncluded] = React.useState<string>(formData.landIncluded || 'yes');

  const handleContinue = () => {
    updateFormData({ 
      projectType, 
      landIncluded 
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Type de projet</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'construction' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('construction')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Home className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Construction</h4>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('renovation')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Building className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Rénovation</h4>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'extension' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('extension')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Plus className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Extension</h4>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'design' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('design')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <PenTool className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Conception</h4>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {projectType === 'construction' && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Inclure le terrain?</h3>
          <RadioGroup 
            value={landIncluded} 
            onValueChange={setLandIncluded}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="option-yes" />
              <Label htmlFor="option-yes">Oui, j'ai besoin d'inclure le terrain dans l'estimation</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="option-no" />
              <Label htmlFor="option-no">Non, j'ai déjà un terrain</Label>
            </div>
          </RadioGroup>
        </div>
      )}
      
      <div className="pt-4">
        <Button 
          onClick={handleContinue}
          className="w-full"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default ProjectTypeStep;
