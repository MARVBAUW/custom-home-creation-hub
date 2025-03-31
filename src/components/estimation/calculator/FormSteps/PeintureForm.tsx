
import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ensureNumber } from '../utils/typeConversions';
import { calculatePaintingCost } from '../utils/montantUtils';
import { Paintbrush, Wallpaper, Construction, TreePine, Mountain } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationCircle } from 'lucide-react';

const PeintureForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Initialize state for each wall covering type percentage
  const [basicPaintPercentage, setBasicPaintPercentage] = useState<number>(
    formData.basicPaintPercentage ? Number(formData.basicPaintPercentage) : 60
  );

  const [decorativePaintPercentage, setDecorativePaintPercentage] = useState<number>(
    formData.decorativePaintPercentage ? Number(formData.decorativePaintPercentage) : 20
  );

  const [wallpaperPercentage, setWallpaperPercentage] = useState<number>(
    formData.wallpaperPercentage ? Number(formData.wallpaperPercentage) : 10
  );

  const [woodPanelingPercentage, setWoodPanelingPercentage] = useState<number>(
    formData.woodPanelingPercentage ? Number(formData.woodPanelingPercentage) : 5
  );

  const [stonePanelingPercentage, setStonePanelingPercentage] = useState<number>(
    formData.stonePanelingPercentage ? Number(formData.stonePanelingPercentage) : 5
  );

  // Calculate the total percentage
  const totalPercentage = basicPaintPercentage + decorativePaintPercentage + 
                         wallpaperPercentage + woodPanelingPercentage + stonePanelingPercentage;
  
  // Determine if the form is valid for submission
  const isValid = totalPercentage === 100;

  // Handle form submission
  const handleSubmit = () => {
    if (!isValid) {
      return; // Prevent submission if percentages don't add up to 100%
    }

    // Calculate wall coverings costs based on surface and percentages
    const surface = ensureNumber(formData.surface, 0);
    
    // Calculate total painting cost using the utility function
    const totalWallCoveringsCost = calculatePaintingCost(
      {
        basicPaint: basicPaintPercentage,
        decorativePaint: decorativePaintPercentage,
        wallpaper: wallpaperPercentage,
        woodPaneling: woodPanelingPercentage,
        stoneCladding: stonePanelingPercentage
      },
      surface
    );

    // Update form data with paint options and cost
    updateFormData({
      basicPaintPercentage,
      decorativePaintPercentage,
      wallpaperPercentage,
      woodPanelingPercentage,
      stonePanelingPercentage,
      montantT: (formData.montantT || 0) + totalWallCoveringsCost
    });
    
    // Move to the next step
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Peinture & Revêtements Muraux</h3>
        
        <div className="mb-8">
          <Label className="mb-2 block text-base font-medium">Répartition des Surfaces Murales (%)</Label>
          <p className="text-sm text-gray-500 mb-4">
            Indiquez le pourcentage de chaque type de revêtement mural. Le total doit être égal à 100%.
          </p>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card className={`transition-all ${basicPaintPercentage > 0 ? 'border-blue-500 bg-blue-50' : ''}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center mb-3">
                  <Paintbrush className="h-5 w-5 text-blue-500 mr-2" />
                  <Label className="font-medium">Peinture Base</Label>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Pourcentage</span>
                  <span className="text-sm font-medium">{basicPaintPercentage}%</span>
                </div>
                <Slider
                  value={[basicPaintPercentage]}
                  max={100}
                  step={5}
                  onValueChange={(value) => {
                    const newValue = value[0];
                    setBasicPaintPercentage(newValue);
                    
                    // Adjust other percentages to maintain 100% total
                    const otherTotal = decorativePaintPercentage + wallpaperPercentage + 
                                      woodPanelingPercentage + stonePanelingPercentage;
                    
                    if (otherTotal > 0) {
                      const remaining = 100 - newValue;
                      const ratio = remaining / otherTotal;
                      
                      setDecorativePaintPercentage(Math.round(decorativePaintPercentage * ratio));
                      setWallpaperPercentage(Math.round(wallpaperPercentage * ratio));
                      setWoodPanelingPercentage(Math.round(woodPanelingPercentage * ratio));
                      setStonePanelingPercentage(Math.round(stonePanelingPercentage * ratio));
                    }
                  }}
                />
              </CardContent>
            </Card>

            <Card className={`transition-all ${decorativePaintPercentage > 0 ? 'border-blue-500 bg-blue-50' : ''}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center mb-3">
                  <Paintbrush className="h-5 w-5 text-indigo-500 mr-2" />
                  <Label className="font-medium">Peinture Décorative</Label>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Pourcentage</span>
                  <span className="text-sm font-medium">{decorativePaintPercentage}%</span>
                </div>
                <Slider
                  value={[decorativePaintPercentage]}
                  max={100}
                  step={5}
                  onValueChange={(value) => {
                    const newValue = value[0];
                    setDecorativePaintPercentage(newValue);
                    
                    // Adjust other percentages to maintain 100% total
                    const otherPercentages = [
                      { value: basicPaintPercentage, setter: setBasicPaintPercentage },
                      { value: wallpaperPercentage, setter: setWallpaperPercentage },
                      { value: woodPanelingPercentage, setter: setWoodPanelingPercentage },
                      { value: stonePanelingPercentage, setter: setStonePanelingPercentage }
                    ];
                    
                    const otherTotal = otherPercentages.reduce((sum, item) => sum + item.value, 0);
                    if (otherTotal > 0) {
                      const remaining = 100 - newValue;
                      const ratio = remaining / otherTotal;
                      
                      otherPercentages.forEach(item => {
                        item.setter(Math.round(item.value * ratio));
                      });
                    }
                  }}
                />
              </CardContent>
            </Card>

            <Card className={`transition-all ${wallpaperPercentage > 0 ? 'border-blue-500 bg-blue-50' : ''}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center mb-3">
                  <Wallpaper className="h-5 w-5 text-amber-500 mr-2" />
                  <Label className="font-medium">Papier Peint</Label>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Pourcentage</span>
                  <span className="text-sm font-medium">{wallpaperPercentage}%</span>
                </div>
                <Slider
                  value={[wallpaperPercentage]}
                  max={100}
                  step={5}
                  onValueChange={(value) => {
                    const newValue = value[0];
                    setWallpaperPercentage(newValue);
                    
                    // Adjust other percentages to maintain 100% total
                    const otherPercentages = [
                      { value: basicPaintPercentage, setter: setBasicPaintPercentage },
                      { value: decorativePaintPercentage, setter: setDecorativePaintPercentage },
                      { value: woodPanelingPercentage, setter: setWoodPanelingPercentage },
                      { value: stonePanelingPercentage, setter: setStonePanelingPercentage }
                    ];
                    
                    const otherTotal = otherPercentages.reduce((sum, item) => sum + item.value, 0);
                    if (otherTotal > 0) {
                      const remaining = 100 - newValue;
                      const ratio = remaining / otherTotal;
                      
                      otherPercentages.forEach(item => {
                        item.setter(Math.round(item.value * ratio));
                      });
                    }
                  }}
                />
              </CardContent>
            </Card>

            <Card className={`transition-all ${woodPanelingPercentage > 0 ? 'border-blue-500 bg-blue-50' : ''}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center mb-3">
                  <TreePine className="h-5 w-5 text-emerald-600 mr-2" />
                  <Label className="font-medium">Revêtement Mural Bois Ajouré</Label>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Pourcentage</span>
                  <span className="text-sm font-medium">{woodPanelingPercentage}%</span>
                </div>
                <Slider
                  value={[woodPanelingPercentage]}
                  max={100}
                  step={5}
                  onValueChange={(value) => {
                    const newValue = value[0];
                    setWoodPanelingPercentage(newValue);
                    
                    // Adjust other percentages to maintain 100% total
                    const otherPercentages = [
                      { value: basicPaintPercentage, setter: setBasicPaintPercentage },
                      { value: decorativePaintPercentage, setter: setDecorativePaintPercentage },
                      { value: wallpaperPercentage, setter: setWallpaperPercentage },
                      { value: stonePanelingPercentage, setter: setStonePanelingPercentage }
                    ];
                    
                    const otherTotal = otherPercentages.reduce((sum, item) => sum + item.value, 0);
                    if (otherTotal > 0) {
                      const remaining = 100 - newValue;
                      const ratio = remaining / otherTotal;
                      
                      otherPercentages.forEach(item => {
                        item.setter(Math.round(item.value * ratio));
                      });
                    }
                  }}
                />
              </CardContent>
            </Card>

            <Card className={`transition-all ${stonePanelingPercentage > 0 ? 'border-blue-500 bg-blue-50' : ''}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center mb-3">
                  <Mountain className="h-5 w-5 text-stone-600 mr-2" />
                  <Label className="font-medium">Revêtement Mural Type Pierre Naturelle</Label>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Pourcentage</span>
                  <span className="text-sm font-medium">{stonePanelingPercentage}%</span>
                </div>
                <Slider
                  value={[stonePanelingPercentage]}
                  max={100}
                  step={5}
                  onValueChange={(value) => {
                    const newValue = value[0];
                    setStonePanelingPercentage(newValue);
                    
                    // Adjust other percentages to maintain 100% total
                    const otherPercentages = [
                      { value: basicPaintPercentage, setter: setBasicPaintPercentage },
                      { value: decorativePaintPercentage, setter: setDecorativePaintPercentage },
                      { value: wallpaperPercentage, setter: setWallpaperPercentage },
                      { value: woodPanelingPercentage, setter: setWoodPanelingPercentage }
                    ];
                    
                    const otherTotal = otherPercentages.reduce((sum, item) => sum + item.value, 0);
                    if (otherTotal > 0) {
                      const remaining = 100 - newValue;
                      const ratio = remaining / otherTotal;
                      
                      otherPercentages.forEach(item => {
                        item.setter(Math.round(item.value * ratio));
                      });
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Total percentage indicator */}
        <div className="mb-6">
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
        
        {/* Error indicator if total is not 100% */}
        {totalPercentage !== 100 && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {totalPercentage > 100 
                ? "La somme des surfaces de revêtements muraux ne peut pas être supérieure à 100%"
                : "La somme des surfaces de revêtements muraux doit être égal à 100%"}
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

export default PeintureForm;
