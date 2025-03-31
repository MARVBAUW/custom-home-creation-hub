import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateWindowsCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';

interface WindowTypeOption {
  id: string;
  label: string;
  imageUrl: string;
}

const MenuiseriesExtForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Set up state for window selections
  const [windowType, setWindowType] = useState<string>(formData.windowType || '');
  const [replacementArea, setReplacementArea] = useState<string>(
    formData.windowRenovationArea ? String(formData.windowRenovationArea) : ''
  );
  const [newArea, setNewArea] = useState<string>(
    formData.windowNewArea ? String(formData.windowNewArea) : ''
  );
  const [activeTab, setActiveTab] = useState<string>(
    formData.projectType === 'renovation' ? 'remplacement' : 'ajout'
  );
  
  // Define window options
  const windowOptions: WindowTypeOption[] = [
    {
      id: 'bois',
      label: 'Bois',
      imageUrl: 'https://storage.tally.so/431090b7-6e9f-4b65-9287-b5fbd328627a/fenetre-bois-exotique.jpg',
    },
    {
      id: 'pvc',
      label: 'PVC',
      imageUrl: 'https://storage.tally.so/373eab2e-754c-4ce1-84c5-06620cd162a4/201824309.jpg',
    },
    {
      id: 'alu',
      label: 'Alu',
      imageUrl: 'https://storage.tally.so/0c7036b5-5dd9-49e7-a61d-38aa1ce89904/fenetre-aluminium.png',
    },
    {
      id: 'mixte',
      label: 'Mixte bois alu',
      imageUrl: 'https://storage.tally.so/6a387837-9be3-456c-8b14-df07914e6958/fe_bois_alu.webp',
    },
    {
      id: 'pvc_colore',
      label: 'PVC coloré',
      imageUrl: 'https://storage.tally.so/d7c9b355-b6a5-4b3b-9886-459581f8c2de/fenetre-pvc-de-differente-couleur.webp',
    }
  ];

  const handleSubmit = () => {
    if (!windowType) {
      // If no window type is selected, select a default one
      setWindowType('non_concerne');
      return;
    }
    
    let additionalCost = 0;
    let updatedData: any = {
      windowType
    };
    
    // Calculate costs based on active tab
    if (activeTab === 'remplacement' && windowType !== 'non_concerne') {
      // For replacement tab
      const area = ensureNumber(replacementArea, 0);
      additionalCost = calculateWindowsCost(windowType, area);
      updatedData.windowRenovationArea = area;
    } else if (activeTab === 'ajout' && windowType !== 'non_concerne') {
      // For new windows tab
      const area = ensureNumber(newArea, 0);
      additionalCost = calculateWindowsCost(windowType, area);
      updatedData.windowNewArea = area;
    }

    // Calculate and update the total cost
    const currentTotal = ensureNumber(formData.montantT, 0);
    updatedData.montantT = currentTotal + additionalCost;
    
    // Update form data and move to next step
    updateFormData(updatedData);
    goToNextStep();
  };
  
  // Determine if showing area input is needed
  const showAreaInput = windowType !== 'non_concerne' && windowType !== '';
  
  return (
    
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Menuiseries extérieures</h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="remplacement">Remplacement</TabsTrigger>
            <TabsTrigger value="ajout">Ajout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="remplacement" className="pt-4">
            <div>
              <Label className="mb-2 block">Type de fenêtres à remplacer</Label>
              <RadioGroup 
                value={windowType} 
                onValueChange={setWindowType}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {windowOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${windowType === option.id ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setWindowType(option.id)}
                  >
                    <CardContent className="p-0">
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={option.imageUrl} 
                          alt={option.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex items-center justify-center">
                        <RadioGroupItem value={option.id} id={`window-repl-${option.id}`} className="sr-only" />
                        <Label htmlFor={`window-repl-${option.id}`} className="font-medium">{option.label}</Label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setWindowType('non_concerne')}
                >
                  <CardContent className="pt-4 pb-4 flex flex-col items-center justify-center h-full">
                    <RadioGroupItem value="non_concerne" id="window-repl-non_concerne" className="sr-only" />
                    <Label htmlFor="window-repl-non_concerne" className="font-medium">Non concerné</Label>
                  </CardContent>
                </Card>
              </RadioGroup>
              
              {showAreaInput && activeTab === 'remplacement' && (
                <div className="mt-4">
                  <Label htmlFor="replacement-area" className="block mb-2">M² à remplacer</Label>
                  <Input
                    id="replacement-area"
                    type="number"
                    value={replacementArea}
                    onChange={(e) => setReplacementArea(e.target.value)}
                    placeholder="Surface en m²"
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ajout" className="pt-4">
            <div>
              <Label className="mb-2 block">Type de fenêtres à ajouter</Label>
              <RadioGroup 
                value={windowType} 
                onValueChange={setWindowType}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {windowOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${windowType === option.id ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setWindowType(option.id)}
                  >
                    <CardContent className="p-0">
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={option.imageUrl} 
                          alt={option.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex items-center justify-center">
                        <RadioGroupItem value={option.id} id={`window-add-${option.id}`} className="sr-only" />
                        <Label htmlFor={`window-add-${option.id}`} className="font-medium">{option.label}</Label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${windowType === 'non_concerne' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setWindowType('non_concerne')}
                >
                  <CardContent className="pt-4 pb-4 flex flex-col items-center justify-center h-full">
                    <RadioGroupItem value="non_concerne" id="window-add-non_concerne" className="sr-only" />
                    <Label htmlFor="window-add-non_concerne" className="font-medium">Non concerné</Label>
                  </CardContent>
                </Card>
              </RadioGroup>
              
              {showAreaInput && activeTab === 'ajout' && (
                <div className="mt-4">
                  <Label htmlFor="new-area" className="block mb-2">M² à créer</Label>
                  <Input
                    id="new-area"
                    type="number"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="Surface en m²"
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
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

export default MenuiseriesExtForm;
