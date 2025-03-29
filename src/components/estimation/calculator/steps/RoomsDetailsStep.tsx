
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bed, Bath, UtensilsCrossed, Home } from 'lucide-react';

interface RoomsDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const RoomsDetailsStep: React.FC<RoomsDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  // Initialize state with form data or defaults
  const [roomCount, setRoomCount] = React.useState<string>(
    formData.roomCount?.toString() || '0'
  );
  const [bathroomCount, setBathroomCount] = React.useState<string>(
    formData.bathroomCount?.toString() || '0'
  );

  const handleContinue = () => {
    updateFormData({
      roomCount: roomCount !== '' ? Number(roomCount) : undefined,
      bathroomCount: bathroomCount !== '' ? Number(bathroomCount) : undefined
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Pièces et configuration</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center mb-4">
                <Bed className="h-6 w-6 text-blue-500 mr-2" />
                <Label htmlFor="room-count" className="text-lg font-medium">Chambres</Label>
              </div>
              
              <Input
                id="room-count"
                type="number"
                value={roomCount}
                onChange={(e) => setRoomCount(e.target.value)}
                className="mt-2"
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center mb-4">
                <Bath className="h-6 w-6 text-blue-500 mr-2" />
                <Label htmlFor="bathroom-count" className="text-lg font-medium">Salles de bain</Label>
              </div>
              
              <Input
                id="bathroom-count"
                type="number"
                value={bathroomCount}
                onChange={(e) => setBathroomCount(e.target.value)}
                className="mt-2"
              />
            </CardContent>
          </Card>
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

export default RoomsDetailsStep;
