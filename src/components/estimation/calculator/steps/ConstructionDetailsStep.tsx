
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface ConstructionDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const ConstructionDetailsStep: React.FC<ConstructionDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [constructionType, setConstructionType] = React.useState<string>(
    formData.constructionType || 'house'
  );
  
  const [surface, setSurface] = React.useState<string>(
    formData.surface?.toString() || ''
  );
  
  const [levels, setLevels] = React.useState<string>(
    formData.levels?.toString() || '1'
  );
  
  const handleContinue = () => {
    updateFormData({
      constructionType,
      surface: surface !== '' ? Number(surface) : undefined,
      levels: levels !== '' ? Number(levels) : undefined
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Détails de construction</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Type de construction</Label>
            <RadioGroup 
              value={constructionType} 
              onValueChange={setConstructionType}
              className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionType === 'house' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionType('house')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="house" id="const-house" className="mr-2" />
                  <Label htmlFor="const-house">Maison individuelle</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${constructionType === 'apartment' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setConstructionType('apartment')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="apartment" id="const-apartment" className="mr-2" />
                  <Label htmlFor="const-apartment">Appartement</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="surface">Surface habitable (m²)</Label>
              <Input
                id="surface"
                type="number"
                placeholder="Ex: 120"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="levels">Nombre de niveaux</Label>
              <Input
                id="levels"
                type="number"
                placeholder="Ex: 2"
                value={levels}
                onChange={(e) => setLevels(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleContinue}
          className="w-full"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default ConstructionDetailsStep;
