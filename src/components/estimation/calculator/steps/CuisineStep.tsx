
import React from 'react';
import { BaseFormProps } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Utensils } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ensureNumber } from '../utils/typeConversions';

const CuisineStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [kitchenType, setKitchenType] = React.useState<string>(formData.kitchenType || '');
  
  const handleSubmit = () => {
    // Calculate kitchen cost based on type and number of units
    let kitchenCost = 0;
    const units = ensureNumber(formData.units, 1);
    
    switch (kitchenType) {
      case 'kitchenette':
        kitchenCost = 3000 * units;
        break;
      case 'basic':
        kitchenCost = 5000 * units;
        break;
      case 'standard':
        kitchenCost = 8000 * units;
        break;
      case 'premium':
        kitchenCost = 15000 * units;
        break;
      default:
        kitchenCost = 0; // No kitchen
    }
    
    // Update form data with kitchen type and cost
    const currentMontantT = ensureNumber(formData.montantT, 0);
    
    updateFormData({
      kitchenType: kitchenType as 'none' | 'kitchenette' | 'basic' | 'standard' | 'premium',
      includeCuisine: kitchenType !== 'none',
      montantT: currentMontantT + kitchenCost
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-2">Cuisine équipée</h2>
      <p className="text-gray-600 mb-6">Sélectionnez le type de cuisine équipée que vous souhaitez inclure</p>
      
      <div className="space-y-4">
        <RadioGroup 
          value={kitchenType} 
          onValueChange={setKitchenType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'kitchenette' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setKitchenType('kitchenette')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="kitchenette" id="kitchenette" className="mr-2" />
                <Label htmlFor="kitchenette" className="cursor-pointer flex items-center">
                  <Utensils className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="font-medium">Kitchenette</span>
                    <p className="text-sm text-gray-600 mt-1">Solution compacte pour petits espaces</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setKitchenType('basic')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="basic" id="basic" className="mr-2" />
                <Label htmlFor="basic" className="cursor-pointer flex items-center">
                  <Utensils className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <span className="font-medium">Cuisine de base</span>
                    <p className="text-sm text-gray-600 mt-1">Cuisine fonctionnelle avec équipements essentiels</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setKitchenType('standard')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="standard" id="standard" className="mr-2" />
                <Label htmlFor="standard" className="cursor-pointer flex items-center">
                  <Utensils className="h-5 w-5 text-amber-500 mr-2" />
                  <div>
                    <span className="font-medium">Cuisine standard</span>
                    <p className="text-sm text-gray-600 mt-1">Cuisine milieu de gamme complète</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setKitchenType('premium')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="premium" id="premium" className="mr-2" />
                <Label htmlFor="premium" className="cursor-pointer flex items-center">
                  <Utensils className="h-5 w-5 text-purple-500 mr-2" />
                  <div>
                    <span className="font-medium">Cuisine premium</span>
                    <p className="text-sm text-gray-600 mt-1">Cuisine haut de gamme avec équipements premium</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setKitchenType('none')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="none" id="none" className="mr-2" />
                <Label htmlFor="none" className="cursor-pointer">Sans cuisine équipée</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      {formData.units && formData.units > 1 && kitchenType && kitchenType !== 'none' && (
        <div className="bg-gray-100 p-3 rounded-md">
          <p className="text-sm font-medium">
            Note : Le coût calculé sera proportionnel au nombre de logements ({formData.units}) dans votre projet.
          </p>
        </div>
      )}
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!kitchenType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CuisineStep;
