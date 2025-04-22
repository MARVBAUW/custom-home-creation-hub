
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { calculateKitchenCost } from '../utils/montantUtils';
import { Utensils, Home, CheckSquare, LayoutGrid } from 'lucide-react';
import { ensureNumber } from '../utils/typeConversions';

const CuisineForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize state with existing form data or defaults
  const [kitchenType, setKitchenType] = useState<string>(
    formData.kitchenType || 'standard'
  );

  const handleSubmit = () => {
    // Calculate kitchen cost based on selected options
    const kitchenCost = calculateKitchenCost(kitchenType);
    
    // Update form data with kitchen options and cost
    updateFormData({
      kitchenType,
      kitchenCost,
      includeCuisine: true,
      montantT: (ensureNumber(formData.montantT) || 0) + kitchenCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  // Helper function to format price in euros
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Utensils className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-medium">Cuisine</h3>
        </div>
        
        <div className="mb-8">
          <Label className="mb-2 block">Type de cuisine</Label>
          <RadioGroup 
            value={kitchenType} 
            onValueChange={setKitchenType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setKitchenType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Home className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="standard" id="cuisine-standard" className="sr-only" />
                <Label htmlFor="cuisine-standard" className="font-medium">Standard</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Cuisine fonctionnelle avec équipements de base
                </p>
                <p className="text-sm font-medium mt-2">
                  {formatPrice(calculateKitchenCost('standard'))}
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setKitchenType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <LayoutGrid className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="premium" id="cuisine-premium" className="sr-only" />
                <Label htmlFor="cuisine-premium" className="font-medium">Premium</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Cuisine de qualité avec finitions soignées
                </p>
                <p className="text-sm font-medium mt-2">
                  {formatPrice(calculateKitchenCost('premium'))}
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'luxury' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setKitchenType('luxury')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <CheckSquare className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="luxury" id="cuisine-luxury" className="sr-only" />
                <Label htmlFor="cuisine-luxury" className="font-medium">Luxe</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Cuisine haut de gamme avec matériaux nobles
                </p>
                <p className="text-sm font-medium mt-2">
                  {formatPrice(calculateKitchenCost('luxury'))}
                </p>
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
        
        {formData.montantT && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium">Total estimé: {ensureNumber(formData.montantT).toLocaleString()} €</p>
            <p className="text-xs text-gray-500">
              + {formatPrice(calculateKitchenCost(kitchenType))} pour la cuisine
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CuisineForm;
