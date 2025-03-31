
import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '../types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  calculateJacuzziCost, 
  calculateSolarPanelsCost,
  calculateHomeAutomationCost,
  calculateSmartAppliancesCost,
  toBoolean
} from '../utils/montantUtils';

const OptionsForm: React.FC<BaseFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep, 
  goToPreviousStep, 
  animationDirection 
}) => {
  const [hasJacuzzi, setHasJacuzzi] = useState<boolean>(toBoolean(formData.hasJacuzzi));
  const [jacuzziType, setJacuzziType] = useState<string>(String(formData.jacuzziType || 'standard'));
  const [jacuzziSize, setJacuzziSize] = useState<number>(Number(formData.jacuzziSize || 3));
  
  const [hasSolarPanels, setHasSolarPanels] = useState<boolean>(toBoolean(formData.hasSolarPanels));
  const [solarPanelsArea, setSolarPanelsArea] = useState<number>(Number(formData.solarPanelsArea || 20));
  
  const [hasSmartHome, setHasSmartHome] = useState<boolean>(toBoolean(formData.hasSmartHome));
  const [hasSmartAppliances, setHasSmartAppliances] = useState<boolean>(toBoolean(formData.hasSmartAppliances));
  
  const [montantOptions, setMontantOptions] = useState<number>(0);
  
  useEffect(() => {
    // Calculate the costs whenever relevant values change
    const jacuzziCost = hasJacuzzi 
      ? calculateJacuzziCost(jacuzziType, jacuzziSize)
      : 0;
      
    const solarPanelsCost = hasSolarPanels
      ? calculateSolarPanelsCost(hasSolarPanels, solarPanelsArea)
      : 0;
      
    const smartHomeCost = hasSmartHome
      ? calculateHomeAutomationCost(hasSmartHome, Number(formData.surface || 0))
      : 0;
      
    const smartAppliancesCost = hasSmartAppliances
      ? calculateSmartAppliancesCost(hasSmartAppliances)
      : 0;
    
    // Update the total
    setMontantOptions(jacuzziCost + solarPanelsCost + smartHomeCost + smartAppliancesCost);
  }, [hasJacuzzi, jacuzziType, jacuzziSize, hasSolarPanels, solarPanelsArea, hasSmartHome, hasSmartAppliances, formData.surface]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update form data
    updateFormData({
      hasJacuzzi,
      jacuzziType,
      jacuzziSize,
      hasSolarPanels,
      solarPanelsArea,
      hasSmartHome,
      hasSmartAppliances,
      montantOptions
    });
    
    goToNextStep();
  };
  
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-2">Options et équipements spéciaux</h2>
        <p className="text-sm text-gray-500 mb-4">
          Précisez les options et équipements spéciaux que vous souhaitez inclure dans votre projet.
        </p>
        
        <div className="space-y-6">
          {/* Jacuzzi / Spa section */}
          <div className="bg-blue-50/50 p-4 rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="hasJacuzzi" 
                checked={hasJacuzzi} 
                onCheckedChange={(checked) => setHasJacuzzi(checked as boolean)}
              />
              <Label htmlFor="hasJacuzzi" className="font-medium">Jacuzzi / Spa</Label>
            </div>
            
            {hasJacuzzi && (
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jacuzziType">Type de jacuzzi</Label>
                    <Select value={jacuzziType} onValueChange={setJacuzziType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Standard (2 places)</SelectItem>
                        <SelectItem value="standard">Premium (4 places)</SelectItem>
                        <SelectItem value="premium">Luxe (6 places)</SelectItem>
                        <SelectItem value="luxury">Sur mesure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jacuzziSize">Surface approximative (m²)</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="jacuzziSize"
                        value={[jacuzziSize]}
                        min={2}
                        max={10}
                        step={0.5}
                        onValueChange={(values) => setJacuzziSize(values[0])}
                        className="w-full"
                      />
                      <span className="w-10 text-center">{jacuzziSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Solar panels section */}
          <div className="bg-blue-50/50 p-4 rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="hasSolarPanels" 
                checked={hasSolarPanels} 
                onCheckedChange={(checked) => setHasSolarPanels(checked as boolean)}
              />
              <Label htmlFor="hasSolarPanels" className="font-medium">Panneaux solaires</Label>
            </div>
            
            {hasSolarPanels && (
              <div className="ml-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="solarPanelsArea">Surface approximative (m²)</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="solarPanelsArea"
                      value={[solarPanelsArea]}
                      min={5}
                      max={100}
                      step={5}
                      onValueChange={(values) => setSolarPanelsArea(values[0])}
                      className="w-full"
                    />
                    <span className="w-10 text-center">{solarPanelsArea}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Smart home section */}
          <div className="bg-blue-50/50 p-4 rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="hasSmartHome" 
                checked={hasSmartHome} 
                onCheckedChange={(checked) => setHasSmartHome(checked as boolean)}
              />
              <Label htmlFor="hasSmartHome" className="font-medium">Domotique / Maison connectée</Label>
            </div>
            
            {hasSmartHome && (
              <div className="ml-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasSmartAppliances" 
                    checked={hasSmartAppliances} 
                    onCheckedChange={(checked) => setHasSmartAppliances(checked as boolean)}
                  />
                  <Label htmlFor="hasSmartAppliances">Électroménager connecté</Label>
                </div>
              </div>
            )}
          </div>
          
          {/* Summary section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Estimation des options</h3>
            <p className="text-sm text-gray-600 mb-2">
              Coût estimé des options et équipements spéciaux :
            </p>
            <div className="text-xl font-bold text-green-700">{montantOptions.toLocaleString()} €</div>
          </div>
          
          <div className="flex justify-between pt-4">
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
              type="submit"
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OptionsForm;
