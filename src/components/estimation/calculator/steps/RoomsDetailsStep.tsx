
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
  const [kitchens, setKitchens] = React.useState<string | number>(formData.kitchens || 0);
  const [livingRooms, setLivingRooms] = React.useState<string | number>(formData.livingRooms || 0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      bedrooms: typeof bedrooms === 'string' ? parseInt(bedrooms) || 0 : bedrooms,
      bathrooms: typeof bathrooms === 'string' ? parseInt(bathrooms) || 0 : bathrooms,
      kitchens: typeof kitchens === 'string' ? parseInt(kitchens) || 0 : kitchens,
      livingRooms: typeof livingRooms === 'string' ? parseInt(livingRooms) || 0 : livingRooms
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bedrooms */}
            <div className="space-y-2">
              <Label htmlFor="bedrooms" className="text-base font-medium flex items-center">
                <Bed className="h-4 w-4 text-blue-500 mr-2" />
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
            
            {/* Bathrooms */}
            <div className="space-y-2">
              <Label htmlFor="bathrooms" className="text-base font-medium flex items-center">
                <Bath className="h-4 w-4 text-blue-500 mr-2" />
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
            
            {/* Kitchens */}
            <div className="space-y-2">
              <Label htmlFor="kitchens" className="text-base font-medium flex items-center">
                <UtensilsCrossed className="h-4 w-4 text-blue-500 mr-2" />
                Nombre de cuisines
              </Label>
              <Input
                id="kitchens"
                type="number"
                min="0"
                value={kitchens}
                onChange={(e) => setKitchens(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Living Rooms */}
            <div className="space-y-2">
              <Label htmlFor="livingRooms" className="text-base font-medium flex items-center">
                <Sofa className="h-4 w-4 text-blue-500 mr-2" />
                Nombre de séjours
              </Label>
              <Input
                id="livingRooms"
                type="number"
                min="0"
                value={livingRooms}
                onChange={(e) => setLivingRooms(e.target.value)}
                className="w-full"
              />
            </div>
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
