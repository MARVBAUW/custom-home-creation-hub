import React from 'react';
import { ProjectDetailsFormProps } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import AnimatedStepTransition from '@/components/estimation/AnimatedStepTransition';

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({ 
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
                <Building className="h-5 w-5 text-progineer-gold" />
                <h3 className="text-xl font-semibold">Détails du Projet</h3>
              </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="projectType">Type de projet</Label>
                <Select 
                  value={formData.projectType || ''} 
                  onValueChange={(value) => updateFormData({ projectType: value })}
                >
                  <SelectTrigger id="projectType">
                    <SelectValue placeholder="Sélectionnez le type de projet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Construction maison individuelle">Construction maison individuelle</SelectItem>
                    <SelectItem value="Extension maison">Extension maison</SelectItem>
                    <SelectItem value="Rénovation lourde">Rénovation lourde</SelectItem>
                    <SelectItem value="Rénovation légère">Rénovation légère</SelectItem>
                    <SelectItem value="Réaménagement intérieur">Réaménagement intérieur</SelectItem>
                    <SelectItem value="Construction immeuble">Construction immeuble</SelectItem>
                    <SelectItem value="Construction locale commercial">Construction local commercial</SelectItem>
                    <SelectItem value="Rénovation local commercial">Rénovation local commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="surface">Surface totale (m²)</Label>
                <Input 
                  id="surface" 
                  type="number" 
                  value={formData.surface || ''} 
                  onChange={(e) => updateFormData({ surface: Number(e.target.value) })}
                  placeholder="Ex: 120"
                />
              </div>

              <div>
                <Label htmlFor="levels">Nombre de niveaux</Label>
                <Select 
                  value={formData.levels?.toString() || ''} 
                  onValueChange={(value) => updateFormData({ levels: Number(value) })}
                >
                  <SelectTrigger id="levels">
                    <SelectValue placeholder="Sélectionnez le nombre de niveaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Plain-pied</SelectItem>
                    <SelectItem value="2">2 - R+1</SelectItem>
                    <SelectItem value="3">3 - R+2</SelectItem>
                    <SelectItem value="4">4 - R+3 ou plus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">Ville du projet</Label>
                <Input 
                  id="city" 
                  type="text" 
                  value={formData.city || ''} 
                  onChange={(e) => updateFormData({ city: e.target.value })}
                  placeholder="Ex: Aix-en-Provence"
                />
              </div>

              <div>
                <Label htmlFor="finishLevel">Niveau de finition</Label>
                <Select 
                  value={formData.finishLevel || ''} 
                  onValueChange={(value) => updateFormData({ finishLevel: value })}
                >
                  <SelectTrigger id="finishLevel">
                    <SelectValue placeholder="Sélectionnez le niveau de finition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basique">Basique - Premier prix</SelectItem>
                    <SelectItem value="Standard">Standard - Milieu de gamme</SelectItem>
                    <SelectItem value="Premium">Premium - Haut de gamme</SelectItem>
                    <SelectItem value="Luxe">Luxe - Très haut de gamme</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Type de construction</Label>
                <RadioGroup 
                  value={formData.constructionType || ''} 
                  onValueChange={(value) => updateFormData({ constructionType: value })}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="traditional" id="traditional" />
                    <Label htmlFor="traditional" className="cursor-pointer">Traditionnelle (parpaings, briques)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wooden" id="wooden" />
                    <Label htmlFor="wooden" className="cursor-pointer">Ossature bois</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="modern" id="modern" />
                    <Label htmlFor="modern" className="cursor-pointer">Contemporaine (béton, acier, verre)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ecological" id="ecological" />
                    <Label htmlFor="ecological" className="cursor-pointer">Écologique (matériaux bio-sourcés)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="constructionMode">Mode de construction</Label>
                <Select 
                  value={formData.constructionMode || ''} 
                  onValueChange={(value) => updateFormData({ constructionMode: value })}
                >
                  <SelectTrigger id="constructionMode">
                    <SelectValue placeholder="Sélectionnez le mode de construction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Auto-construction</SelectItem>
                    <SelectItem value="artisans">Artisans indépendants</SelectItem>
                    <SelectItem value="general-contractor">Entreprise générale</SelectItem>
                    <SelectItem value="turnkey">Clé en main</SelectItem>
                  </SelectContent>
                </Select>
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

export default ProjectDetailsForm;
