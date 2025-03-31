
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowRightIcon, ArrowLeftIcon, Bed, Bath, UtensilsCrossed, Sofa } from 'lucide-react';
import { FormData } from '../types';

interface RoomsDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const RoomsDetailsStep: React.FC<RoomsDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [bedrooms, setBedrooms] = React.useState<string | number>(formData.bedrooms || 0);
  const [bathrooms, setBathrooms] = React.useState<string | number>(formData.bathrooms || 0);
  const [kitchens, setKitchens] = React.useState<string | number>(formData.kitchens || 1);
  const [livingRooms, setLivingRooms] = React.useState<string | number>(formData.livingRooms || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      bedrooms: typeof bedrooms === 'string' ? parseInt(bedrooms) || 0 : bedrooms,
      bathrooms: typeof bathrooms === 'string' ? parseInt(bathrooms) || 0 : bathrooms,
      kitchens: typeof kitchens === 'string' ? parseInt(kitchens) || 1 : kitchens,
      livingRooms: typeof livingRooms === 'string' ? parseInt(livingRooms) || 1 : livingRooms
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Détails des pièces</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Number of bedrooms */}
          <div className="space-y-2">
            <Label htmlFor="bedrooms" className="text-base font-medium flex items-center gap-2">
              <Bed className="h-4 w-4 text-blue-500" />
              Nombre de chambres
            </Label>
            <Input
              id="bedrooms"
              type="number"
              min="0"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Number of bathrooms */}
          <div className="space-y-2">
            <Label htmlFor="bathrooms" className="text-base font-medium flex items-center gap-2">
              <Bath className="h-4 w-4 text-blue-500" />
              Nombre de salles de bain
            </Label>
            <Input
              id="bathrooms"
              type="number"
              min="0"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Number of kitchens */}
          <div className="space-y-2">
            <Label htmlFor="kitchens" className="text-base font-medium flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-blue-500" />
              Nombre de cuisines
            </Label>
            <Input
              id="kitchens"
              type="number"
              min="1"
              value={kitchens}
              onChange={(e) => setKitchens(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Number of living rooms */}
          <div className="space-y-2">
            <Label htmlFor="livingRooms" className="text-base font-medium flex items-center gap-2">
              <Sofa className="h-4 w-4 text-blue-500" />
              Nombre de salons/séjours
            </Label>
            <Input
              id="livingRooms"
              type="number"
              min="1"
              value={livingRooms}
              onChange={(e) => setLivingRooms(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Précédent
            </Button>
            
            <Button 
              type="submit"
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoomsDetailsStep;
