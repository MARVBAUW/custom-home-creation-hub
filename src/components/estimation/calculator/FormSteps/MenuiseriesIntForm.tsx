import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Door, DoorOpen, LayoutGrid } from 'lucide-react';

const MenuiseriesIntForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [doorType, setDoorType] = React.useState<string>(
    defaultValues?.doorType || formData.doorType || 'standard'
  );
  
  const [interiorDoorsType, setInteriorDoorsType] = React.useState<string>(
    defaultValues?.interiorDoorsType || formData.interiorDoorsType || 'standard'
  );
  
  const [selectedFittings, setSelectedFittings] = React.useState<string[]>(
    formData.interiorFittings as string[] || []
  );

  const handleFittingChange = (fitting: string) => {
    setSelectedFittings(prev => {
      if (prev.includes(fitting)) {
        return prev.filter(item => item !== fitting);
      } else {
        return [...prev, fitting];
      }
    });
  };

  const handleSubmit = () => {
    const data = {
      doorType,
      interiorDoorsType,
      interiorFittings: selectedFittings
    };
    
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
          <h3 className="text-lg font-medium mb-4">Menuiseries intérieures</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="block mb-2">Type de portes intérieures</Label>
              <RadioGroup 
                value={doorType} 
                onValueChange={setDoorType}
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setDoorType('standard')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <Door className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <RadioGroupItem value="standard" id="door-standard" className="sr-only" />
                    <Label htmlFor="door-standard">Standard</Label>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setDoorType('premium')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <DoorOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <RadioGroupItem value="premium" id="door-premium" className="sr-only" />
                    <Label htmlFor="door-premium">Premium</Label>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${doorType === 'design' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setDoorType('design')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <LayoutGrid className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <RadioGroupItem value="design" id="door-design" className="sr-only" />
                    <Label htmlFor="door-design">Design</Label>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="block mb-2">Matériau des portes</Label>
              <RadioGroup 
                value={interiorDoorsType} 
                onValueChange={setInteriorDoorsType}
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${interiorDoorsType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setInteriorDoorsType('standard')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="standard" id="material-standard" className="sr-only" />
                    <Label htmlFor="material-standard">Mélaminé</Label>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${interiorDoorsType === 'wood' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setInteriorDoorsType('wood')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="wood" id="material-wood" className="sr-only" />
                    <Label htmlFor="material-wood">Bois massif</Label>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${interiorDoorsType === 'glass' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setInteriorDoorsType('glass')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="glass" id="material-glass" className="sr-only" />
                    <Label htmlFor="material-glass">Vitrées</Label>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="block mb-2">Aménagements intérieurs</Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Card className="shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="fitting-wardrobe" 
                        checked={selectedFittings.includes('built_in_wardrobe')}
                        onCheckedChange={() => handleFittingChange('built_in_wardrobe')}
                      />
                      <div>
                        <Label htmlFor="fitting-wardrobe" className="text-base font-medium">
                          Placards intégrés
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="fitting-closet" 
                        checked={selectedFittings.includes('walk_in_closet')}
                        onCheckedChange={() => handleFittingChange('walk_in_closet')}
                      />
                      <div>
                        <Label htmlFor="fitting-closet" className="text-base font-medium">
                          Dressing
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="fitting-fireplace" 
                        checked={selectedFittings.includes('fireplace')}
                        onCheckedChange={() => handleFittingChange('fireplace')}
                      />
                      <div>
                        <Label htmlFor="fitting-fireplace" className="text-base font-medium">
                          Cheminée
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="fitting-stairs" 
                        checked={selectedFittings.includes('stairs')}
                        onCheckedChange={() => handleFittingChange('stairs')}
                      />
                      <div>
                        <Label htmlFor="fitting-stairs" className="text-base font-medium">
                          Escalier
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
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

export default MenuiseriesIntForm;
