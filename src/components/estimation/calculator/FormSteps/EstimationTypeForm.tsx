import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calculator, ClipboardList } from 'lucide-react';

const EstimationTypeForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues
}) => {
  const [estimationType, setEstimationType] = React.useState<string>(
    defaultValues?.estimationType || formData.estimationType || 'basic'
  );
  
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(
    defaultValues?.termsAccepted || formData.termsAccepted || false
  );

  const handleSubmit = () => {
    const data = {
      estimationType,
      termsAccepted
    };
    
    updateFormData(data);
    
    if (props.onSubmit) {
      props.onSubmit(data);
    } else {
      goToNextStep();
    }
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Type d'estimation</h3>
          
          <RadioGroup 
            value={estimationType} 
            onValueChange={setEstimationType}
            className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${estimationType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEstimationType('basic')}
            >
              <CardContent className="pt-6 pb-6 text-center">
                <Calculator className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <RadioGroupItem value="basic" id="estimation-basic" className="mx-auto mb-2" />
                <Label htmlFor="estimation-basic" className="font-medium">Estimation rapide</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Basée sur des ratios moyens par mètre carré
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${estimationType === 'detailed' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setEstimationType('detailed')}
            >
              <CardContent className="pt-6 pb-6 text-center">
                <ClipboardList className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <RadioGroupItem value="detailed" id="estimation-detailed" className="mx-auto mb-2" />
                <Label htmlFor="estimation-detailed" className="font-medium">Estimation détaillée</Label>
                <p className="text-xs text-gray-500 mt-2">
                  Par corps d'état avec options
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        <div className="flex items-start space-x-3 pt-4">
          <Checkbox 
            id="terms" 
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <div>
            <Label htmlFor="terms" className="text-sm">
              J'accepte que mes données soient utilisées pour établir cette estimation
            </Label>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!termsAccepted}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstimationTypeForm;
