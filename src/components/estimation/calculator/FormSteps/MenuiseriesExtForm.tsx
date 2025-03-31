
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Square, Minimize2, Layers } from 'lucide-react';

const MenuiseriesExtForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [windowType, setWindowType] = React.useState<string>(
    formData.windowType || 'pvc'
  );
  
  const [windowRenovationArea, setWindowRenovationArea] = React.useState<string>(
    formData.windowRenovationArea?.toString() || '0'
  );
  
  const [windowNewArea, setWindowNewArea] = React.useState<string>(
    formData.windowNewArea?.toString() || '0'
  );

  const handleSubmit = () => {
    // Calculate the new montantT based on the window type and surface
    let additionalCost = 0;
    const windowNewAreaNum = parseFloat(windowNewArea || '0');
    const windowRenovationAreaNum = parseFloat(windowRenovationArea || '0');
    const totalWindowArea = windowNewAreaNum + windowRenovationAreaNum;

    if (totalWindowArea > 0) {
      switch (windowType) {
        case 'bois':
          additionalCost = totalWindowArea * 650;
          break;
        case 'pvc':
          additionalCost = totalWindowArea * 390;
          break;
        case 'aluminum':
          additionalCost = totalWindowArea * 620;
          break;
        case 'mixed':
          additionalCost = totalWindowArea * 690;
          break;
        case 'pvc_colored':
          additionalCost = totalWindowArea * 410;
          break;
        default:
          additionalCost = totalWindowArea * 390; // Default to PVC
      }
    }

    // Update form data with window details
    updateFormData({
      windowType,
      windowRenovationArea: windowRenovationArea !== '' ? Number(windowRenovationArea) : 0,
      windowNewArea: windowNewArea !== '' ? Number(windowNewArea) : 0,
      montantT: (formData.montantT || 0) + additionalCost
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Menuiseries Extérieures</h3>
        
        <div>
          <Label className="mb-2 block">Type de menuiseries</Label>
          <RadioGroup 
            value={windowType} 
            onValueChange={setWindowType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'pvc' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWindowType('pvc')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Square className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="pvc" id="window-pvc" className="sr-only" />
                <Label htmlFor="window-pvc" className="font-medium">PVC</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Bon rapport qualité/prix
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'aluminum' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWindowType('aluminum')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Minimize2 className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="aluminum" id="window-aluminum" className="sr-only" />
                <Label htmlFor="window-aluminum" className="font-medium">Aluminium</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Finesse et durabilité
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'mixed' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setWindowType('mixed')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Layers className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="mixed" id="window-mixed" className="sr-only" />
                <Label htmlFor="window-mixed" className="font-medium">Mixte (bois/alu)</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Esthétique et performance
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="window-renovation">Surface à rénover (m²)</Label>
            <Input
              id="window-renovation"
              type="number"
              placeholder="0"
              value={windowRenovationArea}
              onChange={(e) => setWindowRenovationArea(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Surface de menuiseries à remplacer
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="window-new">Surface à créer (m²)</Label>
            <Input
              id="window-new"
              type="number"
              placeholder="0"
              value={windowNewArea}
              onChange={(e) => setWindowNewArea(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Surface de nouvelles menuiseries
            </p>
          </div>
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

export default MenuiseriesExtForm;
