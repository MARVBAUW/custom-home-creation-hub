
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AlertTriangle } from 'lucide-react';
import { ensureNumber } from '../utils/typeConversions';
import { calculateParquetCost, calculateSoftFloorCost } from '../utils/montantUtils';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ParquetForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [activeTab, setActiveTab] = useState<string>('parquet');
  
  // Parquet type state
  const [parquetType, setParquetType] = useState<string>(
    formData.parquetType || 'none'
  );
  
  // Parquet area state
  const [parquetArea, setParquetArea] = useState<number>(
    ensureNumber(formData.parquetArea, 0)
  );
  
  // Soft flooring type state
  const [softFloorType, setSoftFloorType] = useState<string>(
    formData.softFloorType || 'none'
  );
  
  // Soft flooring area state
  const [softFloorArea, setSoftFloorArea] = useState<number>(
    ensureNumber(formData.softFloorArea, 0)
  );

  // Calculate total floor area for validation
  const totalFloorArea = (parquetType !== 'none' ? parquetArea : 0) + 
                         (softFloorType !== 'none' ? softFloorArea : 0) +
                         (formData.floorTileArea || 0);
  
  // Get the surface area from the form data
  const totalSurface = ensureNumber(formData.surface, 0);
  
  // Determine if the form has valid values for submission
  const isValid = totalFloorArea <= totalSurface;
  
  // Handle form submission
  const handleSubmit = () => {
    // Calculate costs
    let additionalCost = 0;
    
    if (parquetType !== 'none') {
      additionalCost += calculateParquetCost(parquetType, parquetArea);
    }
    
    if (softFloorType !== 'none') {
      additionalCost += calculateSoftFloorCost(softFloorType, softFloorArea);
    }
    
    // Update form data with selected options and costs
    updateFormData({
      parquetType,
      parquetArea,
      softFloorType,
      softFloorArea,
      montantT: (formData.montantT || 0) + additionalCost
    });
    
    // Proceed to next step
    goToNextStep();
  };
  
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-2">Revêtements de sol</h3>
        <p className="text-sm text-gray-500 mb-4">
          Sélectionnez les types de revêtements de sol pour votre projet et leurs surfaces respectives.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parquet">Parquet</TabsTrigger>
            <TabsTrigger value="soft-floor">Sol souple</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parquet" className="space-y-4 pt-4">
            <RadioGroup 
              value={parquetType} 
              onValueChange={setParquetType}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'PARQUET DE BASE' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setParquetType('PARQUET DE BASE')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="PARQUET DE BASE" id="parquet-base" className="mr-2" />
                  <Label htmlFor="parquet-base" className="cursor-pointer flex-1">
                    <div className="font-medium">Parquet de base</div>
                    <p className="text-xs text-gray-500">
                      Stratifié standard, bon rapport qualité-prix
                    </p>
                  </Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'PARQUET MG' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setParquetType('PARQUET MG')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="PARQUET MG" id="parquet-medium" className="mr-2" />
                  <Label htmlFor="parquet-medium" className="cursor-pointer flex-1">
                    <div className="font-medium">Parquet milieu de gamme</div>
                    <p className="text-xs text-gray-500">
                      Contrecollé ou stratifié premium
                    </p>
                  </Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${parquetType === 'PARQUET HG' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setParquetType('PARQUET HG')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="PARQUET HG" id="parquet-premium" className="mr-2" />
                  <Label htmlFor="parquet-premium" className="cursor-pointer flex-1">
                    <div className="font-medium">Parquet haut de gamme</div>
                    <p className="text-xs text-gray-500">
                      Bois massif, finition de qualité supérieure
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
                      Pas de parquet dans ce projet
                    </p>
                  </Label>
                </CardContent>
              </Card>
            </RadioGroup>
            
            {parquetType !== 'none' && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium">Surface à couvrir (m²)</Label>
                  <span className="text-sm font-bold">{parquetArea} m²</span>
                </div>
                
                <Slider
                  value={[parquetArea]}
                  min={0}
                  max={totalSurface}
                  step={1}
                  onValueChange={(value) => setParquetArea(value[0])}
                  className="mt-2"
                />
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 m²</span>
                  <span>{totalSurface} m²</span>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="soft-floor" className="space-y-4 pt-4">
            <RadioGroup 
              value={softFloorType} 
              onValueChange={setSoftFloorType}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'SOL SOUPLE BASE' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setSoftFloorType('SOL SOUPLE BASE')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="SOL SOUPLE BASE" id="soft-floor-base" className="mr-2" />
                  <Label htmlFor="soft-floor-base" className="cursor-pointer flex-1">
                    <div className="font-medium">Sol souple de base</div>
                    <p className="text-xs text-gray-500">
                      Linoleum ou PVC standard
                    </p>
                  </Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'SOL SOUPLE MG' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setSoftFloorType('SOL SOUPLE MG')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="SOL SOUPLE MG" id="soft-floor-medium" className="mr-2" />
                  <Label htmlFor="soft-floor-medium" className="cursor-pointer flex-1">
                    <div className="font-medium">Sol souple milieu de gamme</div>
                    <p className="text-xs text-gray-500">
                      Vinyle de qualité ou moquette standard
                    </p>
                  </Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'SOL SOUPLE HG' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setSoftFloorType('SOL SOUPLE HG')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="SOL SOUPLE HG" id="soft-floor-premium" className="mr-2" />
                  <Label htmlFor="soft-floor-premium" className="cursor-pointer flex-1">
                    <div className="font-medium">Sol souple haut de gamme</div>
                    <p className="text-xs text-gray-500">
                      LVT design ou moquette haute qualité
                    </p>
                  </Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${softFloorType === 'none' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setSoftFloorType('none')}
              >
                <CardContent className="pt-4 pb-4 flex items-center">
                  <RadioGroupItem value="none" id="soft-floor-none" className="mr-2" />
                  <Label htmlFor="soft-floor-none" className="cursor-pointer flex-1">
                    <div className="font-medium">Non concerné</div>
                    <p className="text-xs text-gray-500">
                      Pas de sol souple dans ce projet
                    </p>
                  </Label>
                </CardContent>
              </Card>
            </RadioGroup>
            
            {softFloorType !== 'none' && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium">Surface à couvrir (m²)</Label>
                  <span className="text-sm font-bold">{softFloorArea} m²</span>
                </div>
                
                <Slider
                  value={[softFloorArea]}
                  min={0}
                  max={totalSurface}
                  step={1}
                  onValueChange={(value) => setSoftFloorArea(value[0])}
                  className="mt-2"
                />
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 m²</span>
                  <span>{totalSurface} m²</span>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Surface totale indicator */}
        <div className="mt-6 bg-white p-4 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Surface totale de revêtements de sol</span>
            <span className={`text-sm font-bold ${!isValid ? 'text-red-500' : 'text-green-500'}`}>
              {totalFloorArea} / {totalSurface} m²
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${!isValid ? 'bg-red-500' : 'bg-green-500'}`} 
              style={{ width: `${Math.min((totalFloorArea / totalSurface) * 100, 100)}%` }}
            ></div>
          </div>
          
          {!isValid && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>
                Attention : La surface totale des revêtements de sol ({totalFloorArea}m²) excède la surface du projet ({totalSurface}m²).
              </AlertDescription>
            </Alert>
          )}
          
          {formData.floorTileArea && formData.floorTileArea > 0 && (
            <div className="mt-4 text-sm">
              <span className="font-medium">Rappel : </span>
              <span className="text-gray-600">Vous avez déjà alloué {formData.floorTileArea}m² de carrelage dans une étape précédente.</span>
            </div>
          )}
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
            disabled={!isValid && totalFloorArea > 0}
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
