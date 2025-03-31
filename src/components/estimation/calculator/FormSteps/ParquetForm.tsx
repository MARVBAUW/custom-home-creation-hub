
import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ensureNumber } from '../utils/montantUtils';
import { PanelTop, Ban, ExclamationTriangle } from 'lucide-react';

const ParquetForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Get previous floor tile percentage from form data if it exists
  const existingFloorTilePercentage = formData.floorTilePercentage 
    ? Number(formData.floorTilePercentage) 
    : 0;

  // Parquet state
  const [parquetType, setParquetType] = useState<string>(
    formData.parquetType || 'standard'
  );
  const [parquetPercentage, setParquetPercentage] = useState<number>(
    Number(formData.parquetPercentage || 30)
  );

  // Soft floor state
  const [softFloorType, setSoftFloorType] = useState<string>(
    formData.softFloorType || 'standard'
  );
  const [softFloorPercentage, setSoftFloorPercentage] = useState<number>(
    Number(formData.softFloorPercentage || 20)
  );

  // Validation state
  const [totalPercentage, setTotalPercentage] = useState<number>(
    existingFloorTilePercentage + parquetPercentage + softFloorPercentage
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update total percentage when component values change
  useEffect(() => {
    const total = existingFloorTilePercentage + 
      (parquetType === 'non_concerne' ? 0 : parquetPercentage) + 
      (softFloorType === 'non_concerne' ? 0 : softFloorPercentage);
    
    setTotalPercentage(total);
    
    if (total > 100) {
      setErrorMessage("La somme des surfaces de revêtements de sol (carrelage, parquet, sol souple) ne peut pas être supérieure à 100%");
    } else if (total < 100) {
      setErrorMessage("La somme des surfaces de revêtements de sol (carrelage, parquet, sol souple) doit être égale à 100%");
    } else {
      setErrorMessage(null);
    }
  }, [existingFloorTilePercentage, parquetType, parquetPercentage, softFloorType, softFloorPercentage]);

  // Calculate cost for a specific type and percentage
  const calculateCost = (type: string, percentage: number, baseRate: number, mediumRate: number, premiumRate: number) => {
    if (type === 'non_concerne') return 0;
    
    const surface = ensureNumber(formData.surface, 0);
    let rate = 0;
    
    switch (type) {
      case 'standard':
        rate = baseRate;
        break;
      case 'medium':
        rate = mediumRate;
        break;
      case 'premium':
        rate = premiumRate;
        break;
    }
    
    return (rate * surface * (percentage / 100));
  };

  const handleSubmit = () => {
    if (totalPercentage !== 100) {
      return; // Prevent submission if percentages don't add up to 100%
    }

    // Calculate parquet cost
    const parquetCost = calculateCost(parquetType, parquetPercentage, 0.55, 0.66, 1.08);
    
    // Calculate soft floor cost
    const softFloorCost = calculateCost(softFloorType, softFloorPercentage, 0.3, 0.35, 0.4);
    
    // Calculate total cost
    const totalCost = parquetCost + softFloorCost;

    // Update form data with flooring options and cost
    updateFormData({
      parquetType,
      parquetPercentage: parquetType === 'non_concerne' ? 0 : parquetPercentage,
      softFloorType,
      softFloorPercentage: softFloorType === 'non_concerne' ? 0 : softFloorPercentage,
      montantT: (formData.montantT || 0) + totalCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Parquet & sol souple</h3>
        
        {/* Parquet section */}
        <div className="mb-8">
          <Label className="mb-2 block">Parquet</Label>
          <RadioGroup 
            value={parquetType} 
            onValueChange={setParquetType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setParquetType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <PanelTop className="h-8 w-8 text-amber-600 mb-2" />
                <RadioGroupItem value="standard" id="parquet-standard" className="sr-only" />
                <Label htmlFor="parquet-standard" className="font-medium">Parquet de base</Label>
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
                <PanelTop className="h-8 w-8 text-amber-700 mb-2" />
                <RadioGroupItem value="medium" id="parquet-medium" className="sr-only" />
                <Label htmlFor="parquet-medium" className="font-medium">Parquet MG</Label>
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
                <PanelTop className="h-8 w-8 text-amber-800 mb-2" />
                <RadioGroupItem value="premium" id="parquet-premium" className="sr-only" />
                <Label htmlFor="parquet-premium" className="font-medium">Parquet HG</Label>
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
              <Label className="text-base font-medium">Surface % de parquet</Label>
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

        {/* Sol souple section */}
        <div className="mb-8">
          <Label className="mb-2 block">Sol souple</Label>
          <RadioGroup 
            value={softFloorType} 
            onValueChange={setSoftFloorType}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSoftFloorType('standard')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <PanelTop className="h-8 w-8 text-blue-500 mb-2" />
                <RadioGroupItem value="standard" id="soft-floor-standard" className="sr-only" />
                <Label htmlFor="soft-floor-standard" className="font-medium">Sol souple base</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Vinyle simple
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'medium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSoftFloorType('medium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <PanelTop className="h-8 w-8 text-blue-600 mb-2" />
                <RadioGroupItem value="medium" id="soft-floor-medium" className="sr-only" />
                <Label htmlFor="soft-floor-medium" className="font-medium">Sol souple MG</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Vinyle renforcé
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSoftFloorType('premium')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <PanelTop className="h-8 w-8 text-blue-700 mb-2" />
                <RadioGroupItem value="premium" id="soft-floor-premium" className="sr-only" />
                <Label htmlFor="soft-floor-premium" className="font-medium">Sol souple HG</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Vinyle premium
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSoftFloorType('non_concerne')}
            >
              <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                <Ban className="h-8 w-8 text-gray-500 mb-2" />
                <RadioGroupItem value="non_concerne" id="soft-floor-none" className="sr-only" />
                <Label htmlFor="soft-floor-none" className="font-medium">Non concerné</Label>
                <p className="text-xs text-gray-500 mt-1">
                  Pas de sol souple prévu
                </p>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>
        
        {softFloorType !== 'non_concerne' && (
          <div className="mb-8">
            <div className="flex justify-between">
              <Label className="text-base font-medium">Surface % de sol souple</Label>
              <span className="text-sm font-medium">{softFloorPercentage}%</span>
            </div>
            <Slider
              value={[softFloorPercentage]}
              max={100}
              step={5}
              onValueChange={(value) => setSoftFloorPercentage(value[0])}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Total percentage indicator */}
        <div className="mb-4">
          <div className="flex justify-between">
            <Label className="text-base font-medium">Surface totale</Label>
            <span className={`text-sm font-medium ${totalPercentage !== 100 ? 'text-red-500' : 'text-green-500'}`}>
              {totalPercentage}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className={`h-2.5 rounded-full ${totalPercentage > 100 ? 'bg-red-500' : totalPercentage === 100 ? 'bg-green-500' : 'bg-yellow-500'}`} 
              style={{ width: `${Math.min(totalPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={totalPercentage !== 100}
          >
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
