import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { User, Building2 } from 'lucide-react';
import { BaseFormProps } from '../types/baseFormProps';

const ClientTypeForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  animationDirection
}) => {
  const [projectType, setProjectType] = React.useState<string>(
    formData.projectType || ''
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
        <h3 className="text-lg font-medium mb-4">Type de projet</h3>
        
        <RadioGroup 
          value={projectType} 
          onValueChange={setProjectType}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'construction' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('construction')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Building2 className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="construction" id="construction" className="mx-auto mb-2" />
              <Label htmlFor="construction" className="font-medium">Construction neuve</Label>
              <p className="text-xs text-gray-500 mt-2">
                Construction d'une maison ou d'un bâtiment neuf
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('renovation')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <User className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="renovation" id="renovation" className="mx-auto mb-2" />
              <Label htmlFor="renovation" className="font-medium">Rénovation</Label>
              <p className="text-xs text-gray-500 mt-2">
                Rénovation d'un bâtiment existant
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'extension' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('extension')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Building2 className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="extension" id="extension" className="mx-auto mb-2" />
              <Label htmlFor="extension" className="font-medium">Extension</Label>
              <p className="text-xs text-gray-500 mt-2">
                Extension d'un bâtiment existant
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'agencement' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('agencement')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <User className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="agencement" id="agencement" className="mx-auto mb-2" />
              <Label htmlFor="agencement" className="font-medium">Agencement intérieur</Label>
              <p className="text-xs text-gray-500 mt-2">
                Aménagement ou réagencement des espaces intérieurs
              </p>
            </CardContent>
          </Card>
        </RadioGroup>
        
        <div className="pt-4">
          <Button 
            type="button" 
            onClick={handleSubmit}
            disabled={!projectType}
            className="w-full"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientTypeForm;
