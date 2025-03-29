
import React from 'react';
import { TerrainFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';

const TerrainForm: React.FC<TerrainFormProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <AnimatedStepTransition direction={animationDirection}>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-progineer-gold" />
                <h3 className="text-xl font-semibold">Terrain</h3>
              </div>

              <div>
                <Label htmlFor="terrainSurface">Surface du terrain (m²)</Label>
                <Input 
                  id="terrainSurface" 
                  type="number" 
                  value={formData.terrainSurface || ''} 
                  onChange={(e) => updateFormData({ terrainSurface: Number(e.target.value) })}
                  placeholder="Ex: 500"
                />
              </div>

              <div>
                <Label htmlFor="landPrice">Prix du terrain (€)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="landPrice" 
                    type="number" 
                    value={formData.landPrice || ''} 
                    onChange={(e) => updateFormData({ landPrice: Number(e.target.value) })}
                    placeholder="Ex: 100000"
                  />
                  <div className="text-xs text-gray-500 italic mt-1">
                    Optionnel, pour calculer le coût total avec terrain
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="terrainType">Type de terrain</Label>
                <Select 
                  value={formData.terrainType || ''} 
                  onValueChange={(value) => updateFormData({ terrainType: value })}
                >
                  <SelectTrigger id="terrainType">
                    <SelectValue placeholder="Sélectionnez le type de terrain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plat">Plat</SelectItem>
                    <SelectItem value="pentu">En pente</SelectItem>
                    <SelectItem value="tres-pentu">Très pentu</SelectItem>
                    <SelectItem value="irregulier">Irrégulier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="terrainAccess">Accès au terrain</Label>
                <Select 
                  value={formData.terrainAccess || ''} 
                  onValueChange={(value) => updateFormData({ terrainAccess: value })}
                >
                  <SelectTrigger id="terrainAccess">
                    <SelectValue placeholder="Sélectionnez le type d'accès" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facile">Facile</SelectItem>
                    <SelectItem value="moyen">Moyen</SelectItem>
                    <SelectItem value="difficile">Difficile</SelectItem>
                    <SelectItem value="tres-difficile">Très difficile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Viabilisation</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="waterConnection" 
                      checked={formData.waterConnection || false}
                      onCheckedChange={(checked) => updateFormData({ waterConnection: checked === true })}
                    />
                    <Label htmlFor="waterConnection" className="text-sm cursor-pointer">Raccordement eau</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="electricityConnection" 
                      checked={formData.electricityConnection || false}
                      onCheckedChange={(checked) => updateFormData({ electricityConnection: checked === true })}
                    />
                    <Label htmlFor="electricityConnection" className="text-sm cursor-pointer">Raccordement électricité</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="gasConnection" 
                      checked={formData.gasConnection || false}
                      onCheckedChange={(checked) => updateFormData({ gasConnection: checked === true })}
                    />
                    <Label htmlFor="gasConnection" className="text-sm cursor-pointer">Raccordement gaz</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sewerConnection" 
                      checked={formData.sewerConnection || false}
                      onCheckedChange={(checked) => updateFormData({ sewerConnection: checked === true })}
                    />
                    <Label htmlFor="sewerConnection" className="text-sm cursor-pointer">Raccordement tout-à-l'égout</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fiberConnection" 
                      checked={formData.fiberConnection || false}
                      onCheckedChange={(checked) => updateFormData({ fiberConnection: checked === true })}
                    />
                    <Label htmlFor="fiberConnection" className="text-sm cursor-pointer">Raccordement fibre/télécom</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="needsSepticTank" 
                      checked={formData.needsSepticTank || false}
                      onCheckedChange={(checked) => updateFormData({ needsSepticTank: checked === true })}
                    />
                    <Label htmlFor="needsSepticTank" className="text-sm cursor-pointer">Fosse septique nécessaire</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label>Contraintes particulières</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="floodRisk" 
                      checked={formData.floodRisk || false}
                      onCheckedChange={(checked) => updateFormData({ floodRisk: checked === true })}
                    />
                    <Label htmlFor="floodRisk" className="text-sm cursor-pointer">Zone inondable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="claySoil" 
                      checked={formData.claySoil || false}
                      onCheckedChange={(checked) => updateFormData({ claySoil: checked === true })}
                    />
                    <Label htmlFor="claySoil" className="text-sm cursor-pointer">Sol argileux</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rockySoil" 
                      checked={formData.rockySoil || false}
                      onCheckedChange={(checked) => updateFormData({ rockySoil: checked === true })}
                    />
                    <Label htmlFor="rockySoil" className="text-sm cursor-pointer">Sol rocheux</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wetlandZone" 
                      checked={formData.wetlandZone || false}
                      onCheckedChange={(checked) => updateFormData({ wetlandZone: checked === true })}
                    />
                    <Label htmlFor="wetlandZone" className="text-sm cursor-pointer">Zone humide</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="heritageZone" 
                      checked={formData.heritageZone || false}
                      onCheckedChange={(checked) => updateFormData({ heritageZone: checked === true })}
                    />
                    <Label htmlFor="heritageZone" className="text-sm cursor-pointer">Zone patrimoniale/protégée</Label>
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
    </AnimatedStepTransition>
  );
};

export default TerrainForm;
