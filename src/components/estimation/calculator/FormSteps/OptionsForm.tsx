
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  calculateCarportCost, 
  calculatePoolCost, 
  calculatePoolHeatingCost, 
  calculateJacuzziCost,
  ensureNumber 
} from '../utils/montantUtils';
import { Car, Pool, Thermometer, Bath } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OptionsForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize state for options
  const [carportType, setCarportType] = useState<string>(
    formData.carportType || ''
  );
  
  const [poolType, setPoolType] = useState<string>(
    formData.poolType || ''
  );
  
  const [poolDimension, setPoolDimension] = useState<string>(
    formData.poolArea || ''
  );
  
  const [poolHeating, setPoolHeating] = useState<string>(
    formData.poolHeating || ''
  );
  
  const [jacuzziType, setJacuzziType] = useState<string>(
    formData.jacuzziType || ''
  );
  
  const [jacuzziArea, setJacuzziArea] = useState<string>(
    formData.jacuzziArea || ''
  );
  
  const [activeTab, setActiveTab] = useState<string>("carport");

  const handleSubmit = () => {
    // Calculate costs based on selections
    let additionalCost = 0;

    // Calculate carport cost
    if (carportType) {
      additionalCost += calculateCarportCost(carportType);
    }
    
    // Calculate pool cost
    if (poolType && poolDimension) {
      const area = ensureNumber(poolDimension);
      additionalCost += calculatePoolCost(poolType, area);
      
      // Add pool heating cost if selected
      if (poolHeating === 'AVEC') {
        additionalCost += calculatePoolHeatingCost(area);
      }
    }
    
    // Calculate jacuzzi cost
    if (jacuzziType && jacuzziArea) {
      const area = ensureNumber(jacuzziArea);
      additionalCost += calculateJacuzziCost(jacuzziType, area);
    }

    // Update form data with options selections and costs
    updateFormData({
      carportType,
      poolType,
      poolArea: poolDimension,
      poolHeating,
      jacuzziType,
      jacuzziArea,
      includeOptions: carportType !== '' || poolType !== '' || jacuzziType !== '',
      montantT: (formData.montantT || 0) + additionalCost
    });
    
    // Navigate to next step
    goToNextStep();
  };

  // Check if form is valid
  const isValid = () => {
    // Pool validation
    if (poolType && !poolDimension) return false;
    if (poolType && !poolHeating) return false;
    
    // Jacuzzi validation
    if (jacuzziType && !jacuzziArea) return false;
    
    // At least one option should be valid
    return true;
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Options supplémentaires</h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="carport">Carport</TabsTrigger>
            <TabsTrigger value="pool">Piscine</TabsTrigger>
            <TabsTrigger value="jacuzzi">Jacuzzi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="carport" className="space-y-4">
            <Label className="mb-2 block">Type de carport</Label>
            <RadioGroup 
              value={carportType} 
              onValueChange={setCarportType}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${carportType === 'SIMPLE' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                  <Car className="h-8 w-8 text-blue-500" />
                  <div>
                    <RadioGroupItem value="SIMPLE" id="carport-simple" className="sr-only" />
                    <Label htmlFor="carport-simple" className="font-medium">Simple</Label>
                    <p className="text-xs text-gray-500">Pour un véhicule</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${carportType === 'DOUBLE' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                  <Car className="h-8 w-8 text-blue-500" />
                  <div>
                    <RadioGroupItem value="DOUBLE" id="carport-double" className="sr-only" />
                    <Label htmlFor="carport-double" className="font-medium">Double</Label>
                    <p className="text-xs text-gray-500">Pour deux véhicules</p>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          </TabsContent>
          
          <TabsContent value="pool" className="space-y-4">
            <Label className="mb-2 block">Type de piscine enterrée</Label>
            <RadioGroup 
              value={poolType} 
              onValueChange={setPoolType}
              className="grid grid-cols-1 gap-4"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${poolType === 'COQUE POLYESTER' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                  <Pool className="h-8 w-8 text-blue-500" />
                  <div>
                    <RadioGroupItem value="COQUE POLYESTER" id="pool-polyester" className="sr-only" />
                    <Label htmlFor="pool-polyester" className="font-medium">Coque Polyester</Label>
                    <p className="text-xs text-gray-500">Piscine en coque de polyester</p>
                  </div>
                  <img 
                    src="https://storage.tally.so/41f83ef2-79c6-42bb-9918-599ddc736ad4/piscine-en-coque-polyester-en-attente-dinstallation.jpg" 
                    alt="Piscine Coque Polyester" 
                    className="h-16 ml-auto rounded-md"
                  />
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${poolType === 'BETON' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                  <Pool className="h-8 w-8 text-blue-500" />
                  <div>
                    <RadioGroupItem value="BETON" id="pool-beton" className="sr-only" />
                    <Label htmlFor="pool-beton" className="font-medium">Béton</Label>
                    <p className="text-xs text-gray-500">Piscine en béton</p>
                  </div>
                  <img 
                    src="https://storage.tally.so/eb103ade-3125-4f32-a146-348289625cd2/piscine-en-beton.jpg" 
                    alt="Piscine Béton" 
                    className="h-16 ml-auto rounded-md"
                  />
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${poolType === 'PISCINE LAGON (HORS AMENAGEMENT PAYSAGER)' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                  <Pool className="h-8 w-8 text-blue-500" />
                  <div>
                    <RadioGroupItem value="PISCINE LAGON (HORS AMENAGEMENT PAYSAGER)" id="pool-lagon" className="sr-only" />
                    <Label htmlFor="pool-lagon" className="font-medium">Piscine Lagon</Label>
                    <p className="text-xs text-gray-500">Style lagon (hors aménagement paysager)</p>
                  </div>
                  <img 
                    src="https://storage.tally.so/4f6e0372-05f8-407a-bd94-2dd094bedeea/62b34acd-33ad-47f0-a3e6-5dbdb4795e67.jpg" 
                    alt="Piscine Lagon" 
                    className="h-16 ml-auto rounded-md"
                  />
                </CardContent>
              </Card>
            </RadioGroup>
            
            {poolType && (
              <>
                <div className="mt-4">
                  <Label htmlFor="poolDimension">Dimension de la piscine (m²)</Label>
                  <Input
                    id="poolDimension"
                    type="number"
                    value={poolDimension}
                    onChange={(e) => setPoolDimension(e.target.value)}
                    placeholder="Surface en m²"
                    className="mt-1"
                  />
                </div>
                
                <div className="mt-4">
                  <Label className="mb-2 block">Système de chauffage de la piscine</Label>
                  <RadioGroup 
                    value={poolHeating} 
                    onValueChange={setPoolHeating}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <Card 
                      className={`cursor-pointer transition-all hover:shadow-md ${poolHeating === 'AVEC' ? 'border-red-500 bg-red-50' : ''}`}
                    >
                      <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                        <Thermometer className="h-8 w-8 text-red-500" />
                        <div>
                          <RadioGroupItem value="AVEC" id="heating-with" className="sr-only" />
                          <Label htmlFor="heating-with" className="font-medium">Avec chauffage</Label>
                          <p className="text-xs text-gray-500">Piscine chauffée</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-all hover:shadow-md ${poolHeating === 'SANS' ? 'border-blue-500 bg-blue-50' : ''}`}
                    >
                      <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                        <Thermometer className="h-8 w-8 text-blue-500" />
                        <div>
                          <RadioGroupItem value="SANS" id="heating-without" className="sr-only" />
                          <Label htmlFor="heating-without" className="font-medium">Sans chauffage</Label>
                          <p className="text-xs text-gray-500">Piscine non chauffée</p>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="jacuzzi" className="space-y-4">
            <Label className="mb-2 block">Type de jacuzzi enterré</Label>
            <RadioGroup 
              value={jacuzziType} 
              onValueChange={setJacuzziType}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${jacuzziType === 'BASE' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                  <Bath className="h-8 w-8 text-blue-500" />
                  <div>
                    <RadioGroupItem value="BASE" id="jacuzzi-base" className="sr-only" />
                    <Label htmlFor="jacuzzi-base" className="font-medium">Base</Label>
                    <p className="text-xs text-gray-500">Modèle standard</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${jacuzziType === 'PLUS' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                  <Bath className="h-8 w-8 text-blue-500" />
                  <div>
                    <RadioGroupItem value="PLUS" id="jacuzzi-plus" className="sr-only" />
                    <Label htmlFor="jacuzzi-plus" className="font-medium">Plus</Label>
                    <p className="text-xs text-gray-500">Modèle amélioré</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${jacuzziType === 'PREMIUM' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                  <Bath className="h-8 w-8 text-blue-500" />
                  <div>
                    <RadioGroupItem value="PREMIUM" id="jacuzzi-premium" className="sr-only" />
                    <Label htmlFor="jacuzzi-premium" className="font-medium">Premium</Label>
                    <p className="text-xs text-gray-500">Modèle haut de gamme</p>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
            
            {jacuzziType && (
              <div className="mt-4">
                <Label htmlFor="jacuzziArea">Surface du jacuzzi (m²)</Label>
                <Input
                  id="jacuzziArea"
                  type="number"
                  value={jacuzziArea}
                  onChange={(e) => setJacuzziArea(e.target.value)}
                  placeholder="Surface en m²"
                  className="mt-1"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid()}
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

export default OptionsForm;
