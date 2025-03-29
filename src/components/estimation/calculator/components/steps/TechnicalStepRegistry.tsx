
import React from 'react';
import { StepComponentRegistry } from './StepComponents';
import { FormData } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Zap, Droplet, Thermometer } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Composant pour l'étape électricité
const ElectriciteForm = ({ 
  formData, 
  updateFormData, 
  goToPreviousStep,
  goToNextStep
}: {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}) => {
  const handleSubmit = (electricalType: string) => {
    updateFormData({ electricalType });
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Électricité</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue={formData.electricalType || ''} className="space-y-4">
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="basic" id="basic" onClick={() => handleSubmit('basic')} />
            <Label htmlFor="basic" className="flex flex-1 items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-blue-500" />
                <span>Prestation de base</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="standard" id="standard" onClick={() => handleSubmit('standard')} />
            <Label htmlFor="standard" className="flex flex-1 items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-amber-500" />
                <span>Prestations avancées</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="premium" id="premium" onClick={() => handleSubmit('premium')} />
            <Label htmlFor="premium" className="flex flex-1 items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-purple-500" />
                <span>Prestations haut de gamme</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="smart_home" id="smart_home" onClick={() => handleSubmit('smart_home')} />
            <Label htmlFor="smart_home" className="flex flex-1 items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-green-500" />
                <span>Prestations HG + Domotique</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="non_concerne" id="non_concerne" onClick={() => handleSubmit('non_concerne')} />
            <Label htmlFor="non_concerne" className="flex flex-1 items-center cursor-pointer">
              <span>Non concerné</span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={goToPreviousStep}>Précédent</Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour l'étape plomberie
const PlomberieForm = ({
  formData,
  updateFormData,
  goToPreviousStep,
  goToNextStep
}: {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}) => {
  const handleSubmit = (plumbingType: string) => {
    updateFormData({ plumbingType });
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plomberie</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue={formData.plumbingType || ''} className="space-y-4">
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="basic" id="basic-plumb" onClick={() => handleSubmit('basic')} />
            <Label htmlFor="basic-plumb" className="flex flex-1 items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                <span>Prestations de base</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="standard" id="standard-plumb" onClick={() => handleSubmit('standard')} />
            <Label htmlFor="standard-plumb" className="flex flex-1 items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-amber-500" />
                <span>Prestations avancées</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="premium" id="premium-plumb" onClick={() => handleSubmit('premium')} />
            <Label htmlFor="premium-plumb" className="flex flex-1 items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-purple-500" />
                <span>Prestations haut de gamme</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value="non_concerne" id="non_concerne-plumb" onClick={() => handleSubmit('non_concerne')} />
            <Label htmlFor="non_concerne-plumb" className="flex flex-1 items-center cursor-pointer">
              <span>Non concerné</span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={goToPreviousStep}>Précédent</Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour l'étape chauffage
const ChauffageForm = ({
  formData,
  updateFormData,
  goToPreviousStep,
  goToNextStep
}: {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}) => {
  const handleSubmit = (options: { heatingType: string, hasAirConditioning?: boolean }) => {
    updateFormData(options);
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chauffage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Choisissez votre système de chauffage</Label>
          <RadioGroup defaultValue={formData.heatingType || ''} className="space-y-4">
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="standard" id="standard-heat" 
                onClick={() => handleSubmit({ heatingType: 'standard' })} />
              <Label htmlFor="standard-heat" className="flex flex-1 items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-amber-500" />
                  <span>Meilleur rapport qualité prix</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="eco" id="eco-heat" 
                onClick={() => handleSubmit({ heatingType: 'eco' })} />
              <Label htmlFor="eco-heat" className="flex flex-1 items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-green-500" />
                  <span>Le plus écologique</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="economic" id="economic-heat" 
                onClick={() => handleSubmit({ heatingType: 'economic' })} />
              <Label htmlFor="economic-heat" className="flex flex-1 items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Le plus économique</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="sans_avis" id="sans_avis" 
                onClick={() => handleSubmit({ heatingType: 'standard' })} />
              <Label htmlFor="sans_avis" className="flex flex-1 items-center cursor-pointer">
                <span>Sans avis</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="non_concerne" id="non_concerne-heat" 
                onClick={() => handleSubmit({ heatingType: 'non_concerne' })} />
              <Label htmlFor="non_concerne-heat" className="flex flex-1 items-center cursor-pointer">
                <span>Non concerné</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">Climatisation Rénovation / Création</Label>
          <RadioGroup defaultValue={formData.hasAirConditioning ? 'yes' : 'no'} className="space-y-4">
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="no" id="clim-no" 
                onClick={() => handleSubmit({ heatingType: formData.heatingType || 'standard', hasAirConditioning: false })} />
              <Label htmlFor="clim-no" className="cursor-pointer">Non</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="yes" id="clim-yes" 
                onClick={() => handleSubmit({ heatingType: formData.heatingType || 'standard', hasAirConditioning: true })} />
              <Label htmlFor="clim-yes" className="cursor-pointer">Oui</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="sans_avis_clim" id="sans_avis_clim" 
                onClick={() => handleSubmit({ heatingType: formData.heatingType || 'standard', hasAirConditioning: false })} />
              <Label htmlFor="sans_avis_clim" className="cursor-pointer">Sans avis</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="non_concerne_clim" id="non_concerne_clim" 
                onClick={() => handleSubmit({ heatingType: formData.heatingType || 'standard', hasAirConditioning: false })} />
              <Label htmlFor="non_concerne_clim" className="cursor-pointer">Non concerné</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={goToPreviousStep}>Précédent</Button>
      </CardFooter>
    </Card>
  );
};

// Fonction de création du registre des étapes techniques
// Assurons-nous qu'elle reçoit bien le paramètre goToNextStep
export const createTechnicalStepRegistry = (
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void,
  goToPreviousStep: () => void,
  goToNextStep: () => void
): StepComponentRegistry => {
  return {
    14: ({ animationDirection }) => (
      <ElectriciteForm
        formData={formData}
        updateFormData={updateFormData}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
      />
    ),
    15: ({ animationDirection }) => (
      <PlomberieForm
        formData={formData}
        updateFormData={updateFormData}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
      />
    ),
    16: ({ animationDirection }) => (
      <ChauffageForm
        formData={formData}
        updateFormData={updateFormData}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
      />
    ),
  };
};
