
import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Calculator, BarChart, FileText } from 'lucide-react';

const EstimationTypeForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [estimationType, setEstimationType] = React.useState<string>(
    defaultValues?.estimationType || formData.estimationType || 'standard'
  );

  const handleContinue = () => {
    const data = { estimationType };
    
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
          <h3 className="text-lg font-medium mb-4">Type d'estimation souhaitée</h3>
          
          <RadioGroup 
            value={estimationType} 
            onValueChange={setEstimationType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${estimationType === 'quick' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEstimationType('quick')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <Calculator className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="quick" id="estimation-quick" className="mx-auto mb-2" />
                <Label htmlFor="estimation-quick" className="font-medium">Rapide</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Estimation approximative en quelques questions
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${estimationType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEstimationType('standard')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <BarChart className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="standard" id="estimation-standard" className="mx-auto mb-2" />
                <Label htmlFor="estimation-standard" className="font-medium">Standard</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Estimation détaillée avec ventilation des coûts
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${estimationType === 'detailed' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEstimationType('detailed')}
            >
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <FileText className="h-10 w-10 text-blue-500 mb-3" />
                <RadioGroupItem value="detailed" id="estimation-detailed" className="mx-auto mb-2" />
                <Label htmlFor="estimation-detailed" className="font-medium">Détaillée</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Estimation complète par corps d'état avec un rapport détaillé
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleContinue}>
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstimationTypeForm;
