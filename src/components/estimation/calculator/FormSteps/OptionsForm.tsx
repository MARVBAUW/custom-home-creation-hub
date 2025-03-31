
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BaseFormProps } from '../types/formTypes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ensureNumber } from '../utils/typeConversions';

const OptionsForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [quality, setQuality] = React.useState(formData.quality || 'standard');

  const handleSubmit = () => {
    // Calculate additional cost based on quality
    let additionalCost = 0;
    const surface = ensureNumber(formData.surface, 0);
    
    if (quality === 'premium') {
      additionalCost = surface * 200; // Example: 200 euros per sqm for premium
    } else if (quality === 'luxury') {
      additionalCost = surface * 400; // Example: 400 euros per sqm for luxury
    }
    
    updateFormData({
      quality,
      montantT: ensureNumber(formData.montantT, 0) + additionalCost
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Options de qualité</h2>
          
          <div className="space-y-6">
            <div>
              <Label className="text-base">Niveau de qualité souhaité</Label>
              <RadioGroup value={quality} onValueChange={setQuality} className="mt-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium">Premium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="luxury" id="luxury" />
                  <Label htmlFor="luxury">Luxe</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={goToPreviousStep}>
                Précédent
              </Button>
              <Button onClick={handleSubmit}>
                Continuer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptionsForm;
