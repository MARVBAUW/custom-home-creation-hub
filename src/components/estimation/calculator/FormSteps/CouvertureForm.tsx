import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Grid, Square, Circle, Hexagon, Feather } from 'lucide-react';

const CouvertureForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [roofingType, setRoofingType] = React.useState<string>(
    defaultValues?.roofingType || formData.roofingType || 'tiles'
  );

  const handleSubmit = () => {
    const data = { roofingType };
    
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
          <h3 className="text-lg font-medium mb-4">Type de couverture</h3>
          
          <RadioGroup 
            value={roofingType} 
            onValueChange={setRoofingType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'tiles' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofingType('tiles')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="tiles" id="roof-tiles" className="mr-2" />
                <div className="flex items-center">
                  <Grid className="h-5 w-5 text-orange-500 mr-2" />
                  <Label htmlFor="roof-tiles">Tuiles</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'slate' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofingType('slate')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="slate" id="roof-slate" className="mr-2" />
                <div className="flex items-center">
                  <Square className="h-5 w-5 text-gray-700 mr-2" />
                  <Label htmlFor="roof-slate">Ardoises</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'metal' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofingType('metal')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="metal" id="roof-metal" className="mr-2" />
                <div className="flex items-center">
                  <Square className="h-5 w-5 text-blue-400 mr-2" />
                  <Label htmlFor="roof-metal">Métal (zinc, bac acier)</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'gravel' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofingType('gravel')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="gravel" id="roof-gravel" className="mr-2" />
                <div className="flex items-center">
                  <Circle className="h-5 w-5 text-gray-400 mr-2" />
                  <Label htmlFor="roof-gravel">Gravillons (toit plat)</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'green_roof' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofingType('green_roof')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="green_roof" id="roof-green" className="mr-2" />
                <div className="flex items-center">
                  <Feather className="h-5 w-5 text-green-500 mr-2" />
                  <Label htmlFor="roof-green">Toiture végétalisée</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${roofingType === 'membrane' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setRoofingType('membrane')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="membrane" id="roof-membrane" className="mr-2" />
                <div className="flex items-center">
                  <Hexagon className="h-5 w-5 text-gray-500 mr-2" />
                  <Label htmlFor="roof-membrane">Membrane PVC/EPDM</Label>
                </div>
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

export default CouvertureForm;
