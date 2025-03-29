import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Box, Layers, Square } from 'lucide-react';

const GrosOeuvreForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [wallType, setWallType] = React.useState<string>(
    formData.wallType || 'concrete_blocks'
  );
  
  const [foundationType, setFoundationType] = React.useState<string>(
    formData.foundationType || 'strip'
  );

  const handleSubmit = () => {
    updateFormData({
      wallType,
      foundationType
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Structure des murs</h3>
          
          <RadioGroup 
            value={wallType} 
            onValueChange={setWallType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'concrete_blocks' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallType('concrete_blocks')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="concrete_blocks" id="wall-concrete" className="mr-2" />
                <Label htmlFor="wall-concrete" className="flex items-center">
                  <Square className="h-4 w-4 mr-2 text-gray-500" />
                  Parpaings
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'brick' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallType('brick')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="brick" id="wall-brick" className="mr-2" />
                <Label htmlFor="wall-brick" className="flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-orange-500" />
                  Briques
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'wood_frame' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallType('wood_frame')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="wood_frame" id="wall-wood" className="mr-2" />
                <Label htmlFor="wall-wood" className="flex items-center">
                  <Box className="h-4 w-4 mr-2 text-amber-700" />
                  Ossature bois
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${wallType === 'concrete' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWallType('concrete')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="concrete" id="wall-concrete-solid" className="mr-2" />
                <Label htmlFor="wall-concrete-solid" className="flex items-center">
                  <Square className="h-4 w-4 mr-2 text-gray-700" />
                  Béton armé
                </Label>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Type de fondations</h3>
          
          <RadioGroup 
            value={foundationType} 
            onValueChange={setFoundationType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${foundationType === 'strip' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFoundationType('strip')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="strip" id="foundation-strip" className="mr-2" />
                <Label htmlFor="foundation-strip">Semelles filantes</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${foundationType === 'slab' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFoundationType('slab')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="slab" id="foundation-slab" className="mr-2" />
                <Label htmlFor="foundation-slab">Dalle pleine</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${foundationType === 'crawl_space' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFoundationType('crawl_space')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="crawl_space" id="foundation-crawl" className="mr-2" />
                <Label htmlFor="foundation-crawl">Vide sanitaire</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${foundationType === 'basement' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setFoundationType('basement')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="basement" id="foundation-basement" className="mr-2" />
                <Label htmlFor="foundation-basement">Sous-sol</Label>
              </CardContent>
            </Card>
          </RadioGroup>
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

export default GrosOeuvreForm;
