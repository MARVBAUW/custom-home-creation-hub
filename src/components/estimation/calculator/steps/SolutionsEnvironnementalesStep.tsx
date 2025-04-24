import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, Leaf } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SolutionsEnvironnementalesStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [ecoLevel, setEcoLevel] = React.useState<string>(formData.ecoLevel || '');
  
  const handleSubmit = () => {
    // Calculate eco coefficient based on level
    let ecoCoefficient = 0;
    switch (ecoLevel) {
      case 'minimal':
        ecoCoefficient = 0.018; // +1.8%
        break;
      case 'moderate':
        ecoCoefficient = 0.038; // +3.8%
        break;
      case 'extensive':
        ecoCoefficient = 0.057; // +5.7%
        break;
      default:
        ecoCoefficient = 0;
    }
    
    // Calculate additional cost if montantT exists
    let updatedMontantT = formData.montantT || 0;
    if (updatedMontantT > 0 && ecoCoefficient > 0) {
      const ecoSupplement = updatedMontantT * ecoCoefficient;
      updatedMontantT += ecoSupplement;
    }
    
    updateFormData({
      ecoLevel: ecoLevel as 'minimal' | 'moderate' | 'extensive',
      includeEcoSolutions: ecoLevel !== 'none',
      montantT: updatedMontantT
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-2">Solutions Environnementales</h2>
      <p className="text-gray-600 mb-6">Quel niveau de solutions écologiques souhaitez-vous intégrer à votre projet ?</p>
      
      <div className="space-y-4">
        <RadioGroup 
          value={ecoLevel} 
          onValueChange={setEcoLevel}
          className="grid grid-cols-1 gap-4 mt-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${ecoLevel === 'minimal' ? 'border-green-500 bg-green-50' : ''}`}
            onClick={() => setEcoLevel('minimal')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="minimal" id="minimal" className="mr-2" />
                <Label htmlFor="minimal" className="cursor-pointer flex items-center">
                  <Leaf className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <span className="font-medium">Oui, si possible</span>
                    <p className="text-sm text-gray-600 mt-1">Intégration des solutions écologiques de base (+1,8%)</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${ecoLevel === 'moderate' ? 'border-green-500 bg-green-50' : ''}`}
            onClick={() => setEcoLevel('moderate')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="moderate" id="moderate" className="mr-2" />
                <Label htmlFor="moderate" className="cursor-pointer flex items-center">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <span className="font-medium">Moyennement souhaité</span>
                    <p className="text-sm text-gray-600 mt-1">Intégration de solutions écologiques intermédiaires (+3,8%)</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${ecoLevel === 'extensive' ? 'border-green-500 bg-green-50' : ''}`}
            onClick={() => setEcoLevel('extensive')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="extensive" id="extensive" className="mr-2" />
                <Label htmlFor="extensive" className="cursor-pointer flex items-center">
                  <Leaf className="h-5 w-5 text-green-700 mr-2" />
                  <div>
                    <span className="font-medium">Fortement souhaité</span>
                    <p className="text-sm text-gray-600 mt-1">Intégration maximale de solutions écologiques (+5,7%)</p>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${ecoLevel === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setEcoLevel('none')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <RadioGroupItem value="none" id="none" className="mr-2" />
                <Label htmlFor="none" className="cursor-pointer">
                  <span className="font-medium">Non</span>
                  <p className="text-sm text-gray-600 mt-1">Pas de solutions écologiques spécifiques</p>
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      {formData.montantT && ecoLevel && ecoLevel !== 'none' && (
        <div className="bg-gray-100 p-3 rounded-md">
          <p className="text-sm font-medium">
            Les solutions écologiques représentent un surcoût estimé 
            selon le niveau choisi.
          </p>
        </div>
      )}
      
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
          disabled={!ecoLevel}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SolutionsEnvironnementalesStep;
