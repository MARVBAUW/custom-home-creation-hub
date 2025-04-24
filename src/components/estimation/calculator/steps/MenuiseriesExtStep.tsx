import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Wind } from 'lucide-react';  // Changed from 'Window' to 'Wind'
import { BaseFormProps } from '../types/baseFormProps';  // Corrected import path

const MenuiseriesExtStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const handleChange = (value: string) => {
    updateFormData({ menuiseriesExtType: value });
  };

  const handleNext = () => {
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Menuiseries extérieures</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={formData.menuiseriesExtType || ''}
          onValueChange={handleChange}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="pvc" id="pvc" />
            <Label htmlFor="pvc" className="flex flex-1 items-center gap-2 cursor-pointer">
              <Wind className="h-5 w-5 text-blue-500" />
              <div className="space-y-1">
                <p className="font-medium">PVC</p>
                <p className="text-sm text-gray-500">Menuiseries en PVC, bon rapport qualité/prix</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="aluminum" id="aluminum" />
            <Label htmlFor="aluminum" className="flex flex-1 items-center gap-2 cursor-pointer">
              <Wind className="h-5 w-5 text-gray-500" />
              <div className="space-y-1">
                <p className="font-medium">Aluminum</p>
                <p className="text-sm text-gray-500">Menuiseries en aluminum, design moderne et durable</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="wood" id="wood" />
            <Label htmlFor="wood" className="flex flex-1 items-center gap-2 cursor-pointer">
              <Wind className="h-5 w-5 text-amber-700" />
              <div className="space-y-1">
                <p className="font-medium">Bois</p>
                <p className="text-sm text-gray-500">Menuiseries en bois, aspect chaleureux et naturel</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="wood_aluminum" id="wood_aluminum" />
            <Label htmlFor="wood_aluminum" className="flex flex-1 items-center gap-2 cursor-pointer">
              <Wind className="h-5 w-5 text-green-600" />
              <div className="space-y-1">
                <p className="font-medium">Mixte bois/aluminum</p>
                <p className="text-sm text-gray-500">Le meilleur des deux matériaux, bois à l'intérieur et aluminum à l'extérieur</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={goToPreviousStep}>
          Précédent
        </Button>
        <Button type="button" onClick={handleNext}>
          Suivant
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuiseriesExtStep;
