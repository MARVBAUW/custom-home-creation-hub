
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from 'next/image';

interface TerrainStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const TerrainStep: React.FC<TerrainStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [terrainType, setTerrainType] = React.useState<string>(formData.terrainType || '');
  
  // Define terrain options with their images
  const terrainOptions = [
    { 
      value: 'rocky', 
      label: 'ROCHEUX', 
      image: 'https://storage.tally.so/ca35d469-4aca-4551-b106-d82eb6685aad/DALL-E-2024-10-23-11.00.10---A-beautiful-illustration-of-a-rocky-terrain-showing-a-rugged-landscape-with-scattered-rocks-and-boulders.-The-ground-is-uneven-with-stone-formations-.webp' 
    },
    { 
      value: 'clay', 
      label: 'ARGILEUX', 
      image: 'https://storage.tally.so/19204de1-2be8-40c9-82fa-ee1469480b67/DALL-E-2024-10-23-11.00.08---A-beautiful-illustration-of-a-clayey-terrain-showing-a-landscape-with-slightly-cracked-earth-and-a-smooth-surface.-The-ground-looks-soft-and-dense-w.webp' 
    },
    { 
      value: 'flat', 
      label: 'PLAT', 
      image: 'https://storage.tally.so/02f06ce3-8138-4760-881a-3caaebe90099/DALL-E-2024-10-23-11.00.12---A-beautiful-illustration-of-a-flat-terrain-showing-a-wide-open-plain-with-even-ground.-The-landscape-is-serene-and-peaceful-with-short-green-grass-.webp' 
    },
    { 
      value: 'rugged', 
      label: 'ACCIDENTE', 
      image: 'https://storage.tally.so/1c1404ae-601d-4378-a2ff-d235bd924c65/DALL-E-2024-10-23-10.56.00---An-illustration-of-rugged-accidented-terrain-with-uneven-and-irregular-ground-levels-showing-a-variety-of-small-hills-dips-and-mounds.-The-landsca.webp' 
    },
    { 
      value: 'sloped', 
      label: 'PENTUE', 
      image: 'https://storage.tally.so/e0576168-a151-4776-b05e-640c8aa7f610/DALL-E-2024-10-23-11.01.11---A-beautiful-illustration-of-a-steep-terrain-showing-a-sloped-landscape-with-a-noticeable-incline.-The-ground-features-scattered-rocks-and-patches-of-.webp' 
    },
    { 
      value: 'serviced', 
      label: 'VIABILISE', 
      image: 'https://storage.tally.so/cc16539f-40fa-4acf-8503-1ab1ae322053/DALL-E-2024-10-23-11.09.38---A-detailed-illustration-of-a-serviced-viabilise-terrain-showing-a-flat-plot-of-land-with-essential-infrastructure-in-place.-The-landscape-is-clean-.webp' 
    },
    { 
      value: 'none', 
      label: 'SANS OBJET', 
      image: '' 
    }
  ];
  
  const handleSubmit = () => {
    // Calculate the amounts based on the terrain type and project surface
    const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
    let terassementsViabilisation = surface * 260;
    let viabilisation = 0;
    
    // Adjust for serviced terrain
    if (terrainType === 'serviced') {
      viabilisation = surface * 120;
      terassementsViabilisation -= viabilisation;
    }
    
    // Update the montant value in formData by adding the terrain costs
    const currentMontant = formData.montantT || 0;
    const newMontant = currentMontant + terassementsViabilisation;
    
    // Update the form data
    updateFormData({ 
      terrainType: terrainType,
      terassementsViabilisation,
      viabilisation,
      montantT: newMontant
    });
    
    // Proceed to next step
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Caractéristiques du terrain</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {terrainOptions.map((option) => (
          <Card 
            key={option.value}
            className={`cursor-pointer transition-all hover:shadow-md 
              ${terrainType === option.value ? 'border-blue-500 border-2' : 'border'}`}
            onClick={() => setTerrainType(option.value)}
          >
            <CardContent className="p-3">
              <div className="flex items-center mb-2">
                <RadioGroupItem
                  value={option.value}
                  id={`terrain-${option.value}`}
                  checked={terrainType === option.value}
                  className="mr-2"
                />
                <Label 
                  htmlFor={`terrain-${option.value}`}
                  className="font-medium"
                >
                  {option.label}
                </Label>
              </div>
              
              {option.image && (
                <div className="w-full h-32 relative overflow-hidden rounded-md">
                  <img 
                    src={option.image} 
                    alt={option.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
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
