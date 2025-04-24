import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PlatrerieStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [plasteringType, setPlasteringType] = React.useState<string>(formData.plasteringType || '');
  const [interiorFittings, setInteriorFittings] = React.useState<string>(formData.interiorFittings || '');
  
  const handleSubmit = () => {
    updateFormData({
      plasteringType,
      interiorFittings
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Plâtrerie</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type de plâtrerie <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={plasteringType} 
          onValueChange={setPlasteringType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPlasteringType('standard')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="standard" id="standard" className="mr-2" />
              <Label htmlFor="standard" className="cursor-pointer">Plâtrerie standard (BA13)</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPlasteringType('premium')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="premium" id="premium" className="mr-2" />
              <Label htmlFor="premium" className="cursor-pointer">Plâtrerie premium (isolation renforcée)</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${plasteringType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPlasteringType('non_concerne')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="non_concerne" id="non_concerne" className="mr-2" />
              <Label htmlFor="non_concerne" className="cursor-pointer">Non concerné</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        
        {plasteringType && plasteringType !== 'non_concerne' && (
          <div className="mt-4 space-y-2">
            <Label htmlFor="interior-fittings" className="block">Niveau de finition des cloisons</Label>
            <Select
              value={interiorFittings}
              onValueChange={setInteriorFittings}
            >
              <SelectTrigger id="interior-fittings" className="w-full max-w-xs">
                <SelectValue placeholder="Choisir un niveau de finition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Standard</SelectItem>
                <SelectItem value="medium">Qualité moyenne</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
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
          disabled={!plasteringType || (plasteringType !== 'non_concerne' && !interiorFittings)}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PlatrerieStep;
