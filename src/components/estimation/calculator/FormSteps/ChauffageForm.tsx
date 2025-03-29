
import React, { useState } from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThermometerSun, Leaf, Coins, HelpCircle, Snowflake, Ban } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

const ChauffageForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  // Initialize state with the default value or the current formData value
  const [heatingType, setHeatingType] = useState<string>(
    defaultValues?.heatingType || formData.heatingType || 'standard'
  );
  
  const [hasAirConditioning, setHasAirConditioning] = useState<boolean>(
    defaultValues?.hasAirConditioning || formData.hasAirConditioning || false
  );

  const handleSubmit = () => {
    // Create the data object to pass to the submit handler
    const data = { heatingType, hasAirConditioning };
    
    // Use the provided onSubmit handler or fall back to default behavior
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData({ heatingType, hasAirConditioning });
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Type de chauffage</h2>
        <p className="text-muted-foreground">Sélectionnez votre préférence pour le système de chauffage.</p>
        
        <RadioGroup value={heatingType} onValueChange={setHeatingType} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'standard' ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <ThermometerSun className="h-12 w-12 text-blue-500 mb-4" />
              <div className="space-x-2">
                <RadioGroupItem value="standard" id="heating-standard" />
                <Label htmlFor="heating-standard">Meilleur rapport qualité prix</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Système équilibré entre coût et performance</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'eco' ? 'border-green-500 bg-green-50' : ''}`}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Leaf className="h-12 w-12 text-green-500 mb-4" />
              <div className="space-x-2">
                <RadioGroupItem value="eco" id="heating-eco" />
                <Label htmlFor="heating-eco">Le plus écologique</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Système respectueux de l'environnement</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'economic' ? 'border-yellow-500 bg-yellow-50' : ''}`}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Coins className="h-12 w-12 text-yellow-500 mb-4" />
              <div className="space-x-2">
                <RadioGroupItem value="economic" id="heating-economic" />
                <Label htmlFor="heating-economic">Le plus économique</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Option économique pour minimiser les coûts</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'no_preference' ? 'border-gray-500 bg-gray-50' : ''}`}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <HelpCircle className="h-12 w-12 text-gray-500 mb-4" />
              <div className="space-x-2">
                <RadioGroupItem value="no_preference" id="heating-no-preference" />
                <Label htmlFor="heating-no-preference">Sans avis</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Recommandation par défaut selon votre projet</p>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all hover:shadow-md ${heatingType === 'non_concerne' ? 'border-gray-500 bg-gray-50' : ''}`}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Ban className="h-12 w-12 text-gray-500 mb-4" />
              <div className="space-x-2">
                <RadioGroupItem value="non_concerne" id="heating-non-concerne" />
                <Label htmlFor="heating-non-concerne">Non concerné</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Pas de travaux de chauffage nécessaires</p>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4">Climatisation</h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="air-conditioning">Souhaitez-vous installer la climatisation ?</Label>
            <p className="text-sm text-muted-foreground">Installation d'un système de climatisation dans votre projet</p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="air-conditioning"
              checked={hasAirConditioning}
              onCheckedChange={setHasAirConditioning}
            />
            <div className="text-sm font-medium">
              {hasAirConditioning ? (
                <span className="flex items-center text-blue-500">
                  <Snowflake className="h-4 w-4 mr-1" />
                  Oui
                </span>
              ) : (
                <span className="text-gray-500">Non</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={goToPreviousStep}>
          Précédent
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default ChauffageForm;
