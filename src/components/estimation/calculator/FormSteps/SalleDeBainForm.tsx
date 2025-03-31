
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { calculateBathroomCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/montantUtils';
import { Bath, Home, CheckSquare, Waves } from 'lucide-react';

const SalleDeBainForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize state with existing form data or defaults
  const [bathroomType, setBathroomType] = useState<string>(
    formData.bathroomType || 'standard'
  );
  const [bathroomCount, setBathroomCount] = useState<number>(
    Number(formData.bathroomCount || 1)
  );

  const handleSubmit = () => {
    // Calculate bathroom cost based on selected options
    const bathroomCost = calculateBathroomCost(bathroomType, bathroomCount);
    
    // Update form data with bathroom options and cost
    updateFormData({
      bathroomType,
      bathroomCount,
      includeBathroom: true,
      montantT: (formData.montantT || 0) + bathroomCost
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
          <Bath className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-medium">Salle de bain</h3>
        </div>
        
        <div className="mb-6">
          <Label className="mb-2 block">Type de salle de bain</Label>
          <RadioGroup 
            value={bathroomType} 
            onValueChange={setBathroomType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setBathroomType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Home className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="standard" id="bathroom-standard" className="sr-only" />
                <Label htmlFor="bathroom-standard" className="font-medium">Standard</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Salle de bain fonctionnelle avec équipements de base
                </p>
                <p className="text-sm font-medium mt-2">
                  {formatPrice(calculateBathroomCost('standard', 1))} / unité
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setBathroomType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Waves className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="premium" id="bathroom-premium" className="sr-only" />
                <Label htmlFor="bathroom-premium" className="font-medium">Premium</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Salle de bain de qualité avec finitions soignées
                </p>
                <p className="text-sm font-medium mt-2">
                  {formatPrice(calculateBathroomCost('premium', 1))} / unité
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'luxury' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setBathroomType('luxury')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <CheckSquare className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="luxury" id="bathroom-luxury" className="sr-only" />
                <Label htmlFor="bathroom-luxury" className="font-medium">Luxe</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Salle de bain haut de gamme avec matériaux nobles
                </p>
                <p className="text-sm font-medium mt-2">
                  {formatPrice(calculateBathroomCost('luxury', 1))} / unité
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between">
            <Label className="text-base font-medium">Nombre de salles de bain</Label>
            <span className="text-sm font-medium">{bathroomCount}</span>
          </div>
          <Slider
            value={[bathroomCount]}
            min={1}
            max={5}
            step={1}
            onValueChange={(value) => setBathroomCount(value[0])}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
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
        
        {formData.montantT && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium">Total estimé: {formData.montantT.toLocaleString()} €</p>
            <p className="text-xs text-gray-500">
              + {formatPrice(calculateBathroomCost(bathroomType, bathroomCount))} pour {bathroomCount} salle(s) de bain
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalleDeBainForm;
