
import React from 'react';
import { ElectriciteFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeftIcon, ArrowRightIcon, Zap } from 'lucide-react';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';

const ElectriciteForm: React.FC<ElectriciteFormProps> = ({ 
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
                <Zap className="h-5 w-5 text-progineer-gold" />
                <h3 className="text-xl font-semibold">Installation électrique</h3>
              </div>

              <div>
                <Label>Type d'installation électrique</Label>
                <RadioGroup 
                  value={formData.electricalType || defaultValues?.electricalType || ''} 
                  onValueChange={(value) => updateFormData({ electricalType: value })}
                  className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex flex-col items-start space-y-2 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer [&:has([data-state=checked])]:border-progineer-gold [&:has([data-state=checked])]:bg-progineer-gold/5">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-medium">Installation standard</Label>
                    </div>
                    <div className="pl-6 text-sm text-gray-600">
                      Installation classique avec prises et interrupteurs aux normes
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-2 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer [&:has([data-state=checked])]:border-progineer-gold [&:has([data-state=checked])]:bg-progineer-gold/5">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium" className="font-medium">Installation haut de gamme</Label>
                    </div>
                    <div className="pl-6 text-sm text-gray-600">
                      Installation premium avec prises USB, interrupteurs design
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-2 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer [&:has([data-state=checked])]:border-progineer-gold [&:has([data-state=checked])]:bg-progineer-gold/5">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="domotique" id="domotique" />
                      <Label htmlFor="domotique" className="font-medium">Domotique</Label>
                    </div>
                    <div className="pl-6 text-sm text-gray-600">
                      Installation avec système domotique (éclairage intelligent, etc.)
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-2 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer [&:has([data-state=checked])]:border-progineer-gold [&:has([data-state=checked])]:bg-progineer-gold/5">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="smart" id="smart" />
                      <Label htmlFor="smart" className="font-medium">Maison connectée complète</Label>
                    </div>
                    <div className="pl-6 text-sm text-gray-600">
                      Installation smart home complète avec contrôle vocal et application
                    </div>
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

export default ElectriciteForm;
