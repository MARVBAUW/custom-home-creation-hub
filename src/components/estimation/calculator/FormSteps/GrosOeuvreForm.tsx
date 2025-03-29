
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
import { Building2, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface GrosOeuvreFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const GrosOeuvreForm: React.FC<GrosOeuvreFormProps> = ({ 
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
              <Building2 className="h-5 w-5 text-progineer-gold" />
              <h3 className="text-xl font-semibold">Gros Œuvre</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="foundationType">Type de fondations</Label>
                <Select 
                  value={formData.foundationType || ''} 
                  onValueChange={(value) => updateFormData({ foundationType: value })}
                >
                  <SelectTrigger id="foundationType">
                    <SelectValue placeholder="Sélectionnez le type de fondations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semelle-filante">Semelles filantes</SelectItem>
                    <SelectItem value="radier">Radier</SelectItem>
                    <SelectItem value="pieux">Pieux</SelectItem>
                    <SelectItem value="micro-pieux">Micro-pieux</SelectItem>
                    <SelectItem value="longrines">Longrines</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="soilType">Type de sol</Label>
                <Select 
                  value={formData.soilType || ''} 
                  onValueChange={(value) => updateFormData({ soilType: value })}
                >
                  <SelectTrigger id="soilType">
                    <SelectValue placeholder="Sélectionnez le type de sol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rocheux">Rocheux</SelectItem>
                    <SelectItem value="argileux">Argileux</SelectItem>
                    <SelectItem value="sableux">Sableux</SelectItem>
                    <SelectItem value="remblai">Remblai</SelectItem>
                    <SelectItem value="inconnu">Inconnu (étude à prévoir)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="wallType">Type de murs</Label>
                <Select 
                  value={formData.wallType || ''} 
                  onValueChange={(value) => updateFormData({ wallType: value })}
                >
                  <SelectTrigger id="wallType">
                    <SelectValue placeholder="Sélectionnez le type de murs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parpaing">Parpaings</SelectItem>
                    <SelectItem value="brique">Briques</SelectItem>
                    <SelectItem value="beton-coule">Béton coulé</SelectItem>
                    <SelectItem value="pierre">Pierre</SelectItem>
                    <SelectItem value="bois">Ossature bois</SelectItem>
                    <SelectItem value="beton-cellulaire">Béton cellulaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="wallThickness">Épaisseur des murs (cm)</Label>
                <Input 
                  id="wallThickness" 
                  type="number" 
                  value={formData.wallThickness || ''} 
                  onChange={(e) => updateFormData({ wallThickness: Number(e.target.value) })}
                  placeholder="Ex: 20"
                />
              </div>

              <div>
                <Label>Sous-sol</Label>
                <div className="flex items-center justify-between mt-2">
                  <span>Inclure un sous-sol</span>
                  <Switch 
                    checked={formData.hasBasement || false}
                    onCheckedChange={(checked) => updateFormData({ hasBasement: checked })}
                  />
                </div>
              </div>

              {formData.hasBasement && (
                <div>
                  <Label htmlFor="basementType">Type de sous-sol</Label>
                  <Select 
                    value={formData.basementType || ''} 
                    onValueChange={(value) => updateFormData({ basementType: value })}
                  >
                    <SelectTrigger id="basementType">
                      <SelectValue placeholder="Sélectionnez le type de sous-sol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total">Total</SelectItem>
                      <SelectItem value="partiel">Partiel</SelectItem>
                      <SelectItem value="semi-enterre">Semi-enterré</SelectItem>
                      <SelectItem value="vide-sanitaire">Vide sanitaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Type de plancher</Label>
                <RadioGroup 
                  value={formData.floorType || ''} 
                  onValueChange={(value) => updateFormData({ floorType: value })}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beton" id="beton" />
                    <Label htmlFor="beton" className="cursor-pointer">Dalle béton</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poutrelles" id="poutrelles" />
                    <Label htmlFor="poutrelles" className="cursor-pointer">Poutrelles/hourdis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bois" id="bois" />
                    <Label htmlFor="bois" className="cursor-pointer">Plancher bois</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixte" id="mixte" />
                    <Label htmlFor="mixte" className="cursor-pointer">Mixte</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Contraintes particulières</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="slopedLand" 
                      checked={formData.slopedLand || false}
                      onCheckedChange={(checked) => updateFormData({ slopedLand: checked === true })}
                    />
                    <Label htmlFor="slopedLand" className="text-sm cursor-pointer">Terrain en pente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="difficultAccess" 
                      checked={formData.difficultAccess || false}
                      onCheckedChange={(checked) => updateFormData({ difficultAccess: checked === true })}
                    />
                    <Label htmlFor="difficultAccess" className="text-sm cursor-pointer">Accès difficile au chantier</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="needsDemolition" 
                      checked={formData.needsDemolition || false}
                      onCheckedChange={(checked) => updateFormData({ needsDemolition: checked === true })}
                    />
                    <Label htmlFor="needsDemolition" className="text-sm cursor-pointer">Démolition nécessaire</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="needsWaterManagement" 
                      checked={formData.needsWaterManagement || false}
                      onCheckedChange={(checked) => updateFormData({ needsWaterManagement: checked === true })}
                    />
                    <Label htmlFor="needsWaterManagement" className="text-sm cursor-pointer">Gestion des eaux souterraines</Label>
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

export default GrosOeuvreForm;
