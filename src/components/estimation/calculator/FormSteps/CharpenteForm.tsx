import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Triangle, Square, Pentagon, CornerRightUp, Home, Layers } from 'lucide-react';

const CharpenteForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [roofType, setRoofType] = React.useState<string>(
    defaultValues?.roofType || formData.roofType || 'gable'
  );

  const handleSubmit = () => {
    const data = { roofType };
    
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
    }
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Type de toiture</h3>
          
          <RadioGroup 
            value={roofType} 
            onValueChange={setRoofType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofType === 'gable' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofType('gable')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Triangle className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="gable" id="roof-gable" className="sr-only" />
                <Label htmlFor="roof-gable" className="font-medium">À deux pans</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Toiture traditionnelle à deux versants
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofType === 'hip' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofType('hip')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Pentagon className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="hip" id="roof-hip" className="sr-only" />
                <Label htmlFor="roof-hip" className="font-medium">À quatre pans</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Toiture avec quatre versants
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofType === 'flat' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofType('flat')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Square className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="flat" id="roof-flat" className="sr-only" />
                <Label htmlFor="roof-flat" className="font-medium">Toit terrasse</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Toiture plate ou à très faible pente
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofType === 'mono_pitch' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofType('mono_pitch')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <CornerRightUp className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="mono_pitch" id="roof-mono" className="sr-only" />
                <Label htmlFor="roof-mono" className="font-medium">Monopente</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Toiture avec un seul versant incliné
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofType === 'mansard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofType('mansard')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Home className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="mansard" id="roof-mansard" className="sr-only" />
                <Label htmlFor="roof-mansard" className="font-medium">Mansardé</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Toiture à la Mansart avec brisis et terrasson
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofType === 'complex' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofType('complex')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Layers className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="complex" id="roof-complex" className="sr-only" />
                <Label htmlFor="roof-complex" className="font-medium">Complexe</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Toiture avec plusieurs formes et niveaux
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
          >
            Précédent
          </Button>
          
          <Button 
            type="button" 
            onClick={handleSubmit}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharpenteForm;
