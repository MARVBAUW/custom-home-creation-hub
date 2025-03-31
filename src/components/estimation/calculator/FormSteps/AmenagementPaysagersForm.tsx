import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  calculateLandscapingCost, 
  calculateFencingCost, 
  calculateGateCost, 
  calculateTerraceCost,
  ensureNumber 
} from '../utils/montantUtils';
import { Tree, Fence, Gate, Footprints } from 'lucide-react';

const AmenagementPaysagersForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize state for landscape types
  const [landscapingTypes, setLandscapingTypes] = useState<string[]>(
    formData.landscapingType ? (Array.isArray(formData.landscapingType) ? formData.landscapingType : [formData.landscapingType]) : []
  );

  // Initialize state for area values
  const [landscapingArea, setLandscapingArea] = useState<string>(
    formData.landscapingArea || ''
  );
  const [fencingLength, setFencingLength] = useState<string>(
    formData.fencingLength || ''
  );
  const [gateLength, setGateLength] = useState<string>(
    formData.gateLength || ''
  );
  const [terraceArea, setTerraceArea] = useState<string>(
    formData.terraceArea || ''
  );

  // Determine what fields to show based on selections
  const showLittleArea = landscapingTypes.includes('UN PEU');
  const showMuchArea = landscapingTypes.includes('BEAUCOUP');
  const showPassionatelyArea = landscapingTypes.includes('PASSIONNEMENT');
  const showFencingLength = landscapingTypes.includes('CLOTURE');
  const showGateLength = landscapingTypes.includes('PORTAIL');
  const showTerraceArea = landscapingTypes.includes('TERRASSE');

  // Toggle a landscaping type in the array
  const toggleLandscapingType = (type: string) => {
    if (type === 'PAS DU TOUT') {
      // If "PAS DU TOUT" is selected, clear all other options
      setLandscapingTypes(['PAS DU TOUT']);
      setLandscapingArea('');
      setFencingLength('');
      setGateLength('');
      setTerraceArea('');
    } else {
      // Otherwise, update the array of selections (removing PAS DU TOUT if present)
      setLandscapingTypes((prev) => {
        // If this type is already selected, remove it
        if (prev.includes(type)) {
          return prev.filter(t => t !== type);
        } 
        // Otherwise, add it and remove PAS DU TOUT if present
        return [...prev.filter(t => t !== 'PAS DU TOUT'), type];
      });
    }
  };

  const handleSubmit = () => {
    // Calculate costs based on selections
    let additionalCost = 0;

    // Calculate landscaping costs
    if (landscapingTypes.includes('UN PEU') && landscapingArea) {
      const area = ensureNumber(landscapingArea);
      additionalCost += calculateLandscapingCost('UN PEU', area);
    }
    
    if (landscapingTypes.includes('BEAUCOUP') && landscapingArea) {
      const area = ensureNumber(landscapingArea);
      additionalCost += calculateLandscapingCost('BEAUCOUP', area);
    }
    
    if (landscapingTypes.includes('PASSIONNEMENT') && landscapingArea) {
      const area = ensureNumber(landscapingArea);
      additionalCost += calculateLandscapingCost('PASSIONNEMENT', area);
    }
    
    // Calculate fencing cost
    if (landscapingTypes.includes('CLOTURE') && fencingLength) {
      const length = ensureNumber(fencingLength);
      additionalCost += calculateFencingCost(length);
    }
    
    // Calculate gate cost
    if (landscapingTypes.includes('PORTAIL') && gateLength) {
      const length = ensureNumber(gateLength);
      additionalCost += calculateGateCost(length);
    }
    
    // Calculate terrace cost
    if (landscapingTypes.includes('TERRASSE') && terraceArea) {
      const area = ensureNumber(terraceArea);
      additionalCost += calculateTerraceCost(area);
    }

    // Update form data with landscaping selections and costs
    updateFormData({
      landscapingType: landscapingTypes,
      landscapingArea,
      fencingLength,
      gateLength,
      terraceArea,
      includeLandscaping: landscapingTypes.length > 0 && !landscapingTypes.includes('PAS DU TOUT'),
      montantT: (formData.montantT || 0) + additionalCost
    });
    
    // Navigate to next step
    goToNextStep();
  };

  // Check if form is valid
  const isValid = () => {
    if (landscapingTypes.includes('PAS DU TOUT')) return true;
    
    if (landscapingTypes.includes('UN PEU') && !landscapingArea) return false;
    if (landscapingTypes.includes('BEAUCOUP') && !landscapingArea) return false;
    if (landscapingTypes.includes('PASSIONNEMENT') && !landscapingArea) return false;
    if (landscapingTypes.includes('CLOTURE') && !fencingLength) return false;
    if (landscapingTypes.includes('PORTAIL') && !gateLength) return false;
    if (landscapingTypes.includes('TERRASSE') && !terraceArea) return false;
    
    return landscapingTypes.length > 0;
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Aménagements paysagers</h3>
        
        <div className="space-y-4">
          <Label className="mb-2 block">Quels aménagements paysagers souhaitez-vous ?</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${landscapingTypes.includes('UN PEU') ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => toggleLandscapingType('UN PEU')}
            >
              <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                <Tree className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">Un peu</p>
                  <p className="text-xs text-gray-500">Quelques plantations et aménagements basiques</p>
                </div>
                <Checkbox 
                  checked={landscapingTypes.includes('UN PEU')}
                  className="ml-auto"
                  onCheckedChange={() => {}}
                />
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${landscapingTypes.includes('BEAUCOUP') ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => toggleLandscapingType('BEAUCOUP')}
            >
              <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                <Tree className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">Beaucoup</p>
                  <p className="text-xs text-gray-500">Aménagement paysager élaboré</p>
                </div>
                <Checkbox 
                  checked={landscapingTypes.includes('BEAUCOUP')}
                  className="ml-auto"
                  onCheckedChange={() => {}}
                />
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${landscapingTypes.includes('PASSIONNEMENT') ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => toggleLandscapingType('PASSIONNEMENT')}
            >
              <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                <Tree className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">Passionnément</p>
                  <p className="text-xs text-gray-500">Aménagement paysager haut de gamme</p>
                </div>
                <Checkbox 
                  checked={landscapingTypes.includes('PASSIONNEMENT')}
                  className="ml-auto"
                  onCheckedChange={() => {}}
                />
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${landscapingTypes.includes('PAS DU TOUT') ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => toggleLandscapingType('PAS DU TOUT')}
            >
              <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                <Tree className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="font-medium">Pas du tout</p>
                  <p className="text-xs text-gray-500">Aucun aménagement paysager</p>
                </div>
                <Checkbox 
                  checked={landscapingTypes.includes('PAS DU TOUT')}
                  className="ml-auto"
                  onCheckedChange={() => {}}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4 mt-6">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${landscapingTypes.includes('CLOTURE') ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => toggleLandscapingType('CLOTURE')}
            >
              <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                <Fence className="h-8 w-8 text-brown-500" />
                <div>
                  <p className="font-medium">Clôture</p>
                  <p className="text-xs text-gray-500">Installation d'une clôture</p>
                </div>
                <Checkbox 
                  checked={landscapingTypes.includes('CLOTURE')}
                  className="ml-auto"
                  onCheckedChange={() => {}}
                />
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${landscapingTypes.includes('PORTAIL') ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => toggleLandscapingType('PORTAIL')}
            >
              <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                <Gate className="h-8 w-8 text-brown-500" />
                <div>
                  <p className="font-medium">Portail</p>
                  <p className="text-xs text-gray-500">Installation d'un portail</p>
                </div>
                <Checkbox 
                  checked={landscapingTypes.includes('PORTAIL')}
                  className="ml-auto"
                  onCheckedChange={() => {}}
                />
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${landscapingTypes.includes('TERRASSE') ? 'border-green-500 bg-green-50' : ''}`}
              onClick={() => toggleLandscapingType('TERRASSE')}
            >
              <CardContent className="pt-4 pb-4 flex items-center space-x-4">
                <Footprints className="h-8 w-8 text-brown-500" />
                <div>
                  <p className="font-medium">Terrasse</p>
                  <p className="text-xs text-gray-500">Création d'une terrasse</p>
                </div>
                <Checkbox 
                  checked={landscapingTypes.includes('TERRASSE')}
                  className="ml-auto"
                  onCheckedChange={() => {}}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Conditionally show area inputs based on selections */}
          {(showLittleArea || showMuchArea || showPassionatelyArea) && (
            <div className="mt-4">
              <Label htmlFor="landscapingArea">Surface de l'aménagement paysager (m²)</Label>
              <Input
                id="landscapingArea"
                type="number"
                value={landscapingArea}
                onChange={(e) => setLandscapingArea(e.target.value)}
                placeholder="Surface en m²"
                className="mt-1"
              />
            </div>
          )}
          
          {showFencingLength && (
            <div className="mt-4">
              <Label htmlFor="fencingLength">Longueur de la clôture (ml)</Label>
              <Input
                id="fencingLength"
                type="number"
                value={fencingLength}
                onChange={(e) => setFencingLength(e.target.value)}
                placeholder="Longueur en mètres linéaires"
                className="mt-1"
              />
            </div>
          )}
          
          {showGateLength && (
            <div className="mt-4">
              <Label htmlFor="gateLength">Longueur du portail (ml)</Label>
              <Input
                id="gateLength"
                type="number"
                value={gateLength}
                onChange={(e) => setGateLength(e.target.value)}
                placeholder="Longueur en mètres linéaires"
                className="mt-1"
              />
            </div>
          )}
          
          {showTerraceArea && (
            <div className="mt-4">
              <Label htmlFor="terraceArea">Surface de la terrasse (m²)</Label>
              <Input
                id="terraceArea"
                type="number"
                value={terraceArea}
                onChange={(e) => setTerraceArea(e.target.value)}
                placeholder="Surface en m²"
                className="mt-1"
              />
            </div>
          )}
        </div>
        
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

export default AmenagementPaysagersForm;
