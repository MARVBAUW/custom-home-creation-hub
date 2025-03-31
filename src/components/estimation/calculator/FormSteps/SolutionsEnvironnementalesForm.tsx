
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ensureNumber } from '../utils/typeConversions';
import { calculateEnvironmentalSolutionsCost } from '../utils/montantUtils';
import { Leaf, Trees, Recycle, XCircle } from 'lucide-react';

const SolutionsEnvironnementalesForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [solutionType, setSolutionType] = useState<string>(
    formData.environmentalSolutionType || 'none'
  );

  const handleSubmit = () => {
    // Get the current total amount
    const currentTotal = ensureNumber(formData.montantT, 0);
    
    // Map the UI option to the calculation parameter
    let calculationType = 'none';
    switch (solutionType) {
      case 'low':
        calculationType = 'low';
        break;
      case 'medium':
        calculationType = 'medium';
        break;
      case 'high':
        calculationType = 'high';
        break;
      default:
        calculationType = 'none';
    }
    
    // Calculate the additional cost for environmental solutions
    const additionalCost = calculateEnvironmentalSolutionsCost(calculationType, currentTotal);

    // Update form data with environmental solution type and additional cost
    updateFormData({
      environmentalSolutionType: solutionType,
      montantT: currentTotal + additionalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Solutions Environnementales</h3>
        
        <div>
          <Label className="mb-4 block">Quel est votre niveau d'intérêt pour les matériaux respectueux de l'environnement?</Label>
          <RadioGroup 
            value={solutionType} 
            onValueChange={setSolutionType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${solutionType === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSolutionType('none')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center h-full">
                <XCircle className="h-8 w-8 text-gray-500 mb-2" />
                <RadioGroupItem value="none" id="env-none" className="sr-only" />
                <Label htmlFor="env-none" className="font-medium">Non</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Solutions environnementales non prioritaires
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-gray-500">+0%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${solutionType === 'low' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSolutionType('low')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center h-full">
                <Leaf className="h-8 w-8 text-green-400 mb-2" />
                <RadioGroupItem value="low" id="env-low" className="sr-only" />
                <Label htmlFor="env-low" className="font-medium">Si Possible Dans Mon Budget</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Quelques éléments écologiques si le budget le permet
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-green-600">+1.8% du budget</span>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${solutionType === 'medium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSolutionType('medium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center h-full">
                <Recycle className="h-8 w-8 text-green-500 mb-2" />
                <RadioGroupItem value="medium" id="env-medium" className="sr-only" />
                <Label htmlFor="env-medium" className="font-medium">Moyennement Souhaité</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Utilisation modérée de matériaux écologiques
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-green-600">+3.8% du budget</span>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${solutionType === 'high' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSolutionType('high')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center h-full">
                <Trees className="h-8 w-8 text-green-600 mb-2" />
                <RadioGroupItem value="high" id="env-high" className="sr-only" />
                <Label htmlFor="env-high" className="font-medium">Fortement Souhaité</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Priorité aux matériaux écologiques et durables
                </p>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-medium text-green-600">+5.7% du budget</span>
                </div>
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
            <p className="text-sm font-medium">Total estimé: {formData.montantT.toLocaleString()} €</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionsEnvironnementalesForm;
