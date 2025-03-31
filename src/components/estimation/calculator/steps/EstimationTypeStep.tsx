
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Clock, LineChart } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface EstimationTypeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const EstimationTypeStep: React.FC<EstimationTypeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [estimationType, setEstimationType] = React.useState<string>(formData.estimationType || '');
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(formData.termsAccepted || false);
  
  // Show additional notes for renovation or division projects with quick estimation
  const isRenovationOrDivision = formData.projectType === 'renovation' || formData.projectType === 'division';
  const showAdditionalNotes = isRenovationOrDivision && estimationType === 'quick';

  const handleSubmit = () => {
    // Update the form data
    updateFormData({ 
      estimationType: estimationType,
      termsAccepted: termsAccepted
    });
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Type d'estimation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${estimationType === 'quick' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => setEstimationType('quick')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <Clock className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Rapide 5 mins</h3>
            <p className="text-sm text-gray-600">Précision à + ou - 10%</p>
            <p className="text-xs text-gray-500 mt-2">L'estimation rapide demande peu ou pas de connaissances</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${estimationType === 'precise' ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => setEstimationType('precise')}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <LineChart className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Précise 15 mins</h3>
            <p className="text-sm text-gray-600">Précision à + ou - 5%</p>
            <p className="text-xs text-gray-500 mt-2">L'estimation précise demande quelques connaissances dans le domaine</p>
          </CardContent>
        </Card>
      </div>
      
      {showAdditionalNotes && (
        <div className="bg-gray-50 p-4 rounded-md space-y-3 mt-6">
          <p className="text-sm">
            <strong>NOTA :</strong> Pour les questions nécessitant des quantités (m², ml, nombre, %), il n'est pas nécessaire d'indiquer des valeurs avec une précision absolue. L'important est de donner une estimation selon votre propre appréciation, afin que nous puissions vous fournir une estimation indicative adaptée.
          </p>
          <p className="text-sm">
            <strong>NOTA :</strong> Pour les questions nécessitant un niveau de gamme (Base, milieu de gamme, haut de gamme, premium), ces précisions ont une vocation économique : standards étant le plus économique $ , haut de gamme ou prémium étant le moins économique $$$.
          </p>
          
          <div className="flex items-start space-x-2 mt-3">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-1"
            />
            <Label 
              htmlFor="terms" 
              className="text-sm font-normal cursor-pointer"
            >
              J'ai pris connaissance des NOTA.
            </Label>
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-4">
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
          disabled={estimationType === '' || (showAdditionalNotes && !termsAccepted)}
          className="flex items-center gap-2"
        >
          Poursuivre
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EstimationTypeStep;
