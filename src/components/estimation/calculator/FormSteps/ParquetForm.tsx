import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const ParquetForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const [parquetType, setParquetType] = React.useState<string>(
    defaultValues?.parquetType || formData.parquetType || 'standard'
  );
  
  const [parquetPercentage, setParquetPercentage] = React.useState<number>(
    defaultValues?.parquetPercentage || formData.parquetPercentage as number || 50
  );
  
  const [softFloorType, setSoftFloorType] = React.useState<string>(
    defaultValues?.softFloorType || formData.softFloorType || 'vinyl'
  );
  
  const [softFloorPercentage, setSoftFloorPercentage] = React.useState<number>(
    defaultValues?.softFloorPercentage || formData.softFloorPercentage as number || 0
  );

  const handleSubmit = () => {
    const data = {
      parquetType,
      parquetPercentage,
      softFloorType,
      softFloorPercentage
    };
    
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
      goToNextStep();
    }
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Parquet et revêtements de sol souples</h3>
          
          <div className="space-y-6">
            <div>
              <Label className="text-base">Type de parquet</Label>
              <RadioGroup 
                value={parquetType} 
                onValueChange={setParquetType}
                className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setParquetType('standard')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="standard" id="parquet-standard" className="mx-auto mb-2" />
                    <Label htmlFor="parquet-standard">Stratifié</Label>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'engineered' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setParquetType('engineered')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="engineered" id="parquet-engineered" className="mx-auto mb-2" />
                    <Label htmlFor="parquet-engineered">Contrecollé</Label>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'solid' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setParquetType('solid')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="solid" id="parquet-solid" className="mx-auto mb-2" />
                    <Label htmlFor="parquet-solid">Massif</Label>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Pourcentage de parquet</Label>
                <span className="text-sm font-medium">{parquetPercentage}%</span>
              </div>
              <Slider
                value={[parquetPercentage]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => setParquetPercentage(value[0])}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-base">Type de sol souple</Label>
              <RadioGroup 
                value={softFloorType} 
                onValueChange={setSoftFloorType}
                className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'vinyl' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setSoftFloorType('vinyl')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="vinyl" id="soft-vinyl" className="mx-auto mb-2" />
                    <Label htmlFor="soft-vinyl">PVC/Vinyle</Label>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'carpet' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setSoftFloorType('carpet')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="carpet" id="soft-carpet" className="mx-auto mb-2" />
                    <Label htmlFor="soft-carpet">Moquette</Label>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'linoleum' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setSoftFloorType('linoleum')}
                >
                  <CardContent className="pt-4 pb-4 text-center">
                    <RadioGroupItem value="linoleum" id="soft-linoleum" className="mx-auto mb-2" />
                    <Label htmlFor="soft-linoleum">Linoléum</Label>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Pourcentage de sol souple</Label>
                <span className="text-sm font-medium">{softFloorPercentage}%</span>
              </div>
              <Slider
                value={[softFloorPercentage]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => {
                  setSoftFloorPercentage(value[0]);
                  // Adjust parquet percentage to maintain total of 100%
                  setParquetPercentage(100 - value[0]);
                }}
                className="mt-2"
              />
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
    </div>
  );
};

export default ParquetForm;
