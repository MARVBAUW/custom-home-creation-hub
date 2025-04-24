import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Bath } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SalleDeBainStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [bathroomType, setBathroomType] = React.useState<string>(formData.bathroomType || 'standard');
  
  const handleSubmit = () => {
    updateFormData({
      bathroomType
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Salle de bain</h2>
      
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Type de salle de bain <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={bathroomType} 
          onValueChange={setBathroomType}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setBathroomType('standard')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="standard" id="standard" className="mr-2" />
              <Label htmlFor="standard" className="cursor-pointer">Salle de bain standard</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'mid-range' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setBathroomType('mid-range')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="mid-range" id="mid-range" className="mr-2" />
              <Label htmlFor="mid-range" className="cursor-pointer">Salle de bain milieu de gamme</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setBathroomType('premium')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="premium" id="premium" className="mr-2" />
              <Label htmlFor="premium" className="cursor-pointer">Salle de bain premium</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${bathroomType === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setBathroomType('none')}
          >
            <CardContent className="flex items-center p-4">
              <RadioGroupItem value="none" id="none" className="mr-2" />
              <Label htmlFor="none" className="cursor-pointer">Non concerné</Label>
            </CardContent>
          </Card>
        </RadioGroup>
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
          disabled={!bathroomType}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SalleDeBainStep;
