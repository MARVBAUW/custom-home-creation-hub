import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { calculateDemolitionCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';

// Sample demolition types
const demolitionTypes = [
  { id: 'TOTALE', label: 'Démolition totale', description: 'Démolition complète de la structure existante' },
  { id: 'PARTIELLE', label: 'Démolition partielle', description: 'Démolition de certaines parties du bâtiment' },
  { id: 'NON CONCERNE', label: 'Non concerné', description: 'Pas de démolition nécessaire' }
];

const DemolitionForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [demolitionType, setDemolitionType] = useState<string>(
    formData.demolitionType || 'NON CONCERNE'
  );
  
  const [demolitionArea, setDemolitionArea] = useState<string>(
    formData.demolitionArea ? String(formData.demolitionArea) : ''
  );
  
  const [wasteOptions, setWasteOptions] = useState<string[]>(
    Array.isArray(formData.wasteOptions) ? formData.wasteOptions : (formData.wasteOptions ? [formData.wasteOptions as string] : [])
  );
  
  const [areaValues, setAreaValues] = useState<Record<string, string>>(
    formData.wasteOptionAreas || {}
  );

  // Toggle a waste option
  const toggleWasteOption = (option: string) => {
    if (wasteOptions.includes(option)) {
      setWasteOptions(wasteOptions.filter(item => item !== option));
    } else {
      setWasteOptions([...wasteOptions, option]);
    }
  };

  // Update area value for a waste option
  const updateAreaValue = (option: string, value: string) => {
    setAreaValues({
      ...areaValues,
      [option]: value
    });
  };

  const handleSubmit = () => {
    // Calculate demolition cost
    let cost = 0;
    if (demolitionType !== 'NON CONCERNE') {
      cost = calculateDemolitionCost(demolitionType, ensureNumber(demolitionArea));
    }
    
    // Add waste management costs (simplified example)
    const wasteCosts: Record<string, number> = {};
    let totalWasteCost = 0;
    
    wasteOptions.forEach(option => {
      const area = ensureNumber(areaValues[option], 0);
      // Sample calculation: €50 per square meter for waste management
      const wasteCost = area * 50;
      wasteCosts[option] = wasteCost;
      totalWasteCost += wasteCost;
    });
    
    const totalCost = cost + totalWasteCost;

    // Update form data
    updateFormData({
      demolitionType,
      demolitionArea: ensureNumber(demolitionArea),
      demolitionCost: cost,
      wasteOptions: wasteOptions.length > 0 ? wasteOptions : [],
      wasteOptionAreas: areaValues,
      wasteManagementCosts: wasteCosts,
      wasteTotalCost: totalWasteCost,
      montantT: ensureNumber(formData.montantT) + totalCost
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-red-500" />
          Démolition
        </h3>
        
        <div className="mb-6">
          <Label className="text-base mb-2 block">Type de démolition</Label>
          <RadioGroup
            value={demolitionType}
            onValueChange={setDemolitionType}
            className="grid grid-cols-1 gap-4"
          >
            {demolitionTypes.map(type => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all ${
                  demolitionType === type.id ? 'border-red-500 bg-red-50' : ''
                }`}
                onClick={() => setDemolitionType(type.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                    <Label htmlFor={type.id} className="font-medium cursor-pointer">
                      {type.label}
                    </Label>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </div>
        
        {demolitionType !== 'NON CONCERNE' && (
          <div className="mb-6">
            <Label htmlFor="demolitionArea" className="text-base mb-2 block">
              Surface à démolir (m²)
            </Label>
            <Input
              id="demolitionArea"
              type="number"
              value={demolitionArea}
              onChange={(e) => setDemolitionArea(e.target.value)}
              placeholder="Surface en m²"
              min="0"
            />
          </div>
        )}
        
        {demolitionType !== 'NON CONCERNE' && (
          <div className="mb-6">
            <Label className="text-base mb-2 block">Gestion des déchets</Label>
            <div className="space-y-3">
              {['Tri sélectif', 'Evacuation gravats', 'Recyclage'].map(option => (
                <Card
                  key={option}
                  className={`cursor-pointer transition-all ${
                    wasteOptions.includes(option) ? 'border-red-500 bg-red-50' : ''
                  }`}
                  onClick={() => toggleWasteOption(option)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <Checkbox
                        id={option}
                        checked={wasteOptions.includes(option)}
                        onCheckedChange={() => {}}
                        className="mr-2"
                      />
                      <Label htmlFor={option} className="font-medium cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {wasteOptions.length > 0 && (
          <div className="mb-6">
            <Label className="text-base mb-2 block">Surfaces concernées (m²)</Label>
            <div className="space-y-3">
              {wasteOptions.map(option => (
                <div key={option}>
                  <Label htmlFor={`area-${option}`} className="block text-sm font-medium">
                    {option}
                  </Label>
                  <Input
                    id={`area-${option}`}
                    type="number"
                    value={areaValues[option] || ''}
                    onChange={(e) => updateAreaValue(option, e.target.value)}
                    placeholder="Surface en m²"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex items-center gap-2"
          >
            Suivant
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemolitionForm;
