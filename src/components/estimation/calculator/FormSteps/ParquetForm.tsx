
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AlertTriangle } from 'lucide-react';
import { ensureNumber } from '../utils/typeConversions';

const ParquetForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // State for parquet type selection
  const [parquetType, setParquetType] = useState<string>(formData.parquetType || 'standard');
  
  // State for percentage slider
  const [percentage, setPercentage] = useState<number>(
    ensureNumber(formData.parquetPercentage, 0)
  );
  
  // Handle submission and continue to next step
  const handleContinue = () => {
    const data = {
      parquetType,
      parquetPercentage: percentage
    };
    
    updateFormData(data);
    goToNextStep();
  };
  
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Type de parquet/sol souple</h3>
          <p className="text-sm text-gray-500 mb-4">
            Sélectionnez le type de revêtement de sol souhaité pour votre projet
          </p>
          
          <RadioGroup 
            value={parquetType} 
            onValueChange={setParquetType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="standard" id="parquet-standard" className="mr-2" />
                <Label htmlFor="parquet-standard" className="cursor-pointer flex-1">
                  <div className="font-medium">Stratifié standard</div>
                  <p className="text-xs text-gray-500">
                    Revêtement économique et résistant
                  </p>
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="premium" id="parquet-premium" className="mr-2" />
                <Label htmlFor="parquet-premium" className="cursor-pointer flex-1">
                  <div className="font-medium">Parquet contrecollé</div>
                  <p className="text-xs text-gray-500">
                    Bon rapport qualité/prix avec finition bois véritable
                  </p>
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'luxury' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('luxury')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="luxury" id="parquet-luxury" className="mr-2" />
                <Label htmlFor="parquet-luxury" className="cursor-pointer flex-1">
                  <div className="font-medium">Parquet massif</div>
                  <p className="text-xs text-gray-500">
                    Haute qualité, durable et réparable
                  </p>
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'vinyle' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('vinyle')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="vinyle" id="parquet-vinyle" className="mr-2" />
                <Label htmlFor="parquet-vinyle" className="cursor-pointer flex-1">
                  <div className="font-medium">Sol vinyle/PVC</div>
                  <p className="text-xs text-gray-500">
                    Résistant à l'eau, pratique pour pièces humides
                  </p>
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'moquette' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('moquette')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="moquette" id="parquet-moquette" className="mr-2" />
                <Label htmlFor="parquet-moquette" className="cursor-pointer flex-1">
                  <div className="font-medium">Moquette</div>
                  <p className="text-xs text-gray-500">
                    Confort acoustique et thermique
                  </p>
                </Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('none')}
            >
              <CardContent className="pt-4 pb-4 flex items-center">
                <RadioGroupItem value="none" id="parquet-none" className="mr-2" />
                <Label htmlFor="parquet-none" className="cursor-pointer flex-1">
                  <div className="font-medium">Non concerné</div>
                  <p className="text-xs text-gray-500">
                    Pas de parquet/sol souple dans ce projet
                  </p>
                </Label>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        {parquetType !== 'none' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Pourcentage de la surface</Label>
              <span className="text-sm font-bold">{percentage}%</span>
            </div>
            
            <Slider
              value={[percentage]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) => setPercentage(value[0])}
              className="mt-2"
            />
            
            <div className="flex items-start mt-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
              <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                Assurez-vous que les pourcentages de tous les revêtements de sol (carrelage, parquet, etc.) n'excèdent pas 100% de la surface totale.
              </div>
            </div>
          </div>
        )}
        
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
            onClick={handleContinue}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParquetForm;
