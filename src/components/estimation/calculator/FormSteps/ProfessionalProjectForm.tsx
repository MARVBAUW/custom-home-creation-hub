
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Building, Factory, Store, Wrench } from 'lucide-react';

const ProfessionalProjectForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [projectType, setProjectType] = React.useState<string>(
    defaultValues?.projectType || formData.projectType || 'bureaux'
  );

  const handleContinue = () => {
    const data = { projectType };
    
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
      goToNextStep();
    }
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Type de projet professionnel</h3>
          
          <RadioGroup 
            value={projectType} 
            onValueChange={setProjectType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'bureaux' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setProjectType('bureaux')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Building className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="bureaux" id="project-offices" className="mx-auto mb-2" />
                <Label htmlFor="project-offices" className="font-medium">Bureaux</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Construction ou rénovation d'espaces de bureaux
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'commerce' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setProjectType('commerce')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Store className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="commerce" id="project-commerce" className="mx-auto mb-2" />
                <Label htmlFor="project-commerce" className="font-medium">Commerce</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Boutique, restaurant ou espace commercial
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'industrie' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setProjectType('industrie')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Factory className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="industrie" id="project-industry" className="mx-auto mb-2" />
                <Label htmlFor="project-industry" className="font-medium">Industrie</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Bâtiment industriel ou entrepôt
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setProjectType('renovation')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Wrench className="h-10 w-10 text-orange-500 mb-3" />
                <RadioGroupItem value="renovation" id="project-renovation" className="mx-auto mb-2" />
                <Label htmlFor="project-renovation" className="font-medium">Rénovation</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Rénovation d'un espace professionnel existant
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleContinue}>
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProjectForm;
