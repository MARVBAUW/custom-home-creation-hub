
import React from 'react';
import { ConstructionDetailsFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon, ArrowRightIcon, BuildingIcon } from 'lucide-react';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';

const ConstructionDetailsForm: React.FC<ConstructionDetailsFormProps> = ({ 
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
                <BuildingIcon className="h-5 w-5 text-progineer-gold" />
                <h3 className="text-xl font-semibold">Détails de construction</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="surface">Surface (m²)</Label>
                  <Input 
                    id="surface" 
                    type="number"
                    value={formData.surface || defaultValues?.surface || ''} 
                    onChange={(e) => updateFormData({ surface: Number(e.target.value) })}
                    placeholder="Surface en m²"
                  />
                </div>

                <div>
                  <Label htmlFor="levels">Nombre de niveaux</Label>
                  <Input 
                    id="levels" 
                    type="number"
                    value={formData.levels || defaultValues?.levels || ''} 
                    onChange={(e) => updateFormData({ levels: Number(e.target.value) })}
                    placeholder="Niveaux"
                  />
                </div>

                <div>
                  <Label htmlFor="units">Nombre de logements</Label>
                  <Input 
                    id="units" 
                    type="number"
                    value={formData.units || defaultValues?.units || ''} 
                    onChange={(e) => updateFormData({ units: Number(e.target.value) })}
                    placeholder="Logements"
                  />
                </div>
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

export default ConstructionDetailsForm;
