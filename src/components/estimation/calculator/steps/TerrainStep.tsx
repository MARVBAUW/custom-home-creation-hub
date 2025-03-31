
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TerrainStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const terrainOptions = [
  { value: 'rocky', label: 'Rocheux' },
  { value: 'clay', label: 'Argileux' },
  { value: 'flat', label: 'Plat' },
  { value: 'uneven', label: 'Accidenté' },
  { value: 'steep', label: 'Pentu' },
  { value: 'serviced', label: 'Viabilisé' },
  { value: 'none', label: 'Sans objet' }
];

const TerrainStep: React.FC<TerrainStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [terrainType, setTerrainType] = React.useState<string>(formData.terrainType || '');
  
  // Calculate terrain costs
  const calculateTerrainCosts = (selectedTerrainType: string): { terassementsViabilisation: number, montantT: number } => {
    const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
    let terassementsViabilisation = 0;
    let viabilisation = 0;
    
    // Calculate terassements based on terrain type and surface
    if (selectedTerrainType !== 'none') {
      terassementsViabilisation = surface * 260;
      
      // If the terrain is serviced, calculate viabilisation
      if (selectedTerrainType === 'serviced') {
        viabilisation = surface * 120;
        terassementsViabilisation -= viabilisation;
      }
    }
    
    // Calculate new montantT
    const currentMontantT = formData.montantT || 0;
    const newMontantT = currentMontantT + terassementsViabilisation;
    
    return {
      terassementsViabilisation,
      montantT: newMontantT
    };
  };
  
  const handleSubmit = () => {
    const costs = calculateTerrainCosts(terrainType);
    
    // Update the form data
    updateFormData({ 
      terrainType,
      terassementsViabilisation: costs.terassementsViabilisation,
      montantT: costs.montantT
    });
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Terrain</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Caractéristique du terrain <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={terrainType} 
          onValueChange={setTerrainType}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
        >
          {terrainOptions.map((option) => (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all hover:shadow-md ${terrainType === option.value ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setTerrainType(option.value)}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value={option.value} id={option.value} className="mr-2" />
                <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </div>
      
      <div className="bg-gray-100 p-3 rounded-md text-center text-lg font-semibold">
        Total travaux : {formData.montantT ? formData.montantT.toLocaleString() : 0} €/HT
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
          disabled={!terrainType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TerrainStep;
