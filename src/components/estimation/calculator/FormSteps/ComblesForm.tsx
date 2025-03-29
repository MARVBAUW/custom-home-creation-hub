import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Home, Square, CheckSquare, Layout } from 'lucide-react';

const ComblesForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [atticType, setAtticType] = React.useState<string>(
    formData.atticType || 'lost'
  );

  const handleSubmit = () => {
    updateFormData({
      atticType
    });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Type de combles</h3>
        
        <RadioGroup 
          value={atticType} 
          onValueChange={setAtticType}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${atticType === 'lost' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setAtticType('lost')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Square className="h-8 w-8 text-blue-500 mb-3" />
              <RadioGroupItem value="lost" id="attic-lost" className="sr-only" />
              <Label htmlFor="attic-lost" className="font-medium">Combles perdus</Label>
              <p className="text-xs text-gray-500 mt-2">
                Espace sous toiture non aménagé, utilisé uniquement pour l'isolation
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${atticType === 'convertible' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setAtticType('convertible')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <CheckSquare className="h-8 w-8 text-blue-500 mb-3" />
              <RadioGroupItem value="convertible" id="attic-convertible" className="sr-only" />
              <Label htmlFor="attic-convertible" className="font-medium">Combles aménageables</Label>
              <p className="text-xs text-gray-500 mt-2">
                Espace pouvant être transformé en pièce habitable ultérieurement
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${atticType === 'converted' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setAtticType('converted')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Home className="h-8 w-8 text-blue-500 mb-3" />
              <RadioGroupItem value="converted" id="attic-converted" className="sr-only" />
              <Label htmlFor="attic-converted" className="font-medium">Combles aménagés</Label>
              <p className="text-xs text-gray-500 mt-2">
                Espace sous toiture transformé en pièce habitable (chambre, bureau, etc.)
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${atticType === 'roof_terrace' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setAtticType('roof_terrace')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Layout className="h-8 w-8 text-blue-500 mb-3" />
              <RadioGroupItem value="roof_terrace" id="attic-roof-terrace" className="sr-only" />
              <Label htmlFor="attic-roof-terrace" className="font-medium">Toit terrasse</Label>
              <p className="text-xs text-gray-500 mt-2">
                Toiture plate accessible et aménagée en terrasse
              </p>
            </CardContent>
          </Card>
        </RadioGroup>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleSubmit}>
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComblesForm;
