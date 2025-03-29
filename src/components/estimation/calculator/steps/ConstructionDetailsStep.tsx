import React, { useState } from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Home, Building2, BedDouble, Bath, Garage } from 'lucide-react';

interface ConstructionDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  estimationType?: string;
}

const ConstructionDetailsStep: React.FC<ConstructionDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  estimationType
}) => {
  // Initialize the state with constructionType instead of constructionStyle
  const [constructionType, setConstructionType] = useState<string>(
    formData.constructionType || ''
  );
  
  const [surface, setSurface] = useState<string>(
    formData.surface?.toString() || ''
  );
  
  const [levels, setLevels] = useState<string>(
    formData.levels?.toString() || ''
  );
  
  const [bedrooms, setBedrooms] = useState<string>(
    formData.bedrooms?.toString() || ''
  );
  
  const [bathrooms, setBathrooms] = useState<string>(
    formData.bathrooms?.toString() || ''
  );
  
  const [basement, setBasement] = useState<boolean>(
    formData.basement || false
  );
  
  const [garage, setGarage] = useState<boolean>(
    formData.garage || false
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({
      constructionType,
      surface: surface !== '' ? Number(surface) : 0,
      levels: levels !== '' ? Number(levels) : 0,
      bedrooms: bedrooms !== '' ? Number(bedrooms) : 0,
      bathrooms: bathrooms !== '' ? Number(bathrooms) : 0,
      basement,
      garage
    });
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Type de construction</h3>
        
        <RadioGroup 
          value={constructionType} 
          onValueChange={setConstructionType}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${constructionType === 'traditional' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setConstructionType('traditional')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Home className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="traditional" id="construction-traditional" className="sr-only" />
              <Label htmlFor="construction-traditional" className="font-medium">Traditionnelle</Label>
              <p className="text-xs text-gray-500 mt-1">
                Style classique et éprouvé
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${constructionType === 'contemporary' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setConstructionType('contemporary')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Building2 className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="contemporary" id="construction-contemporary" className="sr-only" />
              <Label htmlFor="construction-contemporary" className="font-medium">Contemporaine</Label>
              <p className="text-xs text-gray-500 mt-1">
                Design moderne et épuré
              </p>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="surface">Surface (m²)</Label>
          <Input
            type="number"
            id="surface"
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            placeholder="Surface habitable"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="levels">Nombre de niveaux</Label>
          <Input
            type="number"
            id="levels"
            value={levels}
            onChange={(e) => setLevels(e.target.value)}
            placeholder="Nombre d'étages"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="bedrooms">Nombre de chambres</Label>
          <Input
            type="number"
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            placeholder="Nombre de chambres"
          />
        </div>
        
        <div>
          <Label htmlFor="bathrooms">Nombre de salles de bain</Label>
          <Input
            type="number"
            id="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            placeholder="Nombre de salles de bain"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="basement"
          checked={basement}
          onChange={(e) => setBasement(e.target.checked)}
          className="h-5 w-5"
        />
        <Label htmlFor="basement" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Sous-sol
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="garage"
          checked={garage}
          onChange={(e) => setGarage(e.target.checked)}
          className="h-5 w-5"
        />
        <Label htmlFor="garage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Garage
        </Label>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={goToPreviousStep}>
          Précédent
        </Button>
        <Button type="submit">
          Continuer
        </Button>
      </div>
    </form>
  );
};

export default ConstructionDetailsStep;
