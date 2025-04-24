import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ensureNumber } from '../utils/typeConversions';

const ParquetStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [parquetType, setParquetType] = React.useState<string>(formData.parquetType || '');
  const [parquetArea, setParquetArea] = React.useState<string>(
    formData.parquetArea ? String(formData.parquetArea) : ''
  );
  const [softFloorType, setSoftFloorType] = React.useState<string>(formData.softFloorType || '');
  
  const handleSubmit = () => {
    updateFormData({
      parquetType,
      parquetArea: ensureNumber(parquetArea),
      softFloorType
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-6">Revêtements de sol</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">
            Type de parquet <span className="text-red-500">*</span>
          </Label>
          
          <RadioGroup 
            value={parquetType} 
            onValueChange={setParquetType}
            className="grid grid-cols-1 gap-4 mt-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'stratifie' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('stratifie')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="stratifie" id="stratifie" className="mr-2" />
                <Label htmlFor="stratifie" className="cursor-pointer">Parquet stratifié</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'massif' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('massif')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="massif" id="massif" className="mr-2" />
                <Label htmlFor="massif" className="cursor-pointer">Parquet massif</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'contrecolle' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('contrecolle')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="contrecolle" id="contrecolle" className="mr-2" />
                <Label htmlFor="contrecolle" className="cursor-pointer">Parquet contrecollé</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('non_concerne')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="non_concerne" id="parquet-non_concerne" className="mr-2" />
                <Label htmlFor="parquet-non_concerne" className="cursor-pointer">Non concerné</Label>
              </CardContent>
            </Card>
          </RadioGroup>
          
          {parquetType && parquetType !== 'non_concerne' && (
            <div className="mt-4">
              <Label htmlFor="parquet-area" className="block mb-2">Surface de parquet (m²)</Label>
              <Input
                id="parquet-area"
                type="number"
                value={parquetArea}
                onChange={(e) => setParquetArea(e.target.value)}
                placeholder="Surface en m²"
                className="max-w-xs"
                min="1"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <Label className="text-base font-medium">
            Revêtement de sol souple
          </Label>
          
          <RadioGroup 
            value={softFloorType} 
            onValueChange={setSoftFloorType}
            className="grid grid-cols-1 gap-4 mt-2"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'moquette' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSoftFloorType('moquette')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="moquette" id="moquette" className="mr-2" />
                <Label htmlFor="moquette" className="cursor-pointer">Moquette</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'lino' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSoftFloorType('lino')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="lino" id="lino" className="mr-2" />
                <Label htmlFor="lino" className="cursor-pointer">Linoléum / PVC</Label>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSoftFloorType('non_concerne')}
            >
              <CardContent className="flex items-center p-4">
                <RadioGroupItem value="non_concerne" id="soft-non_concerne" className="mr-2" />
                <Label htmlFor="soft-non_concerne" className="cursor-pointer">Non concerné</Label>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
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
          disabled={!parquetType || (parquetType !== 'non_concerne' && !parquetArea)}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ParquetStep;
