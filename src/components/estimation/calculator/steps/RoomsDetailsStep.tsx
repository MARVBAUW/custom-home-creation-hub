
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bed, Bath, UtensilsCrossed, Maximize } from 'lucide-react';
import { ensureNumber } from '../utils/typeConversions';

interface RoomsDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const RoomsDetailsStep: React.FC<RoomsDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  // Initialize state with form data or defaults
  const [roomCount, setRoomCount] = React.useState<string>(
    formData.roomCount?.toString() || ''
  );
  
  const [bathroomCount, setBathroomCount] = React.useState<string>(
    formData.bathroomCount?.toString() || ''
  );
  
  const [bathroomType, setBathroomType] = React.useState<string>(
    formData.bathroomType || 'standard'
  );
  
  const [kitchenType, setKitchenType] = React.useState<string>(
    formData.kitchenType || 'standard'
  );
  
  const [livingRoomSize, setLivingRoomSize] = React.useState<string>(
    formData.livingRoomSize?.toString() || ''
  );
  
  const [livingRoomStyle, setLivingRoomStyle] = React.useState<string>(
    formData.livingRoomStyle || 'separate'
  );

  const handleSubmit = () => {
    updateFormData({
      roomCount: ensureNumber(roomCount),
      bathroomCount: ensureNumber(bathroomCount),
      bathroomType,
      kitchenType,
      livingRoomSize: ensureNumber(livingRoomSize),
      livingRoomStyle
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Pièces et configuration</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="room-count" className="text-base flex items-center mb-2">
                <Bed className="h-4 w-4 text-blue-500 mr-2" />
                Nombre de chambres
              </Label>
              
              <Input
                id="room-count"
                type="number"
                value={roomCount}
                onChange={(e) => setRoomCount(e.target.value)}
                placeholder="Ex: 3"
              />
            </div>
            
            <div>
              <Label htmlFor="bathroom-count" className="text-base flex items-center mb-2">
                <Bath className="h-4 w-4 text-blue-500 mr-2" />
                Nombre de salles de bain
              </Label>
              
              <Input
                id="bathroom-count"
                type="number"
                value={bathroomCount}
                onChange={(e) => setBathroomCount(e.target.value)}
                placeholder="Ex: 2"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-base flex items-center mb-3">
              <Bath className="h-4 w-4 text-blue-500 mr-2" />
              Type de salle de bain
            </Label>
            
            <RadioGroup 
              value={bathroomType} 
              onValueChange={setBathroomType}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setBathroomType('standard')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="standard" id="bathroom-standard" className="mr-2" />
                  <Label htmlFor="bathroom-standard" className="cursor-pointer">Standard</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setBathroomType('premium')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="premium" id="bathroom-premium" className="mr-2" />
                  <Label htmlFor="bathroom-premium" className="cursor-pointer">Premium</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'luxury' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setBathroomType('luxury')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="luxury" id="bathroom-luxury" className="mr-2" />
                  <Label htmlFor="bathroom-luxury" className="cursor-pointer">Luxe</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base flex items-center mb-3">
              <UtensilsCrossed className="h-4 w-4 text-blue-500 mr-2" />
              Type de cuisine
            </Label>
            
            <RadioGroup 
              value={kitchenType} 
              onValueChange={setKitchenType}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setKitchenType('standard')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="standard" id="kitchen-standard" className="mr-2" />
                  <Label htmlFor="kitchen-standard" className="cursor-pointer">Standard</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'equipped' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setKitchenType('equipped')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="equipped" id="kitchen-equipped" className="mr-2" />
                  <Label htmlFor="kitchen-equipped" className="cursor-pointer">Équipée</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${kitchenType === 'high_end' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setKitchenType('high_end')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="high_end" id="kitchen-high-end" className="mr-2" />
                  <Label htmlFor="kitchen-high-end" className="cursor-pointer">Haut de gamme</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="living-room-size" className="text-base flex items-center mb-2">
                <Maximize className="h-4 w-4 text-blue-500 mr-2" />
                Taille du salon (m²)
              </Label>
              
              <Input
                id="living-room-size"
                type="number"
                value={livingRoomSize}
                onChange={(e) => setLivingRoomSize(e.target.value)}
                placeholder="Ex: 30"
              />
            </div>
            
            <div>
              <Label className="text-base flex items-center mb-2">
                <Maximize className="h-4 w-4 text-blue-500 mr-2" />
                Style du salon
              </Label>
              
              <RadioGroup 
                value={livingRoomStyle} 
                onValueChange={setLivingRoomStyle}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="open" id="living-open" />
                  <Label htmlFor="living-open">Espace ouvert</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="separate" id="living-separate" />
                  <Label htmlFor="living-separate">Pièce séparée</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
        >
          Précédent
        </Button>
        
        <Button
          type="button"
          onClick={handleSubmit}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default RoomsDetailsStep;
