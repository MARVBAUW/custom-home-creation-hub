import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Layers, Grid, Box } from 'lucide-react';

const PlatrerieForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [plasteringType, setPlasteringType] = React.useState<string>(
    formData.plasteringType || 'traditional'
  );

  const handleSubmit = () => {
    updateFormData({
      plasteringType
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Type de plâtrerie</h3>
        
        <RadioGroup 
          value={plasteringType} 
          onValueChange={setPlasteringType}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'traditional' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPlasteringType('traditional')}
          >
            <CardContent className="pt-6 pb-6 text-center">
              <Layers className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <RadioGroupItem value="traditional" id="plaster-traditional" className="mx-auto mb-2" />
              <Label htmlFor="plaster-traditional" className="font-medium">Plâtre traditionnel</Label>
              <p className="text-xs text-gray-500 mt-2">
                Application manuelle, finition de qualité supérieure
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'plasterboard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPlasteringType('plasterboard')}
          >
            <CardContent className="pt-6 pb-6 text-center">
              <Grid className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <RadioGroupItem value="plasterboard" id="plaster-plasterboard" className="mx-auto mb-2" />
              <Label htmlFor="plaster-plasterboard" className="font-medium">Plaques de plâtre</Label>
              <p className="text-xs text-gray-500 mt-2">
                Installation rapide, bonne isolation thermique et acoustique
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'mixed' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPlasteringType('mixed')}
          >
            <CardContent className="pt-6 pb-6 text-center">
              <Box className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <RadioGroupItem value="mixed" id="plaster-mixed" className="mx-auto mb-2" />
              <Label htmlFor="plaster-mixed" className="font-medium">Mixte</Label>
              <p className="text-xs text-gray-500 mt-2">
                Combinaison de techniques selon les pièces et besoins
              </p>
            </CardContent>
          </Card>
        </RadioGroup>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleSubmit}>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlatrerieForm;
