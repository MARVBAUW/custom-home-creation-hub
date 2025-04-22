
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { calculateHeatingCost, calculateAirConditioningCost } from '../utils/montantUtils';
import { ensureNumber, ensureBoolean, ensureString } from '../utils/typeConversions';
import { Thermometer, Wind, Leaf, PiggyBank } from 'lucide-react';

const ChauffageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [heatingType, setHeatingType] = useState<string>(
    formData.heatingType?.toString() || 'standard'
  );
  
  const [hasAirConditioning, setHasAirConditioning] = useState<boolean>(
    ensureBoolean(formData.hasAirConditioning)
  );

  const handleSubmit = () => {
    // Get the surface area
    const surface = ensureNumber(formData.surface);
    
    // Calculate the heating cost based on type and surface
    const heatingCost = calculateHeatingCost(heatingType, surface);
    
    // Calculate the air conditioning cost if selected
    const airConditioningCost = calculateAirConditioningCost(hasAirConditioning, surface);
    
    // Total additional cost
    const additionalCost = heatingCost + airConditioningCost;

    // Update form data with heating type, air conditioning, and additional cost
    updateFormData({
      heatingType,
      hasAirConditioning,
      montantT: ensureNumber(formData.montantT) + additionalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Chauffage et Climatisation</h3>
        
        <div>
          <Label className="mb-2 block">Système de chauffage souhaité</Label>
          <RadioGroup 
            value={heatingType} 
            onValueChange={setHeatingType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Thermometer className="h-8 w-8 text-amber-500 mb-2" />
                <RadioGroupItem value="standard" id="heating-standard" className="sr-only" />
                <Label htmlFor="heating-standard" className="font-medium">Meilleur rapport qualité prix</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Système de chauffage standard mais performant
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'eco' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('eco')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Leaf className="h-8 w-8 text-green-500 mb-2" />
                <RadioGroupItem value="eco" id="heating-eco" className="sr-only" />
                <Label htmlFor="heating-eco" className="font-medium">Le plus écologique</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Systèmes à faible impact environnemental
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'economic' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('economic')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <PiggyBank className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="economic" id="heating-economic" className="sr-only" />
                <Label htmlFor="heating-economic" className="font-medium">Le plus économique</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Solution à moindre coût de fonctionnement
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'sans_avis' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('sans_avis')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <RadioGroupItem value="sans_avis" id="heating-sans_avis" className="sr-only" />
                <Label htmlFor="heating-sans_avis" className="font-medium">Sans avis</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommandation par un professionnel
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHeatingType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <RadioGroupItem value="non_concerne" id="heating-non_concerne" className="sr-only" />
                <Label htmlFor="heating-non_concerne" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de système de chauffage requis
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="pt-5 border-t">
          <Label className="mb-2 block">Climatisation - Rénovation / Création</Label>
          <RadioGroup 
            value={hasAirConditioning ? "yes" : "no"} 
            onValueChange={(value) => setHasAirConditioning(value === "yes")}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${!hasAirConditioning ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHasAirConditioning(false)}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Wind className="h-8 w-8 text-gray-500 mb-2" />
                <RadioGroupItem value="no" id="ac-no" className="sr-only" />
                <Label htmlFor="ac-no" className="font-medium">Non</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de climatisation requise
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${hasAirConditioning ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setHasAirConditioning(true)}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Wind className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="yes" id="ac-yes" className="sr-only" />
                <Label htmlFor="ac-yes" className="font-medium">Oui</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Installation de climatisation
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'sans_avis' && !hasAirConditioning ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => {
                setHeatingType('sans_avis');
                setHasAirConditioning(false);
              }}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <RadioGroupItem value="sans_avis" id="ac-sans_avis" className="sr-only" />
                <Label htmlFor="ac-sans_avis" className="font-medium">Sans avis</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommandation par un professionnel
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'non_concerne' && !hasAirConditioning ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => {
                setHeatingType('non_concerne');
                setHasAirConditioning(false);
              }}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <RadioGroupItem value="non_concerne" id="ac-non_concerne" className="sr-only" />
                <Label htmlFor="ac-non_concerne" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas applicable à ce projet
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ChauffageForm;
