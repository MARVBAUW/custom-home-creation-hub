import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { calculatePaintingCost } from '../utils/montantUtils';
import { ensureNumber } from '../utils/typeConversions';
import { Palette, Brush, ImageIcon, CheckCircle } from 'lucide-react';

const PeintureForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [surface, setSurface] = useState<string>(
    formData.paintingSurface ? String(formData.paintingSurface) : ''
  );
  
  const [paintingOptions, setPaintingOptions] = useState({
    basicPaint: ensureNumber(formData.basicPaintSurface, 0),
    decorativePaint: ensureNumber(formData.decorativePaintSurface, 0),
    wallpaper: ensureNumber(formData.wallpaperSurface, 0),
    woodPaneling: ensureNumber(formData.woodPanelingSurface, 0),
    stoneCladding: ensureNumber(formData.stoneCladingSurface, 0)
  });

  const handleSubmit = () => {
    // Calculate costs for each option
    const basicPaintCost = calculatePaintingCost(25, paintingOptions.basicPaint); // 25€ per m²
    const decorativePaintCost = calculatePaintingCost(40, paintingOptions.decorativePaint); // 40€ per m²
    const wallpaperCost = calculatePaintingCost(35, paintingOptions.wallpaper); // 35€ per m²
    const woodPanelingCost = calculatePaintingCost(65, paintingOptions.woodPaneling); // 65€ per m²
    const stoneCladingCost = calculatePaintingCost(90, paintingOptions.stoneCladding); // 90€ per m²
    
    // Total painting cost
    const totalPaintingCost = basicPaintCost + decorativePaintCost + wallpaperCost + woodPanelingCost + stoneCladingCost;
    
    // Update form data
    updateFormData({
      paintingSurface: ensureNumber(surface),
      basicPaintSurface: paintingOptions.basicPaint,
      decorativePaintSurface: paintingOptions.decorativePaint,
      wallpaperSurface: paintingOptions.wallpaper,
      woodPanelingSurface: paintingOptions.woodPaneling,
      stoneCladingSurface: paintingOptions.stoneCladding,
      paintingTotalCost: totalPaintingCost,
      montantT: ensureNumber(formData.montantT) + totalPaintingCost
    });
    
    goToNextStep();
  };

  // JSX for the form UI
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Peinture et revêtements muraux</h3>
        
        <div>
          <Label className="mb-2 block">Surface totale à peindre (m²)</Label>
          <Input
            type="number"
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            placeholder="Surface en m²"
          />
        </div>
        
        <div className="space-y-4">
          <Label className="mb-2 block">Répartition des surfaces par type de revêtement</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm">
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-blue-500" />
                  <Label>Peinture de base</Label>
                </div>
                <Input
                  type="number"
                  value={paintingOptions.basicPaint}
                  onChange={(e) => setPaintingOptions({...paintingOptions, basicPaint: ensureNumber(e.target.value)})}
                  placeholder="Surface en m²"
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Brush className="h-4 w-4 text-blue-500" />
                  <Label>Peinture décorative</Label>
                </div>
                <Input
                  type="number"
                  value={paintingOptions.decorativePaint}
                  onChange={(e) => setPaintingOptions({...paintingOptions, decorativePaint: ensureNumber(e.target.value)})}
                  placeholder="Surface en m²"
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                  <Label>Papier peint</Label>
                </div>
                <Input
                  type="number"
                  value={paintingOptions.wallpaper}
                  onChange={(e) => setPaintingOptions({...paintingOptions, wallpaper: ensureNumber(e.target.value)})}
                  placeholder="Surface en m²"
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                  <Label>Lambris bois</Label>
                </div>
                <Input
                  type="number"
                  value={paintingOptions.woodPaneling}
                  onChange={(e) => setPaintingOptions({...paintingOptions, woodPaneling: ensureNumber(e.target.value)})}
                  placeholder="Surface en m²"
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                  <Label>Parement pierre</Label>
                </div>
                <Input
                  type="number"
                  value={paintingOptions.stoneCladding}
                  onChange={(e) => setPaintingOptions({...paintingOptions, stoneCladding: ensureNumber(e.target.value)})}
                  placeholder="Surface en m²"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
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

export default PeintureForm;
