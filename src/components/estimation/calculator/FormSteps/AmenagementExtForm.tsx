
import React from 'react';
import { AmenagementExtFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeftIcon, ArrowRightIcon, Palmtree } from 'lucide-react';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';

const AmenagementExtForm: React.FC<AmenagementExtFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues 
}) => {
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>(
    Array.isArray(defaultValues?.exteriorFeatures) 
      ? defaultValues.exteriorFeatures 
      : (formData.exteriorFeatures || [])
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({ exteriorFeatures: selectedFeatures });
    goToNextStep();
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => {
      if (prev.includes(feature)) {
        return prev.filter(f => f !== feature);
      } else {
        return [...prev, feature];
      }
    });
  };

  const features = [
    { id: "terrace", label: "Terrasse" },
    { id: "driveway", label: "Allée" },
    { id: "pool", label: "Piscine" },
    { id: "garden", label: "Jardin paysager" },
    { id: "fence", label: "Clôture" },
    { id: "gate", label: "Portail" },
    { id: "outdoorLighting", label: "Éclairage extérieur" },
    { id: "outdoorKitchen", label: "Cuisine extérieure" },
    { id: "pergola", label: "Pergola" },
    { id: "shed", label: "Abri de jardin" }
  ];

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Palmtree className="h-5 w-5 text-progineer-gold" />
                <h3 className="text-xl font-semibold">Aménagements extérieurs</h3>
              </div>

              <div>
                <Label className="mb-3 block">Sélectionnez les aménagements extérieurs souhaités</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={feature.id} 
                        checked={selectedFeatures.includes(feature.id)}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                      />
                      <Label htmlFor={feature.id} className="cursor-pointer">{feature.label}</Label>
                    </div>
                  ))}
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

export default AmenagementExtForm;
