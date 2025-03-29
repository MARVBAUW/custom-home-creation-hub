
import React from 'react';
import { FormData } from '../types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Trees, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface AmenagementExtFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const AmenagementExtForm: React.FC<AmenagementExtFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Trees className="h-5 w-5 text-progineer-gold" />
              <h3 className="text-xl font-semibold">Aménagements Extérieurs</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="gardenArea">Surface du jardin (m²)</Label>
                <Input 
                  id="gardenArea" 
                  type="number" 
                  value={formData.gardenArea || ''} 
                  onChange={(e) => updateFormData({ gardenArea: Number(e.target.value) })}
                  placeholder="Ex: 200"
                />
              </div>

              <div>
                <Label>Aménagements extérieurs souhaités</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terrace" 
                      checked={formData.terrace || false}
                      onCheckedChange={(checked) => updateFormData({ terrace: checked === true })}
                    />
                    <Label htmlFor="terrace" className="text-sm cursor-pointer">Terrasse</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="swimmingPool" 
                      checked={formData.swimmingPool || false}
                      onCheckedChange={(checked) => updateFormData({ swimmingPool: checked === true })}
                    />
                    <Label htmlFor="swimmingPool" className="text-sm cursor-pointer">Piscine</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="garage" 
                      checked={formData.garage || false}
                      onCheckedChange={(checked) => updateFormData({ garage: checked === true })}
                    />
                    <Label htmlFor="garage" className="text-sm cursor-pointer">Garage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="carport" 
                      checked={formData.carport || false}
                      onCheckedChange={(checked) => updateFormData({ carport: checked === true })}
                    />
                    <Label htmlFor="carport" className="text-sm cursor-pointer">Carport</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="driveway" 
                      checked={formData.driveway || false}
                      onCheckedChange={(checked) => updateFormData({ driveway: checked === true })}
                    />
                    <Label htmlFor="driveway" className="text-sm cursor-pointer">Allée</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fence" 
                      checked={formData.fence || false}
                      onCheckedChange={(checked) => updateFormData({ fence: checked === true })}
                    />
                    <Label htmlFor="fence" className="text-sm cursor-pointer">Clôture</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="gate" 
                      checked={formData.gate || false}
                      onCheckedChange={(checked) => updateFormData({ gate: checked === true })}
                    />
                    <Label htmlFor="gate" className="text-sm cursor-pointer">Portail</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="garden" 
                      checked={formData.garden || false}
                      onCheckedChange={(checked) => updateFormData({ garden: checked === true })}
                    />
                    <Label htmlFor="garden" className="text-sm cursor-pointer">Jardin paysager</Label>
                  </div>
                </div>
              </div>

              {formData.terrace && (
                <div>
                  <Label htmlFor="terraceType">Type de terrasse</Label>
                  <Select 
                    value={formData.terraceType || ''} 
                    onValueChange={(value) => updateFormData({ terraceType: value })}
                  >
                    <SelectTrigger id="terraceType">
                      <SelectValue placeholder="Sélectionnez le type de terrasse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bois">Bois</SelectItem>
                      <SelectItem value="composite">Composite</SelectItem>
                      <SelectItem value="carrelage">Carrelage</SelectItem>
                      <SelectItem value="pierre">Pierre naturelle</SelectItem>
                      <SelectItem value="beton">Béton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.terrace && (
                <div>
                  <Label htmlFor="terraceArea">Surface de la terrasse (m²)</Label>
                  <Input 
                    id="terraceArea" 
                    type="number" 
                    value={formData.terraceArea || ''} 
                    onChange={(e) => updateFormData({ terraceArea: Number(e.target.value) })}
                    placeholder="Ex: 20"
                  />
                </div>
              )}

              {formData.swimmingPool && (
                <div>
                  <Label htmlFor="poolType">Type de piscine</Label>
                  <Select 
                    value={formData.poolType || ''} 
                    onValueChange={(value) => updateFormData({ poolType: value })}
                  >
                    <SelectTrigger id="poolType">
                      <SelectValue placeholder="Sélectionnez le type de piscine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditionnelle">Traditionnelle (béton)</SelectItem>
                      <SelectItem value="coque">Coque polyester</SelectItem>
                      <SelectItem value="kit">Kit à monter</SelectItem>
                      <SelectItem value="semi-enterree">Semi-enterrée</SelectItem>
                      <SelectItem value="hors-sol">Hors-sol</SelectItem>
                      <SelectItem value="naturelle">Naturelle / Biologique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.garage && (
                <div>
                  <Label htmlFor="garageSize">Taille du garage</Label>
                  <Select 
                    value={formData.garageSize || ''} 
                    onValueChange={(value) => updateFormData({ garageSize: value })}
                  >
                    <SelectTrigger id="garageSize">
                      <SelectValue placeholder="Sélectionnez la taille du garage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-vehicule">1 véhicule</SelectItem>
                      <SelectItem value="2-vehicules">2 véhicules</SelectItem>
                      <SelectItem value="3-vehicules-plus">3 véhicules ou plus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Autres équipements</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="outdoorLighting" 
                      checked={formData.outdoorLighting || false}
                      onCheckedChange={(checked) => updateFormData({ outdoorLighting: checked === true })}
                    />
                    <Label htmlFor="outdoorLighting" className="text-sm cursor-pointer">Éclairage extérieur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="irrigation" 
                      checked={formData.irrigation || false}
                      onCheckedChange={(checked) => updateFormData({ irrigation: checked === true })}
                    />
                    <Label htmlFor="irrigation" className="text-sm cursor-pointer">Système d'irrigation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="outdoorKitchen" 
                      checked={formData.outdoorKitchen || false}
                      onCheckedChange={(checked) => updateFormData({ outdoorKitchen: checked === true })}
                    />
                    <Label htmlFor="outdoorKitchen" className="text-sm cursor-pointer">Cuisine extérieure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pergola" 
                      checked={formData.pergola || false}
                      onCheckedChange={(checked) => updateFormData({ pergola: checked === true })}
                    />
                    <Label htmlFor="pergola" className="text-sm cursor-pointer">Pergola</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Précédent
        </Button>
        <Button
          type="submit"
          className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
        >
          Suivant
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default AmenagementExtForm;
