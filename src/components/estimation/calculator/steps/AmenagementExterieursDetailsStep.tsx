import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ensureNumber } from '../utils/typeConversions';

const AmenagementExterieursDetailsStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Pool state
  const [poolType, setPoolType] = React.useState<string>(formData.poolType || '');
  const [poolSize, setPoolSize] = React.useState<string>(
    formData.poolSize ? String(formData.poolSize) : ''
  );
  const [poolHeating, setPoolHeating] = React.useState<boolean>(formData.poolHeating || false);
  
  // Jacuzzi state
  const [jacuzziType, setJacuzziType] = React.useState<string>(formData.jacuzziType || '');
  
  // Carport state
  const [carportType, setCarportType] = React.useState<string>(formData.carportType || '');
  
  const handleSubmit = () => {
    const updatedData: Partial<any> = {};
    
    // Only add data for selected amenities
    if (formData.hasPool) {
      updatedData.poolType = poolType;
      updatedData.poolSize = ensureNumber(poolSize);
      updatedData.poolHeating = poolHeating;
    }
    
    if (formData.hasJacuzzi) {
      updatedData.jacuzziType = jacuzziType;
    }
    
    if (formData.hasCarport) {
      updatedData.carportType = carportType;
    }
    
    // Calculate costs based on selections
    let additionalCost = 0;
    
    // Pool cost calculation
    if (formData.hasPool && poolType && poolSize) {
      const size = ensureNumber(poolSize);
      let poolBaseCost = 0;
      
      switch (poolType) {
        case 'polyester':
          poolBaseCost = 800; // €/m²
          break;
        case 'concrete':
          poolBaseCost = 1200; // €/m²
          break;
        case 'natural':
          poolBaseCost = 1500; // €/m²
          break;
        default:
          poolBaseCost = 800;
      }
      
      let poolCost = size * poolBaseCost;
      
      // Add heating cost if selected
      if (poolHeating) {
        poolCost += size * 150; // additional €/m² for heating
      }
      
      additionalCost += poolCost;
    }
    
    // Jacuzzi cost calculation
    if (formData.hasJacuzzi && jacuzziType) {
      switch (jacuzziType) {
        case 'basic':
          additionalCost += 5000;
          break;
        case 'plus':
          additionalCost += 8000;
          break;
        case 'premium':
          additionalCost += 12000;
          break;
        default:
          additionalCost += 5000;
      }
    }
    
    // Carport cost calculation
    if (formData.hasCarport && carportType) {
      switch (carportType) {
        case 'single':
          additionalCost += 3500;
          break;
        case 'double':
          additionalCost += 5500;
          break;
        default:
          additionalCost += 3500;
      }
    }
    
    // Update montantT with additional costs
    const currentMontantT = ensureNumber(formData.montantT, 0);
    updatedData.montantT = currentMontantT + additionalCost;
    
    updateFormData(updatedData);
    goToNextStep();
  };
  
  // Check if form is valid based on selected options
  const isFormValid = () => {
    if (formData.hasPool && (!poolType || !poolSize)) return false;
    if (formData.hasJacuzzi && !jacuzziType) return false;
    if (formData.hasCarport && !carportType) return false;
    return true;
  };
  
  return (
    <div className={`space-y-8 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-2">Détails des aménagements extérieurs</h2>
      
      {/* Pool section */}
      {formData.hasPool && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Piscine</h3>
          
          <div className="space-y-2">
            <Label className="text-base">Type de piscine <span className="text-red-500">*</span></Label>
            
            <RadioGroup 
              value={poolType} 
              onValueChange={setPoolType}
              className="grid grid-cols-1 gap-3 mt-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${poolType === 'polyester' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setPoolType('polyester')}
              >
                <CardContent className="flex items-center p-4">
                  <RadioGroupItem value="polyester" id="polyester" className="mr-2" />
                  <Label htmlFor="polyester" className="cursor-pointer">Coque polyester</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${poolType === 'concrete' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setPoolType('concrete')}
              >
                <CardContent className="flex items-center p-4">
                  <RadioGroupItem value="concrete" id="concrete" className="mr-2" />
                  <Label htmlFor="concrete" className="cursor-pointer">Piscine en béton</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${poolType === 'natural' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setPoolType('natural')}
              >
                <CardContent className="flex items-center p-4">
                  <RadioGroupItem value="natural" id="natural" className="mr-2" />
                  <Label htmlFor="natural" className="cursor-pointer">Piscine naturelle</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pool-size" className="text-base">Surface du bassin (m²) <span className="text-red-500">*</span></Label>
            <Input
              id="pool-size"
              type="number"
              value={poolSize}
              onChange={(e) => setPoolSize(e.target.value)}
              placeholder="Surface en m²"
              className="max-w-xs"
              min="1"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="pool-heating"
              checked={poolHeating}
              onCheckedChange={setPoolHeating}
            />
            <Label htmlFor="pool-heating">Chauffage de piscine</Label>
          </div>
        </div>
      )}
      
      {/* Jacuzzi section */}
      {formData.hasJacuzzi && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Jacuzzi / Spa</h3>
          
          <div className="space-y-2">
            <Label className="text-base">Type de jacuzzi <span className="text-red-500">*</span></Label>
            
            <RadioGroup 
              value={jacuzziType} 
              onValueChange={setJacuzziType}
              className="grid grid-cols-1 gap-3 mt-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${jacuzziType === 'basic' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setJacuzziType('basic')}
              >
                <CardContent className="flex items-center p-4">
                  <RadioGroupItem value="basic" id="jacuzzi-basic" className="mr-2" />
                  <Label htmlFor="jacuzzi-basic" className="cursor-pointer">Jacuzzi standard</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${jacuzziType === 'plus' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setJacuzziType('plus')}
              >
                <CardContent className="flex items-center p-4">
                  <RadioGroupItem value="plus" id="jacuzzi-plus" className="mr-2" />
                  <Label htmlFor="jacuzzi-plus" className="cursor-pointer">Jacuzzi Plus (fonctionnalités avancées)</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${jacuzziType === 'premium' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setJacuzziType('premium')}
              >
                <CardContent className="flex items-center p-4">
                  <RadioGroupItem value="premium" id="jacuzzi-premium" className="mr-2" />
                  <Label htmlFor="jacuzzi-premium" className="cursor-pointer">Jacuzzi Premium</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
        </div>
      )}
      
      {/* Carport section */}
      {formData.hasCarport && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Carport / Abri voiture</h3>
          
          <div className="space-y-2">
            <Label className="text-base">Type de carport <span className="text-red-500">*</span></Label>
            
            <RadioGroup 
              value={carportType} 
              onValueChange={setCarportType}
              className="grid grid-cols-1 gap-3 mt-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${carportType === 'single' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setCarportType('single')}
              >
                <CardContent className="flex items-center p-4">
                  <RadioGroupItem value="single" id="carport-single" className="mr-2" />
                  <Label htmlFor="carport-single" className="cursor-pointer">Carport simple (1 voiture)</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${carportType === 'double' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setCarportType('double')}
              >
                <CardContent className="flex items-center p-4">
                  <RadioGroupItem value="double" id="carport-double" className="mr-2" />
                  <Label htmlFor="carport-double" className="cursor-pointer">Carport double (2 voitures)</Label>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>
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
          disabled={!isFormValid()}
          className="flex items-center gap-2"
        >
          Suivant
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AmenagementExterieursDetailsStep;
