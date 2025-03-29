
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PaintBucket, Layers, CheckCircle, Award } from 'lucide-react';

interface FinishDetailsStepProps {
  formData: FormData;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const FinishDetailsStep: React.FC<FinishDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  // Initialize state with form data or defaults
  const [finishLevel, setFinishLevel] = React.useState<string>(
    formData.finishLevel || 'standard'
  );
  
  const [paintType, setPaintType] = React.useState<string>(
    formData.paintType || 'standard'
  );
  
  const [floorTileType, setFloorTileType] = React.useState<string>(
    formData.floorTileType || 'standard'
  );
  
  const [parquetType, setParquetType] = React.useState<string>(
    formData.parquetType || 'standard'
  );

  const handleSubmit = () => {
    updateFormData({
      finishLevel,
      paintType,
      floorTileType,
      parquetType
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Niveau de finition</h3>
        
        <RadioGroup 
          value={finishLevel} 
          onValueChange={setFinishLevel}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${finishLevel === 'economy' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setFinishLevel('economy')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Layers className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="economy" id="finish-economy" className="sr-only" />
              <Label htmlFor="finish-economy" className="font-medium">Économique</Label>
              <p className="text-xs text-gray-500 mt-1">
                Finitions simples et fonctionnelles
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${finishLevel === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setFinishLevel('standard')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <CheckCircle className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="standard" id="finish-standard" className="sr-only" />
              <Label htmlFor="finish-standard" className="font-medium">Standard</Label>
              <p className="text-xs text-gray-500 mt-1">
                Bon rapport qualité-prix
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${finishLevel === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setFinishLevel('premium')}
          >
            <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
              <Award className="h-10 w-10 text-blue-500 mb-3" />
              <RadioGroupItem value="premium" id="finish-premium" className="sr-only" />
              <Label htmlFor="finish-premium" className="font-medium">Premium</Label>
              <p className="text-xs text-gray-500 mt-1">
                Finitions de haute qualité
              </p>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Type de peinture</h3>
        
        <RadioGroup 
          value={paintType} 
          onValueChange={setPaintType}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPaintType('standard')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="standard" id="paint-standard" className="mr-2" />
              <div>
                <Label htmlFor="paint-standard" className="cursor-pointer">Standard</Label>
                <p className="text-xs text-gray-500">Peinture acrylique classique</p>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPaintType('premium')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="premium" id="paint-premium" className="mr-2" />
              <div>
                <Label htmlFor="paint-premium" className="cursor-pointer">Premium</Label>
                <p className="text-xs text-gray-500">Haute durabilité</p>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${paintType === 'decorative' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPaintType('decorative')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="decorative" id="paint-decorative" className="mr-2" />
              <div>
                <Label htmlFor="paint-decorative" className="cursor-pointer">Décorative</Label>
                <p className="text-xs text-gray-500">Effets spéciaux</p>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Type de sol</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-base flex items-center mb-3">
              <PaintBucket className="h-4 w-4 text-blue-500 mr-2" />
              Carrelage
            </Label>
            
            <RadioGroup 
              value={floorTileType} 
              onValueChange={setFloorTileType}
              className="grid grid-cols-1 gap-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setFloorTileType('standard')}
              >
                <CardContent className="pt-3 pb-3 flex items-center">
                  <RadioGroupItem value="standard" id="tile-standard" className="mr-2" />
                  <Label htmlFor="tile-standard" className="cursor-pointer">Standard</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setFloorTileType('premium')}
              >
                <CardContent className="pt-3 pb-3 flex items-center">
                  <RadioGroupItem value="premium" id="tile-premium" className="mr-2" />
                  <Label htmlFor="tile-premium" className="cursor-pointer">Premium</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${floorTileType === 'luxury' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setFloorTileType('luxury')}
              >
                <CardContent className="pt-3 pb-3 flex items-center">
                  <RadioGroupItem value="luxury" id="tile-luxury" className="mr-2" />
                  <Label htmlFor="tile-luxury" className="cursor-pointer">Luxe</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base flex items-center mb-3">
              <Layers className="h-4 w-4 text-blue-500 mr-2" />
              Parquet
            </Label>
            
            <RadioGroup 
              value={parquetType} 
              onValueChange={setParquetType}
              className="grid grid-cols-1 gap-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setParquetType('standard')}
              >
                <CardContent className="pt-3 pb-3 flex items-center">
                  <RadioGroupItem value="standard" id="parquet-standard" className="mr-2" />
                  <Label htmlFor="parquet-standard" className="cursor-pointer">Stratifié</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'engineered' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setParquetType('engineered')}
              >
                <CardContent className="pt-3 pb-3 flex items-center">
                  <RadioGroupItem value="engineered" id="parquet-engineered" className="mr-2" />
                  <Label htmlFor="parquet-engineered" className="cursor-pointer">Contrecollé</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'solid' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setParquetType('solid')}
              >
                <CardContent className="pt-3 pb-3 flex items-center">
                  <RadioGroupItem value="solid" id="parquet-solid" className="mr-2" />
                  <Label htmlFor="parquet-solid" className="cursor-pointer">Massif</Label>
                </CardContent>
              </Card>
            </RadioGroup>
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

export default FinishDetailsStep;
