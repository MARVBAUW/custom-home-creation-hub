
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Construction } from 'lucide-react';
import { BaseFormProps } from '../types/formTypes';

interface DemolitionStepProps extends BaseFormProps {}

const DemolitionStep: React.FC<DemolitionStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [needsDemolition, setNeedsDemolition] = React.useState<boolean>(
    formData.needsDemolition === true
  );
  
  const [demolitionArea, setDemolitionArea] = React.useState<number>(
    typeof formData.demolitionArea === 'number' ? formData.demolitionArea : 0
  );
  
  // Handle radio button change
  const handleDemolitionChange = (value: string) => {
    const needsDemolition = value === 'yes';
    setNeedsDemolition(needsDemolition);
    updateFormData({ 
      needsDemolition,
      // If no demolition needed, reset the area
      demolitionArea: needsDemolition ? demolitionArea : 0 
    });
  };
  
  // Handle slider change
  const handleAreaChange = (value: number[]) => {
    const area = value[0];
    setDemolitionArea(area);
    updateFormData({ demolitionArea: area });
  };

  // Form submission
  const handleNext = () => {
    updateFormData({
      needsDemolition,
      demolitionArea
    });
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Démolition préalable</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-medium">Avez-vous besoin de travaux de démolition avant construction ?</h3>
          
          <RadioGroup 
            value={needsDemolition ? 'yes' : 'no'}
            onValueChange={handleDemolitionChange}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="yes" id="demolition-yes" />
              <Label htmlFor="demolition-yes" className="flex items-center gap-2 cursor-pointer">
                <Construction className="h-5 w-5 text-red-500" />
                <span>Oui</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="no" id="demolition-no" />
              <Label htmlFor="demolition-no" className="cursor-pointer">Non</Label>
            </div>
          </RadioGroup>
        </div>
        
        {needsDemolition && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium mb-2">Surface à démolir (en m²)</h3>
              <div className="flex flex-col space-y-2">
                <Slider
                  value={[demolitionArea]}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={handleAreaChange}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0 m²</span>
                  <span>{demolitionArea} m²</span>
                  <span>1000 m²</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={goToPreviousStep}>
          Précédent
        </Button>
        <Button type="button" onClick={handleNext}>
          Suivant
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DemolitionStep;
