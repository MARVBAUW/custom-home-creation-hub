
import React from 'react';
import { FormData } from '../types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon, Waves, UtensilsCrossed, Footprints } from 'lucide-react';

interface ExteriorFeaturesFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const ExteriorFeaturesForm: React.FC<ExteriorFeaturesFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [pool, setPool] = React.useState<boolean>(formData.pool || false);
  const [terrace, setTerrace] = React.useState<boolean>(formData.terrace || false);
  const [outdoorKitchen, setOutdoorKitchen] = React.useState<boolean>(formData.outdoorKitchen || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      pool,
      terrace,
      outdoorKitchen
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Aménagements extérieurs</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Quels aménagements extérieurs souhaitez-vous ?</Label>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <Checkbox 
                  id="pool" 
                  checked={pool}
                  onCheckedChange={(checked) => setPool(checked as boolean)}
                />
                <Label htmlFor="pool" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Waves className="h-4 w-4 text-blue-500" />
                  <div>
                    <p>Piscine</p>
                    <p className="text-sm text-gray-500">Installation d'une piscine</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <Checkbox 
                  id="terrace" 
                  checked={terrace}
                  onCheckedChange={(checked) => setTerrace(checked as boolean)}
                />
                <Label htmlFor="terrace" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Footprints className="h-4 w-4 text-amber-500" />
                  <div>
                    <p>Terrasse</p>
                    <p className="text-sm text-gray-500">Création d'une terrasse</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-4">
                <Checkbox 
                  id="outdoorKitchen" 
                  checked={outdoorKitchen}
                  onCheckedChange={(checked) => setOutdoorKitchen(checked as boolean)}
                />
                <Label htmlFor="outdoorKitchen" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <UtensilsCrossed className="h-4 w-4 text-green-500" />
                  <div>
                    <p>Cuisine extérieure</p>
                    <p className="text-sm text-gray-500">Installation d'une cuisine d'été</p>
                  </div>
                </Label>
              </div>
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

export default ExteriorFeaturesForm;
