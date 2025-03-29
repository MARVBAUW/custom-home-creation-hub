
import React from 'react';
import { CombleFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeftIcon, ArrowRightIcon, Home } from 'lucide-react';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';

const ComblesForm: React.FC<CombleFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-progineer-gold" />
                <h3 className="text-xl font-semibold">Combles</h3>
              </div>

              <div>
                <Label>Type de combles</Label>
                <RadioGroup 
                  value={formData.atticType || defaultValues?.atticType || ''} 
                  onValueChange={(value) => updateFormData({ atticType: value })}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amenageable" id="amenageable" />
                    <Label htmlFor="amenageable" className="cursor-pointer">Aménageables</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perdu" id="perdu" />
                    <Label htmlFor="perdu" className="cursor-pointer">Perdus</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Précédent
          </Button>
          <Button
            type="submit"
            className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
          >
            Suivant
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </AnimatedStepTransition>
  );
};

export default ComblesForm;
