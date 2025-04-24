
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Home, Hammer, Maximize, Columns, PencilRuler } from 'lucide-react';
import { Button } from "@/components/ui/button";

const IndividualProjectForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues = {}
}) => {
  const [projectType, setProjectType] = React.useState<string>(
    (defaultValues?.projectType as string) || 
    (formData.projectType as string) || 
    'construction'
  );

  const handleSubmit = () => {
    updateFormData({ projectType });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Quel type de projet souhaitez-vous réaliser ?</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'construction' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('construction')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Home className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Construction neuve</h4>
              <p className="text-xs text-gray-500 mt-2">
                Construction d'une maison ou d'un bâtiment
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('renovation')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Hammer className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Rénovation</h4>
              <p className="text-xs text-gray-500 mt-2">
                Rénovation d'un bien existant
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'extension' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('extension')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Maximize className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Extension</h4>
              <p className="text-xs text-gray-500 mt-2">
                Agrandissement d'un bien existant
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'amenagement' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('amenagement')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Columns className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Aménagement</h4>
              <p className="text-xs text-gray-500 mt-2">
                Aménagement intérieur ou extérieur
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'design' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('design')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <PencilRuler className="h-10 w-10 text-blue-500 mb-3" />
              <h4 className="font-medium">Conception/Plans</h4>
              <p className="text-xs text-gray-500 mt-2">
                Conception architecturale et plans
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleSubmit}>
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndividualProjectForm;
