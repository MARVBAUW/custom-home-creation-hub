
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ensureNumber } from '../utils/montantUtils';
import { Wood, Ban } from 'lucide-react';

const ParquetForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [parquetType, setParquetType] = useState<string>(
    formData.parquetType || 'standard'
  );
  
  const [parquetPercentage, setParquetPercentage] = useState<number>(
    Number(formData.parquetPercentage || 30)
  );

  const handleSubmit = () => {
    // Calculate parquet cost here if needed
    // For now, we'll just store the selections

    // Update form data with parquet options
    updateFormData({
      parquetType,
      parquetPercentage,
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Parquet</h3>
        
        <div className="mb-8">
          <Label className="mb-2 block">Type de parquet</Label>
          <RadioGroup 
            value={parquetType} 
            onValueChange={setParquetType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Wood className="h-8 w-8 text-amber-600 mb-2" />
                <RadioGroupItem value="standard" id="parquet-standard" className="sr-only" />
                <Label htmlFor="parquet-standard" className="font-medium">Parquet standard</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Parquet stratifié
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'medium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('medium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Wood className="h-8 w-8 text-amber-700 mb-2" />
                <RadioGroupItem value="medium" id="parquet-medium" className="sr-only" />
                <Label htmlFor="parquet-medium" className="font-medium">Parquet milieu de gamme</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Parquet contrecollé
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Wood className="h-8 w-8 text-amber-800 mb-2" />
                <RadioGroupItem value="premium" id="parquet-premium" className="sr-only" />
                <Label htmlFor="parquet-premium" className="font-medium">Parquet haut de gamme</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Parquet massif
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Ban className="h-8 w-8 text-gray-500 mb-2" />
                <RadioGroupItem value="non_concerne" id="parquet-none" className="sr-only" />
                <Label htmlFor="parquet-none" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de parquet prévu
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        {parquetType !== 'non_concerne' && (
          <div className="mb-8">
            <div className="flex justify-between">
              <Label className="text-base font-medium">Proportion de surface en parquet</Label>
              <span className="text-sm font-medium">{parquetPercentage}%</span>
            </div>
            <Slider
              value={[parquetPercentage]}
              max={100}
              step={5}
              onValueChange={(value) => setParquetPercentage(value[0])}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button onClick={handleSubmit}>
            Continuer
          </Button>
        </div>
        
        {formData.montantT && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium">Total estimé: {formData.montantT.toLocaleString()} €</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParquetForm;
