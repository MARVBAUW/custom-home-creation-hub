
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ensureNumber } from '../utils/typeConversions';

interface ConstructionDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const ConstructionDetailsStep: React.FC<ConstructionDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [surface, setSurface] = React.useState<string>(formData.surface ? formData.surface.toString() : '');
  const [levels, setLevels] = React.useState<string>(formData.levels ? formData.levels.toString() : '');
  const [units, setUnits] = React.useState<string>(formData.units ? formData.units.toString() : '');
  
  // Detect if we're in renovation mode to show specific label
  const isRenovation = formData.projectType === 'renovation' || formData.projectType === 'division';
  
  const handleSubmit = () => {
    // Update the form data
    updateFormData({ 
      surface: ensureNumber(surface),
      levels: ensureNumber(levels),
      units: ensureNumber(units),
      montantT: 0 // Initialize the amount
    });
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Détails du projet</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="surface" className="text-base font-medium">
            Quelle est la surface de votre projet ? <span className="text-red-500">*</span>
          </Label>
          {isRenovation && (
            <p className="text-sm text-gray-500">Surface concernée par le projet de rénovation exemple : 20 m² sur une maison de 100 m²</p>
          )}
          <div className="flex items-center">
            <Input
              id="surface"
              type="number"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              placeholder="Surface en m²"
              className="flex-grow"
              min="1"
              required
            />
            <span className="ml-2 text-gray-600">m²</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="levels" className="text-base font-medium">
            Combien de niveau comporte votre projet ? <span className="text-red-500">*</span>
          </Label>
          <Input
            id="levels"
            type="number"
            value={levels}
            onChange={(e) => setLevels(e.target.value)}
            placeholder="Nombre de niveaux"
            min="1"
            required
          />
        </div>
        
        {isRenovation && (
          <div className="space-y-2">
            <Label htmlFor="units" className="text-base font-medium">
              Combien de logement comporte le projet futur ? <span className="text-red-500">*</span>
            </Label>
            <Input
              id="units"
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="Nombre de logements"
              min="1"
              required
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-between pt-6">
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
          disabled={!surface || !levels || (isRenovation && !units)}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConstructionDetailsStep;
