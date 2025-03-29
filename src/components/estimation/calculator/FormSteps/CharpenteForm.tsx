
import React from 'react';
import { CharpenteFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeftIcon, ArrowRightIcon, Home } from 'lucide-react';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';

const CharpenteForm: React.FC<CharpenteFormProps> = ({ 
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
                <h3 className="text-xl font-semibold">Type de toiture</h3>
              </div>

              <div>
                <Label>Choisissez le type de charpente</Label>
                <RadioGroup 
                  value={formData.roofType || defaultValues?.roofType || ''} 
                  onValueChange={(value) => updateFormData({ roofType: value })}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="traditionnelle" id="traditionnelle" />
                    <Label htmlFor="traditionnelle" className="cursor-pointer">Charpente traditionnelle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="industrielle" id="industrielle" />
                    <Label htmlFor="industrielle" className="cursor-pointer">Charpente industrielle (fermettes)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metallique" id="metallique" />
                    <Label htmlFor="metallique" className="cursor-pointer">Charpente métallique</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="plate" id="plate" />
                    <Label htmlFor="plate" className="cursor-pointer">Toit plat / terrasse</Label>
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

export default CharpenteForm;
